import {Link} from 'react-router-dom';
const projects = [
  {
    title: 'Virtual Job Fair 2024',
    description: 'Connected 10,000+ students with 200+ companies via a fully online platform.',
    tag: 'Hiring Drive',
  },
  {
    title: 'AI Resume Scanner Tool',
    description: 'Built an AI tool to evaluate and score student resumes for better shortlisting.',
    tag: 'Product Innovation',
  },
  {
    title: 'Campus Placement at XYZ College',
    description: 'Ran a 3-day event with top recruiters hiring 150+ final-year students.',
    tag: 'College Collaboration',
  },
  {
    title: 'SkillUP Bootcamp Partnership',
    description: 'Partnered with SkillUP to upskill students in Data Science and Web Development.',
    tag: 'Partnership',
  },
];

const Projects = () => {
  return (
   <div id="project">
       <div className="projects-page">
      <section className="hero">
        <h1>Our Projects</h1>
        <p>At Doltec, we don't just connect — we create real-world impact through events, tools, and partnerships.</p>
      </section>

      <section className="project-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <span className="tag">{project.tag}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </section>

      <section className="cta">
        <h2>Want to collaborate with Doltec?</h2>
        <button><Link to="/contactus">Partner With Us</Link></button>
      </section>
    </div>
   </div>
  );
};

export default Projects;
