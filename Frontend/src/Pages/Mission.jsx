import React from 'react';


const values = [
  {
    title: 'Empowerment',
    description: 'We empower students to find meaningful careers by providing the right tools and opportunities.',
    icon: '🚀',
  },
  {
    title: 'Innovation',
    description: 'We use technology like AI to make hiring smarter and faster for everyone involved.',
    icon: '💡',
  },
  {
    title: 'Accessibility',
    description: 'We believe everyone deserves a fair chance to grow — regardless of background or location.',
    icon: '🌍',
  },
];

const Mission = () => {
  return (
    <div id="mission">
      <div className="mission-page">
      {/* Hero */}
      <section className="hero">
        <h1>Our Mission</h1>
        <p>At Doltec, our mission is to bridge the gap between education and employment through smart, accessible, and inclusive technology.</p>
      </section>

      {/* Values */}
      <section className="values">
        <h2>What We Stand For</h2>
        <div className="value-cards">
          {values.map((value, index) => (
            <div className="value-card" key={index}>
              <div className="icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision */}
      <section className="vision">
        <h2>Our Vision</h2>
        <p>
          We envision a future where every student can find a job that fits their passion, and every company can access a diverse pool of talent with ease.
        </p>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Be Part of the Future of Hiring</h2>
        <button>Join Doltec</button>
      </section>
    </div>
    </div>
  );
};

export default Mission;
