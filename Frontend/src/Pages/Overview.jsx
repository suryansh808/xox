
const Overview = () => {
  return (
    <div id="overview">
      {/* Hero Section */}
      <section className="hero-section">
         <div>
         <h1>Welcome to [Doltec]</h1>
        <p>Connecting Employers with the Best Talent</p>
        <button className="cta-btn">Post a Job</button>
         </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>For Employers</h3>
            <ul>
              <li><i class="fa fa-check-circle" aria-hidden="true"></i> Create an Account</li>
              <li><i class="fa fa-check-circle" aria-hidden="true"></i> Post a Job</li>
              <li><i class="fa fa-check-circle" aria-hidden="true"></i> Review Applications</li>
              <li><i class="fa fa-check-circle" aria-hidden="true"></i> Hire the Best Talent</li>
            </ul>
          </div>
          <div className="step">
            <h3>For Students</h3>
            <ul>
              <li><i class="fa fa-check-circle" aria-hidden="true"></i> Sign Up</li>
              <li><i class="fa fa-check-circle" aria-hidden="true"></i> Browse Jobs</li>
              <li><i class="fa fa-check-circle" aria-hidden="true"></i> Apply for Jobs</li>
              <li><i class="fa fa-check-circle" aria-hidden="true"></i> Get Hired</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="key-features">
        <h2>Key Features & Benefits</h2>
        <div className="features">
          <div className="feature">
            <h3>For Job Seekers</h3>
            <ul>
              <li>Personalized Job Recommendations</li>
              <li>Easy Application Process</li>
              <li>Access to Internships & Full-Time Roles</li>
              <li>Interview Preparation & Career Resources</li>
            </ul>
          </div>
          <div className="feature">
            <h3>For Employers</h3>
            <ul>
              <li>Easy Job Posting & Management</li>
              <li>Access to a Wide Talent Pool</li>
              <li>Candidate Screening Tools</li>
              <li>Insights & Analytics to Track Job Posting Success</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="success-stories">
        <h2>Success Stories</h2>
        <div className="testimonials">
          <p>"I landed my first job through [Your Website Name]. Highly recommend!" - Student</p>
          <p>"We've hired multiple interns through the platform. It's a game-changer!" - Employer</p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <button className="cta-btn">Start Your Job Search Now</button>
      </section>
    </div>
  );
};

export default Overview;
