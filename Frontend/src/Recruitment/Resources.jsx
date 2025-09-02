
import { Link } from "react-router-dom";

const articles = [
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
];

export default function Resources() {
  return (
     <div id="resources_landingpage">
         <section id="resources" className="resources">
            <div className="resources-container">
        <div className="resources-header">
          <div>
            <h2 className="resources-title">Resources & career tips</h2>
            <p className="resources-subtitle">
              Guides for students and employers to succeed.
            </p>
          </div>
          <Link to="/Resources" className="resources-link desktop-only">
            Explore all resources
          </Link>
        </div>

        <div className="resources-grid">
          {articles.map((a) => (
            <article key={a.title} className="resource-card">
              <div className="resource-tag">{a.tag}</div>
              <h3 className="resource-title">{a.title}</h3>
              <p className="resource-excerpt">{a.excerpt}</p>
              <Link to="/Resources" className="resource-readmore" aria-label={`Read more: ${a.title}`}>
                Read more
              </Link>
            </article>
          ))}
        </div>

        <div className="mobile-only" style={{ textAlign: "center", marginTop: "1rem" }}>
          <Link to="/Resources" className="resources-link">
            Explore all resources
          </Link>
        </div>
            </div>
         </section>
     </div>
  );
}
