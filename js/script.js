/* js/script.js
   Simple, human-readable JS for:
   - Mobile nav toggle
   - Theme toggle (persisted in localStorage)
   - Contact form fake-submit
   - Basic "reveal on load" animation triggers
*/

/* ---------- Helpers ---------- */
const qs = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => Array.from((ctx || document).querySelectorAll(sel));

/* ---------- Mobile nav toggles ----------
   There are multiple nav toggles for different pages (IDs differ).
   We attach listeners to any that exist.
*/
function setupNavToggle(navToggleId, navLinksId) {
  const toggle = qs(`#${navToggleId}`);
  const links = qs(`#${navLinksId}`);

  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.style.display === 'flex';
    links.style.display = isOpen ? '' : 'flex';
    // small animation for hamburger lines
    toggle.classList.toggle('open');
  });

  // close when clicking a link (mobile)
  qsa(`#${navLinksId} .nav-link`).forEach(a => a.addEventListener('click', () => {
    if (window.innerWidth < 680) links.style.display = '';
  }));
}

/* attempt to set up multiple nav toggles (pages have different ids) */
['navToggle','navToggle2','navToggle3','navToggle4'].forEach(id => {
  const navLinksId = id.replace('Toggle', 'Links');
  setupNavToggle(id, navLinksId);
});

/* ---------- Theme toggle ----------
   Adds/removes class 'light' on the .site wrapper so CSS variables switch.
   Persist choice to localStorage.
*/
function setupThemeToggle(toggleId) {
  const toggle = qs(`#${toggleId}`);
  const site = document.querySelector('.site');

  if (!toggle || !site) return;

  // initialize from storage
  const user = localStorage.getItem('portfolio_theme') || 'dark';
  if (user === 'light') site.classList.add('light');

  toggle.addEventListener('click', () => {
    site.classList.toggle('light');
    const isLight = site.classList.contains('light');
    localStorage.setItem('portfolio_theme', isLight ? 'light' : 'dark');
    // update all theme toggles on page (if multiple)
    qsa('.theme-toggle').forEach(btn => btn.textContent = isLight ? '☀️' : '🌙');
  });

  // sync initial icon
  qsa('.theme-toggle').forEach(btn => btn.textContent = site.classList.contains('light') ? '☀️' : '🌙');
}

// setup for possible toggle IDs on pages
['themeToggle','themeToggle2','themeToggle3','themeToggle4'].forEach(id => setupThemeToggle(id));

/* ---------- Simple contact form behavior ----------
   This prevents real submission and shows a friendly message. Replace with real backend later.
*/
const contactForm = qs('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = qs('#formStatus');
    status.textContent = 'Sending...';
    // emulate network delay
    setTimeout(() => {
      status.textContent = 'Thanks! Your message has been sent (demo). I will reply soon.';
      contactForm.reset();
    }, 900);
  });
}

/* ---------- Entrance animation (for browsers that support it) ----------
   The CSS already has fade-up classes for major elements.
   Here we add the class on DOMContentLoaded to trigger animations.
*/
document.addEventListener('DOMContentLoaded', () => {
  // add a small stagger for elements that are present
  qsa('.fade-up').forEach((el, i) => {
    el.style.animationDelay = `${i * 80}ms`;
    el.classList.add('fade-up'); // css handles animation
  });

  // close nav on resize (cleanup)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 680) {
      qsa('.nav-links').forEach(nav => nav.style.display = '');
    }
  });
});
