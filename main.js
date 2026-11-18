// main.js


/*
  LOCATION SETTINGS

  x = horizontal percentage (0–100)
  y = vertical percentage (0–100)

  image = image path shown in information panel
  extra = optional additional information
*/

const locations = [

  {
    id: 1,
    title: "Plaza de la Constitución",
    x: 44,
    y: 15,
    description: "Bla bla bla.",
    image: "assets/images/plaza.png",
    extra: "texto texto texto."
  },

  {
    id: 2,
    title: "Park",
    x: 45,
    y: 55,
    description: "A beautiful green space to explore.",
    image: "images/park.jpg",
    extra: "Additional information about the park."
  },

  {
    id: 3,
    title: "Plaza de la Constitución",
    x: 70,
    y: 35,
    description: "Bla bla bla.",
    image: "images/building.jpg",
    extra: "texto texto texto."
  },

  {
    id: 4,
    title: "Viewpoint",
    x: 80,
    y: 75,
    description: "A viewpoint with a great panorama.",
    image: "images/viewpoint.jpg",
    extra: "Additional information about the viewpoint."
  }

];


/* =====================================================
   GET PAGE ELEMENTS
===================================================== */

const mapWrapper = document.getElementById("mapWrapper");
const infoPanel = document.getElementById("infoPanel");

let transitionTimer;


/* =====================================================
   CREATE MAP POINTS
===================================================== */

locations.forEach(location => {

  const point = document.createElement("button");

  point.type = "button";
  point.className = "map-point";

  point.style.left = location.x + "%";
  point.style.top = location.y + "%";

  point.setAttribute("aria-label", location.title);
  point.title = location.title;

  // Hover interaction
  point.addEventListener("mouseenter", () => {
    showLocation(location, point);
  });

  // Click interaction
  point.addEventListener("click", () => {
    showLocation(location, point);
  });

  // Keyboard focus interaction
  point.addEventListener("focus", () => {
    showLocation(location, point);
  });

  mapWrapper.appendChild(point);

});


/* =====================================================
   DISPLAY LOCATION INFORMATION
===================================================== */

function showLocation(location, selectedPoint) {

  // Remove active state from all markers
  document.querySelectorAll(".map-point").forEach(point => {
    point.classList.remove("active");
  });

  // Activate selected marker
  selectedPoint.classList.add("active");

  // Cancel pending transition
  clearTimeout(transitionTimer);

  // Fade out current information
  infoPanel.classList.add("changing");

  transitionTimer = setTimeout(() => {

    infoPanel.innerHTML = `

      <h2>${escapeHTML(location.title)}</h2>

      ${
        location.image
          ? `<img
               src="${escapeHTML(location.image)}"
               class="info-image"
               alt="${escapeHTML(location.title)}"
             >`
          : ""
      }

      <p>${escapeHTML(location.description)}</p>

      ${
        location.extra
          ? `<div class="info-extra">${escapeHTML(location.extra)}</div>`
          : ""
      }

    `;

    // Fade in new content
    requestAnimationFrame(() => {
      infoPanel.classList.remove("changing");
    });

  }, 200);

}


/* =====================================================
   BASIC HTML ESCAPING
===================================================== */

function escapeHTML(value) {

  return String(value).replace(/[&<>"']/g, character => {

    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };

    return entities[character];

  });

}

/* =====================================================
   DROPDOWN FUNCTIONALITY
===================================================== */

document.querySelectorAll(".dropdown-toggle").forEach(button => {

  button.addEventListener("click", () => {

    const menuId = button.getAttribute("aria-controls");
    const menu = document.getElementById(menuId);

    const isOpen = button.getAttribute("aria-expanded") === "true";

    // Close all other dropdowns
    document.querySelectorAll(".dropdown-toggle").forEach(otherButton => {

      otherButton.setAttribute("aria-expanded", "false");

      const otherMenu = document.getElementById(
        otherButton.getAttribute("aria-controls")
      );

      otherMenu.classList.remove("open");

    });

    // Toggle the selected dropdown
    if (!isOpen) {

      button.setAttribute("aria-expanded", "true");
      menu.classList.add("open");

    }

  });

});
