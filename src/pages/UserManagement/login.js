// import React, { useState } from "react";
import axios from "axios";
import { useState, useRef, useEffect } from "react"
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from 'react-router-dom'
import './login.css'

const StudentLogin = () => {

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  // const from = location.state?.from?.pathname ||
  // console.log(from);

  const userRef = useRef();
  const errRef = useRef();

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  //const [success, setSuccess]=useState(false);

  // const {setAuth}=useContext(AuthContext);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [username, password])

  function setCookie(cname, cvalue, exmins) {
    const d = new Date();
    d.setTime(d.getTime() + (exmins * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8070/main/login", JSON.stringify({ username, password }),
        {
          headers: { 'content-type': 'application/json' },
          withCredentials: false
        })

      if (!response.data.error) {

        console.log(response);
        // setCookie("userrole", (JSON.stringify(response?.data.roles)), 1);
        setCookie("usertoken", response?.data.accessToken, 60)


        setusername('');
        setpassword('');
        // const s=localStorage.setItem('usertoken', JSON.stringify(utoken));
        const localToken = {
          userId: response?.data.uname, // Mongodb id 
          role: response?.data.roles, // User role
          username: username, // username entered when login
          fname: response?.data.tempName // first name
        }
        localStorage.setItem('localToken', JSON.stringify(localToken));

        response?.data.roles == 5150 ?
          // navigate('/staff/home')
          window.location.replace(`/request-supervisor`)
          : (response?.data.roles == 1984 ?
            // navigate('/student/dashboard')
            window.location.replace('/student/dashboard')
            : response?.data.roles == 2001 ?
              // navigate('/admins/home')
              window.location.replace('/admins/home')
              : navigate('/unauthorized'))
      }


    } catch (err) {
      if (!err?.response) {
        setErrMsg('No server Response')
      } else if (err.response?.status == 400) {
        setErrMsg("Missing username or passsword");
      } else if (err.response?.status == 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg('Login Failed');
      }
      // errRef.current.focus();


    }

  }


  return (
    <>
      <section className="vh-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 text-black">

              <div className="px-5 ms-xl-4">
                {/* <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style="color: #709085;"></i> */}
                <span className="h1 fw-bold mb-0">Logo</span>
              </div>

              <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

                <form className="formlogin" onSubmit={handleSubmit}>

                  <h3 className="fw-normal mb-3 pb-3">Log in</h3>

                  <div className="form-outline mb-4">
                    <label htmlFor="email">email:</label>
                    <input type="text" id="username" ref={userRef} onChange={(e) => setusername(e.target.value)} value={username} className="form-control form-control-lg" required />
                    <label className="form-label" >Email address</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="password" ref={userRef} onChange={(e) => setpassword(e.target.value)} value={password} required className="form-control form-control-lg" />
                    <label className="form-label" >Password</label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button className="btn btn-info btn-lg btn-block" type="submit">Login</button>
                  </div>

                  <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Forgot password?</a></p>
                  {/* <p>Don't have an account? <a href="#!" className="link-info">Register here</a></p> */}

                </form>

              </div>

            </div>
            <div className="col-sm-6 px-0 d-none d-sm-block">
              <img src="https://i.postimg.cc/FFgVBYMp/20210414205031-icarus-ai-history-blog.jpg"
                alt="Login image" className="w-100 vh-100"></img>
            </div>
          </div>
        </div>
      </section>

    </>

  )
}

export default StudentLogin;

