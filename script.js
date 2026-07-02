(function () {
  "use strict";

  var assignments = [
    {
      location: "Spain",
      project: "Renfe, Metro Madrid, FGV Valencia, FGC Catalu\u00f1a",
      year: "2008 - Present",
      technology: "ERTMS/ETCS, ASFA Digital/ASFA 4, ATP/ATO, CBTC",
      role: "National railway and metro assignments involving onboard signalling, maintenance engineering, warranty support and technical coordination.",
      coordinates: [40.4168, -3.7038]
    },
    {
      location: "Caracas, Venezuela",
      project: "CAMETRO Line 1",
      year: "2011 - 2012",
      technology: "Onboard systems",
      role: "On-site commissioning activities for CAMETRO Line 1 onboard systems.",
      coordinates: [10.4806, -66.9036]
    },
    {
      location: "Istanbul, Turkey",
      project: "Marmaray",
      year: "2014",
      technology: "Railway onboard systems",
      role: "On-site commissioning support for Marmaray railway project.",
      coordinates: [41.0082, 28.9784]
    },
    {
      location: "Riyadh, Saudi Arabia",
      project: "HSR Push-Pull",
      year: "2015",
      technology: "Railway onboard systems",
      role: "On-site project execution support for HSR Push-Pull railway project.",
      coordinates: [24.7136, 46.6753]
    },
    {
      location: "Singapore",
      project: "Downtown Line 1",
      year: "2013",
      technology: "Testing & commissioning",
      role: "On-site testing and commissioning activities for Downtown Line 1.",
      coordinates: [1.3521, 103.8198]
    },
    {
      location: "Singapore",
      project: "Downtown Line 3",
      year: "2017",
      technology: "Testing & commissioning",
      role: "On-site testing and commissioning activities for Downtown Line 3.",
      coordinates: [1.3147, 103.8927]
    },
    {
      location: "Changsha, China",
      project: "Metro Line 2",
      year: "2019",
      technology: "CBTC onboard equipment",
      role: "On-site maintenance engineering support and technical training for CBTC onboard equipment maintainers.",
      coordinates: [28.2282, 112.9388]
    }
  ];

  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  var navItems = document.querySelectorAll(".nav-links a");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("is-open");
      document.body.classList.toggle("nav-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    navItems.forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  function setActiveNav() {
    var fromTop = window.scrollY + 120;

    navItems.forEach(function (link) {
      var section = document.querySelector(link.getAttribute("href"));

      if (!section) {
        return;
      }

      var startsBefore = section.offsetTop <= fromTop;
      var endsAfter = section.offsetTop + section.offsetHeight > fromTop;
      link.classList.toggle("is-active", startsBefore && endsAfter);
    });
  }

  window.addEventListener("scroll", setActiveNav, { passive: true });
  window.addEventListener("load", setActiveNav);

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderPopup(assignment) {
    return [
      '<div class="map-popup">',
      "<h3>" + escapeHtml(assignment.location) + "</h3>",
      "<dl>",
      "<dt>Project</dt><dd>" + escapeHtml(assignment.project) + "</dd>",
      "<dt>Year</dt><dd>" + escapeHtml(assignment.year) + "</dd>",
      "<dt>Technology</dt><dd>" + escapeHtml(assignment.technology) + "</dd>",
      "</dl>",
      "<p>" + escapeHtml(assignment.role) + "</p>",
      "</div>"
    ].join("");
  }

  function createMarkerIcon(index) {
    return window.L.divIcon({
      className: "portfolio-marker",
      html: '<span class="portfolio-marker-pin"><em>' + index + "</em></span>",
      iconSize: [34, 34],
      iconAnchor: [17, 34],
      popupAnchor: [0, -30]
    });
  }

  function renderAssignmentList(markers, map) {
    var list = document.getElementById("assignment-list");

    if (!list) {
      return;
    }

    list.innerHTML = "";

    assignments.forEach(function (assignment, index) {
      var button = document.createElement("button");
      button.className = "assignment-button";
      button.type = "button";
      button.innerHTML =
        "<strong>" + escapeHtml(assignment.project) + "</strong>" +
        "<span>" + escapeHtml(assignment.location) + " &middot; " + escapeHtml(assignment.year) + "</span>";

      button.addEventListener("click", function () {
        setActiveAssignment(index);

        if (markers[index] && map) {
          map.flyTo(assignment.coordinates, Math.max(map.getZoom(), 5), { duration: 0.65 });
          markers[index].openPopup();
        }
      });

      list.appendChild(button);
    });
  }

  function setActiveAssignment(index) {
    var buttons = document.querySelectorAll(".assignment-button");

    buttons.forEach(function (button, buttonIndex) {
      button.classList.toggle("is-active", buttonIndex === index);
    });
  }

  function initMap() {
    var mapElement = document.getElementById("map");

    if (!mapElement) {
      return;
    }

    var markers = [];

    if (!window.L) {
      mapElement.innerHTML = '<div class="map-fallback">Map library unavailable. Project assignments remain listed beside the map.</div>';
      renderAssignmentList(markers, null);
      return;
    }

    var map = window.L.map("map", {
      scrollWheelZoom: false,
      worldCopyJump: true
    }).setView([27.5, 24], 2);

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    assignments.forEach(function (assignment, index) {
      var marker = window.L.marker(assignment.coordinates, {
        icon: createMarkerIcon(index + 1),
        title: assignment.location
      })
        .addTo(map)
        .bindPopup(renderPopup(assignment));

      marker.on("click", function () {
        setActiveAssignment(index);
      });

      markers.push(marker);
    });

    var bounds = window.L.latLngBounds(assignments.map(function (assignment) {
      return assignment.coordinates;
    }));

    map.fitBounds(bounds, {
      padding: [36, 36],
      maxZoom: 4
    });

    renderAssignmentList(markers, map);
    setActiveAssignment(0);
  }

  function initRevealAnimations() {
    var animated = document.querySelectorAll("[data-animate]");

    if (!animated.length) {
      return;
    }

    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animated.forEach(function (element) {
        element.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    animated.forEach(function (element) {
      observer.observe(element);
    });
  }

  window.addEventListener("load", function () {
    initMap();
    initRevealAnimations();
  });
}());
