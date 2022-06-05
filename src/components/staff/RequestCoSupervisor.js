import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";

import Footer from '../Footer';
import Sidebar from '../Sidebar';

function RequestCoSupervisor() {

    const { id } = useParams();
    const[cosupervisor, setCoSupervisor] = useState([]);
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
        const getCosupervisor = () => {
            axios.get(`http://localhost:8070/staff/cosupervisor/request/${localToken.userId}`,{
              headers: { Authorization: `Bearer ${token}` },
            }).then((res) => {
              // console.log(res);
              setCoSupervisor(res.data.request)
            }).catch((er) => {
              alert(er)
            })
        }
        getCosupervisor();
    },[])



    const handleAccept = (id, groupId) => {
      const supervisorId = id;
    axios
      .put(`http://localhost:8070/staff/cosupervisor-accept/${id}/${groupId}`, { supervisorId: localToken.userId },  {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        window.location.reload(true);
      })
      .catch((er) => {
        alert(er.message);
      });
  };

  const handleReject = (id, groupId) => {
    const supervisorId = id;
    axios
      .put(
        `http://localhost:8070/staff/cosupervisor-reject/${id}/${groupId}`, { supervisorId: localToken.userId }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        window.location.reload(true);
        // console.log("ddfwf")
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
                                    <h2>Cosupervisor Invitations</h2>
                                    <hr />

                                    <div className="card mb-3">
                                        <div className="card-header">
                                            <i className="fa fa-table"></i> Co-supervisor Requests</div>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                {
                                                    cosupervisor.length > 0 ?
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
                                                            {
                                                                        cosupervisor.map((items, key) => (
                                                                            <tr key={key}>
                                                                                <td>{items.groupId}</td>
                                                                                <td>{items.topic}</td>
                                                                                <td>{new Date(items.requestedDate).toDateString()}</td>
                                                                                <td>{items.supervisorRequestStatus}</td>

                                                                                <td><button type="button" 
                                                                                className="btn btn-danger" 
                                                                                onClick={() => {handleReject (items._id, items.groupId)}} >Reject</button></td>

                                                                                <td><button type="button" 
                                                                                className="btn btn-success" 
                                                                                onClick={() => {handleAccept (items._id)}}>Accept</button></td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                            </tbody>
                                                        </table>
                                                        : <h4>No requests available!</h4>
                                                }
                                            </div>
                                        </div>
                                    </div >
                                </div>
                            </main>
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
    
  )
}

export default RequestCoSupervisor;