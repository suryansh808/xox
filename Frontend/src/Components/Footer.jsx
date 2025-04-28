import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const noHeaderFooterRoutes = [
    "/",
    "/Home",
    "/Joblist",
    "/AppliedStatus",
    "/Resume",
    "/Settings",
    "/CompanyLogin",
    "/CompanySignup",
    "/adminlogin",
    "/StudentLogIn",
    "/StudentSignUp",
    "/UserDashBoard",
    "/HRLogin",
    "/HRHome",
    "/CompanyJoblist",
    "/JobApplications",
    "/InterviewProcess",
    "/SelectedCandidates",
    "/RejectedCandidates",
    "/HiredCandidates",
    "/Dashboard",
    "/ManageThoughts",
    "/UpdateLandingPage",
    "/CompanyJobs",
    "/AssignedJobs",
    "/UserManagement",
    "/ContactUsResponse",
    "/CompanyOnboardList",
    "/CreateHR",
    "/Recruitment",
    "/CompanyDashboard",
    "/CompanyJobPost",
    "/CompanyInterviewProcess",
    "/CompanyHiredCandidates",

  ];
  const showHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {showHeaderFooter && (
        <footer className="footer">
          <div className="footer__container">
            <div className="footer__brand">
              <h3>Doltec.</h3>
              <p>Building awareness of wisdom.</p>
            </div>

            <div className="footer__socialmedia">
              <a href="http://" target="_blank">
                <i class="fa fa-facebook"></i>
              </a>
              <a href="http://" target="_blank">
                <i class="fa fa-instagram"></i>
              </a>
              <a href="http://" target="_blank">
                <i class="fa fa-twitter"></i>
              </a>
              <a href="http://" target="_blank">
                <i class="fa fa-github"></i>
              </a>
              <a href="http://" target="_blank">
                <i class="fa fa-youtube-play"></i>
              </a>
              <a href="http://" target="_blank">
                <i class="fa fa-linkedin-square"></i>
              </a>
            </div>

            <div className="footer__links">
              <a href="/about">About</a>
              <a href="/services">Services</a>
              <a href="/contactus">Contact</a>
              <a href="/privacy-policy">Privacy Policy</a>
            </div>

            <div className="footer__contact">
              <p>Email: contact@doltec.com</p>
              <p>© {new Date().getFullYear()} Doltec. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
