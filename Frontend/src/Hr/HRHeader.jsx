import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HRHeader = () => {
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
    <div id="HRHeader">
      <header className="HR-header">
        <div className="logo">Dashboard</div>
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
            <Link onClick={toggleSidebar} to="/HRHome">
              <i className="fa fa-house"></i> Home
            </Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} to="/CompanyJoblist">
              <i className="fa fa-briefcase"></i> Company Job List
            </Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} to="/JobApplications">
              <i className="fa fa-users"></i> Job Applications
            </Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} to="/InterviewProcess">
              <i className="fa fa-comments"></i> Interview Process
            </Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} to="/SelectedCandidates">
              <i className="fa fa-user-check"></i> Selected Candidates
            </Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} to="/RejectedCandidates">
              <i className="fa fa-user-times"></i> Rejected Candidates
            </Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} to="/HiredCandidates">
              <i className="fa fa-user-tie"></i> Hired Candidates
            </Link>
          </li>
          <li>
            <button onClick={handleLogout}>
              <i className="fa fa-right-from-bracket"></i> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HRHeader;
