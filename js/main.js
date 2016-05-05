// Constants
ROWS = 40,
COLS = 40,
LEFT = 37,
UP = 38,
RIGHT = 39,
DOWN = 40;

var snakePos = [],
    foodPos,
    automate;

// Create a grid using the given x and y values
function createGrid(x, y) {
  var count = 0,
      $boxDiv = $("<div></div>");

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
function drawSnakeStart() {
  var gridCenter = Math.floor(((ROWS * COLS) / 2) - COLS / 2 );

  $("#grid").find("#" + gridCenter).addClass("snakeHead");
  snakePos.push(gridCenter);
}

// Generate a random box number and place food in it
function drawFood() {
  foodPos = Math.floor(Math.random() * (ROWS * COLS)) + 1;

  // If box id = snake id generate new number
  while (snakePos.includes(foodPos)) {
    foodPos = Math.floor(Math.random() * (ROWS * COLS)) + 1;
  }
  $("#grid").find("#" + foodPos).addClass("food");
}

function moveSnake(keyNum) {
  var key = keyNum;

  switch (key) {
    case 37:
      direction = "left";
      break;
    case 38:
      direction = "up";
      break;
    case 39:
      direction = "right";
      break;
    case 40:
      direction = "down";
      break;
    }

  var nextPos = getNextPos(direction);

  if (nextPos) {
    snakePos.push(nextPos);

    var drop = snakePos.shift();

    updateSnake(drop);
  }

  automateSnake();
}

function automateSnake() {
  automate = setTimeout(function() {
    moveSnake();
  }, 200);
}

function clearAutomation() {
  clearTimeout(automate);
}

// Get the nextPos for the snake to move to
function getNextPos(dir) {
  var headPos = snakePos[snakePos.length - 1],
      nextPos;

  switch (dir) {
    case "left":
      nextPos = headPos - 1;
      break;
    case "up":
      nextPos = headPos - COLS;
      break;
    case "right":
      nextPos = headPos + 1;
      break;
    case "down":
      nextPos = headPos + COLS;
      break;
  }

  if ( snakePos.length === 1 || nextPos !== snakePos[snakePos.length - 2]) {
    if (nextPos === foodPos) {
      growSnake();
    } else if (snakePos.includes(nextPos)) {
        gameOver();
    }

    return nextPos;
  }
}

// Update snake's position in grid
function updateSnake(drop) {
  // Remove snake classes from dropped box
  $("#grid").find("#" + drop).removeClass("snakeHead").removeClass("snakeBody");

  // Add the snakeBody class to each array item except for the head
  snakePos.forEach(function(bodyPart) {
    $("#grid").find("#" + bodyPart).addClass("snakeBody");
  })

  // Remove snakeBody class and add snakeHead class to the last array item
  $("#grid").find("#" + snakePos[snakePos.length - 1]).removeClass("snakeBody").addClass("snakeHead");
}

// Increase snake size by 1
function growSnake() {
  $("#grid").find("#" + foodPos).removeClass("food").addClass("snakeHead");
  snakePos.push(foodPos);
  drawFood();
}

function gameOver() {
  alert("You dead");
  document.location.reload();
}

function play() {
  drawSnakeStart();
  drawFood();
  moveSnake(DOWN);
}

$(document).ready(function() {
  createGrid(ROWS, COLS);
  play();

  $(document).on("keydown", function(event) {
    var keyNum = event.which;
    clearAutomation();
    moveSnake(keyNum);
  })
});
