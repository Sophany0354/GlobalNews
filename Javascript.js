document.getElementById("show-more-btn").addEventListener("click", function(e) {
    e.preventDefault();

    const newNames = [
        "The Guardian",
        "New York Times",
        "France 24",
        "Al Jazeera",
        "Reuters",
    ];

    const container = document.getElementById("more-following");

    newNames.forEach(function(name) {
        const p = document.createElement("p");
        p.textContent = name;
        container.appendChild(p);
    });

    this.style.display = "none";
});


const menuIcon = document.querySelector(".fa-bars");
const sidebar = document.querySelector(".sidebar");

menuIcon.addEventListener("click", function(){
    sidebar.classList.toggle("active");
});
             
// This listens for clicks anywhere on the window
window.addEventListener('click', function(e) {
    
    if (sidebar.classList.contains('active')) {
        // If the click is not the sidebar and not the menu icon
        if (!sidebar.contains(e.target) && !menuIcon.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    }
});




/*ah nis hav from html*/ 
const registerBtn = document.querySelector('.register-button');
const regPopup = document.getElementById('regPopup');
const closeBtn = document.querySelector('.exit-popup');

// When clicking Register, add the 'open' class
registerBtn.addEventListener('click', () => {
    regPopup.classList.add('open');
});

// When clicking the 'X', remove the 'open' class
closeBtn.addEventListener('click', () => {
    regPopup.classList.remove('open');
});

// Optional: Close if clicking on the dark background area
window.addEventListener('click', (e) => {
    if (e.target === regPopup) {
        regPopup.classList.remove('open');
    }
});


