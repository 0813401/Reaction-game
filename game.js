//LOL//
"use strict";
document.oncontextmenu = new Function("return false");

var x = document.getElementById('Timer');
var GameStart = setInterval(start, 10);
var container = document.getElementById('container');
var score = document.getElementById('score');
let plane = document.getElementById('plane');
var p1 = document.getElementById("progress1");
var p2 = document.getElementById("progress2");
var p3 = document.getElementById("progress3");
var p4 = document.getElementById("progress4");
var rockIsExist = false;
var tick = 0;

class Anumber {
    constructor(){
        this.node = document.createElement("div");
        this.node.setAttribute("class","monster");
        this.node.style.left = Math.floor(Math.random()*600)+400 + 'px'; 
        this.node.style.top = Math.floor(Math.random()*500)+100 + 'px';
        this.node.style.width = '70px';
        this.node.style.height = '70px'; 
        container.appendChild(this.node);
        this.node.addEventListener('mousedown',function click() {
            score.innerText = "Score:" + (parseInt(score.innerText.substring(6,score.innerText.length))+100); //substring(start,end(exclude));
            container.removeChild(this);
        });
    }
}

function start() {
    x.innerText = (parseFloat(x.innerText)-0.01).toFixed(2);
    if( parseFloat(x.innerText) <= 0 ){
        clearInterval(GameStart);
        clearInterval(LevelUpInterval);
        var s = document.createElement("div");
        s.setAttribute("class","table");
        document.body.removeChild(container);
        s.innerText = score.innerText;
        s.style.fontSize = '100px';
        s.style.textAlign = 'center';
        document.body.appendChild(s);
    }
}
var m1 = 0, m2 = 0, rock = 0;
var LevelUpInterval = setInterval(LevelUp,50);
function LevelUp(){
    //monster appear
    var monsters = document.getElementsByClassName("monster");
    for(let i = 0; i<monsters.length; i++){
        let width = monsters[i].offsetHeight; //直接拿 不會有px
        if(width <= 100){
            monsters[i].style.width = (width + 1.5)+'px';
            monsters[i].style.height = (width + 1.5)+'px';
        } 
        else{
            container.removeChild(monsters[i]);   
        } 
    }

    //create monster
    m1+=50, m2+=50;
    if(m1 > 900){
        new Anumber();
        m1 = 0;
    }
    if(m2 >3000){
        new Anumber();
        m2 = 0;
    }

    //create rock
    rock += 0.05;
    if(rock >= 2 && rockIsExist === false){
        let Rock = document.createElement("div");
        Rock.setAttribute("class","rock");
        Rock.setAttribute("id","rock");
        let rand = Math.random();
        if (rand>0.5){
            Rock.style.left = 1380+'px';
            Rock.style.top = 400+'px';    
        }
        else{
            Rock.style.left = 1520+'px';
            Rock.style.top = 400+'px';        
        }
        container.appendChild(Rock);
        rockIsExist = true;
        setTimeout(() => {
            container.removeChild(Rock);
            rockIsExist = false;
            rock = 0;    
        }, 3000);
    }

    if(rockIsExist){
        let Rock = document.getElementById('rock');
        if(Rock.style.left === plane.style.left)
            score.innerText = "Score:" + (parseInt(score.innerText.substring(6,score.innerText.length))-5);     
    }
    //tick calculator
    tick += 0.05;
    // console.log(tick);
}

var boo1 = true, boo2 = true, boo3 = true, boo4 = true;
window.addEventListener("keypress",reset);
function reset(e){
    e = e || window.event;
    switch(e.code){
        case "KeyQ":
            if(tick % 9 >= 7 && boo1){
                score.innerText = "Score:" + (parseInt(score.innerText.substring(6,score.innerText.length))+900);
                boo1 = false;
                setTimeout(function (){
                    boo1 = true;
                },2000);
            }
            break;
        case "KeyW":
            if(tick % 6 >= 4 && boo2){
                score.innerText = "Score:" + (parseInt(score.innerText.substring(6,score.innerText.length))+600);
                boo2 = false;
                setTimeout(function (){
                    boo2 = true;
                },2000);
            }
            break;
        case "KeyE":
            if(tick % 4 >= 2 && boo3){
                score.innerText = "Score:" + (parseInt(score.innerText.substring(6,score.innerText.length))+400);
                boo3 = false;
                setTimeout(function (){
                    boo3 = true;
                },2000);
            } 
            break;
        case "KeyR":
            if(tick % 19 >= 17 & boo4){
                score.innerText = "Score:" + (parseInt(score.innerText.substring(6,score.innerText.length))+1900);
                boo4 = false;
                setTimeout(function (){
                    boo4 = true;
                },2000);
            }
            break;
        case "KeyD":
            plane.style.left = 1380 + 'px';
            break;
        case "KeyF":
            plane.style.left = 1520 + 'px';
            break;
    }
}   

var a = new Anumber();
var b = new Anumber();
container.appendChild(a.node);
container.appendChild(b.node);
