window.onload = function () {
    var gameCanvas = document.getElementById("myCanvas");
    var controlCanvas = document.getElementById("controlCanvas");

    var context = gameCanvas.getContext("2d");
    var controlContext = controlCanvas.getContext("2d");

    var BLOCK_W = 300 / 10, BLOCK_H = 600 / 20;

    var gameSizeInBlocks = {x: 10, y: 20}
}