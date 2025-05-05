
const About = () => {
  return (
     <div id="about">
       <div className="about-page">
      {/* Hero */}
      <section className="hero">
        <h1>About Doltec</h1>
        <p>
          Doltec is a modern job platform connecting students and early professionals with hiring companies through technology, innovation, and opportunity.
        </p>
      </section>

      {/* Our Story */}
      <section className="our-story">
        <h2>Our Story</h2>
        <p>
          Doltec was founded with a simple goal: make it easier for students and fresh graduates to find real job opportunities 
          — and help companies find hidden talent beyond the traditional resume. 
          We’re solving the problem of disconnected hiring by building a smart, scalable, and inclusive platform.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="mv-section">
        <div className="mission">
          <h3>Our Mission</h3>
          <p>To bridge the gap between education and employment by empowering students and recruiters with intelligent tools and equal access.</p>
        </div>
        <div className="vision">
          <h3>Our Vision</h3>
          <p>To create a future where talent is discovered based on potential — not just pedigree — and every student has a fair shot at success.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Join Us on This Journey</h2>
        <button>Explore Opportunities</button>
        <button>Partner with Us</button>
      </section>
    </div>
     </div>
  );
};

export default About;
