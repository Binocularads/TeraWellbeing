/* Services tab switching and keyboard accessible behavior */
(function () {
  const tabButtons = document.querySelectorAll(".services-tabs .tab-btn");
  const panels = document.querySelectorAll(".tab-panel");

  function showPanel(idBtn) {
    const target = idBtn.getAttribute("data-tab");
    // toggle active on buttons
    tabButtons.forEach(b => {
      b.classList.toggle("active", b === idBtn);
      b.setAttribute("aria-selected", b === idBtn ? "true" : "false");
    });
    // show/hide panels
    panels.forEach(p => {
      if (p.id === target) {
        p.removeAttribute("hidden");
        p.setAttribute("data-active", "");
      } else {
        p.setAttribute("hidden", "");
        p.removeAttribute("data-active");
      }
    });
    // on small screens, if the clicked tab is off-screen, scroll it into view nicely
    if (window.innerWidth <= 640) {
      idBtn.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => showPanel(btn));
    btn.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const idx = Array.from(tabButtons).indexOf(btn);
        const next = e.key === "ArrowRight" ? (idx + 1) % tabButtons.length : (idx - 1 + tabButtons.length) % tabButtons.length;
        tabButtons[next].focus();
      }
    });
  });

  // Initialize: ensure one panel shown
  if (tabButtons.length) showPanel(tabButtons[0]);
})();
