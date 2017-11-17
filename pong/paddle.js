function Paddle(pong, player) {
    var p = this;
    var length = 80;
    var width = 10;
    var lb2 =  length/2;
    var wb2 = width/2;
    var dy = 5;
    var color = "rgb(0,0,0)";
    
    var x = (player) ? 15 : pong.canvas.width - 15;
    var y = pong.canvas.height/2;
    p.ctx = pong.ctx;
    p.canvas = pong.canvas;
    p.keypressed = false;

    p.draw = function () {
        p.ctx.fillStyle = color;
        p.ctx.fillRect(x - wb2, y - lb2, width, length);
    }

    p.move = function (up) {
        y = (up) ? y - dy : y + dy;
        y = (y - lb2 < 0) ? lb2 : y;
        y = (y + lb2 > p.canvas.height) ? p.canvas.height - lb2 : y;
    }

    p.getBounds = function () {
        return {
            x: x,
            y: y,
            w: width,
            l: length,
            sleft: x - wb2,
            sright: x + wb2,
            top: y - lb2,
            bottom: y + lb2
        }
    }
}