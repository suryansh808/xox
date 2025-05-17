// component issue with not rendering properly

import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";

const InterviewProcess = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hrId = localStorage.getItem("HrId");

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!hrId || hrId.trim() === "") {
        throw new Error("No valid HR ID found. Please log in again.");
      }

      console.log("Fetching applications for hrId:", hrId, "API:", API);
      const response = await axios.get(`${API}/interview-applications/${hrId}`, {
        timeout: 5000,
      });
      console.log("Received applications:", response.data, "Status:", response.status);

      if (!Array.isArray(response.data)) {
        throw new Error("Invalid response format from server");
      }

      setApplications(response.data);
    } catch (error) {

      setError(`Failed to fetch applications: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hrId) {
      fetchApplications();
    } else {
      setError("Please log in to view applications.");
    }
  }, [hrId]);

  if (loading) {
    return <div className="loading">Loading applications...</div>;
  }

  if (error) {
    return (
      <div className="error">
        Error: {error}
        <button onClick={fetchApplications} style={{ marginLeft: "10px" }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div id="interviewProcess">
      <div className="heading">
        <h2 className="job-list-title">Interview Applications</h2>
      </div>
      <table className="job-table">
        <thead className="table-header">
          <tr className="header-row">
            <th className="header-cell">Candidate Name</th>
            <th className="header-cell">Applied for Designation</th>
            <th className="header-cell">Applied on</th>
            <th className="header-cell">Company Name</th>
            <th className="header-cell">Company Status</th>
            <th className="header-cell">Interview Details</th>
            <th className="header-cell">Update Candidate</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {applications.length === 0 ? (
            <tr className="no-jobs-row">
              <td className="no-jobs-cell" colSpan="7">
                No applications with interviews found
              </td>
            </tr>
          ) : (
            applications.map((app) => (
              <tr key={app._id}>
                <td className="table-cell">
                  {app.resumeId?.personalInfo?.name ||
                    app.userId?.name ||
                    "Unknown Candidate"}
                </td>
                <td className="table-cell">
                  {app.jobId?.jobTitle || "Unknown Position"}
                </td>
                <td className="table-cell">
                  {app.createdAt
                    ? new Date(app.createdAt).toLocaleDateString()
                    : "Unknown Date"}
                </td>
                <td className="table-cell">
                  {app.jobId?.company?.companyName || "Unknown Company"}
                </td>
                <td className="table-cell">
                  {app.companyStatus && app.companyStatus !== "null"
                    ? app.companyStatus
                    : "Pending"}
                </td>
                <td className="table-cell">
                  {app.interviews && app.interviews.length > 0 ? (
                    app.interviews.map((interview, i) => (
                      <div
                        key={i}
                        style={{
                          marginBottom: "10px",
                          paddingBottom: "5px",
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        <p>
                          <strong>Round:</strong> {interview.round || "N/A"}
                        </p>
                        <p>
                          <strong>Date:</strong>{" "}
                          {interview.date
                            ? new Date(interview.date).toLocaleDateString()
                            : "Not Scheduled"}
                        </p>
                        <p>
                          <strong>Mode:</strong>{" "}
                          {interview.mode || "Not Specified"}
                        </p>
                        <p>
                          <strong>Link:</strong>{" "}
                          {interview.link ? (
                            <a
                              href={interview.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {interview.link}
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </p>
                        <p>
                          <strong>Interviewer:</strong>{" "}
                          {interview.interviewer || "Not Assigned"}
                        </p>
                        <p>
                          <strong>Status:</strong>{" "}
                          {interview.interviewStatus || "Pending"}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No interview details available</p>
                  )}
                </td>
                <td className="table-cell">
                  <button
                    onClick={() => console.log("Update candidate:", app._id)}
                    style={{ cursor: "pointer" }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InterviewProcess;