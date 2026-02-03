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

export const default_theme = 'ClassicalYellow';


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