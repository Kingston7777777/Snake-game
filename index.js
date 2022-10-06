const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const playBtn = document.querySelector("#playBtn");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;//To get the width of the width
const gameHeight = gameBoard.height;//To get the height of the width
const boardBackground = "lightblue";
const snakeColor = "lightgreen";
const snakeBoarder = "black";
const foodColor = "red";
const unitSize = 25;//THe size of the content inside the canvas
let running = false;
let xVelocity = unitSize;//How far the snake will move to the right
let yVelocity = 0;
let foodx;//x coordinate 
let foody;//y coordinate 
let score = 0;//score set to 0 by default
let snake = [
    {x:unitSize * 4, y:0},//Array of snake part
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
]

playBtn.addEventListener("click", gameStart);//to start the game
window.addEventListener("keydown", changeDirection);//keyboard you click to move the snake
resetBtn.addEventListener("click", resetGame);//to reset

function gameStart(){
    running = true;//running must be true to start the game
    scoreText.textContent = score;//your score what what the snake eat's
    createFood();//create food
    drawFood();//draw food
    nextTick();//what happens when the game starts
};
function nextTick(){
    if(running){
        setTimeout(()=>{//settimeout will continues because the game is running
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 330);//75 means the snake will be moving 75 secs
    }
    else{
        displayGameOver();//if you failed it will display gameover
    }
};
function clearBoard(){//This function set the direction of where the snake will be contained like where it will stop like for instance the width and height
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood(){//To create food as it make it appear anywnere in the border
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodx = randomFood(0, gameWidth - unitSize);//moves food randomly on the x axis
    foody = randomFood(0, gameWidth - unitSize);//moves food randomly on the y axis
 
};
function drawFood(){//function to draw food
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodx, foody, unitSize, unitSize);
};
function moveSnake(){//function to move snake
    const head = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity};

         snake.unshift(head);//unshift method to add new head
         //if food is eaten
         if(snake[0].x == foodx && snake[0].y == foody){
            score+=1;
            scoreText.textContent = score;
            createFood();
         }
         else{
            snake.pop();//eliminate the tall anytime the tall moves
         }
};
function drawSnake(){//function to draw snake
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBoarder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};
function changeDirection(event){//function to change direction of the snake
    const keyPressed = event.keyCode;//keycode of your computer up down right left button
    const LEFT = 37;//They keycodes
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;
    
    const goingUp = (yVelocity == -unitSize);//To 4 variables will hold the value like for instance as yvel == -unitsize that means it will go up by -25
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){//To see what the key up or down or left or right you pressed is going either any direction after the condition it will move to the direction is suppose to move 
        case(keyPressed == LEFT && !goingRight):
        xVelocity = -unitSize;
        yVelocity = 0;
        break;

        case(keyPressed == UP && !goingDown):
        xVelocity = 0;
        yVelocity = -unitSize;
        break;

        case(keyPressed == RIGHT && !goingLeft):
        xVelocity = unitSize;
        yVelocity = 0;
        break;

        case(keyPressed == DOWN && !goingUp):
        xVelocity = 0;
        yVelocity = unitSize;
        break;
    }
};
function checkGameOver(){//To check if the game is over
    switch(true){//To check to see if the snake reaches the end then gameover 
        case (snake[0].x < 0):
            running = false;
            break;
    
        case (snake[0].x >= gameWidth):
             running = false;
             break;

        case (snake[0].y < 0):
             running = false;
             break;

        case (snake[0].y >= gameHeight):
             running = false;
             break;

    }

for(let i = 1; i < snake.length; i+=1){//To check if the snake head touches the body then ga,e over
    if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){//if all body parts are equal to the head the game ended
        running = false;
    }

}
  
};

function displayGameOver(){//To display gameover
    ctx.font = "50px Mv Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", gameWidth / 2, gameHeight / 2);
    running = false;
};
function resetGame(){//To reset the game
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0; 
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ]
    gameStart();
};
