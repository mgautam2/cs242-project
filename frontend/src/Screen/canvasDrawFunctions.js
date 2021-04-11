import constants from '../constants';

export default (ctx) => ({
  init() {
    ctx.fillStyle = constants.BG_COLOUR;
    ctx.fillRect(0, 0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT);
  },
  
  paintGame(y) {
    this.init();
    ctx.fillStyle = "white";
    ctx.fillRect(10, y, 10, 10);
  },

  player(x, y) {
    
  }
  
})
