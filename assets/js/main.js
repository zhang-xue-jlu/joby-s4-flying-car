/* =========================================================
   Joby S4 case study — interactions
   No dependencies. Progressive enhancement only.
   ========================================================= */
(function () {
  "use strict";

  const root = document.documentElement;
  const header = document.getElementById("siteHeader");
  const progressBar = document.getElementById("progressBar");
  const themeToggle = document.getElementById("themeToggle");
  const printBtn = document.getElementById("printBtn");
  const toc = document.getElementById("toc");
  const tocToggle = document.getElementById("tocToggle");
  const backToTop = document.getElementById("backToTop");
  const tocLinks = Array.from(document.querySelectorAll(".toc-link"));
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navLinks = Array.from(document.querySelectorAll(".header-nav .nav-link"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- theme ---------- */

  function setTheme(theme, persist) {
    root.setAttribute("data-theme", theme);
    const isDark = theme === "dark";
    const sun = themeToggle.querySelector(".icon-sun");
    const moon = themeToggle.querySelector(".icon-moon");
    if (sun && moon) {
      sun.style.display = isDark ? "none" : "block";
      moon.style.display = isDark ? "block" : "none";
    }
    themeToggle.setAttribute("aria-label", isDark ? "切换浅色模式" : "切换深色模式");
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", isDark ? "#08111d" : "#081422");
    if (persist) {
      try {
        localStorage.setItem("joby-theme", theme);
      } catch (err) {
        /* localStorage can be unavailable in private mode */
      }
    }
  }

  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("joby-theme");
  } catch (err) {
    savedTheme = null;
  }

  if (savedTheme === "dark" || savedTheme === "light") {
    setTheme(savedTheme, false);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    setTheme("dark", false);
  } else {
    setTheme("light", false);
  }

  themeToggle.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(next, true);
  });

  /* ---------- print ---------- */

  if (printBtn) {
    printBtn.addEventListener("click", function () {
      window.print();
    });
  }

  /* ---------- scroll progress / header / back to top ---------- */

  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      const scrollTop = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      if (progressBar) progressBar.style.width = pct + "%";
      if (header) header.classList.toggle("is-scrolled", scrollTop > 12);
      if (backToTop) backToTop.classList.toggle("is-visible", scrollTop > 700);
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- mobile TOC ---------- */

  function closeToc() {
    if (!toc || !tocToggle) return;
    toc.classList.remove("is-open");
    tocToggle.setAttribute("aria-expanded", "false");
    tocToggle.setAttribute("aria-label", "打开章节目录");
  }

  function openToc() {
    if (!toc || !tocToggle) return;
    toc.classList.add("is-open");
    tocToggle.setAttribute("aria-expanded", "true");
    tocToggle.setAttribute("aria-label", "关闭章节目录");
  }

  if (tocToggle && toc) {
    tocToggle.addEventListener("click", function () {
      if (toc.classList.contains("is-open")) {
        closeToc();
      } else {
        openToc();
      }
    });

    tocLinks.forEach(function (link) {
      link.addEventListener("click", closeToc);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeToc();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) closeToc();
    });
  }

  /* ---------- active TOC + header nav ---------- */

  function setActive(id) {
    tocLinks.forEach(function (link) {
      const isActive = link.getAttribute("href") === "#" + id;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });

    const directNav = {
      method: "method",
      technology: "technology",
      certification: "certification",
      market: "market",
      competition: "competition",
      feasibility: "technology",
      scenarios: "market",
      roadmap: "market",
      conclusion: "market"
    };
    const navTarget = directNav[id] || null;
    navLinks.forEach(function (link) {
      link.classList.toggle("is-active", navTarget !== null && link.getAttribute("href") === "#" + navTarget);
    });
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        const visible = entries
          .filter(function (entry) { return entry.isIntersecting; })
          .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.05, 0.2, 0.5] }
    );
    sections.forEach(function (section) { observer.observe(section); });
  } else {
    setActive("summary");
  }

  setActive("summary");

  /* ---------- reveal ---------- */

  if (!reduceMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }



  /* ---------- market model ---------- */

  const model = document.getElementById("marketModel");
  if (!model) return;

  const inputs = {
    routes: document.getElementById("routes"),
    departures: document.getElementById("departures"),
    seats: document.getElementById("seats"),
    load: document.getElementById("load"),
    fare: document.getElementById("fare"),
    days: document.getElementById("days")
  };

  const outputs = {
    routes: document.getElementById("routesOut"),
    departures: document.getElementById("departuresOut"),
    seats: document.getElementById("seatsOut"),
    load: document.getElementById("loadOut"),
    fare: document.getElementById("fareOut"),
    days: document.getElementById("daysOut"),
    revenue: document.getElementById("revenueOut"),
    pax: document.getElementById("paxOut"),
    flights: document.getElementById("flightsOut"),
    aircraft: document.getElementById("aircraftOut"),
    cost: document.getElementById("costOut"),
    margin: document.getElementById("marginOut")
  };

  const COST_PER_FLIGHT = 546.25; // 133 + 120 + 12 + 60 + 100 + 50, plus 15% overhead
  const FLIGHT_HOURS = 0.5;
  const PRODUCTIVE_HOURS_PER_DAY = 8;
  const BACKUP_FACTOR = 1.2;

  function formatCompactUSD(value) {
    if (value >= 1000000000) {
      return "$" + (value / 1000000000).toFixed(1) + "<small>B</small>";
    }
    if (value >= 1000000) {
      return "$" + (value / 1000000).toFixed(1) + "<small>M</small>";
    }
    if (value >= 1000) {
      return "$" + Math.round(value / 1000) + "<small>K</small>";
    }
    return "$" + Math.round(value);
  }

  function updateModel() {
    const routes = Number(inputs.routes.value);
    const departures = Number(inputs.departures.value);
    const seats = Number(inputs.seats.value);
    const load = Number(inputs.load.value) / 100;
    const fare = Number(inputs.fare.value);
    const days = Number(inputs.days.value);

    outputs.routes.textContent = routes;
    outputs.departures.textContent = departures;
    outputs.seats.textContent = seats;
    outputs.load.textContent = Math.round(load * 100) + "%";
    outputs.fare.textContent = "$" + fare;
    outputs.days.textContent = days;

    const pax = routes * departures * seats * load * days;
    const revenue = pax * fare;
    const flights = routes * departures * days;
    const annualFlightHours = flights * FLIGHT_HOURS;
    const aircraft = Math.max(1, Math.ceil((annualFlightHours / (PRODUCTIVE_HOURS_PER_DAY * days)) * BACKUP_FACTOR));
    const costTotal = flights * COST_PER_FLIGHT;
    const paidPerFlight = Math.max(0.01, seats * load);
    const costPerPax = COST_PER_FLIGHT / paidPerFlight;
    const margin = revenue > 0 ? ((revenue - costTotal) / revenue) * 100 : 0;

    outputs.revenue.innerHTML = formatCompactUSD(revenue);
    outputs.pax.textContent = Math.round(pax).toLocaleString("en-US");
    outputs.flights.textContent = Math.round(flights).toLocaleString("en-US");
    outputs.aircraft.textContent = aircraft.toLocaleString("en-US");
    outputs.cost.textContent = "$" + Math.round(costPerPax);
    outputs.margin.innerHTML = margin.toFixed(1) + "<small>%</small>";

    outputs.margin.classList.toggle("is-negative", margin < 0);
    outputs.revenue.classList.toggle("is-negative", revenue < costTotal);
  }

  Object.keys(inputs).forEach(function (key) {
    if (!inputs[key]) return;
    inputs[key].addEventListener("input", updateModel);
    inputs[key].addEventListener("change", updateModel);
  });

  updateModel();
})();
