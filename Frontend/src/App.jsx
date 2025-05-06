import React from 'react'
import { BrowserRouter,Routes, Route, useLocation} from "react-router-dom";

import Header from './Components/Header'
import ITServices from './Components/ITServices';
import Footer from './Components/Footer'
import WhatwedoOverview from './Pages/Overview';
import WhatwedoIndustries from './Pages/Industries';
import WhatwedoServices from './Pages/Services';
import WhatwedoProduct from './Pages/Product';
import WhoweareMission from './Pages/Mission';
import WhoweareVission from './Pages/Vission';
import WhoweareProject from './Pages/Project';
import WhoweareAbout from './Pages/About';
import Insight1 from './Pages/Insight1';
import Insight2 from './Pages/Insight2';
import Insight3 from './Pages/Insight3';
import Insight4 from './Pages/Insight4';
import ContactUs from './Components/ContactUs';

import Recruitment from './Recruitment/Recruitment';

import StudentLogIn from './Students/StudentLogin';
import StudentSignUp from './Students/StudentSignUp';
import Home from './Students/Home';
import StudentHeader from './Students/StudentHeader';
import Joblist from './Students/Joblist';
import AppliedStatus from './Students/AppliedStatus';
import Resume from './Students/Resume';
import Settings from './Students/Settings';

import CompanyLogin from './Company/CompanyLogin';
import CompanySignup from './Company/CompanySignup';


import HRLogin from './Hr/HRLogin';
import HRHome from './Hr/HRHome';
import HRHeader from './Hr/HRHeader';
// import CompanyJoblist from './Hr/companyJobList';
import CompanyJoblist from './Hr/CompanyJoblist';
import JobApplications from './Hr/JobApplications';
import HiredCandidates from './Hr/HiredCandidates';
import RejectedCandidates from './Hr/RejectedCandidates';
import SelectedCandidates from './Hr/SelectedCandidates';
import InterviewProcess from './Hr/InterviewProcess';



import AdminHeader from './Admin/AdminHeader';
import Adminlogin from './Admin/AdminLogin';
import Createhr from './Admin/Createhr';
import AssignedJob from './Admin/AssignedJob';
import CompanyJobs from './Admin/CompanyJobs';
import UserManagement from './Admin/UserManagement';
import CompanyOnboardList from './Admin/CompanyOnboardList';
import ContactUsResponse from './Admin/ContactUsResponse';
import Dashboard from './Admin/Dashboard';
import ManageThoughts from './Admin/ManageThoughts';
import UpdateLandingPage from './Admin/UpdateLandingPage';


import CompanyHeader from './Company/CompanyHeader';
import CompanyDashboard from './Company/CompanyDashboard';
import CompanyJobPost from './Company/CompanyJobPost';
import CompanyInterviewProcess from './Company/CompanyInterviewProcess';
import CompanyHiredCandidates from './Company/CompanyHiredCandidates';
import CompanyHRSelected from './Company/CompanyHRSelected';


import ScrollToTop from './ScrollToTop';


const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
      </BrowserRouter>
  );
};


const AppContent = () => {
  const location = useLocation();

  const studentHeader = [
    "/home",
    "/settings",
    "/resume",
    "/appliedstatus",
    "/joblist",
  ];
  const adminHeader = [
    "/dashboard",
    "/createhr",
    "/managethoughts",
    "/updatelandingpage",
    "/companyjobs",
    "/assignedjobs",
    "/usermanagement",
    "/contactusresponse",
    "/companyonboardlist",

  ];
  const hrHeader = [
    "/hrhome",
    "/companyjoblist",
    "/jobapplications",
    "/interviewprocess",
    "/selectedcandidates",
    "/rejectedcandidates",
    "/hiredcandidates",
    
  ];
  const companyHeaderPaths = [
    "/companydashboard",
    "/companyjobpost",
    "/companyinterviewprocess",
    "/companyhiredcandidates",
    "/companyhrselected",
  ];


   
  return (
    <div>

        <Header/>
        {studentHeader.includes(location.pathname.toLowerCase()) && (<StudentHeader/>)}
        {adminHeader.includes(location.pathname.toLowerCase()) && (<AdminHeader/>)}
        {hrHeader.includes(location.pathname.toLowerCase()) && (<HRHeader/>)}
        {companyHeaderPaths.includes(location.pathname.toLowerCase()) && <CompanyHeader/>}
        <ScrollToTop/>
        <Routes>
          <Route path="/ITServices" element={<ITServices/>} />
          <Route path="/Overview" element={<WhatwedoOverview/>} />
          <Route path="/Industries" element={<WhatwedoIndustries/>} />
          <Route path="/Services" element={<WhatwedoServices/>} />
          <Route path="/Product" element={<WhatwedoProduct/>} />
          <Route path="/Mission" element={<WhoweareMission/>} />
          <Route path="/Vission" element={<WhoweareVission/>} />
          <Route path="/Project" element={<WhoweareProject/>} />
          <Route path="/About" element={<WhoweareAbout/>} />
          <Route path="/Insight1" element={<Insight1/>} />
          <Route path="/Insight2" element={<Insight2/>} />
          <Route path="/Insight3" element={<Insight3/>} />
          <Route path="/Insight4" element={<Insight4/>} />
          <Route path="/ContactUs" element={<ContactUs/>} />
         


          {/* recruitment start */}
          <Route path="/" element={<Recruitment/>} />

          {/* Student */}
          <Route path="/StudentLogin" element={<StudentLogIn/>} />
          <Route path="/StudentSignUp" element={<StudentSignUp/>} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/Joblist" element={<Joblist/>} />
          <Route path="/AppliedStatus" element={<AppliedStatus/>} />
          <Route path="/Resume" element={<Resume/>} />
          <Route path="/Settings" element={<Settings/>} />



          {/* company */}
          <Route path="/CompanyLogin" element={<CompanyLogin/>} />
          <Route path="/CompanySignup" element={<CompanySignup/>} />
          <Route path="/CompanyDashboard" element={<CompanyDashboard/>} />
          <Route path="/CompanyJobPost" element={<CompanyJobPost/>} />
          <Route path="/CompanyInterviewProcess" element={<CompanyInterviewProcess/>} />
          <Route path="/CompanyHiredCandidates" element={<CompanyHiredCandidates/>} />
          <Route path="/CompanyHRSelected" element={<CompanyHRSelected/>} />


            {/* HR */}
          <Route path="/HRLogin" element={<HRLogin/>} />
          <Route path="/HRHome" element={<HRHome/>} />
          <Route path="/CompanyJoblist" element={<CompanyJoblist/>} />
          <Route path="/JobApplications" element={<JobApplications/>} />
          <Route path="/HiredCandidates" element={<HiredCandidates/>} />
          <Route path="/RejectedCandidates" element={<RejectedCandidates/>} />
          <Route path="/SelectedCandidates" element={<SelectedCandidates/>} />
          <Route path="/InterviewProcess" element={<InterviewProcess/>} />


          {/* Admin */}
          <Route path="/AdminLogin" element={<Adminlogin/>} />
          <Route path="/Createhr" element={<Createhr/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/ManageThoughts" element={<ManageThoughts/>} />
          <Route path="/UpdateLandingPage" element={<UpdateLandingPage/>}/>
          <Route path="/CompanyJobs" element={<CompanyJobs/>}/>
          <Route path="/AssignedJobs" element={<AssignedJob/>}/>
          <Route path="/UserManagement" element={<UserManagement/>}/>
          <Route path="/CompanyOnboardList" element={<CompanyOnboardList/>}/>
          <Route path="/ContactUsResponse" element={<ContactUsResponse/>}/>



        </Routes>
        <Footer/> 
    </div>
  )
}

export default App
