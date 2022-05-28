import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function SubmissionDetails() {
  const { id } = useParams();
  const [Submission, SetSubmission] = useState({
    available: "",
    submissionName: "",
    submissionType: "",
    description: "",
    deadline: "",
    fileTypes: [],
    description: "",
  });

  useEffect(() => {
    const fetchSubmissions = async () => {
      await axios
        .get(`http://localhost:8070/submissions/${id}`)
        .then((res) => {
          SetSubmission(res.data.submission);
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchSubmissions();
  }, []);

  var deadline = new Date(Submission.deadline);

  var currentDate = new Date();
  var difference = Math.abs(deadline - currentDate);
  var days = difference / (1000 * 3600 * 24);
  var daysLeft = Math.trunc(days);

  return (
    <>
      <div class="card text-center">
        <div class="card-header">
          Submission Details - {Submission.submissionType}
        </div>
        <div class="card-body">
          <h5 class="card-title">
            Submission Name - {Submission.submissionName}
          </h5>
          <p class="card-text">Submission Deadline -</p>
          <p class="card-text text-danger">Days Left - {daysLeft} Days</p>
          <p class="card-text">{Submission.description}.</p>

          <a href="#" class="btn btn-primary">
            Upload Document
          </a>
        </div>
        <div class="card-footer text-muted">2 days ago</div>
      </div>
    </>
  );
}
