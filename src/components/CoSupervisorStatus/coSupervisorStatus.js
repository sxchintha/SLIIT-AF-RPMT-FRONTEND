import axios from "axios";
import React, { useState, useEffect } from "react";

export default function CoSupervisorStatus() {
  const [StudentDetails, SetStudentDetails] = useState({
    hasGroup: "",
    groupId: "",
  });

  const localToken = JSON.parse(localStorage.getItem("localToken"));
  console.log(localToken.username);
  var ItNumber = localToken.username;

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
    const fetchStudent = async () => {
      await axios
        .get(`http://localhost:8070/student/getStudent/${ItNumber}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // console.log(res);
          SetStudentDetails(res.data);
        })
        .catch((e) => {
          // console.log(e);
        });
    };
    fetchStudent();
  }, []);

  // console.log(StudentDetails.groupId);

  const [GroupDetails, SetGroupDetails] = useState({
    supervisorRequestStatus: "",
    requestedDate: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get(
          `http://localhost:8070/student/getCoSupervisorStatus/${StudentDetails.groupId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          SetGroupDetails(res.data);

          // console.log(res.data);
        })
        .catch((e) => {
          // console.log(e);
        });
    };
    fetchUser();
  }, [StudentDetails]);

  return (
    <>
      <div className="card shadow border-0 w-75">
        {/* <div className="card-header">CoSupervisor Request Status</div> */}
        <div className="card-body">
          {StudentDetails.hasGroup ? (
            <>
              {GroupDetails.supervisorRequestStatus == "Pending" ? (
                <>
                  <div className="row">
                    <div className="col">
                      <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                        <u>Co-Supervisor Request Status</u>
                      </span>
                      <span className="h3 font-bold mb-0">
                        {GroupDetails.supervisorRequestStatus}
                      </span>
                    </div>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                        <i
                          className="bi bi-question-circle-fill"
                          style={{
                            color: "yellow",
                            fontSize: 40,
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        ></i>
                      </div>
                    </div>
                  </div>
                  {/* <center>
                    <h3>STATUS-{GroupDetails.supervisorRequestStatus}</h3>

                    <i
                      className="bi bi-question-circle-fill"
                      style={{
                        color: "yellow",
                        fontSize: 70,
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    ></i>
                  </center> */}
                </>
              ) : GroupDetails.supervisorRequestStatus == "Approved" ? (
                <>
                  <div className="row">
                    <div className="col">
                      <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                        <u>Co-Supervisor Request Status</u>
                      </span>
                      <span className="h3 font-bold mb-0">
                        {GroupDetails.supervisorRequestStatus}
                      </span>
                    </div>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                        <i
                          className="bi bi-check-circle-fill"
                          style={{
                            color: "yellow",
                            fontSize: 40,
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        ></i>
                      </div>
                    </div>
                  </div>

                  {/* <center>
                    <h3>STATUS-{GroupDetails.supervisorRequestStatus}</h3>
                  </center>

                  <div style={{ alignItems: "center", textAlign: "center" }}>
                    <i
                      className="bi bi-check-circle-fill"
                      style={{
                        color: "green",
                        fontSize: 67,
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    ></i>
                  </div> */}
                </>
              ) : (
                <>
                  <div className="row">
                    <div className="col">
                      <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                        <u>Co-Supervisor Request Status</u>
                      </span>
                      <span className="h3 font-bold mb-0">
                        {GroupDetails.supervisorRequestStatus}
                      </span>
                    </div>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                        <i
                          className="bi bi-x-circle-fill"
                          style={{
                            color: "red",
                            fontSize: 40,
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        ></i>
                      </div>
                    </div>
                  </div>

                  {/* <center>
                    <h3>STATUS-{GroupDetails.supervisorRequestStatus}</h3>
                  </center>
                  <div style={{ alignItems: "center", textAlign: "center" }}>
                    <i
                      className="bi bi-x-circle-fill"
                      style={{
                        color: "red",
                        fontSize: 67,
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    ></i>
                  </div> */}
                </>
              )}
            </>
          ) : (
            <h1>No Group</h1>
          )}
        </div>
      </div>
    </>
  );
}
