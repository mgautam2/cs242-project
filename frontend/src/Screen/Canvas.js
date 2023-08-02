import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';

import canvasDraw from './canvasDrawFunctions';
import constants from '../constants';
import { socketManager } from '../utils/socket'; 
import sound from '../asset/sounds';

const socket = socketManager.getSocket();
let draw;
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, .95)', // Background color for the overlay
  },
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'transparent', // Set the background of the modal content to transparent
    border: 'none', // Remove any borders
    padding: '0', // Remove padding
    transition: ' 2s ease-in-out'
  },
};

function Canvas({statFunc}) {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [gameActive, setGameActive] = useState(false);
  const gameActiveRef = useRef(gameActive);
  const [modalIsOpen,setIsOpen] = useState(false);
  const [winner,setWinner] = useState('');
  
  function openModal() {
    setIsOpen(true);
  }

  function updateState(newState) {
    gameActiveRef.current = newState;
    setGameActive(newState);
  }

  useEffect(() => {
    document.addEventListener('keydown', moveTank);
    
    const canvasContext = canvasRef.current.getContext('2d');
    canvasContext.fillStyle = "#283b92";
    setCtx(canvasContext);
    updateState(true);
    draw = canvasDraw(canvasContext);
    draw.init(); 
    // attach socket listerners
    socket.on('gameState', handleGameState);
    
    return () => {
      document.removeEventListener('keydown', moveTank);
      socket.off("gameState", handleGameState);
    };
  }, [])
  
  useEffect(() => {
    gameActiveRef.current = gameActive;
  }, [gameActive])
  
  
  function moveTank(event) {
    const {keyCode} = event;
    

    if (keyCode === 37 || keyCode === 39 ) {
      const cmd = (keyCode === 37) ? 'left' : 'right';   
      socket.emit('moveKeyDown', cmd);
    }
    else if (keyCode === 32) {
      // sound.explosion.play();
      socket.emit('fireKeyDown');
    }
  }
  
  function checkForWinner(gameState) {
    if (gameState.winner !== '') {
      setIsOpen(true);
      if(gameState.winner === 'playerOne')
        setWinner('Blue');
      else 
        setWinner('Red');
    }
  }
  
  function handleGameState(gameState) {
    if (!gameActiveRef.current) {
      return;
    }
    gameState = JSON.parse(gameState);
    const { playerOne, playerTwo } = gameState;
    statFunc({ playerOne, playerTwo }, gameState.time);
    checkForWinner(gameState);
    requestAnimationFrame(() => draw.paintGame(gameState));
  }
  
  return (
    <div className="Canvas">
      <canvas
        height={constants.CANVAS_HEIGHT}
        width={constants.CANVAS_WIDTH}
        ref={canvasRef}
        />
      <Modal
            isOpen={modalIsOpen}
            style={customStyles}
      >
        <p className="winner">GAME OVER <br/><b> Winner is {winner}!</b></p>
      </Modal>
    </div>
  );
}

export default Canvas;
