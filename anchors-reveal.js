/*
	This software is licenced under the GNU General Purpose Licence 3.0 . see http://www.gnu.org/licenses/gpl-3.0.txt
	Copyright (C) 2014 Xavier "dascritch" Mouton-Dubosc
 */
// 'use strict';

/**
 * Important notice : this code should be able to run in any recent and decent browser.
 * I coded it as strictly independant from Firefox, so you can re-use it
 */


export async function switch_layer() {
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

		.undefined a, .ClassicalYellow a {
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
			pointer-events : auto;
		}
		.transparent a {
			opacity : 0.7;
		}
		a:hover {
			opacity : 1 ;
		}`;

	let valid_id = /^[a-zA-Z0-9\-\_\.]+$/;
	let container = document.querySelector(LAYOUT_ID);
	let style;

	function build_layer() {
		function reveal_for_element(element) {
			const {id} = element;
			if (
				valid_id.test(id) // not malicious ?
			) {
				let rect = element.getBoundingClientRect();


				let x = rect.left + window.scrollX;
				let y = rect.top + window.scrollY;

				// try to NOT count undisplayable or irrelevant tags
				const insertable = ((x != 0) || (y != 0)) &&  // ones at top
					// Youtube uses a lot of HTML "visibles"  tags with zero w or h
				(rect.width > 0) && (rect.height > 0) &&
					// Hide hidden elements, but also svg elements as path or mask, or revealable (<details>)
				(element.hidden === false) &&
					// this does a lot of tests, but it's not bulletproof. b.ex, <svg:linearGradent> respond "true" improperly
					(element.checkVisibility({contentVisibilityAuto:true, opacityProperty:true, visibilityProperty:true})) &&
					(element.hidden === false) ;
				//window.console.log({element, id, insertable, rect, x,y , hidden : element.hidden , display : element.style.display, check: element.checkVisibility({contentVisibilityAuto:true, opacityProperty:true, visibilityProperty:true}) })
				if (insertable) {
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
		div.className = style.theme;
		if (style.transparent) {
			div.classList.add('transparent');
		}
		shadow.appendChild(div);

		Array.from(document.querySelectorAll('[id]')).
			forEach(reveal_for_element);

		
		if (count_tags === 0) {
			const noid_message = browser.i18n.getMessage('noIdMessage');
			on_error(noid_message);
			const tag = document.createElement('a');
			tag.innerText = noid_message;
			const dir = document.querySelector('anchors-reveal').shadowRoot.querySelector('div');
			div.appendChild(tag);
		}
		displayed = true;
	}

	function on_error(error) {
		window.console.error(`Error in anchors-reveal extension: ${error}`);
	}

	function on_got_parameters(getting_storage) {
		style = getting_storage;
		build_layer();
		window.removeEventListener('resize', destroy, false);
	}

	async function display_layer() {
		browser.storage.local.get().then(on_got_parameters);
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
		theme : style?.theme
	};
}

