'use client';

import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    step: '1',
    title: 'Share what you plan to launch',
    detail: 'Outline your target users, customer touchpoints and the everyday services you want to integrate.',
  },
  {
    step: '2',
    title: 'Connect the matching APIs',
    detail: 'Receive sandbox credentials, test endpoints and configure preferred operator routes with our developers.',
  },
  {
    step: '3',
    title: 'Go live with direct assistance',
    detail: 'Launch smoothly to your audience with our technical team monitoring transactions beside you.',
  },
];

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lineWidth, setLineWidth] = useState('0%');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLineWidth('100%');
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-we-work"
      ref={sectionRef}
      className="work-strip-section"
      aria-labelledby="how-we-work-heading"
    >
      <div id="about" style={{ position: 'relative', top: '-80px', visibility: 'hidden' }} />
      <div className="container">
        <div className="section-header reveal-on-scroll">
          <h2 id="how-we-work-heading">How we work</h2>
          <p className="lead">
            A straightforward three-step integration path from your first question to live production.
          </p>
        </div>

        <div className="steps-wrapper">
          <div className="steps-timeline-line" aria-hidden="true">
            <div
              className="steps-timeline-progress"
              style={{ width: lineWidth }}
            />
          </div>

          <div className="steps-grid">
            {steps.map((item, idx) => (
              <div
                key={item.step}
                className="step-item reveal-on-scroll"
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                <div className="step-badge" aria-label={`Step ${item.step}`}>
                  {item.step}
                </div>
                <h3 className="step-text">{item.title}</h3>
                <p className="card-desc" style={{ marginTop: '8px' }}>
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
