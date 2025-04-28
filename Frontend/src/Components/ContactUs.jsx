import React, {useState } from 'react';
import axios from 'axios';
import API from "../API";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/contactus`, formData);
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
      }),
      setDialogOpen(true);
    } catch (error) {
      alert('Error submitting data');
    }
  };

  return (
    <div className="contact-container">
      <div className="form-section">
        <form  onSubmit={handleSubmit} className="contact-form">
          <h2 className="form-title">Get in Touch</h2>

          <div className="form-group two-columns">
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="phone"
              value={formData.phone}
              placeholder="Phone Number"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email Address"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <textarea
              name="message"
              value={formData.message}
              placeholder="Your Message"
              rows="5"
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-button">Send Message</button>
        </form>

        {isDialogOpen && (
          <div className="dialog-overlay">
            <div className="dialog-box">
              <h3>Thank You!</h3>
              <p>Your message has been submitted successfully.</p>
              <p>We will get back to you shortly.</p>
              <button onClick={() => setDialogOpen(false)}>Close</button>
            </div>
          </div>
        )}
      </div>

      <div className="contact-info">
        <h2>Our Address</h2>
        <p>
          <strong>Krutanic Solutions</strong>
          2nd floor, 33, Chikkathogur Main Rd,
          Pragathi Nagar, Electronic City,
          Bengaluru, Karnataka 560100
        </p>
        <p>
          Phone: <a href="tel:+91976885083">+91 976885083</a></p>
          <p>  Email: <a href="mailto:doltec@gmail.com">doltec@gmail.com</a>
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
