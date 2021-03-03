import React, {useState, useEffect} from 'react';
import Board from './Board.js';

const App = () => {
  const [gameMode, setGameMode] = useState('a');
  const [username, setUsername] = useState({set: false, username: ''});

  const requestUsername = () => {
    setUsername({set: true, username: prompt('What\'s your callsign Admiral?')});

  }

  return (
  <div>
    <h1> Welcome to the Situation Room Admiral {`${username.username}`}</h1>
    { !username.set ? <button onClick={requestUsername}>Set Callsign to Begin </button> : <Board username={username.username} setGameMode={setGameMode} /> }
  </div>
    )
}

export default App;