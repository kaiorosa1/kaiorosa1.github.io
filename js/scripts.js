document.addEventListener('DOMContentLoaded', () => {
  // Language toggle (PT default, EN alternate) — persisted per viewer
  const langButtons = document.querySelectorAll('[data-lang-btn]');
  const metaDescription = document.getElementById('metaDescription');

  function applyLang(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    langButtons.forEach((btn) => {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang-btn') === lang ? 'true' : 'false');
    });
    if (metaDescription) {
      const key = lang === 'en' ? 'descEn' : 'descPt';
      metaDescription.setAttribute('content', metaDescription.dataset[key]);
    }
    try { localStorage.setItem('kr-lang', lang); } catch (e) {}
  }

  let storedLang = 'pt';
  try { storedLang = localStorage.getItem('kr-lang') || 'pt'; } catch (e) {}
  applyLang(storedLang);

  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => applyLang(btn.getAttribute('data-lang-btn')));
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // Add 'visible' class when element comes into view
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Targets to animate (we'll add the .animate-on-scroll class to HTML elements later)
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  animateElements.forEach(el => observer.observe(el));

  // Handle active navigation highlighting based on scroll position
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    
    // We reverse the sections to find the deepest one we've scrolled past
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      // Trigger update when we pass the top 1/3 of the screen
      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sideNav');
  
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }

  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992) {
        sidebar.classList.remove('mobile-open');
      }
    });
  });
});
