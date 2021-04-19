import { Node } from "./Node.js";
export class Label extends Node {

    constructor(text,textStyle) {
        super();
        this._text = "";
        if (text) this.text = text;
        
        this._textStyle = {};
        if (textStyle) {this.textStyle = textStyle}
        
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
        
    }

    _initElement() {
        this.elm = document.createElement("label");
        this.elm.style.position = "absolute";
        this.elm.style.fontSize = this._textStyle;
        this.elm.style.color = this._textStyle;
    }
}