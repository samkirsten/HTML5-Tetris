window.onload= function ()

{

var canvas = document.getElementById("myCanvas");

var context = canvas.getContext("2d");
context.rect(20,20,150,100);
context.strokeStyle="red";
context.stroke();

var context2 = canvas.getContext("2d");
context2.rect(150,150,150,100);
context2.strokeStyle="blue";
context2.stroke();

//code goes here

}