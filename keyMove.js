window.onload = function ()
{

var canvas = document.getElementById("myCanvas");

var context = canvas.getContext("2d");

var xcoord=0;
var ycoord=0;

window.addEventListener('keydown', whatKey, true);



function whatKey(evt) {

context.clearRect ( 0 , 0 , canvas.width, canvas.height );

context.fillText(evt.keyCode,50,50);
switch (evt.keyCode) {


case 39:

	xcoord = xcoord + 10;

	if (xcoord > 750) {

 xcoord = 750;

	}

context.fillRect(xcoord,ycoord,50,50);

	context.stroke;

break;

case 37:

xcoord = xcoord - 10;

	if (xcoord < 50) {

 xcoord = 50;

	}

	context.fillRect(xcoord,ycoord,50,50);

	context.stroke;

break;

case 38:

ycoord = ycoord - 10;

	if (xcoord < 50) {

 xcoord = 50;

	}

	context.fillRect(xcoord,ycoord,50,50);

	context.stroke;

break;

case 40:

ycoord = ycoord + 10;

	if (ycoord > 450) {

 ycoord = 450;

	}

	context.fillRect(xcoord,ycoord,50,50);

	context.stroke;

break;



}
}
}