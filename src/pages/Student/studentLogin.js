import React, { useState } from "react";
import axios from "axios";

export default function StudentLogin() {
  const [StudentDetails, SetStudentDetails] = useState({
    email: "",
    password: "",
  });

  function sendData(e) {
    e.preventDefault();
    const newStudentLogin = {
      email: StudentDetails.email,
      password: StudentDetails.password,
    };

    axios
      .post("http://localhost:8070/student/login", newStudentGroup)
      .then(() => {
        console.log(`Hello${newStudentGroup}`);
        alert("successful");
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
                          <div className="card-body p-4 p-md-5">
                            <center>
                              <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
                                Student Login
                              </h3>
                            </center>

                            <form onSubmit={sendData}>
                              <div className="row">
                                <div className="col-md-6 mb-4">
                                  <div className="form-floating">
                                    <input
                                      type="email"
                                      id="email"
                                      name="email"
                                      placeholder="Email"
                                      className="form-control"
                                      onChange={onChange}
                                    />
                                    <label
                                      className="ms-2 text-secondary"
                                      for="firstName"
                                    >
                                      Email
                                    </label>
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-md-6 mb-4 d-flex align-items-center w-100">
                                  <div className="form-floating datepicker w-100">
                                    <input
                                      type="password"
                                      className="form-control"
                                      id="password"
                                      name="password"
                                      placeholder="Password"
                                      onChange={onChange}
                                    />
                                    <label
                                      for="username"
                                      className="ms-2 text-secondary"
                                    >
                                      Password
                                    </label>
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-md-6 mb-4 pb-2">
                                  <div className="form-floating">
                                    <input
                                      type="password"
                                      id="password"
                                      name="password"
                                      placeholder="Password"
                                      className="form-control"
                                      onChange={onChange}
                                    />
                                    <label
                                      className="ms-2 text-secondary"
                                      for="password"
                                    >
                                      Password
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
    </>
  );
}
