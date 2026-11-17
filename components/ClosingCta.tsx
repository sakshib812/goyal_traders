import Link from 'next/link';

export default function ClosingCta() {
  return (
    <section className="cta-band" aria-label="Closing Call to Action">
      <div className="container">
        <div className="cta-inner reveal-on-scroll">
          <div>
            <h2 className="cta-heading">Ready to add services to your product?</h2>
            <p className="lead" style={{ marginTop: '6px', maxWidth: '560px' }}>
              Connect with our team to explore integration options, technical documentation and sandbox access.
            </p>
          </div>
          <a href="#hero-contact-card" className="btn btn-primary">
            Start a conversation
            <span className="btn-arrow-icon" aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
