import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import '../style/Sidebar.scss'

function Sidebar() {
    // To set utoken temporarily
    const utoken = {
        username: 'Sachintha',
        role: "admin"
    }
    localStorage.setItem('usertoken', JSON.stringify(utoken))


    const usertoken = JSON.parse(localStorage.getItem('usertoken'))
    const [username, setUsername] = useState(usertoken.username);

    return (
        <div className="col-12 col-sm-3 col-xl-2 px-sm-2 px-0 d-flex sticky-top sxch-sidenav ">
            <div className="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start px-3 pt-2 text-white">
                {/* <a href="/" className="d-flex align-items-center pb-sm-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="fs-5">B<span className="d-none d-sm-inline">rand</span></span>
                        </a> */}
                <div className="mt-5"></div>
                <ul className="nav nav-pills flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start" id="menu">
                    <li className="nav-item">
                        <a href="#" className="nav-link px-sm-0 px-2">
                            <i className="fs-5 bi-house"></i><span className="ms-1 d-none d-sm-inline"> Home</span>
                        </a>
                    </li>
                    <li>
                        <Link to='/markingschemes' className="nav-link px-sm-0 px-2">
                            <i className="bi bi-journal-check"></i><span className="ms-1 d-none d-sm-inline"> Marking Schemes</span>
                        </Link>
                    </li>
                    {/* <li>
                        <Link to='/usermanagement' className="nav-link px-sm-0 px-2">
                            <i className="bi bi-people-fill"></i><span className="ms-1 d-none d-sm-inline"> User Management</span>
                        </Link>
                    </li> */}
                    <li className="dropdown">
                        <a href="#" className="nav-link dropdown-toggle px-sm-0 px-1" id="dropdownuserm" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bi bi-people-fill"></i><span className="ms-1 d-none d-sm-inline"> User Management</span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownuserm">
                            <li><a className="dropdown-item" href="/staff"> Staff</a></li>
                            <li><a className="dropdown-item" href="/students"> Students</a></li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <Link to='/admins' className="dropdown-item">Admins</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-sm-0 px-2">
                            <i className="fs-5 bi-speedometer2"></i><span className="ms-1 d-none d-sm-inline"> Dashboard</span> </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link px-sm-0 px-2">
                            <i className="fs-5 bi-table"></i><span className="ms-1 d-none d-sm-inline"> Orders</span></a>
                    </li>
                    <li className="dropdown">
                        <a href="#" className="nav-link dropdown-toggle px-sm-0 px-1" id="dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fs-5 bi-bootstrap"></i><span className="ms-1 d-none d-sm-inline"> Bootstrap</span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdown">
                            <li><a className="dropdown-item" href="#"> New project...</a></li>
                            <li><a className="dropdown-item" href="#"> Settings</a></li>
                            <li><a className="dropdown-item" href="#"> Profile</a></li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li><a className="dropdown-item" href="#">Sign out</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="nav-link px-sm-0 px-2">
                            <i className="fs-5 bi-grid"></i><span className="ms-1 d-none d-sm-inline"> Products</span></a>
                    </li>
                    <li>
                        <a href="#" className="nav-link px-sm-0 px-2">
                            <i className="fs-5 bi-people"></i><span className="ms-1 d-none d-sm-inline"> Customers</span> </a>
                    </li>
                </ul>
                <div className="dropdown py-sm-4 mt-sm-auto ms-auto ms-sm-0 flex-shrink-1">
                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <i width="28" height="28" className="bi bi-person-circle"></i>
                        <span className="d-none d-sm-inline mx-2">{username}</span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li><a className="dropdown-item" href="#">New project...</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li><a className="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar