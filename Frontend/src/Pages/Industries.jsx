import React from "react";

const industries = [
  {
    name: "Information Technology",
    icon: "💻",
    description: "Software, AI, Data Science jobs and more.",
  },
  {
    name: "Healthcare",
    icon: "🩺",
    description: "Nursing, clinical research, and health tech roles.",
  },
  {
    name: "Finance",
    icon: "💰",
    description: "Banking, FinTech, accounting, and more.",
  },
  {
    name: "Engineering",
    icon: "🏗️",
    description: "Mechanical, Civil, and Electrical engineering jobs.",
  },
  {
    name: "Education",
    icon: "🎓",
    description: "Teaching, EdTech, curriculum design roles.",
  },
  {
    name: "Marketing & Sales",
    icon: "📈",
    description: "Digital marketing, sales, and brand roles.",
  },
];

const Industries = () => {
  return (
    <div id="industries">
      <div className="industries-page">
        {/* Hero Section */}
        <section className="hero">
          <h1>Explore Opportunities Across Industries</h1>
          <p>
            At Doltec, we connect students and professionals with jobs across a
            wide range of industries.
          </p>
        </section>

        {/* Industry Cards */}
        <section className="industry-grid">
          {industries.map((industry, index) => (
            <div className="industry-card" key={index}>
              <div className="icon">{industry.icon}</div>
              <h3>{industry.name}</h3>
              <p>{industry.description}</p>
            </div>
          ))}
        </section>

        {/* Why Doltec */}
        <section className="why-doltec">
          <h2>Why Choose Doltec?</h2>
          <ul>
            <li>✔ Tailored job listings by industry.</li>
            <li>✔ Trusted by leading companies and startups.</li>
            <li>✔ Easy application process for students and freshers.</li>
          </ul>
        </section>

        {/* CTA Section */}
        <section className="cta">
          <h2>Ready to take the next step?</h2>
          <button>Post a Job</button>
          <button className="secondary">Explore Jobs</button>
        </section>
      </div>
    </div>
  );
};

export default Industries;
