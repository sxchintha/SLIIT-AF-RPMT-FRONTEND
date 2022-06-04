import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Footer from "../Footer";
import Sidebar from "../Sidebar";

export default function AcceptTopics() {
  const { id } = useParams();
  const [topics, setTopics] = useState([]);

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
    const getTopics = () => {
      axios
        .get("http://localhost:8070/student/topics",  {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res);
          setTopics(res.data);
        })
        .catch((er) => {
          alert(er.message);
        });
    };
    getTopics();
  }, []);

  const handleAccept = (id,groupId) => {
    axios
      .put(`http://localhost:8070/student/supervisor-accept/${id}/${groupId}`,  {
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
        `http://localhost:8070/student/supervisor-reject/${id}/${groupId}`,
        supervisorId,  {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
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
                    <i className="fa fa-table"></i> Staff Register Requests
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      {topics.length > 0 ? (
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
                            {topics.map((items, key) => (
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
                                      handleAccept(items._id);
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
