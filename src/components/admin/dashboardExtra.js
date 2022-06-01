import React from "react";

function DashboardExtra() {
    return (
        <div className="row">
            <div className="col-lg-8">
                <div className="card mb-3">
                    <div className="card-header">
                        <i className="fa fa-bar-chart"></i> Improtant</div>
                    <div className="card-body">
                        {/* Body */}
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="card mb-3">
                    <div className="card-header">
                        <i className="fa fa-pie-chart"></i> Submissions</div>
                    <div className="card-body">
                        {/* Body */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardExtra