/* Tamizha CCTV – small progressive enhancements. The page works without this file. */
(function () {
  'use strict';

  var doc = document.documentElement;
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  var desktopNav = window.matchMedia('(min-width: 1080px)');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Mobile menu (disclosure pattern) ---------- */
  function isOpen() {
    return toggle && toggle.getAttribute('aria-expanded') === 'true';
  }

  function setMenu(open, returnFocus) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    doc.classList.toggle('nav-open', open);
    if (open) {
      var firstLink = nav.querySelector('a');
      if (firstLink) firstLink.focus();
    } else if (returnFocus) {
      toggle.focus();
    }
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(!isOpen(), false);
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a') && isOpen()) setMenu(false, false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isOpen()) setMenu(false, true);
    });

    document.addEventListener('click', function (event) {
      if (isOpen() && !event.target.closest('.site-header')) setMenu(false, false);
    });

    var onBreakpoint = function (event) {
      if (event.matches && isOpen()) setMenu(false, false);
    };
    if (desktopNav.addEventListener) desktopNav.addEventListener('change', onBreakpoint);
    else if (desktopNav.addListener) desktopNav.addListener(onBreakpoint);
  }

  /* ---------- Header shadow on scroll ---------- */
  if (header) {
    var ticking = false;
    var updateHeader = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
    updateHeader();
  }

  /* ---------- Active nav link while scrolling ---------- */
  if ('IntersectionObserver' in window && nav) {
    var links = {};
    nav.querySelectorAll('.nav-list a[href^="#"]').forEach(function (a) {
      links[a.getAttribute('href').slice(1)] = a;
    });
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        Object.keys(links).forEach(function (key) {
          links[key].classList.toggle('is-active', key === id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(links).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    var items = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    items.forEach(function (el) {
      var siblings = Array.prototype.filter.call(el.parentElement.children, function (c) {
        return c.hasAttribute('data-reveal');
      });
      var index = siblings.indexOf(el);
      if (index > 0) el.style.setProperty('--reveal-delay', (index % 4) * 70 + 'ms');
    });
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.01 });
    items.forEach(function (el) { revealObserver.observe(el); });
    doc.classList.add('reveal-on');
  }

  /* ---------- Click tracking (GA4 / GTM ready, no IDs included) ----------
     Events: phone_click, whatsapp_click, cta_click.
     They only reach Google Analytics once a GA4 tag (gtag.js) or Google Tag
     Manager container is installed. Until then nothing is sent anywhere. */
  function track(name, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params);
    } else if (Array.isArray(window.dataLayer)) {
      var payload = { event: name };
      Object.keys(params).forEach(function (k) { payload[k] = params[k]; });
      window.dataLayer.push(payload);
    }
  }

  function locationOf(link) {
    var marked = link.closest('[data-track-location]');
    if (marked) return marked.getAttribute('data-track-location');
    var section = link.closest('section[id], article[id]');
    return section ? section.id : 'page';
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href');
    var where = locationOf(link);

    if (href.indexOf('tel:') === 0) {
      track('phone_click', { link_location: where });
    } else if (href.indexOf('https://wa.me/') === 0) {
      track('whatsapp_click', { link_location: where, service: link.getAttribute('data-service') || '' });
    }
    var cta = link.getAttribute('data-cta');
    if (cta) track('cta_click', { cta_name: cta, link_location: where });
  });

  /* ---------- Current year ---------- */
  var year = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = year; });
})();
