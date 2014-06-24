'use strict';

/**
 * Important notice : this code should be able to run  in any recent and decent browser.
 * I coded it as strictly independant from Firefox, so you can re-use it
 */

var prefix = 'dascritch---anchors-reveal';
function reBuild() {
	document.body.insertAdjacentHTML('beforeend',
		'<div id="'+prefix+'" style="'+
			'position : absolute;'+
			'top : 0px;'+
			'left : 0px;'+
			'margin : 0px;'+
			'padding : 0px;'+
			'border : none;'+
			'width : '+document.body.scrollWidth+'px;'+
			'height : '+document.body.scrollHeight+'px;'+
			'overflow : hidden;'+
			'z-index : 50;'+
			'pointer-events : none;'+
			'">'+
			'<style scoped>'+
				'a'+' {'+
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
				'a:hover {'+
					'opacity : 1 ;'+
					'color : black;'+
				'}'+
			'</style>'+
		'</div>'
	);
	var layout = document.getElementById(prefix);
	var has = false;
	[].forEach.call(document.querySelectorAll('[id]'),
	    function(el) {
	    	if (el.id.indexOf(prefix)!==0) {
				var rect = el.getBoundingClientRect();
				var x = rect.left + window.scrollX;
				var y = rect.top + window.scrollY;
	        	layout.insertAdjacentHTML('beforeend',
	        		'<a href="#'+el.id+'" style="top : '+y+'px ; left : '+x+'px ;">#'+el.id+'</a>'
	        	);
	        	has = true;
	        }
		}
	);
	if (!has) {
		window.alert('Unnamed puppy : Not a single ID element in this page. Bad dog, no biscuit.');
	}
}

function destroy() {
	document.body.removeChild(document.getElementById(prefix));
}

if (document.getElementById(prefix) === null) {
	reBuild();
} else {
	destroy();
}
