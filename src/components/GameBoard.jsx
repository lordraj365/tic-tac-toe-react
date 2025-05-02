function GameBoard({ onSelectSquare, gameBoard }) {
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIdx) => (
        <li key={rowIdx}>
          <ol>
            {row.map((col, colIdx) => (
              <li key={colIdx}>
                <button onClick={() => onSelectSquare(rowIdx, colIdx)} type="button" disabled={gameBoard[rowIdx][colIdx]}>
                  {col}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

export default GameBoard;
