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
const crypto = require('crypto');
const CompanyPayment = require('./routes/CompanyPayment');
const Company = require('./models/CompanyUser');
const Community = require('./routes/Community');


const app = express();
app.use(fileUpload());


// webhook for company 
app.post('/company/payment/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET_COMPANY;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(req.body)
      .digest('hex');
    if (expectedSignature !== signature) {
      console.error('Invalid webhook signature at', new Date().toLocaleString());
      return res.status(400).json({ success: false, message: 'Invalid webhook signature' });
    }
    const { event, payload } = req.body;
    console.log('Webhook payload:', JSON.stringify(payload, null, 2));
    if (!['subscription.charged', 'subscription.cancelled'].includes(event)) {
      console.log(`Ignoring unhandled event: ${event} at`, new Date().toLocaleString());
      return res.status(200).json({ success: true, message: 'Event ignored' });
    }
    if (!payload.subscription || !payload.subscription.entity) {
      console.error(`Invalid payload: missing subscription.entity at`, new Date().toLocaleString());
      return res.status(400).json({ success: false, message: 'Invalid payload' });
    }
    const { plan_id, end_at, notes } = payload.subscription.entity;
    console.log(`Webhook event: ${event}, plan_id: ${plan_id}, end_at: ${end_at}`);
    const companyId = notes?.companyId;
    if (!companyId) {
      console.warn('Missing companyId in notes at', new Date().toLocaleString());
      return res.status(400).json({ success: false, message: 'Missing companyId in notes' });
    }
    const company = await Company.findOne({ companyId });
    if (!company) {
      console.error(`Company not found for companyId: ${companyId} at`, new Date().toLocaleString());
      return res.status(404).json({ success: false, message: 'Company not found' });
    }
    const subscriptionPlans = {
      '1month': { razorpayPlanId: 'plan_RMdYBgdhoREJhE', accessLevel: 'basic', jobPostLimit: null, cycles: 1 },
      '3months': { razorpayPlanId: 'plan_RNjyuyJ1Oz47c7', accessLevel: 'standard', jobPostLimit: null, cycles: 3 },
      '6months': { razorpayPlanId: 'plan_RNk0Fl8E4odPDH', accessLevel: 'premium', jobPostLimit: null, cycles: 6 },
      '12months': { razorpayPlanId: 'plan_RNk0wEScQ9JVvk', accessLevel: 'elite', jobPostLimit: null, cycles: 12 },
    };
    if (event === 'subscription.charged') {
      const planType = Object.keys(subscriptionPlans).find(
        key => subscriptionPlans[key].razorpayPlanId === plan_id
      );
      if (!planType) {
        console.error(`Unknown plan_id: ${plan_id} at`, new Date().toLocaleString());
        return res.status(400).json({ success: false, message: 'Invalid plan' });
      }
      const subscriptionEnd = end_at && end_at > 0
        ? new Date(end_at * 1000)
        : new Date(Date.now() + subscriptionPlans[planType].cycles * 30 * 24 * 60 * 60 * 1000);
      await Company.findOneAndUpdate(
        { companyId },
        {
          subscriptionPlan: planType,
          accessLevel: subscriptionPlans[planType].accessLevel,
          subscriptionEnd,
          jobPostLimit: subscriptionPlans[planType].jobPostLimit,
        },
        { new: true }
      );
      console.log(`Webhook updated company ${companyId} for ${planType}, end: ${subscriptionEnd.toLocaleString()}`);
    } else if (event === 'subscription.cancelled') {
      await Company.findOneAndUpdate(
        { companyId },
        {
          subscriptionPlan: null,
          accessLevel: 'basic',
          subscriptionEnd: null,
          jobPostLimit: 2,
        },
        { new: true }
      );
      console.log(`Webhook cancelled subscription for company ${companyId} at`, new Date().toLocaleString());
    }
    res.status(200).json({ success: true, message: 'Webhook received' });
  } catch (error) {
    console.error('Webhook error:', error, 'at', new Date().toLocaleString());
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(bodyParser.json());



app.use('/', UserRoute);
app.use('/', AdminRoute);
app.use('/', HrRoute);
app.use('/', CompanyRoute);
app.use('/', ApplicationRoute);
app.use('/', Thought);
app.use('/',CompanyPayment);
app.use('/', Community)

app.get("/", (req, res) => {
  res.send("Welcome to the Backend Server!");
});

const PORT = process.env.PORT || 5000;
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