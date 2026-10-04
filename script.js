/* ============ MOBILE MENU ============ */
const menuToggle = document.getElementById('menuToggle');
const mainnav    = document.getElementById('mainnav');

if (menuToggle && mainnav) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    mainnav.classList.toggle('open');
    document.body.style.overflow = mainnav.classList.contains('open') ? 'hidden' : '';
  });
}

/* Close menu when clicking a link */
if (mainnav) mainnav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 992) {
      if (menuToggle) menuToggle.classList.remove('open');
      if (mainnav) mainnav.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

/* ============ MOBILE DROPDOWNS ============ */
document.querySelectorAll('.dropdown > a').forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    if (window.innerWidth <= 992) {
      e.preventDefault();
      const parent = trigger.parentElement;
      const wasOpen = parent.classList.contains('open');
      document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
      if (!wasOpen) parent.classList.add('open');
    }
  });
});

/* ============ HERO SLIDER ============ */
// Guard the slider code so the same script also works on category pages.
const slides = Array.from(document.querySelectorAll('.hero__slide'));
const dots = Array.from(document.querySelectorAll('#heroDots span'));
const prevBtn = document.getElementById('heroPrev');
const nextBtn = document.getElementById('heroNext');
let currentSlide = Math.max(0, slides.findIndex(slide => slide.classList.contains('is-active')));
let slideTimer = null;

function goToSlide(index) {
  if (!slides.length) return;
  index = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    slide.classList.toggle('is-active', i === index);
    slide.setAttribute('aria-hidden', i === index ? 'false' : 'true');
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('is-active', i === index);
    dot.setAttribute('aria-current', i === index ? 'true' : 'false');
  });
  currentSlide = index;
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }
function startAuto() {
  if (slides.length < 2) return;
  if (slideTimer) clearInterval(slideTimer);
  slideTimer = setInterval(nextSlide, 6000);
}

if (slides.length) {
  goToSlide(currentSlide);
  if (nextBtn) nextBtn.addEventListener('click', (event) => {
    event.preventDefault(); event.stopPropagation(); nextSlide(); startAuto();
  });
  if (prevBtn) prevBtn.addEventListener('click', (event) => {
    event.preventDefault(); event.stopPropagation(); prevSlide(); startAuto();
  });
  dots.forEach((dot, i) => {
    dot.setAttribute('role', 'button');
    dot.setAttribute('tabindex', '0');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    const selectDot = () => { goToSlide(i); startAuto(); };
    dot.addEventListener('click', selectDot);
    dot.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectDot(); }
    });
  });
  startAuto();
}

/* ============ TOUCH SWIPE (mobile) ============ */
let touchStartX = 0;
const heroEl = document.querySelector('.hero');

if (heroEl && slides.length) {
  heroEl.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  heroEl.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) {
      diff < 0 ? nextSlide() : prevSlide();
      startAuto();
    }
  }, { passive: true });
}

/* ============ CLOSE MOBILE MENU ON RESIZE ============ */
window.addEventListener('resize', () => {
  if (window.innerWidth > 992) {
    if (menuToggle) menuToggle.classList.remove('open');
    if (mainnav) mainnav.classList.remove('open');
    document.body.style.overflow = '';
    document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
  }
});

// Quote form: retain the email-app fallback and provide clear feedback.
const quoteForm = document.getElementById('quoteForm');
const quoteFormNote = document.getElementById('quoteFormNote');
if (quoteForm && quoteFormNote) {
  quoteForm.addEventListener('submit', () => {
    quoteFormNote.textContent = "Your email app should open with your quote request details. To receive submissions directly without relying on the visitor email app, connect this form to a form service before publishing.";
    quoteFormNote.classList.add('is-active');
  });
}
