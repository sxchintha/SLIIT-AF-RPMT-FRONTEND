import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import FileBase64 from 'react-file-base64';
import { createItem, getItems } from './functions';

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
    const fetchSubmissions = async () => {
      await axios
        .get(`http://localhost:8070/submissions/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
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

  
  const localToken=localStorage.getItem('localToken');

  const [item, setItem] = useState({ name: '', document: '',itNumber:JSON.parse(localToken).username,date:new Date()});
  // console.log(JSON.parse(localStorage.getItem(localToken.username)))
  const [items, setItems] = useState([])
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const result = await createItem(item);

    // setItems([...items, result]);
    console.log(result)
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await getItems();
      console.log('fetch data;m', result)
      setItems(result)
    }
    fetchData()
  }, [])

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


          {/* <a href="#" class="btn btn-primary">
            Upload Document
          </a> */}
          {/* <pre>{JSON.stringify(item, null, '\t')}</pre> */}
          
      <form action="" onSubmit={onSubmitHandler}>
      <div class="card text-center">
        <div class="card-header">
          Submission Details - {Submission.submissionType}
        </div>
        <div class="card-body">
          <h5 class="card-title">
            Submission Name - {Submission.submissionName}
            <input type="text" id="topicname" value={Submission.submissionName}

onChange={e => setItem({ ...item, name: e.target.value })}></input>
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
        {/* <input type="text" class="input-field" value={Submission.submissionName}

          onChange={e => setItem({ ...item, name: e.target.value })}
        /> */}
        <FileBase64
          type="file"
          multiple={false}
          onDone={({ base64 }) => setItem({ ...item, document: base64 })}
        />
        <div className="right-align">
        <button class="btn btn-danger">submit</button>
        </div>
        
        </div>
        
        <div class="card-footer text-muted">2 days ago</div>
      </div>
      <div>


      </div>
      </form>
    </>
  );
}
