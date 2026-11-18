
/* =========================================
   SANJAY V. PORTFOLIO
   FIXED MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Portfolio JavaScript loaded!");

    // =====================================
    // 1. MOBILE NAVIGATION
    // =====================================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        console.log("Mobile navigation initialized!");

        menuToggle.addEventListener("click", function (event) {

            event.stopPropagation();

            const isOpen = navLinks.classList.toggle("open");

            menuToggle.textContent = isOpen ? "✕" : "☰";

            menuToggle.setAttribute("aria-expanded", isOpen);

        });

        // Close after clicking navigation links
        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("open");

                menuToggle.textContent = "☰";

                menuToggle.setAttribute("aria-expanded", "false");

            });

        });

        // Close when clicking outside
        document.addEventListener("click", function (event) {

            if (
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                navLinks.classList.remove("open");

                menuToggle.textContent = "☰";

                menuToggle.setAttribute("aria-expanded", "false");

            }

        });

    } else {

        console.error("Mobile menu elements not found!");

    }


    // =====================================
    // 2. DARK / LIGHT MODE
    // =====================================

    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {

        console.log("Theme toggle initialized!");

        // Load saved theme
        let savedTheme = "light";

        try {
            savedTheme = localStorage.getItem("sanjayPortfolioTheme") || "light";
        } catch (error) {
            console.warn("Could not read saved theme.");
        }

        function applyTheme(theme) {

            const isDark = theme === "dark";

            document.body.classList.toggle("dark-mode", isDark);

            themeToggle.textContent = isDark ? "☀️" : "🌙";

            themeToggle.setAttribute(
                "aria-label",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );

        }

        applyTheme(savedTheme);

        themeToggle.addEventListener("click", function () {

            const isDark = document.body.classList.contains("dark-mode");

            const newTheme = isDark ? "light" : "dark";

            applyTheme(newTheme);

            try {
                localStorage.setItem("sanjayPortfolioTheme", newTheme);
            } catch (error) {
                console.warn("Could not save theme.");
            }

            console.log("Current theme:", newTheme);

        });

    } else {

        console.error("Theme button not found!");

    }


    // =====================================
    // 3. SKILL PROGRESS BARS
    // =====================================

    const progressBars = document.querySelectorAll(".progress-fill");

    console.log("Skill bars found:", progressBars.length);

    function setSkillProgress(bar) {

        const level = parseFloat(bar.getAttribute("data-level"));

        if (!Number.isFinite(level)) {
            console.error("Invalid skill level:", bar);
            return;
        }

        const safeLevel = Math.max(0, Math.min(100, level));

        bar.style.width = safeLevel + "%";

    }

    if ("IntersectionObserver" in window) {

        const skillObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        setSkillProgress(entry.target);

                        observer.unobserve(entry.target);

                    }

                });

            },
            { threshold: 0.1 }
        );

        progressBars.forEach(function (bar) {
            skillObserver.observe(bar);
        });

    } else {

        progressBars.forEach(setSkillProgress);

    }


    // =====================================
    // 4. FOOTER YEAR
    // =====================================

    const yearElement = document.getElementById("year");

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }


    // =====================================
    // 5. FINAL STATUS
    // =====================================

    console.log("All portfolio scripts initialized!");

});
