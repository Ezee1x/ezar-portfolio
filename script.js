/* ===========================
   EZAR SADEQUE — PORTFOLIO JS
   =========================== */

// ── Custom Cursor ──
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  if (dot) { dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px'; }
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  if (ring) { ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px'; }
  requestAnimationFrame(animateRing);
}
animateRing();

// ── Scroll Progress ──
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const total = document.body.scrollHeight - window.innerHeight;
  const pct = (window.scrollY / total) * 100;
  if (progressBar) progressBar.style.width = pct + '%';

  // Nav glass effect
  const nav = document.getElementById('desktop-nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Hamburger ──
function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  menu.classList.toggle('open');
  icon.classList.toggle('open');
}

// ── Scroll Reveal ──
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.style.animationDelay || '0s';
      const ms = parseFloat(delay) * 1000;
      setTimeout(() => el.classList.add('revealed'), ms);
      revealObs.unobserve(el);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObs.observe(el));

// ── Counter Animation ──
const counters = document.querySelectorAll('.stat-num');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'));
      let current = 0;
      const step = Math.ceil(target / 40);
      const interval = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current;
        if (current >= target) clearInterval(interval);
      }, 40);
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObs.observe(c));

// ── Typewriter ──
const roles = ['Engineer', 'Roboticist', 'Designer', 'Maker', 'Problem Solver'];
let roleIdx = 0, charIdx = 0, deleting = false;
const tw = document.getElementById('typewriter');

function typeLoop() {
  if (!tw) return;
  const current = roles[roleIdx];
  if (!deleting) {
    tw.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    tw.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 60 : 100);
}
typeLoop();

// ── Project Filters ──
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    cards.forEach(card => {
      const cat = card.getAttribute('data-category');
      if (filter === 'all' || cat === filter) {
        card.classList.remove('hidden');
        card.style.display = '';
      } else {
        card.classList.add('hidden');
        card.style.display = 'none';
      }
    });
  });
});

// ── 3D Tilt Effect ──
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 12;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -12;
    card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) translateZ(4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── Modal System ──
function openModal(selector) {
  const modal = document.querySelector(selector);
  if (!modal) return;
  modal.classList.add('open');
  document.body.classList.add('modal-open');
  const focusable = modal.querySelector('button, a, [tabindex]:not([tabindex="-1"])');
  (focusable || modal).focus({ preventScroll: true });
}

function closeModal(modal) {
  modal.querySelectorAll('video').forEach(v => v.pause());
  modal.classList.remove('open');
  document.body.classList.remove('modal-open');
}

document.addEventListener('click', (e) => {
  const opener = e.target.closest('[data-modal-target]');
  if (opener) openModal(opener.getAttribute('data-modal-target'));
});

document.addEventListener('keydown', (e) => {
  const opener = e.target.closest('[data-modal-target]');
  if (!opener || opener.matches('button, a[href]') || (e.key !== 'Enter' && e.key !== ' ')) return;
  e.preventDefault();
  openModal(opener.getAttribute('data-modal-target'));
});

document.addEventListener('click', (e) => {
  if (e.target.matches('[data-close-modal]') || e.target.closest('[data-close-modal]')) {
    const modal = e.target.closest('.modal');
    if (modal) closeModal(modal);
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') document.querySelectorAll('.modal.open').forEach(closeModal);
});
