import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import API from "../API";

const Home = () => {
  const [joblist, setJoblist] = useState([]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API}/company-all-jobs`);
      const sortedJobs = response.data
        .sort((a, b) => new Date(b.jobPostedOn) - new Date(a.jobPostedOn))
        .slice(0, 5);
      setJoblist(sortedJobs);
    } catch (error) {
      console.error("Fetch jobs error:", error.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

   const navigate = useNavigate()
   const handleJumpToJobDetail = () => {
    navigate("/Joblist");
  };

  return (
    <div id="userdashboard">
      <div className="user__container">
        <div className="table__container">
          <h2>New job list</h2>
          <table className="job-table">
            <thead>
              <tr>
                <th>S.N</th>
                <th>Company</th>
                <th>Role</th>
                <th>Location</th>
                <th>Posted On</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {joblist.map((job, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{job.companyName}</td>
                  <td>{job.jobTitle}</td>
                  <td>{job.location}</td>
                  <td>{new Date(job.jobPostedOn).toLocaleDateString()}</td>
                  <td onClick={() => handleJumpToJobDetail()}><i class="fa fa-external-link-square"></i></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
