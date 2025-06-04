const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const UserRoute = require('./routes/UserRoute');
const AdminRoute = require('./routes/AdminRoute');
const HrRoute = require('./routes/Hrroute');
const CompanyRoute = require('./routes/CompanyRoute');
const ApplicationRoute = require('./routes/ApplicationRoute');
const Thought = require('./routes/Thoughts');
const cookieParser = require('cookie-parser');
const cors = require("cors");
dotenv.config();
const bodyParser = require("body-parser");


const app = express();
app.use(fileUpload());
app.use(express.json());


app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;


app.use('/', UserRoute);
app.use('/', AdminRoute);
app.use('/', HrRoute);
app.use('/', CompanyRoute);
app.use('/', ApplicationRoute);
app.use('/', Thought);

app.get("/", (req, res) => {
  res.send("Welcome to the Backend Server!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the app for Vercel
module.exports = app;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 20000, 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));