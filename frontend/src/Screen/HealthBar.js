import React, { useEffect, useState } from 'react';
import './HealthBar.scss';

const HealthBar = ({stat, timer}) => {
    const { playerOne, playerTwo } = stat;
    const playerOneHealth = (playerOne) ? playerOne.health : 100;
    const playerTwoHealth = (playerTwo) ? playerTwo.health : 100;
  


  return (
    <div className="health-container">
      <div className="l-split__item">
        <div className="healthbar">
          <div className="healthbar__meter healthbar__meter--player-one" style={{ width: `${playerOneHealth}%` }}></div>
        </div>
      </div>
      <div className="l-split__item l-split__item--small">
        <div className="ko"> {timer} </div>
      </div>
      <div className="l-split__item">
        <div className="healthbar">
          <div className="healthbar__meter healthbar__meter--player-two" style={{ width: `${playerTwoHealth}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default HealthBar;


