// Constants
ROWS = 40,
COLS = 40,
UP = 38,
RIGHT = 39,
DOWN = 40,
LEFT = 37;

var snakePos = [];

var grid = {

}

// Create a grid using the given x and y values
function createGrid(x, y) {
  var count = 0;
  var $boxDiv = $("<div></div>");

  for (var i = 0; i < x; i++) {
    for (var j = 0; j < y; j++) {
      $("<div id=" + (j + count + 1) +  "></div>").addClass("box").appendTo($boxDiv);
    }
    count += x;
    // $("<div id=" + (i + 1) + "></div>").appendTo($boxDiv);
  }
  $boxDiv.appendTo($("#grid"));
}

// Create the snake head and place it in the grid's center
function drawSnake() {
  var gridCenter = Math.floor(((ROWS * COLS) / 2) - COLS / 2 );

  $("#grid").find("#" + gridCenter).addClass("snakeHead");
  snakePos.push(gridCenter);
}

// Generate a random box number and place food in it
function drawFood() {
  var foodPos = Math.floor(Math.random() * (ROWS * COLS)) + 1;

  // If box id = snake id generate new number
  while (snakePos.includes(foodPos)) {
    foodPos = Math.floor(Math.random() * (ROWS * COLS)) + 1;
  }
  $("#grid").find("#" + foodPos).addClass("food");
}

function moveSnake(direction) {
  var headPos = snakePos[snakePos.length - 1];
  var nextPos;

  switch (direction) {
    case 'up':
      nextPos = headPos - COLS;
      break;
    case 'right':
      nextPos = headPos + 1;
      break;
    case 'down':
      nextPos = headPos + COLS;
      break;
    case 'left':
      nextPos = headPos - 1;
      break;
    default:

  }
}

$(document).ready(function() {
  createGrid(ROWS, COLS);
  drawSnake();
  drawFood();
});
