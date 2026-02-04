import {THEMES, install_context_menu, transparent_class} from './lib.js';


let form_parameters;

function restoreOptions() {

	function setCurrentThemeChoice(result) {
		const theme_restored = result.theme || "ClassicalYellow";
		form_parameters.querySelector(`input[name="theme"][value="${theme_restored}"]`).checked = true;
	}

	function setCurrentMenuChoice(result) {
		const is_menu = result.menu || false;
		form_parameters.querySelector('input[name="menu"]').checked = is_menu;
		install_context_menu();
	}

	function setCurrentTransparentChoice({transparent}) {
		form_parameters.querySelector('input[name="transparent"]').checked = transparent;
		const cl = form_parameters.querySelector('#themes').classList;
		if (transparent) {
			cl.add(transparent_class);
		} else {
			cl.remove(transparent_class);
		}
	}

	browser.storage.local.get('theme').then(setCurrentThemeChoice, onError);
	browser.storage.local.get('menu').then(setCurrentMenuChoice, onError);
	browser.storage.local.get('transparent').then(setCurrentTransparentChoice, onError);
}

function saveOptions(event) {
	event.preventDefault();
	browser.storage.local.set({
		theme: form_parameters.theme.value,
		menu: form_parameters.menu.checked,
		transparent: form_parameters.transparent.checked,
	});
	restoreOptions();
}

function onError(error) {
	console.log(`Error: ${error}`);
}

function warmup() {
	console.log(1)
	form_parameters = document.getElementById('anchors-reveal-parameters');
	form_parameters.querySelector('#shortcut button').addEventListener('click', _ => browser.commands.openShortcutSettings());

	const isLocaleLabel = /^{[a-zA-Z0-9]+}$/;
	for (const legend of form_parameters.querySelectorAll('*')) {
		if (isLocaleLabel.test(legend.innerText)) {
			// weak templating
			legend.innerText = browser.i18n.getMessage(legend.innerText.replace('{','').replace('}',''));
		}
	}

	Array.from(form_parameters.querySelectorAll('input[type="radio"]')).
		forEach(function(element){
			var this_theme = THEMES[element.value];
			var demo_label = element.closest('label').querySelector('span');
			demo_label.style.color = this_theme.color;
			demo_label.style.background  = this_theme.background;
			demo_label.innerText = browser.i18n.getMessage(`ThemeNamed${element.value}`);
		}
	);

	restoreOptions();
	form_parameters.addEventListener('change', saveOptions);
	console.log(2)
}

warmup();
document.addEventListener('DOMContentLoaded', warmup);
