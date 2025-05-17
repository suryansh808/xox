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
const cors = require("cors");
dotenv.config();

const app = express();
app.use(fileUpload());
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/', UserRoute);
app.use('/', AdminRoute);
app.use('/', HrRoute);
app.use('/', CompanyRoute);
app.use('/', ApplicationRoute);
app.use('/', Thought)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
