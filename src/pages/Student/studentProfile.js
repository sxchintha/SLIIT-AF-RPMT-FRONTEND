import axios from "axios";
import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import "./backdrop.css";

export default function StudentProfile() {
  const [StudentDetails, SetStudentDetails] = useState({
    hasGroup: "",
    groupId: "",
    name: "",
    email: "",
  });

  var ItNumber = "IT20211714";
  useEffect(() => {
    const fetchStudent = async () => {
      await axios
        .get(`http://localhost:8070/student/getStudent/${ItNumber}`)
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

  const [newStudent, setnewStudent] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const onChange = (e) => {
    SetStudentDetails({
      ...StudentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const updateStudent = (e) => {
    e.preventDefault();

    const New = {
      name: StudentDetails.name,
      email: StudentDetails.email,
      password: StudentDetails.password,
    };
    axios
      .put(`http://localhost:8070/student/update/${StudentDetails._id}`, New)
      .then(() => {
        alert("successful");
      })
      .catch((e) => {
        // console.log(e);
        alert(e.response.data.status);
      });
  };

  const deleteStudent = (e) => {
    e.preventDefault();

    const groupID = {
      groupID: StudentDetails.groupId,
      ItNumber: ItNumber,
    };

    axios
      .delete(
        `http://localhost:8070/student/delete/${StudentDetails._id}`,
        groupID
      )
      .then(() => {
        alert("successful");
      })
      .catch((e) => {
        // console.log(e);
        alert(e.response.data.status);
      });
  };

  return (
    <>
      <div>
        <div>
          <div className="container-fluid overflow-hidden">
            <div className="row vh-100 overflow-auto">
              <Sidebar />

              <div className="col d-flex flex-column h-sm-100">
                <main className="row w-100">
                  <div className="col pt-4 ps-4 w-100">
                    <div className="container py-5 h-100 w-100">
                      <div className="row justify-content-center align-items-center h-100 w-100">
                        <div className="col-12 col-lg-9 col-xl-7 w-100">
                          <div class="p-16 bg-surface-secondary w-100">
                            <div class="row w-100">
                              <div class="col-lg-4 mx-auto ">
                                <div class="card shadow">
                                  <div class="card-body ">
                                    <div class="d-flex justify-content-center">
                                      <div class="avatar avatar-xl rounded-circle">
                                        <img
                                          alt="..."
                                          className="avatar avatar-xl rounded-circle "
                                          style={{
                                            width: 150,
                                            height: 150,
                                          }}
                                          src="https://i.postimg.cc/FHPv4nWF/ezgif-com-gif-maker.gif"
                                        ></img>
                                      </div>
                                    </div>
                                    <div class="text-center my-6">
                                      <a
                                        href="#"
                                        class="d-block h5 mb-0 text-decoration-none"
                                      >
                                        Student Name - {StudentDetails.name}
                                      </a>

                                      <span class="d-block text-sm text-muted">
                                        Student Email - {StudentDetails.email}
                                      </span>

                                      <span class="d-block text-sm text-muted">
                                        Group Id - {StudentDetails.groupId}
                                      </span>

                                      <div class="row">
                                        <div class="col">
                                          <button
                                            class="btn btn-outline-dark ms-2 mt-4"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            data-bs-backdrop="false"
                                          >
                                            <span class=" pe-2">
                                              <i class="bi bi-pencil"></i>
                                            </span>
                                            <span>Edit</span>
                                          </button>
                                        </div>
                                        <div class="col">
                                          <button
                                            type="button"
                                            className="btn btn-outline-danger ms-2 mt-4"
                                            onClick={deleteStudent}
                                          >
                                            <i className="bi bi-trash3-fill"></i>{" "}
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="modal "
                            id="exampleModal"
                            tabindex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                            data-bs-backdrop="false"
                          >
                            <div class="modal-dialog ">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5
                                    class="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    Student Details Update
                                  </h5>
                                  <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div class="modal-body">
                                  <form onSubmit={updateStudent}>
                                    <div className="form-floating col-6">
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="submissionName"
                                        name="name"
                                        value={StudentDetails.name}
                                        placeholder="Panel name"
                                        required
                                        onChange={onChange}
                                      />
                                      <label
                                        htmlFor="panelname"
                                        className="ms-2 text-secondary"
                                      >
                                        Name
                                      </label>
                                    </div>
                                    {/* <div className="form-floating">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Group Leader Name"
                  className="form-control"
                  onChange={onChange}
                  value={StudentDetails.name}
                />
                <label className="ms-2 text-secondary" for="firstName">
                  Student Name
                </label>
              </div> */}
                                    <br></br>
                                    <div className="form-floating">
                                      <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        onChange={onChange}
                                        value={StudentDetails.email}
                                      />
                                      <label
                                        className="ms-2 text-secondary"
                                        for="firstName"
                                      >
                                        Email
                                      </label>
                                    </div>
                                    <br></br>
                                    <div className="form-floating">
                                      <input
                                        type="text"
                                        id="password"
                                        name="password"
                                        placeholder={StudentDetails.email}
                                        className="form-control"
                                        onChange={onChange}
                                        value={StudentDetails.password}
                                        required
                                      />
                                      <label
                                        className="ms-2 text-secondary"
                                        for="firstName"
                                      >
                                        Password
                                      </label>
                                    </div>
                                  </form>
                                </div>
                                <div class="modal-footer">
                                  <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    onClick={updateStudent}
                                    class="btn btn-primary"
                                    // data-bs-dismiss="modal"
                                    type="button"
                                  >
                                    Update
                                  </button>
                                </div>
                              </div>
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
      ////
    </>
  );
}
