'use client';

import { useEffect, useRef, useState } from 'react';
import { statsData, StatItem } from '@/data/stats';

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<{ [id: string]: number }>({
    partners: 0,
    transactions: 0,
    services: 0,
    states: 0,
  });

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const immediate: { [id: string]: number } = {};
      statsData.forEach((item) => {
        immediate[item.id] = item.value;
      });
      setCounts(immediate);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1200; // 1.2s ease-out
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const nextCounts: { [id: string]: number } = {};
            statsData.forEach((item) => {
              nextCounts[item.id] = Math.floor(easeOut * item.value);
            });
            setCounts(nextCounts);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              // Ensure exact final values
              const finalCounts: { [id: string]: number } = {};
              statsData.forEach((item) => {
                finalCounts[item.id] = item.value;
              });
              setCounts(finalCounts);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const renderIcon = (iconName: StatItem['iconName']) => {
    switch (iconName) {
      case 'partner':
        return (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case 'transaction':
        return (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        );
      case 'service':
        return (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
          </svg>
        );
      case 'state':
        return (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
        );
    }
  };

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="stats-band-section"
      aria-label="Platform scale and statistics"
    >
      <div className="container">
        <div className="stats-grid">
          {statsData.map((stat, idx) => (
            <div
              key={stat.id}
              className={`stat-card ${hasAnimated ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <div className="stat-icon-tile">
                {renderIcon(stat.iconName)}
              </div>
              <div className="stat-number-wrap">
                <span className="stat-number">
                  {counts[stat.id] ?? 0}
                  <span className="stat-suffix">{stat.suffix}</span>
                </span>
              </div>
              <h3 className="stat-label">{stat.label}</h3>
              <p className="stat-desc">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

