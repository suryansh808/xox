import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CompanyHeader = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    alert("Logout Successfully");
    navigate("/");
  };

  return (
    <div id="CompanyHeader">
      <header className="company-header">
        <div className="logo">DashBoard</div>
        <div className="menu-icon" onClick={toggleSidebar}>
          ☰
        </div>
      </header>

      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>
          ×
        </button>
        <ul>
          <li>
            <Link onClick={toggleSidebar} to="/CompanyDashboard">
              <i className="fa fa-home"></i> Home
            </Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} to="/CompanyJobPost">
              <i className="fa fa-suitcase"></i> Job Post
            </Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} to="/CompanyInterviewProcess">
              <i className="fa fa-comments"></i> Interview Process
            </Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} to="/CompanyHiredCandidates">
              <i className="fa fa-users"></i> Hired Candidates
            </Link>
          </li>

          {/* <li>
            <Link onClick={toggleSidebar} to="/Settings">
              <i className="fa fa-cog"></i> Settings
            </Link>
          </li> */}
          <li>
            <button onClick={handleLogout}>
              <i className="fa fa-sign-out"></i> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CompanyHeader;
