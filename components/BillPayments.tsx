'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export const BILL_TILES = [
  { id: 'electricity', label: 'Electricity', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, delay: 200 },
  { id: 'water', label: 'Water', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 0 1-11.95 4.95"/></svg>, delay: 255 },
  { id: 'gas', label: 'Gas', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>, delay: 310 },
  { id: 'lpg-gas', label: 'LPG Gas', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v14c0 1.66 3.13 3 7 3s7-1.34 7-3V5"/><path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3"/></svg>, delay: 365 },
  { id: 'mobile-prepaid', label: 'Mobile Prepaid', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>, delay: 255 },
  { id: 'mobile-postpaid', label: 'Mobile Postpaid', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="12" height="18" x="2" y="3" rx="2"/><path d="M18 9a4 4 0 0 1 0 6"/><path d="M21 6a8 8 0 0 1 0 12"/></svg>, delay: 310 },
  { id: 'dth', label: 'DTH', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="15" x="2" y="7" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>, delay: 365 },
  { id: 'cable-tv', label: 'Cable TV', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, delay: 420 },
  { id: 'broadband', label: 'Broadband', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.86a10 10 0 0 1 14 0"/><path d="M8.5 16.43a5 5 0 0 1 7 0"/></svg>, delay: 310 },
  { id: 'landline-postpaid', label: 'Landline Postpaid', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, delay: 365 },
  { id: 'fastag', label: 'FASTag', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>, delay: 420 },
  { id: 'municipal-taxes', label: 'Municipal Taxes', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>, delay: 475 },
  { id: 'municipal-services', label: 'Municipal Services', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>, delay: 365 },
  { id: 'education-fees', label: 'Education Fees', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>, delay: 420 },
  { id: 'school-fees', label: 'School Fees', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m4 6 8-4 8 4"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/><path d="M18 5v17"/><path d="M6 5v17"/><circle cx="12" cy="9" r="2"/></svg>, delay: 475 },
  { id: 'life-insurance', label: 'Life Insurance', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/></svg>, delay: 530 },
  { id: 'health-insurance', label: 'Health Insurance', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>, delay: 420 },
  { id: 'general-insurance', label: 'General Insurance', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>, delay: 475 },
  { id: 'insurance-renewals', label: 'Insurance Renewals', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>, delay: 530 },
  { id: 'wallet-topup', label: 'Wallet Top-up', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>, delay: 585 }
];

export default function BillPayments() {
  const sectionRef = useRef<HTMLElement>(null);
  const [litTileIndex, setLitTileIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    section.classList.add('bill-anim-ready');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section.classList.add('is-in-view');
        }
      });
    }, { threshold: 0.2 });

    observer.observe(section);

    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      section.classList.add('is-in-view');
    }

    // Idle random tile light-up
    let last = -1;
    const interval = setInterval(() => {
      if (isHovered || document.hidden || !section.classList.contains('is-in-view')) {
        return;
      }
      let next;
      do {
        next = Math.floor(Math.random() * BILL_TILES.length);
      } while (next === last && BILL_TILES.length > 1);

      last = next;
      setLitTileIndex(next);
      setTimeout(() => {
        setLitTileIndex(null);
      }, 1200);
    }, 2200);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [isHovered]);

  return (
    <section id="bill-payments" ref={sectionRef} className="bill-payments-section" aria-labelledby="bill-heading">
      <div className="container relative-z">
        <div className="bill-payments-grid">
          {/* Left Column */}
          <div className="bill-content-col">
            <span className="bill-tag-pill">
              <span className="bill-tag-dot" aria-hidden="true" />
              <span>BILL PAYMENTS</span>
            </span>

            <div className="bill-heading-mask">
              <h2 id="bill-heading" className="bill-heading">
                Collect every bill from a single counter
              </h2>
            </div>

            <div className="bill-underline-bar" aria-hidden="true" />

            <p className="bill-paragraph">
              Let customers pay their everyday bills at your shop. Fetch the bill, take the payment and hand over a receipt in moments, while you earn a commission on every completed transaction.
            </p>

            <ul className="bill-bullets-list">
              <li className="bill-bullet-item">
                <span className="bill-bullet-check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path className="bill-tick-path" d="m5 12 5 5L20 7" />
                  </svg>
                </span>
                <span>Fetch the bill details before you collect payment</span>
              </li>
              <li className="bill-bullet-item">
                <span className="bill-bullet-check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path className="bill-tick-path" d="m5 12 5 5L20 7" />
                  </svg>
                </span>
                <span>Instant status and a printable receipt</span>
              </li>
              <li className="bill-bullet-item">
                <span className="bill-bullet-check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path className="bill-tick-path" d="m5 12 5 5L20 7" />
                  </svg>
                </span>
                <span>Paid from your Goyal Traders wallet</span>
              </li>
            </ul>

            <Link href="/#hero" className="bill-cta-btn">
              <span>Start Collecting Payments</span>
              <span className="btn-arrow-icon" aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* Right Column Grid */}
          <div className="bill-tiles-grid-wrap">
            <ul
              className="bill-tiles-grid"
              role="list"
              aria-label="Supported bill payment categories"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {BILL_TILES.map((tile, idx) => (
                <li
                  key={tile.id}
                  className={`bill-tile ${litTileIndex === idx ? 'tile-lit' : ''}`}
                  style={{ ['--tile-delay' as any]: `${tile.delay}ms` }}
                  tabIndex={-1}
                >
                  <span className="bill-icon-box">{tile.icon}</span>
                  <span className="bill-tile-label">{tile.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
