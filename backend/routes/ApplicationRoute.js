const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const CompanyUser = require("../models/CompanyUser");
const CompanyPostedJob = require("../models/CompanyPostedJob");
// user apply job
router.post("/apply-job", async (req, res) => {
  const { userId, resumeId, jobId, status = "pending" } = req.body;
  try {
    if (await Application.findOne({ userId, resumeId, jobId })) {
      return res.status(400).json({ message: "Application already exists" });
    }
    const job = await CompanyPostedJob.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    const application = await Application.create({ userId, resumeId, jobId, hrId: job.hrId, status });
    const data = await Application.findById(application._id)
      .populate("userId")
      .populate("resumeId")
      .populate("jobId");
    const company = await CompanyUser.findOne({ companyId: data.jobId.companyId });
    res.status(201).json({
      ...data._doc,
      jobId: {
        ...data.jobId._doc,
        company: company
          ? { companyName: company.companyName || "Unknown Company", companyLogoUrl: company.companyLogoUrl || "" }
          : null,
      },
    });
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// checking if user has applied for a job
router.get("/user-applications/:userId", async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.params.userId });
    res.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// hr get all applications
router.get("/hr-applications/:hrId", async (req, res) => {
  try {
    const applications = await Application.find({ hrId: req.params.hrId })
      .populate({
        path: "jobId",
        select: "companyName jobTitle desiredSkills hrId hrName companyId jobDescription",
      })
      .populate({ path: "userId", select: "fullname phone email" })
      .populate("resumeId");
    const response = await Promise.all(
      applications.map(async (app) => {
        const company = await CompanyUser.findOne({ companyId: app.jobId.companyId });
        return {
          ...app._doc,
          jobId: {
            ...app.jobId._doc,
            company: company
              ? { companyName: company.companyName || "Unknown Company", companyLogoUrl: company.companyLogoUrl || "" }
              : { companyName: app.jobId.companyName, companyLogoUrl: "" },
          },
        };
      })
    );
    res.json(response);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// hr get all applications for a specific job and updating status
router.put("/application/:applicationId/status", async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.applicationId,
      { status: req.body.status },
      { new: true }
    );
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.json(application);
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// company get all applications for a specific job
router.get("/selected-applications/:companyId", async (req, res) => {
  try {
    const applications = await Application.find({ status: "selected" })
      .populate({
        path: "jobId",
        match: { companyId: req.params.companyId },
        select: "jobTitle companyId hrId hrName",
      })
      .populate("resumeId")
      .populate({ path: "userId", select: "name" });
    res.json(applications.filter((app) => app.jobId));
  } catch (error) {
    console.error("Error fetching selected applications:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;