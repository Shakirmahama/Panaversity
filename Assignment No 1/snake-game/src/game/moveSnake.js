function moveSnake(snake, direction, grow) {
  // Get the current head
  const head = snake[snake.length - 1];

  // Create a copy of the head
  let newHead = { ...head };

  // Move the head based on the current direction
  switch (direction) {
    case "UP":
      newHead.row--;
      break;

    case "DOWN":
      newHead.row++;
      break;

    case "LEFT":
      newHead.col--;
      break;

    case "RIGHT":
      newHead.col++;
      break;

    default:
      break;
  }

  // Create the new snake
  const newSnake = [...snake];

  // Remove the tail
  if (!grow) {
  newSnake.shift();
}

  // Add the new head
  newSnake.push(newHead);

  return {
    newSnake,
    newHead,
  };
}

export default moveSnake;