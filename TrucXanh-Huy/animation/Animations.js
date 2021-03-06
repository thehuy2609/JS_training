export class Animation {
    static flip(card) {
        
        let timeline = gsap.timeline();
        card.canClick = false;
        timeline.to(card.children[0], {scale: "scaleX(0)", duration: 0.2});
        timeline.to(card.children[1], {scale: "scaleX(1)", duration: 0.2});
        card.children[2].active = false;   
    }

    static flipBack(card) {
        setTimeout(()=>{
            let timeline = gsap.timeline();
            timeline.to(card.children[1], {delay: 0.2, scale: "scaleX(0)", duration: 0.2});
            timeline.to(card.children[0], {delay: 0.2, scale: "scaleX(1)", duration: 0.2});
            timeline.to(card.children[2], {active: true, duration: 0.2});
            timeline.to(card, {canClick: true, duration: 0.1});  
        }, 700)
    }

    static resizeAndDelCard(firstCard, secondCard) {
        firstCard.zIndex = 99999;
        secondCard.zIndex = 99999;
        setTimeout(()=>{
            let timeline1 = gsap.timeline();
            let timeline2 = gsap.timeline();
            timeline1.to(firstCard.children[1], {scale: "scale(1.5)", duration: 0.4});
            timeline2.to(secondCard.children[1], {scale: "scale(1.5)", duration: 0.4});
            timeline1.to(firstCard, {delay: 0.5, active: false, duration: 0.3});
            timeline2.to(secondCard, {delay: 0.5, active: false, duration: 0.3});
        }, 400)
    }

    static changeScore(game, changeScore) {
        let scoreEachTime = changeScore / 10;
        var timeLine = gsap.timeline({ duration: 0.03, repeat: 9 });
        timeLine.to(game.score, { duration: 0.03, onStart: () => {
                game.score += scoreEachTime;
            }
        });
    }

    static _initDistributeCard(arrayCard){

        let positionX = 100, positionY = 48;
        let timeline = gsap.timeline();
        
        arrayCard.forEach (card =>{
            timeline.to(card.elm.style, {opacity: 0, duration: 0.25});
        })
        arrayCard.forEach (card =>{
            timeline.to(card.elm.style, {opacity: 1, duration: 0.01});
        })
        arrayCard.forEach(card =>{
            timeline.to(card, {ease: "back.out(3)", x: positionX, y: positionY, duration: 0.3});
            positionX += card.width;
            if(positionX >= (card.width*5 + 100)){
                positionX = 100;
                positionY += card.height;
            }
        })
        arrayCard.forEach(card =>{
            timeline.to(card, {canClick: true, duration: 0.01});
        });
    }

}