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
// 4. SCROLL REVEAL ANIMATION
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.news-card');

    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of the card is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Optional: stop watching after it appears once
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        scrollObserver.observe(card);
    });
});

// ============================================================
// 5. SEARCH LOGIC (Jumping to Sections or Content)
// ============================================================
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

function executeSearch() {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) return;

    // 1. Check for specific category keywords
    if (query === "news") {
        const target = document.querySelector('.news-container');
        if(target) target.scrollIntoView({ behavior: 'smooth' });
    } 
    else if (query === "sport") {
        const target = document.getElementById('sport-section');
        if(target) target.scrollIntoView({ behavior: 'smooth' });
    }
    // 2. Search within the news cards for matching text
    else {
        const cards = document.querySelectorAll('.news-card');
        let found = false;

        cards.forEach(card => {
            if (card.textContent.toLowerCase().includes(query) && !found) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Visual feedback: Highlight the card temporarily
                card.style.outline = "3px solid #3b82f6";
                card.style.transition = "outline 0.3s ease";
                setTimeout(() => card.style.outline = "none", 2000);
                
                found = true;
            }
        });
    }
}

// Add event listeners for Search
if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', executeSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') executeSearch();
    });
}

document.getElementById('menuToggle').addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('active');
});

const apiKey = "YOUR_API_KEY";

fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`)
.then(response => response.json())
.then(data => {
    const articles = data.articles;

    articles.forEach(article => {
        console.log(article.title);
    });
});

const newsContainer = document.getElementById("news");

fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY")
.then(res => res.json())
.then(data => {
    data.articles.forEach(article => {
        newsContainer.innerHTML += `
        <div class="news-card">
            <img src="${article.urlToImage}">
            <h3>${article.title}</h3>
            <p>${article.source.name}</p>
        </div>
        `;
    });
});




function toggleMenu() {
    const menu = document.getElementById('profileMenu');
    menu.classList.toggle('show');
}

// Optional: Close the menu if you click anywhere else on the page
window.addEventListener('click', function(e) {
    const userAccount = document.querySelector('.user-account');
    if (!userAccount.contains(e.target)) {
        document.getElementById('profileMenu').classList.remove('show');
    }
});