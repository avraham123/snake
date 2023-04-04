// Constants for the game board size and the size of each square
const BOARD_SIZE = 20;
const SQUARE_SIZE = 20;

// Create the canvas element and set its context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Variables for the game state
let snake = [{x: 10, y: 10}];
let food = {x: 15, y: 10};
let score = 0;
let direction = "right";
let gameRunning = false;
let highestScore = localStorage.getItem("highestScore") || 0; // initialize highestScore from localStorage, or 0 if it doesn't exist



// Function to draw the game board and snake
function draw() {
	// Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw the snake
	snake.forEach(segment => {
		ctx.fillStyle = "green";
		ctx.fillRect(segment.x * SQUARE_SIZE, segment.y * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
	});

	// Draw the food
	ctx.fillStyle = "red";
	ctx.fillRect(food.x * SQUARE_SIZE, food.y * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);

	// Draw the score
	ctx.fillStyle = "black";
	ctx.font = "24px Arial";
	ctx.fillText(`Score: ${score}`, 10, canvas.height - 10);

    // Draw the highest score
	ctx.fillStyle = "black";
	ctx.font = "24px Arial";
    
	ctx.fillText(`Highest Score: ${highestScore}`, canvas.width - 200, canvas.height - 10);
}

// Function to update the game state
function update() {
	// Move the snake
	let head = {x: snake[0].x, y: snake[0].y};
	switch (direction) {
		case "up":
			head.y--;
			break;
		case "down":
			head.y++;
			break;
		case "left":
			head.x--;
			break;
		case "right":
			head.x++;
			break;
	}
	snake.unshift(head);

	// Check for collision with the food
	if (head.x === food.x && head.y === food.y) {
		// Increase the score and generate new food
		score++;
		food.x = Math.floor(Math.random() * BOARD_SIZE);
		food.y = Math.floor(Math.random() * BOARD_SIZE);
	} else {
		// Remove the tail segment of the snake
		snake.pop();
	}
    

	// Check for collision with the walls or with the snake's own body
	if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
		// Game over
		clearInterval(gameLoop);
		alert(`GAME OVER! Press Play Again to continue. FINAL SCORE: ${score}` );
	}

// Update highest score if necessary
if (score > highestScore) {
    highestScore = score;
    localStorage.setItem("highestScore", highestScore);
    secondBestScore = localStorage.getItem("secondBestScore");
    
}


  
  
  


	// Redraw the game board and snake
	draw();
}

// Event listener for keydown events
document.addEventListener("keydown", event => {
    // If Enter is pressed and game is over, start a new game
    if (event.key === "Enter" && !gameRunning) {
      newGame();
    } else {
      // Handle other arrow keys normally
      switch (event.key) {
        case "ArrowUp":
          if (direction !== "down") {
            direction = "up";
          }
          break;
        case "ArrowDown":
          if (direction !== "up") {
            direction = "down";
          }
          break;
        case "ArrowLeft":
          if (direction !== "right") {
            direction = "left";
          }
          break;
        case "ArrowRight":
          if (direction !== "left") {
            direction = "right";
          }
          break;
        default:
          break;
      }
    }
  });
  
// Function to start a new game
function newGame() {
    // Reset game variables
    
    // Hide game over screen
    document.getElementById("game-over").classList.remove("show");
    // Generate initial food location
    generateFood();
    // Update score display
    document.getElementById("score").textContent = score;
    
    draw();
    
// Add event listener to "play again" button



  }


  // Function to generate a new food location
function generateFood() {
    let newFood = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize)
    };
    // Make sure the food is not generated inside the snake's body
    while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
      newFood = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
      };
    }
    food = newFood;
  }

  // Redraw the game board and snake
  draw();

  window.addEventListener("load", function() {
    alert("Welcome to the snake game. THINK FAST! Press Enter to start");
  });
  
  
    // Start the game loop
    const gameLoop = setInterval(update, 110);

   
    
  