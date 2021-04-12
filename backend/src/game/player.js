const constants = require('../constants');

class Player {
  constructor(number) {
    this.number = number;
    this.pos = {
      x: constants.CANVAS_WIDTH / (constants.GRID_SIZE * 2),
      y: (constants.CANVAS_HEIGHT - 100) / constants.GRID_SIZE 
    };
    this.health = 100;
  }
  
  hit() {
    this.health -= constants.BULLET_DAMAGE;
  }
  
  dead() {
    if (this.health <= 0)
      return true;
    else 
      return false;
  }
  
  move(side) {
    this.pos.x += (side === 'right') ? 1 : -1;    
  }  
}

module.exports = Player; 
