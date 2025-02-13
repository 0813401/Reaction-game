//------ 50 clicker ------//
"use strict";

var mm;
var time;
var begin;
var count = 50;
var SetTime;
var apmrun = 0;
var Check_i;

class Anumber {
    constructor(){
        this.node = document.createElement("div");
        this.node.setAttribute("class","number");
        this.node.style.left = Math.floor(Math.random()*1200)+100 + 'px'; 
        this.node.style.top = Math.floor(Math.random()*400)+100 + 'px';
    }
}

function Check_Time() {
    var conti = new Date();
    SetTime = conti - begin;
    Check_i = document.getElementById("time");
    Check_i.innerText = parseInt(SetTime / 1000) + "." + parseInt((SetTime % 1000)/10);
}

function start(){
    for (let i = 50; i>0 ; i--){
        let n = new Anumber();
        n.node.innerText = i;
        n.node.style.zIndex = i; //num越大,priorty越高！
        n.node.style.display = 'none';
        n.node.addEventListener('click',function disappear(){
            if( count === parseInt(n.node.innerText)/* parseInt() */ ){
                if(count === 50){
                    begin = new Date();
                    mm = window.setInterval("Check_Time()", 10);
                }
                n.node.style.display = 'none';
                count--;
                try{
                    document.getElementsByTagName('div')[2+(50-count)+4].style.display = 'inherit';
                } catch(e) {
                    console.log("still work!");    
                }
                if(count === 0)
                    gameOver();
            }
        });
        container.appendChild(n.node);
    }
    for(let i = 0; i<5 ; i++)
        document.getElementsByTagName('div')[2+i].style.display = 'inherit';
}

function result() {
    var n = document.getElementById("APM");
    n.innerText = "你的APM為"+ apmrun;  
    apmrun++;
    if(apmrun < 150 && apmrun < 50*108/(SetTime/1000)) //0-120
        setTimeout('result()', (4/120)*1000);
    else if (apmrun < 200 && apmrun < 50*108/(SetTime/1000)) //120-170
        setTimeout('result()', (2/50)*1000);
    else if (apmrun < 230 && apmrun < 50*108/(SetTime/1000)) //170-210
        setTimeout('result()', (2/40)*1000);
    else if (apmrun < 230 && apmrun < 50*108/(SetTime/1000)) //210-240
        setTimeout('result()', (2/30)*1000);
    else if (apmrun < 50*108/(SetTime/1000)) //240~
        setTimeout('result()', (4/(280-(50*108/(SetTime/1000))))*1000);     
}

function gameOver(){
    console.log("gameOver");
    clearInterval(mm);
    Check_i.style.visibility = 'hidden'; 
    //APM Text
    var APMnode = document.createElement('div');
    APMnode.setAttribute('class','text');
    APMnode.setAttribute('id','APM');
    APMnode.innerText = "你的APM為"+ 0;
    container.appendChild(APMnode);
    setTimeout('result()', 1);
    CreateBar();
    setTimeout(function(){
        var Timenode = document.createElement('div');
        Timenode.setAttribute('class','text');
        Timenode.innerText = "時間："+ parseInt(SetTime / 1000) + "." + parseInt((SetTime % 1000)/10)+"s";
        container.appendChild(Timenode);
        let bar = document.getElementById('bar'); 
        let bar_inner =document.getElementById('bar_inner');
        bar.style.background = '#1a1a1a';
        bar_inner.style.animationPlayState = 'paused';
        bar_inner.style.width = (50*108/(SetTime/1000)/300)*100+'%';
    },11000);
}

function CreateBar(){
    var style = document.createElement('style');
    style.innerHTML = `@keyframes auto-progress { 
        0% { 
            background-color: #0066CC;
            width: 0%; 
        }
        20%{
            background-color: #00E3E3;
        }
        40%{
            background-color: #02F78E;
        }
        60%{
            background-color: #00A600;
        }
        80%{
            background-color: #FF5809;
        }
        100% {
            background-color: #FF0000; 
            width: `+(50*108/(SetTime/1000)/300)*100+`%; 
        } } `;
    document.getElementsByTagName('head')[0].appendChild(style);

    let bar = document.createElement('div');
    bar.setAttribute('class',"progress-bar stripes animated reverse slower");
    bar.setAttribute('id',"bar");
    let bar_inner = document.createElement('span');
    bar_inner.setAttribute('class',"progress-bar-inner");
    bar_inner.setAttribute('id',"bar_inner");
    container.appendChild(bar);
    bar.appendChild(bar_inner);
}

start();

