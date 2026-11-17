'use client';

import React, { useState, useEffect, useRef } from 'react';

// Official Lucide Icon Components
interface IconProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

function SmartphoneIcon({ size = 26, strokeWidth = 2, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}

function TvIcon({ size = 26, strokeWidth = 2, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
      <polyline points="17 2 12 7 7 2" />
    </svg>
  );
}

function ReceiptIcon({ size = 26, strokeWidth = 2, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 17.5v.5" />
      <path d="M12 6v.5" />
    </svg>
  );
}

function ZapIcon({ size = 26, strokeWidth = 2, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  );
}

function ShieldCheckIcon({ size = 26, strokeWidth = 2, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function HeadsetIcon({ size = 26, strokeWidth = 2, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
      <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
    </svg>
  );
}

function TrendingUpIcon({ size = 26, strokeWidth = 2, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function NetworkIcon({ size = 26, strokeWidth = 2, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="9" y="3" width="6" height="6" rx="1" />
      <rect x="2" y="15" width="6" height="6" rx="1" />
      <rect x="9" y="15" width="6" height="6" rx="1" />
      <rect x="16" y="15" width="6" height="6" rx="1" />
      <path d="M12 9v3" />
      <path d="M5 12h14" />
      <path d="M5 12v3" />
      <path d="M12 12v3" />
      <path d="M19 12v3" />
    </svg>
  );
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  stat1: { value: string; label: string };
  stat2: { value: string; label: string };
  accentGradient: string;
  icon: React.ComponentType<IconProps>;
  interest: string;
  tags?: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: 'mobile-recharge-api',
    title: 'Mobile Recharge API',
    description:
      'Offer prepaid recharges across operators through one API, with live status updates and automatic retries on failures.',
    stat1: { value: 'Real-time', label: 'STATUS' },
    stat2: { value: 'Multi-operator', label: 'COVERAGE' },
    accentGradient: 'linear-gradient(135deg, #FF6B35 0%, #EA580C 100%)',
    icon: SmartphoneIcon,
    interest: 'API Integration',
  },
  {
    id: 'dth-recharge',
    title: 'DTH Recharge',
    description:
      'Let customers renew DTH connections in seconds, with major providers supported and clean transaction records.',
    stat1: { value: 'Instant', label: 'CONFIRMATION' },
    stat2: { value: 'Full logs', label: 'TRANSACTIONS' },
    accentGradient: 'linear-gradient(135deg, #EA580C 0%, #C20D06 100%)',
    icon: TvIcon,
    interest: 'API Integration',
  },
  {
    id: 'electricity-bill-payments',
    title: 'Electricity & Bill Payments',
    description:
      'Fetch bills, collect payments and issue digital receipts for electricity, broadband and postpaid, all inside your app.',
    stat1: { value: 'Instant', label: 'BILL FETCH' },
    stat2: { value: 'Multi-biller', label: 'COVERAGE' },
    accentGradient: 'linear-gradient(135deg, #D9381E 0%, #F59E0B 100%)',
    icon: ReceiptIcon,
    interest: 'API Integration',
  },
  {
    id: 'utility-fee-payments',
    title: 'Utility & Fee Payments',
    description:
      'Bring FASTag, gas, water, municipal and school fee payments together in one unified payment flow.',
    stat1: { value: 'FASTag + more', label: 'UTILITIES' },
    stat2: { value: 'One flow', label: 'PAYMENTS' },
    accentGradient: 'linear-gradient(135deg, #C20D06 0%, #FF6B35 100%)',
    icon: ZapIcon,
    interest: 'API Integration',
  },
  {
    id: 'insurance-distribution',
    title: 'Insurance Distribution',
    description:
      'Add insurance products to your platform and let your network offer and renew policies with guided journeys.',
    stat1: { value: 'Guided', label: 'ONBOARDING' },
    stat2: { value: 'Renewals', label: 'SUPPORTED' },
    accentGradient: 'linear-gradient(135deg, #EA580C 0%, #FB923C 100%)',
    icon: ShieldCheckIcon,
    interest: 'Partnership',
  },
  {
    id: 'dedicated-partner-support',
    title: 'Dedicated Partner Support',
    description:
      'Technical onboarding, quick issue resolution and clear communication from a team that knows your business.',
    stat1: { value: 'Fast', label: 'RESOLUTION' },
    stat2: { value: 'Hands-on', label: 'ONBOARDING' },
    accentGradient: 'linear-gradient(135deg, #B91C1C 0%, #F97316 100%)',
    icon: HeadsetIcon,
    interest: 'Support',
  },
  {
    id: 'analytics-reports',
    title: 'Analytics & Reports',
    description:
      'Real-time dashboards and downloadable reports across all services to track transaction volume, success rates and commissions.',
    stat1: { value: 'Real-time', label: 'TRACKING' },
    stat2: { value: 'Full logs', label: 'REPORTS' },
    accentGradient: 'linear-gradient(135deg, #FF6B35 0%, #EA580C 100%)',
    icon: TrendingUpIcon,
    interest: 'Analytics & Reports',
  },
  {
    id: 'distributor-network-management',
    title: 'Distributor & Network Management',
    description:
      'Create sub-retailer logins, assign service permissions, set commission slabs and manage your entire distribution network.',
    stat1: { value: 'Multi-tier', label: 'NETWORK' },
    stat2: { value: 'Live sync', label: 'COMMISSION' },
    accentGradient: 'linear-gradient(135deg, #EA580C 0%, #C20D06 100%)',
    icon: NetworkIcon,
    interest: 'Distributor Management',
  },
];
export default function ServicesList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [isJsReady, setIsJsReady] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsJsReady(true);

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const currentSection = sectionRef.current;
    if (!currentSection) {
      setIsInView(true);
      return;
    }

    const rect = currentSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.intersectionRatio > 0.15) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(currentSection);

    const fallbackTimer = setTimeout(() => {
      setIsInView(true);
    }, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLLIElement>) => {
    const card = e.currentTarget.querySelector('.service-grid-card') as HTMLElement | null;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
  };

  const handleServiceClick = (service: ServiceItem, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('selectServiceInterest', {
          detail: { interest: service.interest },
        })
      );
    }

    const contactEl =
      document.getElementById('hero-contact-card') || document.getElementById('contact');

    if (contactEl) {
      const headerOffset = 90;
      const elementPosition = contactEl.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      contactEl.classList.remove('form-highlight-pulse');
      void contactEl.offsetWidth;
      contactEl.classList.add('form-highlight-pulse');

      setTimeout(() => {
        contactEl.classList.remove('form-highlight-pulse');
      }, 1250);

      const input = contactEl.querySelector('input');
      setTimeout(() => {
        input?.focus({ preventScroll: true });
      }, 450);
    }

    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', '#contact');
    }
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="services-section"
      aria-labelledby="services-heading"
    >
      {/* Floating blurred ambient shapes behind section */}
      <div className="services-ambient-bg" aria-hidden="true">
        <div className="services-floating-orb orb-1" />
        <div className="services-floating-orb orb-2" />
      </div>

      <div className="container relative-z">
        {/* Centered Section Header */}
        <div className="services-section-header reveal-on-scroll">
          <span className="services-eyebrow">OUR SOLUTIONS</span>
          <h2 id="services-heading" className="services-title">
            Fintech Services Built to Scale With You
          </h2>
          <p className="services-subheading">
            Launch, connect and grow with a single platform of payment, verification and banking
            services, delivered through secure and well-documented APIs.
          </p>
        </div>

        {/* 6-Card Animated Equal-Height Grid */}
        <ul
          id="services-grid-list"
          className={`services-grid ${isJsReady ? 'js-ready' : ''} ${
            isInView ? 'is-in-view' : ''
          } ${hoveredIndex !== null ? 'has-hover' : ''}`}
          role="list"
          aria-label="Fintech services catalog"
        >
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

            return (
              <li
                key={service.id}
                className={`service-card-item ${isDimmed ? 'is-card-dimmed' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onMouseMove={handleMouseMove}
              >
                <div className="service-grid-card">
                  {/* Top 4px colored gradient strip */}
                  <div
                    className="service-top-strip"
                    style={{ background: service.accentGradient }}
                    aria-hidden="true"
                  />

                  {/* Card Content Body */}
                  <div className="service-card-body">
                    {/* Icon Tile */}
                    <div
                      className="service-icon-tile"
                      style={{ background: service.accentGradient }}
                      aria-hidden="true"
                    >
                      <Icon size={26} strokeWidth={2} />
                    </div>

                    {/* Title */}
                    <h3 className="service-card-title">{service.title}</h3>

                    {/* Accent Underline Bar */}
                    <div
                      className="service-title-bar"
                      style={{ background: service.accentGradient }}
                      aria-hidden="true"
                    />

                    {/* Description */}
                    <p className="service-card-desc">{service.description}</p>

                    {/* Thin Divider */}
                    <div className="service-card-divider" aria-hidden="true" />

                    {/* 2-Column Stat Row */}
                    <div className="service-stats-row" aria-label="Service highlights">
                      <div className="service-stat-col">
                        <span className="service-stat-val">{service.stat1.value}</span>
                        <span className="service-stat-lbl">{service.stat1.label}</span>
                      </div>
                      <div className="service-stat-col">
                        <span className="service-stat-val">{service.stat2.value}</span>
                        <span className="service-stat-lbl">{service.stat2.label}</span>
                      </div>
                    </div>

                    {/* Learn More Stretched Link (whole card clickable via ::after) */}
                    <div className="service-card-action">
                      <a
                        href="#contact"
                        className="service-learn-more-link"
                        onClick={(e) => handleServiceClick(service, e)}
                        aria-label={`Learn more about ${service.title} and request a callback`}
                      >
                        <span>Learn more</span>
                        <svg
                          className="learn-more-arrow"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
