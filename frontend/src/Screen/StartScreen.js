import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import clipboardCopy from 'clipboard-copy';

import { socketManager } from '../utils/socket'; 
import './index.scss';

const socket = socketManager.getSocket();

function StartScreen() {
  const [code, setCode] = useState("");
  const [showChip, setShowChip] = useState(false);
  const history = useHistory();

  useEffect(() => {
    socketManager.connect();
  },[])

  function handleChange({ target }) {
    setCode(target.value);
  }

  function handleNewGame() {
    socket.emit('createGame');
    socket.on('gameCode', (gameCode) => {
      console.log(gameCode);
      clipboardCopy(gameCode);
      setShowChip(true);
      setTimeout(() => {
        history.push({
          pathname: '/game',
          state: 'playerOne'
        });
      }, 1600);
    });
  }

  function handleJoinGame() {
    socket.emit('joinGame', code);
    history.push({
      pathname: '/game',
      state: 'playerTwo'
    });
  }

  const styles = {
    mainHeader: {
      fontSize: 75,
      fontFamily: "VT323",
      color: "#fff",
    },
    button: {
      fontSize: 30,
      fontFamily: "VT323",
      backgroundColor: "#2e419e",
    },
    secondaryText: {
      fontFamily: "VT323",
      fontSize: 45,
    },
    inputField: {
      fontSize: 30,
      fontFamily: "VT323",
      textAlign: "center",
      backgroundColor: "#fff",
    },
    joinButton: {
      fontSize: 30,
      fontFamily: "VT323",
      marginTop: "4vh",
    },
    chip: {
      position: "absolute",
      bottom: "55px",
      right: "80px",
      fontSize: "32px",
      fontFamily: "VT323",
      backgroundColor: "#f9a825",
      color: "#fff",
      display: showChip ? "block" : "none",
    },
  };

  return (
    <div className='start-screen'>
      <div className='start-main-div'>
        <Typography variant="h2" gutterBottom style={styles.mainHeader}>
          Tank Showdown
        </Typography>
        <Button
          variant="contained" 
          color="primary" 
          size='large' 
          onClick={handleNewGame}
          style={styles.button}
        >
          Create New Game
        </Button>
        <Typography variant="h5" gutterBottom style={styles.secondaryText}>
          Or
        </Typography>
        <TextField
          value={code}
          onChange={handleChange}
          autoComplete='off'
          inputProps={{ style: styles.inputField }} 
          id='game-code-input'
          placeholder="Enter Game Code"
          variant="outlined"
        />
        <Button 
          variant="contained" 
          color="primary" 
          size='large' 
          disabled={!code}
          onClick={handleJoinGame}
          style={styles.joinButton}
        >
          Join Game
        </Button>
        <Chip label="Link Copied" style={styles.chip} />
      </div>
    </div>
  );
}

export default StartScreen;
