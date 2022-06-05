import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Footer from "../Footer";
import Sidebar from "../Sidebar";

export default function AcceptTopics() {
  const { id } = useParams();
  const [supervisorrequest, setSupervisorRequest] = useState([]);
  const localToken = JSON.parse(localStorage.getItem('localToken'))

  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  var token = getCookie("usertoken");

  useEffect(() => {

    const getSupervisor = () => {
      axios.get(`http://localhost:8070/staff/supervisor/request/${localToken.userId}`,{
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        setSupervisorRequest(res.data.request)
      }).catch((er) => {
        alert(er)
      })
    }
    getSupervisor();
    
  },[]);
  // console.log(supervisorrequest);
  
  
  const handleAccept = (id, groupId) => {
    axios
      .put(`http://localhost:8070/staff/supervisor-accept/${id}/${groupId}`, { supervisorId: localToken.userId }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        window.location.reload(true);
      })
      .catch((er) => {
        alert(er.message);
        console.log(er)
      });
  };

  const handleReject = (id, groupId) => {
    const supervisorId = id;
    axios
      .put(
        `http://localhost:8070/staff/supervisor-reject/${id}/${groupId}`, { supervisorId: localToken.userId }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        window.location.reload(true);
      })
      .catch((er) => {
        alert(er.message);
      });
  };

  return (
    <div>
      <div className="container-fluid overflow-hidden">
        <div className="row vh-100 overflow-auto">
          <Sidebar />

          <div className="col d-flex flex-column h-sm-100">
            <main className="row overflow-auto">
              <div className="col pt-4 ps-4">
                {/* Body */}
                <h2>Supervisor Invitations</h2>
                <hr />

                <div className="card mb-3">
                  <div className="card-header">
                    <i className="fa fa-table"></i> Supervisor Requests
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      {supervisorrequest.length > 0 ? (
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Group ID</th>
                              <th>Topic</th>
                              <th>Date</th>
                              <th>Status</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {supervisorrequest.map((items, key) => (
                              <tr key={key}>
                                <td>{items.groupId}</td>
                                <td>{items.topic}</td>
                                <td>
                                  {new Date(items.requestedDate).toDateString()}
                                </td>
                                <td>{items.supervisorRequestStatus}</td>

                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => {
                                      handleReject(items._id, items.groupId);
                                    }}
                                  >
                                    Reject
                                  </button>
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => {
                                      handleAccept(items._id, items.groupId);
                                    }}
                                  >
                                    Accept
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <h4>No requests available!</h4>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
