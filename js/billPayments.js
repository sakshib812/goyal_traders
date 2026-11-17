/**
 * Goyal Traders - Bill Payments Motion & Idle Controller
 * Handles sequential left column entrance, diagonal grid pop-in wave,
 * random idle tile light-up, and prefers-reduced-motion accessibility.
 */

(function (window) {
  'use strict';

  function initBillPayments() {
    var section = document.getElementById('bill-payments');
    if (!section) return;

    var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      section.classList.add('is-in-view');
      return;
    }

    // Enable animation styles only when JS is active
    section.classList.add('bill-anim-ready');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          section.classList.add('is-in-view');
          startIdleAnimations();
        } else {
          pauseIdleAnimations();
        }
      });
    }, { threshold: 0.2 });

    observer.observe(section);

    // If section is already visible on load, trigger immediately
    var rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      section.classList.add('is-in-view');
      startIdleAnimations();
    }

    // Remove will-change after intro completes (2.2s)
    setTimeout(function () {
      section.classList.add('intro-complete');
    }, 2200);

    // Idle Animations: Random tile lighting up every ~2.2s for ~1.2s
    var tiles = section.querySelectorAll('.bill-tile:not(.bill-tile-more)');
    var idleTimer = null;
    var lastLitIndex = -1;
    var isGridHovered = false;

    var grid = section.querySelector('.bill-tiles-grid');
    if (grid) {
      grid.addEventListener('mouseenter', function () {
        isGridHovered = true;
        clearLitTile();
      });
      grid.addEventListener('mouseleave', function () {
        isGridHovered = false;
      });
    }

    function clearLitTile() {
      for (var i = 0; i < tiles.length; i++) {
        tiles[i].classList.remove('tile-lit');
      }
    }

    function lightRandomTile() {
      if (isGridHovered || tiles.length === 0 || document.hidden || !section.classList.contains('is-in-view')) {
        return;
      }
      clearLitTile();
      var nextIdx;
      do {
        nextIdx = Math.floor(Math.random() * tiles.length);
      } while (nextIdx === lastLitIndex && tiles.length > 1);

      lastLitIndex = nextIdx;
      var target = tiles[nextIdx];
      target.classList.add('tile-lit');

      setTimeout(function () {
        target.classList.remove('tile-lit');
      }, 1200);
    }

    function startIdleAnimations() {
      if (idleTimer) return;
      idleTimer = setInterval(lightRandomTile, 2200);
    }

    function pauseIdleAnimations() {
      if (idleTimer) {
        clearInterval(idleTimer);
        idleTimer = null;
      }
      clearLitTile();
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        pauseIdleAnimations();
      } else if (section.classList.contains('is-in-view')) {
        startIdleAnimations();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBillPayments);
  } else {
    initBillPayments();
  }

  // Hook into AngularJS view lifecycle
  var retryCount = 0;
  var retryTimer = setInterval(function () {
    retryCount++;
    if (document.getElementById('bill-payments')) {
      initBillPayments();
      clearInterval(retryTimer);
    } else if (retryCount > 30) {
      clearInterval(retryTimer);
    }
  }, 150);

  window.initBillPayments = initBillPayments;
})(typeof window !== 'undefined' ? window : this);
