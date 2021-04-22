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

                let card = new Card(index, imgNum, posL, posT, 999, true);
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
        
        if(this.countClick === 0  && card.canClick === true){
            this.countClick++;
            this.firstCard = card;
            
            this.firstCard.canClick = false;
            timeline.to(this.firstCard.children[0], {scale: "scaleX(0)", duration: 0.2});
            timeline.to(this.firstCard.children[1], {scale: "scaleX(1)", duration: 0.2});
            this.firstCard.children[2].active = false;
        }else if(this.countClick === 1 && card.canClick === true){
            
            this.countClick++;
            this.secondCard = card;
            
            this.secondCard.canClick = false;
            timeline.to(this.secondCard.children[0], {scale: "scaleX(0)", duration: 0.2});
            timeline.to(this.secondCard.children[1], {scale: "scaleX(1)", duration: 0.2});
            this.secondCard.children[2].active = false;
            
            let timeline1 = gsap.timeline();
            
            if(this.firstCard.value === this.secondCard.value){
                this.firstCard.zIndex = 99999;
                this.secondCard.zIndex = 99999;
                setTimeout(()=>{

                    timeline.to(this.firstCard.children[1], {scale: "scale(1.3)", duration: 0.2});
                    timeline1.to(this.secondCard.children[1], {scale: "scale(1.3)", duration: 0.2});
                    timeline.to(this.firstCard, {active: false, duration: 0.2});
                    timeline1.to(this.secondCard, {active: false, duration: 0.2});
                    
                    this.firstCard = null;
                    this.secondCard = null;
                    this.countClick = 0;
                }, 400)

                this.score +=100;
                this.countWin +=1;
                if(this.countWin === 10){
                    alert('Thắng rồi nha!!!');
                }
            }else{
                
                setTimeout(()=>{
                    
                    timeline.to(this.firstCard.children[1], {scale: "scaleX(0)", duration: 0.2});
                    timeline.to(this.firstCard.children[0], {scale: "scaleX(1)", duration: 0.2});
                    timeline.to(this.firstCard.children[2], {active: true, duration: 0.2});
                    timeline.to(this.firstCard, {canClick: true, duration: 0.1});
                    timeline1.to(this.secondCard.children[1], {scale: "scaleX(0)", duration: 0.2});
                    timeline1.to(this.secondCard.children[0], {scale: "scaleX(1)", duration: 0.2});
                    timeline1.to(this.secondCard.children[2], {active: true, duration: 0.2});
                    timeline1.to(this.secondCard, {canClick: true, duration: 0.1});
                    
                    this.firstCard = null;
                    this.secondCard = null;
                    
                    this.countClick = 0;
                }, 700)
                
                this.score-=100;
                if(this.score <= 0){
                    alert('Thua rồi nha!!!')
                }
            }
        }
    }
}

// let timeline = gsap.timeline();
// timeline.to(cover, {duration: 1, scaleX: 0})
// timeline.to(cover, {duration: 1, scaleX: 1})