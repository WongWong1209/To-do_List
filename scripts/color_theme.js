let colors = {
    green: ["rgb(38, 48, 34)", "rgb(28, 35, 25)"],
    yellow: ["rgb(182, 182, 49)", "rgb(130, 104, 0)"],
    blue: ["rgb(0, 86, 136)", "rgb(0, 50, 79)"],
    black: ["rgb(37, 37, 37)", "rgb(19, 19, 19)"],
    cyan: ["rgb(0, 136, 125)", "rgb(0, 80, 74)"],
    pink: ["rgb(211, 122, 196)", "rgb(124, 43, 111)"],
};

function changeColorTheme() {
    let colorTag = localStorage.getItem("color_tag");
    let body = document.body;
    let nav = document.querySelector("nav");

    if (!colorTag) {
        colorTag = "green";
        localStorage.setItem("color_tag", "green");
    }

    body.style.backgroundColor = colors[colorTag][0];
    nav.style.backgroundColor = colors[colorTag][1];
}

changeColorTheme();

function changeOnClick(color) {
    localStorage.setItem("color_tag", color);
    changeColorTheme();
}