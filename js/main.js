/* ========================================
   白果儿科技 - Bygoer Technology
   Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNoticeBar();
  initNavScroll();
  initMobileMenu();
  initScrollReveal();
  initSmoothScroll();
});

/* ---------- Notice Bar ---------- */
function initNoticeBar() {
  const track = document.querySelector('.notice-track');
  if (!track) return;

  fetch('content/notices.md')
    .then(res => res.text())
    .then(md => parseNotices(md))
    .catch(() => {
      // Fallback notices
      track.innerHTML = generateNoticeHTML([
        { text: '白果儿科技官网正式上线', link: '#services' },
        { text: 'AI 驱动的企业数字化转型解决方案', link: '#services' },
        { text: '寻找技术合伙人，一起打造下一代 AI 智能体平台', link: '#about' }
      ]);
    });
}

function parseNotices(md) {
  const track = document.querySelector('.notice-track');
  const notices = [];
  const lines = md.split('\n');
  let inList = false;

  for (const line of lines) {
    if (line.startsWith('  - text:')) {
      const text = line.replace(/^\s*-\s*text:\s*["']?/, '').replace(/["']?\s*$/, '');
      notices.push({ text, link: '' });
    } else if (line.startsWith('    link:')) {
      const link = line.replace(/^\s*link:\s*["']?/, '').replace(/["']?\s*$/, '');
      if (notices.length > 0) notices[notices.length - 1].link = link;
    }
  }

  if (notices.length === 0) {
    notices.push(
      { text: '白果儿科技官网正式上线', link: '#services' },
      { text: 'AI 驱动的企业数字化转型解决方案', link: '#services' }
    );
  }

  track.innerHTML = generateNoticeHTML(notices);
}

function generateNoticeHTML(notices) {
  // Duplicate for seamless loop
  const items = [...notices, ...notices];
  return items.map(n =>
    `<div class="notice-item">${n.link ? `<a href="${n.link}">${n.text}</a>` : n.text}</div>`
  ).join('');
}

/* ---------- Nav Scroll Effect ---------- */
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const updateNav = () => {
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
}

/* ---------- Mobile Menu ---------- */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

/* ---------- Scroll Reveal ---------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ---------- Smooth Scroll ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      const offset = 64 + 36 + 16; // nav + notice + padding
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}
