'use client';

import Image from 'next/image';
import ContactForm from './ContactForm';

export default function ContactSection() {
  return (
    <section id="contact" className="contact-project-section" aria-labelledby="contact-heading">
      <div className="container">
        <div className="contact-section-split">
          {/* Left Column: Form with rewritten copy */}
          <div className="contact-left-col reveal-on-scroll">
            <span className="contact-eyebrow-text">Get in touch</span>
            <h1 id="contact-heading" className="contact-h1-title">
              Tell us about your project
            </h1>
            <p className="contact-intro-text">
              Share a few details and our team will reply within one working day with the services that fit best.
            </p>

            <ContactForm />
          </div>

          {/* Right Column: Seamlessly merged 4th image & direct contact details */}
          <div className="contact-right-col reveal-on-scroll" style={{ transitionDelay: '120ms' }}>
            <div className="contact-visual-merged-wrap">
              <Image
                src="/images/contact-support.jpg"
                alt="Goyal Traders Customer Support and Connected Services Illustration"
                width={520}
                height={390}
                className="contact-3d-merged-img"
                priority
              />
            </div>

            <div className="contact-sidebar-info">
              <div className="sidebar-office-card">
                <span className="sidebar-card-tag">HEAD OFFICE</span>
                <span className="sidebar-card-text">Level 4, Prestige Tech Park, Outer Ring Road, Kadubeesanahalli, Bengaluru, Karnataka 560103</span>
              </div>
              <div className="sidebar-office-card">
                <span className="sidebar-card-tag">REGISTERED OFFICE</span>
                <span className="sidebar-card-text">Unit 602, Cyber One, Sector 30, Vashi, Navi Mumbai, Maharashtra 400703</span>
              </div>
              <div className="sidebar-links-row">
                <a href="mailto:hello@goyaltraders.example" className="sidebar-contact-pill">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                  <span>hello@goyaltraders.example</span>
                </a>
                <a href="tel:+910000000000" className="sidebar-contact-pill">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>+91 00000 00000</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
