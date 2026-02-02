import { switch_layer } from './anchors-reveal.js';

/** TODO
 * 
 * Restore button action 
 * Restore menu action
 * 
 */




const script_to_call = {
		file:'anchors-reveal.js'
};
const menu_id = 'anchors-reveal';

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
	browser.menus.create({
		id: menu_id,
		title: browser.i18n.getMessage('buttonDescription'),
		icons: {
			16: "data/icon-16.png",
			32: "data/icon-32.png"
		}
	});

	browser.menus.onClicked.addListener(function(info, tab) {
		if (info.menuItemId === menu_id) {
			browser.tabs.executeScript(script_to_call);
		}
	});
};

// end import

async function instantiate_contextual_menu(result) {
	try {
		await browser.menus.remove(menu_id);
	} catch (Error) {
		// It seems we cannot check if menu_id is really there before remove() it.
		return;
	}

	if (result.menu) {
		add_contextual_menu();
	}
}

/*
//The following was modified from http://stackoverflow.com/a/40517692/3773011 Copied by the author of the post.
function handleExecuteScriptAndInsertCSSErrors(tabId){
	if (chrome.runtime.lastError){
		let isFirefox = !!window.InstallTrigger;

		let message = chrome.runtime.lastError.message ? chrome.runtime.lastError : chrome.runtime.lastError.message;

		window.console.error(message);
	}
}
*/

function oops(e) {
	window.console.error(e);
}


function listener(tab, OnClickData) {
	window.console.info('browser.action.onClicked', {tab, OnClickData});

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
	browser.action.onClicked.addListener(listener)

	/*
	browser.contextMenus.create({
		id: 'sampleContextMenu',
		title: 'Sample Context Menu',
		contexts: ['selection'],
		// onclick: i => {}
		});
	let getting = browser.storage.local.get('menu');
	getting.then(instantiate_contextual_menu, oops);
	*/

}


browser.runtime.onInstalled.addListener(on_installed);
