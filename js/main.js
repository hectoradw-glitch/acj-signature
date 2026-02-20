/* ═══════════════════════════════════════════════
   ACJ SIGNATURE – main.js
   - Navbar scroll effect
   - Mobile menu toggle
   - Reveal on scroll (IntersectionObserver)
   - Pricing toggle (mensual / anual)
   - Copy code button
═══════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ─── Navbar scroll ────────────────────────── */
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  });

  /* ─── Hamburger / mobile menu ──────────────── */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  hamburger.addEventListener("click", () => {
    const open = hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open", open);
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("open");
    });
  });

  /* ─── Reveal on scroll ─────────────────────── */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ─── Pricing toggle ───────────────────────── */
  const btnMensual = document.getElementById("btnMensual");
  const btnAnual = document.getElementById("btnAnual");
  const priceAmounts = document.querySelectorAll(".plan-amount");

  function setMode(mode) {
    priceAmounts.forEach((el) => {
      el.style.opacity = "0";
      setTimeout(() => {
        el.textContent = el.dataset[mode];
        el.style.opacity = "1";
      }, 180);
    });
    btnMensual.classList.toggle("active", mode === "mensual");
    btnAnual.classList.toggle("active", mode === "anual");
  }

  btnMensual.addEventListener("click", () => setMode("mensual"));
  btnAnual.addEventListener("click", () => setMode("anual"));

  // Default: anual (muestra precios anuales activos)
  setMode("anual");

  /* ─── Copy code button ─────────────────────── */
  const copyBtn = document.getElementById("copyBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const codeEl = document.querySelector(".code-body code");
      if (!codeEl) return;
      navigator.clipboard
        .writeText(codeEl.innerText)
        .then(() => {
          copyBtn.textContent = "¡Copiado!";
          setTimeout(() => (copyBtn.textContent = "Copiar"), 2000);
        })
        .catch(() => {
          copyBtn.textContent = "Error";
          setTimeout(() => (copyBtn.textContent = "Copiar"), 2000);
        });
    });
  }

  /* ─── Smooth scroll for anchor links ──────── */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
})();
