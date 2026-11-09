const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');
const header = document.querySelector('.site-header');
header.classList.add('menu-ready');
function updateHeaderOffset() {
  const pinned = ['fixed', 'sticky'].includes(getComputedStyle(header).position);
  document.documentElement.style.setProperty('--header-offset', pinned ? header.offsetHeight + 'px' : '0px');
}
updateHeaderOffset();
window.addEventListener('resize', updateHeaderOffset, {passive:true});
if ('ResizeObserver' in window) new ResizeObserver(updateHeaderOffset).observe(header);
if (location.hash === '#why') {
  window.addEventListener('load', () => {
    if (location.hash === '#why' && window.scrollY < 2) {
      document.getElementById('why')?.scrollIntoView({behavior:'instant',block:'start'});
    }
  }, {once:true});
}
menuToggle.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', String(menuToggle.getAttribute('aria-expanded') !== 'true'));
});
mainNav.addEventListener('click', event => {
  if (event.target.closest('a')) menuToggle.setAttribute('aria-expanded', 'false');
});
const spotlightInput = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
document.addEventListener('pointermove', event => {
  if (!spotlightInput.matches || event.pointerType === 'touch') return;
  const card = event.target.closest('.exhibit, .collection-card, .about-stats > div');
  if (!card) return;
  const bounds = card.getBoundingClientRect();
  card.style.setProperty('--spot-x', (event.clientX - bounds.left) + 'px');
  card.style.setProperty('--spot-y', (event.clientY - bounds.top) + 'px');
}, { passive:true });
