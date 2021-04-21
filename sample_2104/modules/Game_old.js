import { Node } from "../lib/Node.js";
import { Sprite } from "../lib/Sprite.js";
import { Label } from "../lib/Label.js";
import { Card } from "../modules/Card.js";
export class Game extends Node {

    init() {
        this.countClick = 0;
        this.firstCard = null;
        this.secondCard = null;
        
        this._score = 1000;
        this._countWin = 0;
        this._initScore();
        this._initSize();
        this._initCards();
        this._initBackground();
    }
    
    get score(){
        return this._score;
    }

    set score(value){
        this._score = value;
        this.children[0].text = this._score;
    }
    
    get countWin(){
        return this._countWin;
    }

    set countWin(value){
        this._countWin = value;
        //console.log(this._countWin);
    }

    _initScore() {
        let score = new Label(this.score,{
            color: "#fff",
            fontSize: "25px",
            top: "10px",
            left: "20px",
            zIndex: "99",
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
        if(this.countClick === 0 ){
            this.countClick++;
            this.firstCard = card;
            timeline.to(this.firstCard.children[0], {scale: "scaleX(0)", duration: 0.2});
            timeline.to(this.firstCard.children[1], {scale: "scaleX(1)", duration: 0.2});
            card.children[2].active = false;
        }else if(this.countClick === 1 ){
            if(this.firstCard.index === card.index){
                return false;    
            }else{
                this.secondCard = card;
                this.countClick++;
                timeline.to(this.secondCard.children[0], {scale: "scaleX(0)", duration: 0.2});
                timeline.to(this.secondCard.children[1], {scale: "scaleX(1)", duration: 0.2});
                this.secondCard.children[2].active = false;
                
                let timeline1 = gsap.timeline();

                if(this.firstCard.value === this.secondCard.value){
                    setTimeout(function(that){
                        that.firstCard.zIndex = 99999;
                        that.secondCard.zIndex = 99999;
                        timeline.to(that.firstCard.children[1], {scale: "scale(1.3)", duration: 0.2});
                        timeline1.to(that.secondCard.children[1], {scale: "scale(1.3)", duration: 0.2});
                        
                        timeline.to(that.firstCard, {active: false, duration: 0.2});
                        timeline1.to(that.secondCard, {active: false, duration: 0.2});
                        
                        that.firstCard = null;
                        that.secondCard = null;
                        that.countClick =0;
                        that.score +=100;
                        that.countWin +=1;
                        if(that.countWin === 10){
                            alert('Thắng rồi nha!!!')
                        }
                    }, 1000, this);
                }else{
                    setTimeout(function(that){
                        timeline.to(that.firstCard.children[1], {scale: "scaleX(0)", duration: 0.2});
                        timeline.to(that.firstCard.children[0], {scale: "scaleX(1)", duration: 0.2});
                        timeline.to(that.firstCard.children[2], {active: true, duration: 0.2});
                        
                        timeline1.to(that.secondCard.children[1], {scale: "scaleX(0)", duration: 0.2});
                        timeline1.to(that.secondCard.children[0], {scale: "scaleX(1)", duration: 0.2});
                        timeline1.to(that.secondCard.children[2], {active: true, duration: 0.2});
                        
                        that.firstCard = null;
                        that.secondCard = null;
                        that.countClick =0;
                        that.score-=100;
                        if(that.score <= 0){
                            alert('Thua rồi nha!!!')
                        }
                    }, 1000, this);
                }
            }
        }
    }
}

// let timeline = gsap.timeline();
// timeline.to(cover, {duration: 1, scaleX: 0})
// timeline.to(cover, {duration: 1, scaleX: 1})