import {Game} from "./modules/Game.js";

var game = new Game();
document.body.appendChild(game.elm);

game.init();


// let timeline = gsap.timeline();
// timeline.to(".box1", {scaleX: 0, duration: 1});
// timeline.to(".box2", {scaleX: 1, duration: 1});
