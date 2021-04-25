import { Animation } from "../animation/Animations.js";
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
        this.children[2].text = "Score: " + this._score;
    }
    
    get countWin(){
        return this._countWin;
    }

    set countWin(value){
        this._countWin = value;
        
    }

    _initRestartButton(){
        this.btnRestart = new Div("RESTART",{
            color: "#fff",
            background: "#FF9900",
            fontSize: "35px",
            padding: "15px 25px",
            borderRadius: "15px",
            border: "5px solid #fff",
            cursor: "pointer",
            transform: "translate(-50%, -50%)",
        },true);
        this.btnRestart.x = this.width/2;
        this.btnRestart.y = this.height/2;
        this.addChild(this.btnRestart);
        this.btnRestart.on("mousedown", this.onClickRestart.bind(this));
    }

    _initStartButton(){
        this.btnStart = new Div("START",{
            color: "#fff",
            background: "#FF9900",
            fontSize: "35px",
            padding: "15px 25px",
            borderRadius: "15px",
            border: "5px solid #fff",
            cursor: "pointer",
            transform: "translate(-50%, -50%)",
        },true);
        this.btnStart.x = this.width/2;
        this.btnStart.y = this.height/2;
        this.addChild(this.btnStart);

        this.btnStart.on("mousedown", this.onClickStart.bind(this));
    }

    checkTheScore(){
        if(this.countWin === 10 || this.score <=0 ){
            this.arrayCard.forEach (card =>{
                card.canClick = false;
                card.active = false;
            })
            this._initRestartButton();
        }
    }

    onClickStart(evt) {
        this.btnStart.active = false;
        this._initScore();
        this._initCards();
        Animation._initDistributeCard(this.arrayCard);
        this.children[2].text = "Score: " + this._score;
    }
    onClickRestart(evt){
        location.reload();
    }
    
    _initScore() {
        let score = new Label(this._score,{
            color: "#fff",
            fontSize: "30px",
            zIndex: "99",
            top: "10px",
            right: "10px",
        },true);
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

    


    onClickCard(evt) {
        let card = evt.target.node;
        if(this.countClick === 0  && card.canClick === true){
            this.countClick++;
            this.firstCard = card;
            Animation.flip(this.firstCard);
        }else if(this.countClick === 1 && card.canClick === true){
            
            this.countClick++;
            this.secondCard = card;
            Animation.flip(this.secondCard);
            if(this.firstCard.value === this.secondCard.value){
                Animation.resizeAndDelCard(this.firstCard, this.secondCard);
                Animation.changeScore(this, 100);
                this.score +=100;
                this.countWin +=1;
            }else{
                Animation.flipBack(this.firstCard);
                Animation.flipBack(this.secondCard);
                Animation.changeScore(this, -100);
                this.score-=100;
            }
            setTimeout(()=>{
                this.countClick = 0;
                this.firstCard = null;
                this.secondCard = null;
                this.checkTheScore();
            },1000);
        }
    }
}