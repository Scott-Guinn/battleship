import React, { useState, useEffect } from 'react';

var Square = ({id, setMouseDownSquare, setMouseUpSquare}) => {
  var [ship, setShip] = useState(false);
  var [shot, setShot] = useState(false);
  var [backgroundColor, setBackgroundColor] =  useState("rgb(185, 1:wq85, 185)");
  var squareStyle = {
    backgroundColor: "rgb(185, 185, 185)"
  }

  var placeShip = () => {
    setShip(!ship);
    if(ship === false) {
      setBackgroundColor("rgb(31, 172, 62)");
    } else {
      setBackgroundColor("rgb(185, 185, 185)");
    }
  }

  return (
    <div style={{backgroundColor: backgroundColor}}
        //  onClick={placeShip}
         className="square"
         onMouseDown={() => {placeShip(); setMouseDownSquare(id)}}
         onMouseUp={() => setMouseUpSquare(id)}

         >{id}</div>
  )
}

export default Square;