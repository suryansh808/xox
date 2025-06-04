// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const fileUpload = require('express-fileupload');
// const UserRoute = require('./routes/UserRoute');
// const AdminRoute = require('./routes/AdminRoute');
// const HrRoute = require('./routes/Hrroute');
// const CompanyRoute = require('./routes/CompanyRoute');
// const ApplicationRoute = require('./routes/ApplicationRoute');
// const Thought = require('./routes/Thoughts');
// const cookieParser = require('cookie-parser');
// const cors = require("cors");
// dotenv.config();



// const app = express();
// app.use(fileUpload());
// app.use(express.json());


// app.use(cors({
//   origin: process.env.FRONTEND_URL,
//   credentials: true,
// }));

// mongoose.connect(process.env.DATABASE_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// app.use('/', UserRoute);
// app.use('/', AdminRoute);
// app.use('/', HrRoute);
// app.use('/', CompanyRoute);
// app.use('/', ApplicationRoute);
// app.use('/', Thought);

// app.get("/", (req, res) => {
//   res.send("Welcome to the Backend Server!");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // Export the app for Vercel
// module.exports = app;




const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cors = require("cors");

const UserRoute = require('./routes/UserRoute');
const AdminRoute = require('./routes/AdminRoute');
const HrRoute = require('./routes/Hrroute');
const CompanyRoute = require('./routes/CompanyRoute');
const ApplicationRoute = require('./routes/ApplicationRoute');
const Thought = require('./routes/Thoughts');

dotenv.config();

const app = express();

// Middleware
app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// Basic route for health check
app.get("/", (req, res) => {
  res.send("Welcome to the Backend Server!");
});

// Function to start server after MongoDB connects
const startServer = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected");

    // Routes registration happens AFTER connection
    app.use('/', UserRoute);
    app.use('/', AdminRoute);
    app.use('/', HrRoute);
    app.use('/', CompanyRoute);
    app.use('/', ApplicationRoute);
    app.use('/', Thought);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Force exit on failure
  }
};

// Export for serverless environments (like Vercel)
module.exports = app;
