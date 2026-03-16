// ============================================================
// GLOBAL NEWS — Javascript.js
// ============================================================

// ============================================================
// 1. INIT ON DOM READY
// ============================================================
document.addEventListener("DOMContentLoaded", () => {

    setGreeting();
    loadSavedArticles();
    initCountdown();
    initDarkMode();

    // Disable sidebar slide animation on page load
    const sidebar = document.getElementById('mainSidebar');
    if (sidebar) {
        sidebar.style.transition = "none";
        sidebar.classList.remove("active");
        setTimeout(() => { sidebar.style.transition = ""; }, 100);
    }
});


// ============================================================
// 2. GREETING (time-of-day aware)
// ============================================================
function setGreeting() {
    const el = document.getElementById('greetingText');
    if (!el) return;
    const hour = new Date().getHours();
    let greeting = "Good Evening";
    if (hour >= 5 && hour < 12) greeting = "Good Morning";
    else if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
    el.textContent = greeting + ", User";
}


// ============================================================
// 3. SIDEBAR TOGGLE
// ============================================================
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('mainSidebar');

if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        sidebar.classList.toggle("active");
        document.body.classList.toggle("sidebar-pushed");
    });

    // Close sidebar on outside click
    document.addEventListener("click", function (e) {
        if (sidebar.classList.contains("active") &&
            !sidebar.contains(e.target) &&
            e.target !== menuToggle) {
            sidebar.classList.remove("active");
            document.body.classList.remove("sidebar-pushed");
        }
    });
}


// ============================================================
// 4. PROFILE DROPDOWN
// ============================================================
function toggleMenu() {
    const menu = document.getElementById('profileMenu');
    if (menu) menu.classList.toggle('show');
}

window.addEventListener('click', function (e) {
    const userAccount = document.querySelector('.user-account');
    const menu = document.getElementById('profileMenu');
    if (userAccount && menu && !userAccount.contains(e.target)) {
        menu.classList.remove('show');
    }
});


// ============================================================
// 5. DARK MODE TOGGLE
// ============================================================
function initDarkMode() {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') enableDark();
}

function enableDark() {
    document.body.classList.add('dark-mode');
    const icon = document.getElementById('darkIcon');
    if (icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
}

function disableDark() {
    document.body.classList.remove('dark-mode');
    const icon = document.getElementById('darkIcon');
    if (icon) { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
}

const darkToggle = document.getElementById('darkToggle');
if (darkToggle) {
    darkToggle.addEventListener('click', function () {
        const isDark = document.body.classList.contains('dark-mode');
        if (isDark) { disableDark(); localStorage.setItem('darkMode', 'false'); }
        else { enableDark(); localStorage.setItem('darkMode', 'true'); }
    });
}


// ============================================================
// 6. CATEGORY FILTER BUTTONS
// ============================================================
const catButtons = document.querySelectorAll('.cat-btn');
catButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        catButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const cat = this.dataset.cat;
        const items = document.querySelectorAll('[data-cat]');

        items.forEach(item => {
            if (cat === 'all' || item.dataset.cat === cat) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
});


// ============================================================
// 7. LIVE SEARCH
// ============================================================
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');

function executeSearch() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    if (!query) {
        if (searchResults) searchResults.style.display = 'none';
        return;
    }

    // Navigate to sport section
    if (query === "sport" || query === "sports") {
        const target = document.getElementById('sport-section');
        if (target) { target.scrollIntoView({ behavior: 'smooth' }); }
        if (searchResults) searchResults.style.display = 'none';
        return;
    }

    // Search news-list-items
    const items = document.querySelectorAll('.news-list-item');
    const matches = [];

    items.forEach(item => {
        const keywords = (item.dataset.keywords || '') + ' ' + item.textContent;
        if (keywords.toLowerCase().includes(query)) {
            const title = item.querySelector('h3') ? item.querySelector('h3').textContent : 'Article';
            const cat = item.querySelector('.blue-text') ? item.querySelector('.blue-text').textContent : '';
            matches.push({ el: item, title, cat });

            // Highlight
            item.style.outline = "3px solid #3b82f6";
            item.style.borderRadius = "8px";
            setTimeout(() => { item.style.outline = "none"; }, 2500);
        }
    });

    if (searchResults) {
        if (matches.length > 0) {
            searchResults.innerHTML = `<p class="results-heading">Found ${matches.length} result(s) for "<strong>${query}</strong>":</p>` +
                matches.map(m => `<div class="result-item" onclick="scrollToArticle(this)" data-ref="${m.title}">
                    <span class="result-cat">${m.cat}</span> ${m.title}
                </div>`).join('');
            searchResults.style.display = 'block';

            // Scroll to first match
            matches[0].el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            searchResults.innerHTML = `<p class="results-heading">No results found for "<strong>${query}</strong>".</p>`;
            searchResults.style.display = 'block';
        }
    }
}

if (searchBtn) searchBtn.addEventListener('click', executeSearch);
if (searchInput) {
    searchInput.addEventListener('keypress', e => { if (e.key === 'Enter') executeSearch(); });
    searchInput.addEventListener('input', () => {
        if (searchInput.value === '' && searchResults) searchResults.style.display = 'none';
    });
}


// ============================================================
// 8. SAVE ARTICLES (localStorage)
// ============================================================
let savedArticles = [];

function loadSavedArticles() {
    const stored = localStorage.getItem('savedArticles');
    if (stored) savedArticles = JSON.parse(stored);
    renderSavedList();
}

function saveArticle(btn, title) {
    if (savedArticles.includes(title)) {
        // Unsave
        savedArticles = savedArticles.filter(a => a !== title);
        btn.innerHTML = '<i class="fa-regular fa-bookmark"></i> Save';
        btn.classList.remove('saved');
    } else {
        savedArticles.push(title);
        btn.innerHTML = '<i class="fa-solid fa-bookmark"></i> Saved';
        btn.classList.add('saved');
    }
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
    renderSavedList();
}

function renderSavedList() {
    const list = document.getElementById('savedList');
    const badge = document.getElementById('savedCount');
    if (!list) return;

    if (savedArticles.length === 0) {
        list.innerHTML = '<li class="empty-saved">No saved articles yet.</li>';
    } else {
        list.innerHTML = savedArticles.map((a, i) =>
            `<li>${a} <button onclick="removeSaved(${i})" class="remove-saved">✕</button></li>`
        ).join('');
    }

    if (badge) {
        badge.textContent = savedArticles.length;
        badge.style.display = savedArticles.length > 0 ? 'inline-block' : 'none';
    }
}

function removeSaved(index) {
    savedArticles.splice(index, 1);
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
    renderSavedList();
}


// ============================================================
// 9. LIVE MATCH COUNTDOWN
// ============================================================
function initCountdown() {
    // Set match date ~58 days from now
    const matchDate = new Date();
    matchDate.setDate(matchDate.getDate() + 58);
    matchDate.setHours(15, 0, 0, 0);

    function update() {
        const now = new Date();
        const diff = matchDate - now;
        if (diff <= 0) return;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hrs  = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        const d = document.getElementById('cd-days');
        const h = document.getElementById('cd-hrs');
        const m = document.getElementById('cd-mins');
        const s = document.getElementById('cd-secs');

        if (d) d.textContent = String(days).padStart(2, '0');
        if (h) h.textContent = String(hrs).padStart(2, '0');
        if (m) m.textContent = String(mins).padStart(2, '0');
        if (s) s.textContent = String(secs).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}


// ============================================================
// 10. SHOW MORE FOLLOWING
// ============================================================
const showMoreBtn = document.getElementById("show-more-following");
if (showMoreBtn) {
    showMoreBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const sites = [
            { name: "The Guardian", link: "https://www.theguardian.com" },
            { name: "New York Times", link: "https://www.nytimes.com" },
            { name: "France 24",     link: "https://www.france24.com" },
            { name: "Al Jazeera",   link: "https://www.aljazeera.com" },
            { name: "Reuters",      link: "https://www.reuters.com" }
        ];
        const container = document.getElementById("more-following");
        if (container) {
            sites.forEach(site => {
                const a = document.createElement("a");
                a.href = site.link;
                a.textContent = site.name;
                a.target = "_blank";
                a.rel = "noopener";
                container.appendChild(a);
            });
        }
        this.style.display = "none";
    });
}


// ============================================================
// 11. SCROLL REVEAL (Intersection Observer for .news-card)
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.news-card');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    cards.forEach(card => observer.observe(card));
});