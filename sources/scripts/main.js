/*jshint undef:false */
function pointDistance(x, y, x0, y0){
	return Math.sqrt((x -= x0) * x + (y -= y0) * y);
}

function degreesToRadians(deg) {
	return deg * (Math.PI / 180);
}

function radiansToDegrees(rad) {
	return rad / (Math.PI / 180);
}

function scaleConverter(current, max, _scale, object) {
	// console.log(current, max, scale);
	var scale = (max * _scale) / current;

    if(!object){
        return scale;
    }
    if(object.scale){
        object.scale.x = object.scale.y = scale;
    }else if(object.getContent() && object.getContent().scale){
        object.getContent().scale.x = object.getContent().scale.y = scale;
    }
    return scale;
}
function shuffle(array) {
    var counter = array.length, temp, index;
    while (counter > 0) {
        index = Math.floor(Math.random() * counter);
        counter--;
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

function testMobile() {
    return false;// Modernizr.touch || window.innerWidth < 600
}

var windowWidth = window.innerWidth * 2;//750,
windowHeight = window.innerHeight * 2;//1334;

var renderer;
var windowWidthVar = screen.width;
windowHeightVar = screen.height;
var retina = 2;

var renderer = PIXI.autoDetectRecommendedRenderer(windowWidth, windowHeight, {antialias:true, resolution:retina});
document.body.appendChild(renderer.view);

var APP;
APP = new Application();
APP.build();

var orientation = "PORTAIT"
function update() {
	requestAnimFrame(update );
	var tempRation =  orientation === "PORTAIT" ?(window.innerHeight/windowHeight):(window.innerWidth/windowWidth);
	var ratio = tempRation;
	windowWidthVar = windowWidth * ratio;
	windowHeightVar = windowHeight * ratio;
	renderer.view.style.width = windowWidthVar+'px';
	renderer.view.style.height = windowHeightVar+'px';
	APP.update();
	renderer.render(APP.stage);
}

var initialize = function(){
	// //inicia o game e da um build
	PIXI.BaseTexture.SCALE_MODE = 2;
	requestAnimFrame(update);
};

(function () {
	var App = {
		init: function () {
			initialize();
		}
	};
	$(App.init);
})();





