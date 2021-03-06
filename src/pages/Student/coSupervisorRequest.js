import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAllStaff } from "../../index.api";
import Select from "react-select";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

export default function CoSupervisorRequest() {
  const [StudentDetails, SetStudentDetails] = useState({
    hasGroup: "",
    groupId: "",
  });

  const localToken = JSON.parse(localStorage.getItem("localToken"));
  console.log(localToken.username);
  var ItNumber = localToken.username;
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

  const [RequestDetails, SetRequestDetails] = useState({
    topic: "",
    supervisorID: "",
    groupId: "",
  });
  const [staffSelect, setStaffSelect] = useState([]);
  const [fieldStaff, setFieldStaff] = useState([]);

  useEffect(() => {
    getAllStaff().then((res) => {
      console.log(res.data);
      setStaff(res.data);
    });
  }, []);

  useEffect(() => {
    var allFieldStaff = [];
    fieldStaff.forEach((member) => {
      var memberDetails = {
        value: member._id,
        label:
          member.firstname +
          " " +
          member.lastname +
          " " +
          "(" +
          member.username +
          ")",
      };

      allFieldStaff.push(memberDetails);
    });
    console.log(allFieldStaff);
    setStaffSelect(allFieldStaff);
  }, [fieldStaff]);

  const handlePanelMembers = (e) => {
    console.log(e.value);
    SetRequestDetails({ ...RequestDetails, ["supervisorID"]: e.value });
  };

  const onChange = (e) => {
    SetRequestDetails({
      ...RequestDetails,
      [e.target.name]: e.target.value,
    });
    //console.log(newStaffMember);
  };
  const options = [
    {
      value: "Robotics and Artificial Intelligence",
      label: "Robotics and Artificial Intelligence",
    },

    {
      value: "Graphics and Immersive Computing",
      label: "Graphics and Immersive Computing",
    },

    {
      value: "Bioinformatics and Computational Biology",
      label: "Bioinformatics and Computational Biology",
    },

    {
      value: "High Performance Computing",
      label: "High Performance Computing",
    },

    { value: "Theoretical Foundations", label: "Theoretical Foundations" },

    {
      value: "Information and System Security",
      label: "Information and System Security",
    },
  ];

  console.log(RequestDetails);

  function sendData(e) {
    e.preventDefault();
    const newRequest = {
      topic: RequestDetails.topic,
      supervisorId: RequestDetails.supervisorID,
      groupId: StudentDetails.groupId,
    };

    console.log(newRequest);

    axios
      .post("http://localhost:8070/student/requestCoSupervisor", newRequest)
      .then((e) => {
        console.log(newRequest);
        console.log(e);
        alert("Co Supervisor request successfully added!!");
      })
      .catch((e) => {
        console.log(e);
        alert(e.data);
      });
  }

  const onChangeField = (field) => {
    console.log(field.value);
    axios
      .get(`http://localhost:8070/staff/getToField/${field.value}`)
      .then((res) => {
        console.log(res.data.staff);
        setFieldStaff(res.data.staff);
      })
      .catch((e) => {
        console.log(e);
      });
  };
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
                                Request CoSupervisor
                              </h3>
                            </center>

                            <form onSubmit={sendData}>
                              <div className="row">
                                <div className="col-md-6 mb-4 d-flex align-items-center w-100">
                                  <div className="form-floating datepicker w-100">
                                    <Select
                                      closeMenuOnSelect={true}
                                      // components={animatedComponents}
                                      name="supervisorField"
                                      // value={panelData.panelMembers}
                                      placeholder="Select Supervisor Field"
                                      options={options}
                                      onChange={onChangeField}
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6 mb-4 w-100">
                                  <div className="form-floating">
                                    <input
                                      type="text"
                                      id="email"
                                      name="topic"
                                      placeholder="Email"
                                      className="form-control"
                                      onChange={onChange}
                                    />
                                    <label
                                      className="ms-2 text-secondary"
                                      for="firstName"
                                    >
                                      Research Topic
                                    </label>
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-md-6 mb-4 d-flex align-items-center w-100">
                                  <div className="form-floating datepicker w-100">
                                    <Select
                                      closeMenuOnSelect={true}
                                      // components={animatedComponents}
                                      name="supervisorID"
                                      // value={panelData.panelMembers}
                                      placeholder="Select Supervisors"
                                      options={staffSelect}
                                      onChange={handlePanelMembers}
                                      required
                                    />
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
