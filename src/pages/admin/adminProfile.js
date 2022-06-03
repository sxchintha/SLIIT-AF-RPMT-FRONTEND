import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminProfile from "../../components/admin/profile";
import { alertSuccess } from "../../components/Alerts";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";

export default function AdminProfilePage() {

    const location = useLocation();
    const [alert, setAlert] = useState("")

    useEffect(() => {
        // console.log(location.state);
        location.state && location.state.message ?
            setAlert(location.state.message) : setAlert("")

    }, [])

    return (
        <div>
            <div className="container-fluid overflow-hidden">
                <div className="row vh-100 overflow-auto">
                    <Sidebar />

                    <div className="col d-flex flex-column h-sm-100">
                        <main className="row overflow-auto">
                            <div className="col pt-4 ps-4">
                                {/* Body */}
                                <h2>Admin Profile</h2>
                                <hr />
                                {
                                    alert ? alertSuccess(alert) : ""
                                }
                                <AdminProfile />

                            </div>
                        </main>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}