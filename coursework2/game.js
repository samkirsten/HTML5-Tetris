//https://github.com/dionyziz/gameCanvas-tetris/blob/master/js/tetris.js
window.onload = function () {
    /**
     * ************************
     *
     * DECLARE GLOBAL VARIABLES
     *
     * ************************
     */

    var gameCanvas = document.getElementById("myCanvas");
    var controlCanvas = document.getElementById("controlCanvas");
    var renderCanvas = document.getElementById("myCanvas");
    var leaderCanvas = document.getElementById('leaderCanvas');
    var videoCanvas = document.getElementById('videoCanvas');

    var context = gameCanvas.getContext("2d");
    var controlContext = controlCanvas.getContext("2d");
    var renderContext = renderCanvas.getContext("2d");
    var leaderContext = leaderCanvas.getContext("2d");
    var videoContext = videoCanvas.getContext("2d");

    var video = document.getElementById('video');
    var line = document.getElementById('line');
    var end = document.getElementById('end');
    var theme = document.getElementById('theme');

    video.addEventListener('loadedmetadata', function() {
        videoCanvas.width = video.videoWidth;
        videoCanvas.height = video.videoHeight;
    });

    video.addEventListener('play', function() {
        var $this = this; //cache
        (function loop() {
            if (!$this.paused && !$this.ended) {
                videoContext.drawImage($this, 0, 600);
                setTimeout(loop, 1000 / 30); // drawing at 30fps
            }
        })();
    }, 0);

    var BLOCK_W = 300 / 10, BLOCK_H = 600 / 20;

    var board = [];
    var score = 0;

    var full = false;
    var ycount = 0;

    var isStarted = false;
    var isLeadVisible = false;
    var isVideoVisible = false;

    var timeout = 300;

    var rotated = 0;
    var devil = false;
    var loss=0;

    /**
     var xGameArray = [];
     var yGameArray = [];
     for (i = 0; i < 10; i++){
        xGameArray[i] = 0;
    }

     for (i = 0; i < 20; i++){
        yGameArray[i] = 0;
    }
     **/
    //Stores each of the possible shapes as an Array
    var shapes = [

        [0, 0, 0, 0,
            1, 1, 1, 1],
        [1, 1, 1, 0,
            1],
        [1, 1, 1, 0,
            0, 0, 1],
        [1, 1, 0, 0,
            1, 1],
        [1, 1, 0, 0,
            0, 1, 1],
        [0, 1, 1, 0,
            1, 1],
        [0, 1, 0, 0,
            1, 1, 1]
    ];

    //Colours of the blocks as an array
    var colors = [
        'blue', 'green', 'yellow', 'orange', 'pink', 'grey', 'blue'
    ];

    window.addEventListener('keydown', whatKey, true);

    /**
     * *******************
     *
     * START OF GAME LOGIC
     *
     * *******************
     */

// Start the game
    function init() {
        for (var y = 0; y < 20; ++y) {
            board[y] = [];
            for (var x = 0; x < 10; ++x) {
                board[y][x] = 0;
            }
        }
    }

//Draws the blocks
    function drawBlock(x, y) {
        context.fillRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
        context.strokeRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
    }

//Draws the main board
    function drawBoard(x, y) {
        renderContext.fillRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
        renderContext.strokeRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
    }

//Erases a block
    function eraseBlock(x, y) {
        context.fillRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
        //context.strokeRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
    }

//Updates the canvas so all objects are in the right place
    function render() {
        context.clearRect(0, 0, 300, 600);
        controlContext.clearRect(400, 0, 300, 600);
        renderContext.clearRect(0, 0, 300, 600);

        renderContext.strokeStyle = 'black';
        for (var x = 0; x < 10; ++x) {
            for (var y = 0; y < 20; ++y) {
                if (board[y][x]) {
                    renderContext.fillStyle = colors[board[y][x] - 1];
                    drawBoard(x, y);
                }
            }
        }

        context.fillStyle = 'red';
        context.strokeStyle = 'black';
        for (var y = 0; y < 4; ++y) {
            for (var x = 0; x < 4; ++x) {
                if (current[y][x]) {
                    context.fillStyle = colors[current[y][x] - 1];
                    drawBlock(currentX + x, currentY + y);
                }
            }
        }
    }

    /**
     *
     * GAME LOGIC
     *
     * Logic to run the game, check for errors and a loss.
     *
     */

    function makeTurn(){ 
        checkLine();
        if (ycount < 2) {
            if (checkTurn() && !checkLoss()) {
                for (var y = 0; y < 4; ++y) {
                    for (var x = 0; x < 4; ++x) {
                        if (current[y][x]) {
                            context.fillStyle = 'white';
                            eraseBlock(currentX + x, currentY + y);
                        }
                    }
                }

                for (var y = 0; y < 4; ++y) {
                    for (var x = 0; x < 4; ++x) {
                        if (current[y][x]) {
                            context.fillStyle = colors[current[y][x] - 1];
                            drawBlock(currentX + x, currentY + y + 1);
                        }
                    }
                }
                currentY++;
                ycount = 0;
                checkLine();
                setTimeout(function () {
                    makeTurn();
                }, timeout);
            }
            else {
                if (!full) {
                    for (var y = 0; y < 4; ++y) {
                        for (var x = 0; x < 4; ++x) {
                            if (current[y][x]) {
                                board[y + currentY][x + currentX] = current[y][x];
                            }
                        }
                    }
                    checkLine();
                    newShape();
                    if (!checkLoss()) {
                        render();
                        makeTurn();
                    }
                    else {
                        console.log("LOSER");
                    }
                }
            }
        }
        else {
            end.play();
            theme.pause();
            generateLoss();
            var name = prompt("You Lost! Enter your name to record your score:", "Name");
            if (name != null) {
                localStorage.setItem(name, score);
                alert(name);
            }
        }
    }

    function incTurn(){
        checkLine();
        if (ycount < 2) {
            if (checkTurn() && !checkLoss()) {
                for (var y = 0; y < 4; ++y) {
                    for (var x = 0; x < 4; ++x) {
                        if (current[y][x]) {
                            context.fillStyle = 'white';
                            eraseBlock(currentX + x, currentY + y);
                        }
                    }
                }

                for (var y = 0; y < 4; ++y) {
                    for (var x = 0; x < 4; ++x) {
                        if (current[y][x]) {
                            context.fillStyle = colors[current[y][x] - 1];
                            drawBlock(currentX + x, currentY + y + 1);
                        }
                    }
                }
                currentY++;
                ycount = 0;
                checkLine();
            }
            else {
                if (!full) {
                    for (var y = 0; y < 4; ++y) {
                        for (var x = 0; x < 4; ++x) {
                            if (current[y][x]) {
                                board[y + currentY][x + currentX] = current[y][x];
                            }
                        }
                    }
                    checkLine();
                    newShape();
                    if (!checkLoss()) {
                        render();
                        //makeTurn();
                    }
                    else {
                        console.log("LOSER");
                    }
                }
            }
        }
    }

    function checkTurn() {
        var safe = true;
        if (currentY < checkSpace()) {
            for (var y = 0; y < 4; ++y) {
                for (var x = 0; x < 4; ++x) {
                    if (current[y][x]) {
                        if (board[y + currentY + 1][x + currentX]) {
                            safe = false;
                        }
                    }
                }
            }
            ycount++;
        }
        else {
            safe = false;
        }
        if (safe) {
            return true;
        }
        else {
            //full = true;
            return false;
        }
    }

    function checkSpace() {
        var moves = 18;
        for (var x = 0; x < 4; ++x) {
            if (current[2][x] > 0) {
                moves--;
            }
            if (current[3][x] > 0) {
                moves--;
            }
        }
        return moves;
    }

    function checkLine() {
        for (var y = 0; y < 20; y++) {
            var scan = true;
            for (var x = 0; x < 10; x++) {
                if (!board[y][x]) {
                    scan = false;
                }
            }
            if (scan) {
                console.log("Bingo");
                for (var x = 0; x < 10; x++) {
                    board[y][x] = 0;
                }

                for (var i = y; i > 0; i--) {
                    for (var j = 0; j < 10; j++) {
                        //console.log(y);
                        board[i][j] = board[i - 1][j];
                    }
                }
                line.play();
                score++;
                controlContext.clearRect(180, 528, 50, 50);
                controlContext.font = "bold 23px Arial";
                controlContext.fillText(score, 188, 552);
            }
        }
        render();
    }

    function checkLoss() {
        var shapeCount = 0;
        var boardCount = 0;
        var loss = false;
        if(currentX < 4) {
            for (var y = 0; y < 4; y++) {
                for (var x = 0; x < 4; x++) {
                    if (current[x][y] > 0) {
                        if (board[x][currentY + y] > 0) {
                            loss = true;
                        }
                    }
                }
                if (loss) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    else{
        return false;
    }

    }

    function rotateBlock() {
        console.log(current);
        if (rotated >= 0 && rotated <= 3){
            rotated++;
        }
        else if(rotated = 3){
            rotated = 0;
        }

        var tempPos = [];
        for (var y = 0; y < 4; ++y) {
            tempPos[y] = [];
            for (var x = 0; x < 4; ++x) {
                tempPos[y][x] = current[3 - x][y];
            }
        }

        current = tempPos;
        console.log(current);
    }

    function newShape() {
        if(devil){
            summonTheDevil();
        }
        rotated = 0;
        var id = Math.floor(Math.random() * shapes.length);
        var shape = shapes[id]; // maintain id for color filling

        current = [];
        for (var y = 0; y < 4; ++y) {
            current[y] = [];
            for (var x = 0; x < 4; ++x) {
                var i = 4 * y + x;
                if (typeof shape[i] != 'undefined' && shape[i]) {
                    current[y][x] = id + 1;
                }
                else {
                    current[y][x] = 0;
                }
            }
        }
        currentX = 3;
        currentY = 0;
    }

    function summonTheDevil(){
        timeout = Math.floor(Math.random() * 200) + 5;
    }



    function whatKey(evt) {
        switch (evt.keyCode) {
            case 49:
                if(isStarted){

                }
                else{
                    timeout = 300;
                }
                break;
            case 50:
                if(isStarted){

                }
                else{
                    timeout = 200;
                }
                break;
            case 51:
                if(isStarted){

                }
                else{
                   devil = true;
                   summonTheDevil();
                }
                break;
            case 39:
                roundRectFill(195, 440, 50, 50, 10);
                var offSet = 0;
                var tempSet = 0;
                for (var y = 0; y < 4; ++y) {
                    if (current[y][2] > 0) {
                        tempSet++;
                    }
                    if (current[y][3] > 0) {
                        tempSet++;
                    }

                    if (tempSet > offSet) {
                        offSet = tempSet;
                    }
                    tempSet = 0;
                }
                if ((currentX + (offSet)) < 8) {
                    if (checkTurn) {
                        currentX++;
                    }
                    render();
                }
                setTimeout(function () {
                    roundRect(195, 440, 50, 50, 10);
                }, 200);
                break;
            case 37:
                roundRectFill(55, 440, 50, 50, 10);
                var rotationIndex = 0;
                if (rotated > 0){
                    rotationIndex = -2;
                }
                if (currentX > rotationIndex) {
                    if (checkTurn) {
                        currentX--;
                    }
                    render();
                }
                setTimeout(function () {
                    roundRect(55, 440, 50, 50, 10);
                }, 200);
                break;
            case 38:
                roundRectFill(125, 370, 50, 50, 10);
                rotateBlock();
                render();
                console.log(currentX);
                setTimeout(function () {
                    roundRect(125, 370, 50, 50, 10);
                }, 200);
                break;
            case 40:
                roundRectFill(125, 440, 50, 50, 10);
                incTurn();
                setTimeout(function () {
                    roundRect(125, 440, 50, 50, 10);
                }, 200);
                break;
            case 32:
                start();
                theme.play();
                isStarted = true;
                break;
            case 82:
                if (loss) {
                    location.reload();
                }
                break;
            case 77:
                theme.pause();
                break;
            case 76:
                if (isLeadVisible) {
                    document.getElementById("leaderCanvas").style.display = "none";
                    isLeadVisible = false;
                }
                else {
                    leaderContext.clearRect(0, 0, 300, 600);
                    document.getElementById("leaderCanvas").style.display = "inline";
                    leaderContext.font = "bold 40px Arial";
                    leaderContext.fillText("Leaderboard", 30, 37);
                    printLeaderBoard();
                    isLeadVisible = true;
                }
                break;
            case 72:
                if (isVideoVisible) {
                    document.getElementById("videoCanvas").style.display = "none";
                    document.getElementById("video").style.visibility='hidden';
                    video.pause();
                    isVideoVisible = false;
                }
                else {
                    videoContext.clearRect(0, 600, 900, 300);
                    //document.getElementById("videoCanvas").style.display = "inline";
                    document.getElementById("video").style.visibility='visible';
                    video.play();
                    isVideoVisible = true;
                }
                break;
        }
    }

    //http://stackoverflow.com/questions/16096872/how-to-sort-2-dimensional-array-by-column-value
    function printLeaderBoard() {
        var yLabelPos = 97;
        var a = [];
        for (var y = 0; y < localStorage.length; ++y) {
            a[y] = [];
            for (var x = 0; x < localStorage.length; ++x) {
                a[y][x] = 0;
            }
        }
        for (var i = 0, len = localStorage.length; i < len; i++) {
            var key = localStorage.key(i);
            var value = localStorage[key];
            a[i][1] = key;
            a[i][0] = value;
            console.log(key + " => " + value);
        }
        a.sort(sortFunction);
        console.log(a);
        for (var i = 0; i < a.length; i++) {
            leaderContext.font = "bold 20px Arial";
            leaderContext.fillText(a[i][1] + ": " + a[i][0], 20, yLabelPos);
            yLabelPos = yLabelPos + 30;
        }
    }

    function loop() {

        toggle = !toggle;
        if (toggle) {
            if (!video.paused) requestAnimationFrame(loop);
            return;
        }

        /// draw video frame every 1/30 frame
        videoContext.drawImage(video, 0, 600);

        /// loop if video is playing
        if (!video.paused) requestAnimationFrame(loop);
    }

    function sortFunction(a, b) {
        if (a[0] === b[0]) {
            return 0;
        }
        else {
            return (a[0] > b[0]) ? -1 : 1;
        }
    }

    function roundRect(x, y, w, h, radius) {
        var r = x + w;
        var b = y + h;
        controlContext.beginPath();
        controlContext.strokeStyle = "green";
        controlContext.lineWidth = "4";
        controlContext.moveTo(x + radius, y);
        controlContext.lineTo(r - radius, y);
        controlContext.quadraticCurveTo(r, y, r, y + radius);
        controlContext.lineTo(r, y + h - radius);
        controlContext.quadraticCurveTo(r, b, r - radius, b);
        controlContext.lineTo(x + radius, b);
        controlContext.quadraticCurveTo(x, b, x, b - radius);
        controlContext.lineTo(x, y + radius);
        controlContext.quadraticCurveTo(x, y, x + radius, y);
        controlContext.stroke();
    }

    function roundRectFill(x, y, w, h, radius) {
        var r = x + w;
        var b = y + h;
        controlContext.beginPath();
        controlContext.strokeStyle = "black";
        controlContext.lineWidth = "4";
        controlContext.moveTo(x + radius, y);
        controlContext.lineTo(r - radius, y);
        controlContext.quadraticCurveTo(r, y, r, y + radius);
        controlContext.lineTo(r, y + h - radius);
        controlContext.quadraticCurveTo(r, b, r - radius, b);
        controlContext.lineTo(x + radius, b);
        controlContext.quadraticCurveTo(x, b, x, b - radius);
        controlContext.lineTo(x, y + radius);
        controlContext.quadraticCurveTo(x, y, x + radius, y);
        controlContext.stroke();
    }

    //http://www.scriptol.com/html5/canvas/rounded-rectangle.php
    function generateButtons() {
        controlContext.font = "bold 40px Arial";
        controlContext.fillText("Tetris", 90, 37);


        //Control Buttons
        roundRect(125, 370, 50, 50, 10);
        roundRect(125, 440, 50, 50, 10);
        roundRect(55, 440, 50, 50, 10);
        roundRect(195, 440, 50, 50, 10);

        controlContext.font = "bold 14px Arial";
        controlContext.fillText("Rotate", 128, 400);
        controlContext.font = "bold 14px Arial";
        controlContext.fillText("Left", 67, 470);
        controlContext.font = "bold 14px Arial";
        controlContext.fillText("Right", 202, 470);
        controlContext.font = "bold 14px Arial";
        controlContext.fillText("Down", 131, 470);

        //Menu Buttons
        roundRect(50, 60, 200, 50, 10);
        roundRect(50, 130, 200, 50, 10);
        roundRect(50, 200, 200, 50, 10);

        controlContext.font = "bold 30px Arial";
        controlContext.fillText("Start (space)", 63, 96);

        controlContext.font = "bold 23px Arial";
        controlContext.fillText("Leaderboard (l)", 67, 165);

        controlContext.font = "bold 23px Arial";
        controlContext.fillText("Help Video (h)", 76, 235);

        //Level Buttons
        roundRect(15, 270, 70, 50, 10);
        roundRect(115, 270, 70, 50, 10);
        roundRect(215, 270, 70, 50, 10);

        controlContext.font = "bold 16px Arial";
        controlContext.fillText("Easy (1)", 20, 300);

        controlContext.font = "bold 16px Arial";
        controlContext.fillText("Hard (2)", 120, 300);

        controlContext.font = "bold 16px Arial";
        controlContext.fillText("Hmm (3)", 218, 300);

        //Score

        controlContext.font = "bold 23px Arial";
        controlContext.fillText("Score: ", 110, 550);
        controlContext.font = "bold 23px Arial";
        controlContext.fillText("0", 188, 552);
    }

    function generateWelcome(){
        context.font = controlContext.font = "bold 30px Arial";
        context.fillText("Welcome to Tetris!", 20, 150);
        context.font = controlContext.font = "bold 30px Arial";
        context.fillText("Press The Space", 30, 290);
        context.font = controlContext.font = "bold 30px Arial";
        context.fillText("Bar To Start", 70, 330);
    }

    function generateLoss(){
        context.clearRect(0, 0, 300, 600);
        controlContext.clearRect(400, 0, 300, 600);
        renderContext.clearRect(0, 0, 300, 600);
        context.font = controlContext.font = "bold 30px Arial";
        context.fillText("You Lost the Game!", 15, 150);
        context.font = controlContext.font = "bold 30px Arial";
        context.fillText("Press The R Key", 30, 290);
        context.font = controlContext.font = "bold 30px Arial";
        context.fillText("To Restart", 70, 330);
        isStarted = false;
        loss = true;
    }

    function start() {
        if (isStarted) {

        }
        else {
            newShape();
            render();
            makeTurn();
        }
    }

    init();
    generateButtons();
    generateWelcome();

}