import React, { useState } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import Typography from '@material-ui/core/Typography';

import './index.css';
 
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


function StatsBar(props) {
  
  const playerOne = 50;
  const playerTwo = 10;
  
  // later on use props


  return (
    <>
      <div className='progress-bar'>
        <ProgressBar completed={playerOne}
          isLabelVisible={false}
          bgColor={color(playerOne)}
         />
      </div>
      <div className='timer-div'>
        <Typography variant="h5" gutterBottom>
          Time Here
        </Typography>
      </div>
      <div className='progress-bar'>
        <ProgressBar completed={playerTwo} 
          bgColor='#e0e0de'
          baseBgColor={color(100 - playerTwo)}
          isLabelVisible={false}
        />
      </div>
    </>
  );
}


export default StatsBar;
