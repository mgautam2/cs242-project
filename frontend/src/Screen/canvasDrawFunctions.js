import constants from '../constants';

export default (ctx) => ({
  init() {
    ctx.fillStyle = constants.BG_COLOUR;
    ctx.fillRect(0, 0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT);
  },
  
  paintPlayer(player) {
    const {pos} = player;
    ctx.fillStyle = "white";
    ctx.fillRect(pos.x * constants.GRID_SIZE , pos.y * constants.GRID_SIZE, 60, 60);
  },
  
  paintBullets(projectiles) {
    projectiles.forEach((projectile) => {
      const x = projectile.pos.x;
      const y = projectile.pos.y;
      ctx.fillStyle = "red";
      ctx.fillRect(x * constants.GRID_SIZE, y * constants.GRID_SIZE, 20, 20);
    })
  },
  
  paintGame(state) {
    this.init();
    this.paintPlayer(state.playerOne)
    this.paintBullets(state.projectiles);
  },
    
})
