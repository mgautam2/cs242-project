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
  
  getHeight() {
    return this.pos.y;
  }
  
  getSqDistance(obj) {
    const dist = Math.pow(this.pos.x - obj.x, 2) + Math.pow(this.pos.y - obj.y, 2);
    return dist;
  }
  
  getPlayer() {
    return this.player;
  }
  
  getPos() {
    return this.pos;
  }
  
}

module.exports = Projectiles; 
