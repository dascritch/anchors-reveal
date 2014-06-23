

var prefix = 'anchors-reveal';

if (document.getElementById(prefix+'-style') === null) {
	document.body.insertAdjacentHTML('beforeend',
		'<style id="'+prefix+'-style">'+
			'.'+prefix+' {'+
				' position : ABSOLUTE ;'+
				' font-family : sans-serif ;'+
				' font-size : 14px ;'+
				' font-weight : bold;'+
				' background : yellow ;'+
				' color : black;'+
				' padding : 4px ;'+
				' border : 1px black solid ;'+
				' opacity : 0.7 ;'+
			'}'+
			'.'+prefix+':hover {'+
				' opacity : 1 ;'+
				' color : black;'+
			'}'+
		'</style>'
	);
}

if (document.querySelector('.'+prefix) === null) {
	[].forEach.call(document.querySelectorAll('[id]'),
        function(el){
        	if (el.id.indexOf(prefix)!==0) {
	        	document.body.insertAdjacentHTML('beforeend',
	        		'<a class="'+prefix+'" href="#'+el.id+'" style="top:'+el.offsetTop+'px;left:'+el.offsetLeft+'px;">#'+el.id+'</a>'
	        	);
	        }
    	}
    );
}