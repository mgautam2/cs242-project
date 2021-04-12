import React, { useState, useRef, useEffect } from 'react';

import canvasDraw from './canvasDrawFunctions';
import constants from '../constants';
import { socketManager } from '../utils/socket'; 
import './index.css';

const socket = socketManager.getSocket();
let draw;

function Canvas() {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [gameActive, setGameActive] = useState(false);
  const gameActiveRef = useRef(gameActive);
  
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
      socket.emit('fireKeyDown');
    }
  }
  
  
  function handleGameState(gameState) {
    if (!gameActiveRef.current) {
      return;
    }
    gameState = JSON.parse(gameState);
    requestAnimationFrame(() => draw.paintGame(gameState));
  }
  
  return (
    <canvas
      height={constants.CANVAS_HEIGHT}
      width={constants.CANVAS_WIDTH}
      ref={canvasRef}
      />
  );
}

export default Canvas;
