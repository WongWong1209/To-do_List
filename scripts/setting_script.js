let lang_select = document.querySelector(".lang_select");

lang_select.value = localStorage.getItem("language");

setLang();
setLangSettings();

lang_select.addEventListener("change", e => {
    localStorage.setItem("language", e.currentTarget.value);
    setLang();
    setLangSettings();
    setFontFamily();
})