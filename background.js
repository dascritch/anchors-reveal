import { switch_layer } from './anchors-reveal.js';

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

function feedback(output) {

	if (output.length < 1) {
		console.error('problem in feedback', {output})
		return;
	}
	const {result} = output[0];
	let theme = THEMES[result.theme ?? 'ClassicalYellow'];
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

	browser.scripting.executeScript({
		func	: switch_layer,
		args	: [browser.i18n.getMessage('noIdMessage')],
		target	: { tabId: tab.id },
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
		icons: ICONS
	});
	install_event_act(browser.contextMenus.onClicked, menu_listener);
}

on_installed();
browser.runtime.onInstalled.addListener(on_installed);
