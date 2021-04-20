import constants from '../constants';
import tankOneImg from '../asset/images/tankOne.png'
import tankTwoImg from '../asset/images/tankTwo.png'
import laserImg from '../asset/images/laser.png'


const playerOne = new Image();
const playerTwo = new Image();
const laser = new Image();
const tankLength = constants.TANK_LENGHT;
const tankWidth = constants.TANK_WIDTH;

export default (ctx) => ({
  
  init() {
    this.clearScreen();
    playerOne.src = tankOneImg;
    playerTwo.src = tankTwoImg;
    laser.src = laserImg;
  },
  
  clearScreen() {
    ctx.fillStyle = constants.BG_COLOUR;
    ctx.fillRect(0, 0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT);
  },
  
  paintPlayer(player) {
  const {pos} = player;
  const x = pos.x * constants.GRID_SIZE;
  const y = pos.y * constants.GRID_SIZE;
  
  if (player.number === 1) {
    ctx.drawImage(playerOne, x - tankWidth/2 , y, tankWidth, tankLength);
  }
  else if (player.number === 2) {
    ctx.drawImage(playerTwo, x - tankWidth/2, y, tankWidth, tankLength);
  }
  },
  
  paintBullets(projectiles) {
    projectiles.forEach((projectile) => {
      const x = projectile.pos.x * constants.GRID_SIZE;
      const y = projectile.pos.y * constants.GRID_SIZE;
      ctx.drawImage(laser, x - constants.BULLET_WIDTH/2, y, constants.BULLET_WIDTH, constants.BULLET_LENGHT);
    })
  },
  
  paintCollisions(collisions) {
    collisions.forEach((collision) => {
      const x = collision.pos.x * constants.GRID_SIZE;
      const y = collision.pos.y * constants.GRID_SIZE;
      const r = collision.radius * 2;
      ctx.beginPath();
      ctx.fillStyle = 'red';
      ctx.arc(x, y, r*1.1, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = 'orange';
      ctx.arc(x, y, r*.8, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = 'yellow';
      ctx.arc(x, y, r*.4, 0, 2 * Math.PI);
      ctx.fill();
    })
  },
  
  paintGame(state) {
    this.clearScreen();
    this.paintPlayer(state.playerOne);
    this.paintPlayer(state.playerTwo);
    this.paintBullets(state.projectiles);
    this.paintCollisions(state.collisions);
  },
    
})
