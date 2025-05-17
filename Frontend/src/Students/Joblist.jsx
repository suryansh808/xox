import { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";

const Joblist = () => {
  const [joblist, setJoblist] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchParams, setSearchParams] = useState({
    jobTitle: "",
    location: "",
  });
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const userId = localStorage.getItem("user");

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API}/company-all-jobs`);
      // console.log(response.data.filter(item => item && item.hrId != null && item.hrName != null));
      setJoblist(response.data.filter(item => item && item.hrId != "" && item.hrName != ""));
    } catch (error) {
      console.error("Fetch jobs error:", error.message);
    }
  };
  const fetchUserResumes = async () => {
    try {
      const response = await axios.get(`${API}/resume/${userId}`);
      setResumes(response.data);
      if (response.data.length > 0) {
        setSelectedResumeId(response.data[0]._id);
      }
    } catch (error) {
      console.error("Fetch resumes error:", error.message);
    }
  };
  const fetchAppliedJobs = async () => {
    try {
      const response = await axios.get(`${API}/user-applications/${userId}`);
      const appliedJobIds = response.data.map((application) => application.jobId);
      setAppliedJobs(appliedJobIds);
    } catch (error) {
      console.error("Fetch applied jobs error:", error.message);
    }
  };

  useEffect(() => {
    fetchJobs();
    if (userId) {
      fetchUserResumes();
      fetchAppliedJobs();
    }
  }, [userId]);

  useEffect(() => {
    if (joblist && joblist.length > 0) {
      setSelectedJob(joblist[0]);
    }
  }, [joblist]);
  
  const handleSelectedJobDetails = (job) => {
    setSelectedJob(job);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const filtered = joblist.filter(
      (job) =>
        job.jobTitle.toLowerCase().includes(searchParams.jobTitle.toLowerCase()) &&
        job.location.toLowerCase().includes(searchParams.location.toLowerCase())
    );
    setFilteredJobs(filtered);
  };
  const handleJobApplication = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("User ID is missing. Please ensure you are logged in.");
      return;
    }
    if (!selectedResumeId) {
      alert("Please select a resume before applying.");
      return;
    }
    if (!selectedJob) {
      alert("No job selected.");
      return;
    }
    const jobId = selectedJob._id;
    const status = "pending";
    try {
      const response = await axios.post(`${API}/apply-job`, {
        userId,
        resumeId: selectedResumeId,
        jobId,
        status,
      });
      setAppliedJobs((prev) => {
        if (!prev.includes(jobId)) {
          return [...prev, jobId];
        }
        return prev;
      });
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error applying for job:", error.message);
      alert("Error applying for job. Please try again.");
    }
  };

  return (
    <div id="joblist">
      <div className="filterandsearchbar">
        <div className="searchbar">
          <input
            type="search"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            name="jobTitle"
            id="jobTitle"
            placeholder="Search by job title..."
            title="Search by job title"
          />
          <input
            type="search"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            name="location"
            id="location"
            placeholder="Search by location..."
            title="Search by location"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div className="joblist__container">
        <div className="joblist__sidebar">
          {(filteredJobs.length > 0 ? filteredJobs : joblist).map((job, index) => (
            <div
              onClick={() => handleSelectedJobDetails(job)}
              key={index}
              className="job__titleandlocation"
            >
              <div className="company__logo">
                <img
                  src={job.companyLogoUrl || "/default-logo.png"}
                  alt="logo"
                />
              </div>
              <div className="company__name">
                <strong className="">{job.jobTitle}</strong>
                <p className="">{job.location}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="joblist__content">
          {selectedJob && (
            <div className="job__details">
              <div className="job__apply">
                <h1 className="job__title">{selectedJob.jobTitle}</h1>
                <button
                  onClick={handleJobApplication}
                  className={`apply__button ${
                    appliedJobs.includes(selectedJob._id) ? "applied" : ""
                  }`}
                  disabled={appliedJobs.includes(selectedJob._id)}
                >
                  {appliedJobs.includes(selectedJob._id) ? "Applied" : "Apply Now"}
                </button>
              </div>
              <div className="job__overview">
                <p>
                  <strong>Company :</strong> {selectedJob.companyName}
                </p>
                <p>
                  <strong>Location :</strong> {selectedJob.location}
                </p>
                <p>
                  <strong>Type :</strong> {selectedJob.jobType}
                </p>
                <p>
                  <strong>Timing :</strong> {selectedJob.jobTiming}
                </p>
                <p>
                  <strong>Positions :</strong> {selectedJob.noofposition}
                </p>
                <p>
                  <strong>Salary :</strong> ₹{selectedJob.salary.minSalary} - ₹
                  {selectedJob.salary.maxSalary} per {selectedJob.salary.per}
                </p>
                <p>
                  <strong>Working Days :</strong> {selectedJob.workingDays}
                </p>
                <p>
                  <strong>Application Deadline :</strong>{" "}
                  {selectedJob.applicationDeadline}
                </p>
                <p>
                  <strong>Experience :</strong> {selectedJob.experience} year(s)
                </p>
              </div>
              <div className="job__requirements">
                <strong>Desired Skills</strong>
                <ul>
                  {selectedJob.desiredSkills.split(",").map((skill, idx) => (
                    <li key={idx}>*{skill.trim()}</li>
                  ))}
                </ul>
              </div>
              <div className="job__description">
                <strong>Job Description</strong>
                <p>{selectedJob.jobDescription.split("\n")[0]}</p>
                <ul>
                  {selectedJob.jobDescription
                    .split("\n")
                    .slice(1)
                    .map(
                      (line, idx) =>
                        line.trim() !== "" && <li key={idx}>{line}</li>
                    )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Joblist;