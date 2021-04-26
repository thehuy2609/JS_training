import { Node } from "../lib/Node.js";
export class Audio extends Node {
    constructor(path, muted, loop){
        super();
        this._path;
        if (path) this.path = path;
        
        this._muted = false;
        if(muted) this.muted = muted;

        this._loop = false;
        if(loop) this.loop = loop;

    }
    _initElement(){
        this.elm = document.createElement('audio');
    }

    get path(){
        return this._path;
    }
    set path(value){
        this._path = value;
        this.elm.src = this._path;
    }
    
    get muted(){
        return this._muted;
    }
    set muted(value){
        this._muted = value;
        this.elm.muted = this._muted;
    }
    
    get loop(){
        return this._loop;
    }
    set loop(value){
        this._loop = value;
        this.elm.loop = this._loop;
    }

}