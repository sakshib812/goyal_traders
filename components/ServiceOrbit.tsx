'use client';

import React, { useEffect, useRef } from 'react';

export const INNER_RING_KEYWORDS = [
  {
    name: 'Mobile Recharge',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
    ),
    angle: '35deg',
    delay: '150ms',
    bobClass: 'bob-1',
  },
  {
    name: 'Bill Payments',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v.5"/><path d="M12 6v.5"/></svg>
    ),
    angle: '125deg',
    delay: '240ms',
    bobClass: 'bob-2',
  },
  {
    name: 'Insurance',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
    ),
    angle: '215deg',
    delay: '330ms',
    bobClass: 'bob-3',
  },
  {
    name: 'Wallet',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
    ),
    angle: '305deg',
    delay: '420ms',
    bobClass: 'bob-4',
  },
];

export const OUTER_RING_KEYWORDS = [
  {
    name: 'DTH',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="15" x="2" y="7" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>
    ),
    angle: '0deg',
    delay: '120ms',
    bobClass: 'bob-1',
    hideMobile: false,
  },
  {
    name: 'Electricity',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
    ),
    angle: '60deg',
    delay: '210ms',
    bobClass: 'bob-2',
    hideMobile: false,
  },
  {
    name: 'FASTag',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
    ),
    angle: '120deg',
    delay: '300ms',
    bobClass: 'bob-3',
    hideMobile: false,
  },
  {
    name: 'Gas & Water',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 0 1-11.95 4.95"/></svg>
    ),
    angle: '180deg',
    delay: '390ms',
    bobClass: 'bob-4',
    hideMobile: false,
  },
  {
    name: 'School Fees',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
    ),
    angle: '240deg',
    delay: '480ms',
    bobClass: 'bob-5',
    hideMobile: true,
  },
  {
    name: 'Broadband',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
    ),
    angle: '300deg',
    delay: '570ms',
    bobClass: 'bob-6',
    hideMobile: true,
  },
];

export default function ServiceOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // IntersectionObserver for entrance and off-screen pause
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              container.classList.add('is-in-view');
              container.classList.remove('orbit-is-paused');
            } else {
              container.classList.add('orbit-is-paused');
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(container);

      const handleVisibility = () => {
        if (document.visibilityState === 'hidden') {
          container.classList.add('orbit-is-paused');
        } else {
          container.classList.remove('orbit-is-paused');
        }
      };
      document.addEventListener('visibilitychange', handleVisibility);

      return () => {
        observer.disconnect();
        document.removeEventListener('visibilitychange', handleVisibility);
      };
    } else {
      container.classList.add('is-in-view');
    }

    // Desktop Mouse Parallax
    if (prefersReducedMotion || typeof window === 'undefined') return;
    const isHoverCapable = window.matchMedia('(hover: hover)').matches;
    if (!isHoverCapable || window.innerWidth < 1024) return;

    let mouseX = 0, mouseY = 0;
    let currentHubX = 0, currentHubY = 0;
    let currentInnerX = 0, currentInnerY = 0;
    let currentOuterX = 0, currentOuterY = 0;
    let currentSparkleX = 0, currentSparkleY = 0;
    let isTicking = false;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const cX = rect.left + rect.width / 2;
      const cY = rect.top + rect.height / 2;
      mouseX = Math.max(-1, Math.min(1, (e.clientX - cX) / (rect.width / 2)));
      mouseY = Math.max(-1, Math.min(1, (e.clientY - cY) / (rect.height / 2)));

      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(updateParallax);
      }
    };

    const onMouseLeave = () => {
      mouseX = 0;
      mouseY = 0;
    };

    const updateParallax = () => {
      const lerp = 0.08;

      const targetHubX = mouseX * 4;
      const targetHubY = mouseY * 4;
      currentHubX += (targetHubX - currentHubX) * lerp;
      currentHubY += (targetHubY - currentHubY) * lerp;
      if (hubRef.current) {
        hubRef.current.style.transform = `translate(${currentHubX.toFixed(2)}px, ${currentHubY.toFixed(2)}px)`;
      }

      const targetInnerX = mouseX * 8;
      const targetInnerY = mouseY * 8;
      currentInnerX += (targetInnerX - currentInnerX) * lerp;
      currentInnerY += (targetInnerY - currentInnerY) * lerp;
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${currentInnerX.toFixed(2)}px, ${currentInnerY.toFixed(2)}px)`;
      }

      const targetOuterX = mouseX * 14;
      const targetOuterY = mouseY * 14;
      currentOuterX += (targetOuterX - currentOuterX) * lerp;
      currentOuterY += (targetOuterY - currentOuterY) * lerp;
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${currentOuterX.toFixed(2)}px, ${currentOuterY.toFixed(2)}px)`;
      }

      const targetSparkleX = mouseX * 20;
      const targetSparkleY = mouseY * 20;
      currentSparkleX += (targetSparkleX - currentSparkleX) * lerp;
      currentSparkleY += (targetSparkleY - currentSparkleY) * lerp;
      if (sparklesRef.current) {
        sparklesRef.current.style.transform = `translate(${currentSparkleX.toFixed(2)}px, ${currentSparkleY.toFixed(2)}px)`;
      }

      const delta = Math.abs(targetHubX - currentHubX) + Math.abs(targetHubY - currentHubY);
      if (delta > 0.01) {
        requestAnimationFrame(updateParallax);
      } else {
        isTicking = false;
      }
    };

    container.addEventListener('mousemove', onMouseMove, { passive: true });
    container.addEventListener('mouseleave', onMouseLeave, { passive: true });

    return () => {
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div className="why-illustration-wrap reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
      <p className="sr-only">
        Mobile recharge, bill payments, insurance, wallet, DTH, electricity, FASTag, gas and water, school fees and broadband services on one platform.
      </p>

      <div id="service-orbit" ref={containerRef} className="service-orbit-container" aria-hidden="true">
        {/* Soft Background Radial Aura */}
        <div className="orbit-bg-gradient" />

        {/* SVG Dotted Grid & Concentric Rings */}
        <svg className="orbit-canvas-bg" viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="orbit-dot-grid-jsx" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#EA580C" opacity="0.06" />
            </pattern>
            <radialGradient id="orbit-pale-circle-jsx" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFEBEA" stopOpacity="0.65" />
              <stop offset="65%" stopColor="#FFF4ED" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FFF4ED" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="240" cy="240" r="215" fill="url(#orbit-pale-circle-jsx)" />
          <circle cx="240" cy="240" r="215" fill="url(#orbit-dot-grid-jsx)" />
          <circle cx="240" cy="240" r="100" stroke="#EA580C" strokeOpacity="0.25" strokeDasharray="4 6" strokeWidth="1" />
          <circle cx="240" cy="240" r="156" stroke="#EA580C" strokeOpacity="0.15" strokeDasharray="4 8" strokeWidth="1" />
        </svg>

        {/* Parallax Layer: Sparkle Dots & Plus Signs */}
        <div ref={sparklesRef} className="orbit-layer orbit-layer-sparkles">
          <span className="orbit-sparkle" style={{ left: '12%', top: '22%', width: 5, height: 5, animationDelay: '0s' }} />
          <span className="orbit-sparkle" style={{ left: '82%', top: '18%', width: 4, height: 4, animationDelay: '1.2s' }} />
          <span className="orbit-sparkle" style={{ left: '88%', top: '72%', width: 6, height: 6, animationDelay: '2.5s' }} />
          <span className="orbit-sparkle" style={{ left: '18%', top: '82%', width: 4, height: 4, animationDelay: '1.8s' }} />
          <span className="orbit-sparkle" style={{ left: '48%', top: '8%', width: 5, height: 5, animationDelay: '3.1s' }} />
          <span className="orbit-sparkle" style={{ left: '54%', top: '92%', width: 4, height: 4, animationDelay: '0.8s' }} />
          <span className="orbit-sparkle" style={{ left: '28%', top: '40%', width: 3, height: 3, animationDelay: '2.0s' }} />
          <span className="orbit-sparkle" style={{ left: '74%', top: '45%', width: 4, height: 4, animationDelay: '3.5s' }} />
          <span className="orbit-plus" style={{ left: '16%', top: '62%' }}>+</span>
          <span className="orbit-plus" style={{ left: '80%', top: '32%' }}>+</span>
        </div>

        {/* Parallax Layer: Outer Ring (Counter-Clockwise 110s) */}
        <div ref={outerRef} className="orbit-layer orbit-layer-outer">
          <div className="orbit-ring-container orbit-ring-outer">
            {OUTER_RING_KEYWORDS.map((item, idx) => (
              <div
                key={idx}
                className={`orbit-chip-anchor ${item.hideMobile ? 'chip-hide-mobile' : ''}`}
                style={{
                  ['--a' as any]: item.angle,
                  ['--neg-a' as any]: `-${item.angle}`,
                  ['--r' as any]: 'var(--orbit-r-outer)',
                  ['--delay' as any]: item.delay,
                }}
              >
                <div className="orbit-chip-counter outer-counter">
                  <div className={`orbit-chip-bob ${item.bobClass}`}>
                    <div className="orbit-chip-pill chip-outer">
                      <span className="orbit-chip-icon-box">{item.icon}</span>
                      <span className="orbit-chip-text">{item.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Parallax Layer: Inner Ring (Clockwise 70s) & Connector Lines */}
        <div ref={innerRef} className="orbit-layer orbit-layer-inner">
          <div className="orbit-ring-container orbit-ring-inner">
            <svg className="orbit-connector-lines" viewBox="0 0 480 480">
              <line className="orbit-static-line" x1="282.6" y1="269.8" x2="321.9" y2="297.4" />
              <line className="orbit-stream-line stream-1" x1="282.6" y1="269.8" x2="321.9" y2="297.4" />
              <line className="orbit-static-line" x1="210.2" y1="282.6" x2="182.6" y2="321.9" />
              <line className="orbit-stream-line stream-2" x1="210.2" y1="282.6" x2="182.6" y2="321.9" />
              <line className="orbit-static-line" x1="197.4" y1="210.2" x2="158.1" y2="182.6" />
              <line className="orbit-stream-line stream-3" x1="197.4" y1="210.2" x2="158.1" y2="182.6" />
              <line className="orbit-static-line" x1="269.8" y1="197.4" x2="297.4" y2="158.1" />
              <line className="orbit-stream-line stream-4" x1="269.8" y1="197.4" x2="297.4" y2="158.1" />
            </svg>

            {INNER_RING_KEYWORDS.map((item, idx) => (
              <div
                key={idx}
                className="orbit-chip-anchor"
                style={{
                  ['--a' as any]: item.angle,
                  ['--neg-a' as any]: `-${item.angle}`,
                  ['--r' as any]: 'var(--orbit-r-inner)',
                  ['--delay' as any]: item.delay,
                }}
              >
                <div className="orbit-chip-counter inner-counter">
                  <div className={`orbit-chip-bob ${item.bobClass}`}>
                    <div className="orbit-chip-pill chip-inner">
                      <span className="orbit-chip-icon-box">{item.icon}</span>
                      <span className="orbit-chip-text">{item.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Parallax Layer: Central Hub */}
        <div ref={hubRef} className="orbit-layer orbit-layer-hub">
          <div className="orbit-hub-disc">
            <span className="orbit-ripple" />
            <span className="orbit-ripple orbit-ripple-2" />
            <div className="orbit-hub-badge">
              <img src="/images/goyal-traders-logo.png" alt="Goyal Traders" className="orbit-hub-logo" width={68} height={68} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

