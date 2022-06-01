import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
      <div className="card text-white bg-secondary mb-3">
        <div className="card-header">CoSupervisor Request Status</div>
        <div className="card-body">
          {Submissions.map((submission, key) => {
            return (
              <Link
                to={"/student/submission/" + submission._id}
                style={{ textDecoration: "none", color: "white" }}
              >
                <ul>
                  <h1>{submission.submissionName}</h1>
                </ul>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
