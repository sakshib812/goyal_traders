/**
 * Goyal Traders - Partner Lead Submission & Form Validation Service
 * Single source of truth for validation, lead submission, and sanitization.
 * Used across the Hero, #contact section, and /contact page.
 */

(function (window) {
  'use strict';

  // 1. Lead Submission Endpoint Function
  // TODO: Replace this simulated function with your production API or CRM webhook (e.g. POST https://api.goyaltraders.com/v1/leads)
  window.submitLead = function (payload) {
    console.log('[Goyal Traders] Lead submission payload received:', payload);

    return new Promise(function (resolve, reject) {
      // Spam Protection: Honeypot check
      if (payload.honeypot && String(payload.honeypot).trim() !== '') {
        console.warn('[Goyal Traders] Bot submission detected via honeypot field.');
        return resolve({ success: true, leadId: 'SPAM-BLOCKED', simulated: true });
      }

      // Spam Protection: Minimum submission time check (>2 seconds)
      if (payload.initTime && (Date.now() - payload.initTime < 2000)) {
        console.warn('[Goyal Traders] Form submitted too quickly (<2s), possible automated script.');
      }

      // Simulate network request with 750ms latency
      setTimeout(function () {
        // Special testing handle for simulation:
        if (payload.firstName === 'TEST_ERROR') {
          return reject(new Error('Network error connecting to Goyal Traders servers. Please try again.'));
        }

        var leadId = 'GT-' + Math.floor(100000 + Math.random() * 900000);
        var response = {
          success: true,
          leadId: leadId,
          timestamp: new Date().toISOString(),
          message: 'Enquiry received. Our specialist will call you back within one business day.'
        };

        console.log('[Goyal Traders] Lead successfully recorded:', response);
        resolve(response);
      }, 750);
    });
  };

  // 2. Validation and Sanitization Helper
  window.PartnerFormValidation = {
    // Sanitize and auto-capitalize name (First Name & Last Name)
    formatName: function (val) {
      if (!val) return '';
      return val
        .trim()
        .replace(/\s+/g, ' ')
        .split(' ')
        .map(function (w) {
          if (!w) return '';
          return w.charAt(0).toUpperCase() + w.slice(1);
        })
        .join(' ');
    },

    // Sanitize mobile: strip spaces, dashes, parentheses, +91, 91, or leading 0
    formatMobile: function (val) {
      if (!val) return '';
      var cleaned = String(val).replace(/[\s\-\(\)\.]/g, '');
      if (cleaned.startsWith('+91')) {
        cleaned = cleaned.slice(3);
      } else if (cleaned.startsWith('91') && cleaned.length > 10) {
        cleaned = cleaned.slice(2);
      } else if (cleaned.startsWith('0') && cleaned.length > 10) {
        cleaned = cleaned.slice(1);
      }
      return cleaned.slice(0, 10);
    },

    // Validate a single field
    validateField: function (name, value, allData) {
      switch (name) {
        case 'firstName':
          if (!value || !String(value).trim()) {
            return 'First name is required.';
          }
          var fn = String(value).trim();
          if (fn.length < 2 || fn.length > 40) {
            return 'First name must be 2 to 40 characters.';
          }
          if (!/^[a-zA-Z\s.'-]+$/.test(fn)) {
            return 'Letters, spaces, and .\'- characters only.';
          }
          return null;

        case 'lastName':
          if (!value || !String(value).trim()) {
            return 'Last name is required.';
          }
          var ln = String(value).trim();
          if (ln.length < 2 || ln.length > 40) {
            return 'Last name must be 2 to 40 characters.';
          }
          if (!/^[a-zA-Z\s.'-]+$/.test(ln)) {
            return 'Letters, spaces, and .\'- characters only.';
          }
          return null;

        case 'mobile':
          if (!value || !String(value).trim()) {
            return 'Mobile number is required.';
          }
          var cleanedMobile = this.formatMobile(value);
          if (!/^[6-9]\d{9}$/.test(cleanedMobile)) {
            return 'Enter a valid 10-digit Indian mobile number starting with 6-9.';
          }
          return null;

        case 'email':
          if (!value || !String(value).trim()) {
            return null; // Optional
          }
          var em = String(value).trim();
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
            return 'Please enter a valid email address.';
          }
          return null;

        case 'businessName':
          if (!value || !String(value).trim()) {
            return null; // Optional
          }
          if (String(value).trim().length > 80) {
            return 'Shop / Business name must be 80 characters or fewer.';
          }
          return null;

        case 'city':
          if (!value || !String(value).trim()) {
            return null; // Optional
          }
          if (String(value).trim().length > 40) {
            return 'City must be 40 characters or fewer.';
          }
          return null;

        case 'pin':
          if (!value || !String(value).trim()) {
            return null; // Optional
          }
          var p = String(value).trim();
          if (!/^[1-9]\d{5}$/.test(p)) {
            return 'Enter a valid 6-digit PIN code (e.g. 400001).';
          }
          return null;

        case 'interestedIn':
          if (!value || !String(value).trim()) {
            return 'Please select an option.';
          }
          return null;

        case 'consent':
          if (!value) {
            return 'Please agree to the contact terms to proceed.';
          }
          return null;

        default:
          return null;
      }
    },

    // Validate entire form object and return error dictionary
    validateAll: function (formData) {
      var errors = {};
      var fields = ['firstName', 'lastName', 'mobile', 'email', 'businessName', 'city', 'pin', 'interestedIn', 'consent'];
      for (var i = 0; i < fields.length; i++) {
        var f = fields[i];
        var err = this.validateField(f, formData[f], formData);
        if (err) {
          errors[f] = err;
        }
      }
      return errors;
    },

    // Standard dropdown options list in exact requested order
    interestedInOptions: [
      'Become a Retailer / Agent',
      'Become a Distributor',
      'Become a Master Distributor',
      'Whitelabel partnership',
      'Insurance services',
      'Recharge & bill payment services',
      'Other inquiries'
    ],

    // Match query parameter or action text to one of the 7 official options
    matchInterestedOption: function (input) {
      if (!input || typeof input !== 'string') return this.interestedInOptions[0];
      var lower = input.toLowerCase().trim();

      if (lower.indexOf('master') !== -1) {
        return 'Become a Master Distributor';
      }
      if (lower.indexOf('whitelabel') !== -1) {
        return 'Whitelabel partnership';
      }
      if (lower.indexOf('distributor') !== -1) {
        return 'Become a Distributor';
      }
      if (lower.indexOf('retail') !== -1 || lower.indexOf('agent') !== -1) {
        return 'Become a Retailer / Agent';
      }
      if (lower.indexOf('insurance') !== -1) {
        return 'Insurance services';
      }
      if (lower.indexOf('recharge') !== -1 || lower.indexOf('bill') !== -1 || lower.indexOf('api') !== -1 || lower.indexOf('utility') !== -1 || lower.indexOf('electricity') !== -1) {
        return 'Recharge & bill payment services';
      }
      if (lower.indexOf('support') !== -1 || lower.indexOf('other') !== -1) {
        return 'Other inquiries';
      }

      // Check exact match
      for (var i = 0; i < this.interestedInOptions.length; i++) {
        if (this.interestedInOptions[i].toLowerCase() === lower) {
          return this.interestedInOptions[i];
        }
      }

      // Fallback
      return this.interestedInOptions[0];
    }
  };
})(typeof window !== 'undefined' ? window : this);

