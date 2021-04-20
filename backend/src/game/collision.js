const constants = require('../constants');

class Collision {
  constructor({x, y}) {
    this.pos = {
      x,
      y
    };
    this.radius = constants.GRID_SIZE / 2;
  }
  
  reduceRadius() {
    this.radius = this.radius - 1;    
  }    
  
  isOver() {
    if (this.radius < 1)
      return true;
    return false;
  }
}

module.exports = Collision; 
