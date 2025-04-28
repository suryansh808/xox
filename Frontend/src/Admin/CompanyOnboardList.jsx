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

  useEffect(() => {
    fetchContactUs();
  }, []);

  return (
   <div id="contactresponse">
     <div className="contactus-container">
      <h2 className="contactus-title">Company Onboard List</h2>
      <table className="contactus-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>Position</th>
            <th>Business Model</th>
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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-response">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
   </div>
  );
};

export default CompanyOnboardList;
