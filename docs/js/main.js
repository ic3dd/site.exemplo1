(function () {
  "use strict";

  var siteHeader = document.getElementById("site-header");
  var menuBtn = document.getElementById("nav-menu-btn");
  var mobileMenu = document.getElementById("mobile-nav-menu");
  var contactForm = document.getElementById("contact-form");
  var contactHint = document.getElementById("contact-form-hint");
  var DEV_EMAIL = "santiagoesteves35@gmail.com";
  var MOBILE_BREAKPOINT = 1024;

  function isMobileNav() {
    return window.innerWidth < MOBILE_BREAKPOINT;
  }

  function setMobileMenuHidden(hidden) {
    if (mobileMenu) {
      mobileMenu.setAttribute("aria-hidden", hidden ? "true" : "false");
    }
  }

  function closeMobileMenu() {
    if (mobileMenu) {
      mobileMenu.classList.remove("is-open");
    }
    if (menuBtn) {
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Abrir menu");
    }
    document.body.classList.remove("menu-open");
    setMobileMenuHidden(true);
  }

  function openMobileMenu() {
    if (mobileMenu) {
      mobileMenu.classList.add("is-open");
    }
    if (menuBtn) {
      menuBtn.setAttribute("aria-expanded", "true");
      menuBtn.setAttribute("aria-label", "Fechar menu");
    }
    document.body.classList.add("menu-open");
    setMobileMenuHidden(false);
  }

  function toggleMobileMenu() {
    if (!mobileMenu) return;
    var open = !mobileMenu.classList.contains("is-open");
    if (open) {
      openMobileMenu();
    } else {
      closeMobileMenu();
    }
  }

  function scrollToSection(id) {
    closeMobileMenu();
    var el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  document.querySelectorAll("[data-scroll]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-scroll");
      if (id) scrollToSection(id);
    });
  });

  document.addEventListener(
    "click",
    function (e) {
      var anchor = e.target.closest("a[href^='#']");
      if (!anchor || anchor.getAttribute("href") === "#") return;
      var href = anchor.getAttribute("href");
      if (href.length < 2) return;
      var id = href.slice(1);
      if (!document.getElementById(id)) return;
      e.preventDefault();
      scrollToSection(id);
    },
    false
  );

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleMobileMenu();
    });

    mobileMenu.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  document.addEventListener("click", function (e) {
    if (!mobileMenu || !mobileMenu.classList.contains("is-open")) return;
    var nav = document.getElementById("site-nav");
    if (nav && nav.contains(e.target)) return;
    closeMobileMenu();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMobileMenu();
    }
  });

  window.addEventListener(
    "resize",
    function () {
      if (!isMobileNav()) {
        closeMobileMenu();
      }
    },
    { passive: true }
  );

  function onScrollHeader() {
    if (!siteHeader) return;
    if (window.scrollY > 12) {
      siteHeader.classList.add("site-header--scrolled");
    } else {
      siteHeader.classList.remove("site-header--scrolled");
    }
  }

  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  if (contactForm && contactHint) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      contactHint.textContent = "";

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      var name = document.getElementById("contact-name").value.trim();
      var email = document.getElementById("contact-email").value.trim();
      var business = document.getElementById("contact-business").value.trim();
      var phone = document.getElementById("contact-phone").value.trim();
      var projectType = document.getElementById("contact-type").value;
      var message = document.getElementById("contact-message").value.trim();

      var subject = encodeURIComponent(
        "Pedido de orçamento — " + (business || name || "site para negócio local")
      );
      var body = encodeURIComponent(
        "Olá Santiago,\n\n" +
          "Gostaria de pedir um orçamento.\n\n" +
          "---\n" +
          "Nome: " +
          name +
          "\n" +
          "Email: " +
          email +
          "\n" +
          "Negócio: " +
          (business || "—") +
          "\n" +
          "Telefone: " +
          (phone || "—") +
          "\n" +
          "Tipo de projecto: " +
          projectType +
          "\n\n" +
          "Mensagem:\n" +
          message +
          "\n"
      );

      window.location.href = "mailto:" + DEV_EMAIL + "?subject=" + subject + "&body=" + body;
      contactHint.textContent =
        "Abrindo o seu email. Se nada acontecer, envie para " + DEV_EMAIL + " com os mesmos dados.";
    });
  }

  var fadeEls = document.querySelectorAll("[data-fade]");
  if (fadeEls.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    fadeEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
