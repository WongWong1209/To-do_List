let repo_name = "To-do_List";

function setLang() {
    let lang = localStorage.getItem("language");
    if (!lang) {
        lang = "en";
        localStorage.setItem("language", lang);
    }

    let setting = document.querySelector(".setting");
    let todolist = document.querySelector(".todolist");
    let aboutme = document.querySelector(".aboutme");

    fetch(`/${repo_name}/langs/${lang}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setting.innerText = data.nav.settings;
            todolist.innerText = data.nav.to_do_list;
            aboutme.innerText = data.nav.about_me;
        })
        .catch(error => {
            console.error('Error loading JSON file:', error);
        });
}

function setLangTodoList() {
    let lang = localStorage.getItem("language");
    if (!lang) {
        lang = "en";
        localStorage.setItem("language", lang);
    }

    let title = document.querySelector("h1 span");

    fetch(`/${repo_name}/langs/${lang}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            title.innerText = data.to_do_list.title;
        })
        .catch(error => {
            console.error('Error loading JSON file:', error);
        });
}

function setLangAboutMe() {
    let lang = localStorage.getItem("language");
    if (!lang) {
        lang = "en";
        localStorage.setItem("language", lang);
    }

    let title = document.querySelector("h1 span");
    let name = document.querySelector("#name");
    let location = document.querySelector("#location");
    let introduction = document.querySelector("#introduction");

    fetch(`/${repo_name}/langs/${lang}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            title.innerText = data.about_me.title;
            name.innerText = data.about_me.name;
            location.innerText = data.about_me.location;
            introduction.innerText = data.about_me.introduction;
        })
        .catch(error => {
            console.error('Error loading JSON file:', error);
        });
}

function setLangSettings() {
    let lang = localStorage.getItem("language");
    if (!lang) {
        lang = "en";
        localStorage.setItem("language", lang);
    }

    let title = document.querySelector("h1 span");
    let color_title = document.querySelector(".color-setting-area h2");
    let language_title = document.querySelector(".language-setting-area h2");

    fetch(`/${repo_name}/langs/${lang}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            title.innerText = data.settings.title;
            color_title.innerText = data.settings.color;
            language_title.innerText = data.settings.language;
        })
        .catch(error => {
            console.error('Error loading JSON file:', error);
        });
}