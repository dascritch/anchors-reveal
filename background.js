import { switch_layer } from './anchors-reveal.js';

/** TODO
 * 
 * Restore button action 
 * 
 */




const script_to_call = {
		file:'anchors-reveal.js'
};
const menu_id = 'anchors-reveal';
const ICONS = {
		"16": "data/icon-16.png",
		"32": "data/icon-32.png",
		"64": "data/icon-64.png"
};

const THEMES = {
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

	try {
		browser.contextMenus.remove(menu_id);
	} catch (error) {
		console.error('browser.contextMenus.remove',error)
	}


	browser.contextMenus.create({
		id: menu_id,
		title: browser.i18n.getMessage('buttonDescription'),
		icons: ICONS
	},
	() => {
		console.error('browser.runtime.lastError',browser.runtime.lastError)
		// TODO: Do not forget to read the "browser.runtime.lastError" property to
		// avoid warnings about an uncaught error when the menu item was created
		// before ("ID already exists: my-menu").
	});
	browser.contextMenus.onClicked.addListener(
		(_,tab) => { listener(tab); } // only one menu entry, no need to check
	);
};


function oops(e) {
	window.console.error(e);
}


function listener(tab, _) {
	browser.scripting.executeScript({
		func	: switch_layer,
		target	: { tabId: tab.id },
		world	: 'ISOLATED'
		//handleExecuteScriptAndInsertCSSErrors);
	});
}


function on_installed() {
	if (browser.action.onClicked.hasListener(listener)) {
		window.console.info('hasListener , clean up');
		browser.action.onClicked.removeListener(listener)
	}
	browser.action.onClicked.addListener(listener);
	add_contextual_menu();
}

on_installed();
browser.runtime.onInstalled.addListener(on_installed);
