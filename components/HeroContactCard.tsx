'use client';

import React, { useState, useRef, useEffect } from 'react';

export const INTERESTED_OPTIONS = [
  'Become a Retailer / Agent',
  'Become a Distributor',
  'Become a Master Distributor',
  'Whitelabel partnership',
  'Insurance services',
  'Recharge & bill payment services',
  'Other inquiries',
];

interface FormData {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  businessName: string;
  city: string;
  pin: string;
  interestedIn: string;
  consent: boolean;
  honeypot: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  mobile?: string;
  email?: string;
  pin?: string;
  interestedIn?: string;
  consent?: string;
}

export default function HeroContactCard() {
  const initTimestamp = useRef<number>(Date.now());
  const cardRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    businessName: '',
    city: '',
    pin: '',
    interestedIn: INTERESTED_OPTIONS[0],
    consent: false,
    honeypot: '',
  });

  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [leadId, setLeadId] = useState('');
  const [lastThreeDigits, setLastThreeDigits] = useState('***');

  // Load draft from sessionStorage on mount (non-sensitive only)
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('gt_partner_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({
          ...prev,
          firstName: parsed.firstName || prev.firstName,
          lastName: parsed.lastName || prev.lastName,
          businessName: parsed.businessName || prev.businessName,
          city: parsed.city || prev.city,
          pin: parsed.pin || prev.pin,
          interestedIn: parsed.interestedIn || prev.interestedIn,
        }));
      }
    } catch {}

    // Check URL query parameters ?service= or ?role=
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const queryRole = urlParams.get('role') || urlParams.get('service');
      if (queryRole) {
        const lower = queryRole.toLowerCase();
        const matched = INTERESTED_OPTIONS.find((opt) => opt.toLowerCase().includes(lower));
        if (matched) {
          setFormData((prev) => ({ ...prev, interestedIn: matched }));
        }
      }
    }

    // Listen for custom selectServiceInterest events
    const handleSelectInterest = (e: Event) => {
      const customEvent = e as CustomEvent<{ interest: string }>;
      const raw = customEvent.detail?.interest;
      if (raw) {
        const lower = raw.toLowerCase();
        const matched = INTERESTED_OPTIONS.find((opt) => opt.toLowerCase().includes(lower)) || INTERESTED_OPTIONS[0];
        setFormData((prev) => ({ ...prev, interestedIn: matched }));
      }
    };

    window.addEventListener('selectServiceInterest', handleSelectInterest);
    return () => window.removeEventListener('selectServiceInterest', handleSelectInterest);
  }, []);

  // Save non-sensitive draft on change
  const saveDraft = (updated: FormData) => {
    try {
      const draft = {
        firstName: updated.firstName,
        lastName: updated.lastName,
        businessName: updated.businessName,
        city: updated.city,
        pin: updated.pin,
        interestedIn: updated.interestedIn,
      };
      sessionStorage.setItem('gt_partner_draft', JSON.stringify(draft));
    } catch {}
  };

  // Validation function
  const validateField = (name: keyof FormData, val: any): string | undefined => {
    if (name === 'firstName') {
      if (!val || !val.trim()) return 'First name is required.';
      if (val.trim().length < 2) return 'Must be at least 2 characters.';
      if (!/^[a-zA-Z\s.'-]+$/.test(val.trim())) return 'Letters, spaces, dots and hyphens only.';
    }
    if (name === 'lastName') {
      if (!val || !val.trim()) return 'Last name is required.';
      if (val.trim().length < 2) return 'Must be at least 2 characters.';
      if (!/^[a-zA-Z\s.'-]+$/.test(val.trim())) return 'Letters, spaces, dots and hyphens only.';
    }
    if (name === 'mobile') {
      const clean = String(val || '').replace(/\D/g, '');
      if (!clean) return 'Mobile number is required.';
      if (!/^[6-9]\d{9}$/.test(clean)) return 'Must be 10 digits starting with 6, 7, 8 or 9.';
    }
    if (name === 'email' && val && val.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) return 'Please enter a valid email address.';
    }
    if (name === 'pin' && val && val.trim()) {
      if (!/^[1-9]\d{5}$/.test(val.trim())) return 'PIN code must be 6 digits (cannot start with 0).';
    }
    if (name === 'interestedIn' && !val) {
      return 'Please select an option.';
    }
    if (name === 'consent' && !val) {
      return 'Please agree to be contacted to proceed.';
    }
    return undefined;
  };

  const isFieldValid = (name: keyof FormData): boolean => {
    const val = formData[name];
    if (!val) return false;
    if (fieldErrors[name as keyof FormErrors]) return false;
    if (name === 'firstName' || name === 'lastName') return String(val).trim().length >= 2;
    if (name === 'mobile') return /^[6-9]\d{9}$/.test(String(val));
    if (name === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val));
    if (name === 'pin') return /^[1-9]\d{5}$/.test(String(val));
    return true;
  };

  // Step completions
  const isStep1Complete = isFieldValid('firstName') && isFieldValid('lastName') && isFieldValid('mobile');
  const isStep2Complete = isStep1Complete && (formData.businessName.length > 0 || formData.city.length > 0);
  const isStep3Complete = isStep1Complete && Boolean(formData.interestedIn) && formData.consent;

  const getProgressPercentage = () => {
    let pct = 10;
    if (isFieldValid('firstName') || isFieldValid('lastName')) pct += 15;
    if (isFieldValid('mobile')) pct += 25;
    if (formData.businessName || formData.city) pct += 20;
    if (formData.interestedIn && formData.consent) pct += 30;
    return Math.min(100, pct);
  };

  // 3D Tilt handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 1024 || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotX = ((y - rect.height / 2) / (rect.height / 2)) * -3;
    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 3;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
  };

  const handleNameBlur = (fieldName: 'firstName' | 'lastName') => {
    const raw = formData[fieldName];
    if (raw) {
      // Auto-capitalize and auto-trim
      const formatted = raw
        .trim()
        .replace(/\s+/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
      const updated = { ...formData, [fieldName]: formatted };
      setFormData(updated);
      saveDraft(updated);
      const err = validateField(fieldName, formatted);
      setFieldErrors((prev) => ({ ...prev, [fieldName]: err }));
    }
    setFocusedField(null);
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData((prev) => ({ ...prev, mobile: cleaned }));
    if (touchedFields.mobile) {
      const err = validateField('mobile', cleaned);
      setFieldErrors((prev) => ({ ...prev, mobile: err }));
    }
  };

  const handleMobilePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text') || '';
    let cleaned = text.replace(/[\s\-\(\)]/g, '');
    if (cleaned.startsWith('+91')) cleaned = cleaned.slice(3);
    else if (cleaned.startsWith('0')) cleaned = cleaned.slice(1);
    cleaned = cleaned.replace(/\D/g, '').slice(0, 10);
    setFormData((prev) => ({ ...prev, mobile: cleaned }));
    if (touchedFields.mobile) {
      const err = validateField('mobile', cleaned);
      setFieldErrors((prev) => ({ ...prev, mobile: err }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate all
    const errors: FormErrors = {};
    const keys: (keyof FormData)[] = ['firstName', 'lastName', 'mobile', 'email', 'pin', 'interestedIn', 'consent'];
    keys.forEach((k) => {
      const err = validateField(k, formData[k]);
      if (err) (errors as any)[k] = err;
    });

    setTouchedFields({
      firstName: true,
      lastName: true,
      mobile: true,
      email: true,
      businessName: true,
      city: true,
      pin: true,
      interestedIn: true,
      consent: true,
    });
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setErrorMsg('Please review the highlighted fields above.');
      return;
    }

    // Spam checks: honeypot + time threshold (>2s)
    if (formData.honeypot || Date.now() - initTimestamp.current < 2000) {
      setErrorMsg('Submission could not be verified. Please try again.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      mobile: '+91' + formData.mobile.trim(),
      email: formData.email.trim(),
      businessName: formData.businessName.trim(),
      city: formData.city.trim(),
      pin: formData.pin.trim(),
      interestedIn: formData.interestedIn,
      consent: formData.consent,
      sourcePage: typeof window !== 'undefined' ? window.location.pathname + window.location.hash : 'hero-contact-card',
      timestamp: new Date().toISOString(),
    };

    // Reusable submit lead integration with production TODO endpoint
    // TODO: Replace with production endpoint (e.g. POST https://api.goyaltraders.com/v1/leads or webhook)
    console.log('[Goyal Traders] Partner lead payload submitted:', payload);

    try {
      await new Promise((res) => setTimeout(res, 600));
      const generatedId = 'GT-' + Date.now();
      setLeadId(generatedId);
      setLastThreeDigits(formData.mobile.slice(-3));
      setIsSubmitting(false);
      setIsSuccess(true);
      try {
        sessionStorage.removeItem('gt_partner_draft');
      } catch {}
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMsg(err?.message || 'Network error submitting enquiry. Please check your connection and retry.');
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      businessName: '',
      city: '',
      pin: '',
      interestedIn: INTERESTED_OPTIONS[0],
      consent: false,
      honeypot: '',
    });
    setFieldErrors({});
    setTouchedFields({});
    setIsSuccess(false);
    setErrorMsg('');
    setTimeout(() => {
      firstNameRef.current?.focus();
    }, 50);
  };

  return (
    <div className="fade-in-on-load fade-in-on-load-delay-2">
      <div
        id="hero-contact-card"
        ref={cardRef}
        className="hero-card-outer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Anchor for #contact jump target */}
        <span id="contact" style={{ position: 'absolute', top: '-110px' }} aria-hidden="true" />

        {/* Ambient glowing halo */}
        <div className="hero-card-glow-halo" aria-hidden="true" />

        {/* Frosted Neumorphic Card Box */}
        <div className="hero-contact-card">
          {isSuccess ? (
            /* SUCCESS STATE */
            <div className="hero-card-success-panel" role="status" aria-live="polite">
              {/* Confetti Burst */}
              <div className="confetti-container" aria-hidden="true">
                <span className="confetti-particle c1" />
                <span className="confetti-particle c2" />
                <span className="confetti-particle c3" />
                <span className="confetti-particle c4" />
                <span className="confetti-particle c5" />
                <span className="confetti-particle c6" />
                <span className="confetti-particle c7" />
                <span className="confetti-particle c8" />
                <span className="confetti-particle c9" />
                <span className="confetti-particle c10" />
                <span className="confetti-particle c11" />
                <span className="confetti-particle c12" />
              </div>

              <div className="success-icon-wrap" aria-hidden="true">
                <span className="success-ripple-ring" />
                <svg className="success-check-svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h2 id="success-heading" className="success-title" tabIndex={-1}>
                Thank you, {formData.firstName}!
              </h2>

              <p className="success-body">
                Our team will call you back on <strong>+91 XXXXX XX{lastThreeDigits}</strong> within one business day.
              </p>

              <div className="success-lead-badge">
                <span>Reference ID: <strong>{leadId}</strong></span>
                {formData.interestedIn && <span>&bull; {formData.interestedIn}</span>}
              </div>

              <div className="success-actions">
                <button type="button" onClick={handleReset} className="btn btn-secondary success-secondary-btn">
                  Submit another enquiry &rarr;
                </button>
              </div>
            </div>
          ) : (
            /* FORM STATE */
            <div>
              <div className="hero-card-badge-row">
                <span className="hero-card-eyebrow-pill">
                  <span className="hero-card-pulse-dot" aria-hidden="true" />
                  GET STARTED FREE
                </span>
              </div>

              <h2 className="hero-card-title">Become a Goyal Traders Partner</h2>
              <p className="hero-card-subtitle">
                Share your details and our team will call you back to guide you through the next steps.
              </p>

              {/* 3-Step Progress Bar */}
              <div className="form-progress-wrap" aria-label="Form completion progress">
                <div className="form-progress-track">
                  <div className="form-progress-bar" style={{ width: `${getProgressPercentage()}%` }} />
                </div>
                <div className="form-progress-steps">
                  <span className={`progress-step ${isStep1Complete ? 'is-complete' : 'is-active'}`}>
                    <span className="step-num">1</span> Your details
                  </span>
                  <span className={`progress-step ${isStep2Complete ? 'is-complete' : isStep1Complete ? 'is-active' : ''}`}>
                    <span className="step-num">2</span> Your business
                  </span>
                  <span className={`progress-step ${isStep3Complete ? 'is-complete' : isStep2Complete ? 'is-active' : ''}`}>
                    <span className="step-num">3</span> Your interest
                  </span>
                </div>
              </div>

              {errorMsg && (
                <div className="hero-card-error-banner" role="alert">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{errorMsg}</span>
                </div>
              )}

              <form id="hero-contact-card-form" className="hero-card-form" onSubmit={handleSubmit} noValidate>
                {/* Honeypot */}
                <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
                  <input
                    type="text"
                    name="company_website"
                    value={formData.honeypot}
                    onChange={(e) => setFormData((p) => ({ ...p, honeypot: e.target.value }))}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="form-grid-2col">
                  {/* Row 1: First Name* */}
                  <div className={`form-floating-group ${focusedField === 'firstName' ? 'is-focused' : ''} ${formData.firstName ? 'has-value' : ''} ${isFieldValid('firstName') ? 'is-valid' : ''} ${fieldErrors.firstName ? 'has-error' : ''}`}>
                    <span className="field-leading-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </span>
                    <input
                      ref={firstNameRef}
                      type="text"
                      id="hero-firstname"
                      name="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))}
                      onFocus={() => setFocusedField('firstName')}
                      onBlur={() => handleNameBlur('firstName')}
                      className="form-floating-input"
                      autoComplete="given-name"
                      aria-required="true"
                      aria-invalid={Boolean(fieldErrors.firstName)}
                      aria-describedby="hero-firstname-error"
                      required
                    />
                    <label htmlFor="hero-firstname" className="form-floating-label">
                      First name <span className="required-star" aria-hidden="true">*</span>
                    </label>
                    {isFieldValid('firstName') && (
                      <span className="field-valid-check" aria-hidden="true">
                        <svg className="check-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    )}
                    {fieldErrors.firstName && (
                      <div id="hero-firstname-error" className="field-error-msg" role="alert">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        <span>{fieldErrors.firstName}</span>
                      </div>
                    )}
                  </div>

                  {/* Row 1: Last Name* */}
                  <div className={`form-floating-group ${focusedField === 'lastName' ? 'is-focused' : ''} ${formData.lastName ? 'has-value' : ''} ${isFieldValid('lastName') ? 'is-valid' : ''} ${fieldErrors.lastName ? 'has-error' : ''}`}>
                    <span className="field-leading-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </span>
                    <input
                      type="text"
                      id="hero-lastname"
                      name="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))}
                      onFocus={() => setFocusedField('lastName')}
                      onBlur={() => handleNameBlur('lastName')}
                      className="form-floating-input"
                      autoComplete="family-name"
                      aria-required="true"
                      aria-invalid={Boolean(fieldErrors.lastName)}
                      aria-describedby="hero-lastname-error"
                      required
                    />
                    <label htmlFor="hero-lastname" className="form-floating-label">
                      Last name <span className="required-star" aria-hidden="true">*</span>
                    </label>
                    {isFieldValid('lastName') && (
                      <span className="field-valid-check" aria-hidden="true">
                        <svg className="check-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    )}
                    {fieldErrors.lastName && (
                      <div id="hero-lastname-error" className="field-error-msg" role="alert">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        <span>{fieldErrors.lastName}</span>
                      </div>
                    )}
                  </div>

                  {/* Row 2: Mobile Number* (+91 prefix) */}
                  <div className={`form-floating-group ${focusedField === 'mobile' ? 'is-focused' : ''} ${formData.mobile ? 'has-value' : ''} ${isFieldValid('mobile') ? 'is-valid' : ''} ${fieldErrors.mobile ? 'has-error' : ''}`}>
                    <span className="field-leading-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </span>
                    <span className="field-phone-prefix" aria-hidden="true">+91</span>
                    <input
                      type="tel"
                      id="hero-mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleMobileChange}
                      onPaste={handleMobilePaste}
                      onFocus={() => setFocusedField('mobile')}
                      onBlur={() => {
                        setFocusedField(null);
                        setTouchedFields((p) => ({ ...p, mobile: true }));
                        const err = validateField('mobile', formData.mobile);
                        setFieldErrors((p) => ({ ...p, mobile: err }));
                      }}
                      className="form-floating-input phone-input"
                      inputMode="numeric"
                      maxLength={10}
                      autoComplete="tel-national"
                      aria-required="true"
                      aria-invalid={Boolean(fieldErrors.mobile)}
                      aria-describedby="hero-mobile-error"
                      required
                    />
                    <label htmlFor="hero-mobile" className="form-floating-label phone-label">
                      Mobile number <span className="required-star" aria-hidden="true">*</span>
                    </label>
                    {isFieldValid('mobile') && (
                      <span className="field-valid-check" aria-hidden="true">
                        <svg className="check-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    )}
                    {fieldErrors.mobile && (
                      <div id="hero-mobile-error" className="field-error-msg" role="alert">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        <span>{fieldErrors.mobile}</span>
                      </div>
                    )}
                  </div>

                  {/* Row 2: Email Address (optional) */}
                  <div className={`form-floating-group ${focusedField === 'email' ? 'is-focused' : ''} ${formData.email ? 'has-value' : ''} ${isFieldValid('email') ? 'is-valid' : ''} ${fieldErrors.email ? 'has-error' : ''}`}>
                    <span className="field-leading-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </span>
                    <input
                      type="email"
                      id="hero-email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => {
                        setFocusedField(null);
                        setTouchedFields((p) => ({ ...p, email: true }));
                        const err = validateField('email', formData.email);
                        setFieldErrors((p) => ({ ...p, email: err }));
                      }}
                      className="form-floating-input"
                      autoComplete="email"
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby="hero-email-error"
                    />
                    <label htmlFor="hero-email" className="form-floating-label">Email address</label>
                    {isFieldValid('email') && (
                      <span className="field-valid-check" aria-hidden="true">
                        <svg className="check-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    )}
                    {fieldErrors.email && (
                      <div id="hero-email-error" className="field-error-msg" role="alert">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        <span>{fieldErrors.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Row 3: Shop / Business Name (optional) */}
                  <div className={`form-floating-group ${focusedField === 'businessName' ? 'is-focused' : ''} ${formData.businessName ? 'has-value' : ''}`}>
                    <span className="field-leading-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></svg>
                    </span>
                    <input
                      type="text"
                      id="hero-businessname"
                      name="businessName"
                      value={formData.businessName}
                      onChange={(e) => {
                        const updated = { ...formData, businessName: e.target.value };
                        setFormData(updated);
                        saveDraft(updated);
                      }}
                      onFocus={() => setFocusedField('businessName')}
                      onBlur={() => setFocusedField(null)}
                      className="form-floating-input"
                      maxLength={80}
                      autoComplete="organization"
                    />
                    <label htmlFor="hero-businessname" className="form-floating-label">Shop / Business name</label>
                  </div>

                  {/* Row 3: City (optional) */}
                  <div className={`form-floating-group ${focusedField === 'city' ? 'is-focused' : ''} ${formData.city ? 'has-value' : ''}`}>
                    <span className="field-leading-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
                    </span>
                    <input
                      type="text"
                      id="hero-city"
                      name="city"
                      value={formData.city}
                      onChange={(e) => {
                        const updated = { ...formData, city: e.target.value };
                        setFormData(updated);
                        saveDraft(updated);
                      }}
                      onFocus={() => setFocusedField('city')}
                      onBlur={() => setFocusedField(null)}
                      className="form-floating-input"
                      maxLength={40}
                      autoComplete="address-level2"
                    />
                    <label htmlFor="hero-city" className="form-floating-label">City</label>
                  </div>

                  {/* Row 4: PIN code (optional) */}
                  <div className={`form-floating-group ${focusedField === 'pin' ? 'is-focused' : ''} ${formData.pin ? 'has-value' : ''} ${isFieldValid('pin') ? 'is-valid' : ''} ${fieldErrors.pin ? 'has-error' : ''}`}>
                    <span className="field-leading-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>
                    </span>
                    <input
                      type="text"
                      id="hero-pin"
                      name="pin"
                      value={formData.pin}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                        const updated = { ...formData, pin: val };
                        setFormData(updated);
                        saveDraft(updated);
                      }}
                      onFocus={() => setFocusedField('pin')}
                      onBlur={() => {
                        setFocusedField(null);
                        setTouchedFields((p) => ({ ...p, pin: true }));
                        const err = validateField('pin', formData.pin);
                        setFieldErrors((p) => ({ ...p, pin: err }));
                      }}
                      className="form-floating-input"
                      maxLength={6}
                      inputMode="numeric"
                      autoComplete="postal-code"
                      aria-invalid={Boolean(fieldErrors.pin)}
                      aria-describedby="hero-pin-error"
                    />
                    <label htmlFor="hero-pin" className="form-floating-label">PIN code</label>
                    {isFieldValid('pin') && (
                      <span className="field-valid-check" aria-hidden="true">
                        <svg className="check-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    )}
                    {fieldErrors.pin && (
                      <div id="hero-pin-error" className="field-error-msg" role="alert">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        <span>{fieldErrors.pin}</span>
                      </div>
                    )}
                  </div>

                  {/* Row 4: I'm interested in* (dropdown) */}
                  <div className={`form-floating-group ${focusedField === 'interestedIn' ? 'is-focused' : ''} ${formData.interestedIn ? 'has-value' : ''} ${fieldErrors.interestedIn ? 'has-error' : ''}`}>
                    <span className="field-leading-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>
                    </span>
                    <select
                      id="hero-interested"
                      name="interestedIn"
                      value={formData.interestedIn}
                      onChange={(e) => {
                        const updated = { ...formData, interestedIn: e.target.value };
                        setFormData(updated);
                        saveDraft(updated);
                      }}
                      onFocus={() => setFocusedField('interestedIn')}
                      onBlur={() => setFocusedField(null)}
                      className="form-floating-select"
                      aria-required="true"
                      aria-invalid={Boolean(fieldErrors.interestedIn)}
                      aria-describedby="hero-interested-error"
                      required
                    >
                      {INTERESTED_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="hero-interested" className="form-floating-label select-label">
                      I'm interested in <span className="required-star" aria-hidden="true">*</span>
                    </label>
                    <span className="select-dropdown-arrow" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                    {fieldErrors.interestedIn && (
                      <div id="hero-interested-error" className="field-error-msg" role="alert">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        <span>{fieldErrors.interestedIn}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Consent Checkbox (required) */}
                <div className={`form-consent-wrap ${fieldErrors.consent ? 'has-consent-error' : ''}`}>
                  <label className="form-consent-label">
                    <input
                      type="checkbox"
                      id="hero-consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setFormData((p) => ({ ...p, consent: checked }));
                        if (fieldErrors.consent) {
                          setFieldErrors((p) => ({ ...p, consent: checked ? undefined : 'Please agree to be contacted to proceed.' }));
                        }
                      }}
                      className="form-consent-checkbox"
                      required
                      aria-required="true"
                      aria-invalid={Boolean(fieldErrors.consent)}
                      aria-describedby="hero-consent-error"
                    />
                    <span className="custom-checkbox-box" aria-hidden="true">
                      <svg className="check-mark-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="consent-text">
                      I agree to be contacted by Goyal Traders by phone, WhatsApp or email about my enquiry.
                    </span>
                  </label>
                  {fieldErrors.consent && (
                    <div id="hero-consent-error" className="field-error-msg consent-error-text" role="alert">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      <span>{fieldErrors.consent}</span>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button type="submit" id="hero-submit-btn" className="hero-card-submit-btn" disabled={isSubmitting}>
                  {!isSubmitting ? (
                    <>
                      <span>Get a free callback</span>
                      <svg className="btn-arrow-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>Sending request...</span>
                      <span className="btn-spinner" aria-hidden="true" />
                    </>
                  )}
                </button>

                {/* Small Trust Line under button */}
                <div className="hero-card-lock-note">
                  <span className="lock-icon" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <span>We'll never share your details. No sign-up charges.</span>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Desktop Trust Row under card */}
        <div className="card-trust-row" aria-label="Service guarantees">
          <div className="card-trust-item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>Free callback</span>
          </div>
          <div className="card-trust-item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>Quick onboarding support</span>
          </div>
          <div className="card-trust-item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>Your data stays private</span>
          </div>
        </div>
      </div>
    </div>
  );
}
