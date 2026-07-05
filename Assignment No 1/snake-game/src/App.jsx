import { useState, useEffect  } from "react";
import HomeScreen from "./components/homeScreen";
import GameBoard from "./components/Gameboard";
import "./App.css";
import moveSnake from "./game/moveSnake";
import Controller from "./components/Controller";
function App() {
  // Store the selected difficulty
  const [difficulty, setDifficulty] = useState("easy");

  const [direction,   setDirection] = useState("RIGHT");

  // Track whether the game has started
  const [gameStarted, setGameStarted] = useState(false);

  // tracking whether the game has over
  const [gameOver, setGameOver] = useState(false);

  // tracking the score when snake eats the food
  const [score, setScore] = useState(0);

  //food generation 
  const [food, setFood] = useState({
  row: 5,
  col: 5,
  });

  // Store the snake as an array of body segments
  const [snake, setSnake] = useState([
    { row: 10, col: 8 },
    { row: 10, col: 9 },
    { row: 10, col: 10 },
  ]);


  //game start function 
   function gameStart(){
    setSnake([
    { row: 10, col: 8 },
    { row: 10, col: 9 },
    { row: 10, col: 10 },
  ]);
  setDirection("RIGHT");
  setScore(0);
  setGameOver(false)
  setGameStarted(true);
  }

// changing directioin of the snake the button is clicked
  function changeDirection(newdirection){
     // Prevent RIGHT → LEFT
  if (direction === "RIGHT" && newdirection === "LEFT") {
    return ;
  }

  // Prevent LEFT → RIGHT
  if (direction === "LEFT" && newdirection === "RIGHT") {
    return;
  }

  // Prevent UP → DOWN
  if (direction === "UP" && newdirection === "DOWN") {
    return;
  }

  // Prevent DOWN → UP
  if (direction === "DOWN" && newdirection === "UP") {
    return;
  }


    setDirection(newdirection)
    console.log(newdirection)
  }

  // function that will move the snake
  function moveGame() {
  setSnake((currentSnake) => {

    // Move the snake
    const { newSnake, newHead, grow} = moveSnake(
      currentSnake,
      direction,
      false
    );

    // -----------------------------
    // Wall Collision
    // -----------------------------
    if (
      newHead.row < 0 ||
      newHead.row >= 20 ||
      newHead.col < 0 ||
      newHead.col >= 20
    ) {
      setGameOver(true);
      return currentSnake;
    }

    // -----------------------------
    // Self Collision
    // -----------------------------
    const hitSelf = newSnake
      .slice(0, newSnake.length - 1)
      .some(
        (segment) =>
          segment.row === newHead.row &&
          segment.col === newHead.col
      );

    if (hitSelf) {
      setGameOver(true);
      return currentSnake;
    }

    // -----------------------------
    // Food Collision
    // -----------------------------
    if (
      newHead.row === food.row &&
      newHead.col === food.col
    ) {

      // Grow the snake
      const { newSnake: grownSnake } = moveSnake(
        currentSnake,
        direction,
        true
      );

      // Increase score
      setScore((prev) => prev + 1);

      // Generate new food
      setFood({
        row: Math.floor(Math.random() * 20),
        col: Math.floor(Math.random() * 20),
      });

      return grownSnake;
    }

    return newSnake;
  });
}

// for snake movements 

useEffect(() => {
  if (!gameStarted || gameOver) return;

  let speed = 200;

  if (difficulty === "medium") {
    speed = 150;
  }

  if (difficulty === "hard") {
    speed = 100;
  }
  const interval = setInterval(() => {
    moveGame();
  }, speed);

  return () => {
    clearInterval(interval);
  };
}, [gameStarted, direction, gameOver]);


// keyboard controls

useEffect(() => {
  function handleKeyDown(event) {
    switch (event.key) {
      case "ArrowUp":
        changeDirection("UP");
        break;

      case "ArrowDown":
        changeDirection("DOWN");
        break;

      case "ArrowLeft":
        changeDirection("LEFT");
        break;

      case "ArrowRight":
        changeDirection("RIGHT");
        break;

      default:
        break;
    }
  }

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener(
      "keydown",
      handleKeyDown
    );
  };
}, [direction]);



  return (
    <>
      {!gameStarted ? (
        <HomeScreen
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          startGame={gameStart}
        />
      ) : (
        <div className="game-screen">

        <h1 className="game-title">
          🐍 Snake
        </h1>

        <div className="game-info">

          <div className="score-card">
            <span>Score</span>
            <h2>{score}</h2>
          </div>

          <div className="difficulty-card">
            <span>Difficulty</span>
            <h2>{difficulty}</h2>
          </div>

        </div>

        <GameBoard
          food={food}
          snake={snake}
        />

        <Controller
          changeDirection={changeDirection}
        />

        {gameOver && (
          <div className="modal-overlay">
            <div className="modal-card">

              <span className="modal-eyebrow">Game Over</span>

              <h2 className="modal-score">{score}</h2>
              <span className="modal-score-label">Final Score</span>

              <div className="modal-difficulty">
                <span>Difficulty</span>
                <span className="modal-difficulty-value">{difficulty}</span>
              </div>

              <div className="modal-actions">
                <button
                  className="play-again"
                  onClick={gameStart}
                >
                  Play Again
                </button>

                <button
                  className="back-home"
                  onClick={() => setGameStarted(false)}
                >
                  Back to Home
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
      )}
     
    </>
  );
}

export default App;