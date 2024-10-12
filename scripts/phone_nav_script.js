let phone_nav_options_btn = document.querySelector(".phone-nav-btn");
let nav_is_triggered = false;

console.log(phone_nav_options_btn);

phone_nav_options_btn.addEventListener("click", () => {
    let header = document.querySelector("header");
    let main = document.querySelector("main");

    if (nav_is_triggered) {
        header.style.transform = "translateY(-162px)";
        main.style.transform = "translateY(-100px)";
    }
    else {
        header.style.transform = "translateY(40px)";
        main.style.transform = "translateY(40px)";
    }

    nav_is_triggered = !nav_is_triggered;
})