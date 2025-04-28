const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  profile:{ type: String , default:null},
  name:{ type: String},
  phone: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  otp: String,
  jobLimit:{type:Number, default:2},
  password:{type:String},
  confirmPassword:{Type:String}
  
});

const User = mongoose.model("User", userSchema);

module.exports = User;