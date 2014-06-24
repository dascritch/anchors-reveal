'use strict';

var prefix = 'dascritch---anchors-reveal';
function reBuild() {
	document.body.insertAdjacentHTML('beforeend',
		'<div id="'+prefix+'" style="'+
			'position : static;'+
			'top : 0px;'+
			'bottom : 0px;'+
			'left : 0px;'+
			'right : 0px;'+
			'margin : 0px;'+
			'padding : 0px;'+
			'border : none;'+
			'width : 100%;'+
			'height : 100%;'+
			'overflow : hidden;'+
			'z-index : 50;'+
			'pointer-events : none;'+
			'">'+
			'<style scoped>'+
				'a'+' {'+
					' position : absolute ;'+
					' font-family : sans-serif ;'+
					' font-size : 14px ;'+
					' font-weight : bold;'+
					' background : yellow ;'+
					' color : black;'+
					' padding : 4px ;'+
					' border : 1px black solid ;'+
					' opacity : 0.7 ;'+
					'pointer-events : auto;'+
				'}'+
				'a:hover {'+
					' opacity : 1 ;'+
					' color : black;'+
				'}'+
			'</style>'+
		'</div>'
	);
	var layout = document.getElementById(prefix);
	[].forEach.call(document.querySelectorAll('[id]'),
	    function(el) {
	    	if (el.id.indexOf(prefix)!==0) {
	        	layout.insertAdjacentHTML('beforeend',
	        		'<a href="#'+el.id+'" style="top:'+el.offsetTop+'px;left:'+el.offsetLeft+'px;">#'+el.id+'</a>'
	        	);
	        }
		}
	);
}

function destroy() {
	document.body.removeChild(document.getElementById(prefix));
}

if (document.getElementById(prefix) === null) {
	reBuild();
} else {
	destroy();
}
