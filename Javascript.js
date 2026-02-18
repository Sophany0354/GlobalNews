
    const btn = document.getElementById('show-more-btn');
    const extraContent = document.getElementById('more-following');

    btn.addEventListener('click', function() {
        if (extraContent.style.display === "none") {
            extraContent.style.display = "block";
            btn.innerHTML = "Show Less";
        } else {
            extraContent.style.display = "none";
            btn.innerHTML = "Show More";
        }
    });
