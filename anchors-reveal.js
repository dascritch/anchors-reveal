/*
	This software is licenced under the GNU General Purpose Licence 3.0 . see http://www.gnu.org/licenses/gpl-3.0.txt
	Copyright (C) 2014 Xavier "dascritch" Mouton-Dubosc
 */
// 'use strict';

/**
 * Important notice : this code should be able to run in any recent and decent browser.
 * I coded it as strictly independant from Firefox, so you can re-use it
 */


export async function switch_layer(noIdMessage) {
	/*  /!\ Important : as this function will be inserted serialized, no external value or function must be used */

	let count_tags = 0;
	let displayed = false;

	const LAYOUT_ID = 'anchors-reveal';
	const LAYOUT_Z_INDEX = 2**31-1; // 2_147_483_647 the uppest z-index value 
	const STYLE = `
		:host {
			z-index : ${LAYOUT_Z_INDEX};
			position : absolute;
			top : 0px;
			left : 0px;
			bottom : 0px;
			right : 0px;
			margin : 0px;
			padding : 0px;
			border : none;
			overflow : hidden;
			pointer-events : none;
		}

		div a, .ClassicalYellow a {
			background-color : yellow;
			color : black;
		}

		.LightBlue a {
			background-color : #aaf;
			color : black;
		}

		.WhitePaper a {
			background-color : white;
			color : black;
		}

		.GothicAddict a {
			background-color : black;
			color : white;
		}

		a {
			position : absolute ;
			font-family : sans-serif;
			font-size : 14px;
			font-weight : bold;
			padding : 4px;
			border : 1px black solid;
			opacity : 0.7;
			pointer-events : auto;
		}
		a:hover {
			opacity : 1 ;
		}`;

	let valid_id = /^[a-zA-Z0-9\-\_\.]+$/;
	let container = document.querySelector(LAYOUT_ID);
	let theme;

	function build_layer() {
		function reveal_for_element(element) {
			const {id} = element;
			if (
				valid_id.test(id) // not malicious ?
			) {
				let rect = element.getBoundingClientRect();
				let x = rect.left + window.scrollX;
				let y = rect.top + window.scrollY;
				if ((x != 0) || (y != 0)) {
					// not on top, and really visible
					let tag = document.createElement('a');
					tag.href = '#'+id;
					tag.style.left = x+'px';
					tag.style.top = y+'px';
					tag.innerText = '#'+id;
					div.appendChild(tag);
					count_tags++;
				}
			}
		}

		let container = document.createElement(LAYOUT_ID);
		document.body.appendChild(container);
		container.style = `
			width : ${document.body.scrollWidth}px;
			height : ${document.body.scrollHeight}px;
			`;

		let shadow = container.attachShadow({mode: "open"});
		const style_element = document.createElement('style');
		style_element.scoped = true;
		style_element.innerText = STYLE;
		shadow.appendChild(style_element);

		const div = document.createElement('div');
		div.className = theme;
		shadow.appendChild(div);

		Array.from(document.querySelectorAll('[id]')).
			forEach(reveal_for_element);

		
		if (count_tags === 0) {
			on_error('Unnamed puppy : Not a single ID element in this page. Bad dog, no biscuit.');
			// message on screen : "no id, try contextual menu “copy to highlight” instead"
			let tag = document.createElement('a');
			tag.innerText = noIdMessage;
			div.appendChild(tag);
		}
		displayed = true;
	}

	function on_error(error) {
		window.console.error(`Error in anchors-reveal extension: ${error}`);
	}

	function on_got_parameters(result) {
		theme = result.theme;
		build_layer();
		window.removeEventListener('resize', destroy, false);
	}

	async function display_layer() {
		let getting_storage = await browser.storage.local.get('theme');
		on_got_parameters(getting_storage);
	}

	function destroy() {
		container?.remove();
	}

	if (container === null) {
		await display_layer();
	} else {
		destroy();
	}

	return {
		count_tags,
		displayed,
		theme
	};
}

