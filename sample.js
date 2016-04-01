window.onload = function ()
{
var canvas = document.getElementById("myCanvas"); // sets which div in the html the canvas will go in
var context = canvas.getContext("2d"); // creates 2D canvas and calls it "contex"

var xcoord=100; //coordinates of user conrolled green sqaure 
var ycoord=100; //coordinates of user conrolled green sqaure 

var xcoordRed = 20; //coordinates of automatically moving red square
var ycoordRed = 20; //coordinates of automatically moving red square

var widthRed = 50; //red square width 
var heightRed = 50; //red square height

var greenIncrement = 10; // increment green square is moved per key press

var nModRedX = 10; // x distance red square is moved per iteration
var nModRedY = 10; // y distance red square is moved per iteration

var snd = new Audio("click.wav"); // buffers automatically when created


window.addEventListener('keydown', whatKey, true); // listens for key to be pressed


 function whatKey(evt) { // Function checks for which arrow key is pressed

    switch (evt.keyCode) {
     
      case 37:
        xcoord = xcoord - greenIncrement;
        if (xcoord < 0) {
          xcoord = 0;
        } 
                 
      break;

      case 38:
        ycoord = ycoord - greenIncrement;
        if (ycoord < 0) {
          ycoord = 0;
        }
              
      break;

      case 39:
        xcoord = xcoord + greenIncrement; 
        if (xcoord > 750) {
          xcoord = 750;
        }
       
      break;  
          	   
      case 40:
        ycoord = ycoord + greenIncrement; 
        if (ycoord > 350) {
          ycoord = 350;
        }
			break;   	
       		  
    }         

	}

function animateRed(){
    	
  xcoordRed += nModRedX;
  ycoordRed += nModRedY;

  if (xcoordRed > 750 ){
    nModRedX = -10;
  }

  if (xcoordRed < 0) {
    nModRedX = 10;
  }

  if (ycoordRed>350) {
    nModRedY = -10;
  }

  if(ycoordRed < 0){
    nModRedY = 10;
  }

  checkCollision();
}

function checkCollision(){

  if (xcoord > (xcoordRed-widthRed) && xcoord < (xcoordRed+widthRed) && ycoord > (ycoordRed-heightRed) && ycoord < (ycoordRed+heightRed)) 
    {
    snd.play();
    return true;
    }
  else
    {
    return false;
    }
  }

function draw() {

  setTimeout(function() {
    requestAnimationFrame(draw);
    context.clearRect(0, 0, canvas.width, canvas.height); // Clears canvas
    context.fillStyle = "Red"; // Sets fill style to red
    context.fillRect(xcoordRed, ycoordRed, widthRed, heightRed); //Draws red square
    context.fillStyle = "Green"; // Sets fill style to green
    context.fillRect(xcoord,ycoord,50,50); // Draws green square
		context.stroke;
		animateRed()
    }, 1000 / 60);
}

draw();

}