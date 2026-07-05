function homeScreen({
  difficulty,
  setDifficulty,
  startGame,
}) {
  return (
    <div className="home-screen">
      <h1>🐍 Snake Game</h1>

      <h2>Select Difficulty</h2>

      <div className="difficulty-options">

        <label>
          <input
            type="radio"
            value="easy"
            checked={difficulty === "easy"}
            onChange={() => setDifficulty("easy")}
          />
          Easy
        </label>

        <label>
          <input
            type="radio"
            value="medium"
            checked={difficulty === "medium"}
            onChange={() => setDifficulty("medium")}
          />
          Medium
        </label>

        <label>
          <input
            type="radio"
            value="hard"
            checked={difficulty === "hard"}
            onChange={() => setDifficulty("hard")}
          />
          Hard
        </label>

      </div>

      <button onClick={startGame}>
        Start Game
      </button>
    </div>
  );
}

export default homeScreen;