import React, { useState } from "react";
import axios from "axios";
import { MDBDataTableV5 } from 'mdbreact'
import Footer from "../Footer";
import Sidebar from "../Sidebar";


export default function AcceptTopics () {

    const [datatable, setDatatable] = React.useState({
        columns: [
            {
                label: 'Name',
                field: 'name',
                width: 150,
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Name',
                },
            },
            {
                label: 'Position',
                field: 'position',
                width: 270,
            },
            {
                label: 'Office',
                field: 'office',
                width: 200,
            },
            {
                label: 'Age',
                field: 'age',
                sort: 'asc',
                width: 100,
            },
            {
                label: 'Start date',
                field: 'date',
                sort: 'disabled',
                width: 150,
            },
            {
                label: 'Salary',
                field: 'salary',
                sort: 'disabled',
                width: 100,
            },
        ],
        rows: [
            {
                name: 'Tiger Nixon',
                position: 'System Architect',
                office: 'Edinburgh',
                age: '61',
                date: '2011/04/25',
                salary: '$320',
            },
            {
                name: 'Garrett Winters',
                position: 'Accountant',
                office: 'Tokyo',
                age: '63',
                date: '2011/07/25',
                salary: '$170',
            },
        ],
    });

    return(
        <div>
            <div className="container-fluid overflow-hidden">
                <div className="row vh-100 overflow-auto">
                    <Sidebar />

                    <div className="col d-flex flex-column h-sm-100">
                        <main className="row overflow-auto">
                            <div className="col pt-4 ps-4">
                                {/* Body */}
                                {/* <h1>Accept Topics</h1> */}





                                <MDBDataTableV5 
                                hover 
                                entriesOptions={[5, 10, 20, 25]} 
                                entries={10} 
                                pagesAmount={4} 
                                data={datatable} 
                                searchTop 
                                searchBottom={false} />







                            </div>
                            <footer className="row bg-light py-4 mt-auto">
                                <Footer />
                            </footer>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}