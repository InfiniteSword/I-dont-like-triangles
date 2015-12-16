/**
 * Created by misicdemone on 15/10/23.
 */

var WINDOW_HEIGHT = parseInt(document.documentElement.clientHeight);
var score = 0;
var life = 10;
var interval = 1000;
var score_num = document.querySelector("#score");
var life_num = document.querySelector("#life");
var start_game = document.querySelectorAll(".game-stt");
var game_body = document.querySelector(".game-body");
var fall_interval,t1,t2,t3;
var _random = Math.random;

if(typeof document.CustomEvent === 'function'){
    var cEvent = new document.CustomEvent('intervalChange', {
        bubbles: true,
        cancelable: true
    });
} else if (typeof document.createEvent === 'function') {
    var cEvent = document.createEvent('Event');
    cEvent.initEvent('intervalChange', true, true);
}

if(typeof document.CustomEvent === 'function'){
    var cEvent2 = new document.CustomEvent('gameOver', {
        bubbles: true,
        cancelable: true
    });
} else if (typeof document.createEvent === 'function') {
    var cEvent2 = document.createEvent('HTMLEvents');
    cEvent2.initEvent('gameOver', true, true);
}



function createTriangle(){
    var container = document.querySelector(".graphical-container");
    var triangle = document.createElement("div"),border_color, r, g, b;
    var move_length = _random()*3 + 1;
    triangle.setAttribute("class","game-triangles");
    r = parseInt(_random()*153) + 102;
    g = parseInt(_random()*153) + 102;
    b = parseInt(_random()*153) + 102;
    border_color = "rgba(" + r + "," + g + "," + b + ",.7)";
    triangle.style.top = "-100px";
    triangle.style.left = parseInt(_random()*70) + 10 + "%";
    triangle.style.borderLeft = "57px solid transparent";
    triangle.style.borderRight = "57px solid transparent";
    triangle.style.borderBottom = "108px solid " + border_color;
    triangle.style.transform = "rotate(" + parseInt(_random()*90) + "deg)";
    triangle.addEventListener("click",function(){
        triangle.parentNode.removeChild(triangle);
        score = score + 100;
        score_num.innerHTML = score.toString();
        intervalChangeFn();
    });
    function triangleMove(){
        t1 = setTimeout(function (){
            if(parseInt(triangle.style.top) > WINDOW_HEIGHT){
                triangle.parentNode.removeChild(triangle);
                if (life <= 1){
                    window.dispatchEvent(cEvent2);
                }
                life = life - 1;
                life_num.innerHTML = life.toString();
                return 0;
            }
            triangle.style.top = parseInt(triangle.style.top) + move_length + "px";
            triangleMove();
        }, 10);
    }
    triangleMove();
    container.appendChild(triangle);
}

function createSquare(){
    var container = document.querySelector(".graphical-container");
    var square = document.createElement("div"),bg_color, r, g, b;
    var move_length = _random() * 2 + 1;
    square.setAttribute("class","game-squares");
    r = parseInt(_random()*153) + 102;
    g = parseInt(_random()*153) + 102;
    b = parseInt(_random()*153) + 102;
    bg_color = "rgba(" + r + "," + g + "," + b + ",.7)";
    square.style.top = "-100px";
    square.style.left = parseInt(_random()*70) + 10 + "%";
    square.style.background = bg_color;
    square.style.transform = "rotate(" + parseInt(_random()*90) + "deg)";
    square.addEventListener("click",function(){
        square.parentNode.removeChild(square);
        score = score - 50;
        score_num.innerHTML = score.toString();
        intervalChangeFn();
    });
    function squareMove(){
        t2 = setTimeout(function (){
            if(parseInt(square.style.top) > WINDOW_HEIGHT){
                square.parentNode.removeChild(square);
                return 0;
            }
            square.style.top = parseInt(square.style.top) + move_length + "px";
            squareMove();
        }, 10);
    }
    squareMove();
    container.appendChild(square);
}

function createStar(){
    var container = document.querySelector(".graphical-container");
    var star = document.createElement("div");
    var move_length = _random() * 4 + 1;
    star.setAttribute("class","game-stars");
    star.style.top = "-100px";
    star.style.left = parseInt(_random()*70) + 10 + "%";
    star.style.transform = "rotate(" + parseInt(_random()*90) + "deg)";
    star.addEventListener("click",function(){
        star.parentNode.removeChild(star);
        if (life <= 1){
            window.dispatchEvent(cEvent2);
        }
        addClass(game_body,'shake-hard');
        setTimeout(function(){
            removeClass(game_body,'shake-hard');
        }, 1000);
        life = life - 1;
        score = score - 500;
        life_num.innerHTML = life.toString();
    });
    function starMove(){
        t3 = setTimeout(function (){
            if(parseInt(star.style.top) > WINDOW_HEIGHT){
                star.parentNode.removeChild(star);
                score = score + 500;
                score_num.innerHTML = score.toString();
                intervalChangeFn();
                return 0;
            }
            star.style.top = parseInt(star.style.top) + move_length + "px";
            starMove();
        }, 10);
    }
    starMove();
    container.appendChild(star);
}



function intervalChangeFn(){
    if (score >= 500 && score < 1500 && interval!=900){
        interval = 900;
        window.dispatchEvent(cEvent);
    }
    else if (score >= 1500 && score < 2500 && interval!=800){
        interval = 800;
        window.dispatchEvent(cEvent);
    }
    else if (score >= 2500 && score < 4000 && interval!=600){
        interval = 600;
        window.dispatchEvent(cEvent);
    }
    else if (score >= 4000 && score < 6000 && interval!=500){
        interval = 500;
        window.dispatchEvent(cEvent);
    }
    else if (score >= 6000 && score < 8000 && interval!=400){
        interval = 400;
        window.dispatchEvent(cEvent);
    }
    else if (score >= 8000 && interval!=300){
        interval = 300;
        window.dispatchEvent(cEvent);
    }
}

window.addEventListener('intervalChange', function(){
    clearTimeout(fall_interval);
    graphRandom();
    creater();
}, false);

function creater(){
    fall_interval = setTimeout(function(){
        graphRandom();
        creater();
    },interval);
}

function graphRandom(){
    var randomNum = parseInt(_random()*20);
    if(randomNum > 8) {
        createSquare();
    } else if(randomNum > 1 && randomNum <= 8){
        createTriangle();
    } else if(randomNum == 1){
        console.log("star");
        createStar();
    }
}

for(var i = 0; i < start_game.length; i++){
    (function(i){
        start_game[i].addEventListener("click",creater);
    })(i);
}


window.addEventListener("gameOver",function(){
    clearTimeout(fall_interval);
    clearTimeout(t1);
    clearTimeout(t2);
    clearTimeout(t3);
    var game_over = document.querySelector(".game-over"),
        game_body = document.querySelector(".game-body"),
        over_score = document.querySelector("#over-score"),
        over_words = document.querySelector("#over-words");
    game_over.style.display = "block";
    setTimeout(function(){
        game_over.style.marginLeft = "0";
    },1);
    game_body.style.marginLeft = "-100%";
    over_score.innerHTML = score.toString();
    if(score < 0){
        over_words.innerHTML = "姐姐你一定是故意的！！【生气】";
    } else if (score < 4500 && score >= 0){
        over_words.innerHTML = "姐姐你是不是故意的？【不开心】";
    } else if (score < 13000 && score >= 4500){
        over_words.innerHTML = "还好吧~谢谢。【面无表情】";
    } else if (score < 20000 && score >= 13000){
        over_words.innerHTML = "谢谢姐姐！(⌒▽⌒)";
    } else if (score >= 20000){
        over_words.innerHTML = "姐姐辛苦啦！谢谢！(≧∇≦)【扑】";
    }
    setTimeout(function(){
        game_body.style.display = "none";
    }, 1000);
});


function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(obj, cls) {
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;
}

function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}




