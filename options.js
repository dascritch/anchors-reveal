import {THEMES, install_context_menu} from './lib.js';


let form_parameters;


function saveOptions(event) {
	event.preventDefault();
	browser.storage.local.set({
		theme: form_parameters.theme.value,
		menu: form_parameters.menu.checked,
		//sidebar: form_parameters.sidebar.checked
	});
	install_context_menu();
}

function restoreOptions() {

	function setCurrentThemeChoice(result) {
		const theme_restored = result.theme || "ClassicalYellow";
		form_parameters.querySelector(`input[name="theme"][value="${theme_restored}"]`).checked = true;
	}

	function setCurrentMenuChoice(result) {
		const is_menu = result.menu || false;
		form_parameters.querySelector('input[name="menu"]').checked = is_menu;
	}

	/*
	function setCurrentSidebarChoice(result) {
		const is_sidebar = result.sidebar || false;
		form_parameters.querySelector('input[name="sidebar"]').checked = is_sidebar;
	}
	*/

	function onError(error) {
		console.log(`Error: ${error}`);
	}


	browser.storage.local.get('theme').then(setCurrentThemeChoice, onError);
	browser.storage.local.get('menu').then(setCurrentMenuChoice, onError);

	//browser.storage.local.get('sidebar').then(setCurrentSidebarChoice, onError);


	form_parameters = document.getElementById('anchors-reveal-parameters');
	form_parameters.querySelector('#shortcut button').addEventListener('click', _ => browser.commands.openShortcutSettings())

	form_parameters.addEventListener('input', saveOptions);


	for (const legend of form_parameters.querySelectorAll('legend')) {
		legend.innerText = browser.i18n.getMessage(legend.innerText.replace('{','').replace('}',''));
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

	form_parameters.querySelector('input[name="menu"] + span').innerText = browser.i18n.getMessage('checkContextMenu');
	// form_parameters.querySelector('input[name="sidebar"] + span').innerText = browser.i18n.getMessage('checkSidebar');


}

restoreOptions();
document.addEventListener('DOMContentLoaded', restoreOptions);
