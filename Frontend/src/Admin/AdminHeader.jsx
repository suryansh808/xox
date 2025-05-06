import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
 
  const navigate = useNavigate();
  const handleLogout = ()=>{
    alert("Logout Successfully");
    navigate("/");
  }

  return (
    <div id="AdminHeader">
      <header className="admin-header">
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
    <Link onClick={toggleSidebar} to="/Dashboard">
      <i className="fa fa-home"></i> Home
    </Link>
  </li>
  <li>
    <Link onClick={toggleSidebar} to="/UpdateLandingPage">
      <i className="fa fa-edit"></i> Update Landing Page
    </Link>
  </li>
  <li>
    <Link onClick={toggleSidebar} to="/ManageThoughts">
      <i className="fa fa-comments"></i> Manage Thoughts
    </Link>
  </li>
  <li>
    <Link onClick={toggleSidebar} to="/CreateHR">
      <i className="fa fa-user-plus"></i> Create HR
    </Link>
  </li>
  <li>
    <Link onClick={toggleSidebar} to="/CompanyJobs">
      <i className="fa fa-briefcase"></i> Company Jobs
    </Link>
  </li>
  <li>
    <Link onClick={toggleSidebar} to="/AssignedJobs">
      <i className="fa fa-tasks"></i> Assigned Jobs
    </Link>
  </li>
  <li>
    <Link onClick={toggleSidebar} to="/UserManagement">
      <i className="fa fa-users"></i> User Management
    </Link>
  </li>
  <li>
    <Link onClick={toggleSidebar} to="/CompanyOnboardList">
      <i className="fa fa-building"></i> Company Onboard List
    </Link>
  </li>
  <li>
    <Link onClick={toggleSidebar} to="/ContactUsResponse">
      <i className="fa fa-envelope"></i> Contact Us
    </Link>
  </li>
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

export default AdminHeader;
