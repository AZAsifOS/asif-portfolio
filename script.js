// Mobile navigation
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open navigation');
}));

// Persistent animated light/dark theme
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
function setTheme(light) {
  root.classList.toggle('light-mode', light);
  themeToggle?.setAttribute('aria-pressed', String(light));
  themeToggle?.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', light ? '#f9f6d3' : '#090e1b');
  try { localStorage.setItem('portfolio-theme', light ? 'light' : 'dark'); } catch (error) { /* storage may be unavailable */ }
}
let initialLight = root.classList.contains('light-mode');
try { initialLight = localStorage.getItem('portfolio-theme') === 'light'; } catch (error) {}
setTheme(initialLight);
themeToggle?.addEventListener('click', () => setTheme(!root.classList.contains('light-mode')));

// Current year
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Preloader
window.addEventListener('load', () => {
  window.setTimeout(() => document.querySelector('.page-loader')?.classList.add('loaded'), 350);
});
window.setTimeout(() => document.querySelector('.page-loader')?.classList.add('loaded'), 2200);

// Typing headline
const typingTarget = document.getElementById('typingText');
const roles = ['Aspiring Web Developer', 'CSE Graduate', 'Problem Solver', 'Technology Enthusiast'];
let roleIndex = 0, charIndex = roles[0].length, deleting = false;
function typeRole() {
  if (!typingTarget || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const current = roles[roleIndex];
  charIndex += deleting ? -1 : 1;
  typingTarget.textContent = current.slice(0, charIndex);
  let delay = deleting ? 48 : 85;
  if (!deleting && charIndex === current.length) { deleting = true; delay = 1450; }
  else if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 350; }
  window.setTimeout(typeRole, delay);
}
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) window.setTimeout(typeRole, 1800);

// Scroll reveal
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealItems.forEach(item => revealObserver.observe(item));
} else revealItems.forEach(item => item.classList.add('is-visible'));

// Scroll progress and active navigation
const progress = document.getElementById('scrollProgress');
const sections = [...document.querySelectorAll('main section[id]')];
function updateScrollUI() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  let current = 'home';
  sections.forEach(section => { if (window.scrollY >= section.offsetTop - 150) current = section.id; });
  navLinks?.querySelectorAll('a').forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}
window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

// Subtle cursor glow on pointer devices
const cursorGlow = document.getElementById('cursorGlow');
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  window.addEventListener('pointermove', event => {
    if (cursorGlow) { cursorGlow.style.left = `${event.clientX}px`; cursorGlow.style.top = `${event.clientY}px`; }
  }, { passive: true });
}

// Project screenshot gallery
const hardwareProjectImages = [

  { src: 'images/hardware-home.png', caption: 'Asif Hardware — Homepage' },

  { src: 'images/hardware-products.png', caption: 'Asif Hardware — Products Section' },

  { src: 'images/hardware-admin.png', caption: 'Asif Hardware — Admin Dashboard' },

  { src: 'images/hardware-admin 2.png', caption: 'Asif Hardware — Admin Screenshot 2' },

  { src: 'images/hardware-admin 3.png', caption: 'Asif Hardware — Admin Screenshot 3' }

];

const mindScopeProjectImages = [

  { src: 'images/mindscope-preview.png', caption: 'MindScope — Homepage' },

  { src: 'images/mindscope-homepage.png', caption: 'MindScope — Homepage Preview' },

  { src: 'images/mindscope-assessment.png', caption: 'MindScope — Assessment' },

  { src: 'images/mindscope-assessment question depth.png', caption: 'MindScope — Assessment Question Details' },

  { src: 'images/mindscope-assessment 1.png', caption: 'MindScope — Assessment Preview 1' },

  { src: 'images/mindscope-assessment 2.png', caption: 'MindScope — Assessment Preview 2' },

  { src: 'images/mindscope-results & explanation.png', caption: 'MindScope — Results & Explanation' }

];

let projectImages = hardwareProjectImages;

let currentImage = 0;
const lightbox = document.getElementById('projectLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxCount = document.getElementById('lightboxCount');
function showImage() {
  if (!lightboxImage) return;
  lightboxImage.src = projectImages[currentImage].src;
  lightboxCaption.textContent = projectImages[currentImage].caption;
  lightboxCount.textContent = `${currentImage + 1} / ${projectImages.length}`;
}
function openGallery() {
  currentImage = 0; showImage(); lightbox?.classList.add('active');
  lightbox?.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
}
function closeGallery() {
  lightbox?.classList.remove('active'); lightbox?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
function changeImage(direction) { currentImage = (currentImage + direction + projectImages.length) % projectImages.length; showImage(); }
document.getElementById('openGallery')?.addEventListener('click', () => {

  projectImages = hardwareProjectImages;
  openGallery();

});

document.getElementById('openMindScopeGallery')?.addEventListener('click', () => {

  projectImages = mindScopeProjectImages;
  openGallery();

});document.getElementById('lightboxClose')?.addEventListener('click', closeGallery);
document.getElementById('lightboxPrev')?.addEventListener('click', () => changeImage(-1));
document.getElementById('lightboxNext')?.addEventListener('click', () => changeImage(1));
lightbox?.addEventListener('click', event => { if (event.target === lightbox) closeGallery(); });
document.addEventListener('keydown', event => {
  if (!lightbox?.classList.contains('active')) return;
  if (event.key === 'Escape') closeGallery();
  if (event.key === 'ArrowLeft') changeImage(-1);
  if (event.key === 'ArrowRight') changeImage(1);
});


// Scroll-driven project presentation: the next project appears as the visitor scrolls.
(() => {
  const stage = document.getElementById('projectScrollStage');
  const track = stage?.querySelector('.project-scroll-track');
  const cards = track ? [...track.querySelectorAll('.project-card')] : [];
  const progressBar = document.getElementById('projectScrollProgress');
  if (!stage || cards.length < 2) return;

  let activeIndex = -1;
  let ticking = false;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function updateProjectOnScroll() {
    const rect = stage.getBoundingClientRect();
    const scrollableDistance = Math.max(1, stage.offsetHeight - window.innerHeight);
    const travelled = Math.min(scrollableDistance, Math.max(0, -rect.top));
    const progress = travelled / scrollableDistance;
    const nextIndex = Math.min(cards.length - 1, Math.floor(progress * cards.length + 0.0001));

    if (nextIndex !== activeIndex) {
      activeIndex = nextIndex;
      cards.forEach((card, index) => {
        const active = index === activeIndex;
        card.classList.toggle('is-scroll-active', active);
        card.classList.toggle('is-scroll-before', index < activeIndex);
        card.setAttribute('aria-hidden', String(!active));
        card.querySelectorAll('a, button').forEach(control => {
          if (active) control.removeAttribute('tabindex');
          else control.setAttribute('tabindex', '-1');
        });
      });
    }

    if (progressBar) {
      progressBar.style.transform = `translateY(${progress * 100}%)`;
    }
    ticking = false;
  }

  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateProjectOnScroll);
    }
  }

  cards.forEach((card, index) => {
    card.classList.toggle('is-scroll-active', index === 0);
    card.setAttribute('aria-hidden', String(index !== 0));
    if (index !== 0) card.querySelectorAll('a, button').forEach(control => control.setAttribute('tabindex', '-1'));
  });
  activeIndex = 0;
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  if (reducedMotion) track.classList.add('reduced-motion');
  requestUpdate();
})();
