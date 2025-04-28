import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";

const JobApplications = () => {
  const [applications, setApplications] = useState([]);
  const hrname = localStorage.getItem("HrName");
  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${API}/applications`);
      setApplications(
        response.data.filter(
          (app) => app.status === "Pending" && app.hrName === hrname
        )
      );
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div id="jobapplications">
      <div className="application-container">
        <h2 className="application-title">Pending Job Applications</h2>

        <table className="application-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Company Name</th>
              <th>Job Title</th>
              <th>Candidate Name</th>
              <th>Candidate Mobile No</th>
              <th>Candidate Email</th>
              <th>Skills Required</th>
              <th>Resume</th>
              <th>HR Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr key={application._id}>
                <td>{index + 1}</td>
                <td>{application.jobId.companyName}</td>
                <td>{application.jobId.jobTitle}</td>
                <td>{application.userId.fullname}</td>
                <td>{application.userId.phone}</td>
                <td>{application.userId.email}</td>
                <td>{application.jobId.desiredSkills}</td>
                <td className="resume-link">Resume</td>
                <td>{application.hrName}</td>
                <td>
                  <button className="accept-button">Accept</button>
                  <button className="reject-button">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobApplications;
