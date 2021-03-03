import React, { useState, useEffect } from 'react';
import Square from './Square.js';
import axios from 'axios';
import '../index.css';

var Board = ({username, setGameMode}) => {
  // var [ship, setShip] = useState(false);
  // var [shot, setShot] = useState(false);
  var [shipPlacementMode, setShipPlacementMode] = useState(false);
  var [currentShip, setCurrentShip] = useState('');
  var [ships, setShips] = useState({
    destroyer: { placed: false, length: 2 },
    submarine: { placed: false, length: 3 },
    cruiser: { placed: false, length: 3 },
    battleship: { placed: false, length: 4 },
    carrier: { placed: false, length: 5 },
  });

  var [mouseDownSquare, setMouseDownSquare] = useState('');
  var [mouseUpSquare, setMouseUpSquare] = useState('');

  // current board is set to 10 x 10
  var [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  // this function updates an individual square on the board. Inputs
  // are a row, a column, and the value set that square to (0, 1, or 2)
  // 0: nothing
  // 1: ship
  // 2: hit ship
  var updateSquare = (row, col, value) => {
    var newBoard = board.slice();
    // check if value at that row,col is already the input value
    // if so, return false
    if (newBoard[row][col] === value) {
      console.log('square already set to that value');
      return false;
    } else {
      newBoard[row][col] = value;
      setBoard(newBoard);
      return true;
    }
  }

  var checkSquare = (row, col, value) => {
    if (board[row][col] === value) {
      console.log('CHECKSQUARE: square already set to that value');
      return false;
    } else {
      return true;
    }
  }

  var updateShips = (ship) => {
    var shipsUpdate = { ...ships };
    shipsUpdate.ship = !shipsUpdate.ship;
    setShips(shipsUpdate);
  }

  var placeShip = (mouseUpId) => {
    console.log('mouseDownSquare is ', mouseDownSquare);
    console.log('mouseUpId is ', mouseUpId);

    if (shipPlacementMode) {
      console.log('currentShip: ', currentShip);
      console.log('currentShip length: ', ships[currentShip].length);

      var rowDown = Number(mouseDownSquare.slice(1, 2));
      console.log({ rowDown });
      var colDown = Number(mouseDownSquare.slice(3, 4));
      console.log({ colDown });
      var rowUp = Number(mouseUpId.slice(1, 2));
      console.log({ rowUp });
      var colUp = Number(mouseUpId.slice(3, 4));
      console.log({ colUp });

      if (rowUp - rowDown === 0 && colUp >= colDown) {
        console.log('horizontal positive ship placement');
        // horizontalPositive
        if (colDown + ships[currentShip].length <= 10) {
          // check that all squares are valid
          var checkColDown = colDown;
          if (!checkSquare(rowDown, colDown, 1)) {
            return;
          }
          for (let c = 1; c < ships[currentShip].length; c++) {
            checkColDown++;
            if (!checkSquare(rowDown, checkColDown, 1)) {
              alert('What kind of captain are you? Your ships would collide!');
              return;
            };
          }
          // now update those squares
          updateSquare(rowDown, colDown, 1)
          for (let i = 1; i < ships[currentShip].length; i++) {
            colDown++;
            updateSquare(rowDown, colDown, 1);
          }
        } else {
          alert(`invalid selection`);
          return;
        }
      } else if (rowUp - rowDown === 0 && colUp < colDown) {
        console.log('horizontal negative ship placement');
        //horizontalNegative
        if (colDown - ships[currentShip].length >= -1) {
          // check that all squares are valid
          var checkColDown = colDown;
          if (!checkSquare(rowDown, colDown, 1)) {
            return;
          }
          for (let c = 1; c < ships[currentShip].length; c++) {
            checkColDown--;
            if (!checkSquare(rowDown, checkColDown, 1)) {
              alert('What kind of captain are you? Your ships would collide!')
              return;
            };
          }
          // now update those squares
          updateSquare(rowDown, colDown, 1)
          for (let i = 1; i < ships[currentShip].length; i++) {
            colDown--;
            updateSquare(rowDown, colDown, 1);
          }
        } else {
          alert(`invalid selection`);
          return;
        }
      } else if (colUp - colDown === 0 && rowUp >= rowDown) {
        console.log('vertical positive ship placement');
        // verticalPositive
        if (rowDown + ships[currentShip].length <= 10) {
          // check that all squares are valid
          var checkRowDown = rowDown;
          if (!checkSquare(rowDown, colDown, 1)) {
            return;
          }
          for (let c = 1; c < ships[currentShip].length; c++) {
            checkRowDown++;
            if (!checkSquare(checkRowDown, colDown, 1)) {
              alert('What kind of captain are you? Your ships would collide!')
              return;
            };
          }
          // now update those squares
          updateSquare(rowDown, colDown, 1)
          for (let i = 1; i < ships[currentShip].length; i++) {
            rowDown++;
            updateSquare(rowDown, colDown, 1);
          }
        } else {
          alert(`invalid selection`);
          return;
        }
      } else if (colUp - colDown === 0 && rowUp < rowDown) {
        console.log('vertical negative ship placement');
        //verticalNegative
        if (rowDown - ships[currentShip].length >= -1) {
          // check that all squares are valid
          var checkRowDown = rowDown;
          if (!checkSquare(rowDown, colDown, 1)) {
            return;
          }
          for (let c = 1; c < ships[currentShip].length; c++) {
            checkRowDown--;
            if (!checkSquare(checkRowDown, colDown, 1)) {
              alert('What kind of captain are you? Your ships would collide!')
              return;
            };
          }
          // now update those squares
          updateSquare(rowDown, colDown, 1);
          for (let j = 1; j < ships[currentShip].length; j++) {
            rowDown--;
            updateSquare(rowDown, colDown, 1);
          }
        } else {
          alert(`invalid selection`);
          return;
        }
      } else {
        alert(`invalid selection, ships cannot be placed diagonally`);
        return;
      }

      console.log('board after placeShip: ', board);
      setShipPlacementMode(false);
      var shipPlaced = { ...ships }
      shipPlaced[currentShip].placed = true;
      setShips(shipPlaced);
      console.log('ships after placeShips call: ', ships);
    }
  }

  var handleShipClick = (nameOfShip) => {
    console.log('nameOfShip is: ', nameOfShip);
    //when a user clicks a ship button it toggles the 'shipPlacementMode' state to true
    setShipPlacementMode(true);
    // also sets the current ship state to nameOfShip
    setCurrentShip(nameOfShip);
  }

  const handleSubmitBoard = () => {
    // post the board to the server (along with a unique identifier)
    var postData = {
      username: username,
      board: board,
    }
    axios.post('http://localhost:8000/setboard', postData)
    .then((listOfOpponents) => {
    })
  }

  // Board Creation Logic:
  var rows = [];
  var numrows = board.length;
  for (var r = 0; r < numrows; r++) {
    var squaresInRow = [];
    for (var c = 0; c < numrows; c++) {
      squaresInRow.push(<Square key={[r, c]}
        id={`r${r}c${c}`}
        value={board[r][c]}
        placeShip={placeShip}
        setMouseDownSquare={setMouseDownSquare}
        setMouseUpSquare={setMouseUpSquare} />);
    }
    rows.push(<div key={r}>{squaresInRow}</div>);
  }

  return (
    <div className="in-progress">
      {rows}

      {/* For Refactor: Dynamically render these buttons */}
      {!ships.destroyer.placed ? <button onClick={(e) => handleShipClick(e.target.value)} value="destroyer"> destroyer - length 2</button> : null}

      <div />

      {!ships.submarine.placed ? <button onClick={(e) => handleShipClick(e.target.value)} value="submarine">  submarine - length 3</button> : null}

      <div />

      {!ships.cruiser.placed ? <button onClick={(e) => handleShipClick(e.target.value)} value="cruiser">  cruiser - length 3</button> : null}

      <div />

      {!ships.battleship.placed ? <button onClick={(e) => handleShipClick(e.target.value)} value="battleship">  battleship - length 4</button> : null}

      <div />

      {!ships.carrier.placed ? <button onClick={(e) => handleShipClick(e.target.value)} value="carrier">  carrier - length 5</button> : null}

      {ships.destroyer.placed
      && ships.submarine.placed
      && ships.cruiser.placed
      && ships.battleship.placed
      && ships.carrier.placed ? <button onClick={() => handleSubmitBoard()}>Submit Warplan</button> : null }

    </div>
  )
}

export default Board;