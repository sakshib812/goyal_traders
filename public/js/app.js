/**
 * Paisara Fintech - Complete AngularJS 1.8 Application
 * Single Page Application Architecture
 */

(function () {
  'use strict';

  var app = angular.module('paisaraApp', ['ngRoute']);

  // Route Configuration
  app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      })
      .when('/privacy-policy', {
        templateUrl: 'views/privacy-policy.html',
        controller: 'PolicyController'
      })
      .when('/terms-and-conditions', {
        templateUrl: 'views/terms-and-conditions.html',
        controller: 'PolicyController'
      })
      .when('/refund-policy', {
        templateUrl: 'views/refund-policy.html',
        controller: 'PolicyController'
      })
      .when('/contact', {
        redirectTo: '/'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

  // Root Controller (Global navigation & smooth scroll helpers)
  app.controller('RootController', ['$scope', '$location', '$anchorScroll', '$window', '$timeout', function ($scope, $location, $anchorScroll, $window, $timeout) {
    $scope.isScrolled = false;
    $scope.showBackToTop = false;

    // Scroll listener for sticky header and back to top
    angular.element($window).on('scroll', function () {
      $scope.$apply(function () {
        var scrollY = $window.pageYOffset || document.documentElement.scrollTop;
        $scope.isScrolled = scrollY > 20;
        $scope.showBackToTop = scrollY > 400;
      });
    });

    // Helper: Scroll to top
    $scope.scrollToTop = function () {
      $window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Helper: Scroll to anchor with offset
    $scope.scrollToAnchor = function (targetId, $event) {
      if ($event) {
        $event.preventDefault();
      }

      var currentPath = $location.path();
      if (currentPath !== '/') {
        $location.path('/');
        $timeout(function () {
          performScroll(targetId);
        }, 150);
      } else {
        performScroll(targetId);
      }
    };

    function performScroll(targetId) {
      if (targetId === 'hero' || targetId === 'hero-contact-card' || targetId === 'contact') {
        var el = document.getElementById('hero') || document.getElementById('hero-contact-card');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          var input = el.querySelector('input');
          if (input) {
            $timeout(function () { input.focus(); }, 400);
          }
        }
        return;
      }
      var el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (targetId && (targetId.indexOf('service') !== -1 || targetId === 'services')) {
        var servicesEl = document.getElementById('services');
        if (servicesEl) {
          servicesEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }]);

  // Header Controller
  

  // Policy Pages Controller
  app.controller('PolicyController', ['$scope', '$window', function ($scope, $window) {
    // Scroll to top upon entering policy page
    $window.scrollTo(0, 0);
  }]);

  // Home Page Controller
  app.controller('HomeController', ['$scope', '$window', function ($scope, $window) {
    // Initialize scroll-reveal on home page
    angular.element(document).ready(function () {
      var revealEls = document.querySelectorAll('.reveal-on-scroll');
      if ('IntersectionObserver' in $window && revealEls.length > 0) {
        var observer = new IntersectionObserver(function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });

        revealEls.forEach(function (el) {
          observer.observe(el);
        });
      }
    });
  }]);

  // Hero Contact Callback Card Controller
  // ==========================================================================
  // Partner Form Card Controller (Unified across Hero, #contact, and /contact)
  // ==========================================================================
  app.controller('HeroContactController', ['$scope', '$rootScope', '$location', '$window', '$timeout', function ($scope, $rootScope, $location, $window, $timeout) {
    var initTimestamp = Date.now();

    $scope.options = [
      'Become a Retailer / Agent',
      'Become a Distributor',
      'Become a Master Distributor',
      'Whitelabel partnership',
      'Insurance services',
      'Recharge & bill payment services',
      'Other inquiries'
    ];

    $scope.formData = {
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      businessName: '',
      city: '',
      pin: '',
      interestedIn: $scope.options[0],
      consent: false,
      honeypot: ''
    };

    $scope.fieldErrors = {};
    $scope.touchedFields = {};
    $scope.focusedField = null;
    $scope.isSubmitting = false;
    $scope.isSuccess = false;
    $scope.errorMsg = '';
    $scope.lastThreeDigits = '***';
    $scope.leadId = '';

    // Restore draft from sessionStorage (excluding mobile and email for privacy)
    try {
      var savedDraft = $window.sessionStorage.getItem('gt_partner_draft');
      if (savedDraft) {
        var parsed = JSON.parse(savedDraft);
        if (parsed.firstName) $scope.formData.firstName = parsed.firstName;
        if (parsed.lastName) $scope.formData.lastName = parsed.lastName;
        if (parsed.businessName) $scope.formData.businessName = parsed.businessName;
        if (parsed.city) $scope.formData.city = parsed.city;
        if (parsed.pin) $scope.formData.pin = parsed.pin;
        if (parsed.interestedIn) $scope.formData.interestedIn = parsed.interestedIn;
      }
    } catch (e) {}

    // Save non-sensitive draft on change
    $scope.saveDraft = function () {
      try {
        var draft = {
          firstName: $scope.formData.firstName,
          lastName: $scope.formData.lastName,
          businessName: $scope.formData.businessName,
          city: $scope.formData.city,
          pin: $scope.formData.pin,
          interestedIn: $scope.formData.interestedIn
        };
        $window.sessionStorage.setItem('gt_partner_draft', JSON.stringify(draft));
      } catch (e) {}
    };

    // Pre-select from URL query params: ?service= or ?role=
    var queryParams = $location.search() || {};
    var urlTarget = queryParams.service || queryParams.role;
    if (!urlTarget && $window.location && $window.location.search) {
      var match = $window.location.search.match(/[?&](service|role)=([^&]+)/);
      if (match && match[2]) {
        urlTarget = decodeURIComponent(match[2]);
      }
    }
    if (urlTarget && $window.PartnerFormValidation) {
      $scope.formData.interestedIn = $window.PartnerFormValidation.matchInterestedOption(urlTarget);
    }

    // Listen for interest pre-selection from Services cards or Roles cards
    $rootScope.$on('selectServiceInterest', function (event, interest) {
      $scope.$applyAsync(function () {
        if ($window.PartnerFormValidation) {
          $scope.formData.interestedIn = $window.PartnerFormValidation.matchInterestedOption(interest);
        }
      });
    });

    // Mobile input formatting: numeric only, max 10
    $scope.onMobileChange = function () {
      if ($window.PartnerFormValidation) {
        $scope.formData.mobile = $window.PartnerFormValidation.formatMobile($scope.formData.mobile);
      } else {
        $scope.formData.mobile = String($scope.formData.mobile || '').replace(/\D/g, '').slice(0, 10);
      }
      if ($scope.touchedFields.mobile) {
        $scope.validateSingleField('mobile');
      }
    };

    // Mobile paste: strip spaces, dashes, +91, 0 prefix
    $scope.onMobilePaste = function ($event) {
      var clipboardData = $event.clipboardData || ($event.originalEvent && $event.originalEvent.clipboardData) || $window.clipboardData;
      if (clipboardData) {
        var text = clipboardData.getData('text');
        if (text) {
          $event.preventDefault();
          var cleaned = $window.PartnerFormValidation ? $window.PartnerFormValidation.formatMobile(text) : text.replace(/\D/g, '').slice(0, 10);
          $scope.formData.mobile = cleaned;
          if ($scope.touchedFields.mobile) {
            $scope.validateSingleField('mobile');
          }
        }
      }
    };

    // Name formatting on blur: auto-trim and auto-capitalize
    $scope.onNameBlur = function (fieldName) {
      if ($scope.formData[fieldName] && $window.PartnerFormValidation) {
        $scope.formData[fieldName] = $window.PartnerFormValidation.formatName($scope.formData[fieldName]);
      }
      $scope.onFieldBlur(fieldName);
      $scope.saveDraft();
    };

    // Focus & Blur tracking for floating labels and touch validation
    $scope.onFieldFocus = function (name) {
      $scope.focusedField = name;
    };

    $scope.onFieldBlur = function (name) {
      $scope.focusedField = null;
      $scope.touchedFields[name] = true;
      $scope.validateSingleField(name);
      $scope.saveDraft();
    };

    $scope.isFieldFocused = function (name) {
      return $scope.focusedField === name;
    };

    $scope.validateSingleField = function (name) {
      if ($window.PartnerFormValidation) {
        var err = $window.PartnerFormValidation.validateField(name, $scope.formData[name], $scope.formData);
        if (err) {
          $scope.fieldErrors[name] = err;
        } else {
          delete $scope.fieldErrors[name];
        }
      }
    };

    $scope.isFieldValid = function (name) {
      if (!$scope.formData[name]) return false;
      if ($scope.fieldErrors[name]) return false;
      if (name === 'firstName' || name === 'lastName') {
        return String($scope.formData[name]).trim().length >= 2;
      }
      if (name === 'mobile') {
        return /^[6-9]\d{9}$/.test($scope.formData.mobile);
      }
      if (name === 'email') {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($scope.formData.email);
      }
      if (name === 'pin') {
        return /^[1-9]\d{5}$/.test($scope.formData.pin);
      }
      return true;
    };

    // 3-Step Progress calculation
    $scope.getProgressPercentage = function () {
      var pct = 10;
      if ($scope.isFieldValid('firstName') || $scope.isFieldValid('lastName')) pct += 15;
      if ($scope.isFieldValid('mobile')) pct += 25;
      if ($scope.formData.businessName || $scope.formData.city) pct += 20;
      if ($scope.formData.interestedIn && $scope.formData.consent) pct += 30;
      return Math.min(100, pct);
    };

    $scope.isStepComplete = function (step) {
      if (step === 1) {
        return $scope.isFieldValid('firstName') && $scope.isFieldValid('lastName') && $scope.isFieldValid('mobile');
      }
      if (step === 2) {
        return $scope.isStepComplete(1) && (String($scope.formData.businessName || '').length > 0 || String($scope.formData.city || '').length > 0);
      }
      if (step === 3) {
        return $scope.isStepComplete(1) && !!$scope.formData.interestedIn && $scope.formData.consent;
      }
      return false;
    };

    // Desktop 3D Tilt Effect (max 3deg)
    $scope.onCardMouseMove = function ($event) {
      if ($window.matchMedia && $window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if ($window.innerWidth < 1024) return;
      var card = $event.currentTarget;
      if (!card) return;
      var rect = card.getBoundingClientRect();
      var x = $event.clientX - rect.left;
      var y = $event.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;
      var rotX = ((y - centerY) / centerY) * -3;
      var rotY = ((x - centerX) / centerX) * 3;
      card.style.transform = 'perspective(1000px) rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg)';
    };

    $scope.onCardMouseLeave = function ($event) {
      var card = $event.currentTarget;
      if (card) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      }
    };

    // Form submission
    $scope.submitCallback = function ($event) {
      if ($event) $event.preventDefault();
      if ($scope.isSubmitting) return;

      // Mark all fields touched
      var fields = ['firstName', 'lastName', 'mobile', 'email', 'businessName', 'city', 'pin', 'interestedIn', 'consent'];
      for (var i = 0; i < fields.length; i++) {
        $scope.touchedFields[fields[i]] = true;
      }

      if ($window.PartnerFormValidation) {
        $scope.fieldErrors = $window.PartnerFormValidation.validateAll($scope.formData);
      }

      var hasErrors = Object.keys($scope.fieldErrors).length > 0;
      if (hasErrors) {
        $scope.errorMsg = 'Please review the highlighted fields above.';
        $timeout(function () {
          var firstErrField = Object.keys($scope.fieldErrors)[0];
          var el = document.getElementById('hero-' + firstErrField.toLowerCase());
          if (el) el.focus();
        }, 50);
        return;
      }

      $scope.errorMsg = '';
      $scope.isSubmitting = true;

      var payload = {
        firstName: $scope.formData.firstName.trim(),
        lastName: $scope.formData.lastName.trim(),
        mobile: '+91' + $scope.formData.mobile.trim(),
        email: $scope.formData.email ? $scope.formData.email.trim() : '',
        businessName: $scope.formData.businessName ? $scope.formData.businessName.trim() : '',
        city: $scope.formData.city ? $scope.formData.city.trim() : '',
        pin: $scope.formData.pin ? $scope.formData.pin.trim() : '',
        interestedIn: $scope.formData.interestedIn,
        consent: $scope.formData.consent,
        sourcePage: $window.location ? $window.location.pathname + $window.location.hash : 'hero-contact-card',
        timestamp: new Date().toISOString(),
        honeypot: $scope.formData.honeypot,
        initTime: initTimestamp
      };

      var submitPromise = $window.submitLead ? $window.submitLead(payload) : Promise.resolve({ success: true, leadId: 'GT-LOCAL' });

      submitPromise.then(function (result) {
        $scope.$apply(function () {
          $scope.isSubmitting = false;
          $scope.isSuccess = true;
          $scope.leadId = result.leadId || 'GT-' + Date.now();
          var mob = $scope.formData.mobile;
          $scope.lastThreeDigits = mob ? mob.slice(-3) : '***';

          try {
            $window.sessionStorage.removeItem('gt_partner_draft');
          } catch (e) {}

          // Move focus to success heading for accessibility
          $timeout(function () {
            var heading = document.getElementById('success-heading');
            if (heading) heading.focus();
          }, 150);
        });
      }).catch(function (err) {
        $scope.$apply(function () {
          $scope.isSubmitting = false;
          $scope.errorMsg = (err && err.message) || 'Network error submitting enquiry. Please check your connection and retry.';
        });
      });
    };

    // Reset Form for another enquiry
    $scope.resetForm = function () {
      $scope.formData = {
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        businessName: '',
        city: '',
        pin: '',
        interestedIn: $scope.options[0],
        consent: false,
        honeypot: ''
      };
      $scope.fieldErrors = {};
      $scope.touchedFields = {};
      $scope.isSuccess = false;
      $scope.errorMsg = '';
      $timeout(function () {
        var input = document.getElementById('hero-firstname');
        if (input) input.focus();
      }, 50);
    };
  }]);

  app.controller('PartnerFormCardController', ['$controller', '$scope', function ($controller, $scope) {
    $controller('HeroContactController', { $scope: $scope });
  }]);

  // ==========================================================================
  // Animated Services Grid Controller (Desktop 3x2, Tablet 2x3, Mobile 1x6)
  // ==========================================================================
  app.controller('ServicesGridController', ['$scope', '$rootScope', '$sce', '$window', '$timeout', function ($scope, $rootScope, $sce, $window, $timeout) {
    $scope.hoveredIndex = null;
    $scope.reducedMotion = false;
    $scope.isInView = false;
    $scope.isJsReady = false;

    // Check prefers-reduced-motion
    if ($window.matchMedia) {
      var mq = $window.matchMedia('(prefers-reduced-motion: reduce)');
      $scope.reducedMotion = mq.matches;
      mq.addEventListener('change', function (e) {
        $scope.$applyAsync(function () {
          $scope.reducedMotion = e.matches;
        });
      });
    }

    // 6 Qualitative Services matching spec exactly
    $scope.services = [
      {
        id: 'mobile-recharge-api',
        title: 'Mobile Recharge API',
        description: 'Offer prepaid recharges across operators through one API, with live status updates and automatic retries on failures.',
        stat1: { value: 'Real-time', label: 'STATUS' },
        stat2: { value: 'Multi-operator', label: 'COVERAGE' },
        accentGradient: 'linear-gradient(135deg, #FF6B35 0%, #EA580C 100%)',
        interest: 'API Integration',
        iconSvg: $sce.trustAsHtml('<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>')
      },
      {
        id: 'dth-recharge',
        title: 'DTH Recharge',
        description: 'Let customers renew DTH connections in seconds, with major providers supported and clean transaction records.',
        stat1: { value: 'Instant', label: 'CONFIRMATION' },
        stat2: { value: 'Full logs', label: 'TRANSACTIONS' },
        accentGradient: 'linear-gradient(135deg, #EA580C 0%, #C20D06 100%)',
        interest: 'API Integration',
        iconSvg: $sce.trustAsHtml('<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="15" x="2" y="7" rx="2" ry="2" /><polyline points="17 2 12 7 7 2" /></svg>')
      },
      {
        id: 'electricity-bill-payments',
        title: 'Electricity & Bill Payments',
        description: 'Fetch bills, collect payments and issue digital receipts for electricity, broadband and postpaid, all inside your app.',
        stat1: { value: 'Instant', label: 'BILL FETCH' },
        stat2: { value: 'Multi-biller', label: 'COVERAGE' },
        accentGradient: 'linear-gradient(135deg, #D9381E 0%, #F59E0B 100%)',
        interest: 'API Integration',
        iconSvg: $sce.trustAsHtml('<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><path d="M12 17.5v.5" /><path d="M12 6v.5" /></svg>')
      },
      {
        id: 'utility-fee-payments',
        title: 'Utility & Fee Payments',
        description: 'Bring FASTag, gas, water, municipal and school fee payments together in one unified payment flow.',
        stat1: { value: 'FASTag + more', label: 'UTILITIES' },
        stat2: { value: 'One flow', label: 'PAYMENTS' },
        accentGradient: 'linear-gradient(135deg, #C20D06 0%, #FF6B35 100%)',
        interest: 'API Integration',
        iconSvg: $sce.trustAsHtml('<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg>')
      },
      {
        id: 'insurance-distribution',
        title: 'Insurance Distribution',
        description: 'Add insurance products to your platform and let your network offer and renew policies with guided journeys.',
        stat1: { value: 'Guided', label: 'ONBOARDING' },
        stat2: { value: 'Renewals', label: 'SUPPORTED' },
        accentGradient: 'linear-gradient(135deg, #EA580C 0%, #FB923C 100%)',
        interest: 'Partnership',
        iconSvg: $sce.trustAsHtml('<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg>')
      },
      {
        id: 'dedicated-partner-support',
        title: 'Dedicated Partner Support',
        description: 'Technical onboarding, quick issue resolution and clear communication from a team that knows your business.',
        stat1: { value: 'Fast', label: 'RESOLUTION' },
        stat2: { value: 'Hands-on', label: 'ONBOARDING' },
        accentGradient: 'linear-gradient(135deg, #B91C1C 0%, #F97316 100%)',
        interest: 'Support',
        iconSvg: $sce.trustAsHtml('<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" /><path d="M21 16v2a4 4 0 0 1-4 4h-5" /></svg>')      },
      {
        id: 'analytics-reports',
        title: 'Analytics & Reports',
        description: 'Real-time dashboards and downloadable reports across all services to track transaction volume, success rates and commissions.',
        stat1: { value: 'Real-time', label: 'TRACKING' },
        stat2: { value: 'Full logs', label: 'REPORTS' },
        accentGradient: 'linear-gradient(135deg, #FF6B35 0%, #EA580C 100%)',
        interest: 'Analytics & Reports',
        iconSvg: $sce.trustAsHtml('<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>')
      },
      {
        id: 'distributor-network-management',
        title: 'Distributor & Network Management',
        description: 'Create sub-retailer logins, assign service permissions, set commission slabs and manage your entire distribution network.',
        stat1: { value: 'Multi-tier', label: 'NETWORK' },
        stat2: { value: 'Live sync', label: 'COMMISSION' },
        accentGradient: 'linear-gradient(135deg, #EA580C 0%, #C20D06 100%)',
        interest: 'Distributor Management',
        iconSvg: $sce.trustAsHtml('<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="3" width="6" height="6" rx="1" /><rect x="2" y="15" width="6" height="6" rx="1" /><rect x="9" y="15" width="6" height="6" rx="1" /><rect x="16" y="15" width="6" height="6" rx="1" /><path d="M12 9v3" /><path d="M5 12h14" /><path d="M5 12v3" /><path d="M12 12v3" /><path d="M19 12v3" /></svg>')
      }
    ];

    // Card Hover handling for spotlight and dimming
    $scope.setCardHover = function (index) {
      $scope.hoveredIndex = index;
    };

    $scope.clearCardHover = function () {
      $scope.hoveredIndex = null;
    };

    $scope.onCardMouseMove = function ($event) {
      var card = $event.currentTarget.querySelector('.service-grid-card') || $event.currentTarget;
      if (!card) return;
      var rect = card.getBoundingClientRect();
      var x = $event.clientX - rect.left;
      var y = $event.clientY - rect.top;
      card.style.setProperty('--mx', x + 'px');
      card.style.setProperty('--my', y + 'px');
    };

    // Card click / Learn More click:
    // 1. Smooth scroll to #contact / #hero-contact-card with sticky header offset
    // 2. Pre-select matching interest
    // 3. 1.2s soft glow pulse on form card
    $scope.onServiceClick = function (service, $event) {
      if ($event) {
        $event.preventDefault();
      }

      // Broadcast pre-selection event
      $rootScope.$broadcast('selectServiceInterest', service.interest);

      // Target contact element
      var contactEl = document.getElementById('hero-contact-card') || document.getElementById('contact');
      if (contactEl) {
        var headerOffset = 90;
        var elementPosition = contactEl.getBoundingClientRect().top + ($window.pageYOffset || document.documentElement.scrollTop || 0);
        var offsetPosition = elementPosition - headerOffset;

        if ($window.scrollTo) {
          $window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }

        // Soft glow pulse for ~1.2s
        contactEl.classList.remove('form-highlight-pulse');
        void contactEl.offsetWidth; // trigger reflow
        contactEl.classList.add('form-highlight-pulse');

        $timeout(function () {
          contactEl.classList.remove('form-highlight-pulse');
        }, 1250);

        var input = contactEl.querySelector('input');
        if (input) {
          $timeout(function () {
            input.focus({ preventScroll: true });
          }, 450);
        }
      }

      // Update URL hash smoothly
      if ($window.history && $window.history.pushState) {
        $window.history.pushState(null, null, '#contact');
      }
    };

    // Keyboard navigation (Enter / Space activation on card or link)
    $scope.onCardKeydown = function ($event, service) {
      if ($event.key === 'Enter' || $event.key === ' ') {
        $event.preventDefault();
        $scope.onServiceClick(service, $event);
      }
    };

    // IntersectionObserver for entrance animation
    $timeout(function () {
      $scope.isJsReady = true;

      var sectionEl = document.getElementById('services');
      if (!sectionEl || !('IntersectionObserver' in $window)) {
        $scope.isInView = true;
        return;
      }

      // If already in view on load, play immediately
      var initialRect = sectionEl.getBoundingClientRect();
      if (initialRect.top < ($window.innerHeight || 800) && initialRect.bottom > 0) {
        $scope.isInView = true;
        return;
      }

      var observer = new $window.IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting || entry.intersectionRatio > 0.15) {
            $scope.$applyAsync(function () {
              $scope.isInView = true;
            });
            observer.unobserve(entry.target);
            observer.disconnect();
          }
        });
      }, {
        threshold: 0.15
      });

      observer.observe(sectionEl);

      // Fallback timer: ensure visible within 1.5s even if observer doesn't fire
      $timeout(function () {
        if (!$scope.isInView) {
          $scope.isInView = true;
        }
      }, 1500);
    }, 50);
  }]);

  // Maintain alias for any legacy reference
  app.controller('ServicesCoverflowController', ['$controller', '$scope', function ($controller, $scope) {
    $controller('ServicesGridController', { $scope: $scope });
  }]);

  // Stats Counter Controller
  app.controller('StatsController', ['$scope', '$window', '$timeout', function ($scope, $window, $timeout) {
    $scope.stats = [
      { id: 1, target: 85, displayValue: '0', suffix: '+', label: 'Partner businesses' },
      { id: 2, target: 450, displayValue: '0', suffix: 'K+', label: 'Transactions processed' },
      { id: 3, target: 6, displayValue: '0', suffix: '', label: 'Services available' },
      { id: 4, target: 18, displayValue: '0', suffix: '+', label: 'States covered' }
    ];

    var counted = false;
    function animateCounters() {
      if (counted) return;
      counted = true;

      $scope.stats.forEach(function (stat) {
        var duration = 1200;
        var start = 0;
        var end = stat.target;
        var startTime = null;

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          var easeOut = 1 - Math.pow(1 - progress, 3);
          var current = Math.floor(easeOut * end);
          $scope.$applyAsync(function () {
            stat.displayValue = current.toString();
          });
          if (progress < 1) {
            $window.requestAnimationFrame(step);
          } else {
            $scope.$applyAsync(function () {
              stat.displayValue = end.toString();
            });
          }
        }
        $window.requestAnimationFrame(step);
      });
    }

    $timeout(function () {
      var statsEl = document.getElementById('stats');
      if (statsEl && 'IntersectionObserver' in $window) {
        var obs = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCounters();
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.2 });
        obs.observe(statsEl);
      } else {
        animateCounters();
      }
    }, 200);
  }]);

  // Footer Controller
  app.controller('FooterController', ['$scope', function ($scope) {
    // Current year
    $scope.currentYear = new Date().getFullYear();
  }]);


  // Enhanced Header Controller with Dropdown, Scroll-Spy and Mobile Menu
  app.controller('HeaderController', ['$scope', '$rootScope', '$location', '$window', '$timeout', function ($scope, $rootScope, $location, $window, $timeout) {
    $scope.isRolesDropdownOpen = false;
    $scope.isMobileMenuOpen = false;
    $scope.activeSection = 'hero';

    $scope.toggleRolesDropdown = function ($event) {
      if ($event) $event.stopPropagation();
      $scope.isRolesDropdownOpen = !$scope.isRolesDropdownOpen;
    };

    $scope.closeRolesDropdown = function () {
      $scope.isRolesDropdownOpen = false;
    };

    $scope.toggleMobileMenu = function () {
      $scope.isMobileMenuOpen = !$scope.isMobileMenuOpen;
    };

    $scope.closeMobileMenu = function () {
      $scope.isMobileMenuOpen = false;
      $scope.isRolesDropdownOpen = false;
    };

    // Close on click outside or Esc key
    angular.element($window).on('click', function (e) {
      if ($scope.isRolesDropdownOpen) {
        $scope.$apply(function () {
          $scope.isRolesDropdownOpen = false;
        });
      }
    });

    angular.element($window).on('keydown', function (e) {
      if (e.key === 'Escape' && ($scope.isRolesDropdownOpen || $scope.isMobileMenuOpen)) {
        $scope.$apply(function () {
          $scope.isRolesDropdownOpen = false;
          $scope.isMobileMenuOpen = false;
        });
      }
    });

    $scope.navigateToRole = function (roleId, $event) {
      if ($event) {
        $event.preventDefault();
        $event.stopPropagation();
      }
      $scope.closeRolesDropdown();
      $scope.closeMobileMenu();

      var currentPath = $location.path();
      if (currentPath !== '/') {
        $location.path('/');
        $timeout(function () {
          performRoleScroll(roleId);
        }, 150);
      } else {
        performRoleScroll(roleId);
      }
    };

    function performRoleScroll(roleId) {
      var rolesSec = document.getElementById('roles');
      if (rolesSec) {
        rolesSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      $timeout(function () {
        var card = document.getElementById('role-card-' + roleId);
        if (card) {
          card.classList.remove('role-card-highlight-pulse');
          void card.offsetWidth; // trigger reflow
          card.classList.add('role-card-highlight-pulse');
          card.focus();
        }
      }, 400);
    }

    // Scroll-Spy: detect active section
    var sections = ['hero', 'services', 'roles', 'how-we-work', 'faq'];
    angular.element($window).on('scroll', function () {
      var scrollPos = ($window.pageYOffset || document.documentElement.scrollTop) + 120;
      for (var i = sections.length - 1; i >= 0; i--) {
        var el = document.getElementById(sections[i]);
        if (el) {
          var top = el.offsetTop;
          if (scrollPos >= top) {
            if ($scope.activeSection !== sections[i]) {
              $scope.$applyAsync(function () {
                $scope.activeSection = sections[i];
              });
            }
            break;
          }
        }
      }
    });
  }]);

  // Roles & Hierarchy Controller
  // ==========================================================================
  // Partner Ticker / Marquee Controller (Continuous Auto-Scrolling)
  // ==========================================================================
  app.controller('PartnerTickerController', ['$scope', '$sce', '$window', function ($scope, $sce, $window) {
    var tickerConfig = ($window.siteContent && $window.siteContent.partnerTicker) || {};
    $scope.row1Chips = (tickerConfig.row1 && tickerConfig.row1.chips) || [
      'Retail Shops', 'Kirana & General Stores', 'Mobile Recharge Shops', 'Telecom Retailers',
      'Cyber Cafes', 'Common Service Centres', 'Stationery & Photocopy Shops', 'Medical & Pharmacy Stores',
      'Mobile Accessory Stores', 'Insurance Advisors', 'Local Distributors', 'Master Distributors',
      'Whitelabel Partners', 'Small Business Owners', 'Local Entrepreneurs'
    ];

    var iconMap = {
      'Mobile Recharge': '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>',
      'DTH Recharge': '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="15" x="2" y="7" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>',
      'Electricity Bills': '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
      'Broadband Bills': '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',
      'Postpaid Bills': '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v.5"/><path d="M12 6v.5"/></svg>',
      'FASTag Recharge': '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>',
      'Gas Bills': '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
      'Water Bills': '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 0 1-11.95 4.95"/></svg>',
      'Municipal Payments': '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>',
      'School Fee Payments': '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
      'Insurance Premiums': '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>',
      'Policy Renewals': '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>',
      'Wallet Top-up': '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>',
      'Partner Support': '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/><path d="M21 16v2a4 4 0 0 1-4 4h-5"/></svg>'
    };

    var rawRow2 = (tickerConfig.row2 && tickerConfig.row2.chips) || [
      'Mobile Recharge', 'DTH Recharge', 'Electricity Bills', 'Broadband Bills',
      'Postpaid Bills', 'FASTag Recharge', 'Gas Bills', 'Water Bills',
      'Municipal Payments', 'School Fee Payments', 'Insurance Premiums',
      'Policy Renewals', 'Wallet Top-up', 'Partner Support'
    ];

    $scope.row2Chips = rawRow2.map(function (title) {
      return {
        text: title,
        iconSvg: $sce.trustAsHtml(iconMap[title] || '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"/></svg>')
      };
    });

    $scope.isJsReady = true;
    $scope.isInView = true;
  }]);

  app.controller('RolesController', ['$scope', '$rootScope', '$timeout', function ($scope, $rootScope, $timeout) {
    $scope.applyForRole = function (roleTitle, $event) {
      if ($event) $event.preventDefault();

      // Pre-select interest in contact form
      $rootScope.$broadcast('selectServiceInterest', roleTitle);

      // Scroll to contact form
      var contactEl = document.getElementById('hero-contact-card') || document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        $timeout(function () {
          contactEl.classList.remove('form-highlight-pulse');
          void contactEl.offsetWidth;
          contactEl.classList.add('form-highlight-pulse');
          var input = contactEl.querySelector('input');
          if (input) input.focus();
        }, 400);
      }
    };
  }]);

  // How We Work Stepper Controller
  app.controller('HowWeWorkController', ['$scope', '$window', '$timeout', function ($scope, $window, $timeout) {
    $scope.isLineAnimated = false;

    $timeout(function () {
      var sec = document.getElementById('how-we-work');
      if (sec && 'IntersectionObserver' in $window) {
        var obs = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              $scope.$applyAsync(function () {
                $scope.isLineAnimated = true;
              });
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.2 });
        obs.observe(sec);
      } else {
        $scope.isLineAnimated = true;
      }
    }, 200);
  }]);

  // FAQ Controller
  app.controller('FaqController', ['$scope', function ($scope) {
    // FAQ Accordion: One open at a time
    $scope.openIndex = 0; // First question open by default

    $scope.toggleFaq = function (index) {
      if ($scope.openIndex === index) {
        $scope.openIndex = -1; // close if currently open
      } else {
        $scope.openIndex = index;
      }
    };

    $scope.isOpen = function (index) {
      return $scope.openIndex === index;
    };

    $scope.onKeyDown = function ($event, index) {
      if ($event.key === 'Enter' || $event.key === ' ') {
        $event.preventDefault();
        $scope.toggleFaq(index);
      }
    };
  }]);

})();
