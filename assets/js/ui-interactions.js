// ui-interactions.js
// ✅ Purpose: Controls small UI features (menu, tabs, dynamic year)

// Set current year if element exists
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Mobile menu toggle (enhanced with GSAP when available)
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (!mobileToggle || !mobileNav) {
    // elements not present on this page — fine, nothing to do
    // console.debug('mobileToggle or mobileNav not found; skipping mobile menu init.');
    return;
  }

  // ensure aria attributes for accessibility
  mobileToggle.setAttribute('aria-controls', 'mobileNav');
  mobileToggle.setAttribute('aria-expanded', mobileNav.classList.contains('hidden') ? 'false' : 'true');

  mobileToggle.addEventListener('click', () => {
    const isHidden = mobileNav.classList.contains('hidden');
    mobileToggle.setAttribute('aria-expanded', isHidden ? 'true' : 'false');

    // If GSAP is available use it for a nicer animation
    if (window.gsap) {
      if (isHidden) {
        // show then animate in
        mobileNav.classList.remove('hidden');
        // small fade + slide from top
        gsap.fromTo(mobileNav, {autoAlpha: 0, y: -12}, {duration: 0.36, autoAlpha: 1, y: 0, ease: 'power2.out'});
        // stagger links inside
        const links = mobileNav.querySelectorAll('a');
        if (links && links.length) {
          gsap.fromTo(links, {y: 8, autoAlpha: 0}, {y: 0, autoAlpha: 1, stagger: 0.04, delay: 0.06, ease: 'power2.out'});
        }
      } else {
        // animate out then hide
        gsap.to(mobileNav, {duration: 0.22, autoAlpha: 0, y: -8, ease: 'power2.in', onComplete: () => mobileNav.classList.add('hidden')});
      }
    } else {
      // fallback: simple class toggle
      mobileNav.classList.toggle('hidden');
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
  initMobileMenu();
}

// Service tab logic (used in "Our Services" section)
const serviceTabs = document.querySelectorAll(".design-frame nav .tab-link");
const serviceContents = document.querySelectorAll(".service-content .tab-content");

if (serviceTabs.length && serviceContents.length) {
  serviceTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-tab");
      const targetContent = document.getElementById(targetId);

      serviceTabs.forEach((t) => t.classList.remove("active"));
      serviceContents.forEach((c) => c.classList.remove("active"));

      tab.classList.add("active");
      if (targetContent) targetContent.classList.add("active");
    });
  });
}
