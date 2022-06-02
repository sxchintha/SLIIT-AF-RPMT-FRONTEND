import axios from "axios";
import React, { useState, useEffect } from "react";

export default function SupervisorStatus() {
  const [StudentDetails, SetStudentDetails] = useState({
    hasGroup: "",
    groupId: "",
  });

  var ItNumber = "IT20211714";
  useEffect(() => {
    const fetchStudent = async () => {
      await axios
        .get(`http://localhost:8070/student/getStudent/${ItNumber}`)
        .then((res) => {
          console.log(res);
          SetStudentDetails(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchStudent();
  }, []);

  console.log(StudentDetails.groupId);

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

          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchUser();
  }, [StudentDetails]);

  return (
    <>
      {/* <div class="card shadow border-0 w-25">
        <div class="card-body ">
          <div class="row">
            <div class="col">
              <span class="h6 font-semibold text-muted text-sm d-block mb-2">
                Supervisor Request Status
              </span>
              <span class="h3 font-bold mb-0">$750.90</span>
            </div>
            <div class="col-auto">
              <div class="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                <i
                  class="bi bi-credit-card"
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
          <div class="mt-2 mb-0 text-sm">
            <span class="badge badge-pill bg-soft-success text-success me-2">
              <i class="bi bi-arrow-up me-1"></i>13%
            </span>
            <span class="text-nowrap text-xs text-muted">Since last month</span>
          </div>
        </div>
      </div>
      ///// */}
      <div class="card shadow border-0 w-75">
        {/* <div className="card-header">Supervisor Request Status</div> */}
        <div className="card-body">
          {StudentDetails.hasGroup ? (
            <>
              {GroupDetails.supervisorRequestStatus == "Pending" ? (
                <>
                  <div class="row">
                    <div class="col">
                      <span class="h6 font-semibold text-muted text-sm d-block mb-2">
                        <u>Supervisor Request Status</u>
                      </span>
                      <span class="h3 font-bold mb-0">
                        {GroupDetails.supervisorRequestStatus}
                      </span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                        <i
                          class="bi bi-question-circle-fill"
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
                  {/* <div class="mt-2 mb-0 text-sm">
                    <span class="badge badge-pill bg-soft-success text-success me-2">
                      <i class="bi bi-arrow-up me-1"></i>13%
                    </span>
                    <span class="text-nowrap text-xs text-muted">
                      Since last month
                    </span>
                  </div> */}

                  {/* <center>
                    <h3>STATUS-{GroupDetails.supervisorRequestStatus}</h3>

                    <i
                      class="bi bi-question-circle-fill"
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
                      class="bi bi-check-circle-fill"
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
                      class="bi bi-x-circle-fill"
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
