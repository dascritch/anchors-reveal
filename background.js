import { menu_id, THEMES, default_theme, listener, install_event_act, install_context_menu } from './lib.js';
import { switch_layer } from './anchors-reveal.js';

if (typeof browser === 'undefined') {
	// Polyfill "browser" to "chrome" for chromium engines.
	// See https://github.com/Rob--W/fosdem-2024-ext/blob/main/code-samples/script-on-click-1/background.js
	globalThis.browser = chrome;
}


async function on_installed() {
	install_event_act(browser.action.onClicked, listener);
	install_context_menu();
	
}

on_installed();
browser.runtime.onInstalled.addListener(on_installed);
