import axios from "axios";
import React, { useState, useEffect } from "react";

export default function GroupDetails() {
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

  const [GroupDetails, SetGroupDetails] = useState({
    leaderName: "",
    firstMember: "",
    secondMember: "",
    thirdMember: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get(`http://localhost:8070/student/getGroup/${StudentDetails.groupId}`)
        .then((res) => {
          SetGroupDetails(res.data.student);
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchUser();
  }, [StudentDetails]);

  console.log(StudentDetails.hasGroup);
  console.log(StudentDetails.groupId);

  return (
    <>
      <div className="card text-white bg-primary mb-3 card shadow border-0">
        <div className="card-header">Your Group Details</div>
        <div className="card-body">
          {StudentDetails.hasGroup ? (
            <div>
              <h3 className="card-title">Leader - {GroupDetails.leaderName}</h3>
              <ul>
                <li>
                  <h5 className="card-title">1. {GroupDetails.firstMember}</h5>
                </li>
                <li>
                  <h5 className="card-title">2. {GroupDetails.secondMember}</h5>
                </li>
                <li>
                  <h5 className="card-title">3. {GroupDetails.thirdMember}</h5>
                </li>
              </ul>
            </div>
          ) : (
            <h1>No Group</h1>
          )}
        </div>
      </div>
    </>
  );
}
