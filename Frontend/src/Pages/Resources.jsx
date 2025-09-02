import React, { useState } from "react";
import { Link } from "react-router-dom";


const allArticles = [
  {
    title: "How to build a standout student profile",
    excerpt: "Craft a portfolio that showcases projects, skills, and potential.",
    tag: "Student Tips",
  },
  {
    title: "Hiring playbook for early-career talent",
    excerpt: "Best practices to assess skills and potential beyond resumes.",
    tag: "Hiring Playbook",
  },
  {
    title: "Ace your first interview",
    excerpt: "Structured prep to reduce nerves and highlight your strengths.",
    tag: "Student Tips",
  },
  {
    title: "Structured interviews that work",
    excerpt: "Create consistent, fair processes that produce better hires.",
    tag: "Hiring Playbook",
  },
  {
    title: "Why companies must invest in fresher hiring",
    excerpt: "Long-term value of developing talent early in their career.",
    tag: "Employer Insights",
  },
  {
    title: "Top skills employers look for in 2025",
    excerpt: "The most in-demand skills every student should focus on.",
    tag: "Student Tips",
  },
];

export default function Resources() {
  const [filter, setFilter] = useState("All");

  const tags = ["All", "Student Tips", "Hiring Playbook", "Employer Insights"];
  const articles =
    filter === "All"
      ? allArticles
      : allArticles.filter((a) => a.tag === filter);

  return (
     <div id="resources">
        <div className="resources-page">
      {/* Hero Banner */}
      <section className="resources-hero">
        <h1>Resources & Career Tips</h1>
        <p>
          Practical guides for students to stand out and for employers to hire
          smarter.
        </p>
      </section>

      {/* Filters */}
      <div className="resources-filters">
        {tags.map((t) => (
          <button
            key={t}
            className={filter === t ? "active" : ""}
            onClick={() => setFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <section className="resources-grid">
        {articles.map((a) => (
          <article key={a.title} className="resource-card">
            <span className="resource-tag">{a.tag}</span>
            <h3>{a.title}</h3>
            <p>{a.excerpt}</p>
            {/* <a href="#">Read more →</a> */}
          </article>
        ))}
      </section>

      {/* CTA Section */}
      <section className="resources-cta">
        <h2>Get started with Doltec</h2>
        <p>
          Students create profiles for free. Companies can post jobs and hire
          with ease.
        </p>
        <div className="cta-buttons">
          <Link to="/StudentLogIn" className="btn student-btn">
            For Students
          </Link>
          <Link to="/Companylogin" className="btn company-btn">
            For Companies
          </Link>
        </div>
      </section>
    </div>
     </div>
  );
}
