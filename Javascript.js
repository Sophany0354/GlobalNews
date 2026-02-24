// ===============================
// SHOW MORE (safe)
// ===============================
const showMoreBtn = document.getElementById("show-more-following");

if (showMoreBtn) {
  showMoreBtn.addEventListener("click", function (e) {

    e.preventDefault();

    const newsSites = [
      { name: "The Guardian", link: "https://www.theguardian.com" },
      { name: "New York Times", link: "https://www.nytimes.com" },
      { name: "France 24", link: "https://www.france24.com" },
      { name: "Al Jazeera", link: "https://www.aljazeera.com" },
      { name: "Reuters", link: "https://www.reuters.com" }
    ];

    const container = document.getElementById("more-following");

    newsSites.forEach(site => {
      const a = document.createElement("a");
      a.href = site.link;
      a.textContent = site.name;
      a.target = "_blank";
      container.appendChild(a);
    });

    this.style.display = "none";
  });
}


// ===============================
// SIDEBAR TOGGLE
// ===============================
const menuIcon = document.querySelector(".fa-bars");
const sidebar = document.querySelector(".sidebar");
const searchBar = document.querySelector(".search-bar");

if (menuIcon && sidebar) {
  menuIcon.addEventListener("click", function () {
    sidebar.classList.toggle("active");
  });
}


// ===============================
// CLOSE SIDEBAR OUTSIDE CLICK
// ===============================
window.addEventListener("click", function (e) {

  if (sidebar && sidebar.classList.contains("active")) {

    if (
      !sidebar.contains(e.target) &&
      !menuIcon.contains(e.target) &&
      !searchBar.contains(e.target)
    ) {
      sidebar.classList.remove("active");
    }
  }
});

// ===============================
// REGISTER POPUP
// ===============================
const registerBtn = document.querySelector(".register-button");
const regPopup = document.getElementById("regPopup");
const closeBtn = document.querySelector(".exit-popup");

// Open popup
if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    regPopup.classList.add("open");
  });
}

// Close with X
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    regPopup.classList.remove("open");
  });
}

// Close when clicking background
window.addEventListener("click", (e) => {
  if (e.target === regPopup) {
    regPopup.classList.remove("open");
  }
});