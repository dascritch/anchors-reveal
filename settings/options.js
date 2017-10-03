// Loosely adapted from https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Implement_a_settings_page

var THEMES = {
    'classical_yellow' : {
        background : 'yellow',
        color : 'black'
    },
    'light_blue'  : {
        background : '#aaf',
        color : 'black'
    },
    'white_paper' : {
        background : 'white',
        color : 'black'
    },
    'gothic_addict' : {
        background : 'black',
        color : 'white'
    },
}


function saveOptions(event) {
  event.preventDefault();
  browser.storage.local.set({
    theme: document.getElementById("anchors-reveal-parameters").theme.value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    var theme_restored = result.theme || "classical_yellow";
    document.querySelector(`#anchors-reveal-parameters input[name="theme"][value="${theme_restored}"]`).checked = true;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("theme");
  getting.then(setCurrentChoice, onError);

  Array.from(document.querySelector('#anchors-reveal-parameters input')).
        forEach(function(element){
            var this_theme = THEMES[element.value];
            var parent = element.closest('label');
            parent.style.color = this_theme.color;
            parent.style.background  = this_theme.background;
        }
    )
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions)