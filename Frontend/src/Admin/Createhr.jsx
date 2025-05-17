import React, { useEffect, useState } from 'react';
import axios from "axios";
import API from "../API";

const Createhr = () => {
const [formData, setFormData] = useState({
  name: '',
    email: '',
    number: '',
    password: ''
});
  const [hrs, setHrs] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post(`${API}/createhr`, formData,);
          alert('HR created successfully');
          setFormData({
            name: '',
            email: '',
            number: '',
            password: ''
          });
          fetchHrs();
    } catch (error) {
      alert("HR Already Created With Given Details..")
       console.log(`Error: ${error.message}`);
    }
  };

  const fetchHrs = async () => {
    try {
      const response = await axios.get( `${API}/gethr`);
      setHrs(response.data);
    } catch (error) {
      alert("HR Already Created With Given Details..")
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHrs();
  }, []);

  return (
   <div id="createhr">
     <div className="hr-container">
      {/* <h2 className="hr-title">Create New HR Account</h2> */}
      <div className="hr-form-wrapper">
        <form onSubmit={handleSubmit} className="hr-form">
        <input
              type="text"
              value={formData.name}
              placeholder='Name'
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="hr-input"
              required
            />
          <input
              type="email"
              placeholder='Email ID'
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="hr-input"
              required
            />
         <input
              type="number"
              value={formData.number}
              placeholder='Number'
              onChange={(e) => setFormData({ ...formData, number: e.target.value })}
              className="hr-input"
              required
            />
          <input
              type="password"
              placeholder='Password'
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="hr-input"
              required
            />
          <button type="submit" className="hr-button">Submit</button>
        </form>
      </div>

      <h2 className="hr-table-title">HR's List</h2>
       <div className='hr-table-container'>
       <table className="hr-table">
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {hrs.length > 0 ? (
            hrs.map((hr, index) => (
              <tr key={hr._id}>
                <td>{index + 1}</td>
                <td>{hr.name}</td>
                <td>{hr.email}</td>
                <td>{hr.number}</td>
                <td>{hr.password}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-hr">No HRs found</td>
            </tr>
          )}
        </tbody>
      </table>
       </div>
    </div>
   </div>
  );
};

export default Createhr;
