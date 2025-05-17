import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";

const RejectedCandidates = () => {
  const [applications, setApplications] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [selectedJobDescription, setSelectedJobDescription] = useState(null);
  const hrId = localStorage.getItem("HrId");

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${API}/hr-applications/${hrId}`);
      console.log(response.data);
      const filteredApplications = response.data.filter(
        (app) => app.status.toLowerCase() === "rejected" && app.hrId === hrId
      );
      setApplications(filteredApplications);
      console.log("Filtered Applications:", filteredApplications);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };
  const handleViewResume = (resume) => {
    setSelectedResume(resume);
  };
  const handleViewJobDescription = (description) => {
    setSelectedJobDescription(description);
  };
  useEffect(() => {
    if (hrId) {
      fetchApplications();
    }
  }, [hrId]);
  return (
    <div id="rejected-applications">
      <div className="application-container">
        <h2 className="application-title">Rejected Job Applications</h2>
        <table className="application-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Candidate Name</th>
              <th>Company Name</th>
              <th>Resume</th>
              <th>Company Required Skills</th>
              <th>Company Description</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan="8">No pending applications found.</td>
              </tr>
            ) : (
              applications.map((application, index) => (
                <tr key={application._id}>
                  <td>{index + 1}</td>
                  <td>{application.resumeId.personalInfo.name}</td>
                  <td>{application.jobId.company?.companyName}</td>
                  <td>
                    <i
                      className="fa fa-eye"
                      onClick={() => handleViewResume(application.resumeId)}
                      style={{ cursor: "pointer", color: "#007bff" }}
                    ></i>
                  </td>
                  <td>{application.jobId.desiredSkills}</td>
                  <td>
                    <i
                      className="fa fa-info-circle"
                      onClick={() => handleViewJobDescription(application.jobId.jobDescription)}
                      style={{ cursor: "pointer", color: "#007bff" }}
                    ></i>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {selectedResume && (
          <div className="resume-details">
            <h3>Resume Details</h3>
            <div className="resume-section">
              <h4>Personal Information</h4>
              <p><strong>Name:</strong> {selectedResume.personalInfo.name}</p>
              <p><strong>Email:</strong> {selectedResume.personalInfo.email}</p>
              <p><strong>Phone:</strong> {selectedResume.personalInfo.phone}</p>
              <p><strong>Address:</strong> {selectedResume.personalInfo.address}</p>
            </div>
            <div className="resume-section">
              <h4>Skills</h4>
              <p>{selectedResume.skills}</p>
            </div>
            <div className="resume-section">
              <h4>Education</h4>
              {selectedResume.educations.map((edu, index) => (
                <div key={index} className="education-entry">
                  <p><strong>Institute:</strong> {edu.institute}</p>
                  <p><strong>Degree:</strong> {edu.degree}</p>
                  <p><strong>Year:</strong> {edu.year}</p>
                </div>
              ))}
            </div>
            <div className="resume-section">
              <h4>Experience</h4>
              <div className="experience-entry">
                <p><strong>Company:</strong> {selectedResume.experience.company}</p>
                <p><strong>Role:</strong> {selectedResume.experience.role}</p>
                <p><strong>Duration:</strong> {selectedResume.experience.duration}</p>
              </div>
            </div>
            <button className="resume-close-button" onClick={() => setSelectedResume(null)}>
              Close
            </button>
          </div>
        )}
        {selectedJobDescription && (
          <div className="job-description-dialog">
            <h3>Job Description</h3>
            <p>{selectedJobDescription}</p>
            <button
              className="job-description-close-button"
              onClick={() => setSelectedJobDescription(null)}
              style={{ marginTop: "10px", padding: "5px 10px" }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RejectedCandidates;
