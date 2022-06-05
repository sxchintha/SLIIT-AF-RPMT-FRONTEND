import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import profileImage from "../../assets/img/profile.png";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";

export default function StudentProfileNew() {
  const [StudentDetails, SetStudentDetails] = useState({
    hasGroup: "",
    groupId: "",
    name: "",
    email: "",
    groupName: "",
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
          // console.log(res);
          SetStudentDetails(res.data);
        })
        .catch((e) => {
          // console.log(e);
        });
    };
    fetchStudent();
  }, []);

  return (
    <>
      <div>
        <div className="container-fluid overflow-hidden">
          <div className="row vh-100 overflow-auto">
            <Sidebar />

            <div className="col d-flex flex-column h-sm-100">
              <main className="row overflow-auto">
                <div className="col pt-4 ps-4">
                  <div>
                    <div className="container">
                      <div className="main-body">
                        <div className="row gutters-sm profile-gutters-sm">
                          <div className="col-md-3 mb-3">
                            <div className="card profile-card">
                              <div className="card-body profile-card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                  <img
                                    alt="..."
                                    className="avatar avatar-xl rounded-circle "
                                    style={{
                                      width: 150,
                                      height: 150,
                                    }}
                                    src="https://i.postimg.cc/FHPv4nWF/ezgif-com-gif-maker.gif"
                                  ></img>
                                  <div className="mt-3">
                                    {/* <h4>{profiledata.firstname}</h4> */}
                                    <p className="text-secondary mb-1">
                                      Student
                                    </p>
                                    <p className="text-muted font-size-sm">
                                      {ItNumber}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="card mt-3">
                              <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                  <Link
                                    to={"update"}
                                    state={{ StudentDetails }}
                                    className="text-secondary w-100 text-decoration-none"
                                  >
                                    Edit Profile{" "}
                                    <i className="float-end bi-pencil" />
                                  </Link>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                  <Link
                                    to={"changepassword"}
                                    className="text-secondary w-100 text-decoration-none"
                                  >
                                    Change Password{" "}
                                    <i className="float-end bi-key" />{" "}
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="col-md-8">
                            <br></br>
                            <div className="card profile-card mb-3">
                              <div className="card-body profile-card-body my-5">
                                <div className="row">
                                  <div className="col-sm-3">
                                    <h6 className="mb-0">Student Name</h6>
                                  </div>
                                  <div className="col-sm-9 text-secondary">
                                    {StudentDetails.name}
                                  </div>
                                </div>
                                <hr />
                                <div className="row">
                                  <div className="col-sm-3">
                                    <h6 className="mb-0">Email</h6>
                                  </div>
                                  <div className="col-sm-9 text-secondary">
                                    {StudentDetails.email}
                                  </div>
                                </div>
                                <hr />
                                <div className="row">
                                  <div className="col-sm-3">
                                    <h6 className="mb-0">IT Number</h6>
                                  </div>
                                  <div className="col-sm-9 text-secondary">
                                    {ItNumber}
                                  </div>
                                </div>
                                <hr />
                                <div className="row">
                                  <div className="col-sm-3">
                                    <h6 className="mb-0">Group Name</h6>
                                  </div>
                                  <div className="col-sm-9 text-secondary">
                                    {StudentDetails.groupName}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
