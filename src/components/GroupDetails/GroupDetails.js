import axios from "axios";
import React, { useState, useEffect } from "react";

export default function GroupCard() {
  const [GroupDetails, SetGroupDetails] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get("http://localhost:8070/student/getGroup/628e296418bf7fba052b886c")
        .then((res) => {
          SetGroupDetails(res.data);
          console.log(GroupDetails);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchUser();
  }, []);

  return (
    <>
      {/* <div class="card text-white bg-primary mb-3">
        <div class="card-header">Your Group Details</div>
        <div class="card-body">
          <h3 class="card-title">Leader - {GroupDetails.student.leaderName}</h3>
          <ul>
            <li>
              <h5 class="card-title">1. {GroupDetails.student.firstMember}</h5>
            </li>
            <li>
              <h5 class="card-title">2. {GroupDetails.student.secondMember}</h5>
            </li>
            <li>
              <h5 class="card-title">3. {GroupDetails.student.thirdMember}</h5>
            </li>
          </ul>
        </div>
      </div> */}
    </>
  );
}
