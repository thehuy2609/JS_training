import { Node } from "./Node.js";
export class Sprite extends Node {

    constructor(path,scale,zIndex) {
        super();
        this._path = "";
        if (path) this.path = path;
        
        this._scale = "";
        if (scale) this.scale = scale;
        
        this._zIndex = "";
        if (zIndex) this.zIndex = zIndex;
        
    }

    get path() {
        return this._path;
    }
    set path(value) {
        this._path = value;
        this.elm.src = this._path;
    }
    
    get scale() {
        return this._scale;
    }
    set scale(value) {
        this._scale = value;
        this.elm.style.transform = this._scale;
    }

    get zIndex() {
        return this._zIndex;
    }
    set zIndex(value) {
        this._zIndex = value;
        this.elm.style.zIndex = this._zIndex;
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