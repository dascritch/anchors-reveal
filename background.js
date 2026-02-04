import { menu_id, THEMES, default_theme } from './lib.js';
import { switch_layer } from './anchors-reveal.js';

if (typeof browser === 'undefined') {
	// Polyfill "browser" to "chrome" for chromium engines.
	// See https://github.com/Rob--W/fosdem-2024-ext/blob/main/code-samples/script-on-click-1/background.js
	globalThis.browser = chrome;
}


let target_tab_id ;

/** TODO
 * résoudre le problème de comptage sur Youtube
 * passer une partie du style en vriable pour la remonter en lib.js
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

function listener(tab, _) {
	target_tab_id = tab.id;
	browser.scripting.executeScript({
		func	: switch_layer,
		target	: { tabId: target_tab_id },
		world	: 'ISOLATED'
	}).then(feedback).catch(denied_action);
}

function menu_listener(_, tab) {
	// only one menu entry, no need to check
	listener(tab);
}

function install_event_act(event, act) {
	if (event.hasListener(act)) {
		event.removeListener(act)
	}
	event.addListener(act);
}

async function on_installed() {
	install_event_act(browser.action.onClicked, listener);
	browser.contextMenus.remove(menu_id).catch(e => {});

	browser.contextMenus.create({
		id: menu_id,
		title: browser.i18n.getMessage('buttonDescription'),
	});
	install_event_act(browser.contextMenus.onClicked, menu_listener);
}

on_installed();
browser.runtime.onInstalled.addListener(on_installed);
