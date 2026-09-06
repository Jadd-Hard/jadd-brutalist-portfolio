import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Respects users who have "reduce motion" turned on in their OS settings
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// Detect if user is on a touch device (phone or tablet)
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

// 1. Smooth Scroll (Lenis)
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Hero Text Animation
if (!prefersReducedMotion) {
  gsap.set('[data-hero-reveal]', { opacity: 0, y: 20 });
  ScrollTrigger.batch('[data-hero-reveal]', {
    onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: "power3.out" })
  });
} else {
  gsap.set('[data-hero-reveal]', { opacity: 1, y: 0 });
}

// 3. Custom Cursor
const cursor = document.querySelector('.custom-cursor');

if (!isTouchDevice && !prefersReducedMotion) {
  document.body.classList.add('custom-cursor-active');
  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  function renderCursor() {
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();
}