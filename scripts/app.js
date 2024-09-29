window.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
    }
});

let allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
    });
});

let btn_add_element = document.querySelector("button.btn-add-element");
btn_add_element.addEventListener("click", () => {
    console.log("CLICK!!!!!");
    let input_area = document.querySelector("section.input-area");
    let form_to_be_added = document.createElement("form");

    form_to_be_added.classList.add("list-element");
    form_to_be_added.innerHTML = `<form class="list-element">
                <input type="checkbox" class="btn-checkbox">
                <input type="text" class="input-text" placeholder="things to do">
                <button class="btn-trash"><i class="fas fa-trash"></i></button>
            </form>`;
    form_to_be_added.style.animation = "scaleUp 0.5s ease forwards";

    input_area.appendChild(form_to_be_added);
    addTrashListener(form_to_be_added.querySelector(".btn-trash"));
})

function addTrashListener(btn) {
    btn.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent form submission
        let element = e.target;
        while (element && !element.classList.contains('list-element')) {
            element = element.parentElement;
        }
        
        element.style.animation = "scaleDown 0.5s ease forwards";
        element.addEventListener("animationend", f => {
                f.target.remove();
            }
        );
    });
}
