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
  // var ded = deadline.toDateString();

  var currentDate = new Date();
  var difference = deadline - currentDate;
  console.log(difference);
  var days = difference / (1000 * 3600 * 24);
  console.log(days);
  var daysLeft = Math.trunc(Math.abs(days));
  console.log(daysLeft);

  let hours = 0;
  let minutes = 0;
  d = new Date(Submission.deadline);
  d.getHours() < 10
    ? (hours = "0" + d.getHours())
    : (hours = String(d.getHours()));
  d.getMinutes() < 10
    ? (minutes = "0" + d.getMinutes())
    : (minutes = String(d.getMinutes()));

  var ded = d.toDateString() + ", " + hours + ":" + minutes;

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
          <p class="card-text">Submission Deadline - {ded}</p>
          <p class="card-text text-danger">
            {difference < 0 ? (
              <>Overdue By - {daysLeft} Days</>
            ) : (
              <>Days Left - {daysLeft} Days</>
            )}
          </p>
          <p class="card-text">{Submission.description}.</p>
          <p class="card-text">File Types -{Submission.fileTypes}.</p>

          <a href="#" class="btn btn-primary">
            Upload Document
          </a>
        </div>
        <div class="card-footer text-muted">2 days ago</div>
      </div>
    </>
  );
}
