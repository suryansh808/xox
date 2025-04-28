const express = require("express");
const User = require("../models/User");
const Resume = require("../models/Resume");
const router = express.Router();
const cloudinary = require("../middleware/cloudinary")

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
      .json({ message: "User created successfully", user: user._id , email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

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
    res.status(200).json({ message: "User logged in successfully", user: user._id , email: user.email});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//get all users
router.get("/allusers", async (req, res) => {
  try {
    const users = await User.find().select("-password -__v -profile -jobLimit");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//get user by id
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById({_id: req.params.id}).select("-password -__v -jobLimit");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//create resume
router.post('/resumes', async (req, res) => {
  try {
    const { userId, personalInfo, educations, experience, skills } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    const resume = new Resume({
      userId,
      personalInfo,
      educations,
      experience,
      skills,
    });
    await resume.save();
    res.status(201).json({ message: 'Resume saved successfully!', resume });
  } catch (error) {
    res.status(400).json({ error: 'Error saving resume', details: error });
  }
});

// get resume by userId
router.get('/resume/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const resumes = await Resume.find({ userId });

    if (!resumes.length) {
      return res.status(404).json({ message: 'No resumes found for this user' });
    }

    res.status(200).json(resumes);
  } catch (error) {
    console.error('Error fetching user resumes:', error.message);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// update resume
router.put('/resumes/:id', async (req, res) => {
  try {
    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: 'Resume updated successfully', resume: updatedResume });
  } catch (error) {
    res.status(400).json({ error: 'Error updating resume', details: error });
  }
});

//chnage password
router.put('/change-password/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    await User.findByIdAndUpdate(userId, { password });
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating password', details: error });
  }
});

//upload profile photo
router.post("/uploadprofile/:id", async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ message: "No image provided" });
    }
    const result = await cloudinary.uploader.upload(image, {
      folder: "doltec__user__profile",
    });
    const user = await User.findByIdAndUpdate(
      req.params.id,
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
