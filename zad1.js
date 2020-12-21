//@ts-check
"use strict";

const canvas = document.getElementById('painting');
var ctx = canvas.getContext('2d');
const canvas2 = document.getElementById('painting2');
var ctx2 = canvas2.getContext('2d');

var isDrawing = false;

var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;
var state = null;

function radius(){
    return Math.sqrt((endX-startX)*(endX-startX)+(endY-startY)*(endY-startY))+10;
}

function drawCircle(){
    ctx2.beginPath();
    ctx2.arc(startX, startY, radius(), 0, 2*Math.PI);
    ctx2.stroke();
}

function drawFillCircle(){
    var circle = new Path2D();
    ctx2.beginPath();
    circle.arc(startX, startY, radius(), 0, 2*Math.PI);
    ctx2.fill(circle);
}

function drawRectangle(){
    ctx2.beginPath();
    ctx2.strokeRect(startX, startY, endX - startX+5, endY - startY+5);
    ctx2.stroke();
}

function drawFillRectangle(){
    ctx2.beginPath();
    ctx2.fillRect(startX, startY, endX - startX+5, endY - startY+5);
    ctx2.stroke();
}

function drawLine(){
    ctx2.beginPath();
    ctx2.moveTo(startX, startY);
    ctx2.lineTo(endX, endY);
    ctx2.stroke();
}

function reset(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function setState(id){
    if (state == id) {
        state = null;
        document.getElementById(id).style.backgroundColor = "darkgrey";
    } 
    else if (state == null) {
        state = id;
        document.getElementById(id).style.backgroundColor = 'grey';
    }
    else {
        document.getElementById(state).style.backgroundColor = "darkgrey";
        state = id;
        document.getElementById(id).style.backgroundColor = 'grey';
    }
}

function down(event){
    startX = event.offsetX;
    startY = event.offsetY;
    isDrawing = true;
    ctx2.strokeStyle = document.getElementById("color").value;
    ctx2.fillStyle = document.getElementById("color").value;
}

function up(event){
    isDrawing = false;
    ctx.drawImage(canvas2, 0, 0);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
}

function move(event){
    if(isDrawing === true){
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height)
        endX = event.offsetX;
        endY = event.offsetY;
        if(state === "circ"){
            drawCircle();
        }
        if(state === "fullRect"){
            drawFillRectangle();
        }
        if(state === "rect"){
            drawRectangle();
        }
        if(state === "fullCirc"){
            drawFillCircle();
        }
        if(state === "pencil"){
            drawLine();
            startX = endX;
            startY = endY;
            ctx.drawImage(canvas2, 0, 0);

        }
    }
}
