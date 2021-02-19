import React, { useState, useEffect } from 'react';
import Square from './Square.js';
import '../index.css';

var Board = () => {
  // var [ship, setShip] = useState(false);
  // var [shot, setShot] = useState(false);
  var [ships, setShips] = useState({2: false,
                                    3: false,
                                    4: false,
                                    5: false});

  var [mouseDownSquare, setMouseDownSquare] = useState('');
  var [mouseUpSquare, setMouseUpSquare] = useState('');


  var [board, setBoard] = useState([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ]);

  // this function updates an individual square on the board. Inputs
  // are a row, a column, and the value set that square to (0, 1, or 2)
  var updateSquare = (row, col, value) => {
    var newBoard = board.slice();
    newBoard[row][col] = value;
    setBoard(newBoard);
  }

  var updateShips = (ship) => {
    var shipsUpdate = {...ships};
    shipsUpdate.ship = !shipsUpdate.ship;
    setShips(shipsUpdate);

  }

  var setMouseDownSquare = (id) => {
    console.log('setMouseDownSquare has been called on square: ', id);
  }

  var setMouseUpSquare = (id) => {
    console.log('setMouseUpSquare has been called on square: ', id);
    // compare mouseDownSquare to mouseUpSquare
    // find the difference between the rows AND the difference between the columns
      // (dif of rows OR dif of cols will be 0, depending if it's a horizontal placement or a vertical one)

    // if the difference is 4, check if ships.5 is true
    // if the difference is 3, check if ships.4 is true
    // if the difference is 2, check if ships.3 is true
    // if the difference is x, and 1 <= x <= 4, check if ships.x + is true


  }

  var rows = [];

  var numrows = 5;
  for (var r = 0; r <= numrows; r++) {
    var squaresInRow = [];
    for (var c = 0; c <= numrows; c++) {
      squaresInRow.push(<Square key={c}
                                id={`r${r}c${c}`}
                                setMouseDownSquare={setMouseDownSquare}
                                setMouseUpSquare={setMouseUpSquare} />);
    }
    rows.push(<div>{squaresInRow}</div>);
  }

  return (
    <div>
      {rows}
    </div>
  )
}

export default Board;