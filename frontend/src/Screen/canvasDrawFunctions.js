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
  // console.log(player)
  const x = pos.x * constants.GRID_SIZE;
  const y = pos.y * constants.GRID_SIZE;
  // console.log({x, y})
  
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
  
  paintGame(state) {
    this.clearScreen();
    this.paintPlayer(state.playerOne);
    this.paintPlayer(state.playerTwo);
    this.paintBullets(state.projectiles);
  },
    
})
