import { Node } from "../lib/Node.js";
import { Sprite } from "../lib/Sprite.js";
import { Card } from "../modules/Card.js";
export class Game extends Node {

    init() {
        this._initSize();
        this._initCards();
        this._initBackground();
        this.countClick = 0;
        this.firstCard = null;
        this.secondCard = null;
    }

    

    _initSize(){
        this.width = 800;
        this.height = 480;
    }

    _initBackground(){
        let bg = new Sprite("../img/trucxanh_bg.jpg",true);
        this.addChild(bg);
    }

    _initCards(){
        let posL = 100, posT = 48;
        let index = 0;
        let myArray = [];
        for (let i = 1; i <= 20; i++) {           
            myArray.push(i);
        }


        for (let i = myArray.length-1; i >0  ; i--)
        {
            var r = Math.floor(Math.random()*i);
            var t = myArray[i];
            myArray[i] = myArray[r];
            myArray[r] = t;
        }
        let RandomNumber = myArray.slice(0,20);
        
        for (let top = 0; top < 4; top++) {
            for (let left = 0; left < 5; left++) {
                index+=1;
                let imgNum = RandomNumber[index-1];
                if(imgNum > 10){
                    imgNum -= 10;
                }

                let card = new Card(index, imgNum, posL, posT);
                this.addChild(card);
                card.on("mousedown", this.onClickCard.bind(this));
                
                posL+=120;
                if(posL>580){
                    posL =100;
                }
            }
            posT+=96;
        }
    }

    onClickCard(evt) {
        let card = evt.target.node;
        this.countClick++;
        if(this.countClick === 1){
            this.firstCard = card;
            card.children[0].active = false;
            card.children[1].active = true;
        }else if(this.countClick === 2){
            this.secondCard = card;
            card.children[0].active = false;
            card.children[1].active = true;
            if(this.firstCard.value === this.secondCard.value){
                setTimeout(function(that){
                    that.firstCard.children[1].active = false;
                    that.secondCard.children[1].active = false;
                    that.firstCard = null;
                    that.secondCard = null;
                    that.countClick = 0;
                }, 1000, this);
            }else{
                setTimeout(function(that){
                    that.firstCard.children[0].active = true;
                    that.firstCard.children[1].active = false;
                    that.secondCard.children[0].active = true;
                    that.secondCard.children[1].active = false;
                    that.firstCard = null;
                    that.secondCard = null;
                    that.countClick = 0;
                }, 1000, this);
                
            }
        }
        console.log(this.firstCard);
    }
}
