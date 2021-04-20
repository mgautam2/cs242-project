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
  const [playerStats, setStats] = useState({});
  const [time, setTime] = useState(0);
  
  function getPlayerStats(stats, timer) {
    setStats(stats);
    setTime(Math.ceil(timer));
  }
  
  socket.on('initGame', () => {
    sound.background.play();
    setStart(true);
  })

  return (
    <div className='game-screen'>
      <div className='game-header'>
        <StatsBar stat={playerStats}  timer={time}/>
      </div>
      {(start) ? <Canvas statFunc={getPlayerStats} /> : <Loading />}
    </div>
  );
}

export default GameScreen;
