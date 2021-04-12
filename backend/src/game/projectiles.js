const constants = require('../constants');

class Projectiles {
  constructor(player) {
    this.player = player.getNum();
    this.pos = {
      x: player.getPos().x,
      y: player.getPos().y,
    };
    this.velo = player.getBulletVelo();
  }
  
  move() {
    this.pos.y += this.velo;    
  }  
  
}

module.exports = Projectiles; 
