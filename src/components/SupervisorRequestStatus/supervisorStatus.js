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
  });

  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get(`http://localhost:8070/student/getSupervisorStatus/group_69`)
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

  console.log(GroupDetails.supervisorRequestStatus);

  return (
    <>
      <div className="card bg-light mb-3 ">
        <div className="card-header">Supervisor Request Status</div>
        <div className="card-body">
          {StudentDetails.hasGroup ? (
            <>
              {GroupDetails.supervisorRequestStatus == "Pending" ? (
                <>
                  <i
                    class="bi bi-question-circle-fill"
                    style={{
                      color: "yellow",
                      fontSize: 67,
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  ></i>
                </>
              ) : GroupDetails.supervisorRequestStatus == "Approved" ? (
                <>
                  <h2>Status - Approved</h2>
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
                  <h2>Status - Rejected</h2>
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
