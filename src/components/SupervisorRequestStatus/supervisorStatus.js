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
      <div className="card bg-light mb-3 ">
        <div className="card-header">Supervisor Request Status</div>
        <div className="card-body">
          {StudentDetails.hasGroup ? (
            <>
              {GroupDetails.supervisorRequestStatus == "Pending" ? (
                <>
                  <center>
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
                  </center>
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
