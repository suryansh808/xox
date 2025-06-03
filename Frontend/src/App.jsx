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
import Chooseaplan from './Students/Chooseaplan';

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
// import Adminlogin from './Admin/AdminLogin';
import Adminlogin from './Admin/Adminlogin';
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

import {PrivateRoute} from './PrivateRoute';
import { HrPrivateRoute } from './PrivateRoute';
import { CompanyPrivateRoute } from './PrivateRoute';
import { AdminPrivateRoute } from './PrivateRoute';



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
    "/chooseaplan"
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
          <Route path="/StudentLogIn" element={<StudentLogIn/>} />
          <Route path="/StudentSignUp" element={<StudentSignUp/>} />
          <Route path="/Home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/Joblist" element={<PrivateRoute><Joblist/></PrivateRoute>} />
          <Route path="/AppliedStatus" element={<PrivateRoute><AppliedStatus/></PrivateRoute>} />
          <Route path="/Resume" element={<PrivateRoute><Resume/></PrivateRoute>} />
          <Route path="/Settings" element={<PrivateRoute><Settings/></PrivateRoute>} />
          <Route path="/Chooseaplan" element={<PrivateRoute><Chooseaplan/></PrivateRoute>} />



          {/* company */}
          <Route path="/CompanyLogin" element={<CompanyLogin/>} />
          <Route path="/CompanySignup" element={<CompanySignup/>} />
          <Route path="/CompanyDashboard" element={<CompanyPrivateRoute><CompanyDashboard/></CompanyPrivateRoute>} />
          {/* <Route path="/Selectaplan" element={<CompanyPrivateRoute><Selectaplan/></CompanyPrivateRoute>} /> */}
          <Route path="/CompanyJobPost" element={<CompanyPrivateRoute><CompanyJobPost/></CompanyPrivateRoute>} />
          <Route path="/CompanyInterviewProcess" element={<CompanyPrivateRoute><CompanyInterviewProcess/></CompanyPrivateRoute>} />
          <Route path="/CompanyHiredCandidates" element={<CompanyPrivateRoute><CompanyHiredCandidates/></CompanyPrivateRoute>} />
          <Route path="/CompanyHRSelected" element={<CompanyPrivateRoute><CompanyHRSelected/></CompanyPrivateRoute>} />


            {/* HR */}
          <Route path="/HRLogin" element={<HRLogin/>} />
          <Route path="/HRHome" element={<HrPrivateRoute><HRHome/></HrPrivateRoute>} />
          <Route path="/CompanyJoblist" element={<HrPrivateRoute><CompanyJoblist/></HrPrivateRoute>} />
          <Route path="/JobApplications" element={<HrPrivateRoute><JobApplications/></HrPrivateRoute>} />
          <Route path="/HiredCandidates" element={<HrPrivateRoute><HiredCandidates/></HrPrivateRoute>} />
          <Route path="/RejectedCandidates" element={<HrPrivateRoute><RejectedCandidates/></HrPrivateRoute>} />
          <Route path="/SelectedCandidates" element={<HrPrivateRoute><SelectedCandidates/></HrPrivateRoute>} />
          <Route path="/InterviewProcess" element={<HrPrivateRoute><InterviewProcess/></HrPrivateRoute>} />
         

          {/* Admin */}
          <Route path="/Adminlogin" element={<Adminlogin/>} />
          <Route path="/Createhr" element={<AdminPrivateRoute><Createhr/></AdminPrivateRoute>} />
          <Route path="/Dashboard" element={<AdminPrivateRoute><Dashboard/></AdminPrivateRoute>} />
          <Route path="/ManageThoughts" element={<AdminPrivateRoute><ManageThoughts/></AdminPrivateRoute>} />
          <Route path="/UpdateLandingPage" element={<AdminPrivateRoute><UpdateLandingPage/></AdminPrivateRoute>}/>
          <Route path="/CompanyJobs" element={<AdminPrivateRoute><CompanyJobs/></AdminPrivateRoute>}/>
          <Route path="/AssignedJobs" element={<AdminPrivateRoute><AssignedJob/></AdminPrivateRoute>}/>
          <Route path="/UserManagement" element={<AdminPrivateRoute><UserManagement/></AdminPrivateRoute>}/>
          <Route path="/CompanyOnboardList" element={<AdminPrivateRoute><CompanyOnboardList/></AdminPrivateRoute>}/>
          <Route path="/ContactUsResponse" element={<AdminPrivateRoute><ContactUsResponse/></AdminPrivateRoute>}/>



        </Routes>
        <Footer/> 
    </div>
  )
}

export default App
