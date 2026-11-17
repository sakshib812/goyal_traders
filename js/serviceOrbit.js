/**
 * Goyal Traders - Service Orbit Motion & Parallax Controller
 * Handles entrance animation, smooth rAF mouse parallax, off-screen pausing,
 * and prefers-reduced-motion accessibility.
 */

(function (window) {
  'use strict';

  function initServiceOrbit() {
    var container = document.getElementById('service-orbit');
    if (!container) return;

    // Check prefers-reduced-motion
    var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. IntersectionObserver for Entrance Animation & Off-screen pause
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            container.classList.add('is-in-view');
            container.classList.remove('orbit-is-paused');
          } else {
            container.classList.add('orbit-is-paused');
          }
        });
      }, { threshold: 0.1 });

      observer.observe(container);
    } else {
      container.classList.add('is-in-view');
    }

    // 2. Pause animations when tab is hidden
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') {
        container.classList.add('orbit-is-paused');
      } else {
        container.classList.remove('orbit-is-paused');
      }
    });

    // 3. Desktop Smooth Mouse Parallax (rAF + Lerp)
    if (prefersReducedMotion) return;

    var isHoverCapable = window.matchMedia && window.matchMedia('(hover: hover)').matches;
    if (!isHoverCapable || window.innerWidth < 1024) return;

    var hubLayer = container.querySelector('.orbit-layer-hub');
    var innerLayer = container.querySelector('.orbit-layer-inner');
    var outerLayer = container.querySelector('.orbit-layer-outer');
    var sparkleLayer = container.querySelector('.orbit-layer-sparkles');

    var mouseX = 0;
    var mouseY = 0;
    var currentHubX = 0, currentHubY = 0;
    var currentInnerX = 0, currentInnerY = 0;
    var currentOuterX = 0, currentOuterY = 0;
    var currentSparkleX = 0, currentSparkleY = 0;
    var isTicking = false;

    function onMouseMove(e) {
      var rect = container.getBoundingClientRect();
      var cX = rect.left + rect.width / 2;
      var cY = rect.top + rect.height / 2;

      // Normalized coordinates (-1 to 1)
      mouseX = Math.max(-1, Math.min(1, (e.clientX - cX) / (rect.width / 2)));
      mouseY = Math.max(-1, Math.min(1, (e.clientY - cY) / (rect.height / 2)));

      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(updateParallax);
      }
    }

    function onMouseLeave() {
      mouseX = 0;
      mouseY = 0;
    }

    function updateParallax() {
      var lerp = 0.08;

      // Hub: 4px max
      var targetHubX = mouseX * 4;
      var targetHubY = mouseY * 4;
      currentHubX += (targetHubX - currentHubX) * lerp;
      currentHubY += (targetHubY - currentHubY) * lerp;
      if (hubLayer) {
        hubLayer.style.transform = 'translate(' + currentHubX.toFixed(2) + 'px, ' + currentHubY.toFixed(2) + 'px)';
      }

      // Inner ring: 8px max
      var targetInnerX = mouseX * 8;
      var targetInnerY = mouseY * 8;
      currentInnerX += (targetInnerX - currentInnerX) * lerp;
      currentInnerY += (targetInnerY - currentInnerY) * lerp;
      if (innerLayer) {
        innerLayer.style.transform = 'translate(' + currentInnerX.toFixed(2) + 'px, ' + currentInnerY.toFixed(2) + 'px)';
      }

      // Outer ring: 14px max
      var targetOuterX = mouseX * 14;
      var targetOuterY = mouseY * 14;
      currentOuterX += (targetOuterX - currentOuterX) * lerp;
      currentOuterY += (targetOuterY - currentOuterY) * lerp;
      if (outerLayer) {
        outerLayer.style.transform = 'translate(' + currentOuterX.toFixed(2) + 'px, ' + currentOuterY.toFixed(2) + 'px)';
      }

      // Sparkles: 20px max
      var targetSparkleX = mouseX * 20;
      var targetSparkleY = mouseY * 20;
      currentSparkleX += (targetSparkleX - currentSparkleX) * lerp;
      currentSparkleY += (targetSparkleY - currentSparkleY) * lerp;
      if (sparkleLayer) {
        sparkleLayer.style.transform = 'translate(' + currentSparkleX.toFixed(2) + 'px, ' + currentSparkleY.toFixed(2) + 'px)';
      }

      var delta = Math.abs(targetHubX - currentHubX) + Math.abs(targetHubY - currentHubY);
      if (delta > 0.01) {
        requestAnimationFrame(updateParallax);
      } else {
        isTicking = false;
      }
    }

    container.addEventListener('mousemove', onMouseMove, { passive: true });
    container.addEventListener('mouseleave', onMouseLeave, { passive: true });
  }

  // Auto-init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initServiceOrbit);
  } else {
    initServiceOrbit();
  }

  // Poll slightly for AngularJS dynamic ng-view template injection
  var retryCount = 0;
  var retryTimer = setInterval(function () {
    retryCount++;
    if (document.getElementById('service-orbit')) {
      initServiceOrbit();
      if (document.getElementById('service-orbit').classList.contains('is-in-view')) {
        clearInterval(retryTimer);
      }
    }
    if (retryCount > 30) {
      clearInterval(retryTimer);
    }
  }, 150);

  window.addEventListener('popstate', function () {
    setTimeout(initServiceOrbit, 150);
  });

  window.initServiceOrbit = initServiceOrbit;
})(typeof window !== 'undefined' ? window : this);

