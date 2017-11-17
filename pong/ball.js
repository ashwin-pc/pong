function Ball(params) {
    var b = this;
    var size = 10;
    var sb2 = size / 2;
    var color = 'rgb(200, 0, 0)';
    var ctx = params.ctx;
    var canvas = params.canvas;
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    var v = 5;
    var deg = 0 * (Math.PI / 180);
    var bounce = 0;
    var MAXDEG = 75 * (Math.PI / 180); // To convert degrees to radians
    var winner = null;

    // Control ball speed
    function ballSpeed() {
        bounce++;

        if (bounce > 3) {
            v++;
            bounce = 0;
        }
    }

    // Draw the current ball state
    this.draw = function () {
        ctx.fillStyle = color;
        ctx.fillRect(x - sb2, y - sb2, size, size);
    }

    // Update the velocity, angle, position of the ball
    this.update = function (p1, p2) {
        // Check collision with paddles
        var p1Bounds = p1.getBounds();
        var p2Bounds = p2.getBounds();

        // Ckeck to allow ball to go to end once game is over
        if (winner) {
            if (x > canvas.width || x < 0) {
                return winner;
            };
        } else {

            // Check which side of the board the ball is
            if (x > canvas.width / 2) {
                // Check if the ball is within the paddle area (x-axis)
                if (x + sb2 >= p2Bounds.sleft) {
                    // Check if the ball is in the paddle surface region (y-axis)
                    if (!(y + sb2 < p2Bounds.top || y - sb2 > p2Bounds.bottom)) {
                        rely = y - p2Bounds.y;
                        nory = 2 * rely / p2Bounds.l
                        deg = -(nory * MAXDEG);
                        v = - v;
                        ballSpeed()
                    } else {
                        winner = "p1"
                    }
                }
            } else {
                // Check if the ball is within the paddle area (x-axis)
                if (x - sb2 <= p1Bounds.sright ) {
                    // Check if the ball is in the paddle surface region (y-axis)
                    if (!(y + sb2 < p1Bounds.top || y - sb2 > p1Bounds.bottom)) {
                        rely = y - p1Bounds.y;
                        nory = 2 * rely / p1Bounds.l
                        deg = (nory * MAXDEG);
                        v = - v;
                        ballSpeed()
                    } else {
                        winner = "p2"
                    }
                }
            }
            // Check if the ball is within the game area (y-axis)
            if (y - sb2 < 0 || y + sb2 > canvas.height) {
                deg = -deg;
                y = (y - sb2 < 0) ? sb2 : canvas.height - sb2;
            }
        }

        var dx = Math.ceil(v * Math.cos(deg));
        var dy = Math.ceil(v * Math.sin(deg));

        x += dx;
        y += dy;

        return null;
    }

}