// ES6 import modules doesn't seems working in WebExtension context :/

export const menu_id = 'anchors-reveal';

export const THEMES = {
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


let target_tab_id ;

/** TODO
 * remettre le menu switch off
 * passer une partie du style en variable pour la remonter en lib.js
 * passer en ws
 * https://github.com/mozilla/webextension-polyfill
**/

function feedback(output) {

	if ((output.length < 1) || (output[0] === undefined)) {
		throw Error(`Anchors-reveal had an issue : ${output}`);
		return;
	}
	const {result, error} = output[0];

	if (error) {
		throw Error(`Anchors-reveal had an error : ${error}`);
		return
	}

	let theme = THEMES[result.theme ?? default_theme];
	browser.action.setBadgeText({ text:
		result.displayed ? String(result.count_tags) : null
	});
	browser.action.setBadgeBackgroundColor({ color:theme.background });
	browser.action.setBadgeTextColor({ color:theme.color });
}

function denied_action(e) {
	console.error(`Anchors-reveal action is not available here: ${e}`)
	// may be trigerred by a security feature
	browser.action.setBadgeBackgroundColor({ color:'transparent' });
	browser.action.setBadgeTextColor({ color:'red' });
	browser.action.setBadgeText({ text: '⛔'});
}

export function listener(tab, _) {
	target_tab_id = tab.id;
	browser.scripting.executeScript({
		func    : switch_layer,
		target	: { tabId: target_tab_id },
		world	: 'ISOLATED'
	}).then(feedback).catch(denied_action);
}

function menu_listener(_, tab) {
	// only one menu entry, no need to check
	listener(tab);
}

export const default_theme = 'ClassicalYellow';

export function install_event_act(event, act) {
	if (event.hasListener(act)) {
		event.removeListener(act)
	}
	event.addListener(act);
}


export async function install_context_menu() {
	browser.contextMenus.remove(menu_id).catch(e => {});
	browser.storage.local.get('menu').then( ({menu}) => {
		menu ??= true; 

		if (menu) {
			browser.contextMenus.create({
				id: menu_id,
				title: browser.i18n.getMessage('buttonDescription'),
			});
			install_event_act(browser.contextMenus.onClicked, menu_listener);
			}
		}
	)
}

/**
  
export const ICONS = {
		"16": "data/icon-16.png",
		"32": "data/icon-32.png",
		"64": "data/icon-64.png"
};
**/


/*


export function add_contextual_menu() {
	browser.contextMenus.create({
	  id: menu_id,
	  title: browser.i18n.getMessage('buttonDescription'),
	  icons: {
		'16': "data/icon-16.png",
		'32': "data/icon-32.png"
	  }
	});

	browser.contextMenus.onClicked.addListener(function(info, tab) {
	  if (info.menuItemId === menu_id) {
		browser.tabs.executeScript(script_to_call);
	  }
	});
};

*/