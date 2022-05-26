import axios from "axios";
import React, { useState, useEffect } from "react";

export default function GroupCard() {
  const [GroupDetails, SetGroupDetails] = useState({
    leaderName: "",
    firstMember: "",
    secondMember: "",
    thirdMember: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get("http://localhost:8070/student/getGroup/628e296418bf7fba052b886c")
        .then((res) => {
          SetGroupDetails(res.data.student);
          // console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchUser();
  }, []);

  return (
    <>
      <div className="card text-white bg-primary mb-3">
        <div className="card-header">Your Group Details</div>
        <div className="card-body">
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
      </div>
    </>
  );
}
