let phone_nav_options_btn = document.querySelector(".phone-nav-btn");
let nav_is_triggered = false;

phone_nav_options_btn.addEventListener("click", () => {
    let header = document.querySelector("header");
    let nav_bar = document.querySelector(".phone-nav");

    if (nav_is_triggered) {
        header.style.display = "none";
        nav_bar.style.boxShadow = "0 8px 6px -6px black";
    }
    else {
        header.style.display = "block";
        nav_bar.style.boxShadow = "none";
    }

    nav_is_triggered = !nav_is_triggered;
})