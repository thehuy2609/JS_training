import {Game} from "./modules/Game.js";
import {Sprite} from "../lib/Sprite.js";
import {Node} from "../lib/Node.js";

var game = new Game();
document.body.appendChild(game.elm);

game.init();
