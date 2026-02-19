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

/*                                                                          when click on three bar */
const menuIcon = document.querySelector(".fa-bars");
const sidebar = document.querySelector(".sidebar");

menuIcon.addEventListener("click", function(){
    sidebar.classList.toggle("active");
});
                                                           



