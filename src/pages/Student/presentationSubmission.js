import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";

export default function SubmitPresentation() {
  const [StudentDetails, SetStudentDetails] = useState({
    hasGroup: "",
    groupId: "",
    supervisorId: "",
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
  console.log(token);
  useEffect(() => {
    const fetchStudent = async () => {
      await axios
        .get(`http://localhost:8070/student/getStudent/${ItNumber}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
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
  console.log(StudentDetails.hasGroup);
  const [newPresentation, setnewPresentation] = useState({
    topic: "",
    video: "",
  });

  const onChange = (e) => {
    setnewPresentation({
      ...newPresentation,
      [e.target.name]: e.target.value,
    });
    //console.log(newStaffMember);
  };
  const [SupervisorDetails, SetSupervisorDetails] = useState({
    supervisorId: "",
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
          SetSupervisorDetails(res.data);

          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchUser();
  }, [StudentDetails]);

  function sendData(e) {
    e.preventDefault();
    const newStudentGroup = {
      topic: newPresentation.topic,
      itNumber: ItNumber,
      groupID: StudentDetails.groupId,
      Link: newPresentation.Link,
      date:new Date(),
      supervisorId: SupervisorDetails.supervisorId,
      
    };
    console.log(newStudentGroup);
    axios
      .post(
        "http://localhost:8070/presentation",
        newStudentGroup,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(`Hello${newStudentGroup}`);
        alert(res);
      })
      .catch((e) => {
        console.log(newStudentGroup);
        console.log(e);
        alert(e);
      });
  }

  return (
    <>
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
                              {StudentDetails.hasGroup ? (
                                <>
                                  <center>
                                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
                                      Presentation Submission
                                    </h3>
                                  </center>

                                  <form onSubmit={sendData}>
                                    <div className="row">
                                      <div className="col-md-6 mb-4">
                                        <div className="form-floating">
                                          <input
                                            type="text"
                                            id="name"
                                            name="topic"
                                            placeholder="Presentation Topic"
                                            className="form-control"
                                            required
                                            onChange={onChange}
                                          />
                                          <label
                                            className="ms-2 text-secondary"
                                            for="firstName"
                                          >
                                            Presentation topic
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6 mb-4">
                                        <div className="form-floating">
                                          <input
                                            type="Link"
                                            id="lastName"
                                            name="Link"
                                            placeholder="Video Link"
                                            className="form-control"
                                            onChange={onChange}
                                          />
                                          <label
                                            className="ms-2 text-secondary"
                                            for="lastName"
                                          >
                                            Video Link
                                          </label>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="mt-4 pt-2">
                                      <center>
                                        <input
                                          className="btn btn-primary btn-lg"
                                          type="submit"
                                          value="Register"
                                        />
                                      </center>
                                    </div>
                                  </form>
                                </>
                              ) : (
                                <>
                                  <div class="alert alert-danger" role="alert">
                                    Your group is not registered
                                  </div>
                                </>
                              )}
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
    </>
  );
}
