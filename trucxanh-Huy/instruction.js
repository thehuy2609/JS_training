var game = document.createElement("div");
document.body.appendChild(game);
game.style.position = "relative";
game.style.display = "table";
game.style.margin = "auto";

var text = document.createElement("div");
text.innerHTML = "score: 10000";
text.style.position = "absolute";
text.style.bottom = "8px";
text.style.left = "10px";
text.style.fontSize = "20px";
text.style.color = "#fff";
text.style.textTransform = "capitalize";
game.appendChild(text);

var time = document.createElement("div");
time.style.position = "absolute";
time.style.bottom = "8px";
time.style.right = "10px";
time.style.fontSize = "40px";
time.style.color = "red";
time.className = "timer";
game.appendChild(time);

var title = document.createElement("div");
title.innerHTML = "GAME LẬT HÌNH";
title.style.position = "absolute";
title.style.top= "10px";
title.style.left = "50%";
title.style.transform = "translate(-50%, 0)";
title.style.fontSize = "25px";
title.style.color = "#fff";
game.appendChild(title);

var wap = document.createElement("div");
wap.innerHTML = "";
wap.style.position = "absolute";
wap.style.top = "50%";
wap.style.left = "50%";
wap.style.width = "600px";
wap.style.height = "384px";
wap.style.transform = "translate(-50%, -50%)";
game.appendChild(wap);

let openCard = 0,indexRandom = -1, firstValue = 0, secondValue = 0;
let arrValue = [];
let firstDiv, secondDiv;
let posL=0, posT= 0, coin= 10000;
let numOpen;
let same = 1;
var bg = createBg("./img/trucxanh_bg.jpg", 0, 0);

let RandomNumber = UniqueRandom();

for (let top = 0; top < 4; top++) {
    
    for (let left = 0; left < 5; left++) {
        
        indexRandom += 1;
        let imgNum = RandomNumber[indexRandom];
        if(imgNum > 10){
            imgNum -= 10;
        }
        createItem(wap ,"./img/trucxanh" + imgNum + ".jpg", posT, posL, 120, 96, "relative", imgNum, indexRandom+1);
        posL+=120;
        if(posL>480){
            posL =0;
        }
    }
    posT+=96;
}


function createBg(src,top,left){
    var image = document.createElement("img");
    image.src = src;
    image.top = top + "px";
    image.left = left + "px";
    game.appendChild(image);
    return image;
}

function createItem(father ,src, top, left, width, height, position, imgNum, indexItem) {
    
    //createDiv
    var div = document.createElement("div");
    div.innerHTML = "";
    div.className = "itemGame";
    div.style.position = "absolute";
    div.style.top = top+ "px";
    div.style.left = left + "px";
    div.style.transition = "0.5s";
    div.style.cursor = "pointer";
    div.setAttribute("value",imgNum);
    div.setAttribute("indexItem",indexItem);
    width && (div.style.width = width + "px");
    height && (div.style.height = height+ "px");
    
    div.addEventListener("click", ()=>{
        if(same === 1){
            if(openCard === 0){
                openCard = 1;
                firstValue = div.getAttribute("value");
                firstDiv=div;
                numOpen = div.getAttribute("indexItem");
                firstDiv.querySelector('.fruit').style.zIndex = 5;
                arrValue.push(firstValue);
                return;
            }else{
                if(numOpen === div.getAttribute("indexItem")){
                    return false;
                    
                }else{
                    openCard = 0;
                    same =0;
                    numOpen = 0;
                    secondValue = div.getAttribute("value");
                    secondDiv = div;
                    secondDiv.querySelector('.fruit').style.zIndex =5;
                    arrValue.push(secondValue);
                    if(firstValue === secondValue){
                        setTimeout(function(){ 
                            firstDiv.style.opacity = 0;
                            secondDiv.style.opacity = 0;
                            firstDiv.style.width = 0;
                            secondDiv.style.width = 0;
                            firstDiv.style.height = 0;
                            secondDiv.style.height = 0;
                            coin+=1000;
                            same=1;
                            text.innerHTML = "score: "+ coin;
                            if(same === 10){
                                alert('Thắng rồi nhen!!');
                            }
                        }, 800);
                    }else{
                        setTimeout(function(){ 
                            firstDiv.querySelector('.fruit').style.zIndex=0;
                            secondDiv.querySelector('.fruit').style.zIndex=0;
                            coin-=500;
                            same=1;
                            text.innerHTML = "score: "+ coin;
                            if(coin<=0){
                                alert("Thua rồi nhen!!");
                                game.style.display = "none";
                            }
                            text.innerHTML = "score: "+ coin;
                        }, 800);
                    }
                }
            }
        }else{
            return false;
        }
        

    })

    father.appendChild(div);

    //createImg
    
    var image = document.createElement("img");
    image.src = src;
    image.className = "fruit";
    position && (image.style.position = position);
    width && (image.style.width = "100%");
    height && (image.style.height = "100%");
    image.style.objectFit = cover;
    image.top = 0;
    image.left = 0;
    image.style.transition = "0.5s";
    image.style.zIndex = 0;
    div.appendChild(image);

    //createNum

    var num = document.createElement("div");
    num.innerHTML = indexItem;
    num.style.position = "absolute";
    num.style.left = "50%";
    num.style.top = "50%";
    num.style.transform = "translate(-50%,-50%)";
    num.style.zIndex = 2;
    num.style.color = "#fff";
    num.style.fontSize = "25px";
    div.appendChild(num);

    //createCover

    var cover = document.createElement("img");
    cover.src = "./img/cover.jpg";
    cover.className = "cover";
    cover.style.position = "absolute";
    cover.style.width = "100%";
    cover.style.height = "100%";
    cover.style.left = 0;
    cover.style.top = 0;
    cover.style.transition = "0.5s";
    cover.style.zIndex = 1;
    div.appendChild(cover);

    return image;
}

function UniqueRandom(){
    myArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
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


function startTimer(duration, display) {
    var timer = duration;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        if(timer >= 0){
            if (--timer < 0) {
                alert('Hết thời gian rồi nhen!!');
                game.style.display = "none";
            }
        }
        
    }, 1000);
}

window.onload = function () {
    var time = 60,
        display = document.querySelector('.timer');
    startTimer(time, display);
};