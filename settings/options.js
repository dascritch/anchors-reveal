
'use strict';

var THEMES = {
    'ClassicalYellow' : {
        background : 'yellow',
        color : 'black'
    },
    'LightBlue'  : {
        background : '#aaf',
        color : 'black'
    },
    'WhitePaper' : {
        background : 'white',
        color : 'black'
    },
    'GothicAddict' : {
        background : 'black',
        color : 'white'
    },
}

var form_parameters;

function saveOptions(event) {
    event.preventDefault();
    browser.storage.local.set({
        theme: form_parameters.theme.value
    });
}

function restoreOptions() {

    function setCurrentChoice(result) {
        var theme_restored = result.theme || "ClassicalYellow";
        form_parameters.querySelector(`input[name="theme"][value="${theme_restored}"]`).checked = true;
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    var getting = browser.storage.local.get('theme');
    getting.then(setCurrentChoice, onError);

    form_parameters = document.getElementById('anchors-reveal-parameters');
    form_parameters.addEventListener('input', saveOptions);

    // Yes, lazy i18n procedures, as nothing can be done in HTML code (but you can in CSS)
    form_parameters.querySelector('legend').innerHTML = browser.i18n.getMessage('themeParameterDescription');

    Array.from(form_parameters.querySelectorAll('input')).
        forEach(function(element){
            var this_theme = THEMES[element.value];
            var demo_label = element.closest('label').querySelector('span');
            demo_label.style.color = this_theme.color;
            demo_label.style.background  = this_theme.background;
            demo_label.innerHTML = browser.i18n.getMessage(`ThemeNamed${element.value}`);
        }
    )
}

document.addEventListener('DOMContentLoaded', restoreOptions);
