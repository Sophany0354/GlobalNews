// ============================================================
// 1. SIDEBAR & LAYOUT LOGIC
// ============================================================
const menuIcon = document.querySelector(".fa-bars");
const sidebar = document.querySelector(".sidebar");
const searchBar = document.querySelector(".search-container");
const regPopup = document.getElementById("regPopup");

// Force sidebar closed on page refresh without "sliding" animation
document.addEventListener("DOMContentLoaded", () => {
    // Disable transition temporarily
    document.body.style.transition = "none";
    if(sidebar) sidebar.style.transition = "none";

    document.body.classList.remove("sidebar-pushed");
    if(sidebar) sidebar.classList.remove("active");

    // Re-enable transition after load
    setTimeout(() => {
        document.body.style.transition = "";
        if(sidebar) sidebar.style.transition = "";
    }, 100);
});

if (menuIcon && sidebar) {
    menuIcon.addEventListener("click", function (e) {
        e.stopPropagation(); 
        sidebar.classList.toggle("active");
        document.body.classList.toggle("sidebar-pushed");
    });
}

// Global click listener ONLY for the Register Popup
window.addEventListener("click", function (e) {
    if (e.target === regPopup) {
        regPopup.classList.remove("open");
    }
});

// ============================================================
// 2. SHOW MORE (Following list)
// ============================================================
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

// ============================================================
// 3. REGISTER POPUP
// ============================================================
const registerBtn = document.querySelector(".register-button");
const closeBtn = document.querySelector(".exit-popup");

if (registerBtn && regPopup) {
    registerBtn.addEventListener("click", () => {
        regPopup.classList.add("open");
    });
}

if (closeBtn && regPopup) {
    closeBtn.addEventListener("click", () => {
        regPopup.classList.remove("open");
    });
}