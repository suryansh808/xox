import React, { useEffect, useState } from 'react';
import API from '../API';
import axios from 'axios';

const CompanyOnboardList = () => {
  const [responses, setResponses] = useState([]);

  const fetchContactUs = async () => {
    try {
      const res = await axios.get(`${API}/allcompany`);
      setResponses(res.data);
    } catch (err) {
      console.error('Error fetching users:', err.message);
    }
  };

    const handleAddJobLimit = async (companyId) => {
      const confirmAddLimit = window.confirm('Are you sure you want to add a job post limit for this company?');
    if (!confirmAddLimit) {
      return;
    }
    try {
      const response = await axios.post(`${API}/increment-job-limit`, { companyId });
      alert(response.data.message);
       fetchContactUs();
      // const updatedCompanies = await axios.get(`${API}/companies`);
      // setCompanies(updatedCompanies.data);
    } catch (error) {
      alert('Failed to update job limit: ' + error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchContactUs();
  }, []);

  return (
   <div id="contactresponse">
     <div className="contactus-container">
      <h2 className="contactus-title">Company Onboard List</h2>
       <div className="user__container">
       <table className="contactus-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>Position</th>
            <th>Business Model</th>
            <th>Job Post Limit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {responses.length > 0 ? (
            responses.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.companyName}</td>
                <td>{item.email}</td>
                <td>{item.companyType ? item.companyType : item.otherCompanyType}</td>
                <td>{item.position}</td>
                <td>{item.businessmodel}</td>
                <td>{item.jobPostLimit}</td>
                 <td>
                  <button
                    onClick={() => handleAddJobLimit(item.companyId)}
                    className="add-limit-button"
                  >
                    Add Limit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-response">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
       </div>
    </div>
   </div>
  );
};

export default CompanyOnboardList;
