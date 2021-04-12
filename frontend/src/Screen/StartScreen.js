import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { setPlayer } from '../redux/action';
import { socketManager } from '../utils/socket'; 
import './index.css';

const socket = socketManager.getSocket();

function StartScreen() {
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const history = useHistory();
  
  useEffect(() => {
    socketManager.connect();
  },[])
  
  function handleChange({target}) {
    setCode(target.value)
  }
  
  function newGame() {
    socket.emit('createGame');
    socket.on('gameCode', (gameCode, player) => {
      console.log(gameCode)
      // wait for acknowledgement. Have an error field
      dispatch(setPlayer("playerOne"));
      history.push('/game');
    })
  }

  function joinGame() {
    console.log(typeof code)
    socket.emit('joinGame', code);
    dispatch(setPlayer("playerTwo"));
    // wait for acknowledge event
    history.push('/game');
  }
  
  return (
    <div className='start-screen'>
      <div className='start-main-div'>
        <Typography variant="h2" gutterBottom>
          Multiplayer Tank Game
        </Typography>
        <Button
          variant="contained" 
          color="primary" 
          size='large' 
          onClick={newGame}
        >
          Create New Game
        </Button>
        <Typography variant="h5" gutterBottom>
          Or
        </Typography>
        <TextField
          value={code}
          onChange={handleChange}
          autoComplete='off'
          inputProps={{style: {fontSize: 20}}} 
          id='game-code-input'
          placeholder="Enter Game Code"
          variant="outlined"
        />
        <Button 
          variant="contained" 
          color="primary" 
          size='large' 
          disabled={!code}
          onClick={joinGame}
        >
          Join Game
        </Button>
      </div>
    </div>
  );
}

export default StartScreen;
