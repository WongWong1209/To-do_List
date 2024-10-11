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

let formIds = JSON.parse(localStorage.getItem("formIds"));
let checkboxesState = JSON.parse(localStorage.getItem("checkboxesState"));
let textsContent = JSON.parse(localStorage.getItem("textsContent"));

if (!formIds) formIds = [0];
if (!checkboxesState) checkboxesState = [false];
if (!textsContent) textsContent = [""];

if (checkboxesState) {
    for (i in checkboxesState) {
        createNewElement(checkboxesState[i], textsContent[i], formIds[i]);
    }
}

let btn_add_element = document.querySelector("button.btn-add-element");
btn_add_element.addEventListener("click", () => {
    let index = 0;
    let alreadyExist = false;

    do {
        if (formIds) alreadyExist = formIds.some(formid => index == formid);
        if (alreadyExist) index++;
    } while (alreadyExist);

    createNewElement(false, "", index);

    formIds.push(index);
    checkboxesState.push(false);
    textsContent.push(null);
})

function createNewElement(checkboxState, textValue, id) {
    let input_area = document.querySelector("section.input-area");
    let form_to_be_added = document.createElement("form");

    form_to_be_added.classList.add("list-element");
    form_to_be_added.innerHTML = `<form class="list-element">
                <input type="checkbox" class="btn-checkbox" id="checkbox-${id}">
                <input type="text" class="input-text" placeholder="things to do" id="text-${id}" value="${textValue}">
                <button class="btn-trash"><i class="fas fa-trash"></i></button>
            </form>`;
    form_to_be_added.style.animation = "scaleUp 0.5s ease forwards";
    if (checkboxState) form_to_be_added.querySelector(".btn-checkbox").checked = true;

    input_area.appendChild(form_to_be_added);
    addTrashListener(form_to_be_added.querySelector(".btn-trash"));
    addCheckBoxChangeListener(form_to_be_added.querySelector(".btn-checkbox"));
    addTextChangeListener(form_to_be_added.querySelector(".input-text"));
}

function addTrashListener(btn) {
    btn.addEventListener("click", e => {
        e.preventDefault(); // Prevent form submission
        let element = e.target;
        while (element && !element.classList.contains('list-element')) {
            element = element.parentElement;
        }

        let idOfText = element.querySelector(".input-text").id.split("-")[1];
        let indexOfText = 0;
        for (i in formIds) {
            if (formIds[i] == idOfText) {
                indexOfText = i;
                break;
            }
        }
        textsContent[indexOfText] = null;
        storeData();

        element.style.animation = "scaleDown 0.5s ease forwards";
        element.addEventListener("animationend", f => {
            f.target.remove();
        }
        );
    });
}

function addCheckBoxChangeListener(theCheckbox) {
    theCheckbox.addEventListener("change", e => {
        e.stopPropagation();
        let isChecked = e.target.checked;
        let idOfCheckbox = e.target.id.split("-")[1];
        let indexOfCheckbox = 0;
        for (i in formIds) {
            if (formIds[i] == idOfCheckbox) {
                indexOfCheckbox = i;
                break;
            }
        }

        checkboxesState[indexOfCheckbox] = isChecked;
        storeData();
    })
}

function addTextChangeListener(theText) {
    theText.addEventListener("change", e => {
        e.stopPropagation();
        let valueOfText = e.target.value;
        let idOfText = e.target.id.split("-")[1];
        let indexOfText = 0;
        for (i in formIds) {
            if (formIds[i] == idOfText) {
                indexOfText = i;
                break;
            }
        }

        textsContent[indexOfText] = valueOfText;
        storeData();
    })
}

function storeData() {
    let idToBeStore = [];
    let checkboxStateToBeStore = [];
    let textContentToBeStore = [];

    if (textsContent) {
        textsContent.forEach((n, i) => {
            if (n) {
                idToBeStore.push(formIds[i]);
                checkboxStateToBeStore.push(checkboxesState[i]);
                textContentToBeStore.push(textsContent[i]);
            }
        });
    }

    localStorage.setItem("formIds", JSON.stringify(idToBeStore));
    localStorage.setItem("checkboxesState", JSON.stringify(checkboxStateToBeStore));
    localStorage.setItem("textsContent", JSON.stringify(textContentToBeStore));
}