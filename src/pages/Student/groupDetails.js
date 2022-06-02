import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import GroupCard from "../../components/GroupDetails/GroupDetails";
import { useNavigate } from "react-router-dom";

export default function MyGroup() {
  const navigate = useNavigate();
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
    hasRequestedSupervisor: "",
    hasRequestedCoSupervisor: "",
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

  function onTapSupervisorRequest() {
    navigate("/student/supervisorRequest");
  }

  console.log(GroupDetails.hasRequestedSupervisor);

  return (
    <div>
      <div>
        <div className="container-fluid overflow-hidden">
          <div className="row vh-100 overflow-auto">
            <Sidebar />

            <div className="col d-flex flex-column h-sm-100">
              <main className="row overflow-auto">
                <div className="col pt-4 ps-4">
                  <div className="container py-5 h-100">
                    <div className="row justify-content-center align-items-center h-100">
                      <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration">
                          <div className="card-body p-4 p-md-5 sxch-glass-back">
                            <div className="d-flex justify-content-around">
                              {StudentDetails.hasGroup ? (
                                <>
                                  {GroupDetails.hasRequestedSupervisor ? (
                                    <>
                                      <button
                                        type="button"
                                        class="btn btn-success mb-5"
                                        onClick={onTapSupervisorRequest}
                                      >
                                        Chat With Supervisor
                                      </button>
                                      {GroupDetails.hasRequestedCoSupervisor ? (
                                        <></>
                                      ) : (
                                        <>
                                          <button
                                            type="button"
                                            class="btn btn-secondary mb-5"
                                            onClick={onTapSupervisorRequest}
                                          >
                                            Request Co Supervisor
                                          </button>
                                        </>
                                      )}
                                    </>
                                  ) : (
                                    <button
                                      type="button"
                                      class="btn btn-secondary mb-5"
                                      onClick={onTapSupervisorRequest}
                                    >
                                      Request Supervisor
                                    </button>
                                  )}
                                </>
                              ) : (
                                <h1>No Group</h1>
                              )}
                            </div>

                            <br></br>
                            <GroupCard />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
              <footer className="row bg-light py-4 mt-auto">
                <Footer />
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
