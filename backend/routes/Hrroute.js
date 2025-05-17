const express = require("express");
const router = express.Router();
const Createhr = require("../models/Createhr");
const Application = require("../models/Application");
const CompanyJobs =  require("../models/CompanyPostedJob");

//login hr
router.post("/hrlogin", async (req, res) => {
  try {
    const hr = await Createhr.findOne({ email: req.body.email });
    if (!hr) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    if (req.body.password !== hr.password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    res.status(200).json({
      message: "HR logged in successfully",
      hr: hr._id,
      email: hr.email,
      HrId: hr.HrId, // Include HrId in response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// HR Dashboard Route
router.get("/hrdashboardcount/:hrId", async (req, res) => {
  try {
    const hrId = req.params.hrId;
    if (!hrId) {return res.status(400).json({ error: "hrId is required" });}
    const assignedApplications = await Application.find({ hrId });
    const assignedjobs =  await CompanyJobs.countDocuments({hrId});
    const jobIds = assignedApplications.map(app => app.jobId);
    const applicationreceived = new Set(jobIds.map(id => id.toString())).size;
    const shortListed = assignedApplications.filter(app => app.shortListed).length;
    const rejectedwhileinterview = assignedApplications.filter(app => app.interviews.some(interview => interview.interviewStatus === "Rejected")).length;
    res.json({ applicationreceived, assignedjobs, shortListed,  rejectedwhileinterview});
  } catch (error) {
    console.error("Error in HR Dashboard Route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
