import { Animation } from "../animation/Animations.js";
import { Node } from "../lib/Node.js";
import { Sprite } from "../lib/Sprite.js";
import { Label } from "../lib/Label.js";
import { Div } from "../lib/Div.js";
import { Audio } from "../lib/Audio.js";
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
        this.btnMute = null;
        this.themeSong = null;
        this.cardFlipSound = null;
        this.cardCorrect = null;
        this.cardIncorrect = null;
        this.mute = true;
        this._initSize();
        this._initBackground();
        this._initStartButton();
        this._initThemeSong();
        this._initMuteIcon();
        
    }
    
    get score(){
        return this._score;
    }

    set score(value){
        this._score = value;
        this.children[4].text = "Score: " + this._score;
    }
    
    get countWin(){
        return this._countWin;
    }

    set countWin(value){
        this._countWin = value;
    }

    _initThemeSong(){
        this.themeSong = new Audio("../audio/theme.mp3",true,true);
        this.addChild(this.themeSong);
    }
    
    _initCardFlipSound(){
        this.cardFlipSound = new Audio("../audio/cardFlip.mp3",false,false);
        this.cardFlipSound.elm.play();
    }
    
    _initCorrectCard(){
        this.cardFlipSound = new Audio("../audio/correct.mp3",false,false);
        this.cardFlipSound.elm.play();
    }
    
    _initIncorrectCard(){
        this.cardFlipSound = new Audio("../audio/incorrect.mp3",false,false);
        this.cardFlipSound.elm.play();
    }

    _initMuteIcon(){
        this.btnMute = new Sprite("./img/mute.png","none",20);
        this.btnMute.elm.style.width = "30px";
        this.btnMute.elm.style.height = "30px";
        this.btnMute.elm.style.left = "10px";
        this.btnMute.elm.style.top = "10px";
        this.addChild(this.btnMute);
        this.btnMute.on("mousedown", this.onClickMute.bind(this));
    }
    
    onClickMute(evt){
        if(this.mute === false){
            this.themeSong.muted = true;
            this.mute = true;
            this.btnMute.path = "./img/mute.png";
        }else{
            this.themeSong.muted = false;
            this.themeSong.elm.play();
            this.mute = false;
            this.btnMute.path = "./img/volume.png";
        }
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

            let notiEndGame = new Label("Trò chơi kết thúc!!!",{
                color: "#fff",
                fontSize: "35px",
                zIndex: "99",
                left: "50%",
                top: "100px",
                transform: "translate(-50%,0)",
            },true);
            this.addChild(notiEndGame);
        }
    }

    onClickStart(evt) {
        this.btnStart.active = false;
        this._initScore();
        this._initCards();
        Animation._initDistributeCard(this.arrayCard);
        this.children[4].text = "Score: " + this._score;
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
        if(this.countClick === 0 && card.canClick === true){
            this.countClick++;
            this.firstCard = card;
            Animation.flip(this.firstCard);
            this._initCardFlipSound();
        }else if(this.countClick === 1 && card.canClick === true){
            let tl = gsap.timeline();
            this.countClick++;
            this.secondCard = card;
            this._initCardFlipSound();
            Animation.flip(this.secondCard);
            if(this.firstCard.value === this.secondCard.value){
                Animation.resizeAndDelCard(this.firstCard, this.secondCard);
                tl.to(this,{duration: 0.7,onComplete:()=>{
                    Animation.changeScore(this, 100);
                    this._initCorrectCard();
                }})
                this.countWin +=1;
            }else{
                Animation.flipBack(this.firstCard);
                Animation.flipBack(this.secondCard);
                tl.to(this,{duration: 0.7,onComplete:()=>{
                    Animation.changeScore(this, -100);
                    this._initIncorrectCard();
                }})
            }
            setTimeout(()=>{
                this.countClick = 0;
                this.firstCard = null;
                this.secondCard = null;
                this.checkTheScore();
            },1500);
        }
    }
}