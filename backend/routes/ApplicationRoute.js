const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const CompanyUser = require("../models/CompanyUser");
const CompanyPostedJob = require("../models/CompanyPostedJob");
const cloudinary = require("../middleware/cloudinary");


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
//showing applied jobs to user 
router.get("/appliedjobs/:userId", async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.params.userId })
    .populate("jobId" , "jobTitle location")
    .select("-hrId  -resumeId").sort({ _id: -1 });
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
      .populate("resumeId").sort({ createdAt: -1 });
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
      .populate({ path: "userId", select: "name" }).sort({_id: -1});
    res.json(applications.filter((app) => app.jobId));
  } catch (error) {
    console.error("Error fetching selected applications:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// hr update application status and shortlisted
router.put("/application/:applicationId/companyStatus", async (req, res) => {
  try {
    const { status, shortListed } = req.body;
    const updateData = {};
    if (status) {
      updateData.companyStatus = status;
    }
    if (typeof shortListed === "boolean") {
      updateData.shortListed = shortListed;
    }
    const application = await Application.findByIdAndUpdate(
      req.params.applicationId,
      { $set: updateData },
      { new: true }
    );
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.json(application);
  } catch (error) {
    console.error("Error updating application status or shortlisted:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// showing shortlisted applications in company dashboard
router.get("/shortlisted-applications/:companyId", async (req, res) => {
  try {
    const { companyId } = req.params;
    const applications = await Application.find({
      shortListed: true,
    })
      .populate({
        path: "jobId",
        match: { companyId: companyId }, 
        select: "jobTitle companyId",
      })
      .populate("resumeId", "personalInfo.name") 
      .populate("userId", "name"); 
    const filteredApplications = applications.filter((app) => app.jobId);    
    const enrichedApplications = await Promise.all(
      filteredApplications.map(async (application) => {
        const company = await CompanyUser.findOne({
          companyId: application.jobId.companyId,
        });
        return {
          ...application._doc,
          jobId: {
            ...application.jobId._doc,
            company: company
              ? { companyName: company.companyName || "N/A" }
              : { companyName: "N/A" },
          },
        };
      })
    );

    res.json(enrichedApplications);
  } catch (error) {
    console.error("Error fetching shortlisted applications:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// showing rejected applications in HR dashboard
router.get("/rejected-applications/:HrId", async (req, res) => {  
  try {
    const applications = await Application.find({
      companyStatus: "Rejected",
    })
      .populate({
        path: "jobId",
        match: { hrId: req.params.HrId },
        select: "jobTitle hrId companyId",
      })
      .populate("resumeId")
      .populate({ path: "userId", select: "name" });
    const enrichedApplications = await Promise.all(
      applications.filter((app) => app.jobId).map(async (app) => {
        const company = await CompanyUser.findOne({ companyId: app.jobId.companyId });
        return {
          ...app._doc,
          jobId: {
            ...app.jobId._doc,
            companyId: company
              ? { companyName: company.companyName || "N/A" }
              : { companyName: "N/A" },
          },
        };
      })
    );
    res.json(enrichedApplications);
  } catch (error) {
    console.error("Error fetching rejected applications:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// showing interview applications in company dashboard
router.get("/interview-applications/:companyId", async (req, res) => {
  try {
    const applications = await Application.find({
      companyStatus: "Selected",
      jobId: { $in: await CompanyPostedJob.find({ companyId: req.params.companyId }).distinct("_id") },
    })
      .populate("userId", "name")
      .populate("resumeId")
      .populate("jobId", "jobTitle hrName");
    res.json(applications);
  } catch (error) {
    console.error("Error fetching interview applications:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// adding interview schedule
router.put("/company-application/:applicationId/interview", async (req, res) => {
  try {
    const { date, mode, link, interviewer, interviewStatus } = req.body;
    const application = await Application.findById(req.params.applicationId);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }
    const roundNumber = (application.interviews?.length || 0) + 1;
    application.interviews.push({
      round: roundNumber,
      date,
      mode,
      link,
      interviewer,
      interviewStatus,
    });
    await application.save();
    console.log("Scheduled interview for application:", {
      applicationId: req.params.applicationId,
      hrId: application.hrId,
      interview: {
        round: roundNumber,
        date,
        mode,
        link,
        interviewer,
        interviewStatus,
      },
    });
    res.json(application);
  } catch (error) {
    console.error("Error scheduling interview:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// adding feedback for interview

router.put("/company-application/:applicationId/interview/:interviewId/feedback", async (req, res) => {
  try {
    const { interviewStatus } = req.body;
    const application = await Application.findById(req.params.applicationId);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }
    const interview = application.interviews.id(req.params.interviewId);
    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }
    interview.interviewStatus = interviewStatus;
    await application.save();
    console.log("Updated interview status:", {
      applicationId: req.params.applicationId,
      interviewId: req.params.interviewId,
      interviewStatus,
    });
    res.json(application);
  } catch (error) {
    console.error("Error updating interview status:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// problem here 
router.get("/interview-applications/:hrId", async (req, res) => {
  try {
    const { hrId } = req.params;


    if (!hrId || hrId.trim() === "") {
      console.log("Invalid HR ID provided");
      return res.status(400).json({ error: "Invalid HR ID" });
    }
    const applications = await Application.find({
      hrId: hrId,
      interviews: { $exists: true, $ne: [] },
    })
      .populate({
        path: "jobId",
        select: "jobTitle companyId hrName",
      })
      .populate({
        path: "resumeId",
        select: "personalInfo",
      })
      .populate({
        path: "userId",
        select: "name",
      })
      .lean();


    if (applications.length === 0) {
    
      // Debug query
      const allApplications = await Application.find({ hrId: hrId }).lean();
      console.log("All applications for hrId:", hrId, "Count:", allApplications.length);
      return res.json([]);
    }

    const enrichedApplications = await Promise.all(
      applications.map(async (app) => {
        let company = null;
        if (app.jobId?.companyId) {
          company = await CompanyUser.findOne(
            { companyId: app.jobId.companyId },
            "companyName companyLogoUrl"
          ).lean();
        }
        return {
          ...app,
          jobId: app.jobId
            ? {
                ...app.jobId,
                company: {
                  companyName: company?.companyName || "Unknown Company",
                  companyLogoUrl: company?.companyLogoUrl || "",
                },
              }
            : {
                jobTitle: "Unknown Position",
                company: {
                  companyName: "Unknown Company",
                  companyLogoUrl: "",
                },
              },
        };
      })
    );

    res.json(enrichedApplications);
  } catch (error) {
    console.error("Error fetching applications:", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      error: "Server error",
      details: error.message || "Unknown error",
    });
  }
});



// offer letter upload from company dashboard
router.post("/upload-offer-letter", async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const { applicationId } = req.body;
    if (!applicationId) {
      return res.status(400).json({ message: "applicationId is required" });
    }
    const file = req.files.file;
    const result = await cloudinary.uploader.upload_stream(
      {
        folder: "doltec_offer_letter",
        resource_type: "auto",
      },
      async (error, result) => {
        if (error) {
          throw new Error("Cloudinary upload failed: " + error.message);
        }
        const application = await Application.findByIdAndUpdate(
          applicationId,
          { offerLetter: result.secure_url },
          { new: true }
        );
        if (!application) {
          return res.status(404).json({ message: "Application not found" });
        }
        res.json({ message: "Offer letter uploaded", offerLetter: result.secure_url });
      }
    ).end(file.data);
  } catch (error) {
    console.error("Error uploading offer letter:", error);
    res.status(500).json({ message: "Error uploading offer letter", error: error.message });
  }
});

// fetching offer letter
router.get("/offer-letter/:applicationId", async (req, res) => {
  try {
    const application = await Application.findById(req.params.applicationId);
    if (!application)
      return res.status(404).json({ message: "Application not found" });
    res.json({ offerLetter: application.offerLetter });
  } catch (error) {
    console.error("Error fetching offer letter:", error);
    res.status(500).json({ message: "Error fetching offer letter", error: error.message });
  }
});

// sending offer letter to hr 
router.post("/update-to-hr", async (req, res) => {
  try {
    const { applicationId } = req.body;
    if (!applicationId) {
      return res.status(400).json({ message: "applicationId is required" });
    }
    const application = await Application.findByIdAndUpdate(
      applicationId,
      { 
        shortListed: "true",
        updateHR: true 
      },
      { new: true }
    );
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ message: "Updated to HR successfully", application });
  } catch (error) {
    console.error("Error updating to HR:", error);
    res.status(500).json({ message: "Error updating to HR", error: error.message });
  }
});

// receiving offer letter from company dashboard to hr dashboard
router.get("/hired-applications/:HrId", async (req, res) => {
  try {
    const applications = await Application.find({
      updateHR: true,
    })
      .populate({
        path: "jobId",
        match: { hrId: req.params.HrId },
        select: "jobTitle hrId companyId",
      })
      .populate("resumeId")
      .populate({ path: "userId", select: "name" });
    const enrichedApplications = await Promise.all(
      applications.filter((app) => app.jobId).map(async (app) => {
        const company = await CompanyUser.findOne({ companyId: app.jobId.companyId });
        return {
          ...app._doc,
          jobId: {
            ...app.jobId._doc,
            companyId: company
              ? { companyName: company.companyName || "N/A" }
              : { companyName: "N/A" },
          },
        };
      })
    );

    res.json(enrichedApplications);
  } catch (error) {
    console.error("Error fetching hired applications:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;