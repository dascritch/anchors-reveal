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
		16: "data/icon-16.png",
		32: "data/icon-32.png",
		64: "data/icon-64.png"
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
	browser.contextMenus.create({
		id: menu_id,
		title: browser.i18n.getMessage('buttonDescription'),
		icons: ICONS
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
	window.console.info('on_installed', {listener});
	// remove_revealed();
	/*
	if (browser.action.onClicked.hasListener(listener)) {
		window.console.info('hasListener , clean up');
		browser.action.onClicked.removeListener(listener)
	}*/
	browser.action.onClicked.addListener(listener);
	add_contextual_menu();


}


browser.runtime.onInstalled.addListener(on_installed);
