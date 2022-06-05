import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import LoadingSpiner from "../../components/LoadingSpinner";
import Sidebar from "../../components/Sidebar";
import React, { useEffect, useState } from "react";

export default function StudentProfileUpdate() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [StudentDetails, setStudentdata] = useState({
    hasGroup: "",
    groupId: "",
    name: "",
    email: "",
    groupName: "",
  });
  useEffect(() => {
    location.state
      ? setStudentdata(location.state.StudentDetails)
      : // console.log(location.state.profiledata)
        navigate("/admins/profile");
    setIsLoaded(true);
  }, []);
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
  const handleChange = (e) => {
    setStudentdata({ ...StudentDetails, [e.target.name]: e.target.value });
  };

  const updateStudent = (e) => {
    e.preventDefault();

    const New = {
      name: StudentDetails.name,
      email: StudentDetails.email,
      password: StudentDetails.password,
    };
    axios
      .put(`http://localhost:8070/student/update/${StudentDetails._id}`, New, {
        headers: { Authorization: `Bearer ${token}` },
      })
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
        <div className="container-fluid overflow-hidden">
          <div className="row vh-100 overflow-auto">
            <Sidebar />

            <div className="col d-flex flex-column h-sm-100">
              <main className="row overflow-auto">
                <div className="col pt-4 ps-4">
                  <div className="d-flex justify-content-center m-5">
                    {isLoaded ? (
                      <form
                        className="row g-3 sxch-glass-back "
                        onSubmit={updateStudent}
                      >
                        <i
                          className="bi bi-arrow-left-circle fs-4"
                          onClick={() => navigate(-1)}
                        >
                          {" "}
                          Go back
                        </i>

                        <div className="form-floating col-6">
                          <input
                            type="text"
                            className="form-control"
                            id="firstname"
                            name="name"
                            placeholder="First name"
                            onChange={handleChange}
                            value={StudentDetails.name}
                            required
                          />
                          <label
                            htmlFor="firstname"
                            className="ms-2 text-secondary"
                          >
                            First name
                          </label>
                        </div>

                        <div className="form-floating col-md-6">
                          <input
                            type="text"
                            className="form-control"
                            id="lastname"
                            name="email"
                            placeholder="Last name"
                            onChange={handleChange}
                            value={StudentDetails.email}
                            required
                          />
                          <label
                            htmlFor="lastname"
                            className="ms-2 text-secondary"
                          >
                            Last name
                          </label>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-outline-primary ms-2 mt-4"
                        >
                          Submit
                        </button>
                      </form>
                    ) : (
                      <LoadingSpiner />
                    )}
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
