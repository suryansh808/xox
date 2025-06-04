import suryansh from "../assets/dev/suryanshsaxena.jpg";
import danish from "../assets/dev/danish.jpg";
import affan from "../assets/dev/affan.jpg";

const About = () => {
  return (
    <div id="about">
      {/* Hero */}
      <section className="about__hero">
        <div className="about__content">
          <h2>Powering the Future of Hiring</h2>
          <p>
            “At Doltec, we believe hiring should be intelligent, inclusive, and
            instant. We're building the next-gen recruitment platform where
            talent meets opportunity—seamlessly, efficiently, and at scale.”
          </p>
          <button>Explore Our Platform</button>
        </div>
      </section>

      {/* mission*/}
      <section className="mission__statement">
        <h2>Empowering Hiring Ecosystems</h2>
        <p>
          Our mission is to reimagine recruitment through technology,
          transparency, and trust. We aim to simplify the hiring lifecycle for
          both organizations and applicants, fostering meaningful connections
          that drive careers and fuel business growth.
        </p>
      </section>

      {/* vission*/}
      <section className="vission__statement">
        <h2>A Talent-Centric Tomorrow</h2>
        <div className="vission__qoute">
          <p>
            To bridge the gap between education and employment by empowering
            students and recruiters with intelligent tools and equal access.
          </p>
        </div>
      </section>

      {/* Our story */}
      <section className="our__story">
        <h2>Built to Solve Real Hiring Challenges</h2>
        <p>
          Born out of frustration with traditional hiring processes, Doltec was
          founded by industry veterans and technologists who saw the need for a
          single, intelligent recruitment platform. From day one, we’ve focused
          on removing friction and maximizing visibility for every stakeholder
          in the hiring chain.
        </p>

        <div className="timeline__wrapper">
          <div className="timeline__container">
            {[
              {
                title: "Ideation",
                description:
                  "Identified key hiring bottlenecks and conceptualized a unified platform.",
                icon: "🧠",
              },
              {
                title: "Prototype Built",
                description:
                  "Developed an MVP focusing on ATS integration and candidate pipeline transparency.",
                icon: "⚙️",
              },
              {
                title: "Beta Launched",
                description:
                  "Piloted with early adopters from tech hiring teams across startups.",
                icon: "🚀",
              },
              {
                title: "Live Deployment",
                description:
                  "Expanded platform across enterprise-scale clients with full feature rollout.",
                icon: "🌐",
              },
              {
                title: "Future Vision",
                description:
                  "AI-driven matching and predictive hiring analytics in the roadmap.",
                icon: "🔮",
              },
            ].map((milestone, index) => (
              <div key={index} className="timeline__card">
                <div className="timeline__icon">{milestone.icon}</div>
                <h4>{milestone.title}</h4>
                <p>{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="our__team">
        <h2>Meet the Team Behind Doltec</h2>
        <p>
          Our diverse team of engineers, designers, and hiring experts is united
          by a common goal: to transform the way organizations connect with
          talent. With backgrounds in technology, HR, and business, we bring a
          wealth of experience and passion to our mission.
        </p>

        <div className="team__members">
          {[
            {
              name: "Suryansh Saxena",
              role: "",
              image: `${suryansh}`,
              linkedIn: "https://in.linkedin.com/in/suryansh-saxena",
            },
            {
              name: "Danish Raza Akhtar",
              role: "",
              image: `${danish}`,
              linkedIn: "https://in.linkedin.com/in/danish-raja-akhtar",
            },
            {
              name: "Mohammad Afan R",
              role: "",
              image: `${affan}`,
              linkedIn: "https://in.linkedin.com/in/mohammedafan",
            },
          ].map((member, index) => (
            <div key={index} className="team__member">
              <img src={member.image} alt={member.name} />
              <div className="member__info">
                {/* <h4>{member.name}</h4> */}
                <a href={member.linkedIn} target="blank">
                  <h4>{member.name}</h4>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      {/* <section className="cta">
        <h2>Join Us or Hire With Us</h2>
        <p>
          Whether you're a candidate ready for your next leap, or a company
          seeking game-changing talent—Doltec is your growth partner.
        </p>
        <div className="cta__btn">
          <button>Explore Opportunities</button>
          <button>Partner with Us</button>
        </div>
      </section> */}
    </div>
  );
};

export default About;
