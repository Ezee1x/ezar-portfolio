function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// ===== Modal open/close =====
function openModal(selector) {
  const modal = document.querySelector(selector);
  if (!modal) return;
  modal.classList.add('open');
  document.body.classList.add('modal-open');
  // move focus into the dialog for accessibility
  const focusable = modal.querySelector('button, a, [tabindex]:not([tabindex="-1"])');
  (focusable || modal).focus({ preventScroll: true });
}

function closeModal(modal) {
  modal.classList.remove('open');
  document.body.classList.remove('modal-open');
}

// open via [data-modal-target]
document.addEventListener('click', (e) => {
  const opener = e.target.closest('[data-modal-target]');
  if (opener) {
    const target = opener.getAttribute('data-modal-target');
    openModal(target);
  }
});

// close via backdrop or [data-close-modal]
document.addEventListener('click', (e) => {
  const isClose = e.target.matches('[data-close-modal]') || e.target.closest('[data-close-modal]');
  if (isClose) {
    const modal = e.target.closest('.modal');
    if (modal) closeModal(modal);
  }
});

// ESC to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.open').forEach(closeModal);
  }
});


