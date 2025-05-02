import { useState } from "react";

function Player(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(props.name);
  let nameElement = <span className="player-name">{name}</span>;
  let editButtonText = "Edit";
  let activeClass = "";

  const editButtonClickHandler = (symbol, name) => {
    setIsEditing((prevState) => !prevState);

    if (isEditing) {
      props.onChangeName(symbol, name);
    }
  };

  const inputNameChangeHandler = (event) => {
    setName(event.target.value);
  };
  if (isEditing) {
    nameElement = <input type="text" value={name} onChange={inputNameChangeHandler} required />;
    editButtonText = "Save";
  }
  if (props.activePlayer === props.symbol) {
    activeClass = "active";
  }
  return (
    <li className={activeClass}>
      <span className="player">
        {nameElement}
        <span className="player-symbol">{props.symbol}</span>
      </span>
      <button type="button" onClick={() => editButtonClickHandler(props.symbol, name)}>
        {editButtonText}
      </button>
    </li>
  );
}

export default Player;
