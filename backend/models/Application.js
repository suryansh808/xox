const mongoose = require("mongoose");

const   ApplicationSchema = new mongoose.Schema({

userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CompanyPostedJob",
    required: true,
  },
  hrId: {
    type: String, 
    required: true,
  },
  status: {
    type: String,
    default: "null",
  },
}, {
  timestamps: true,
});
const Application = mongoose.model("Application", ApplicationSchema);

module.exports = Application;