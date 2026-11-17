'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="site-footer-navy">
        <div className="container">
          <div className="footer-columns-grid">
            {/* Column 1: Brand & Original Blurb */}
            <div className="footer-col footer-col-brand">
              <Link href="/#hero" className="footer-brand-logo" aria-label="GOYAL TRADERS Home">
                <img
                  src="/images/goyal-traders-logo.png"
                  alt="GOYAL TRADERS Logo"
                  className="footer-brand-logo-img"
                  width={42}
                  height={42}
                />
                <div className="footer-brand-text-wrap">
                  <span className="footer-brand-name">GOYAL TRADERS</span>
                  <span className="footer-brand-tagline">B2B digital payments for retailers &amp; distributors</span>
                </div>
              </Link>
              <p className="footer-brand-blurb">
                Goyal Traders helps shopkeepers and business partners add mobile recharge, bill payments, and everyday financial services to their counter through a simple, unified platform.
              </p>
              <Link href="/#hero" className="footer-talk-link">
                Talk to us <span className="footer-talk-arrow" aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            {/* Column 2: Company */}
            <div className="footer-col">
              <h3 className="footer-col-title">Company</h3>
              <ul className="footer-links-list">
                <li>
                  <Link href="/#hero" className="footer-nav-link">
                    <span className="footer-chevron" aria-hidden="true">&rsaquo;</span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/#why-partner" className="footer-nav-link">
                    <span className="footer-chevron" aria-hidden="true">&rsaquo;</span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/#roles" className="footer-nav-link">
                    <span className="footer-chevron" aria-hidden="true">&rsaquo;</span>
                    Roles &amp; Hierarchy
                  </Link>
                </li>
                <li>
                  <Link href="/#how-we-work" className="footer-nav-link">
                    <span className="footer-chevron" aria-hidden="true">&rsaquo;</span>
                    How We Work
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="footer-nav-link">
                    <span className="footer-chevron" aria-hidden="true">&rsaquo;</span>
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/#hero" className="footer-nav-link">
                    <span className="footer-chevron" aria-hidden="true">&rsaquo;</span>
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Services */}
            <div className="footer-col">
              <h3 className="footer-col-title">Services</h3>
              <ul className="footer-links-list footer-services-list">
                <li><Link href="/#services" className="footer-nav-link"><span className="footer-chevron" aria-hidden="true">&rsaquo;</span>Mobile Recharge API</Link></li>
                <li><Link href="/#services" className="footer-nav-link"><span className="footer-chevron" aria-hidden="true">&rsaquo;</span>DTH Recharge</Link></li>
                <li><Link href="/#services" className="footer-nav-link"><span className="footer-chevron" aria-hidden="true">&rsaquo;</span>Electricity & Bill Payments</Link></li>
                <li><Link href="/#services" className="footer-nav-link"><span className="footer-chevron" aria-hidden="true">&rsaquo;</span>Utility & Fee Payments</Link></li>
                <li><Link href="/#services" className="footer-nav-link"><span className="footer-chevron" aria-hidden="true">&rsaquo;</span>Insurance Distribution</Link></li>
                <li><Link href="/#services" className="footer-nav-link"><span className="footer-chevron" aria-hidden="true">&rsaquo;</span>Dedicated Partner Support</Link></li>
              </ul>
            </div>

            {/* Column 4: Contact Placeholder Cards */}
            <div className="footer-col">
              <h3 className="footer-col-title">Contact</h3>
              <div className="footer-office-cards">
                <div className="footer-office-card">
                  <span className="office-card-label">REGISTERED &amp; CORPORATE OFFICE</span>
                  <address className="office-card-address" style={{ fontStyle: 'normal', margin: 0 }}>
                    <strong>Goyal Traders</strong><br />
                    Ram Bagh Road, Anaj Mandi Road,<br />
                    Barnala, Punjab &ndash; 148101
                  </address>
                </div>
              </div>
              <div className="footer-direct-contacts">
                <a href="mailto:hello@goyaltraders.example" className="footer-contact-line">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                  <span>hello@goyaltraders.example</span>
                </a>
                <a href="tel:+910000000000" className="footer-contact-line">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>+91 00000 00000</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="footer-bottom-bar">
          <div className="container">
            <p className="footer-copyright-text">
              &copy; 2026 Goyal Traders. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <button
        type="button"
        className={`back-to-top-btn ${showBackToTop ? 'is-visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </>
  );
}
