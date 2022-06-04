import React from "react";
import '../style/home.css';
import img from '../assets/img/home.png';
import logoimg from '../assets/img/SLIIT.png';

export default function HomePage() {

  return (
    <>
      <main>
        <div className="big-wrapper light">
          <img src="./img/shape.png" alt="" className="shape" />

          <header>
            <div className="container">
              <div className="logo">
                <img src={logoimg} alt="Logo" />

              </div>

              <div className="links">
                <ul>
                  <li><a className="ahref" href="#">Features</a></li>
                  <li><a href="#" className="ahref">Pricing</a></li>
                  <li><a href="#" className="ahref">Testimonials</a></li>
                  <li><a href="#" className="button ahref">Sign up</a></li>
                </ul>
              </div>

              <div className="overlay"></div>

              <div className="hamburger-menu">
                <div className="bar"></div>
              </div>
            </div>
          </header>

          <div className="showcase-area">
            <div className="container">
              <div className="left">
                <div className="big-title">
                  <h1>Research Project</h1>
                  <h1>Management Tool</h1>
                </div>
                <p className="text">
                  Welcome to the SLIIT Research Project Management Tool
                </p>
                <div className="cta">
                  <a href="/login" className="button ahref">Login</a>
                </div>
              </div>

              <div className="right">
                <img src={img} alt="Person Image" className="person" />
              </div>
            </div>
          </div>


        </div>
      </main>
    </>
  )

}