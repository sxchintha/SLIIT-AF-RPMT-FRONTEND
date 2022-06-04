import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function GroupRegister() {
  const navigate = useNavigate();

  const [StudentDetails, SetStudentDetails] = useState({
    hasGroup: "",
    groupId: "",
  });

  const localToken = JSON.parse(localStorage.getItem("localToken"));
  // console.log(localToken.username);
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
  // console.log(token);
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
  // console.log(StudentDetails.hasGroup);
  const [newGroup, setnewGroup] = useState({
    leaderName: "",
    firstMember: "",
    secondMember: "",
    thirdMember: "",
    groupName: "",
  });

  const onChange = (e) => {
    setnewGroup({
      ...newGroup,
      [e.target.name]: e.target.value,
    });
    //console.log(newStaffMember);
  };

  function sendData(e) {
    e.preventDefault();
    const newStudentGroup = {
      leaderName: newGroup.leaderName,
      groupName: newGroup.groupName,

      firstMember: newGroup.firstMember,
      secondMember: newGroup.secondMember,
      thirdMember: newGroup.thirdMember,
    };
    console.log(newStudentGroup);
    axios
      .post("http://localhost:8070/student/groupRegister", newStudentGroup, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        alert("Student group succesfully registered!");
        navigate("/student/groupDetails");
      })
      .catch((e) => {
        console.log(newStudentGroup);
        console.log(e);
        alert(e.response.data.status);
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
                                  <div class="alert alert-danger" role="alert">
                                    Your group is already registered
                                  </div>
                                </>
                              ) : (
                                <>
                                  <center>
                                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
                                      Group Registration Form
                                    </h3>
                                  </center>

                                  <form onSubmit={sendData}>
                                    <div className="row">
                                      <div className="col-md-6 mb-4">
                                        <div className="form-floating">
                                          <input
                                            type="text"
                                            id="name"
                                            name="leaderName"
                                            placeholder="Group Leader Name"
                                            className="form-control"
                                            pattern="^[a-zA-Z]{2}$"
                                            onChange={onChange}
                                          />
                                          <label
                                            className="ms-2 text-secondary"
                                            for="firstName"
                                          >
                                            Group Leader IT Number
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6 mb-4">
                                        <div className="form-floating">
                                          <input
                                            type="text"
                                            id="lastName"
                                            name="firstMember"
                                            placeholder="Last name"
                                            className="form-control"
                                            onChange={onChange}
                                          />
                                          <label
                                            className="ms-2 text-secondary"
                                            for="lastName"
                                          >
                                            First Member IT Number
                                          </label>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="row">
                                      <div className="col-md-6 mb-4 pb-2">
                                        <div className="form-floating">
                                          <input
                                            type="text"
                                            id="password"
                                            name="secondMember"
                                            placeholder="Second Member"
                                            className="form-control"
                                            onChange={onChange}
                                          />
                                          <label
                                            className="ms-2 text-secondary"
                                            for="password"
                                          >
                                            Second Member IT Number
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-6 mb-4 pb-2">
                                        <div className="form-floating">
                                          <input
                                            type="text"
                                            id="confirm-password"
                                            name="thirdMember"
                                            placeholder="Third Member"
                                            className="form-control"
                                            onChange={onChange}
                                          />
                                          <label
                                            className="ms-2 text-secondary"
                                            for="confirm-password"
                                          >
                                            Third Member IT Number
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="form-floating">
                                      <input
                                        type="text"
                                        id="name"
                                        name="groupName"
                                        placeholder="Group  Name"
                                        className="form-control"
                                        onChange={onChange}
                                        required
                                      />
                                      <label
                                        className="ms-2 text-secondary"
                                        for="firstName"
                                      >
                                        Group Name
                                      </label>
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
