(function () {
  "use strict";

  var root = document.documentElement;
  var themeToggle = document.querySelector(".theme-toggle");
  var themeToggleLabel = themeToggle ? themeToggle.querySelector(".theme-toggle__label") : null;
  var themeColor = document.getElementById("theme-color");
  var themePreference = window.matchMedia("(prefers-color-scheme: dark)");
  var themeStorageKey = "danemalenfant-theme";

  var getSavedTheme = function () {
    try {
      var savedTheme = localStorage.getItem(themeStorageKey);
      return savedTheme === "light" || savedTheme === "dark" ? savedTheme : null;
    } catch (error) {
      return null;
    }
  };

  var applyTheme = function (theme, persist) {
    var isDark = theme === "dark";
    root.setAttribute("data-theme", isDark ? "dark" : "light");
    root.style.colorScheme = isDark ? "dark" : "light";

    if (themeColor) themeColor.setAttribute("content", isDark ? "#171516" : "#fffdfb");

    if (themeToggle) {
      var actionLabel = isDark ? "Switch to light mode" : "Switch to dark mode";
      themeToggle.setAttribute("aria-pressed", isDark ? "true" : "false");
      themeToggle.setAttribute("aria-label", actionLabel);
      themeToggle.setAttribute("title", actionLabel);
    }

    if (themeToggleLabel) themeToggleLabel.textContent = isDark ? "Day" : "Night";

    if (persist) {
      try {
        localStorage.setItem(themeStorageKey, isDark ? "dark" : "light");
      } catch (error) {
        // The selected theme still applies for this page when storage is unavailable.
      }
    }
  };

  applyTheme(root.getAttribute("data-theme") || (themePreference.matches ? "dark" : "light"), false);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
    });
  }

  var syncThemeToSystem = function (event) {
    if (!getSavedTheme()) applyTheme(event.matches ? "dark" : "light", false);
  };

  if (typeof themePreference.addEventListener === "function") {
    themePreference.addEventListener("change", syncThemeToSystem);
  } else if (typeof themePreference.addListener === "function") {
    themePreference.addListener(syncThemeToSystem);
  }

  window.addEventListener("storage", function (event) {
    if (event.key !== themeStorageKey) return;
    applyTheme(event.newValue === "dark" || event.newValue === "light" ? event.newValue : (themePreference.matches ? "dark" : "light"), false);
  });

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
  var scrollNavs = [];
  var navigationWrapper = document.querySelector(".navigation-wrapper");

  var registerScrollNav = function (shell, scroller) {
    if (!shell || !scroller) return;
    scrollNavs.push({ shell: shell, scroller: scroller });
  };

  var updateScrollFades = function (item) {
    var maxScroll = Math.max(0, item.scroller.scrollWidth - item.scroller.clientWidth);
    item.shell.classList.toggle("has-scroll-start", item.scroller.scrollLeft > 3);
    item.shell.classList.toggle("has-scroll-end", item.scroller.scrollLeft < maxScroll - 3);
  };

  var centerNavItem = function (scroller, activeLink) {
    if (!scroller || !activeLink || scroller.scrollWidth <= scroller.clientWidth + 3) return;

    var scrollerRect = scroller.getBoundingClientRect();
    var linkRect = activeLink.getBoundingClientRect();
    var target = scroller.scrollLeft + linkRect.left - scrollerRect.left - (scroller.clientWidth - linkRect.width) / 2;
    var maxScroll = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
    target = Math.max(0, Math.min(maxScroll, target));

    if (Math.abs(scroller.scrollLeft - target) < 2) return;

    if (typeof scroller.scrollTo === "function") {
      scroller.scrollTo({ left: target, behavior: reduceMotion ? "auto" : "smooth" });
    } else {
      scroller.scrollLeft = target;
    }
  };

  var topNavigation = document.querySelector(".top-navigation");
  if (topNavigation) {
    registerScrollNav(topNavigation, topNavigation.querySelector(".top-navigation__scroll"));
  }

  sectionNavs.forEach(function (nav) {
    registerScrollNav(nav, nav.querySelector(".section-nav__scroll"));
  });

  scrollNavs.forEach(function (item) {
    var scheduled = false;
    item.scroller.addEventListener("scroll", function () {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(function () {
        updateScrollFades(item);
        scheduled = false;
      });
    }, { passive: true });
  });

  var refreshScrollNavs = function () {
    scrollNavs.forEach(updateScrollFades);
  };

  var refreshNavigationChrome = function () {
    if (navigationWrapper) {
      var headerHeight = Math.ceil(navigationWrapper.getBoundingClientRect().height);
      if (headerHeight > 0) {
        document.documentElement.style.setProperty("--site-header-offset", headerHeight + "px");
      }
    }

    sectionNavs.forEach(function (nav) {
      var stickyTop = parseFloat(window.getComputedStyle(nav).top) || 0;
      var isDocked = window.scrollY > 0 && nav.getBoundingClientRect().top <= stickyTop + 1;
      nav.classList.toggle("is-docked", isDocked);
    });
  };

  var navigationChromeScheduled = false;
  var scheduleNavigationChromeRefresh = function () {
    if (navigationChromeScheduled) return;
    navigationChromeScheduled = true;
    window.requestAnimationFrame(function () {
      refreshNavigationChrome();
      navigationChromeScheduled = false;
    });
  };

  window.addEventListener("resize", refreshScrollNavs);
  window.addEventListener("resize", scheduleNavigationChromeRefresh);
  window.addEventListener("scroll", scheduleNavigationChromeRefresh, { passive: true });

  if (navigationWrapper && "ResizeObserver" in window) {
    new ResizeObserver(scheduleNavigationChromeRefresh).observe(navigationWrapper);
  }

  window.requestAnimationFrame(function () {
    var currentPageLink = document.querySelector(".top-navigation-current");
    if (topNavigation && currentPageLink) {
      centerNavItem(topNavigation.querySelector(".top-navigation__scroll"), currentPageLink);
    }
    refreshScrollNavs();
    refreshNavigationChrome();
  });

  if ("IntersectionObserver" in window) {
    sectionNavs.forEach(function (nav) {
      var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
      var sections = links.map(function (link) {
        return document.getElementById(link.getAttribute("href").slice(1));
      }).filter(Boolean);

      if (!sections.length) return;

      var setCurrent = function (activeLink) {
        var changed = activeLink && activeLink.getAttribute("aria-current") !== "location";
        links.forEach(function (link) {
          if (link === activeLink) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });

        if (changed) {
          centerNavItem(nav.querySelector(".section-nav__scroll"), activeLink);
        }
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
      }, { rootMargin: "-20% 0px -50%", threshold: 0 });

      sections.forEach(function (section) {
        sectionObserver.observe(section);
      });
    });
  }

  var publicationImages = Array.prototype.slice.call(document.querySelectorAll(".publication-feature__image"));
  var supportsDialog = typeof window.HTMLDialogElement === "function" && typeof document.createElement("dialog").showModal === "function";

  if (publicationImages.length && supportsDialog) {
    var lightbox = document.createElement("dialog");
    var lightboxFigure = document.createElement("figure");
    var lightboxImage = document.createElement("img");
    var lightboxCaption = document.createElement("figcaption");
    var lightboxTitle = document.createElement("strong");
    var lightboxDescription = document.createElement("span");
    var lightboxClose = document.createElement("button");
    var lastLightboxTrigger = null;

    lightbox.className = "publication-lightbox";
    lightbox.setAttribute("aria-label", "Expanded publication figure");
    lightboxImage.className = "publication-lightbox__image";
    lightboxCaption.className = "publication-lightbox__caption";
    lightboxTitle.className = "publication-lightbox__title";
    lightboxDescription.className = "publication-lightbox__description";
    lightboxClose.className = "publication-lightbox__close";
    lightboxClose.type = "button";
    lightboxClose.setAttribute("aria-label", "Close enlarged figure");
    lightboxClose.textContent = "×";

    lightboxCaption.appendChild(lightboxTitle);
    lightboxCaption.appendChild(lightboxDescription);
    lightboxFigure.appendChild(lightboxImage);
    lightboxFigure.appendChild(lightboxCaption);
    lightbox.appendChild(lightboxClose);
    lightbox.appendChild(lightboxFigure);
    document.body.appendChild(lightbox);

    publicationImages.forEach(function (sourceImage) {
      var trigger = document.createElement("button");
      var imageDescription = sourceImage.getAttribute("alt") || "Publication figure";
      var figureCaption = sourceImage.getAttribute("data-figure-caption") || imageDescription;
      var publication = sourceImage.closest(".publication-feature");
      var titleElement = publication ? publication.querySelector("h3") : null;
      var paperTitle = titleElement ? titleElement.textContent.trim() : "Publication figure";

      trigger.className = "publication-lightbox__trigger";
      trigger.type = "button";
      trigger.setAttribute("aria-label", "Enlarge figure from " + paperTitle);
      sourceImage.parentNode.insertBefore(trigger, sourceImage);
      trigger.appendChild(sourceImage);

      trigger.addEventListener("click", function () {
        lastLightboxTrigger = trigger;
        lightboxImage.src = sourceImage.currentSrc || sourceImage.src;
        lightboxImage.alt = imageDescription;
        lightboxTitle.textContent = paperTitle;
        lightboxDescription.textContent = figureCaption;
        lightbox.setAttribute("aria-label", "Expanded figure from " + paperTitle);
        lightbox.showModal();
        document.body.classList.add("publication-lightbox-open");
      });
    });

    lightboxClose.addEventListener("click", function () {
      lightbox.close();
    });

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) lightbox.close();
    });

    lightbox.addEventListener("close", function () {
      document.body.classList.remove("publication-lightbox-open");
      if (lastLightboxTrigger) lastLightboxTrigger.focus({ preventScroll: true });
    });
  }
}());
