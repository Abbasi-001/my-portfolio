/* ===== PORTFOLIO SCRIPT ===== */

// ---- LOADER ----
(function() {
  const bar = document.getElementById('loaderBar');
  const pct = document.getElementById('loaderPercent');
  const loader = document.getElementById('loader');
  let p = 0;
  const iv = setInterval(() => {
    p += Math.random() * 12 + 3;
    if (p >= 100) {
      p = 100;
      clearInterval(iv);
      bar.style.width = '100%';
      pct.textContent = '100%';
      setTimeout(() => {
        loader.classList.add('hidden');
        initAnimations();
      }, 600);
    }
    bar.style.width = p + '%';
    pct.textContent = Math.floor(p) + '%';
  }, 80);
})();

// ---- NAVBAR ----
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
  updateActiveNav();
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.querySelector('i').className =
    navLinks.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.querySelector('i').className = 'fas fa-bars';
  });
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

// ---- PARTICLES ----
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      animation-duration: ${Math.random() * 8 + 6}s;
      animation-delay: ${Math.random() * 5}s;
      opacity: ${Math.random() * 0.6};
    `;
    container.appendChild(p);
  }
}
createParticles();

// ---- MOUSE GLOW ----
const mouseGlow = document.getElementById('mouseGlow');
if (mouseGlow) {
  document.addEventListener('mousemove', e => {
    mouseGlow.style.left = e.clientX + 'px';
    mouseGlow.style.top = e.clientY + 'px';
  });
}

// ---- HERO TILT ----
const heroImgWrap = document.querySelector('.hero-img-wrap');
if (heroImgWrap) {
  heroImgWrap.addEventListener('mousemove', e => {
    const rect = heroImgWrap.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    heroImgWrap.style.transform = `perspective(800px) rotateY(${dx * 10}deg) rotateX(${-dy * 10}deg)`;
  });
  heroImgWrap.addEventListener('mouseleave', () => {
    heroImgWrap.style.transform = 'perspective(800px) rotateY(0) rotateX(0)';
    heroImgWrap.style.transition = 'transform 0.5s ease';
  });
}

// ---- PORTFOLIO SLIDER ----
const slider = document.getElementById('portfolioSlider');
const prevBtn = document.getElementById('sliderPrev');
const nextBtn = document.getElementById('sliderNext');
const dotsContainer = document.getElementById('sliderDots');
const cards = slider ? Array.from(slider.querySelectorAll('.port-card')) : [];
let currentSlide = 0;
const visibleCards = () => window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;

function buildDots() {
  if (!dotsContainer) return;
  dotsContainer.innerHTML = '';
  const total = Math.ceil(cards.length / visibleCards());
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentSlide);
  });
}

function goToSlide(n) {
  const total = Math.ceil(cards.length / visibleCards());
  currentSlide = Math.max(0, Math.min(n, total - 1));
  const cardW = cards[0] ? cards[0].offsetWidth + 24 : 324;
  slider.scrollTo({ left: currentSlide * visibleCards() * cardW, behavior: 'smooth' });
  updateDots();
}

if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
buildDots();
window.addEventListener('resize', buildDots);

// ---- TESTIMONIALS SLIDER ----
const testiCards = Array.from(document.querySelectorAll('.testi-card'));
const testiDotsEl = document.getElementById('testiDots');
let testiIndex = 0;
let testiAuto;

function buildTestiDots() {
  if (!testiDotsEl) return;
  testiDotsEl.innerHTML = '';
  testiCards.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => showTesti(i));
    testiDotsEl.appendChild(d);
  });
}

function showTesti(n) {
  testiCards[testiIndex].classList.remove('active');
  testiIndex = (n + testiCards.length) % testiCards.length;
  testiCards[testiIndex].classList.add('active');
  if (testiDotsEl) {
    testiDotsEl.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === testiIndex));
  }
}

document.getElementById('testPrev')?.addEventListener('click', () => { showTesti(testiIndex - 1); resetAuto(); });
document.getElementById('testNext')?.addEventListener('click', () => { showTesti(testiIndex + 1); resetAuto(); });

function resetAuto() {
  clearInterval(testiAuto);
  testiAuto = setInterval(() => showTesti(testiIndex + 1), 4000);
}

buildTestiDots();
resetAuto();

// ---- COUNTERS ----
function animateCounters() {
  document.querySelectorAll('.counter-num').forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = target / 60;
    const iv = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current);
      if (current >= target) clearInterval(iv);
    }, 25);
  });
}

// ---- SKILL BARS ----
function animateSkillBars() {
  document.querySelectorAll('.skill-bar').forEach(bar => {
    const fill = bar.querySelector('.skill-fill');
    const width = bar.dataset.width + '%';
    setTimeout(() => { fill.style.width = width; }, 100);
  });
}

// ---- SCROLL REVEAL ----
function initReveal() {
  const items = document.querySelectorAll('.section-header, .skill-card, .service-card, .port-card, .highlight-card, .counter-card, .testi-card, .about-img-wrap, .about-text-col, .contact-info, .contact-form-wrap');
  items.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(el => io.observe(el));
}

// ---- COUNTER OBSERVER ----
function initCounters() {
  const section = document.querySelector('.counters');
  if (!section) return;
  let triggered = false;
  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !triggered) {
      triggered = true;
      animateCounters();
    }
  }, { threshold: 0.3 });
  io.observe(section);
}

// ---- SKILLS OBSERVER ----
function initSkills() {
  const section = document.querySelector('.skills');
  if (!section) return;
  let triggered = false;
  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !triggered) {
      triggered = true;
      animateSkillBars();
    }
  }, { threshold: 0.2 });
  io.observe(section);
}

// ---- GSAP ANIMATIONS ----
function initGSAP() {
  if (typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  // Hero text
  gsap.fromTo('.hero-tag', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.2 });
  gsap.fromTo('.hero-name', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.4 });
  gsap.fromTo('.hero-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.6 });
  gsap.fromTo('.hero-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.75 });
  gsap.fromTo('.hero-btns', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.9 });
  gsap.fromTo('.hero-img-wrap', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1, delay: 0.5, ease: 'back.out(1.5)' });

  // Services on scroll
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.from('.service-card', {
      scrollTrigger: { trigger: '.services-grid', start: 'top 80%' },
      opacity: 0, y: 40, duration: 0.6, stagger: 0.1, ease: 'power2.out'
    });
  }
}

// ---- SEND EMAIL (MAILTO) ----
window.sendEmail = function() {
  const name = document.getElementById('cName')?.value.trim();
  const email = document.getElementById('cEmail')?.value.trim();
  const msg = document.getElementById('cMsg')?.value.trim();
  if (!name || !email || !msg) { alert('Please fill all fields.'); return; }
  const subject = encodeURIComponent('Project Inquiry from ' + name);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
  window.open(`mailto:ABDULREHMANABBASI2441@GMAIL.COM?subject=${subject}&body=${body}`);
};

// ---- SMOOTH ANCHOR ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- INIT ----
function initAnimations() {
  initReveal();
  initCounters();
  initSkills();
  initGSAP();
}

// Fallback if loader already done
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader && loader.classList.contains('hidden')) return;
  // Already handled by loader
});
