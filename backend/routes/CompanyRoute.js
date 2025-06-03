const express = require("express");
const Company = require("../models/CompanyUser");
const router = express.Router();
const CompanyPostedJob  = require("../models/CompanyPostedJob");
const cloudinary = require("../middleware/cloudinary")
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post('/company-signup', async (req, res) => {
  try {
    const { companyName, companyType, otherCompanyType, position, businessmodel, email, password } = req.body;
 
    const existingCompany = await Company.findOne({ $or: [{ email }, { companyName }] });
    if (existingCompany) {
      return res.status(400).json({
        message: existingCompany.email === email ? 'Email already exists' : 'Company name already exists',
      });
    }
    const company = new Company({
      companyName,
      companyType,
      otherCompanyType: companyType === 'Other' ? otherCompanyType : '',
      position,
      businessmodel,
      email,
      companyId: `comp${Date.now()}`, 
      password, 
    });
    await company.save();
    res.status(200).json({ message: 'Company registered successfully',   success: true, companyId: company.companyId });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/company-login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    if (company.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
     const payload = {  user: { _id: company._id }, role: "hr" };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
        
    res.status(200).json({
      success: true,
      companyName: company.companyName, 
      companyId: company.companyId,
      jobPostLimit : company.jobPostLimit,
      token,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get("/allcompany", async (req, res) => {
  try {
    const jobs = await Company.find().select("-password -__v -companyLogoUrl").lean();
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching all companys:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/company-jobs", async (req, res) => {
  try {
    const { companyId } = req.query;
    if (!companyId) {
      return res.status(400).json({ message: "Company ID is required" });
    }
    const jobs = await CompanyPostedJob.find({ companyId });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/company-jobs", async (req, res) => {
  try {
    const jobData = req.body;
    if (!jobData.companyId) {
      return res.status(400).json({ message: "Company ID is required" });
    }

    // Check if company has uploaded a logo
    const company = await Company.findOne({ companyId: jobData.companyId });
    if (!company || !company.companyLogoUrl) {
      return res.status(400).json({ message: "Please upload company logo before posting a job" });
    }

    const requiredFields = [
      "jobTitle", "location", "jobType", "jobTiming", "workingDays",
      "jobDescription", "desiredSkills", "experience", "noofposition", "applicationDeadline"
    ];
    for (const field of requiredFields) {
      if (!jobData[field]) {
        return res.status(400).json({ message: `Missing required field: ${field}` });
      }
    }
    if (!jobData.salary || !jobData.salary.minSalary || !jobData.salary.maxSalary) {
      return res.status(400).json({ message: "Salary details are required" });
    }
    const newJob = new CompanyPostedJob(jobData);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error("error in job:", error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: 'Validation failed', errors: messages });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.put("/company-jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const jobData = req.body;
    const updatedJob = await CompanyPostedJob.findByIdAndUpdate(id, jobData, {
      new: true,
      runValidators: true,
    });
    if (!updatedJob) {
      console.log(' Job not found');
      return res.status(404).json({ message: "Job not found" });
    }
    console.log(' Updated job=', updatedJob._id);
    res.status(200).json(updatedJob);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: 'Validation failed', errors: messages });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// fetchees company details for profile 
router.get('/company/:companyId', async (req, res) => {
  try {
    const company = await Company.findOne({ companyId: req.params.companyId });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// logo upload to cloudinary and update company logo url in db
router.post("/upload-logo/:companyId", async (req, res) => {
  try {
    const { image } = req.body;
    const { companyId } = req.params;
    if (!image) {
      return res.status(400).json({ message: "No image provided" });
    }
    if (!companyId) {
      return res.status(400).json({ message: "No companyId provided" });
    }
    const result = await cloudinary.uploader.upload(image, {
      folder: "doltec_company_logo",
    });
    const company = await Company.findOneAndUpdate(
      { companyId: companyId }, 
      { companyLogoUrl: result.secure_url },
      { new: true }
    );
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.json({ message: "Logo uploaded", companyLogoUrl: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: "Error uploading image", error: error.message });
  }
});

router.post('/increment-job-limit', async (req, res) => {
  const { companyId } = req.body;

  if (!companyId) {
    return res.status(400).json({ message: 'Company ID is required' });
  }

  try {
    const company = await Company.findOne({ companyId });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Increment jobPostLimit by 1
    company.jobPostLimit += 1;
    await company.save();

    res.status(200).json({ message: 'Job post limit updated successfully', jobPostLimit: company.jobPostLimit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating job limit' });
  }
});

// Endpoint to fetch all companies (for jobPostLimit display)
router.get('/companies', async (req, res) => {
  try {
    const companies = await Company.find({}, 'companyName companyId jobPostLimit');
    res.status(200).json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching companies' });
  }
});

// Endpoint to fetch company details by companyId
router.get('/company/:companyId', async (req, res) => {
  const { companyId } = req.params;

  try {
    const company = await Company.findOne({ companyId }, 'companyId jobPostLimit');
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching company details' });
  }
});

module.exports = router;