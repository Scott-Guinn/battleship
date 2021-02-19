import React, { useState, useEffect } from 'react';

var Square = ({ id, value, setMouseDownSquare, setMouseUpSquare }) => {
  var [ship, setShip] = useState(false);
  var [shot, setShot] = useState(false);
  var [backgroundColor, setBackgroundColor] =  useState("rgb(185, 1:wq85, 185)");

  var squareStyle = {
    backgroundColor: "rgb(185, 185, 185)"
  }

  useEffect(() => {
    if(value === 0) {
      setBackgroundColor('rgb(185, 185, 185)');
    } else if (value === 1) {
      setBackgroundColor('rgb(82, 25, 82)');
    } else if (value === 2) {
      setBackgroundColor('rgb(139, 37, 37)');
    }
  })

  // this function is no longer necessary?
  var placeShip = () => {
    setShip(!ship);
    if(ship === false) {
      setBackgroundColor("rgb(31, 172, 62)");
    } else {
      setBackgroundColor("rgb(185, 185, 185)");
    }
  }

  // adjust the mouseUp event listener to
  return (
    <div style={{backgroundColor: backgroundColor}}
        //  onClick={placeShip}
         className="square"
         onMouseDown={() => {placeShip(); setMouseDownSquare(id)}}
         onMouseUp={() => setMouseUpSquare(id)}

         >{id}value: {value}</div>
  )
}

export default Square;