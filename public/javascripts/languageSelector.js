// language selector

const langSelector = document.getElementById("language-selector");

const links = document.getElementsByClassName("i18n-link");

function getCookie(name) {
  const re = new RegExp(name + "=([^;]+)");
  let value = re.exec(document.cookie);
  return value != null ? unescape(value[1]) : null;
}

const cookie = getCookie("i18n");

for (let i = 0; i < links.length; i++) {
  let temprorary = i;
  if (links[i].textContent === cookie) {
    temprorary = i;
    links[i].classList.add("active");
    langSelector.insertBefore(links[i], langSelector.childNodes[0]);
  }
}

var lang = document.querySelector("html").getAttribute("lang") || "en-US";
/* The usual "readystatechange" event listener works if
       you need to wait

       document.addEventListener("readystatechange", function () {
            if (document.readyState === "complete") init();
       }))
    */

init();

function init() {
  selectDefault();
  setEventHandlers();
}

function setEventHandlers() {
  var items = document.querySelectorAll("div.selector-container li.language a");
  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function (e) {
      selectLanguage(e.target.parentNode);
    });
  }
}

function selectDefault() {
  /* See if we can select anything in the language selector
           based on our locale code. */
  var base = document.querySelector("div.selector-container li#" + lang);
  /* ...and try to default to anything we've found */
  if (base !== "undefined") selectLanguage(base);
}

function selectLanguage(target) {
  /* 'click' event was triggered on any of the language selector
           entries. */
  var selected = document.querySelector("li.selected");
  var dropdown = document.querySelector(".dropdown");

  /* don't do anything if we would be switching to the same
           language */
  if (target === selected) return;

  /* SWITCH LANGUAGE.

           ...but we are only "swapping elements" in the menu (the
           code doesn't navigate in actuality). A target language
           domain or a CST query parameter could result in a page
           load.

           The "dropdown" approach showcased here is also an
           illustration of a frequent issue: when selectLanguage() is
           called, the selected target language is replacing the
           current one in the dropdown list. So, if you are particular
           about the target languages being listed in a set order, a
           hide/show approach might work better than DOM element
           swapping. */
  target.setAttribute("class", "language selected");
  selected.setAttribute("class", "language");

  selected.parentNode.replaceChild(target, selected);
  dropdown.insertBefore(selected, dropdown.firstChild);
}
