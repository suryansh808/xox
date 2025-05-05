import React from 'react';
import {Link} from 'react-router-dom'

const Landingpage = () => {
  return (
    <div id="landingpage">
      {/* About Section */}
      <section className="flex-section reverse">
        <div className="image-wrapper">
          <img
            src="https://img.freepik.com/free-photo/rear-view-adult-man-searching-new-job-working-writing-his-resume-laptop_662251-2153.jpg?t=st=1745412459~exp=1745416059~hmac=4498766147a6552e03cbe40e19abcf160d498df19d79007b565c64809d948f16&w=900"
            alt="JobPortal Illustration"
          />
        </div>
        <div className="content-wrapper">
          <h2>About JobPortal</h2>
          <p>JobPortal is your go-to recruitment platform, seamlessly connecting top companies with talented students and fresh graduates. Our mission is to make hiring smarter, faster, and more intuitive for everyone involved.</p>
          <p>We empower recruiters with intelligent tools to evaluate talent efficiently and help students shine by showcasing their skills, achievements, and potential to leading employers across industries.</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Platform Features</h2>
        <ul>
          <li>Dedicated dashboards for recruiters and job seekers</li>
          <li>AI-driven resume screening for quick shortlisting</li>
          <li>Instant job alerts and live interview notifications</li>
          <li>Real-time application tracking and progress insights</li>
          <li>Secure in-app messaging and document sharing</li>
          <li>Advanced analytics and hiring reports for companies</li>
          <li>Skill-based job matching tailored to candidates</li>
        </ul>
      </section>

      {/* How It Works Section */}
      <section className="flex-section">
        <div className="content-wrapper">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <h3>1. Set Up Your Profile</h3>
              <p>Register as a student or company and complete your profile with relevant details and credentials.</p>
            </div>
            <div className="step">
              <h3>2. Post Jobs or Apply</h3>
              <p>Recruiters post job openings, and students apply instantly with their optimized profiles and resumes.</p>
            </div>
            <div className="step">
              <h3>3. Connect & Hire</h3>
              <p>Communicate in real-time, schedule interviews, and finalize hiring decisions efficiently within the platform.</p>
            </div>
          </div>
        </div>
        <div className="image-wrapper">
          <img
            src="https://img.freepik.com/free-photo/apply-now-application-employment-work-concept_53876-21142.jpg?t=st=1745412744~exp=1745416344~hmac=b64d4d2e8729f09ba128a2bc0e82d14d782f7ac1266558915c31ce708cb1402d&w=996"
            alt="Steps for using JobPortal"
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <blockquote>“JobPortal helped us find top-tier interns quickly. The platform is intuitive and efficient.” — HR Manager, TechCorp</blockquote>
        <blockquote>“I landed my dream job right after graduation thanks to JobPortal. The alerts are a lifesaver!” — Ananya, Student</blockquote>
        <blockquote>“The tracking system is a game-changer. We never miss a follow-up now.” — Talent Lead, Innovate Inc.</blockquote>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h3>Get Started Today</h3>
        <p>Join thousands of users who trust JobPortal to simplify their job search and hiring process. It's fast, smart, and built for you.</p>   
        <Link to="ContactUs"><button>Register Now</button></Link>
      </section>

      {/* Footer */}
      <div className='recrutment__footer'>
        <div className="recruitment__footer__container">
          <div>
            <h2>Doltec</h2>
            <p>BUILDING AWARENESS WITH WISDOM.</p>
          </div>
          <div >
            <h2>Useful Links</h2>
            <ul className='usefull__links'>
              <li><Link to="Industries">Industries</Link></li>
              <li><Link to="Services">Services</Link></li>
              <li><Link to="Overview">Overview</Link></li>
              <li><Link to="Product">Product</Link></li>
              <li><Link to="Mission">Mission</Link></li>
              <li><Link to="Vission">Vission</Link></li>
              <li><Link to="Project">Project</Link></li>
              <li><Link to="About">About</Link></li>
            </ul>
          </div>
          <div>
            <h2>Connect With Us</h2>
            <ul className='connentus'>
              <li><i class="fa fa-phone" aria-hidden="true"></i> <a href="tel:+0000000000">0000000000</a></li>
              <li><i class="fa fa-whatsapp" aria-hidden="true"></i> <a href="https://wa.me/">0000000000</a></li>
              <li><i class="fa fa-envelope" aria-hidden="true"></i> <a href="mailto:support@doltec.com">support@doltec.com</a></li>
              <li><i class="fa fa-map-marker" aria-hidden="true"></i> <a>Bangalore Karnataka</a></li>
            </ul>
          </div>
        </div>
        <div className="copyrights">
          <p>© {new Date().getFullYear()} Doltec. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
