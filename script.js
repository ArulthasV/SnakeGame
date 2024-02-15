//define HTML elements
const board = document.getElementById('game-board')
//console.log(board)
const instructionText = document.getElementById('instruction-text')
const logo = document.getElementById('logo')

//Define game variables
const gridSize = 20
let snake = [{x:10,y:10}]
let food = generateFood()
let direction = 'right'
let gameInterval
let gameSpeedDelay = 200
let gameStarted = false

//draw game map,snake,food
function draw(){
    board.innerHTML = ''
    drawSnake()
    drawFood()
}

//draw snake
function drawSnake(){
    snake.forEach((position)=>{
        const snakeElement = createGameElement('div','snake')
        setPosition(snakeElement,position)
        board.appendChild(snakeElement)
    })
}

//create a snake or food cub/div
function createGameElement(tag,className){
    const element = document.createElement(tag)
    element.className = className
    return element
}


//set the position of the snake or food
function setPosition(element,position){
    element.style.gridColumn = position.x
    element.style.gridRow = position.y
}

//Testing draw
//draw()

function generateFood(){
    const x = Math.floor(Math.random()*gridSize) + 1
    const y = Math.floor(Math.random()*gridSize) + 1
    return {x,y}
}

function drawFood(){
    const foodElement = createGameElement('div','food')
    setPosition(foodElement,food)
    board.appendChild(foodElement)
}

//function to move the snake
function move(){
    const head = {...snake[0]}
    switch(direction){
        case 'right' :
            head.x++
            break
        case 'left' :
            head.x--
            break
        case 'up' :
            head.y--
            break
        case 'down' :
            head.y++
            break    
    }
    snake.unshift(head)
    //snake.pop()

    if(head.x === food.x && head.y === food.y){
        food = generateFood()
        increaseSpeed()
        //checkCollision()
        clearInterval(gameInterval)
        gameInterval = setInterval(()=>{
            move()
            //checkCollision()
            draw()
        },gameSpeedDelay)
    }
    else{
        snake.pop()
    }
}

// testing move function
// setInterval(()=>{
//     move()
//     draw()
// },200)

//function to start the game
function startGame(){
    gameStarted = true
    instructionText.style.display = 'none'
    logo.style.display = 'none'
    gameInterval = setInterval(()=>{
        move()
        //checkCollision()
        draw()
    },gameSpeedDelay)
}

//key press function
function handleKeyPress(event){
    if(
        (!gameStarted && event.code === 'space') ||
        (!gameStarted && event.key === ' ')
    ){
        startGame()
    }
    else{
        switch(event.key){
            case 'ArrowUp' :
                direction = 'up';
                break
            case 'ArrowDown' :
                direction = 'down';
                break
            case 'ArrowLeft' :
                direction = 'left';
                break       
            case 'ArrowRight' :
                direction = 'right';
                break           
        }
    }  
}

document.addEventListener('keydown',handleKeyPress)

function increaseSpeed(){
    console.log(gameSpeedDelay)
    if(gameSpeedDelay > 150){
        gameSpeedDelay -= 5
    }
    else if(gameSpeedDelay > 100){
        gameSpeedDelay -= 3
    }
    else if(gameSpeedDelay > 50){
        gameSpeedDelay -= 2
    }
    else if(gameSpeedDelay > 25){
        gameSpeedDelay -= 1
    }
}

function checkCollision(){
    const head = snake[0]
    if(head.x<1 && head.x>gridSize || head.y<1 && head.y>gridSize){
        resetGame()
    }

    for(let i = 1; i<snake.length; i++){
        if(head.x === snake[i].x && head.y === snake[i].y){
            resetGame()
        }
    }
}

function resetGame(){
    snake = [{x:10 , y:10}]
    food = generateFood()
    direction = right
    gameSpeedDelay = 200
    updateScore()
}

function updateScore(){
    
}