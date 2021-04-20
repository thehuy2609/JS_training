import { Node } from "./Node.js";
export class Sprite extends Node {

    constructor(path) {
        super();
        this._path = "";
        if (path) this.path = path;
        
        
    }

    get path() {
        return this._path;
    }
    set path(value) {
        this._path = value;
        this.elm.src = this._path;
    }

    _initElement() {
        this.elm = document.createElement("img");
        this.elm.style.width = "100%";
        this.elm.style.height = "100%";
        this.elm.style.position = "absolute";
        this.elm.style.transition = "0.5s";
        this.elm.style.left = 0;
        this.elm.style.top = 0;
        this.elm.node = this;
    }
    setImage(path) {
        this.path = path;
    }
}