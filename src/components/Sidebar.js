import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getStaffMember } from "../index.api";
import '../style/Sidebar.scss'

function Sidebar() {
    // To set utoken temporarily
    // const utoken = {
    //     username: 'Sachintha',
    //     role: "admin"
    // }
    // localStorage.setItem('usertoken', JSON.stringify(utoken))
    // const usertoken = JSON.parse(localStorage.getItem('usertoken'))

    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const localToken = JSON.parse(localStorage.getItem('localToken'))

    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return false;
    }

    useEffect(() => {
        localToken && getCookie('usertoken') ? (
            setUsername(localToken.fname)
        ) : navigate('/login')

        console.log("Local Storage: " + localStorage.getItem('localToken'));
        // console.log("Cookie: " + getCookie('usertoken'));
    })

    logOut = (e) => {
        e.preventDefault()
        document.cookie = "usertoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem('usertoken')
        navigate('/login')
    }

    return (
        <div className="col-12 col-sm-3 col-xl-2 px-sm-2 px-0 d-flex sticky-top sxch-sidenav ">
            <div className="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start px-3 pt-2 text-white">
                {/* <a href="/" className="d-flex align-items-center pb-sm-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-5">B<span className="d-none d-sm-inline">rand</span></span>
                </a> */}
                <div className="mt-5"></div>
                {
                    localToken.role == 2001 ?
                        <ul className="nav nav-pills flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start" id="menu">
                            <li className="nav-item">
                                <Link to='/admins/home' className="nav-link px-sm-0 px-2">
                                    <i className="fs-5 bi-house"></i><span className="ms-1 d-none d-sm-inline"> Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/markingschemes' className="nav-link px-sm-0 px-2">
                                    <i className="bi bi-journal-check"></i><span className="ms-1 d-none d-sm-inline"> Marking Schemes</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/panels' className="nav-link px-sm-0 px-2">
                                    <i className="bi bi-person-video2"></i><span className="ms-1 d-none d-sm-inline"> Panels</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/submissions' className="nav-link px-sm-0 px-2">
                                    <i className="bi bi-upload"></i><span className="ms-1 d-none d-sm-inline"> Submissions</span>
                                </Link>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="nav-link dropdown-toggle px-sm-0 px-1" id="dropdownuserm" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-people-fill"></i><span className="ms-1 d-none d-sm-inline"> User Management</span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownuserm">
                                    <li><Link to='/staff' className="dropdown-item">Staff</Link></li>
                                    <li><Link to='/students' className="dropdown-item">Students</Link></li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <Link to='/admins' className="dropdown-item">Admins</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to='/studentgroups' className="nav-link px-sm-0 px-2">
                                    <i className="fs-5 bi-people"></i><span className="ms-1 d-none d-sm-inline"> Student Groups</span>
                                </Link>
                            </li>
                        </ul>

                        : (
                            localToken.role == 1984 ?
                                <ul className="nav nav-pills flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start" id="menu">
                                    <li>this is staff</li>
                                </ul>
                                : (
                                    localToken.role == 5150 ?
                                        <ul className="nav nav-pills flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start" id="menu">
                                            <li>this is student</li>
                                        </ul>
                                        : <ul className="nav nav-pills flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start" id="menu"></ul>
                                )
                        )
                }

                <div className="dropdown py-sm-4 mt-sm-auto ms-auto ms-sm-0 flex-shrink-1">
                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <i width="28" height="28" className="bi bi-person-circle"></i>
                        <span className="d-none d-sm-inline mx-2">{username}</span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        {/* <li><a className="dropdown-item" href="#">New project...</a></li> */}
                        {/* <li><a className="dropdown-item" href="#">Settings</a></li> */}
                        <li><Link to='/admins/profile' className="dropdown-item">Profile</Link></li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li><button className="dropdown-item" onClick={logOut}>Sign out</button></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar