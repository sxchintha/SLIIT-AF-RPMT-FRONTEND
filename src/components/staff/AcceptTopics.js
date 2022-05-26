import React, { useState, useEffect } from "react";
import axios from "axios";

import Footer from "../Footer";
import Sidebar from "../Sidebar";


export default function AcceptTopics () {

    const [topics, setTopics] = useState([]);

    useEffect(() =>{
        const getTopics = () =>{
            axios.get("http://localhost:8070/student/topics").then((res) =>{
                //console.log(res.data)
                setTopics(res.data)
                console.log(setTopics)

            }).catch((er) =>{
                alert(er.message)
            })
        }
        getTopics();
    }, [])




    return(
        <div>
            <div className="container-fluid overflow-hidden">
                <div className="row vh-100 overflow-auto">
                    <Sidebar />

                    <div className="col d-flex flex-column h-sm-100">
                        <main className="row overflow-auto">
                            <div className="col pt-4 ps-4">
                                {/* Body */}
                                <h2>Accept Topics</h2>

                                <table class="table table-striped">
                                    <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Research Topic</th>
                                                <th>Group ID</th>
                                                <th>Status</th>
                                                <th>Response</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {/* {
                                            topics.map((items, key) => (
                                                <tr key={key}>
                                                <td>{items.data.groupId}</td>
                                                <td>{items.data.name}</td>
                                                <td>{items.data.researchTopicStatus}</td>
                                                <td>{items.data.topic}</td>

                                                <td><button type="button" class="btn btn-danger">Reject</button></td>
                                                <td><button type="button" class="btn btn-success">Success</button></td>
                                            </tr>

                                            ))
                                        }    */}

                                            <tr>
                                                <td>Mark</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>
                                                <button type="button" class="btn btn-danger">Reject</button>
                                                <button type="button" class="btn btn-success">Success</button>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                            </div>
                            <footer className="row bg-light py-4 mt-auto">
                                <Footer />
                            </footer>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}