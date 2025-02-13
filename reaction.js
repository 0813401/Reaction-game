//------BackGround Color Change------//
"use strict";

var changeBG = false; //剛開始的顏色未變
var click = true;
var TimeStart;
var TimeEnd;
var text = document.getElementsByClassName('text');
var container = document.getElementById("container")

function ChangeBackground(){
    document.body.removeEventListener('click',go);
    if (changeBG === false){
        wait.innerText = "快按！時間是不等人的！"
        container.style.backgroundColor = '#FF5151	';
        changeBG = true;
        TimeStart = new Date();
        gameStart();
    }
}

var wait;
function go(){
    if(changeBG === false && click === false){
        alert("太早按了哦！，再試一次看看吧");
        click = true;
        var div = document.createElement('div');
        div.style.textAlign = 'center';
        var button = document.createElement('button');
        button.setAttribute('class','btn');
        button.innerText = '再試一次';
        button.addEventListener("click", function again() {
            window.location.reload();
        });
        container.appendChild(div);
        div.appendChild(button);
        return;
    }
    for(let i = 0; i<text.length; i++)
        text[i].style.display = 'none';
    wait = document.createElement('div');
    wait.setAttribute('class','wait');
    wait.innerText = '等待背景顏色變色...';
    container.appendChild(wait);
    click = false;
    window.setTimeout('ChangeBackground()',(Math.floor(Math.random()*3+3))*1000);
}

function gameStart() {
    document.body.addEventListener('click', function click(){
        TimeEnd = new Date();
        let Time = TimeEnd-TimeStart;
        console.log(Time);
        wait.setAttribute = ('class',"result");
        wait.style.textAlign = 'center';
        wait.style.fontSize = '80px';
        wait.style.fontFamily = 'ch';
        wait.innerText = '你的成績是 ' + Time +' ms.';
        container.appendChild(wait);
        document.body.removeEventListener('click',click);
    });  
}

function start(){
    document.body.addEventListener('click', go);
}

start();