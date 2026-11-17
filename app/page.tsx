import Link from 'next/link';
import HeroContactCard from '@/components/HeroContactCard';
import PartnerTicker from '@/components/PartnerTicker';
import ServicesList from '@/components/ServicesList';
import BillPayments from '@/components/BillPayments';
import StatsSection from '@/components/StatsSection';
import HowWeWork from '@/components/HowWeWork';
import ClosingCta from '@/components/ClosingCta';
import ScrollRevealInit from '@/components/ScrollRevealInit';

export const metadata = {
  title: 'GOYAL TRADERS | B2B digital payments for retailers & distributors',
  description: 'Goyal Traders brings recharge, bill payments, digital verification and banking services together through a unified platform, helping businesses simplify service delivery and expand their digital offerings.',
};

export default function HomePage() {
  return (
    <>
      <ScrollRevealInit />

      {/* Hero Section */}
      <section id="hero" className="hero-section" aria-labelledby="hero-heading">
        {/* Background Video */}
        <video
          className="hero-bg-video"
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-bg.jpg"
          aria-hidden="true"
        >
          <source src="/bg_video.mp4" type="video/mp4" />
        </video>

        <div className="container relative-z">
          <div className="hero-grid">
            <div className="hero-content">
              {/* Eyebrow Pill Tag */}
              <div className="hero-pill-badge fade-in-on-load">
                <span className="hero-pill-sparkle" aria-hidden="true">&#10022;</span>
                <span>UNIFIED FINTECH SERVICES &amp; API SOLUTIONS</span>
              </div>

              <h1 id="hero-heading" className="hero-title fade-in-on-load">
                Powering businesses with <span className="hero-title-accent">seamless financial services.</span>
              </h1>
              <p className="lead hero-text fade-in-on-load fade-in-on-load-delay-1">
                Goyal Traders brings recharge, bill payments, digital verification and banking services together through a unified platform, helping businesses simplify service delivery and expand their digital offerings.
              </p>
              <div className="hero-actions fade-in-on-load fade-in-on-load-delay-2">
                <a href="#services" className="btn btn-primary">
                  Explore Our Services
                  <span className="btn-arrow-icon" aria-hidden="true">&rarr;</span>
                </a>
                <a href="#hero-contact-card" className="btn btn-secondary">
                  Become a Partner
                  <span className="btn-arrow-icon" aria-hidden="true">&rarr;</span>
                </a>
              </div>

              {/* Feature Highlights Row */}
              <div className="hero-trust-row fade-in-on-load fade-in-on-load-delay-2">
                <div className="hero-trust-item">
                  <span className="hero-trust-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  </span>
                  <span>Unified API Integration</span>
                </div>
                <div className="hero-trust-item">
                  <span className="hero-trust-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </span>
                  <span>Secure Transactions</span>
                </div>
                <div className="hero-trust-item">
                  <span className="hero-trust-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </span>
                  <span>Business Partner Network</span>
                </div>
              </div>
            </div>

            <div className="fade-in-on-load fade-in-on-load-delay-2">
              <HeroContactCard />
            </div>
          </div>
        </div>
      </section>

      {/* Partner Ticker / Marquee Strip (directly below Hero and above Services) */}
      <PartnerTicker />

      {/* Services Section */}
      <ServicesList />

      {/* Bill Categories / Pay Every Bill From One Counter */}
      <BillPayments />

      {/* Stats Section (between Services and How We Work) */}
      <StatsSection />

      {/* How We Work Strip */}
      <HowWeWork />

      {/* Closing CTA Band */}
      <ClosingCta />
    </>
  );
}
