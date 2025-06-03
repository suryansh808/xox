import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const StudentHeader = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    Cookies.remove('authToken', { path: '/' });
    alert("Logout Successfully");
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div id="studentHeader">
      <header className="student-header">
        <div className="logo">🎓 Dashboard</div>
        <div className="menu-icon" onClick={toggleSidebar}>
          ☰
        </div>
      </header>

      <div
        ref={sidebarRef}
        className={`sidebar ${isSidebarOpen ? "open" : ""}`}
      >
        <button className="close-btn" onClick={toggleSidebar}>
          ×
        </button>
        <ul>
          <li>
            <Link onClick={toggleSidebar} to="/Home">
              <i className="fa fa-home"></i> Home
            </Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} to="/Joblist">
              <i className="fa fa-briefcase"></i> Jobs
            </Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} to="/AppliedStatus">
              <i className="fa fa-check-circle"></i> Applied Status
            </Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} to="/Resume">
              <i className="fa fa-file-text"></i> Create Resume
            </Link>
          </li>
          <li>
            <Link onClick={toggleSidebar} to="/Settings">
              <i className="fa fa-cog"></i> Settings
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

export default StudentHeader;
