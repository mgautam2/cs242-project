import constants from '../constants';
import tankOne from '../assets/images/tankOne.png'
import tankTwo from '../assets/images/tankTwo.png'


const playerOne = new Image();
const playerTwo = new Image();
const tankLength = constants.TANK_LENGHT;
const tankWidth = constants.TANK_WIDTH;

export default (ctx) => ({
  
  init() {
    this.clearScreen();
    playerOne.src = tankOne;
    playerTwo.src = tankTwo;
  },
  
  clearScreen() {
    ctx.fillStyle = constants.BG_COLOUR;
    ctx.fillRect(0, 0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT);
  },
  
  paintPlayer(player) {
  const {pos} = player;
  const x = pos.x * constants.GRID_SIZE;
  const y = pos.y * constants.GRID_SIZE;
  
  
  if (player.number === 1)
    ctx.drawImage(playerOne, x - tankWidth/2 , y, tankWidth, tankLength);
  else if (player.number === 2)
    ctx.drawImage(playerTwo, x - tankWidth/2, y, tankWidth, tankLength);
  
  },
  
  paintBullets(projectiles) {
    projectiles.forEach((projectile) => {
      const x = projectile.pos.x;
      const y = projectile.pos.y;
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(x * constants.GRID_SIZE, y * constants.GRID_SIZE, 10, 0, Math.PI*2, false);
      ctx.fill();
    })
  },
  
  paintGame(state) {
    this.clearScreen();
    this.paintPlayer(state.playerOne);
    this.paintPlayer(state.playerTwo);
    this.paintBullets(state.projectiles);
  },
    
})
