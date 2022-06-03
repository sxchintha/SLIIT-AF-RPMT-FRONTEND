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
  useEffect(() => {
    const fetchStudent = async () => {
      await axios
        .get(`http://localhost:8070/student/getStudent/${ItNumber}`)
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
          `http://localhost:8070/student/getSupervisorStatus/${StudentDetails.groupId}`
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
                  <center>
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
                  </div>
                </>
              ) : (
                <>
                  <center>
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
                  </div>
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
