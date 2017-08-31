/*
	This software is licenced under the GNU General Purpose Licence 3.0 . see http://www.gnu.org/licenses/gpl-3.0.txt
	Copyright (C) 2014 Xavier "dascritch" Mouton-Dubosc
 */
(function(document,window) {
	'use strict';

	/**
	 * Important notice : this code should be able to run in any recent and decent browser.
	 * I coded it as strictly independant from Firefox, so you can re-use it
	 */

	var LAYOUT_ID = 'anchors-reveal';
	function reBuild() {
		var layout = document.createElement('div');
		layout.id = LAYOUT_ID;
		layout.dataset.anchors_reveal = true;
		layout.style = 'position : absolute;'+
				'top : 0px;'+
				'left : 0px;'+
				'margin : 0px;'+
				'padding : 0px;'+
				'border : none;'+
				'width : '+document.body.scrollWidth+'px;'+
				'height : '+document.body.scrollHeight+'px;'+
				'overflow : hidden;'+
				'z-index : 50;'+
				'pointer-events : none;';
		document.body.appendChild(layout);

		var style = document.createElement('style');
		style.scoped = true;
		style.appendChild( document.createTextNode(
				'a.' + LAYOUT_ID + ' {'+
					'position : absolute ;'+
					'font-family : sans-serif ;'+
					'font-size : 14px ;'+
					'font-weight : bold;'+
					'background : yellow ;'+
					'color : black;'+
					'padding : 4px ;'+
					'border : 1px black solid ;'+
					'opacity : 0.7 ;'+
					'pointer-events : auto;'+
				'}'+
				'a.' + LAYOUT_ID + ':hover {'+
					'opacity : 1 ;'+
					'color : black;'+
				'}'));
		layout.appendChild(style);

		var has = false;
		var valid_id = /^[a-zA-Z0-9\-\_\.]+$/;
		[].forEach.call(document.querySelectorAll('[id], a[name]'),
			function(el) {
				var id = el.id || el.name;
				if (
					el.dataset.anchors_reveal === undefined // not generated by the addon ?
					&& valid_id.test(id) // not malicious ?
					&& el.offsetWidth !== 0 && el.offsetHeight !== 0 && el.getClientRects().length !== 0 // visible ?
				) {
					var rect = el.getBoundingClientRect();
					var x = rect.left + window.scrollX;
					var y = rect.top + window.scrollY;
					if ( (! ( (x === 0) && (y === 0) )) // not on top, and really visible
						&& (rect.width !== 0 ) && (rect.height !== 0 ) ) {
						var tag = document.createElement('a');
                        tag.className = LAYOUT_ID;
						tag.dataset.anchors_reveal = true;
						tag.href = '#'+id;
						tag.style.left = x+'px';
						tag.style.top = y+'px';
						tag.appendChild( document.createTextNode('#'+id) );
						layout.appendChild(tag);
						has = true;
					}
				}
			}
		);
		if (!has) {
			window.alert('Unnamed puppy : Not a single ID element in this page. Bad dog, no biscuit.');
		}
	}

	function destroy() {
        window.removeEventListener('resize', destroy, false);
		var container = document.getElementById(LAYOUT_ID);
        if(container) {
            document.body.removeChild(container);
        } else {
           console.log('Failed to find container');
        }
	}

	if (document.getElementById(LAYOUT_ID) === null) {
		reBuild();
	} else {
		destroy();
	}

	window.addEventListener('resize', destroy, false);
})(document, window);
