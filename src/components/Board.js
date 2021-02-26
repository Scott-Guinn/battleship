import React, { useState, useEffect } from 'react';
import Square from './Square.js';
import '../index.css';

var Board = () => {
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
    newBoard[row][col] = value;
    setBoard(newBoard);
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

      var rowDown = mouseDownSquare.slice(1, 2);
      console.log({ rowDown });
      var colDown = mouseDownSquare.slice(3, 4);
      console.log({ colDown });
      var rowUp = mouseUpId.slice(1, 2);
      console.log({ rowUp });
      var colUp = mouseUpId.slice(3, 4);
      console.log({ colUp });

      // updateSquare of rowDown, colDown
      updateSquare(rowDown, colDown, 1)

      // if the difference in rowUp & rowDown is 0, it's a horizontal placement:
      if (rowUp - rowDown === 0) {

        if (colUp > colDown) {
          for (let i = 1; i < ships[currentShip].length; i++) {
            colDown++;
            updateSquare(rowDown, colDown, 1);
          }
        } else {
          for (let i = 1; i < ships[currentShip].length; i++) {
            colDown--;
            updateSquare(rowDown, colDown, 1);
          }
        }

      } else {
        // if the difference in colUp & colDown is 0, it's a vertical placment:
        if (rowUp > rowDown) {
          for (let j = 1; j < ships[currentShip].length; j++) {
            rowDown++;
            updateSquare(rowDown, colDown, 1);
          }
        } else {
          for (let j = 1; j < ships[currentShip].length; j++) {
            rowDown--;
            updateSquare(rowDown, colDown, 1);
          }
        }
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

  // Board Creation Logic:
  var rows = [];
  var numrows = board.length;
  for (var r = 0; r < numrows; r++) {
    var squaresInRow = [];
    for (var c = 0; c < numrows; c++) {
      squaresInRow.push(<Square key={r+c}
        id={`r${r}c${c}`}
        value={board[r][c]}
        placeShip={placeShip}
        setMouseDownSquare={setMouseDownSquare}
        setMouseUpSquare={setMouseUpSquare} />);
    }
    rows.push(<div>{squaresInRow}</div>);
  }

  return (
    <div>
      {rows}

      {/* For Refactor: Dynamically render these buttons */}
      {!ships.destroyer.placed ? <button onClick={(e) => handleShipClick(e.target.value)} value="destroyer"> destroyer - length 2</button> : <div />}

      <div />

      {!ships.submarine.placed ? <button onClick={(e) => handleShipClick(e.target.value)} value="submarine">  submarine - length 3</button> : <div />}

      <div />

      {!ships.cruiser.placed ? <button onClick={(e) => handleShipClick(e.target.value)} value="cruiser">  cruiser - length 3</button> : <div />}

      <div />

      {!ships.battleship.placed ? <button onClick={(e) => handleShipClick(e.target.value)} value="battleship">  battleship - length 4</button> : <div />}

      <div />

      {!ships.carrier.placed ? <button onClick={(e) => handleShipClick(e.target.value)} value="carrier">  carrier - length 5</button> : <div />}

    </div>
  )
}

export default Board;