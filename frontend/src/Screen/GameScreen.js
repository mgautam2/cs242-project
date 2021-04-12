import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';

import Canvas from './Canvas';
import Loading from './Loading';
import { socketManager } from '../utils/socket'; 
import './index.css';

const socket = socketManager.getSocket();

function GameScreen() {
  const [start, setStart] = useState(false);
  
  socket.on('initGame', () => {
    console.log("Yo")
    setStart(true);
  })
  
  return (
    <div className='game-screen'>
      <div className='game-header'>
        <Typography variant="h4" gutterBottom>
          Header
        </Typography>
      </div>
      <Canvas />
    </div>
  );
}

// {(start) ? <Canvas /> : <Loading />}
export default GameScreen;