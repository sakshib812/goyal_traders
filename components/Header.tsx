'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isSubPage = pathname !== '/' && pathname !== '';
  const isContactPage = pathname === '/contact' || pathname === '/contact/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (isSubPage) return;

      const heroEl = document.getElementById('hero');
      const servicesEl = document.getElementById('services');
      const howWeWorkEl = document.getElementById('how-we-work');

      const scrollPos = window.scrollY + 140;

      if (howWeWorkEl && scrollPos >= howWeWorkEl.offsetTop) {
        setActiveSection('how-we-work');
      } else if (servicesEl && scrollPos >= servicesEl.offsetTop) {
        setActiveSection('services');
      } else {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSubPage]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    if (!isSubPage) {
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        window.history.pushState(null, '', `#${targetId}`);
        if (targetId === 'hero-contact-card') {
          const input = el.querySelector('input') as HTMLInputElement | null;
          input?.focus();
        } else {
          setActiveSection(targetId);
        }
      }
    }
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <Link
          href={isSubPage ? '/#hero' : '#hero'}
          className="brand-logo"
          aria-label="GOYAL TRADERS - Home"
          onClick={(e) => handleNavClick(e, 'hero')}
        >
          <img
            src="/images/goyal-traders-logo.png"
            alt="GOYAL TRADERS Logo"
            className="brand-logo-img"
            width={40}
            height={40}
          />
          <div className="brand-text-wrap">
            <span className="brand-name">GOYAL TRADERS</span>
            <span className="brand-tagline">B2B digital payments for retailers &amp; distributors</span>
          </div>
        </Link>

        <nav aria-label="Main Navigation">
          <ul className="nav-menu">
            <li>
              <Link
                href={isSubPage ? '/#hero' : '#hero'}
                className={`nav-link ${!isSubPage && activeSection === 'hero' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'hero')}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={isSubPage ? '/#services' : '#services'}
                className={`nav-link ${!isSubPage && activeSection === 'services' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'services')}
              >
                Services
              </Link>
            </li>
            <li className="nav-item-dropdown">
              <Link
                href={isSubPage ? '/#roles' : '#roles'}
                className={`nav-link nav-dropdown-trigger ${!isSubPage && activeSection === 'roles' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'roles')}
              >
                Roles
                <span className="nav-dropdown-arrow" aria-hidden="true">&#9662;</span>
              </Link>
              <ul className="nav-dropdown-menu" role="menu">
                <li role="none">
                  <Link href={isSubPage ? '/#roles' : '#roles'} role="menuitem" className="nav-dropdown-item" onClick={(e) => handleNavClick(e, 'roles')}>
                    <span className="nav-dropdown-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>
                    </span>
                    <div className="nav-dropdown-text">
                      <span className="nav-dropdown-title">Whitelabel</span>
                      <span className="nav-dropdown-subtitle">Top-level partner</span>
                    </div>
                  </Link>
                </li>
                <li role="none">
                  <Link href={isSubPage ? '/#roles' : '#roles'} role="menuitem" className="nav-dropdown-item" onClick={(e) => handleNavClick(e, 'roles')}>
                    <span className="nav-dropdown-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="6" height="6" x="9" y="2" rx="1"/><rect width="6" height="6" x="2" y="16" rx="1"/><rect width="6" height="6" x="16" y="16" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>
                    </span>
                    <div className="nav-dropdown-text">
                      <span className="nav-dropdown-title">Master Distributor</span>
                      <span className="nav-dropdown-subtitle">Network builder</span>
                    </div>
                  </Link>
                </li>
                <li role="none">
                  <Link href={isSubPage ? '/#roles' : '#roles'} role="menuitem" className="nav-dropdown-item" onClick={(e) => handleNavClick(e, 'roles')}>
                    <span className="nav-dropdown-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </span>
                    <div className="nav-dropdown-text">
                      <span className="nav-dropdown-title">Distributor</span>
                      <span className="nav-dropdown-subtitle">Area partner</span>
                    </div>
                  </Link>
                </li>
                <li role="none">
                  <Link href={isSubPage ? '/#roles' : '#roles'} role="menuitem" className="nav-dropdown-item" onClick={(e) => handleNavClick(e, 'roles')}>
                    <span className="nav-dropdown-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/></svg>
                    </span>
                    <div className="nav-dropdown-text">
                      <span className="nav-dropdown-title">Retailer / Agent</span>
                      <span className="nav-dropdown-subtitle">Counter partner</span>
                    </div>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                href={isSubPage ? '/#how-we-work' : '#how-we-work'}
                className={`nav-link ${!isSubPage && activeSection === 'how-we-work' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'how-we-work')}
              >
                How We Work
              </Link>
            </li>
            <li>
              <Link
                href={isSubPage ? '/#faq' : '#faq'}
                className={`nav-link ${!isSubPage && activeSection === 'faq' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'faq')}
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href={isSubPage ? '/#hero' : '#hero'}
                className="nav-link"
                onClick={(e) => handleNavClick(e, 'hero')}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href={isSubPage ? '/#hero' : '#hero'}
                className="btn btn-primary"
                style={{ padding: '8px 18px', fontSize: '0.9rem' }}
                onClick={(e) => handleNavClick(e, 'hero')}
              >
                Talk to us
                <span className="btn-arrow-icon" aria-hidden="true">&rarr;</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
