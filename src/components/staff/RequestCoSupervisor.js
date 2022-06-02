import React, { useState, useEffect } from 'react';
import axios from "axios";
import Footer from '../Footer';
import Sidebar from '../Sidebar';

function RequestCoSupervisor() {

    const[cosupervisor, setCoSupervisor] = useState([]);

    useEffect(() => {
        const getCosupervisors = () => {
            //all staff membersla fetch karala aran tiyenne methana
            axios.get("http://localhost:8070/student/topics").then((res) => {
                console.log(res.data)
                setCoSupervisor(res.data)

            }).catch((er) => {
                alert(er.message)
            })
        }
        getCosupervisors();
    },[])

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
                                            <i className="fa fa-table"></i> Staff Register Requests</div>
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

                                                                                {/* <td><button type="button" className="btn btn-danger" onClick={() => {handleReject (items._id, items.groupId)}} >Reject</button></td> */}
                                                                                {/* <td><button type="button" className="btn btn-success" onClick={() => {handleAccept (items._id)}}>Accept</button></td> */}
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