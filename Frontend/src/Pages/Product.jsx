import {Link} from 'react-router-dom';
const products = [
  {
    title: 'Job Post Engine',
  icon: '🧰',
    description: 'Create, publish, and manage job listings across multiple categories.',
  },
  {
    title: 'Candidate CRM',
     icon: '📋',
    description: 'Centralized repository to track, tag, and manage applicants throughout their lifecycle.',
  },
  {
    title: 'Interview Manager',
    icon: '📅',
    description: 'Built-in scheduling, video interview integrations, and evaluation scoring..',
  },
  {
    title: 'Resume Analyzer',
    icon: '🧠', 
    description: 'AI/ML-powered resume parsing and match scoring with job role alignment.',
  },
  {
    title: 'Hiring Analytics Dashboard',
     icon: '📈',
    description: 'Visual insights into hiring metrics, pipeline health, and recruiter efficiency.',
  },
  {
    title: 'Offer Management Tool',
   icon: '✉️', 
    description: 'Draft, issue, and digitally manage offer letters with status tracking.',
  },
];

const Products = () => {
  return (
    <div id="products">

      <section className="products-intro">
         <div className="product__content">
             <h2>Powerful Recruitment Products, One Unified Platform</h2>
             <p>From job posting to final offer—explore the modular tools that make Doltec a complete talent acquisition solution.</p>
             <button><Link to="/ContactUs">Get Started</Link></button>
         </div>
      </section>

      <section className="product-features">
        <h2>Core Product Modules</h2>
         <div className="product-grid">
           {products.map((product, index) => (
          <div className="product-card" key={index}>
            <div className="icon">{product.icon}</div>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </div>
        ))}
         </div>
      </section>

      <section className='plate__form__benift'>
         <h2>Why Doltec Products Stand Out</h2>
         <div className="benift__container">
          <div className="benift__card">
            <h3>All-in-One Ecosystem</h3>
            <p>Everything you need to manage recruitment—no switching tabs.</p>
          </div>
          <div className="benift__card">
            <h3>Cloud-Based and Secure</h3>
            <p>GDPR-compliant and encrypted data handling across modules.</p>
          </div>
          <div className="benift__card">
            <h3>Role-Based Access</h3>
            <p>Configurable permissions for recruiters, managers, and admins.</p>
          </div>
         </div>
      </section>

      <section className="hiring__needs">
        <h2>Built for Every Hiring Need</h2>
        <p>Whether you're a fast-scaling startup or an enterprise HR team, Doltec adapts to your workflow</p>
        <div className='hiring__container'>
          <div className="overlayer">
             <div className='hiring__card'>
              <h3><i className="fa fa-lightbulb-o text-yellow-300"></i> Recruitment Agencies</h3>
            <h3><i className="fa fa-lightbulb-o text-yellow-300"></i> Corporate HR Teams</h3>
            <h3><i className="fa fa-lightbulb-o text-yellow-300"></i> Startups & SMEs</h3>
            <h3><i className="fa fa-lightbulb-o text-yellow-300"></i> Educational Institutions</h3>
             </div>
          </div>
        </div>
      </section>

      {/* <section className="cta">
        <h2>Get Started with Doltec Products Today</h2>
         <div className="cta__btn">
           <button>Start Posting Jobs</button>
           <button>Schedule a Demo</button>
         </div>
      </section>*/}
    </div>
  );
};

export default Products;
