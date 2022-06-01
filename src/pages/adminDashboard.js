import React from "react";
import { Link } from "react-router-dom"

import AcceptStaff from '../components/admin/acceptStaff'
import CountSummary from "../components/admin/countsSummary";

import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import DashboardExtra from "../components/admin/dashboardExtra";

function AdminDashboard() {
    return (
        <div>
            <div className="container-fluid overflow-hidden">
                <div className="row vh-100 overflow-auto">
                    <Sidebar />

                    <div className="col d-flex flex-column h-sm-100">
                        <main className="row overflow-auto">
                            <div className="col pt-4 ps-4">
                                {/* Body */}
                                <h2>Admins Dashboard</h2>
                                <hr />

                                {/* 4 cards with counts */}
                                <CountSummary />

                                {/* Improtant and submissions */}
                                <DashboardExtra />

                                {/* Staff requests table */}
                                <AcceptStaff />
                            </div>
                        </main>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;
