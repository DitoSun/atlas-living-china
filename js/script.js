/* ============================================================
   ATLAS LIVING — LIVING CHINA
   Shared JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {

  // ----- PAGE ENTER ANIMATION -----
  document.body.classList.add('page-enter');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.add('visible');
    });
  });

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

  // ----- 🆕 IMAGE REVEAL ON SCROLL -----
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(function(el) {
      revealObserver.observe(el);
    });
  }

  // ----- 🆕 COUNTER ANIMATION (Itinerary stats) -----
  const counterNums = document.querySelectorAll('.journey-stats .num');

  if (counterNums.length > 0) {
    const counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent.trim();
          const target = parseInt(text, 10);

          if (!isNaN(target) && target > 0 && target < 100) {
            el.classList.add('counter-num');
            let current = 0;
            const step = Math.ceil(target / 30);
            const timer = setInterval(function() {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              el.textContent = current;
            }, 40);
          }

          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counterNums.forEach(function(el) {
      counterObserver.observe(el);
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

  // ----- 🆕 INNER PAGE HERO PARALLAX -----
  const pageHeroImages = document.querySelectorAll('.page-hero .hero-image:not(.parallax)');

  if (pageHeroImages.length > 0) {
    window.addEventListener('scroll', function() {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        pageHeroImages.forEach(function(img) {
          img.style.transform = 'translateY(' + (scrollY * 0.2) + 'px)';
        });
      }
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

  // ============================================================
  // 🆕 INTERACTIVE FEATURES
  // ============================================================

  // ----- 1. SCROLL PROGRESS BAR -----
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.prepend(progressBar);

  window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  });

  // ----- 2. FLOATING ACTION BUTTONS -----
  const actionsContainer = document.createElement('div');
  actionsContainer.className = 'floating-actions';

  // Book / Inquire button
  const bookBtn = document.createElement('a');
  bookBtn.href = 'contact.html';
  bookBtn.className = 'floating-btn';
  bookBtn.innerHTML = '✉<span class="tooltip">Inquire Now</span>';
  bookBtn.setAttribute('aria-label', 'Inquire Now');

  // Back to top button
  const topBtn = document.createElement('button');
  topBtn.className = 'floating-btn back-to-top';
  topBtn.innerHTML = '↑<span class="tooltip">Back to Top</span>';
  topBtn.setAttribute('aria-label', 'Back to Top');
  topBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  actionsContainer.appendChild(bookBtn);
  actionsContainer.appendChild(topBtn);
  document.body.appendChild(actionsContainer);

  // Show/hide back to top
  window.addEventListener('scroll', function() {
    topBtn.classList.toggle('show', window.scrollY > 500);
  });

  // ----- 3. IMAGE LIGHTBOX -----
  const lightboxImgs = document.querySelectorAll(
    '.timeline-day-image, .exp-image, .acc-image, .full-image'
  );

  if (lightboxImgs.length > 0) {
    // Create lightbox elements
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = '<button class="lightbox-close">✕</button><img alt=""><div class="lightbox-caption"></div>';
    document.body.appendChild(overlay);

    const lbImg = overlay.querySelector('img');
    const lbCaption = overlay.querySelector('.lightbox-caption');
    const lbClose = overlay.querySelector('.lightbox-close');

    function openLightbox(src, alt) {
      lbImg.src = src;
      lbCaption.textContent = alt || '';
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    // Make images clickable
    lightboxImgs.forEach(function(img) {
      img.classList.add('clickable-image');
      img.addEventListener('click', function() {
        openLightbox(this.src || this.currentSrc, this.alt);
      });
    });

    // Close handlers
    lbClose.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeLightbox();
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // ----- 4. ITINERARY DAY TOGGLE (collapse/expand) -----
  const timelineDays = document.querySelectorAll('.timeline-item .timeline-day');

  if (timelineDays.length > 0) {
    timelineDays.forEach(function(day) {
      // Wrap the <p> content in a toggle-body div
      const content = day.querySelector('.timeline-day-content');
      const paragraphs = content.querySelectorAll('p');
      if (paragraphs.length > 0) {
        const wrapper = document.createElement('div');
        wrapper.className = 'toggle-body';
        paragraphs.forEach(function(p) {
          wrapper.appendChild(p.cloneNode(true));
          p.remove();
        });
        content.appendChild(wrapper);

        // Make it clickable
        day.classList.add('clickable');

        // Click on heading toggles
        day.addEventListener('click', function(e) {
          // Don't toggle if clicking a link or the image
          if (e.target.tagName === 'A' || e.target.closest('.timeline-day-image')) return;
          day.classList.toggle('collapsed');
        });
      }
    });
  }

  // ============================================================
  // 🆕 REACT-BITS ADAPTATIONS (Vanilla JS)
  // ============================================================

  // ----- 1. SPOTLIGHT CARD (mouse-following spotlight) -----
  const spotlightCards = document.querySelectorAll('.card-spotlight');

  spotlightCards.forEach(function(card) {
    // Create spotlight overlay div (avoids ::before conflict)
    var overlay = document.createElement('div');
    overlay.className = 'spotlight-overlay';
    overlay.style.background = 'radial-gradient(circle at 50% 50%, var(--spotlight-color), transparent 80%)';
    card.prepend(overlay);

    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      overlay.style.background = 'radial-gradient(circle at ' + x + '% ' + y + '%, var(--spotlight-color), transparent 80%)';
      this.classList.add('active');
    });

    card.addEventListener('mouseleave', function() {
      this.classList.remove('active');
    });
  });

  // ----- 2. MAGNET (magnetic hover on nav links and buttons) -----
  const magnetElements = document.querySelectorAll(
    '.nav-links a, .hero-cta, .submit-btn, .floating-btn, .city-card'
  );

  if (magnetElements.length > 0) {
    var magnetStrength = 6;

    magnetElements.forEach(function(el) {
      // Add smooth transition for magnet movement
      el.style.transition = 'transform 0.2s ease-out';

      el.addEventListener('mousemove', function(e) {
        var rect = this.getBoundingClientRect();
        var centerX = rect.left + rect.width / 2;
        var centerY = rect.top + rect.height / 2;
        var distX = Math.abs(centerX - e.clientX);
        var distY = Math.abs(centerY - e.clientY);

        if (distX < rect.width && distY < rect.height) {
          var offsetX = (e.clientX - centerX) / magnetStrength;
          var offsetY = (e.clientY - centerY) / magnetStrength;
          // Don't override existing CSS transforms on cards
          if (!this.classList.contains('city-card') && !this.classList.contains('floating-btn')) {
            this.style.transform = 'translate3d(' + offsetX + 'px, ' + offsetY + 'px, 0)';
          }
        }
      });

      el.addEventListener('mouseleave', function() {
        if (!this.classList.contains('city-card') && !this.classList.contains('floating-btn')) {
          this.style.transform = 'translate3d(0, 0, 0)';
        }
      });
    });
  }

  // ----- 3. BLUR TEXT (scroll reveal with staggered blur-to-clear) -----
  const blurTextElements = document.querySelectorAll('.blur-text');

  if (blurTextElements.length > 0) {
    const blurObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent.trim();
          const words = text.split(' ');

          // Clear original text
          el.textContent = '';

          // Create word spans
          words.forEach(function(word, i) {
            const span = document.createElement('span');
            span.className = 'blur-text-word';
            span.textContent = word;
            span.style.transitionDelay = (i * 0.08) + 's';
            el.appendChild(span);

            // Add space between words
            if (i < words.length - 1) {
              el.appendChild(document.createTextNode(' '));
            }

            // Trigger visibility after a small delay
            setTimeout(function() {
              span.classList.add('visible');
            }, 100);
          });

          blurObserver.unobserve(el);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

    blurTextElements.forEach(function(el) {
      blurObserver.observe(el);
    });
  }

  // ----- 4. BORDER GLOW (animated sweeping glow on cards) -----
  const glowCards = document.querySelectorAll('.border-glow-card');

  glowCards.forEach(function(card) {
    var angle = 0;
    var sweepInterval = null;

    card.addEventListener('mouseenter', function() {
      card.classList.add('sweep-active');
      var startTime = Date.now();
      sweepInterval = setInterval(function() {
        var elapsed = (Date.now() - startTime) / 1000;
        angle = (elapsed * 60) % 360; // 60 deg per second
        card.style.setProperty('--cursor-angle', angle + 'deg');
      }, 50);
    });

    card.addEventListener('mouseleave', function() {
      card.classList.remove('sweep-active');
      if (sweepInterval) {
        clearInterval(sweepInterval);
        sweepInterval = null;
      }
      card.style.setProperty('--cursor-angle', '0deg');
    });
  });

});
