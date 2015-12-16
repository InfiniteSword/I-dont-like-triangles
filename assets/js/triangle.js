(function gameStart(){
    var btn_start = document.querySelectorAll(".game-stt"),
        game_start = document.querySelector(".game-start"),
        game_body = document.querySelector(".game-body"),
        game_intr = document.querySelector(".game-intr"),
        introduce = document.querySelector(".introduce"),
        intr_back = document.querySelector(".intr-back");
    for(var i = 0; i < btn_start.length; i++){
        (function(i){
            btn_start[i].addEventListener("click", function(){
                game_body.style.display = "block";
                game_start.style.marginLeft = "-100%";
                setTimeout(function(){
                    game_body.style.marginLeft = "0";
                },1);
                setTimeout(function(){
                    game_start.style.display = "none";
                }, 1000);
            });
        })(i);
    }
    intr_back.addEventListener("click",function(){
        introduce.style.width = "0";
        introduce.style.height = "0";
    });
    game_intr.addEventListener("click", function(){
        introduce.style.width = "100%";
        introduce.style.height = "100vh";
    });
})();





