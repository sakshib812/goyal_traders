/**
 * Paisara Fintech - Main Client Logic
 * Plain Vanilla JavaScript ES6+
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Sticky Header & Scrollspy for Home sections
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');
  const isContactPage = window.location.pathname.includes('contact');

  const onScroll = () => {
    if (header) {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Scrollspy for Home page only
    if (!isContactPage && navLinks.length > 0) {
      const scrollPos = window.scrollY + 140;
      const heroEl = document.getElementById('hero');
      const servicesEl = document.getElementById('services');
      const howWeWorkEl = document.getElementById('how-we-work');

      let currentSection = 'hero';
      if (howWeWorkEl && scrollPos >= howWeWorkEl.offsetTop) {
        currentSection = 'how-we-work';
      } else if (servicesEl && scrollPos >= servicesEl.offsetTop) {
        currentSection = 'services';
      }

      navLinks.forEach((link) => {
        const href = link.getAttribute('href') || '';
        if (href.endsWith('#' + currentSection)) {
          link.classList.add('active');
        } else if (href.includes('#')) {
          link.classList.remove('active');
        }
      });
    }

    // Back to top button visibility
    const backToTopBtn = document.querySelector('.back-to-top-btn');
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 2. Back to top button action
  const backToTopBtn = document.querySelector('.back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. Smooth anchor scrolling for header & footer links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href')?.substring(1);
      if (!targetId) return;
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', '#' + targetId);
      }
    });
  });

  // 4. Scroll Reveal with IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (revealElements.length > 0) {
    if (prefersReducedMotion) {
      revealElements.forEach((el) => el.classList.add('is-revealed'));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -40px 0px', threshold: 0.1 }
      );
      revealElements.forEach((el) => revealObserver.observe(el));
    }
  }

  // 5. Stats Number Counter Animation
  const statsSection = document.querySelector('#stats');
  if (statsSection) {
    const statCards = statsSection.querySelectorAll('.stat-card');
    const numbers = [
      { id: 'stat-partners', val: 240 },
      { id: 'stat-transactions', val: 650 },
      { id: 'stat-services', val: 9 },
      { id: 'stat-states', val: 18 },
    ];

    let hasCounted = false;

    if (prefersReducedMotion) {
      statCards.forEach((c) => c.classList.add('is-visible'));
      numbers.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) el.textContent = String(item.val);
      });
    } else {
      const statsObserver = new IntersectionObserver(
        (entries, observer) => {
          const [entry] = entries;
          if (entry.isIntersecting && !hasCounted) {
            hasCounted = true;
            statCards.forEach((c) => c.classList.add('is-visible'));

            const duration = 1200;
            const startTime = performance.now();

            const animateStats = (now) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOut = 1 - Math.pow(1 - progress, 3);

              numbers.forEach((item) => {
                const el = document.getElementById(item.id);
                if (el) {
                  el.textContent = String(Math.floor(easeOut * item.val));
                }
              });

              if (progress < 1) {
                requestAnimationFrame(animateStats);
              } else {
                numbers.forEach((item) => {
                  const el = document.getElementById(item.id);
                  if (el) el.textContent = String(item.val);
                });
                observer.unobserve(entry.target);
              }
            };

            requestAnimationFrame(animateStats);
          }
        },
        { threshold: 0.25 }
      );
      statsObserver.observe(statsSection);
    }
  }

  // 6. How We Work Timeline Progress Line
  const timelineSection = document.querySelector('#how-we-work');
  const timelineProgress = document.querySelector('.steps-timeline-progress');
  if (timelineSection && timelineProgress) {
    if (prefersReducedMotion) {
      timelineProgress.style.width = '100%';
    } else {
      const timelineObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              timelineProgress.style.width = '100%';
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.25 }
      );
      timelineObserver.observe(timelineSection);
    }
  }

  // 7. Contact Form: Touch-Based Error Validation (BUG 1 FIX)
  const contactForm = document.querySelector('#contact-form');
  const successBanner = document.querySelector('#form-success-banner');

  if (contactForm) {
    const nameInput = document.querySelector('#contact-name');
    const emailInput = document.querySelector('#contact-email');
    const phoneInput = document.querySelector('#contact-phone');
    const needSelect = document.querySelector('#contact-need');
    const consentCheck = document.querySelector('#contact-consent');

    const touched = {
      name: false,
      email: false,
      phone: false,
      need: false,
      consent: false,
    };
    let submitAttempted = false;

    const setError = (input, msgId, message) => {
      input.classList.add('has-error');
      input.setAttribute('aria-invalid', 'true');
      const errorEl = document.querySelector(msgId);
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
      }
    };

    const clearError = (input, msgId) => {
      input.classList.remove('has-error');
      input.removeAttribute('aria-invalid');
      const errorEl = document.querySelector(msgId);
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
      }
    };

    const validateField = (field) => {
      if (!touched[field] && !submitAttempted) return true;

      if (field === 'name') {
        if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
          setError(nameInput, '#name-error', 'Please enter your name.');
          return false;
        }
        clearError(nameInput, '#name-error');
        return true;
      }

      if (field === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
          setError(emailInput, '#email-error', 'Please enter a valid email address.');
          return false;
        }
        clearError(emailInput, '#email-error');
        return true;
      }

      if (field === 'phone') {
        const phoneDigits = phoneInput.value.replace(/[\s\-\(\)\+]/g, '');
        if (!phoneInput.value.trim() || phoneDigits.length < 8 || !/^\d+$/.test(phoneDigits)) {
          setError(phoneInput, '#phone-error', 'Please enter a valid phone number.');
          return false;
        }
        clearError(phoneInput, '#phone-error');
        return true;
      }

      if (field === 'need') {
        if (!needSelect.value) {
          setError(needSelect, '#need-error', 'Please select what you need.');
          return false;
        }
        clearError(needSelect, '#need-error');
        return true;
      }

      if (field === 'consent') {
        if (!consentCheck.checked) {
          setError(consentCheck, '#consent-error', 'You must agree to be contacted about this enquiry.');
          return false;
        }
        clearError(consentCheck, '#consent-error');
        return true;
      }

      return true;
    };

    // Blur handlers - ONLY show errors after field was blurred
    nameInput?.addEventListener('blur', () => { touched.name = true; validateField('name'); });
    emailInput?.addEventListener('blur', () => { touched.email = true; validateField('email'); });
    phoneInput?.addEventListener('blur', () => { touched.phone = true; validateField('phone'); });
    needSelect?.addEventListener('blur', () => { touched.need = true; validateField('need'); });
    consentCheck?.addEventListener('blur', () => { touched.consent = true; validateField('consent'); });

    // Input handlers - clear error when corrected
    nameInput?.addEventListener('input', () => validateField('name'));
    emailInput?.addEventListener('input', () => validateField('email'));
    phoneInput?.addEventListener('input', () => validateField('phone'));
    needSelect?.addEventListener('change', () => { touched.need = true; validateField('need'); });
    consentCheck?.addEventListener('change', () => { touched.consent = true; validateField('consent'); });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitAttempted = true;

      const isNameValid = validateField('name');
      const isEmailValid = validateField('email');
      const isPhoneValid = validateField('phone');
      const isNeedValid = validateField('need');
      const isConsentValid = validateField('consent');

      if (!isNameValid || !isEmailValid || !isPhoneValid || !isNeedValid || !isConsentValid) {
        const firstError = contactForm.querySelector('.has-error, .consent-checkbox-input[aria-invalid="true"]');
        firstError?.focus();
        return;
      }

      // =========================================================================
      // REPLACE WITH REAL FIGURES / ENDPOINT BEFORE LAUNCH
      // TODO: Connect to backend API endpoint (e.g. POST /api/contact or CRM webhook)
      // =========================================================================

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending enquiry...';
      }

      setTimeout(() => {
        contactForm.style.display = 'none';
        if (successBanner) {
          successBanner.style.display = 'block';
          successBanner.focus();
        }
      }, 300);
    });

    const resetBtn = document.querySelector('#reset-form-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        contactForm.reset();
        contactForm.style.display = 'block';
        if (successBanner) successBanner.style.display = 'none';
        submitAttempted = false;
        Object.keys(touched).forEach((k) => (touched[k] = false));
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Send enquiry <span class="btn-arrow-icon" aria-hidden="true">&rarr;</span>';
        }
        nameInput?.focus();
      });
    }
  }

  // 6. Hero Contact Card Form Submission
  const heroForm = document.getElementById('hero-contact-card-form');
  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('hero-fullname');
      const phoneInput = document.getElementById('hero-phone');
      const cardEl = document.querySelector('.hero-contact-card');
      const submitBtn = heroForm.querySelector('.hero-card-submit-btn');

      if (!nameInput || !nameInput.value.trim() || nameInput.value.trim().length < 2) {
        alert('Please enter your full name.');
        nameInput?.focus();
        return;
      }

      const phoneDigits = phoneInput ? phoneInput.value.replace(/[\s\-\(\)\+]/g, '') : '';
      if (!phoneDigits || phoneDigits.length < 8) {
        alert('Please enter a valid phone number.');
        phoneInput?.focus();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="hero-card-spinner" aria-hidden="true"></span> Sending request...';
      }

      setTimeout(() => {
        if (cardEl) {
          const nameVal = nameInput ? nameInput.value.trim() : 'Partner';
          cardEl.innerHTML = `
            <div class="hero-card-success-state" role="status" aria-live="polite">
              <div class="hero-card-success-icon" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2457E6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h2 class="hero-card-success-title">Request Received!</h2>
              <p class="hero-card-success-text">Thank you, <strong>${nameVal}</strong>. Our fintech partnerships specialist will call you back shortly.</p>
              <button type="button" onclick="location.reload()" class="btn btn-primary hero-card-submit-btn" style="margin-top: 16px;">
                Submit another request
              </button>
            </div>
          `;
        }
      }, 600);
    });
  }

  // 7. 3D Coverflow Carousel Logic
  const stage = document.getElementById('coverflow-stage');
  if (stage) {
    const cards = Array.from(stage.querySelectorAll('.coverflow-card'));
    const dots = Array.from(stage.querySelectorAll('.coverflow-dot'));
    const total = cards.length;
    let currentIdx = 0;
    let autoPlayTimer = null;
    let isPaused = false;
    let pointerStartX = 0;
    let hasDragged = false;

    const updateCoverflow = (newIdx) => {
      currentIdx = (newIdx + total) % total;

      cards.forEach((card, i) => {
        const diff = (i - currentIdx + total) % total;
        card.classList.remove('pos-active', 'pos-prev', 'pos-next', 'pos-hidden-left', 'pos-hidden-right');
        const iconTile = card.querySelector('.coverflow-icon-tile');
        if (iconTile) iconTile.classList.remove('is-active-float');

        if (diff === 0) {
          card.classList.add('pos-active');
          card.setAttribute('tabindex', '0');
          if (iconTile) iconTile.classList.add('is-active-float');
        } else if (diff === 1) {
          card.classList.add('pos-next');
          card.setAttribute('tabindex', '-1');
        } else if (diff === total - 1) {
          card.classList.add('pos-prev');
          card.setAttribute('tabindex', '-1');
        } else if (diff === 2) {
          card.classList.add('pos-hidden-right');
          card.setAttribute('tabindex', '-1');
        } else {
          card.classList.add('pos-hidden-left');
          card.setAttribute('tabindex', '-1');
        }
      });

      dots.forEach((dot, i) => {
        const isCurrent = i === currentIdx;
        dot.classList.toggle('active-pill', isCurrent);
        dot.setAttribute('aria-current', isCurrent ? 'true' : 'false');
        dot.innerHTML = isCurrent && !isPaused && !prefersReducedMotion ? '<span class="coverflow-dot-progress" aria-hidden="true"></span>' : '';
      });
    };

    const startAutoPlay = () => {
      if (prefersReducedMotion || isPaused) return;
      clearInterval(autoPlayTimer);
      autoPlayTimer = setInterval(() => {
        updateCoverflow(currentIdx + 1);
      }, 3500);
    };

    const stopAutoPlay = () => {
      clearInterval(autoPlayTimer);
      dots.forEach((dot) => {
        dot.innerHTML = '';
      });
    };

    // Card Click & Jump to Contact Form
    cards.forEach((card, i) => {
      // Desktop hover on side card brings it to front
      card.addEventListener('mouseenter', () => {
        if (card.classList.contains('pos-prev') || card.classList.contains('pos-next')) {
          updateCoverflow(i);
        }
      });

      card.addEventListener('click', () => {
        if (hasDragged) return;

        const interest = card.getAttribute('data-interest') || 'API Integration';
        const selectEl = document.getElementById('hero-interested');
        if (selectEl) {
          selectEl.value = interest;
        }

        const contactEl = document.getElementById('hero-contact-card') || document.getElementById('contact');
        if (contactEl) {
          contactEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

          contactEl.classList.remove('form-highlight-pulse');
          void contactEl.offsetWidth;
          contactEl.classList.add('form-highlight-pulse');
          setTimeout(() => {
            contactEl.classList.remove('form-highlight-pulse');
          }, 1250);

          const input = contactEl.querySelector('input');
          input?.focus();
        }
      });
    });

    // Dots click
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        updateCoverflow(i);
        stopAutoPlay();
        startAutoPlay();
      });
    });

    // Stage Events (Hover, Focus, Keyboard, Pointer Drag)
    stage.addEventListener('mouseenter', () => {
      isPaused = true;
      stopAutoPlay();
    });

    stage.addEventListener('mouseleave', () => {
      isPaused = false;
      startAutoPlay();
    });

    stage.addEventListener('focusin', () => {
      isPaused = true;
      stopAutoPlay();
    });

    stage.addEventListener('focusout', () => {
      isPaused = false;
      startAutoPlay();
    });

    stage.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        updateCoverflow(currentIdx - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        updateCoverflow(currentIdx + 1);
      }
    });

    // Drag / Swipe
    stage.addEventListener('pointerdown', (e) => {
      pointerStartX = e.clientX;
      hasDragged = false;
    });

    stage.addEventListener('pointermove', (e) => {
      if (pointerStartX !== 0 && Math.abs(e.clientX - pointerStartX) > 6) {
        hasDragged = true;
      }
    });

    stage.addEventListener('pointerup', (e) => {
      if (hasDragged && pointerStartX !== 0) {
        const dx = e.clientX - pointerStartX;
        if (dx < -40) {
          updateCoverflow(currentIdx + 1);
        } else if (dx > 40) {
          updateCoverflow(currentIdx - 1);
        }
      }
      setTimeout(() => {
        hasDragged = false;
        pointerStartX = 0;
      }, 50);
    });

    // Page visibility
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        isPaused = true;
        stopAutoPlay();
      } else {
        isPaused = false;
        startAutoPlay();
      }
    });

    if (!prefersReducedMotion) {
      startAutoPlay();
    }
  }
});
