var canvas = document.querySelector("canvas");
var width = (canvas.width = window.innerWidth);
var height = (canvas.height = window.innerHeight);

var ctx = canvas.getContext("2d");
var balls = [];

// ctx.fillStyle = "rgb(0,0,0)";
// ctx.fillRect(0, 0, width, height);

var random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/*Some parameters that define the properties each ball 
    x and y coordinates — the horizontal and vertical coordinates where the ball will start on the screen. 
      This can range between 0 (top left hand corner) to the width and height of the browser viewport (bottom right hand corner).
    horizontal and vertical velocity (velX and velY) — each ball is given a horizontal and vertical velocity; 
      in real terms these values will be regularly added to the x/y coordinate values when we start to animate the balls, 
      to move them by this much on each frame.
    color — each ball gets a color.
    size — each ball gets a size — this will be its radius, in pixels.
 */
function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}
/*
    First, we use beginPath() to state that we want to draw a shape on the paper.
    Next, we use fillStyle to define what color we want the shape to be — we set it to our ball's color property.
    Next, we use the arc() method to trace an arc shape on the paper. Its parameters are:
        The x and y position of the arc's center — we are specifying our ball's x and y properties.
        The radius of our arc — we are specifying our ball's size property.
        The last two parameters specify the start and end number of degrees round the circle that the arc is drawn between. 
          Here we specify 0 degrees, and 2 * PI, which is the equivalent of 360 degrees in radians (annoyingly, you have to specify this in radians). 
          That gives us a complete circle. If you had specified only 1 * PI, you'd get a semi-circle (180 degrees).
    Last of all, we use the fill() method, which basically states "finish drawing the path we started with beginPath(), 
      and fill the area it takes up with the color we specified earlier in fillStyle."
*/
Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};
//test
// var testBall = new Ball(50, 100, 4, 4, "blue", 10);
/*
  The first four parts of the function check whether the ball has reached the edge of the canvas.
      If it has, we reverse the polarity of the relevant velocity to make the ball travel in the opposite direction.
  In each case, we are including the size of the ball in the calculation because the x/y coordinates are in the center of the ball, 
      but we want the edge of the ball to bounce off the perimeter — we don't want the ball to go halfway off the screen before it starts to bounce back.

  */
Ball.prototype.update = function() {
  if (this.x + this.size >= width) {
    this.velX = -this.velX;
  }
  if (this.x - this.size <= 0) {
    this.velX = -this.velX;
  }
  if (this.y + this.size >= height) {
    this.velY = -this.velY;
  }
  if (this.y - this.size <= 0) {
    this.velY = -this.velY;
  }
  this.x += this.velX;
  this.y += this.velY;
};
//Now for a bit of fun, let's add some collision detection to our program, so our balls will know when they have hit another ball.
Ball.prototype.collisionDetect = function() {
  for (let i = 0; i < balls.length; i++) {
    if (!(this === balls[i])) {
      var dx = this.x - balls[i].x;
      var dy = this.y - balls[i].y;
      var distance = Math.sqrt(dx * dx + dy * dy);
    }
    if (distance < this.size + balls[i].size) {
      balls[i].color = this.color =
        "rgb(" +
        random(0, 255) +
        "," +
        random(0, 255) +
        "," +
        random(0, 255) +
        ")";
    }
  }
};
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);
  while (balls.length < 100) {
    var size = random(10, 20);
    var ball = new Ball(
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, -7),
      random(-7, -7),
      "rgb(" +
        random(0, 255) +
        "," +
        random(0, 255) +
        "," +
        random(0, 255) +
        ")",
      size
    );
    balls.push(ball);
  }
  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }
  requestAnimationFrame(loop);
}
loop();
