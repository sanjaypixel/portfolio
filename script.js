// =========================
// SANJAY V. PORTFOLIO
// Main JavaScript
// =========================

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Dark / Light theme with saved preference
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("sanjayPortfolioTheme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}

function updateThemeButton() {
  if (!themeToggle) return;
  const isDark = document.body.classList.contains("dark-mode");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

updateThemeButton();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const selectedTheme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("sanjayPortfolioTheme", selectedTheme);
    updateThemeButton();
  });
}

// Animate skill bars when the skills section enters the screen

// Animate skill bars individually when they enter the screen
const progressBars = document.querySelectorAll(".progress-fill");

function animateSkillBar(bar) {
  const level = Math.max(
    0,
    Math.min(100, Number(bar.dataset.level) || 0)
  );

  bar.style.width = `${level}%`;
}

if ("IntersectionObserver" in window) {
  const skillObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkillBar(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1
    }
  );

  progressBars.forEach((bar) => {
    skillObserver.observe(bar);
  });

} else {
  progressBars.forEach((bar) => {
    animateSkillBar(bar);
  });
}


// Current year in footer
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Friendly notice if resume PDF has not yet been added
const resumeLink = document.querySelector(".btn-resume");
const resumeNote = document.getElementById("resumeNote");
if (resumeLink && resumeNote) {
  resumeLink.addEventListener("click", (event) => {
    // If the PDF is not present, the browser may show a not-found page.
    // Add the real PDF at the documented path before publishing.
  });
}
