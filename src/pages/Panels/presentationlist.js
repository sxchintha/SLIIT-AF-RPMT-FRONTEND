import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { MDBDataTableV5 } from 'mdbreact'
import axios from "axios";

import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";


function SubmissionList() {


    const navigate = useNavigate()
    const [datatable, setDatatable] = useState({
        columns: [],
        rows: [],
    });

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
    

    const tableColumns = [
        {
            label: 'Leader ID',
            field: 'itNumber'
        },
        {
            label: 'Topic',
            field: 'topic'
        },

        {
            label: 'Presentation Link',
            field: 'Link'
        },

        {
            label: 'Date',
            field: 'date'
        },
    ]

    useEffect(() => {
        axios
        .get(`http://localhost:8070/presentation/presentationview`, {
            headers: { Authorization: `Bearer ${token}` },
          })
            .then((res) => {
                // console.log(res.data);
                res.data.forEach(row => {
                    row.clickEvent = () => {
                        navigate(`/student/presentationview/${row.itNumber}`)
                    }
                    row._id = row._id.length
                });
                setDatatable({
                    columns: tableColumns,
                    rows: res.data
                })
            })
            .catch(err => {
                console.log(err.message);
            })
    }, []);

    return (
        <div>
        <div className="container-fluid overflow-hidden">
            <div className="row vh-100 overflow-auto">
                <Sidebar />

                <div className="col d-flex flex-column h-sm-100">
                    <main className="row overflow-auto">
                        <div className="col pt-4 ps-4">
                            {/* Body */}
                            <h2>Panel Details</h2>
                            <hr />
                           
                            
        <div>
            <MDBDataTableV5
                hover
                entriesOptions={[5, 10, 20, 25]}
                entries={10}
                pagesAmount={4}
                data={datatable}
                searchTop
                searchBottom={false} />
        </div>

        </div>
                        </main>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubmissionList;