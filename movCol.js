window.onload = function() {

    var canvas = document.getElementById("myCanvas");

    var context = canvas.getContext("2d");

    var snd = new Audio("click.wav");

    var xcoord = 0;
    var ycoord = 0;
    var xcoordRed = 200;
    var ycoordRed = 200;
    var widthRed = 50;
    var heightRed = 50;

    context.fillStyle = "yellow";

    context.fillRect(xcoord, ycoord, 50, 50);

    context.fillStyle = "red";

    context.fillRect(200, 200, 50, 50);

    context.stroke;

    window.addEventListener('keydown', whatKey, true);



    function whatKey(evt) {

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = "red";

        context.fillRect(xcoordRed, ycoordRed, widthRed, heightRed);

        context.stroke;

        context.fillStyle = "yellow";

        switch (evt.keyCode) {


            case 39:

                xcoord = xcoord + 10;

                if (xcoord > 750) {

                    xcoord = 750;

                }
                if (checkCollision()) {

                    xcoord = xcoord - 10;

                }
                context.fillRect(xcoord, ycoord, 50, 50);

                context.stroke;

                break;

            case 37:

                xcoord = xcoord - 10;

                if (xcoord < 0) {

                    xcoord = 0;

                }

                if (checkCollision()) {
                    xcoord = xcoord + 10;

                }

                context.fillRect(xcoord, ycoord, 50, 50);

                context.stroke;

                break;

            case 38:

                ycoord = ycoord - 10;

                if (ycoord < 0) {

                    ycoord = 0;

                }

                console.log(ycoord);

                if (checkCollision()) {

                    ycoord = ycoord + 10;

                }

                context.fillRect(xcoord, ycoord, 50, 50);

                context.stroke;

                break;

            case 40:

                ycoord = ycoord + 10;

                if (ycoord > 350) {

                    ycoord = 350;

                }
                if (checkCollision()) {
                    ycoord = ycoord - 10;

                }


                context.fillRect(xcoord, ycoord, 50, 50);

                context.stroke;

                break;



        }
    }


    function checkCollision()

    {

        if (xcoord > (xcoordRed - widthRed) && xcoord < (xcoordRed + widthRed) && ycoord > (ycoordRed - heightRed) && ycoord < (ycoordRed + heightRed))

        {

            snd.play();

            return true;

        } else

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

xcoordRed = xcoordRed +1;

ycoordRed = ycoordRed +1;

}, 1000 / 60);

}

draw();


	
}