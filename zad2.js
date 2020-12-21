//@ts-check
"use strict";

const canvas = document.getElementById('painting');
var ctx = canvas.getContext('2d');
var board = new Array(50);
for (let i=0; i < 50; i++) {
    board[i] = new Array(50);
    for (let j=0; j < 50; j++) {
       board[i][j] = 0;
    }
 }
var snake = new Array(4);
for (let i=0; i <4; i++) {
    snake[i] = new Array(2);
    for (let j=0; j < 2; j++) {
       snake[i][j] = 0;
    }
 }
var prevKey = null; 
var fruit = false;
var score = 0;
var fruitPosX = 40;
var fruitPosY = 10;
board[fruitPosX][fruitPosY] = 2
snake[0][0] = 27;
snake[0][1] = 25;
snake[1][0] = 26;
snake[1][1] = 25;
snake[2][0] = 25;
snake[2][1] = 25;
snake[3][0] = 24;
snake[3][1] = 25;
var direction = "left";
document.addEventListener("keydown", (event) => {
    if (event.keyCode == 38) {
        if(prevKey != "down")
        direction = "up";
    }
    if (event.keyCode == 40) {
        if(prevKey != "up")
        direction = "down";
    }
    if (event.keyCode == 37) {
        if(prevKey != "right")
        direction = "left";
    }
    if (event.keyCode == 39) {
        if(prevKey != "left")
        direction = "right";
    }
});

function gameOver(){
    window.localStorage.removeItem("currentScore");
    window.localStorage.setItem("currentScore", score.toString());
    location.replace("scores.html");
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(snake[snake.length-1][0] == fruitPosX && snake[snake.length-1][1]==fruitPosY) fruit = true ;
        board[snake[0][0]][snake[0][1]] = 0;
    var y=0;
    for(let i = 1; i <snake.length; i++)
    {
        var savedPosX = snake[0][0];
        var savedPosY = snake[0][1];
        snake[i-1][0] = snake[i][0];
        snake[i-1][1] = snake[i][1];
        board[snake[i-1][0]][snake[i-1][1]] = 1;
    }
    switch(direction){
        case 'left':
            if(snake[snake.length-2][0]-1<0) gameOver();
            snake[snake.length-1][0] = snake[snake.length-2][0]-1;
            snake[snake.length-1][1] = snake[snake.length-2][1];
            break;
        case 'right':
            if(snake[snake.length-2][0]+1==50) gameOver();
            snake[snake.length-1][0] = snake[snake.length-2][0]+1;
            snake[snake.length-1][1] = snake[snake.length-2][1];
            break;
        case 'up':
            if(snake[snake.length-2][1]-1<0) gameOver();
            snake[snake.length-1][0] = snake[snake.length-2][0];
            snake[snake.length-1][1] = snake[snake.length-2][1]-1;
            break;
        case 'down':
            if(snake[snake.length-2][1]+1==50) gameOver();
            snake[snake.length-1][0] = snake[snake.length-2][0];
            snake[snake.length-1][1] = snake[snake.length-2][1]+1;
            break;        
    }
    if(board[snake[snake.length-1][0]][snake[snake.length-1][1]]==1){
        gameOver();
    }
    board[snake[snake.length-1][0]][snake[snake.length-1][1]] = 1;
    if(fruit == true)
    {
        snake.unshift([savedPosX,savedPosY]);
        score++;
        fruitPosX = Math.floor(Math.random()*49);
        fruitPosY = Math.floor(Math.random()*49);
        console.log(fruitPosX,fruitPosY);
        if(board[fruitPosX][fruitPosY] == 1)
        {
            for (let i=fruitPosX; i < 50; i++) {
                for (let j=fruitPosY; j < 50; j++) {
                    if(board[i][j] != 1)
                    {
                        fruitPosX = i;
                        fruitPosY = j;
                    }
                }
            }
        }
        board[fruitPosX][fruitPosY] = 2;
        fruit = false;
    }
    for (let i=0; i < 50; i++) {
        for (let j=0; j < 50; j++) {
           if(board[i][j] == 1) {
            ctx.fillRect(0+10*i, 0+10*j, 10, 10);
           }
           else if(board[i][j] == 2)
           {
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(0+10*i, 0+10*j, 10, 10);
            ctx.fillStyle = "#000000";
           }
           else {
            ctx.clearRect(0+10*i, 0+10*j, 10, 10);
           }
        }
    }
    prevKey = direction;
  }
  
  window.setInterval(update, 50);
