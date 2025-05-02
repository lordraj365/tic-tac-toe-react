function Log(props) {
  return (
    <ol id="log">
      {props.gameTurns.map((obj) => (
        <li key={`${obj.square.row}${obj.square.col}${obj.player}`}>
          {obj.playerName} played '{obj.player}' at row: {obj.square.row}, col: {obj.square.col}
        </li>
      ))}
    </ol>
  );
}

export default Log;
