// aos-init.js
// ✅ Purpose: Initialize and refresh AOS animations safely

AOS.init({
  once: true,
  easing: "ease-out-cubic",
  duration: 650
});

// Safely refresh AOS (prevents runtime crashes)
function safeAOSRefresh() {
  try {
    if (window.AOS && typeof AOS.refreshHard === "function") AOS.refreshHard();
    else if (window.AOS) AOS.refresh();
  } catch (e) {
    console.debug("AOS refresh failed:", e);
  }
}

// Refresh AOS on page load and a short delay
window.addEventListener("load", () => {
  safeAOSRefresh();
  setTimeout(safeAOSRefresh, 600);
});

// Refresh AOS whenever images load
document.querySelectorAll("img").forEach((img) => {
  if (!img.complete) {
    img.addEventListener("load", () => {
      try {
        if (window.AOS) AOS.refresh();
      } catch (e) {}
    });
  }
});
