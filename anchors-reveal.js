/*
	This software is licenced under the GNU General Purpose Licence 3.0 . see http://www.gnu.org/licenses/gpl-3.0.txt
	Copyright (C) 2014 Xavier "dascritch" Mouton-Dubosc
 */
(function(document, window, browser) {
	'use strict';

	/**
	 * Important notice : this code should be able to run in any recent and decent browser.
	 * I coded it as strictly independant from Firefox, so you can re-use it
	 */

	const LAYOUT_ID = 'anchors-reveal';
	const TEMPLATE_SELECTOR = `template#${LAYOUT_ID}`;
	const LAYOUT_Z_INDEX = 2147483647; // 2^31-1 , theorical maximum 
	const HOST_STYLE = `
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
	`
	const STYLE = `
:host {
	${HOST_STYLE}
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
	font-family : sans-serif ;
	font-size : 14px ;
	font-weight : bold;
	padding : 4px ;
	border : 1px black solid ;
	opacity : 0.7 ;
	pointer-events : auto;
}
a:hover {
	opacity : 1 ;
}`;

	let valid_id = /^[a-zA-Z0-9\-\_\.]+$/;
	let session = null;
	let theme;

	if (window.customElements.get(LAYOUT_ID) === undefined) {
		
		class ExtensionLayer extends HTMLElement {
			constructor() {
				super();
				let template = document.querySelector(TEMPLATE_SELECTOR);
				let shadow_element = this.attachShadow({mode: "open"}); 
				shadow_element.innerHTML = template.innerHTML;
			}
			connectedCallback() {
				session = this;
				let shadow = this.shadowRoot;
				let div = shadow.querySelector('div');
				div.className = theme;

				function reveal_for_element(element) {
					let id = element.id || element.name;
					if (
						element.dataset.anchors_reveal === undefined // not generated by the addon ?
						&& valid_id.test(id) // not malicious ?
					) {
						let rect = element.getBoundingClientRect();
						let x = rect.left + window.scrollX;
						let y = rect.top + window.scrollY;
						if ( ! ( (x === 0) && (y === 0) )) {
							// not on top, and really visible
							let tag = document.createElement('a');
							tag.href = '#'+id;
							tag.style.left = x+'px';
							tag.style.top = y+'px';
							tag.innerText = '#'+id;
							div.appendChild(tag);
							has = true;
						}
					}
				}

				this.style = `
					width : ${document.body.scrollWidth}px;
					height : ${document.body.scrollHeight}px;
					${HOST_STYLE}`;

				let has = false;
				Array.from(document.querySelectorAll('[id], a[name]')).
					forEach(reveal_for_element);

				if (!has) {
					on_error('Unnamed puppy : Not a single ID element in this page. Bad dog, no biscuit.');
				}
			}
		}
		window.customElements.define(LAYOUT_ID, ExtensionLayer);
	}

	function build_layer() {
		if (!document.querySelector(TEMPLATE_SELECTOR)) {
			let template = document.createElement('template');
			template.id = LAYOUT_ID;
			template.innerHTML = `<style scoped>${STYLE}</style><div></div>`;
			document.head.appendChild(template);
		}

		let tag = document.createElement(LAYOUT_ID);
		document.body.appendChild(tag);
	}

	function destroy() {
		window.removeEventListener('resize', destroy, false);

		if (session) {
			session.remove();
		}

		// elements created via a webextension doesn't seems to be accessible 
		let container = document.getElementsByTagName(LAYOUT_ID)[0];
		if (container) {
			container.remove();
		} else {
		   on_error('Failed to find container');
		}
	}

	function on_error(error) {
		window.console.error(`Error in achors-reveal extension: ${error}`);
	}

/*
	function on_got_sidebar(result) {
		if (result.sidebar) {
			// TODO open sidebar

		}
		build_layer();
	}
*/

	function on_got_parameters(result) {
		//window.console.log({result})
		theme = result.theme
		build_layer();
	}

	if (document.querySelector(LAYOUT_ID) === null) {
		let getting_storage = browser.storage.local.get('theme');
		getting_storage.then(on_got_parameters, on_error);
	} else {
		destroy();
	}

	window.addEventListener('resize', destroy, false);
})(document, window, browser);
