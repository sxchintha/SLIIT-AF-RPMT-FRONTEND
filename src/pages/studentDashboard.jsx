import axios from "axios";
import React, { useEffect, useState } from "react";
import CoSupervisorStatus from "../components/CoSupervisorStatus/coSupervisorStatus";
import Footer from "../components/Footer";
import GroupCard from "../components/GroupDetails/GroupDetails";
import Sidebar from "../components/Sidebar";
import SupervisorStatus from "../components/SupervisorRequestStatus/supervisorStatus";






export default function StudentDashboard() {
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

  console.log(StudentDetails.hasGroup)

  return (
    <>
      <div className="container-fluid overflow-hidden">
        <div className="row vh-100 overflow-auto">
          <Sidebar />

          <div className="col d-flex flex-column h-sm-100">
            <main className="row overflow-auto">
              <div className="col pt-4 ps-4">

                <div className="card text-white bg-dark mb-3">
                  <div className="d-flex justify-content-between">
                    <h1 className="card-header text-center mx-auto">
                      Faculty Notices
                    </h1>
                    <a href="#" className="btn btn-primary h-50 mt-3 mx-5">See All</a>
                  </div>
                  <div className="card-body">
                    <ul>
                      <li><h5 className="card-title">Test Faculty Notices</h5></li>
                      <li><h5 className="card-title">Test Faculty Notices</h5></li>
                      <li><h5 className="card-title">Test Faculty Notices</h5></li>
                    </ul>



                  </div>
                </div>




                <div className="container">
                  <div className="row">
                    <div className="col-md">
                      <SupervisorStatus />
                      <br></br>
                      <CoSupervisorStatus />
                    </div>
                    <div className="col-sm">
                      <GroupCard />
                    </div>
                    {/* <div className="col-sm">
      
    </div> */}
                  </div>
                  {
                    StudentDetails.hasGroup?(
                      <>
  <div class="alert alert-success alert-dismissible fade show" role="alert">
  <h5>Welcome {ItNumber}</h5><p> You can check your group details and request status from here!!.</p>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
                      </>
                    ):(
                      <>
                      <br></br>
                      <div class="alert alert-danger alert-dismissible fade show" role="alert">
  <h5>Welcome {ItNumber}</h5><p> Your group is not yet registered, register your group or wait till one of your group members register it !.</p>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
                      </>
                    )
                  }

                </div>



              </div>

            </main>
            <footer className="row bg-light py-4 mt-auto">
              <Footer />

            </footer>
          </div>
        </div>
      </div>

    </>)

}