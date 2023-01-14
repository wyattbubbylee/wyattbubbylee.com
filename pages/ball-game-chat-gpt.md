---
date: 2023-01-14 18:44:22
title: A javascript ball bouncing game built in chatgpt
published: True
tags:
  - chatgpt

---
<style>
    /* styles for the ball */
    #ball {
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 25px;
        background-color: red;
    }
</style>
<div id="ball"></div>
<script>
    // get the ball element
    var ball = document.getElementById("ball");
    // set initial position and speed
    var x = 0;
    var y = 0;
    var xSpeed = 5;
    var ySpeed = 5;
    
    // move the ball every 10 milliseconds
    setInterval(moveBall, 10);

    document.addEventListener("keydown", function(event) {
        if (event.code === "KeyQ") {
            ySpeed = -ySpeed;
        }
    });
    
    function moveBall() {
        // update position
        x += xSpeed;
        y += ySpeed;
        // check for collisions with the edges of the screen
        if (x + 50 > window.innerWidth || x < 0) {
            xSpeed = -xSpeed;
        }
        if (y + 50 > window.innerHeight || y < 0) {
            ySpeed = -ySpeed;
        }
        // update the ball's position on the screen
        ball.style.left = x + "px";
        ball.style.top = y + "px";
    }
</script>

I made this game with chat gpt. press q to interact with the ball.