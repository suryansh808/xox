const express = require("express");
const router = express.Router();
const Createhr = require("../models/Createhr");

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

module.exports = router;
