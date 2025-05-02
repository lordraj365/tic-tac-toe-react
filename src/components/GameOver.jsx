function GameOver({ winner, handleRematch }) {
  let gameMsg;
  if (winner === "d") {
    gameMsg = "It's a Draw!";
  } else {
    gameMsg = `${winner} won!`;
  }
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      <p>{gameMsg}</p>
      <p>
        <button type="button" onClick={handleRematch}>
          Rematch?
        </button>
      </p>
    </div>
  );
}

export default GameOver;
