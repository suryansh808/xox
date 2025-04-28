import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";

const Resume = () => {
  const id = localStorage.getItem("user");

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [educations, setEducations] = useState([
    { institute: "", degree: "", year: "" },
  ]);
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState({
    company: "",
    role: "",
    duration: "",
  });
  const handleEducationChange = (index, field, value) => {
    const newEducations = [...educations];
    newEducations[index][field] = value;
    setEducations(newEducations);
  };

  const addEducation = () => {
    setEducations([...educations, { institute: "", degree: "", year: "" }]);
  };

  const [resume, setResume] = useState(null);
  const [viewData, setViewData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resumeData = {
      userId: id,
      personalInfo,
      educations,
      skills,
      experience,
    };
    try {
      if (isEditing) {
        await axios.put(`${API}/resumes/${editingId}`, resumeData);
        alert("Resume updated successfully!");
      } else {
        await axios.post(`${API}/resumes`, resumeData);
        alert("Resume created successfully!");
      }
      setPersonalInfo({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
      setEducations([{ institute: "", degree: "", year: "" }]);
      setSkills("");
      setExperience({
        company: "",
        role: "",
        duration: "",
      });
      setIsEditing(false);
      setEditingId(null);
      fetchUserResumes();
    } catch (error) {
      alert("Error creating resume. Please try again.");
      console.error("Error creating resume:", error.response.data.error);
    }
  };

  const fetchUserResumes = async () => {
    try {
      const response = await axios.get(`${API}/resume/${id}`);
      setResume(response.data);
    } catch (error) {
      console.error(
        "Error fetching user resumes:",
        error.response?.data?.error || error.message
      );
    }
  };
  useEffect(() => {
    fetchUserResumes();
  }, []);

  const handleView = (resume) => {
    setViewData(resume[0]);
  };

  const handleEdit = (resume) => {
    setIsEditing(true);
    setViewData(null);
    setPersonalInfo(resume[0].personalInfo);
    setEducations(resume[0].educations);
    setExperience(resume[0].experience);
    setSkills(resume[0].skills);
    setEditingId(resume[0]._id);
  };

  return (
    <div id="resume">
      {/* <div className="container__resume"> */}
      {viewData && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setViewData(null)}>
              &times;
            </span>
            <h2>Resume View</h2>
            <h3>Personal Info:</h3>
            <p>
              <strong>Name:</strong> {viewData?.personalInfo?.name}
            </p>
            <p>
              <strong>Email:</strong> {viewData?.personalInfo?.email}
            </p>
            <p>
              <strong>Phone:</strong> {viewData?.personalInfo?.phone}
            </p>
            <p>
              <strong>Address:</strong> {viewData?.personalInfo?.address}
            </p>
            <hr />
            <h3>Education:</h3>
            {viewData?.educations?.map((edu, index) => (
              <div key={index}>
                <p>
                  <strong>Institute:</strong> {edu.institute}
                </p>
                <p>
                  <strong>Degree:</strong> {edu.degree}
                </p>
                <p>
                  <strong>Year:</strong> {edu.year}
                </p>
              </div>
            ))}
            <hr />
            <h3>Skills:</h3>
            <p>
              <strong>Skills:</strong> {viewData?.skills}
            </p>
            <hr />
            <h3>Experience:</h3>
            <p>Company: {viewData?.experience?.company}</p>
            <p>Role: {viewData?.experience?.role}</p>
            <p>Duration: {viewData?.experience?.duration}</p>
          </div>
        </div>
      )}

      <div className="resume-container">
        <div className="heading">
          <h1>Resume</h1>
          {resume && (
            <div className="btn">
              <button className="btn__view" onClick={() => handleView(resume)}>
                <i className="fa fa-eye"></i>
              </button>
              <button className="btn__edit" onClick={() => handleEdit(resume)}>
                <i className="fa fa-pencil-square-o"></i>
              </button>
            </div>
          )}
        </div>
        <form className="resume-form" onSubmit={handleSubmit}>
          {/* Personal Info */}
          <section>
            <h2>Personal Information</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={personalInfo.name}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, name: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={personalInfo.email}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, email: e.target.value })
              }
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={personalInfo.phone}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, phone: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={personalInfo.address}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, address: e.target.value })
              }
              required
            />
          </section>

          {/* Education Section */}
          <section>
            <h2>Education</h2>
            {educations.map((edu, index) => (
              <div key={index} className="education-block">
                <input
                  type="text"
                  placeholder="Institute Name"
                  value={edu.institute}
                  onChange={(e) =>
                    handleEducationChange(index, "institute", e.target.value)
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) =>
                    handleEducationChange(index, "degree", e.target.value)
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Year of Passing"
                  value={edu.year}
                  onChange={(e) =>
                    handleEducationChange(index, "year", e.target.value)
                  }
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setEducations([
                  ...educations,
                  { institute: "", degree: "", year: "" },
                ])
              }
              className="add-btn"
            >
              + Add More Education
            </button>
          </section>

          {/* Skills */}
          <section>
            <h2>Skills</h2>
            <input
              type="text"
              placeholder="e.g. JavaScript, React, CSS"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
            />
          </section>

          {/* Experience */}
          <section>
            <h2>Experience</h2>
            <input
              type="text"
              placeholder="Company Name"
              value={experience.company}
              onChange={(e) =>
                setExperience({ ...experience, company: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Role / Position"
              value={experience.role}
              onChange={(e) =>
                setExperience({ ...experience, role: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Duration"
              value={experience.duration}
              onChange={(e) =>
                setExperience({ ...experience, duration: e.target.value })
              }
              required
            />
          </section>

          {/* Submit */}
          <button type="submit" className="submit-btn">
            {isEditing ? "Update Resume" : "Create Resume"}
            <i className="fa fa-paper-plane"></i>
          </button>
        </form>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Resume;
