(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealTargets = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));

  if (!reduceMotion && "IntersectionObserver" in window) {
    revealTargets.forEach(function (target, index) {
      target.classList.add("reveal-ready");
      target.style.setProperty("--reveal-delay", Math.min(index % 4, 3) * 55 + "ms");
    });

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    revealTargets.forEach(function (target) {
      revealObserver.observe(target);
    });
  }

  var sectionNavs = Array.prototype.slice.call(document.querySelectorAll(".section-nav"));

  if ("IntersectionObserver" in window) {
    sectionNavs.forEach(function (nav) {
      var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
      var sections = links.map(function (link) {
        return document.getElementById(link.getAttribute("href").slice(1));
      }).filter(Boolean);

      if (!sections.length) return;

      var setCurrent = function (activeLink) {
        links.forEach(function (link) {
          if (link === activeLink) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      };

      var syncCurrentToHash = function () {
        var hashLink = links.find(function (link) {
          return link.getAttribute("href") === window.location.hash;
        });
        setCurrent(hashLink || links[0]);
      };

      links.forEach(function (link) {
        link.addEventListener("click", function () {
          setCurrent(link);
        });
      });

      window.addEventListener("hashchange", syncCurrentToHash);
      syncCurrentToHash();

      var sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          var activeLink = links.find(function (link) {
            return link.getAttribute("href") === "#" + entry.target.id;
          });
          if (activeLink) setCurrent(activeLink);
        });
      }, { rootMargin: "-20% 0px -60%", threshold: 0 });

      sections.forEach(function (section) {
        sectionObserver.observe(section);
      });
    });
  }
}());
