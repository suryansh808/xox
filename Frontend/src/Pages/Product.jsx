
const products = [
  {
    title: 'AI Job Matching',
    icon: '🤖',
    description: 'Smart algorithm that recommends jobs based on your skills and goals.',
  },
  {
    title: 'Resume Builder',
    icon: '📝',
    description: 'Create professional resumes directly from your Doltec profile.',
  },
  {
    title: 'Company Job Dashboard',
    icon: '📊',
    description: 'Track applications, manage postings, and get insights on candidate quality.',
  },
  {
    title: 'College Integration Tool',
    icon: '🏫',
    description: 'Special tools to conduct hiring drives with colleges and universities.',
  },
];

const Products = () => {
  return (
    <div id="products">
        <div className="products-page">
      <section className="hero">
        <h1>Our Products</h1>
        <p>Explore the powerful tools that make Doltec your go-to recruitment and job search platform.</p>
      </section>

      <section className="product-grid">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <div className="icon">{product.icon}</div>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </div>
        ))}
      </section>

      <section className="cta">
        <h2>Ready to experience Doltec's tools?</h2>
        <button>Try Now</button>
      </section>
    </div>
    </div>
  );
};

export default Products;
