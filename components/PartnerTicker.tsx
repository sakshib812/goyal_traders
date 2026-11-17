'use client';

import React, { useEffect, useRef, useState } from 'react';

// Row 1 chips
const row1Chips = [
  'Retail Shops',
  'Kirana & General Stores',
  'Mobile Recharge Shops',
  'Telecom Retailers',
  'Cyber Cafes',
  'Common Service Centres',
  'Stationery & Photocopy Shops',
  'Medical & Pharmacy Stores',
  'Mobile Accessory Stores',
  'Insurance Advisors',
  'Local Distributors',
  'Master Distributors',
  'Whitelabel Partners',
  'Small Business Owners',
  'Local Entrepreneurs',
];

// Row 2 chips with tiny Lucide icons
const row2Chips = [
  {
    text: 'Mobile Recharge',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  {
    text: 'DTH Recharge',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
        <polyline points="17 2 12 7 7 2" />
      </svg>
    ),
  },
  {
    text: 'Electricity Bills',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    text: 'Broadband Bills',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <line x1="12" y1="20" x2="12.01" y2="20" />
      </svg>
    ),
  },
  {
    text: 'Postpaid Bills',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
        <path d="M12 17.5v.5" />
        <path d="M12 6v.5" />
      </svg>
    ),
  },
  {
    text: 'FASTag Recharge',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
  },
  {
    text: 'Gas Bills',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
  },
  {
    text: 'Water Bills',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
        <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 0 1-11.95 4.95" />
      </svg>
    ),
  },
  {
    text: 'Municipal Payments',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01" />
        <path d="M16 6h.01" />
        <path d="M12 6h.01" />
        <path d="M12 10h.01" />
        <path d="M12 14h.01" />
        <path d="M16 10h.01" />
        <path d="M16 14h.01" />
        <path d="M8 10h.01" />
        <path d="M8 14h.01" />
      </svg>
    ),
  },
  {
    text: 'School Fee Payments',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    text: 'Insurance Premiums',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    text: 'Policy Renewals',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M3 21v-5h5" />
      </svg>
    ),
  },
  {
    text: 'Wallet Top-up',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
      </svg>
    ),
  },
  {
    text: 'Partner Support',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
        <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
      </svg>
    ),
  },
];

export default function PartnerTicker() {
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(currentSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="partner-ticker"
      ref={sectionRef}
      className={`partner-ticker-section ${isJsReady ? 'js-ready' : ''} ${
        isInView ? 'is-in-view' : ''
      }`}
      aria-label="Partners and Services Marquee"
    >
      {/* Ambient glowing gradient shapes for rich background depth */}
      <div className="ticker-ambient-bg" aria-hidden="true">
        <div className="ticker-ambient-orb orb-1" />
        <div className="ticker-ambient-orb orb-2" />
        <div className="ticker-ambient-mesh" />
      </div>

      <div className="ticker-row-container relative-z">
        {/* Row 1: Who can partner with us (Scrolls right-to-left) */}
        <div className="ticker-group" aria-label="Who can partner with us">
          <div className="ticker-label-wrap">
            <span className="ticker-accent-line line-left" aria-hidden="true" />
            <div className="ticker-label-badge">
              <span className="ticker-badge-dot" aria-hidden="true">
                <span className="ticker-dot-ping" />
              </span>
              <h3 className="ticker-label-text">WHO CAN PARTNER WITH US</h3>
            </div>
            <span className="ticker-accent-line line-right" aria-hidden="true" />
          </div>
          <div className="ticker-row">
            <div className="ticker-track">
              {/* Primary copy */}
              <div className="ticker-list">
                {row1Chips.map((chip, idx) => (
                  <span key={idx} className="ticker-chip">
                    <span className="ticker-chip-dot" aria-hidden="true" />
                    <span className="ticker-chip-text">{chip}</span>
                  </span>
                ))}
              </div>
              {/* Seamless loop duplicate */}
              <div className="ticker-list" aria-hidden="true">
                {row1Chips.map((chip, idx) => (
                  <span key={`dup-${idx}`} className="ticker-chip">
                    <span className="ticker-chip-dot" aria-hidden="true" />
                    <span className="ticker-chip-text">{chip}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Services you can offer your customers (Scrolls left-to-right) */}
        <div className="ticker-group" aria-label="Services you can offer your customers">
          <div className="ticker-label-wrap">
            <span className="ticker-accent-line line-left" aria-hidden="true" />
            <div className="ticker-label-badge">
              <span className="ticker-badge-dot dot-alt" aria-hidden="true">
                <span className="ticker-dot-ping" />
              </span>
              <h3 className="ticker-label-text">SERVICES YOU CAN OFFER YOUR CUSTOMERS</h3>
            </div>
            <span className="ticker-accent-line line-right" aria-hidden="true" />
          </div>
          <div className="ticker-row">
            <div className="ticker-track track-reverse">
              {/* Primary copy */}
              <div className="ticker-list">
                {row2Chips.map((chip, idx) => (
                  <span key={idx} className="ticker-chip">
                    <span className="ticker-chip-icon-box" aria-hidden="true">
                      <span className="ticker-chip-icon">{chip.icon}</span>
                    </span>
                    <span className="ticker-chip-text">{chip.text}</span>
                  </span>
                ))}
              </div>
              {/* Seamless loop duplicate */}
              <div className="ticker-list" aria-hidden="true">
                {row2Chips.map((chip, idx) => (
                  <span key={`dup-${idx}`} className="ticker-chip">
                    <span className="ticker-chip-icon-box" aria-hidden="true">
                      <span className="ticker-chip-icon">{chip.icon}</span>
                    </span>
                    <span className="ticker-chip-text">{chip.text}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
