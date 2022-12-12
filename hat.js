// Set up the canvas element and get its context
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Set up the initial position, velocity, and size of the balls
var balls = [];
var ballCount = 0;
var ballSize = 20;
var minVelocity = 1;
var maxVelocity = 10;

// Set up the initial position and dimensions of the canvas
var canvasX = 0;
var canvasY = 0;
var canvasWidth = 500;
var canvasHeight = 500;

// Set up the function to be called on each frame of the animation
function drawFrame() {
	// Clear the canvas
	ctx.clearRect(canvasX, canvasY, canvasWidth, canvasHeight);

	// Generate a random number of balls if none exist yet
	if (ballCount === 0) {
		ballCount = prompt('Enter the number of balls to generate:');
		for (var i = 0; i < ballCount; i++) {
			balls.push({
				x: Math.random() * canvasWidth,
				y: Math.random() * canvasHeight,
				vx: Math.random() * (maxVelocity - minVelocity) + minVelocity,
				vy: Math.random() * (maxVelocity - minVelocity) + minVelocity,
				color: '#' + Math.floor(Math.random() * 16777215).toString(16),
			});
		}
	}

	// Move the balls
	for (var i = 0; i < ballCount; i++) {
		var ball = balls[i];
		ball.x += ball.vx;
		ball.y += ball.vy;

		// Check if the ball has hit a wall and reverse its direction if necessary
		if (ball.x + ballSize > canvasWidth || ball.x < 0) {
			ball.vx *= -1;
		}
		if (ball.y + ballSize > canvasHeight || ball.y < 0) {
			ball.vy *= -1;
		}

		// Draw the ball
		ctx.beginPath();
		ctx.arc(ball.x, ball.y, ballSize, 0, 2 * Math.PI);
		ctx.fillStyle = ball.color;
		ctx.fill();

		// Check if the ball is close to any other balls and draw a line between them if necessary
		for (var j = i + 1; j < ballCount; j++) {
			var otherBall = balls[j];
			var dx = ball.x - otherBall.x;
			var dy = ball.y - otherBall.y;
			var distance = Math.sqrt(dx * dx + dy * dy);
			if (distance < 100) {
				ctx.beginPath();
				ctx.strokeStyle = '#333';
				ctx.lineWidth = 5;
				ctx.moveTo(ball.x, ball.y);
				ctx.lineTo(otherBall.x, otherBall.y);
				ctx.stroke();
			}
		}
	}

	// Call the drawFrame function again in 1/60 seconds
	requestAnimationFrame(drawFrame);
}

// Call the drawFrame function for the first time
drawFrame();
