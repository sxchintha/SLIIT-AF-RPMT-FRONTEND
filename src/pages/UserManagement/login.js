// import React, { useState } from "react";
import axios from "axios";
import{useState,useRef,useEffect,useContext} from "react"
import useAuth from "../../hooks/useAuth";
import {Link,useNavigate,useLocation} from 'react-router-dom'
import './login.css'
import { MDBDataTableV5 } from 'mdbreact'

import * as api from '../../index.api'

import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'




const StudentLogin=()=> {

    const {setAuth}=useAuth();

    const navigate=useNavigate();
    const location=useLocation();
    // const from = location.state?.from?.pathname ||
    // console.log(from);

    const userRef=useRef();
    const errRef=useRef();

    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    const [errMsg,setErrMsg]=useState('');
    //const [success, setSuccess]=useState(false);

    // const {setAuth}=useContext(AuthContext);

    useEffect(()=>{
        userRef.current.focus();
    },[])

    useEffect(()=>{
        setErrMsg('');
    },[username,password])

    function setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      let expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
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

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            const response=await axios.post("http://localhost:8070/main/login",JSON.stringify({username,password}),
            {
              headers:{'content-type':'application/json'},
              withCredentials:false
            })
            setCookie("userrole",(JSON.stringify(response?.data.roles)),1);
            setCookie("usertoken",(JSON.stringify(response?.data.accessToken)),1)
            setCookie("username",(JSON.stringify(response?.data.uname)),1)
            const kgs=getCookie("kg");
            console.log(response?.data.accessToken);
            // console.log(JSON.stringify(response?.data));
            //console.log(username,password);
            const accessToken=response?.data.accessToken;
            const roles=response?.data?.roles;
            // const usern=response?.data
            // setAuth({username,password,roles,accessToken});
            
            setusername('');
            setpassword('');
            // const s=localStorage.setItem('usertoken', JSON.stringify(utoken));
            localStorage.setItem('username',response?.data.uname);
            localStorage.setItem('role',response?.data.roles);
            // console.log(localStorage.getItem('role'))
            navigate("/student/dashboard");
            // if (roles==1984){
            //   navigate("student/dashboard",{replace:true});
            // }
            // else if(roles==2001){
            //   navigate("/staff")
            // }
            



        } catch(err){
          if(!err?.response){
            setErrMsg('No server Response')
          }else if (err.response?.status==400){
            setErrMsg("Missing username or passsword");
          }else if (err.response?.status==401){
            setErrMsg("Unauthorized");
          }else{
            setErrMsg('Login Failed');
          }
          // errRef.current.focus();


        }

    }

//   const [StudentDetails, SetStudentDetails] = useState({
//     email: "",
//     password: "",
//   });

//   function sendData(e) {
//     e.preventDefault();
//     const newStudentLogin = {
//       email: StudentDetails.email,
//       password: StudentDetails.password,
//     };

//     axios
//       .post("http://localhost:8070/student/login", newStudentGroup)
//       .then(() => {
//         console.log(`Hello${newStudentGroup}`);
//         alert("successful");
//       })
//       .catch((e) => {
//         console.log(newStudentGroup);
//         console.log(e);
//         alert(e.response.data.status);
//       });
//   }
  return (
    <>
    {/* {success?(
        <section>
            <h1>you are logged in</h1>
            <br/>
            <P>
                <a href="#">go to home</a>
            </P>
        </section>
    ):(
    
       */}
<section class="vh-100">
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-6 text-black">

        <div class="px-5 ms-xl-4">
          {/* <i class="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style="color: #709085;"></i> */}
          <span class="h1 fw-bold mb-0">Logo</span>
        </div>

        <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

          <form class="formlogin" onSubmit={handleSubmit}>

            <h3 class="fw-normal mb-3 pb-3">Log in</h3>

            <div class="form-outline mb-4"> 
                <label htmlFor="email">email:</label>
              <input type="text" id="username" ref={userRef} onChange={(e)=>setusername(e.target.value)} value={username} class="form-control form-control-lg" required />
              <label class="form-label" >Email address</label>
            </div>

            <div class="form-outline mb-4">
              <input type="password" id="password" ref={userRef} onChange={(e)=>setpassword(e.target.value)} value={password} required class="form-control form-control-lg" />
              <label class="form-label" >Password</label>
            </div>

            <div class="pt-1 mb-4">
              <button class="btn btn-info btn-lg btn-block" type="submit">Login</button>
            </div>

            <p class="small mb-5 pb-lg-2"><a class="text-muted" href="#!">Forgot password?</a></p>
            {/* <p>Don't have an account? <a href="#!" class="link-info">Register here</a></p> */}

          </form>

        </div>

      </div>
      <div class="col-sm-6 px-0 d-none d-sm-block">
        <img src="https://i.postimg.cc/FFgVBYMp/20210414205031-icarus-ai-history-blog.jpg"
          alt="Login image" class="w-100 vh-100"></img>
      </div>
    </div>
  </div>
</section>
    
     </> 
    
  ) }

  export default StudentLogin;

   