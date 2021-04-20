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
    this.radius = this.radius - constants.RADIUS_REDUC;    
  }    
  
  isOver() {
    if (this.radius < 1)
      return true;
    return false;
  }
  
  getRadius() {
    return this.radius;
  }
}

module.exports = Collision; 
