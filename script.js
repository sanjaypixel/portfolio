
/* =========================================
   SANJAY V. - PERSONAL PORTFOLIO
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  // =========================================
  // 1. MOBILE NAVIGATION
  // =========================================

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {

    function closeMenu() {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";
    }

    menuToggle.addEventListener("click", () => {

      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

      menuToggle.textContent = isOpen ? "✕" : "☰";

    });

    // Close menu after clicking a navigation link
    navLinks.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", closeMenu);

    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {

      const clickedInsideMenu = navLinks.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideMenu && !clickedToggle) {
        closeMenu();
      }

    });

    // Close menu using Escape key
    document.addEventListener("keydown", (event) => {

      if (event.key === "Escape") {
        closeMenu();
      }

    });

    // Reset mobile menu when switching to desktop size
    window.addEventListener("resize", () => {

      if (window.innerWidth > 768) {
        closeMenu();
      }

    });

  }


  // =========================================
  // 2. DARK / LIGHT THEME
  // =========================================

  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  function updateThemeButton() {

    if (!themeToggle) return;

    const isDark = body.classList.contains("dark-mode");

    themeToggle.textContent = isDark ? "☀️" : "🌙";

    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );

  }

  // Load saved theme
  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem("sanjayPortfolioTheme");
  } catch (error) {
    console.warn("Theme preference could not be loaded.");
  }

  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }

  updateThemeButton();

  // Change theme on click
  if (themeToggle) {

    themeToggle.addEventListener("click", () => {

      body.classList.toggle("dark-mode");

      const currentTheme = body.classList.contains("dark-mode")
        ? "dark"
        : "light";

      try {
        localStorage.setItem("sanjayPortfolioTheme", currentTheme);
      } catch (error) {
        console.warn("Theme preference could not be saved.");
      }

      updateThemeButton();

    });

  }


  // =========================================
  // 3. SKILL PROGRESS BARS
  // =========================================

  const progressBars = document.querySelectorAll(".progress-fill");

  function animateProgressBars() {

    progressBars.forEach((bar) => {

      const level = Number(bar.dataset.level);

      if (Number.isFinite(level)) {

        const safeLevel = Math.min(100, Math.max(0, level));

        bar.style.width = safeLevel + "%";

      }

    });

  }

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            const bar = entry.target;
            const level = Number(bar.dataset.level);

            if (Number.isFinite(level)) {
              bar.style.width =
                Math.min(100, Math.max(0, level)) + "%";
            }

            observerInstance.unobserve(bar);

          }

        });

      },
      {
        threshold: 0.2
      }
    );

    progressBars.forEach((bar) => {
      observer.observe(bar);
    });

  } else {

    animateProgressBars();

  }


  // =========================================
  // 4. FOOTER YEAR
  // =========================================

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  // =========================================
  // 5. CONSOLE MESSAGE
  // =========================================

  console.log("Sanjay V. Portfolio loaded successfully!");

});
