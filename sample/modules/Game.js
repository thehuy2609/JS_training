import { Node } from "../lib/Node.js";
import { Sprite } from "../lib/Sprite.js";
import { Label } from "../lib/Label.js";
import { Card } from "../modules/Card.js";
export class Game extends Node {

    init() {
        this.countClick = 0;
        this.firstCard = null;
        this.secondCard = null;
        this.score = 10000;
        this._initSize();
        this._initCards();
        this._initBackground();
        this._initScore();
    }

    
    _initScore() {
        let score = new Label(this.score,{
            color: "#fff",
            fontSize: "25px",
            top: "10px",
            left: "20px"
        },true,false);
        this.addChild(score);
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
        let timeline = gsap.timeline();
        let card = evt.target.node;
        if(this.countClick === 0){
            this.countClick++;
            this.firstCard = card;
            timeline.to(card.children[0].elm.style, {transform: "scaleX(0)", duration: 0.2});
            timeline.to(card.children[1].elm.style, {transform: "scaleX(1)", duration: 0.2});
            //card.children[0].active = false;
            //card.children[1].active = true;
            card.children[2].active = false;
        }else if(this.countClick === 1){
            this.secondCard = card;
            if(this.firstCard.index === this.secondCard.index){
                
            }else{
                this.countClick++;
                timeline.to(card.children[0].elm.style, {transform: "scaleX(0)", duration: 0.2});
                timeline.to(card.children[1].elm.style, {transform: "scaleX(1)", duration: 0.2});
            
            
                let timeline1 = gsap.timeline();
                
                // card.children[0].active = false;
                // card.children[1].active = true;
                card.children[2].active = false;
                if(this.firstCard.value === this.secondCard.value){
                    setTimeout(function(that){
                        timeline1.to(that.firstCard.children[1].elm.style, {transform: "scaleX(0)", duration: 0.2});
                        timeline1.to(that.secondCard.children[1].elm.style, {transform: "scaleX(0)", duration: 0.2});
                        // that.firstCard.children[1].active = false;
                        // that.secondCard.children[1].active = false;
                        timeline1.to(that.firstCard.elm.style, {display: "none", duration: 0.5});
                        timeline1.to(that.secondCard.elm.style, {display: "none", duration: 0.5});
                        
                        that.firstCard = null;
                        that.secondCard = null;
                        that.countClick =0;
                    }, 1000, this);
                }else{
                    setTimeout(function(that){
                        timeline1.to(that.firstCard.children[1].elm.style, {transform: "scaleX(0)", duration: 0.2});
                        timeline1.to(that.firstCard.children[0].elm.style, {transform: "scaleX(1)", duration: 0.2});
                        
                        timeline1.to(that.secondCard.children[1].elm.style, {transform: "scaleX(0)", duration: 0.2});
                        timeline1.to(that.secondCard.children[0].elm.style, {transform: "scaleX(1)", duration: 0.2});
                        
                        //that.secondCard.children[0].elm.style, {transform: "scaleX(1)", duration: 0.2};
                        //that.secondCard.children[1].elm.style, {transform: "scaleX(0)", duration: 0.2};

                        //that.firstCard.children[0].active = true;
                        //that.firstCard.children[1].active = false;
                        that.firstCard.children[2].active = true;
                        //that.secondCard.children[0].active = true;
                        //that.secondCard.children[1].active = false;
                        that.secondCard.children[2].active = true;
                        that.firstCard = null;
                        that.secondCard = null;
                        that.countClick =0;
                    }, 1000, this);
                }
            }
        }
    }
}

// let timeline = gsap.timeline();
// timeline.to(cover, {duration: 1, scaleX: 0})
// timeline.to(cover, {duration: 1, scaleX: 1})