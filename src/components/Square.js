import React, { useState, useEffect } from 'react';

var Square = ({ id, value, setMouseDownSquare, setMouseUpSquare, placeShip }) => {
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

  var handleClick = () => {
    console.log('id on handleClick: ', id);
    setMouseUpSquare(id);
    placeShip(id);
  }


  return (
    <div style={{backgroundColor: backgroundColor}}
         className="square"
         onMouseDown={() => setMouseDownSquare(id)}
         onMouseUp={() => handleClick()}

         >{id}value: {value}</div>
  )
}

export default Square;