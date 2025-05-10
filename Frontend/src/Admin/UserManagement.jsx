import React, { useEffect, useState } from 'react';
import API from '../API';
import axios from 'axios';

const UserManagement = () => {
  const [responses, setResponses] = useState([]);

  const fetchContactUs = async () => {
    try {
      const res = await axios.get(`${API}/allusers`);
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
      <h2 className="contactus-title">Users List</h2>
      <div className="user__container">
      <table className="contactus-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {responses.length > 0 ? (
            responses.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-response">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
   </div>
  );
};

export default UserManagement;
