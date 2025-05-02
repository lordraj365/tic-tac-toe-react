import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "../src/winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = { X: "Player 1", O: "Player 2" }
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function getActivePlayer(prevTurns) {
  let curPlayer = "X";
  if (prevTurns.length > 0 && prevTurns[prevTurns.length - 1].player === "X") {
    curPlayer = "O";
  }
  return curPlayer;
}

function deriveWinner(players, gameBoard, gameTurns) {
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSym = gameBoard[combination[0].row][combination[0].column];
    const secondSym = gameBoard[combination[1].row][combination[1].column];
    const thirdSym = gameBoard[combination[2].row][combination[2].column];
    if (firstSym && firstSym === secondSym && secondSym === thirdSym) {
      winner = players[gameBoard[combination[0].row][combination[0].column]];
      break;
    }
  }
  if (gameTurns.length >= 9 && winner === null) {
    winner = "d";
  }
  return winner;
}

function updateGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((arr) => [...arr])];
  for (const turn of gameTurns) {
    gameBoard[turn.square.row][turn.square.col] = turn.player;
  }
  return gameBoard;
}
function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  function handleSelectSquare(ri, ci) {
    setGameTurns((prevTurns) => {
      const curPlayer = getActivePlayer(prevTurns);
      const updatedTurns = [...prevTurns, { square: { row: ri, col: ci }, player: curPlayer, playerName: players[curPlayer] }];
      return updatedTurns;
    });
  }
  function handleRematch() {
    setGameTurns([]);
  }
  function handlePlayerNameChange(symbol, playerName) {
    setPlayers((prevState) => ({
      ...prevState,
      [symbol]: playerName,
    }));
  }

  const gameBoard = updateGameBoard(gameTurns);
  const activePlayer = getActivePlayer(gameTurns);
  const winner = deriveWinner(players, gameBoard, gameTurns);

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol="X" activePlayer={activePlayer} onChangeName={handlePlayerNameChange}></Player>
          <Player name={PLAYERS.O} symbol="O" activePlayer={activePlayer} onChangeName={handlePlayerNameChange}></Player>
        </ol>
        {winner ? <GameOver winner={winner} handleRematch={handleRematch}></GameOver> : null}
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard}></GameBoard>
      </div>
      <Log gameTurns={gameTurns}></Log>
    </main>
  );
}

export default App;
