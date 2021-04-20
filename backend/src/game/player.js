const constants = require('../constants');

class Player {
  constructor(number) {
    this.number = number;
    this.pos = {
      x: constants.CANVAS_WIDTH / (constants.GRID_SIZE * 2),
      y: (constants.CANVAS_HEIGHT - 100) / constants.GRID_SIZE 
    };
    this.health = 100;
    this.bulletVelo = (number === 1) ? -constants.BULLET_VELO : constants.BULLET_VELO;
    if (number === 2) {
      this.pos.y = (40 / constants.GRID_SIZE );
    }
  }
  
  hit() {
    this.health -= constants.BULLET_DAMAGE;
  }
  
  isDead() {
    if (this.health <= 0)
      return true;
    else 
      return false;
  }
  
  getHealth() {
    return this.health;
  }
  
  move(side) {
    if (this.pos.x <= 1  && side === 'left')
      return;
    else if (this.pos.x >= constants.CANVAS_WIDTH / (constants.GRID_SIZE) - 1 && side === 'right')
      return;
    this.pos.x += (side === 'right') ? 1 : -1;    
  }  
  
  getBulletVelo() {
    return this.bulletVelo;
  }
  
  getPos() {
    return this.pos;
  }
  
  getNum() {
    return this.number;
  }
}


module.exports = Player; 
