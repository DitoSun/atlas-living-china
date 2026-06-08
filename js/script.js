/* ============================================================
   ATLAS LIVING — LIVING CHINA
   Shared JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {

  // ----- HEADER SCROLL EFFECT -----
  const header = document.querySelector('.site-header');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.scrollY;
    if (currentScroll > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // ----- MOBILE MENU -----
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ----- SCROLL ANIMATIONS (Intersection Observer) -----
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(function(el) {
      fadeObserver.observe(el);
    });
  }

  // Stagger children
  const staggerElements = document.querySelectorAll('.stagger-children');

  if (staggerElements.length > 0) {
    const staggerObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          staggerObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });

    staggerElements.forEach(function(el) {
      staggerObserver.observe(el);
    });
  }

  // ----- FAQ TOGGLE -----
  document.querySelectorAll('.faq-question').forEach(function(question) {
    question.addEventListener('click', function() {
      const item = this.parentElement;
      item.classList.toggle('open');
    });
  });

  // ----- ROUTE MAP INTERACTION -----
  // City markers on SVG map
  const cityMarkers = document.querySelectorAll('.city-marker');
  const cityCards = document.querySelectorAll('.city-card');

  function activateCityMap(cityId) {
    cityMarkers.forEach(function(marker) {
      marker.classList.toggle('active', marker.dataset.city === cityId);
    });
    cityCards.forEach(function(card) {
      card.classList.toggle('active', card.dataset.city === cityId);
    });
  }

  // SVG marker click → navigate
  cityMarkers.forEach(function(marker) {
    marker.addEventListener('click', function() {
      const cityId = this.dataset.city;
      const target = document.querySelector('.city-card[data-city="' + cityId + '"]');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        activateCityMap(cityId);
      }
    });
  });

  // City card hover → highlight SVG marker
  cityCards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
      const cityId = this.dataset.city;
      cityMarkers.forEach(function(m) {
        m.classList.toggle('active', m.dataset.city === cityId);
      });
    });
    card.addEventListener('mouseleave', function() {
      cityMarkers.forEach(function(m) {
        m.classList.remove('active');
      });
    });
  });

  // ----- PARALLAX EFFECT ON HERO IMAGES -----
  const heroImages = document.querySelectorAll('.hero-image.parallax');

  if (heroImages.length > 0) {
    window.addEventListener('scroll', function() {
      const scrollY = window.scrollY;
      heroImages.forEach(function(img) {
        img.style.transform = 'translateY(' + (scrollY * 0.3) + 'px)';
      });
    });
  }

  // ----- ACTIVE NAV LINK -----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ----- SMOOTH SCROLL FOR ANCHOR LINKS -----
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
