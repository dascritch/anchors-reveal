// import {THEMES, add_contextual_menu} from 'lib';

var script_to_call = {file:'anchors-reveal.js'};
var menu_id = 'anchors-reveal';

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
};

function add_contextual_menu() {
	browser.contextMenus.create({
	  id: menu_id,
	  title: browser.i18n.getMessage('buttonDescription'),
	  icons: {
		"16": "data/icon-16.png",
		"32": "data/icon-32.png",
		"64": "data/icon-64.png"
	  }
	});

	browser.contextMenus.onClicked.addListener(function(info, tab) {
	  if (info.menuItemId === menu_id) {
		browser.tabs.executeScript(script_to_call);
	  }
	});
};

// end import


function update_contextual_menu(entry) {
	if (entry) {
		add_contextual_menu();
	} else {
		try {
			browser.contextMenus.remove(menu_id);
		}  catch (e) {

		}
	}
}


let form_parameters;


function saveOptions(event) {
	event.preventDefault();
	browser.storage.local.set({
		theme: form_parameters.theme.value,
		menu: form_parameters.menu.checked,
		//sidebar: form_parameters.sidebar.checked
	});
	update_contextual_menu( form_parameters.menu.checked );
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


	// BEEEEH , needs refactoring
	browser.storage.local.get('theme').then(setCurrentThemeChoice, onError);
	browser.storage.local.get('menu').then(setCurrentMenuChoice, onError);

	//browser.storage.local.get('sidebar').then(setCurrentSidebarChoice, onError);


	form_parameters = document.getElementById('anchors-reveal-parameters');
	form_parameters.querySelector('#shortcut button').addEventListener('click', _ => browser.commands.openShortcutSettings())

	form_parameters.addEventListener('input', saveOptions);

	// Yes, lazy i18n procedures, as nothing can be done in HTML code (but you can in CSS)
	var legends = form_parameters.querySelectorAll('legend') 
	legends[0].innerText = browser.i18n.getMessage('themeParameterDescription');
	legends[1].innerText = browser.i18n.getMessage('cumbersomeParametersDescription');

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


	// form_parameters.querySelector('#shortcut').innerText = 


}

document.addEventListener('DOMContentLoaded', restoreOptions);
