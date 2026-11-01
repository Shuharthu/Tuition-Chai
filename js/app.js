/**
 * TUITION CHAI - Global Application Scripts & UI Interactions
 * Features: Dark/Light Mode Engine, Bilingual Switcher (EN/BN), Modals, Toast System
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initStickyHeader();
  initFaqAccordion();
  initLanguageSelector();
});

/* ================= THEME ENGINE (DARK / LIGHT) ================= */
function initTheme() {
  const savedTheme = localStorage.getItem('tc_theme') || 
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  applyTheme(savedTheme);

  // Bind all theme toggle buttons across the page
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      showToast('Theme Updated', `Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('tc_theme', theme);

  // Update theme toggle buttons aria-label
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
  });
}

/* ================= TOAST NOTIFICATION MANAGER ================= */
function showToast(title, message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" aria-label="Close">&times;</button>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));

  const closeBtn = toast.querySelector('.toast-close');
  const removeToast = () => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 250);
  };

  closeBtn.addEventListener('click', removeToast);
  setTimeout(removeToast, 4000);
}

/* ================= MODAL HELPERS ================= */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Global modal overlay click handler
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (e.target.closest('[data-modal-close]')) {
    const modal = e.target.closest('.modal-overlay');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
});

/* ================= STICKY HEADER ================= */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ================= MOBILE NAV TOGGLE ================= */
function initNavbar() {
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.innerHTML = isOpen ? 
        '<svg class="icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>' :
        '<svg class="icon" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>';
    });

    // Close when clicking any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>';
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !toggle.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>';
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>';
      }
    });
  }
}

/* ================= FAQ ACCORDION ================= */
function initFaqAccordion() {
  const accordions = document.querySelectorAll('.accordion-header');
  accordions.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const wasActive = item.classList.contains('active');
      
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
      
      if (!wasActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ================= LANGUAGE SELECTOR BINDINGS ================= */
function initLanguageSelector() {
  const enButtons = document.querySelectorAll('.lang-btn-en');
  const bnButtons = document.querySelectorAll('.lang-btn-bn');

  enButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.i18n) {
        window.i18n.setLanguage('en');
        showToast('Language Changed', 'Switched to English', 'info');
      }
    });
  });

  bnButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.i18n) {
        window.i18n.setLanguage('bn');
        showToast('ভাষা পরিবর্তিত', 'বাংলা ভাষা সক্রিয় করা হয়েছে', 'info');
      }
    });
  });
}

/* ================= TABS ================= */
function initTabs(containerSelector = '.tabs-container') {
  const containers = document.querySelectorAll(containerSelector);
  containers.forEach(c => {
    const tabs = c.querySelectorAll('.tab-btn');
    const contents = c.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-tab');

        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(cnt => cnt.classList.remove('active'));

        tab.classList.add('active');
        const targetContent = c.querySelector(`#${targetId}`);
        if (targetContent) targetContent.classList.add('active');
      });
    });
  });
}

/* Currency Formatter for BDT */
function formatBDT(amount) {
  return '৳ ' + Number(amount).toLocaleString('en-BD');
}

window.TuitionChai = {
  showToast,
  openModal,
  closeModal,
  initTabs,
  formatBDT,
  applyTheme
};
