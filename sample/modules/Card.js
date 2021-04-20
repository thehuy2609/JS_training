import { Label } from "../lib/Label.js";
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
        this._initIndex();
    }

    get index() {
        return this._index;
    }

    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }

    _initCover() {
        let bg = new Sprite("../img/cardBg.jpg",true);
        bg.elm.node = this;
        bg.elm.style.zIndex=2;
        this.addChild(bg);
    }
    
    _initValue() {
        let imgValue = new Sprite("../img/trucxanh" + this._value + ".jpg",false);
        imgValue.elm.node = this;
        imgValue.elm.style.transform = "scaleX(0)";
        imgValue.elm.style.zIndex=1;
        this.addChild(imgValue);
    }

    _initIndex() {
        let index = new Label(this._index,{
            color: "#fff",
            fontSize: "25px",
        },true,true);
        index.elm.node = this;
        index.elm.style.zIndex =3;
        this.addChild(index);
    }

    _initElement() {
        super._initElement();
        //this.elm.style.border = "1px solid blue";
        this.elm.style.left = this._x + "px";
        this.elm.style.top = this._y + "px";
        this.elm.style.zIndex = "999";
        
    }
}
