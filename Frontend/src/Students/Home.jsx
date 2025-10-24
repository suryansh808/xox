import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../API";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Cookies from "js-cookie";

const Home = () => {
  const [joblist, setJoblist] = useState([]);
  const [date, setDate] = useState(new Date());
  const [count, setCount] = useState();
const [showPopup, setShowPopup] = useState(false);
  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API}/company-all-jobs`);
      const sortedJobs = response.data.filter(item => item && item.hrId != "" && item.hrName != "")
        .sort((a, b) => new Date(b.jobPostedOn) - new Date(a.jobPostedOn))
        .slice(0, 5);
      setJoblist(sortedJobs);
    } catch (error) {
      console.error("Fetch jobs error:", error.message);
    }
  };

  const fetchCounts = async () => {
    const token = Cookies.get("authToken");
    try {
      const response = await axios.get(`${API}/userdashboardcount`,{headers: { Authorization: token}});
      setCount(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchCounts();
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      const user = JSON.parse(userData);
      const popupKey = `popupShown_${user._id}`; // unique per user

      if (!sessionStorage.getItem(popupKey)) {
        setShowPopup(true);
        sessionStorage.setItem(popupKey, "true");
      }
    }
  }, []);

  const navigate = useNavigate();
  const handleJumpToJobDetail = () => {
    navigate("/Joblist");
  };

  const resume = () => {
    navigate("/Resume");
  };

  return (
    <div id="userdashboard">
      <div className="user__container">
        <div className="table__container">
          <h2>Latest jobs</h2>
          <div className="joblist">
            {joblist.map((job, index) => (
              <div className="latestjobcard" key={index}>
                <div className="companyName">
                  <h3>{job.companyName}</h3>
                  <h3>Hiring</h3>
                  <h3>{new Date(job.jobPostedOn).toLocaleDateString()}</h3>
                </div>
                <div
                  className="redirecttojob"
                  onClick={() => handleJumpToJobDetail()}
                >
                  {" "}
                  See More <i class="fa fa-external-link-square"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="side__table">
          <h2>Application Status</h2>
          <div className="card__containers">
            <div className="counter__card">
              <div className="content">
                <i class="fa fa-hourglass" style={{ color: "blue" }}></i>
                <h2>Pending</h2>
              </div>
              <div className="count">{count?.pending}</div>
            </div>
            <div className="counter__card">
              <div className="content">
                <i class="fa fa-check" style={{ color: "green" }}></i>
                <h2>Selected</h2>
              </div>
              <div className="count">{count?.shortListed}</div>
            </div>
            <div className="counter__card">
              <div className="content">
                <i class="fa fa-times" style={{ color: "red" }}></i>
                <h2>Rejected</h2>
              </div>
              <div className="count">{count?.rejected}</div>
            </div>
            <div className="counter__card resume">
              <div className="content">
                <i class="fa fa-file-pdf-o" style={{ color: "red" }}></i>
                <h2>Last Resume Updated</h2>
              </div>
              <div className="count">
                {count?.resumesUpdatedAt
                  ? new Date(
                      count.resumesUpdatedAt
                    ).toLocaleDateString()
                  : "No resume updated"}
              </div>
              <button onClick={resume} className="updatebtn">
                UPDATE
              </button>
            </div>      
          </div>
          <div className="calendar__container">
            <Calendar onChange={setDate} value={date} />
          </div>
        </div>
      </div>
      {showPopup && (
  <div style={overlayStyle}>
    <div style={popupStyle}>
      <h2>Welcome!</h2>
      <p>
        Here’s a quick overview of your dashboard features. Explore the 
        <strong> Community Page</strong> to connect with others and make new friends!
      </p>
      <button style={popupbtn} onClick={() => setShowPopup(false)}>Close</button>
      <button style={popupbtn} onClick={() => navigate("/community")}>
        Go to Community Page
      </button>
    </div>
  </div>
)}

    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const popupStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "#fff",
  color: "#000",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
  width: "300px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  animation: "fadeIn 0.3s ease-in-out",
};
const popupbtn = {
  marginTop: "20px",
  padding: "10px 20px",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "16px",
  transition: "background-color 0.3s ease",
  hover: {
    backgroundColor: "#0056b3",
    },
  };

export default Home;
