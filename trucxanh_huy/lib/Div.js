import { Node } from "./Node.js";
export class Div extends Node {

    constructor(text,textStyle,isActive,isCenter) {
        super();
        this._text = "";
        if (text) this.text = text;
        this._textStyle = {};
        if (textStyle) {this.textStyle = textStyle};
        this.active = isActive;
        this._isCenter = {};
        if (isCenter) {this.isCenter = isCenter};
        
    }

    get isCenter() {
        return this._isCenter;
    }
    set isCenter(value) {
        this._isCenter = value;
        if(this._isCenter == true){
            this.elm.style.left = "50%";
            this.elm.style.top = "50%";
            this.elm.style.transform = "translate(-50%,-50%)";
        }
    }

    get text() {
        return this._text;
    }
    set text(value) {
        this._text = value;
        this.elm.innerText = this._text;
    }
    get textStyle() {
        return this._textStyle;
    }
    set textStyle(value) {
        this._textStyle = value;
        this.elm.style.fontSize = this._textStyle.fontSize;
        this.elm.style.color = this._textStyle.color;
        this.elm.style.background = this._textStyle.background;
        this.elm.style.padding = this._textStyle.padding;
        this.elm.style.border = this._textStyle.border;
        this.elm.style.borderRadius = this._textStyle.borderRadius;
        this.elm.style.zIndex = this._textStyle.zIndex;
        this.elm.style.top = this._textStyle.top;
        this.elm.style.right = this._textStyle.right;
        this.elm.style.left = this._textStyle.left;
        this.elm.style.bottom = this._textStyle.bottom;
    }

    _initElement() {
        this.elm = document.createElement("div");
        this.elm.style.position = "absolute";
    }
}