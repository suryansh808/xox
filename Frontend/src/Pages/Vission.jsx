
const Vision = () => {
  
  const values = [
  {
    title: "Transparency First",
    description:
      "We remove the guesswork from the recruitment process—for employers and applicants.",
    icon: "🔍",
  },
  {
    title: "Tech with Purpose",
    description:
      "Every feature we build solves a real hiring challenge.",
    icon: "💻",
  },
  {
    title: "Candidate-Centricity",
    description:
      "We prioritize candidate experience at every touchpoint.",
    icon: "🤝",
  },
  {
    title: "Data-Driven Decisions",
    description:
      "Insights, not instinct, drive hiring success.",
    icon: "📊",
  },
];

  return (
    <div id="mission">
      {/* Hero */}
      <section className="mission__hero">
        <div className="mission__content">
          <h2>Transforming Hiring. Empowering Careers</h2>
          <p>
            Our mission is to build a seamless recruitment ecosystem where
            talent meets opportunity without friction.
          </p>
          <div className="mission__btn">
            <button>Explore Our Journey</button>
            <button>Meet Our Team</button>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="core__mission">
        <h2>Our Mission at Doltec</h2>
        <div className="mission__callout">
          <p>
            “At Doltec, we exist to eliminate inefficiencies in hiring. We
            believe that recruiting should be faster, smarter, and fairer—for
            every candidate and every company. Our platform empowers employers
            to discover top talent with precision, and enables candidates to
            land their dream jobs through transparency, automation, and
            innovation.”
          </p>
        </div>
      </section>

      {/* Vision */}
      <section className="vision">
        <h2>Where We’re Headed</h2>
        <p>
          A future where hiring is no longer a bottleneck, but a competitive
          advantage.
        </p>

        <div className="vission__content">
          <div className="vission__card">
            <h3> ⚙️ Streamline the full hiring journey</h3>
          </div>
          <div className="vission__card">
            <h3> 🌍 Enable fair access through automation</h3>
          </div>
          <div className="vission__card">   
            <h3> 🚀 Empower all companies to compete</h3>
          </div>
        </div>
      </section>
        
      {/* guiding principle */}
       <section className="principle">
        <h2>What We Stand For</h2>
        <div className="principle__container">
          {values.map((value, index) => (
            <div className="principle__card" key={index}>
              <div className="principle__icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
       </section>

      {/* CTA */}
      <section className="cta">
        <h2>Join Us in Shaping the Future of Work</h2>
        <div className="cta__btn">
          <button>Start Hiring with Doltec</button>
          <button>Explore Careers at Doltec</button>
        </div>
      </section>
    </div>
  );
};

export default Vision;
