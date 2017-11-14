(function (window) {
    // Private Variables
    var width = 500;
    var height = 300;
    var pong = {};
    var keypressed = false;
    var ball, p1, p2;
    var score = {
        p1: 0,
        p2: 0
    };
    var gameover = null;

    // State machine
    var states = {
        running: "running",
        reset: "reset",
        gameover: "gameover",
        paused: "paused",
        stopped: "stopped",
    }

    var currentState = states.stopped;

    // Private functions
    function drawBoard() {
        pong.ctx.clearRect(0, 0, width, height);
        pong.ctx.beginPath();
        pong.ctx.setLineDash([5]);
        pong.ctx.moveTo(width / 2, 0);
        pong.ctx.lineTo(width / 2, height);
        pong.ctx.stroke();

        // Draw ball and paddles
        ball.draw();
        p1.draw();
        p2.draw();
    }

    function functionName() {
        
    }

    /**
     * Sceduler (Private)
     * Self calling function that executes a task from the scheduled list of tasks to execute
     */
    function scheduler() {
        // Check state
        switch (currentState) {
            case "running":
                window.requestAnimationFrame(scheduler)
                
                // Move the paddle
                if (p1.keypressed) {
                    p1.move(p1.keypressed.up);
                }
                if (p2.keypressed) {
                    p2.move(p2.keypressed.up);
                }

                // Move the ball
                var crashed = ball.update(p1, p2);
                if (crashed) {
                    currentState = states.gameover
                    score[crashed]++;
                }

                // Draw the Current board state
                drawBoard();
                break;

            case "reset":
                addStartListener();
                publicFunctions.initializeGame(pong.canvas);
                break;

            case "gameover":
                window.requestAnimationFrame(scheduler)
                currentState = states.reset;
                if (gameover) {
                    gameover(score);
                }

            case "stopped":
                break;

            case "paused":
            default:
                break;
        }
    }


    // Public funtions
    var publicFunctions = {
        initializeGame: function (canvas) {
            canvas.width = width;
            canvas.height = height;

            pong.canvas = canvas;
            pong.ctx = canvas.getContext('2d');

            ball = new Ball(pong);
            p1 = new Paddle(pong, true);
            p2 = new Paddle(pong, false);

            document.addEventListener("keydown", function (e) {
                if (e.code == "KeyQ" || e.key == "a") {
                    p1.keypressed = {
                        up: (e.code == "KeyQ") ? true : false,
                        code: e.code
                    }
                }

                if (e.code == "ArrowDown" || e.key == "ArrowUp") {
                    p2.keypressed = {
                        up: (e.code == "ArrowUp") ? true : false,
                        code: e.code
                    }
                }
            })

            document.addEventListener("keyup", function (e) {
                if (p1.keypressed && e.code == p1.keypressed.code) {
                    p1.keypressed = false;
                }

                if (p2.keypressed && e.code == p2.keypressed.code) {
                    p2.keypressed = false;
                }
            })

            drawBoard();
        },

        start: function () {
            currentState = states.running;
            scheduler();
        },

        setGameOver: function (callback) {
            gameover = callback;
        }
    }

    if (window.pong == undefined) {
        loadRequirements(function () {
            window.pong = publicFunctions
        })
    }
})(window)

function loadRequirements(callback) {
    var loaded = 0;
    var urls = ["/pong/ball.js", "/pong/paddle.js"]

    urls.forEach(function (url) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;

        // Fire the loading
        head.appendChild(script);

        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        script.onreadystatechange = testAllLoaded;
        script.onload = testAllLoaded;
    });

    function testAllLoaded() {
        loaded++

        if (loaded == urls.length) {
            console.log("All Loaded");
            callback();
            document.dispatchEvent(new Event("pongReady"));
        }
    }
}