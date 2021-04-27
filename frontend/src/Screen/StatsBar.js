import React, { useState } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import Typography from '@material-ui/core/Typography';


 
function color(health) {
  let color = '#F70850';
  
  if (health >= 70) {
    color = '#60E637';
  }
  else if(health < 70 && health >= 30) {
    color = '#F77E04';
  }
  return color;
}

function StatsBar({stat, timer}) {
  const { playerOne, playerTwo } = stat;
  const playerOneHealth = (playerOne) ? playerOne.health : 100;
  const playerTwoHealth = (playerTwo) ? playerTwo.health : 100;
  
  return (
    <>
      <div className='progress-bar'>
        <ProgressBar completed={playerOneHealth}
          isLabelVisible={false}
          bgColor={color(playerOneHealth)}
         />
      </div>
      <div className='timer-div'>
        <Typography variant="h5" gutterBottom>
          {timer}
        </Typography>
      </div>
      <div className='progress-bar'>
        <ProgressBar completed={100 - playerTwoHealth} 
          bgColor='#e0e0de'
          baseBgColor={color(playerTwoHealth)}
          isLabelVisible={false}
        />
      </div>
    </>
  );
}

export default StatsBar;
