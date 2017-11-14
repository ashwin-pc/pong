var canvas = document.getElementById("pongContainer");

document.addEventListener("pongReady", function () {
    pong.initializeGame(canvas);

    pong.setGameOver(function (scores) {
        document.getElementById("p1-score").innerText = scores.p1
        document.getElementById("p2-score").innerText = scores.p2
    })

    addStartListener();
})

function addStartListener() {
    document.addEventListener("keydown", function startKeystroke(e) {
        var keyPressed = ["KeyQ", "a", "Space", "ArrowDown", "ArrowUp"].filter(function (key) {
            return key == e.code
        }).length;

        if (keyPressed) {
            pong.start();
            document.removeEventListener("keydown", startKeystroke);
        }
    })
}

