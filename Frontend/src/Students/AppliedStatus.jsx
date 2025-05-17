import { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";

const AppliedStatus = () => {
  const [joblist, setJoblist] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const userId = localStorage.getItem("user");

  const fetchAppliedJobs = async () => {
    try {
      const response = await axios.get(`${API}/appliedjobs/${userId}`);
      console.log(response.data)
      setJoblist(response.data);
    } catch (error) {
      console.error("Fetch applied jobs error:", error.message);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

    useEffect(() => {
      if (joblist && joblist.length > 0) {
        setSelectedJob(joblist[0]);
      }
    }, [joblist]);

  const handleSelectedJobDetails = (job) => {
    setSelectedJob(job);
  };

  return (
    <div id="appliedjoblist">
      <div className="joblist__container">
        <div className="joblist__sidebar">
          {joblist.map((job, index) => (
            <div
              onClick={() => handleSelectedJobDetails(job)}
              key={index}
              className="job__titleandlocation"
            >
              <div className="company__name">
                <strong>{job.jobId.jobTitle}</strong>
      <p>{job.jobId.location}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="joblist__content">
          {selectedJob && (
            <div className="job__details">
               <div className="job__apply">
                <h1 className="job__title">{selectedJob.jobId.jobTitle}</h1>
              </div>  
              <div className="application__status">
                 <h2>Applications Status :</h2>
              </div> 
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppliedStatus;
