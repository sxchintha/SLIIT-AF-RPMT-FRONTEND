import axios from "axios";
import React, { useState, useEffect } from "react";

export default function SupervisorStatus() {
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
          `http://localhost:8070/student/getSupervisorStatus/${StudentDetails.groupId}`,
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
      {/* <div className="card shadow border-0 w-25">
        <div className="card-body ">
          <div className="row">
            <div className="col">
              <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                Supervisor Request Status
              </span>
              <span className="h3 font-bold mb-0">$750.90</span>
            </div>
            <div className="col-auto">
              <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                <i
                  className="bi bi-credit-card"
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
          <div className="mt-2 mb-0 text-sm">
            <span className="badge badge-pill bg-soft-success text-success me-2">
              <i className="bi bi-arrow-up me-1"></i>13%
            </span>
            <span className="text-nowrap text-xs text-muted">Since last month</span>
          </div>
        </div>
      </div>
      ///// */}
      <div className="card shadow border-0 w-75">
        {/* <div className="card-header">Supervisor Request Status</div> */}
        <div className="card-body">
          {StudentDetails.hasGroup ? (
            <>
              {GroupDetails.supervisorRequestStatus == "Pending" ? (
                <>
                  <div className="row">
                    <div className="col">
                      <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                        <u>Supervisor Request Status</u>
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
                  {/* <div className="mt-2 mb-0 text-sm">
                    <span className="badge badge-pill bg-soft-success text-success me-2">
                      <i className="bi bi-arrow-up me-1"></i>13%
                    </span>
                    <span className="text-nowrap text-xs text-muted">
                      Since last month
                    </span>
                  </div> */}

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
                        <u>Supervisor Request Status</u>
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
                            color: "green",
                            fontSize: 40,
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="row">
                    <div className="col">
                      <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                        <u>Supervisor Request Status</u>
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
                </>
              )}
            </>
          ) : (
            <>
              <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                <u>Supervisor Request Status</u>
              </span>
              <h5> Supervisor is not requested yet...</h5>
            </>
          )}
        </div>
      </div>
    </>
  );
}
