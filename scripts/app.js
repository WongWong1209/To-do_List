setLang();
setLangTodoList();

Array.prototype.remove = function(index) {
    let rest = this.slice(index + 1);
    this.length = index;
    return this.push.apply(this, rest);
};

class Card {
    constructor(checkboxState, textContent, formId) {
        this.checkboxState = checkboxState;
        this.textContent = textContent;
        this.formId = formId;
    }
}

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

let cards = JSON.parse(localStorage.getItem("cards")) || [];
if(cards.length == 0) {
    let initCard = new Card(false, "", 0)
    cards.push(initCard);
}

for(card of cards) {
    let tc = card.textContent;
    if(card.textContent==undefined||card.textContent==null||card.textContent=="") {
        tc = "";
    }
    
    createNewElement(card.checkboxesState,  `"${tc}"`, card.formId);
}

let btn_add_element = document.querySelector("button.btn-add-element");
btn_add_element.addEventListener("click", () => {
    let index = 0;
    let alreadyExist = false;

    do {
        alreadyExist = cards.some(card => index == card.formId);
        if (alreadyExist) index++;
    } while (alreadyExist);
    createNewElement(false, "", index);

    let newCard = new Card(false, "", index);
    cards.push(newCard);
})

function createNewElement(checkboxState, textValue, id) {
    let not_checked = document.querySelector(".not_checked");
    let is_checked = document.querySelector(".is_checked");
    let form_to_be_added = document.createElement("form");

    form_to_be_added.classList.add("list-element");
    form_to_be_added.innerHTML = `<form class="list-element">
                <input type="checkbox" class="btn-checkbox" id="checkbox-${id}">
                <input type="text" class="input-text" placeholder="" id="text-${id}" value=${textValue}>
                <button class="btn-trash"><i class="fas fa-trash"></i></button>
            </form>`;
    form_to_be_added.style.animation = "scaleUp 0.5s ease forwards";
    if (checkboxState) form_to_be_added.querySelector(".btn-checkbox").checked = true;

    if (checkboxState) is_checked.appendChild(form_to_be_added);
    else not_checked.appendChild(form_to_be_added);

    addTrashListener(form_to_be_added.querySelector(".btn-trash"));
    addCheckBoxChangeListener(form_to_be_added.querySelector(".btn-checkbox"));
    addTextChangeListener(form_to_be_added.querySelector(".input-text"));

    let things_to_do;
    if (!checkboxState) things_to_do = document.querySelector(`.not_checked #text-${id}`);
    else things_to_do = document.querySelector(`.is_checked #text-${id}`);
    setElement(things_to_do);
}

function addTrashListener(btn) {
    btn.addEventListener("click", e => {
        e.preventDefault();
        let element = e.target;
        while (element && !element.classList.contains('list-element')) {
            element = element.parentElement;
        }

        let idOfText = element.querySelector(".input-text").id.split("-")[1];
        let indexOfText = 0;
        for (i in cards) {
            if (cards[i].formIds == idOfText) {
                indexOfText = i;
                break;
            }
        }
        cards.remove(indexOfText);
        storeData();

        deleteElementOnScreen(element);
    });
}

function deleteElementOnScreen(element) {
    element.style.animation = "scaleDown 0.5s ease forwards";
    element.addEventListener("animationend", e => {
        e.target.remove();
    });
}

function addCheckBoxChangeListener(theCheckbox) {
    theCheckbox.addEventListener("change", e => {
        e.stopPropagation();
        let isChecked = e.target.checked;
        let idOfCheckbox = e.target.id.split("-")[1];
        let indexOfCheckbox = 0;
        for (i in cards) {
            if (cards[i].formId == idOfCheckbox) {
                indexOfCheckbox = i;
                break;
            }
        }

        deleteElementOnScreen(e.target.parentElement);
        createNewElement(isChecked, cards[indexOfCheckbox].textContent, idOfCheckbox);
        cards[indexOfCheckbox].checkboxesState = isChecked;
        storeData();
    })
}

function addTextChangeListener(theText) {
    theText.addEventListener("change", e => {
        e.stopPropagation();
        let valueOfText = e.target.value;
        let idOfText = e.target.id.split("-")[1];
        let indexOfText = -1;
        
        for (i in cards) {
            if (cards[i].formId == idOfText) {
                indexOfText = i;
                break;
            }
        }
        cards[indexOfText].textContent = valueOfText;
        storeData();
    })
}

function storeData() {
    let cardToBeSave = [];

    for(card of cards) {
        if(card.textContent) cardToBeSave.push(card);
    }
    localStorage.setItem("cards", JSON.stringify(cardToBeSave));
}