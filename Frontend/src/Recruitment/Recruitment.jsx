import React from "react";
import { Link } from "react-router-dom";
import ToggleComponent from "../Components/ToggleComponent";
import Landingpage from "./Landingpage";

const Recruitment = () => {
  return (
    <div id="demo">
    <div className="demo__content">
      <nav className="newbar">
        <ul className="d-flex navbar-link">
          <li>
            <Link to="/StudentLogIn">
              Apply For Jobs
            </Link>
          </li>
          <li className="logo">
            <span className="circle-border">
              <Link to="/ITServices">
                <ToggleComponent />
              </Link>
            </span>
            <Link to="/HRLogin" >
              Team
            </Link>
          </li>
          <li>
            <Link to="/CompanyLogin">
              Hiring Partner
            </Link>
          </li>
        </ul>
      </nav>
      <div className="center__content">
        <div className="M-text">Hiring Process</div>
        <div className="doltec__text">
          <div className="XL-text">Doltec</div>
          <div className="L-text">Doltec</div>
        </div>
        <div className="text-M">BUILDING AWARENESS WITH WISDOM</div>
        <div className="social-icons">
          <span>
            <i className="fa fa-instagram"></i>
          </span>
          <span>
            <i className="fa fa-linkedin-square"></i>
          </span>
        </div>
      </div>
      <div className="featured">RECRUITMENT</div>
      <div className="recruitment-intro">
        {/* <p className="">
          At Doltec, we bridge the gap between talent and opportunity. Our
          recruitment process is designed to be transparent, efficient, and
          aligned with industry demands. Whether you're a student looking to
          launch your career, a company seeking skilled individuals, or a team
          member driving innovation — we've got you covered.
        </p>
        <p className="">
          Explore opportunities, connect with the right talent, and be a part
          of a future-focused journey.
        </p> */}
        <button> Get Started <i class="fa fa-chevron-circle-right"></i></button>
      </div>
    </div>
    <Landingpage/>
    </div>
  )
}

export default Recruitment;
