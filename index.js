/*
	This software is licenced under the GNU General Purpose Licence 3.0 . see http://www.gnu.org/licenses/gpl-3.0.txt
	Copyright (C) 2014 Xavier "dascritch" Mouton-Dubosc
 */
(function() {
	'use strict';

	var buttons = require('sdk/ui/button/action');
	var tabs = require("sdk/tabs");
	var self = require("sdk/self");

	var button = buttons.ActionButton({
		id		: "anchors-reveal",
		label	: "Reveal anchors in the page",
		icon	: {
			"16"	: "./icon-16.png",
			"32"	: "./icon-32.png",
			"64"	: "./icon-64.png"
		},
		onClick: handleClick
	});

	function handleClick(state) {
		require("sdk/tabs").activeTab.attach({
			contentScriptFile : self.data.url("./anchors-reveal.js")
		});
	}

})();