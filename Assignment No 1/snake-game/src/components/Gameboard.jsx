const GRID_SIZE = 20;

function GameBoard({ snake, food }) 
{
  const cells = [];

  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    // Convert the one-dimensional index into row and column
    const row = Math.floor(i / GRID_SIZE);
    const col = i % GRID_SIZE;

    // Check if the current cell belongs to the snake
    let snakeClass = "";

  // Step 1: Find out if the current cell belongs to the snake
  const segmentIndex = snake.findIndex(
    (segment) =>
      segment.row === row &&
      segment.col === col
  );

  // Step 2: If the cell is part of the snake
  if (segmentIndex !== -1) {

    // First element of the array is the tail
    if (segmentIndex === 0) {
      snakeClass = "snake-tail";

    }

    // Last element of the array is the head
    else if (segmentIndex === snake.length - 1) {
      snakeClass = "snake-head";
    }

    // Any element between the head and tail is the body
    else {
      snakeClass = "snake-body";
    }
  }

    let foodClass = "";
      const isFood =
      food.row === row &&
      food.col === col;

    

    if (isFood) {
      foodClass = "food";
    }

  // Create the current cell and add it to the board
    cells.push(
      <div
        key={i}
        className={`cell ${snakeClass} ${foodClass}`}
        ></div>
    );
  }



  return (
  
      <div className="game-board">
        {cells}
      </div>
  
  );
}

export default GameBoard;