const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true, unique: true },
  companyType: { type: String, required: true },
  otherCompanyType: { type: String }, // Optional
  position: { type: String, required: true },
  businessmodel: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  companyId: { type: String, required: true, unique: true },
  jobPostLimit: { type: Number, default: 2 },
  companyLogoUrl: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now }
});

const Company = mongoose.model('CompanyUser', companySchema);
module.exports = Company;