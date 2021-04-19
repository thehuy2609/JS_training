import { Node } from "./Node.js";
export class Sprite extends Node {

    constructor(path,isActive,className) {
        super();
        this._path = "";
        if (path) this.path = path;
        this.active = isActive;
        this._className = "";
        if (className) this.className = className;
        
    }

    get path() {
        return this._path;
    }
    set path(value) {
        this._path = value;
        this.elm.src = this._path;
    }

    get className() {
        return this._className;
    }
    set className(value) {
        this._className = value;
        this.elm.className = this._className;
    }

    _initElement() {
        this.elm = document.createElement("img");
        this.elm.style.width = "100%";
        this.elm.style.height = "100%";
        this.elm.node = this;
    }
    setImage(path) {
        this.path = path;
    }
}