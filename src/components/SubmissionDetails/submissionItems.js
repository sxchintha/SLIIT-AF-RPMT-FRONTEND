import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Sidebar from "../Sidebar";

export default function Submissions() {
  const [Submissions, SetSubmissions] = useState([
    {
      available: "",
      submissionName: "",
      submissionType: "",
      description: "",
      deadline: "",
    },
  ]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      await axios
        .get(`http://localhost:8070/submissions/availableSubmissions`)
        .then((res) => {
          SetSubmissions(res.data.submissions);
          console.log(res.data.submissions);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchSubmissions();
  }, []);

  console.log(Submissions);
  return (
    <>
      <div>
        <div className="container-fluid overflow-hidden">
          <div className="row vh-100 overflow-auto">
            <Sidebar />

            <div className="col d-flex flex-column h-sm-100">
              <main className="row overflow-auto">
                <div className="col pt-4 ps-4">
                  <div className="container py-5 h-100">
                    <div className="row justify-content-center align-items-center h-100">
                      <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration">
                          <div className="card-body p-4 p-md-5">
                            <div className="card text-white bg-secondary mb-3">
                              <div className="card-header">
                                CoSupervisor Request Status
                              </div>
                              <div className="card-body">
                                {Submissions.map((submission, key) => {
                                  return (
                                    <Link
                                      to={
                                        "/student/submission/" + submission._id
                                      }
                                      style={{
                                        textDecoration: "none",
                                        color: "white",
                                      }}
                                    >
                                      <ul>
                                        <h1>{submission.submissionName}</h1>
                                      </ul>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
              <footer className="row bg-light py-4 mt-auto">
                <Footer />
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
