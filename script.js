document.addEventListener('DOMContentLoaded', () => {
// ── CURSOR ─────────────────────────────────────────────────
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');

  if (!cursor || !cursorRing) {
    console.error('Cursor elements not found');
    return;
  }

  let mx = 0;
  let my = 0;
  let rx = 0;
  let ry = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;

    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;

    cursorRing.style.left = rx + 'px';
    cursorRing.style.top = ry + 'px';

    requestAnimationFrame(animRing);
  }

  animRing();

});

document.querySelectorAll('a,button').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.width='20px'; cursor.style.height='20px'; cursorRing.style.width='50px'; cursorRing.style.height='50px'; });
  el.addEventListener('mouseleave', () => { cursor.style.width='12px'; cursor.style.height='12px'; cursorRing.style.width='36px'; cursorRing.style.height='36px'; });
});

// ── HEADER SCROLL ──────────────────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// ── SCROLL REVEAL ──────────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // Skill bars
      e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 200);
      });
      // Timeline items
      if (e.target.classList.contains('timeline-item')) {
        e.target.classList.add('visible');
      }
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));

// Trigger skill bars on skills section
const skillsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.3 });
const skillsSection = document.getElementById('skills');
if (skillsSection) skillsObserver.observe(skillsSection);

// ── COUNTER ANIMATION ──────────────────────────────────────
function animateCounter(el, target) {
  let current = 0;
  const step  = target / 50;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { el.textContent = target + '+'; clearInterval(timer); }
    else { el.textContent = Math.floor(current) + '+'; }
  }, 30);
}
const heroObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.hero-stat-val').forEach(el => {
        const val = parseInt(el.textContent);
        animateCounter(el, val);
      });
      heroObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
const heroSection = document.getElementById('hero');
if (heroSection) heroObserver.observe(heroSection);

// ── SMOOTH NAV ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior:'smooth', block:'start' });
  });
});