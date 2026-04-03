(function () {
  "use strict";

  var menuBtn = document.getElementById("nav-menu-btn");
  var mobileMenu = document.getElementById("mobile-nav-menu");

  function scrollToSection(id) {
    if (mobileMenu) {
      mobileMenu.classList.remove("is-open");
    }
    if (menuBtn) {
      menuBtn.setAttribute("aria-expanded", "false");
    }
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

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function () {
      var open = !mobileMenu.classList.contains("is-open");
      mobileMenu.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
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
