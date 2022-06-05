import React from "react";
import UpdateAdminForm from "../../components/admin/updateProfile";
import Footer from "../../components/Footer";
import Unauthorized from "../../components/landing/Unauthorized";
import Sidebar from "../../components/Sidebar";


function AdminProfileUpdate() {

    const localToken = JSON.parse(localStorage.getItem("localToken"));

    return (
        <div>
            {
                localToken.role == 2001 ?
                    <div className="container-fluid overflow-hidden">
                        <div className="row vh-100 overflow-auto">
                            <Sidebar />

                            <div className="col d-flex flex-column h-sm-100">
                                <main className="row overflow-auto">
                                    <div className="col pt-4 ps-4">
                                        {/* Body */}
                                        <h2>Update Profile</h2>
                                        <hr />
                                        <UpdateAdminForm />

                                    </div>
                                </main>
                                <Footer />
                            </div>
                        </div>
                    </div>
                    : <Unauthorized />
            }
        </div>
    )
}

export default AdminProfileUpdate;