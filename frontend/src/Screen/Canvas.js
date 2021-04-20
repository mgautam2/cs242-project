import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';

import canvasDraw from './canvasDrawFunctions';
import constants from '../constants';
import { socketManager } from '../utils/socket'; 
import sound from '../asset/sounds';
import './index.css';

const socket = socketManager.getSocket();
let draw;
const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
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
  
  
  function moveTank({keyCode}) {
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
      setWinner(gameState.winner);
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
    <>
      <canvas
        height={constants.CANVAS_HEIGHT}
        width={constants.CANVAS_WIDTH}
        ref={canvasRef}
        />
      <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            contentLabel="Example Modal"
      >
        The Winner is {' '} 
        {winner} !
      </Modal>
    </>
  );
}

export default Canvas;
