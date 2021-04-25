import { Label } from "../lib/Label.js";
import { Node } from "../lib/Node.js";
import { Sprite } from "../lib/Sprite.js";

export class Card extends Node {
    constructor(indexLabel, value, x, y, zIndex, canClick) {
        super();
        this._indexLabel = indexLabel;
        this._value = "";
        if(value) this.value = value;
        
        this.width = 120;
        this.height = 96;
        this.x = x;
        this.y = y;
        this._zIndex = "";
        if(zIndex) this.zIndex = zIndex;
        this._canClick = false;
        if(canClick) this.canClick = canClick;

        this._initCover();
        this._initValue();
        this._initIndexLabel();
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

    get zIndex() {
        return this._zIndex;
    }
    set zIndex(value) {
        this._zIndex = value;
        this.elm.style.zIndex = this._zIndex;
    }

    get canClick() {
        return this._canClick;
    }
    set canClick(value) {
        this._canClick = value;
    }

    _initCover() {
        let bg = new Sprite("./img/cardBg.jpg","scaleX(1)",2);
        //bg.elm.style.zIndex = 2;
        //bg.elm.node = this;
        bg.elm.style.pointerEvents = "none";
        this.addChild(bg);
    }
    
    _initValue() {
        let imgValue = new Sprite("./img/trucxanh" + this._value + ".jpg","scaleX(0)",1);
        imgValue.elm.node = this;
        imgValue.elm.style.pointerEvents = "none";
        //imgValue.elm.style.transform = "scaleX(0)";
        //imgValue.elm.style.zIndex=1;
        this.addChild(imgValue);
    }

    _initIndexLabel() {
        let indexLabel = new Label(this._indexLabel,{
            color: "#fff",
            fontSize: "25px",
            transform: "translate(-50%,-50%)",
        },true);
        indexLabel.elm.style.pointerEvents = "none";
        indexLabel.elm.style.zIndex =3;
        indexLabel.x = this.width/2;
        indexLabel.y = this.height/2;
        this.addChild(indexLabel);
    }

    _initElement() {
        super._initElement();
        this.elm.style.left = this._x + "px";
        this.elm.style.top = this._y + "px";
        this.elm.style.opacity = 1;
        this.elm.style.cursor = "pointer";
        
    }
}
