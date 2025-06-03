const express = require("express");
const mongoose = require('mongoose');
const User = require("../models/User");
const Resume = require("../models/Resume");
const router = express.Router();
const cloudinary = require("../middleware/cloudinary");
const Application = require("../models/Application");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//login user
router.post("/userlogin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    if (req.body.password !== user.password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const payload = {  user: { _id: user._id }, role: "user" };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });


    res
      .status(200)
      .json({
        message: "User logged in successfully",
        user: user._id,
        email: user.email,
        token,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
//dashboard count
router.get("/userdashboardcount", async (req, res) => {
  const token = req.headers.authorization;
  try {
     if (!token) {
      return res.status(403).json({ error: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user._id;

      const result = await Application.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId)
        }
      },
      {
        $facet: {
          shortListedCount: [
            { $match: { shortListed: true } },
            { $count: "count" }
          ],
          rejectedCount: [
            { $match: { interviewOverviewStatus: "Rejected" } },
            { $count: "count" }
          ],
          pendingCount: [
            { $match: { status: "pending" } },
            { $count: "count" }
          ],
          updatedTimes: [
            { $project: { _id: 0, updatedAt: 1 } }
          ]
        }
      }
    ]);

    const data = result[0];

    res.status(200).json({
      message: "Dashboard metrics retrieved successfully",
      shortListed: data.shortListedCount[0]?.count || 0,
      rejected: data.rejectedCount[0]?.count || 0,
      pending: data.pendingCount[0]?.count || 0,
      resumesUpdatedAt: data.updatedTimes.map(item => item.updatedAt).sort((a, b) => new Date(b) - new Date(a))[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
//create user
router.post("/usersignup", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }
    const newUser = new User(req.body);
    await newUser.save();
    res
      .status(200)
      .json({
        message: "User created successfully",
        user: user._id,
        email: user.email,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
//get all users
router.get('/allusers', async (req, res) => {
  try {
    const users = await User.find().select('-password -__v -otp -confirmPassword -profile');
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
// Endpoint to fetch user by ID
router.get('/user', async (req, res) => {
  const token = req.headers.authorization;
  try {
     if (!token) { return res.status(403).json({ error: "Access denied. No token provided." }); }
        
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.user._id;
    const user = await User.findById(userId).select('-password -__v -otp -confirmPassword');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
// Endpoint to increment jobLimit for a user
router.post('/increment-user-job-limit', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Increment jobLimit by 1
    user.jobLimit = (user.jobLimit || 0) + 1;
    await user.save();

    res.status(200).json({ message: 'Job limit updated successfully', jobLimit: user.jobLimit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating job limit' });
  }
});

//create resume
router.post("/resumes", async (req, res) => {
  const token = req.headers.authorization;
  try {
     if (!token) {
      return res.status(403).json({ error: "Access denied. No token provided." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user._id;
    const { personalInfo, educations, experience, skills ,summary, project } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const resume = new Resume({
      userId,
      personalInfo,
      educations,
      experience,
      skills,
      summary, 
      project
    });
    await resume.save();
    res.status(201).json({ message: "Resume saved successfully!", resume });
  } catch (error) {
    res.status(400).json({ error: "Error saving resume", details: error });
  }
});
// get resume by userId
router.get("/resume", async (req, res) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      return res.status(403).json({ error: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user._id;
    // const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const resumes = await Resume.find({ userId });

    if (!resumes.length) {
      return res
        .status(404)
        .json({ message: "No resumes found for this user" });
    }

    res.status(200).json(resumes);
  } catch (error) {
    console.error("Error fetching user resumes:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// update resume
router.put("/resumes/:id", async (req, res) => {
   const token = req.headers.authorization;
  try {
     if (!token) {
      return res.status(403).json({ error: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user._id;
    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      {
        userId,
        personalInfo: req.body.personalInfo,
        educations: req.body.educations,
        experience: req.body.experience,
        skills: req.body.skills,
        summary: req.body.summary,
        project: req.body.project
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Resume updated successfully", resume: updatedResume });
  } catch (error) {
    res.status(400).json({ error: "Error updating resume", details: error });
  }
});
//chnage password
router.put("/change-password", async (req, res) => {
   const token = req.headers.authorization;
  try {
     if (!token) {
      return res.status(403).json({ error: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user._id;

    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    await User.findByIdAndUpdate(userId, {password} , { new: true });
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating password", details: error });
  }
});
//upload profile photo
router.post("/uploadprofile", async (req, res) => {
    const token = req.headers.authorization;
  try {
     if (!token) {
      return res.status(403).json({ error: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user._id;
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ message: "No image provided" });
    }
    const result = await cloudinary.uploader.upload(image, {
      folder: "doltec__user__profile",
    });
    const user = await User.findByIdAndUpdate(
      userId,
      { profile: result.secure_url },
      { new: true }
    );
    res.json({ message: "Profile photo uploaded", user });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({ message: "Error uploading image", error });
  }
});

module.exports = router;   
