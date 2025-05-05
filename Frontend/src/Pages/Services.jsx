const services = [
  {
    title: "Job Posting for Companies",
    icon: "📢",
    description:
      "Easily post jobs and reach thousands of verified candidates from various industries.",
  },
  {
    title: "Smart Job Matching",
    icon: "🤖",
    description:
      "Our system intelligently matches students with relevant opportunities based on skills and preferences.",
  },
  {
    title: "Student Profiles & Resumes",
    icon: "📝",
    description:
      "Students can build detailed profiles to showcase their skills, education, and projects.",
  },
  {
    title: "Campus Hiring Support",
    icon: "🎓",
    description:
      "Connect with colleges for internships and fresher recruitment drives.",
  },
];

const Services = () => {
  return (
    <div id="services">
      <div className="services-page">
        {/* Hero Section */}
        <section className="hero">
          <h1>Our Services</h1>
          <p>
            At Doltec, we bridge the gap between top talent and growing
            companies with smart recruitment tools.
          </p>
        </section>

        {/* Services Grid */}
        <section className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </section>

        {/* How It Works */}
        <section className="how-it-works">
          <h2>How It Works</h2>
          <div className="steps">
            <div>
              <h4>For Companies</h4>
              <ol>
                <li> <i class="fa fa-arrow-right" aria-hidden="true"></i> Create a company profile.</li>
                <li> <i class="fa fa-arrow-right" aria-hidden="true"></i> Post jobs and set requirements.</li>
                <li> <i class="fa fa-arrow-right" aria-hidden="true"></i> Receive applications or browse candidates.</li>
                <li> <i class="fa fa-arrow-right" aria-hidden="true"></i> Hire directly through the platform.</li>
              </ol>
            </div>
            <div>
              <h4>For Students</h4>
              <ol>
                <li> <i class="fa fa-arrow-right" aria-hidden="true"></i> Create your student profile.</li>
                <li> <i class="fa fa-arrow-right" aria-hidden="true"></i> Explore jobs or get matched automatically.</li>
                <li> <i class="fa fa-arrow-right" aria-hidden="true"></i> Apply with one click.</li>
                <li> <i class="fa fa-arrow-right" aria-hidden="true"></i> Track status and get hired.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta">
          <h2>Start your journey with Doltec today</h2>
          <button>Post a Job</button>
          <button>Create Student Profile</button>
        </section>
      </div>
    </div>
  );
};

export default Services;
