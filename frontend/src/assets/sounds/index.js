import {Howl, Howler} from 'howler';
import file from "./game.mp4";


const background = new Howl({
  src: [file],
  loop: true,
  onload() {
    console.log("Sound file is loaded")
  },
  onloaderror(err, msg) {
    console.log("error ", err, msg)
  },
  onplay() {
    console.log("Playing")
  }
});

const hit = new Howl({
  src: [file]
});

const fire = new Howl({
  src: [file]
});


export default {
  background, 
  hit,
  fire
}
