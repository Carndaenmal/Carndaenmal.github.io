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

  var publicationCards = Array.prototype.slice.call(document.querySelectorAll(".publication-feature"));

  if (publicationCards.length) {
    var copyToast = document.createElement("div");
    var copyToastTimer = null;

    copyToast.className = "copy-toast";
    copyToast.setAttribute("role", "status");
    copyToast.setAttribute("aria-live", "polite");
    copyToast.setAttribute("aria-atomic", "true");
    document.body.appendChild(copyToast);

    var showCopyToast = function (message, isError) {
      window.clearTimeout(copyToastTimer);
      copyToast.textContent = message;
      copyToast.classList.toggle("copy-toast--error", Boolean(isError));
      copyToast.classList.add("is-visible");
      copyToastTimer = window.setTimeout(function () {
        copyToast.classList.remove("is-visible");
      }, 2400);
    };

    var fallbackCopy = function (value) {
      var temporaryInput = document.createElement("textarea");
      temporaryInput.value = value;
      temporaryInput.setAttribute("readonly", "");
      temporaryInput.className = "copy-fallback-input";
      document.body.appendChild(temporaryInput);
      temporaryInput.select();
      temporaryInput.setSelectionRange(0, temporaryInput.value.length);

      var copied = false;
      try {
        copied = document.execCommand("copy");
      } catch (error) {
        copied = false;
      }

      temporaryInput.remove();
      return copied;
    };

    var copyText = function (value) {
      if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(value).catch(function () {
          if (!fallbackCopy(value)) throw new Error("Clipboard access failed");
        });
      }

      return fallbackCopy(value)
        ? Promise.resolve()
        : Promise.reject(new Error("Clipboard access failed"));
    };

    var runCopyAction = function (button, value, successMessage) {
      copyText(value).then(function () {
        button.classList.add("is-copied");
        showCopyToast(successMessage, false);
        window.setTimeout(function () {
          button.classList.remove("is-copied");
        }, 1200);
      }).catch(function () {
        showCopyToast("Could not copy automatically", true);
      });
    };

    var copyButtonLabels = {
      citation: { label: "Copy citation", confirmation: "Formatted citation copied" },
      bibtex: { label: "Copy BibTeX", confirmation: "BibTeX copied" },
      doi: { label: "Copy DOI", confirmation: "DOI copied" }
    };

    publicationCards.forEach(function (publication) {
      var titleElement = publication.querySelector("h3[id]");
      if (!titleElement) return;

      var paperTitle = titleElement.textContent.trim();
      var titleRow = document.createElement("div");
      var shareButton = document.createElement("button");
      titleRow.className = "publication-title-row";
      shareButton.className = "publication-share-button";
      shareButton.type = "button";
      shareButton.setAttribute("aria-label", "Copy direct link to " + paperTitle);
      shareButton.setAttribute("title", "Copy direct link to this paper");
      shareButton.innerHTML = '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24"><path d="M10.6 13.4a1 1 0 0 1 0-1.4l3.4-3.4a4 4 0 0 1 5.7 5.7l-3.4 3.4a4 4 0 0 1-5.7 0 1 1 0 0 1 1.4-1.4 2 2 0 0 0 2.9 0l3.4-3.4a2 2 0 0 0-2.9-2.9L12 13.4a1 1 0 0 1-1.4 0Zm2.8-2.8a1 1 0 0 1 0 1.4L10 15.4a4 4 0 0 1-5.7-5.7l3.4-3.4a4 4 0 0 1 5.7 0 1 1 0 0 1-1.4 1.4 2 2 0 0 0-2.9 0l-3.4 3.4A2 2 0 0 0 8.6 14l3.4-3.4a1 1 0 0 1 1.4 0Z"/></svg>';
      titleElement.parentNode.insertBefore(titleRow, titleElement);
      titleRow.appendChild(titleElement);
      titleRow.appendChild(shareButton);

      shareButton.addEventListener("click", function () {
        var directUrl = new URL(window.location.href);
        directUrl.search = "";
        directUrl.hash = titleElement.id;
        runCopyAction(shareButton, directUrl.href, "Direct paper link copied");
      });

      var tools = document.createElement("div");
      tools.className = "publication-copy-tools";
      tools.setAttribute("role", "group");
      tools.setAttribute("aria-label", "Citation tools for " + paperTitle);

      ["citation", "bibtex", "doi"].forEach(function (sourceName) {
        var source = publication.querySelector('[data-copy-source="' + sourceName + '"]');
        if (!source) return;

        var button = document.createElement("button");
        var labels = copyButtonLabels[sourceName];
        button.className = "publication-copy-button publication-copy-button--" + sourceName;
        button.type = "button";
        button.textContent = labels.label;
        button.addEventListener("click", function () {
          runCopyAction(button, source.textContent.trim(), labels.confirmation);
        });
        tools.appendChild(button);
      });

      if (tools.children.length) publication.appendChild(tools);
    });
  }
}());
