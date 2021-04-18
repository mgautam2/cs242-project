import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';

import Canvas from './Canvas';
import Loading from './Loading';
import StatsBar from './StatsBar';
import { socketManager } from '../utils/socket';
import sound from '../asset/sounds';
import './index.css';


const socket = socketManager.getSocket();

function GameScreen() {
  const [start, setStart] = useState(false);
  
  socket.on('initGame', () => {
    sound.background.play();
    setStart(true);
  })
  
  // pass up properties to the header later on
  
  return (
    <div className='game-screen'>
      <div className='game-header'>
        <StatsBar />
      </div>
      {(start) ? <Canvas /> : <Loading />}
    </div>
  );
}


export default GameScreen;
