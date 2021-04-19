import { Node } from "../lib/Node.js";
import { Sprite } from "../lib/Sprite.js";

export class Card extends Node {
    constructor(index, value, x, y) {
        super();
        this._index = index;
        this._value = "";
        if(value) this.value = value;
        this.width = 120;
        this.height = 96;
        this.x = x;
        this.y = y;
        
        this._initCover();
        this._initValue();
    }

    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }

    _initCover() {
        let bg = new Sprite("../img/cardBg.jpg",true,"cover");
        bg.elm.node = this;
        this.addChild(bg);
    }
    
    _initValue() {
        //console.log(this.value);
        let imgValue = new Sprite("../img/trucxanh" + this._value + ".jpg",false,"value");
        this.addChild(imgValue);
    }

    _initElement() {
        super._initElement();
        //this.elm.style.border = "1px solid blue";
        this.elm.style.left = this._x + "px";
        this.elm.style.top = this._y + "px";
        
    }
}
