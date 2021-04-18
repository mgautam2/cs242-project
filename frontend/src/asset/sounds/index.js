import backgroundMusic from "./background.mp3";
import explosionSound from "./explosion_shorter.mp4";

const background = new Audio(backgroundMusic);
background.loop = true;

const explosion = new Audio(explosionSound);

export default {
  background,
  explosion
}
