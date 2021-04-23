import { Node } from "../lib/Node.js";
import { Sprite } from "../lib/Sprite.js";
import { Label } from "../lib/Label.js";
import { Div } from "../lib/Div.js";
import { Card } from "../modules/Card.js";
export class Game extends Node {

    init() {
        this.countClick = 0;
        this.firstCard = null;
        this.secondCard = null;
        this.arrayCard =[];
        this._score = 1000;
        this._countWin = 0;
        this.btnStart = null;
        this._initSize();
        this._initBackground();
        this._initStartButton();
        
    }
    
    get score(){
        return this._score;
    }

    set score(value){
        this._score = value;
        this.children[2].text = this._score;
    }
    
    get countWin(){
        return this._countWin;
    }

    set countWin(value){
        this._countWin = value;
        
    }

    _initStartButton(){
        this.btnStart = new Div("START",{
            color: "#fff",
            background: "#FF9900",
            fontSize: "35px",
            padding: "15px 25px",
            borderRadius: "15px",
            border: "5px solid #fff",
        },true,true);
        this.addChild(this.btnStart);

        this.btnStart.on("mousedown", this.onClickStart.bind(this));
    }

    checkTheScore(){
        if(this.countWin === 10){
            alert('Thắng rồi nha!!!');
            
        }
        if(this.score <= 0){
            alert('Thua rồi nha!!!');
            let timeline = gsap.timeline();
            this.arrayCard.forEach(card =>{
                timeline.to(card, {active: false, duration: 0.01});
            });
        }
        
    }

    onClickStart(evt) {
        this.btnStart.active = false;
        this._initScore();
        this._initCards();
        this._initDistributeCard();
        this.children[2].text = this._score;
    }
    
    _initScore() {
        let score = new Label(this._score,{
            color: "#fff",
            fontSize: "35px",
            zIndex: "99",
            top: "10px",
            right: "10px",
        },true,false);
        this.addChild(score);
    }

    _initSize(){
        this.width = 800;
        this.height = 480;
    }

    _initBackground(){
        let bg = new Sprite("./img/trucxanh_bg.jpg",true);
        this.addChild(bg);
    }

    _initShuffleArray(){
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
        let result = myArray.slice(0,20);
        return result;
    }

    _initCards(){
        let col = 5, row = 4;
        let index = 0;
        let zIndex = 50;
        
        let RandomNumber = this._initShuffleArray();

        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                index+=1;
                zIndex-=1;
                let valueCard = RandomNumber[index-1];
                if(valueCard > 10){
                    valueCard -= 10;
                }
                
                let card = new Card(index, valueCard, 0, 0, zIndex, false);
                
                card.x = this.width/2 - card.width/2;
                card.y = this.height/2 - card.height/2;
                
                this.addChild(card);
                this.arrayCard.push(card);
                card.on("mousedown", this.onClickCard.bind(this));
                
            }
        }
    }

    _initDistributeCard(){
        let positionX = 100, positionY = 48;
        let timeline = gsap.timeline();
        this.arrayCard.forEach(card =>{
            timeline.to(card, {ease: "back.out(3)", x: positionX, y: positionY, duration: 0.3});
            positionX += card.width;
            if(positionX >= (card.width*5 + 100)){
                positionX = 100;
                positionY += card.height;
            }
        })
        
        this.arrayCard.forEach(card =>{
            timeline.to(card, {canClick: true, duration: 0.01});
        });
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
                    this.score +=100;
                    this.countWin +=1;
                    this.checkTheScore();
                }, 500)
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
                    this.score-=100;
                    this.checkTheScore();
                }, 1000)
            }
        }
    }
}