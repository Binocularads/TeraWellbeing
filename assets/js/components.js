// components.js
// ✅ Purpose: Handles sliders, carousels, and counters across the site

// --- Testimonials Carousel ---
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("testimonial-carousel");
  if (!carousel) return;

  const track = document.getElementById("testimonial-track");
  const prevBtn = document.getElementById("testimonial-prev");
  const nextBtn = document.getElementById("testimonial-next");
  const dotsContainer = document.getElementById("testimonial-dots");

  if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

  const slides = Array.from(track.children);
  const dots = [];

  slides.forEach((slide, index) => {
    slide.dataset.index = index;
    const dot = document.createElement("button");
    dot.classList.add("testimonial-dot");
    dot.dataset.index = index;
    dot.addEventListener("click", () => scrollToSlide(index));
    dotsContainer.appendChild(dot);
    dots.push(dot);
  });

  function scrollToSlide(index) {
    slides[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center"
    });
  }

  nextBtn.addEventListener("click", () => {
    const currentIndex = slides.findIndex((s) =>
      s.classList.contains("is-visible")
    );
    const nextIndex = (currentIndex + 1) % slides.length;
    scrollToSlide(nextIndex);
  });

  prevBtn.addEventListener("click", () => {
    const currentIndex = slides.findIndex((s) =>
      s.classList.contains("is-visible")
    );
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    scrollToSlide(prevIndex);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      let visibleIndex = -1;
      entries.forEach((entry) => {
        slides.forEach((s) => s.classList.remove("is-visible"));
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          visibleIndex = parseInt(entry.target.dataset.index);
          entry.target.classList.add("is-visible");
        }
      });
      if (visibleIndex !== -1)
        dots.forEach((dot, i) => dot.classList.toggle("active", i === visibleIndex));
    },
    { root: track.parentElement, threshold: 0.6 }
  );

  slides.forEach((slide) => observer.observe(slide));
  dots[0]?.classList.add("active");
});

// --- Brand Partners Carousel ---
(function () {
  const carousel = document.querySelector(".partners-carousel");
  const pages = Array.from(document.querySelectorAll(".partners-page"));
  const dots = Array.from(document.querySelectorAll(".dot"));
  const wrapper = document.querySelector(".partners-carousel-wrapper");
  let current = 0;

  if (!carousel || !wrapper || !pages.length || !dots.length) return;

  function showPage(index, smooth = true) {
    index = Math.max(0, Math.min(index, pages.length - 1));
    current = index;
    const width = wrapper.clientWidth;
    const x = -index * width;
    carousel.style.transition = smooth
      ? "transform 450ms cubic-bezier(.22,.9,.28,1)"
      : "none";
    carousel.style.transform = `translateX(${x}px)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  dots.forEach((d) =>
    d.addEventListener("click", () =>
      showPage(parseInt(d.getAttribute("data-index")), true)
    )
  );

  window.addEventListener("resize", () => showPage(current, false));

  let startX = 0,
    isDown = false;
  wrapper.addEventListener("pointerdown", (e) => {
    isDown = true;
    startX = e.clientX;
    carousel.style.transition = "none";
  });
  wrapper.addEventListener("pointermove", (e) => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    const width = wrapper.clientWidth;
    carousel.style.transform = `translateX(${-current * width + dx}px)`;
  });
  wrapper.addEventListener("pointerup", (e) => {
    if (!isDown) return;
    isDown = false;
    const dx = e.clientX - startX;
    const width = wrapper.clientWidth;
    if (dx < -60 && current < pages.length - 1) current++;
    if (dx > 60 && current > 0) current--;
    showPage(current, true);
  });

  showPage(0, false);
})();

// --- Animated Counters ---
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll("#temple-health .counter");
  if (!counters.length) return;

  function animateCounter(counter) {
    const target = parseInt(counter.dataset.target, 10) || 0;
    const duration = 2000;
    let start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const value = Math.floor(progress * target);
      counter.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else counter.textContent = target.toLocaleString() + "+";
    }

    requestAnimationFrame(step);
  }

  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );

  counters.forEach((c) => io.observe(c));
});
