import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";

const Joblist = () => {
  const [joblist, setJoblist] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedjob, setSelectedJob] = useState();
  const [filter, setFilter] = useState(false);
  const [searchParams, setSearchParams] = useState({
    jobTitle: "",
    location: "",
  });
    
  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API}/company-all-jobs`);
      setJoblist(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Fetch jobs error:", error.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSelectedJobDetails = (job) => {
    setSelectedJob(job);
  };

  useEffect(() => {
    if (joblist && joblist.length > 0) {
      setSelectedJob(joblist[0]);
    }
  }, [joblist]);
  
 

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
    const filtered = joblist.filter((job) =>
        job.jobTitle.toLowerCase().includes(searchParams.jobTitle.toLowerCase()) &&
        job.location.toLowerCase().includes(searchParams.location.toLowerCase())
    );
    setFilteredJobs(filtered);
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
                  className="company__logo__img"
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
          {selectedjob && (
            <div className="job__details">
              <div className="job__apply">
                <h1 className="job__title">{selectedjob.jobTitle}</h1>
                <button className="apply__button">Apply Now</button>
              </div>
              <div className="job__overview">
                <p>
                  <strong>Location:</strong> {selectedjob.location}
                </p>
                <p>
                  <strong>Type:</strong> {selectedjob.jobType}
                </p>
                <p>
                  <strong>Timing:</strong> {selectedjob.jobTiming}
                </p>
                <p>
                  <strong>Positions:</strong> {selectedjob.noofposition}
                </p>
                <p>
                  <strong>Salary:</strong> ₹{selectedjob.salary.minSalary} - ₹
                  {selectedjob.salary.maxSalary} per {selectedjob.salary.per}
                </p>
                <p>
                  <strong>Working Days:</strong> {selectedjob.workingDays}
                </p>
                <p>
                  <strong>Application Deadline:</strong>{" "}
                  {selectedjob.applicationDeadline}
                </p>
                <p>
                  <strong>Experience:</strong> {selectedjob.experience} year(s)
                </p>
              </div>
              <div className="job__description">
                <strong>Job Description</strong>
                <p>{selectedjob.jobDescription.split("\n")[0]}</p>
                <ul>
                  {selectedjob.jobDescription
                    .split("\n")
                    .slice(1)
                    .map(
                      (line, idx) =>
                        line.trim() !== "" && <li key={idx}>{line}</li>
                    )}
                </ul>
              </div>
              <div className="job__requirements">
                <strong>Desired Skills</strong>
                <ul>
                  {selectedjob.desiredSkills.split(",").map((skill, idx) => (
                    <li key={idx}>{skill.trim()}</li>
                  ))}
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
