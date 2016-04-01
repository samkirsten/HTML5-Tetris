window.onload = function ()
{

var canvas = document.getElementById("myCanvas");

var context = canvas.getContext("2d");

var snd = new Audio("click.wav"); 

var xcoord=0;
var ycoord=0;

context.fillStyle = "yellow";

context.fillRect(xcoord,ycoord,50,50);

context.fillStyle = "red";

context.fillRect(200,200,50,50);

context.stroke;

window.addEventListener('keydown', whatKey, true);



function whatKey(evt) {

context.clearRect ( 0 , 0 , canvas.width, canvas.height );

context.fillStyle = "red";

context.fillRect(200,200,50,50);

context.stroke;

context.fillStyle = "yellow";

switch (evt.keyCode) {


case 39:

	xcoord = xcoord + 10;

	if (xcoord > 750) {

 xcoord = 750;

	}
if (xcoord > 150 && xcoord < 250 && ycoord > 150 && ycoord < 250) {

xcoord = xcoord - 10;

}
context.fillRect(xcoord,ycoord,50,50);

	context.stroke;

break;

case 37:

xcoord = xcoord - 10;

	if (xcoord < 0) {

 xcoord = 0;

	}

	if (xcoord < 250 && xcoord > 150 && ycoord > 150 && ycoord < 250) {

xcoord = xcoord + 10;

}
	
	context.fillRect(xcoord,ycoord,50,50);

	context.stroke;

break;

case 38:

ycoord = ycoord - 10;

	if (ycoord < 0) {

 ycoord = 0;

	}

console.log(ycoord);
	
if (xcoord < 250 && xcoord > 150 && ycoord > 150 && ycoord < 250) {

ycoord = ycoord + 10;

}

	context.fillRect(xcoord,ycoord,50,50);

	context.stroke;

break;

case 40:

ycoord = ycoord + 10;

	if (ycoord > 350) {

 ycoord = 350;

	}
	
if (xcoord < 250 && xcoord > 150 && ycoord > 150 && ycoord < 250) {

ycoord = ycoord - 10;

}


	context.fillRect(xcoord,ycoord,50,50);

	context.stroke;

break;



}
}
}