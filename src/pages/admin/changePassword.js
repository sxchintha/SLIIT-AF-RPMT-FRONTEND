import React from "react";
import AdminPassForm from "../../components/admin/passChangeForm";

import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";

function AdminPassChange() {
    return (
        <div>
            <div className="container-fluid overflow-hidden">
                <div className="row vh-100 overflow-auto">
                    <Sidebar />

                    <div className="col d-flex flex-column h-sm-100">
                        <main className="row overflow-auto">
                            <div className="col pt-4 ps-4">
                                {/* Body */}
                                <h2>Change Password</h2>
                                <hr />
                                <AdminPassForm />

                            </div>
                        </main>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPassChange