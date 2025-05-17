import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import headerlogo from "../assets/headerlogo.png"
// import logo from "../assets/doltec2.png";
import ToggleComponent from "./ToggleComponent";

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeOption, setActiveOption] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeMobileMenuOption, setActiveMobileMenuOption] = useState(null);

  const toggleDropdown = (dropdownId) => {
    // Set the dropdown as active and default to the first option
    if (activeDropdown === dropdownId) {
      setActiveDropdown(null);
      setActiveOption(null); // Close dropdown
    } else {
      setActiveDropdown(dropdownId);
      setActiveOption("Option1"); // Default to first option
    }
  };

  const selectOption = (option) => {
    setActiveOption(option);
  };
  const toggleMobileMenu = () => {
    setShowMobileMenu((prev) => !prev);
  };

  const toggleMobileMenuOption = (optionId) => {
    setActiveMobileMenuOption((prev) => (prev === optionId ? null : optionId));
    
  };
  const location = useLocation();
  const noHeaderFooterRoutes = [
    "/",
    "/CompanyLogin",
    "/CompanySignup",
    "/adminlogin",
    "/StudentLogIn",
    "/StudentSignUp",
    "/Home",
    "/Joblist",
    "/AppliedStatus",
    "/Resume",
    "/Settings",
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
    "/HrPDashboard",
    "/Recruitment",
    "/CompanyDashboard",
    "/CompanyJobPost",
    "/CompanyInterviewProcess",
    "/CompanyHiredCandidates",
    "/CompanyRejectedCandidates",
    "/CompanyHRSelected",
  ];
  const showHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {showHeaderFooter && (
        <div id="header">
          <div className="navbar" style={{ boxShadow: "none" }}>
            <img src={headerlogo} alt="" />
            <ul>
              <li onClick={() => toggleDropdown()}>
                <Link className=" hover:text-white" to="/ITServices">
                  {" "}
                  HOME
                </Link>
              </li>
              <li onClick={() => toggleDropdown("what_we_do")}>WHAT WE DO</li>
              <li onClick={() => toggleDropdown("who_we_are")}>WHO WE ARE</li>
              <li onClick={() => toggleDropdown("insight")}>INSIGHT</li>
              <li onClick={() => toggleDropdown()}>
                <Link className=" hover:text-white" to="/ContactUs">
                  {" "}
                  CONTACT US
                </Link>
              </li>
            </ul>
            <div className="hamburger"><i onClick={toggleMobileMenu} class="fa fa-bars" aria-hidden="true"></i></div>
            <div
              onClick={() => {
                toggleDropdown();
              }}
            >
              <Link to="/">
                {" "}
                <ToggleComponent />
              </Link>
            </div>
          </div>

          
          {showMobileMenu && (
            <div className="mobile-menu">
              <ul>
                <li onClick={toggleMobileMenu}>
                  <Link to="/ITServices">HOME</Link>
                </li>
                <li onClick={() => toggleMobileMenuOption("option2")}>
                  WHAT WE DO
                  {activeMobileMenuOption === "option2" && (
                    <ul>
                      <li onClick={toggleMobileMenu}>
                      <Link to="/Overview">
                        <span><i class="fa fa-caret-right"></i></span>  Overview 
                      </Link>
                      </li>
                      <li onClick={toggleMobileMenu}>
                      <Link to="/Industries">
                        <span><i class="fa fa-caret-right"></i></span> INDUSTRIES
                      </Link>
                      </li>
                      <li onClick={toggleMobileMenu}>
                      <Link to="/Services">
                        <span><i class="fa fa-caret-right"></i></span> SERVICES
                      </Link>
                      </li>
                      <li onClick={toggleMobileMenu}>
                      <Link to="/Product">
                        <span><i class="fa fa-caret-right"></i></span> PRODUCT AND PLATFORM
                      </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li onClick={() => toggleMobileMenuOption("option3")}>
                  WHO WE ARE
                  {activeMobileMenuOption === "option3" && (
                    <ul>
                      <li onClick={toggleMobileMenu}>
                      <Link to="/Mission">
                        <span><i class="fa fa-caret-right"></i></span> OUR MISSION
                      </Link>
                      </li>
                      <li onClick={toggleMobileMenu}>
                      <Link to="/Vission">
                        <span><i class="fa fa-caret-right"></i></span> OUR VISSION
                      </Link>
                      </li>
                      <li onClick={toggleMobileMenu}>
                      <Link to="/Project">
                        <span><i class="fa fa-caret-right"></i></span> OUR PROJECT
                      </Link>
                      </li>
                      <li onClick={toggleMobileMenu}>
                      <Link to="/About">
                        <span><i class="fa fa-caret-right"></i></span> ABOUT US
                      </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li onClick={() => toggleMobileMenuOption("option4")}>
                  INSIGHT
                  {activeMobileMenuOption === "option4" && (
                    <ul>
                      <li onClick={toggleMobileMenu}>
                      <Link to="/Insight1">
                        <span><i class="fa fa-caret-right"></i></span> INSIGHT 1
                      </Link>
                      </li>
                      <li onClick={toggleMobileMenu}>
                      <Link to="/Insight2">
                        <span><i class="fa fa-caret-right"></i></span> INSIGHT 2
                      </Link>
                      </li>
                      <li onClick={toggleMobileMenu}>
                      <Link to="/Insight3">
                        <span><i class="fa fa-caret-right"></i></span> INSIGHT 3
                      </Link>
                      </li>
                      <li onClick={toggleMobileMenu}>
                      <Link to="/Insight4">
                        <span><i class="fa fa-caret-right"></i></span> INSIGHT 4
                      </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          )}

          {activeDropdown === "what_we_do" && (
            <div
              id="what_we_do"
              className="dropdown"
              onClick={() => toggleDropdown()}
            >
              <div className="option">
                <div className="dropdown_option">
                  <ul>
                    <li onMouseOver={() => selectOption("Option1")}>
                      {" "}
                      <Link to="/Overview">
                        {" "}
                        Overview <span>&#11162;</span>
                      </Link>{" "}
                    </li>
                    <li onMouseOver={() => selectOption("Option2")}>
                      {" "}
                      <Link to="/Industries">
                        Industries <span>&#11162;</span>
                      </Link>
                    </li>
                    <li onMouseOver={() => selectOption("Option3")}>
                      {" "}
                      <Link to="/Services">
                        Services <span>&#11162;</span>
                      </Link>
                    </li>
                    <li onMouseOver={() => selectOption("Option4")}>
                      {" "}
                      <Link to="/Product">
                        Product and Platform <span>&#11162;</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                {activeOption === "Option1" && (
                  <div className="option_content">
                    <h1>Doltec — Bridging Talent with Opportunity</h1>
                    <p> At Doltec, we're transforming the way businesses find talent and how students launch their careers. As a dynamic service-based platform, we empower companies to post jobs and connect with the next generation of professionals. From startups to industry leaders, we help build brighter futures through opportunity, innovation, and access — all in one place.</p>
                    <p>Explore our platform and discover how Doltec can help you hire smarter and get hired faster.</p>
                  </div>
                )}
                {activeOption === "Option2" && (
                  <div className="option_content">
                    <h1>Industries</h1>
                    <ol>
                      <li>Lorem ipsum dolor sit amet.</li>
                      <li>Lorem ipsum dolor sit amet.</li>
                      <li>Lorem ipsum dolor sit amet.</li>
                      <li>Lorem ipsum dolor sit amet.</li>
                      <li>Lorem ipsum dolor sit amet.</li>
                    </ol>
                  </div>
                )}
                {activeOption === "Option3" && (
                  <div className="option_content">
                    <h1>Services</h1>
                    <ol>
                      <li>Lorem ipsum dolor sit amet.</li>
                      <li>Lorem ipsum dolor sit amet.</li>
                      <li>Lorem ipsum dolor sit amet.</li>
                      <li>Lorem ipsum dolor sit amet.</li>
                      <li>Lorem ipsum dolor sit amet.</li>
                      <li>Lorem ipsum dolor sit amet.</li>
                      <li>Lorem ipsum dolor sit amet.</li>
                      <li>Lorem ipsum dolor sit amet.</li>
                      <li>Lorem ipsum dolor sit amet.</li>
                      <li>Lorem ipsum dolor sit amet.</li>
                    </ol>
                  </div>
                )}
                {activeOption === "Option4" && (
                  <div className="option_content">
                    <h1>Product and Platform</h1>
                    <h2>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Possimus laudantium, cumque iste praesentium a laborum
                      voluptatibus sint quaerat facilis molestias dolore facere
                      aliquam fugiat consectetur, eius dolorum voluptates est
                      ipsum. Voluptatem sit odio aspernatur aliquid soluta ad
                      deserunt itaque accusantium ut, mollitia placeat deleniti
                      nostrum quidem, doloribus error dicta iusto?
                    </h2>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeDropdown === "who_we_are" && (
            <div
              id="who_we_are"
              className="dropdown"
              onClick={() => toggleDropdown()}
            >
              <div className="option">
                <div className="dropdown_option">
                  <ul>
                    <li onMouseOver={() => selectOption("Option1")}>
                      <Link to="/Mission">
                        Our Mission <span>&#11162;</span>
                      </Link>
                    </li>
                    <li onMouseOver={() => selectOption("Option2")}>
                      <Link to="/Vission">
                        Our Vission<span>&#11162;</span>
                      </Link>
                    </li>
                    <li onMouseOver={() => selectOption("Option3")}>
                      <Link to="/Project">
                        Our Project<span>&#11162;</span>
                      </Link>
                    </li>
                    <li onMouseOver={() => selectOption("Option4")}>
                      <Link to="/About">
                        About Us<span>&#11162;</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                {activeOption === "Option1" && (
                  <div className="option_content">
                    <h1>Our Mission</h1>
                    <h3>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      In cupiditate commodi qui soluta repudiandae quam iusto
                      facilis natus ab magnam, repellendus adipisci? Optio ab
                      natus enim nisi explicabo ipsam similique reiciendis animi
                      quibusdam eos vel iure neque tempore quis, iusto amet,
                      mollitia nemo. Architecto reiciendis libero hic cumque
                      error sapiente.
                    </h3>
                  </div>
                )}
                {activeOption === "Option2" && (
                  <div className="option_content">
                    <h1>Our Vission</h1>
                    <h3>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Culpa fugit placeat assumenda necessitatibus unde delectus
                      sint doloribus natus consectetur veniam obcaecati ipsum
                      eaque ipsa, voluptatem est reprehenderit saepe veritatis
                      ea et similique dolorum neque. Architecto numquam delectus
                      quis quod sequi accusantium deserunt dolor maiores modi
                      rerum aut quasi possimus qui ad doloribus necessitatibus
                      debitis, illo expedita quas? Eius, iste cumque!
                    </h3>
                  </div>
                )}
                {activeOption === "Option3" && (
                  <div className="option_content">
                    <h1>Our Project</h1>
                    <ol>
                      <li>Lorem ipsum dolor sit amet.</li>
                      <li>Lorem ipsum dolor sit amet.</li>
                      <li>Lorem ipsum dolor sit amet.</li>
                      <li>Lorem ipsum dolor sit amet.</li>
                      <li>Lorem ipsum dolor sit amet.</li>
                    </ol>
                  </div>
                )}
                {activeOption === "Option4" && (
                  <div className="option_content">
                    <h1>About Us</h1>
                    <h3>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Architecto, officiis explicabo. Iure reprehenderit
                      tempore, eum sint incidunt consectetur eveniet non quam
                      eius dignissimos voluptate, esse, eos eligendi culpa vitae
                      aspernatur facilis veniam quaerat numquam perspiciatis
                      nobis voluptas. Eos dolorum fugiat distinctio. Sint ullam,
                      dolores ratione temporibus est minus et labore doloribus
                      necessitatibus modi quia minima quos ab eum consequatur
                      debitis error laborum veritatis, quaerat quibusdam magni
                      aliquam repudiandae? Consequatur, minus unde! Repellendus
                      recusandae, maxime pariatur blanditiis inventore
                      doloremque culpa autem ab eum sunt explicabo officia nobis
                      necessitatibus quidem nesciunt ipsa, tenetur suscipit
                      tempore quibusdam ullam neque dolorem. Omnis, vero
                      numquam?
                    </h3>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeDropdown === "insight" && (
            <div
              id="insight"
              className="dropdown"
              onClick={() => toggleDropdown()}
            >
              <div className="option">
                <div className="dropdown_option">
                  <ul>
                    <li onMouseOver={() => selectOption("Option1")}>
                      <Link to="/Insight1">
                        Overviews<span>&#11162;</span>
                      </Link>
                    </li>
                    <li onMouseOver={() => selectOption("Option2")}>
                      <Link to="/Insight2">
                        Company Experiences<span>&#11162;</span>
                      </Link>
                    </li>
                    <li onMouseOver={() => selectOption("Option3")}>
                      <Link to="/Insight3">
                        Students Review<span>&#11162;</span>
                      </Link>
                    </li>
                    <li onMouseOver={() => selectOption("Option4")}>
                      <Link to="/Insight4">
                        Share Your Thoughts<span>&#11162;</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                {activeOption === "Option1" && (
                  <div className="option_content">
                    <h1>INSIGHT</h1>
                    <h3>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Est harum non voluptates enim possimus veniam vero
                      sapiente, cupiditate cumque? Unde officiis, aliquam
                      explicabo adipisci vel voluptas. Officia quia
                      necessitatibus itaque?
                    </h3>
                  </div>
                )}
                {activeOption === "Option2" && (
                  <div className="option_content">
                    <h1>INSIGHT</h1>
                    <h3>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Cumque ea quasi nostrum placeat soluta itaque, labore
                      nihil quaerat ab commodi? Quas libero placeat delectus
                      consequatur corporis rem ad consequuntur harum.
                    </h3>
                  </div>
                )}
                {activeOption === "Option3" && (
                  <div className="option_content">
                    <h1>INSIGHT</h1>
                    <h3>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Illum harum, cum nulla quos quia ipsa voluptatum, libero
                      cupiditate asperiores corrupti possimus. Illum eum harum
                      iste nemo sed laborum explicabo repellat commodi modi.
                      Consequatur dolore repudiandae amet perspiciatis ratione
                      autem! Facere adipisci distinctio mollitia ex velit
                      sapiente voluptatem omnis libero fuga.
                    </h3>
                  </div>
                )}
                {activeOption === "Option4" && (
                  <div className="option_content">
                    <h1>INSIGHT</h1>
                    <h3>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Vel soluta, pariatur ab voluptatibus possimus voluptates
                      quasi, libero, dolorum veniam corporis odio nesciunt quia
                      ipsam. Dolorum impedit beatae commodi sint quidem, officia
                      deserunt! Quod mollitia placeat rerum error repellendus
                      molestiae sequi, dolores, voluptatem sit praesentium iusto
                      voluptas at adipisci, est architecto nesciunt quos
                      consectetur omnis dolor! Neque repellat fugiat quo ipsum!
                    </h3>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
