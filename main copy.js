const canvas = document.getElementById('ballPit');
const ctx = canvas.getContext('2d');

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

function random(min, max) {
	const num = Math.floor(Math.random() * (max - min + 1)) + min;
	return num;
}

function randomRGB() {
	return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

const minSize = document.getElementById('minSize');
const maxSize = document.getElementById('maxSize');
const minSpeed = document.getElementById('minSpeed');
const maxSpeed = document.getElementById('maxSpeed');
const ammount = document.getElementById('ammount');

const menu = document.getElementById('menu');
const hideButton = document.getElementById('hideMenu');

const minSi = document.getElementById('minSi');
const maxSi = document.getElementById('maxSi');
const minS = document.getElementById('minS');
const maxS = document.getElementById('maxS');
const a = document.getElementById('a');

hideButton.addEventListener('click', () => {
	menu.classList.toggle('hide');
});

minSize.addEventListener('input', () => {
	minSi.innerHTML = minSize.value;
});

maxSize.addEventListener('input', () => {
	maxSi.innerHTML = maxSize.value;
});

minSpeed.addEventListener('input', () => {
	minS.innerHTML = minSpeed.value;
});

maxSpeed.addEventListener('input', () => {
	maxS.innerHTML = maxSpeed.value;
});

ammount.addEventListener('input', () => {
	a.innerHTML = ammount.value;
});

function Ball(x, y, vx, vy, radius, color) {
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.radius = radius;
	this.color = color;
}

Ball.prototype.draw = function () {
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fillStyle = this.color;
	ctx.fill();
};

Ball.prototype.update = function () {
	if (this.x + this.radius >= canvas.width) {
		this.vx = -this.vx;
	}

	if (this.x - this.radius <= 0) {
		this.vx = -this.vx;
	}

	if (this.y + this.radius >= canvas.height) {
		this.vy = -this.vy;
	}

	if (this.y - this.radius <= 0) {
		this.vy = -this.vy;
	}

	this.x += this.vx;
	this.y += this.vy;
};

function createBalls(num, maxSize, minSize, maxSpeed, minSpeed) {
	for (var i = 0; i < num; i++) {
		var radius = Math.random() * 25 + 5;
		// var radius = Math.random() * (maxSize - minSize) + minSize;
		var x = Math.random() * (canvas.width - radius * 2) + radius;
		var y = Math.random() * (canvas.height - radius * 2) + radius;
		var vx = Math.random() * 6 - 3;
		var vy = Math.random() * 6 - 3;
		// var vx = Math.random() * (maxSpeed - minSpeed) + minSpeed;
		// var vy = Math.random() * (maxSpeed - minSpeed) + minSpeed;
		var color = randomRGB();
		balls.push(new Ball(x, y, vx, vy, radius, color));
	}
}

function drawBalls() {
	for (var i = 0; i < balls.length; i++) {
		balls[i].draw();
	}
}

function updateBalls() {
	for (var i = 0; i < balls.length; i++) {
		balls[i].update();
	}
}

function drawLines() {
	for (var i = 0; i < balls.length; i++) {
		for (var j = i + 1; j < balls.length; j++) {
			var dx = balls[j].x - balls[i].x;
			var dy = balls[j].y - balls[i].y;
			var dist = Math.sqrt(dx * dx + dy * dy);
			if (dist < balls[i].radius + balls[j].radius) {
				ctx.beginPath();
				ctx.moveTo(balls[i].x, balls[i].y);
				ctx.lineTo(balls[j].x, balls[j].y);
				ctx.strokeStyle = 'white';
				ctx.lineWidth = 5;
				ctx.stroke();
			}
		}
	}
}

function loop() {
	ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
	ctx.fillRect(0, 0, width, height);
	drawBalls();
	updateBalls();
	drawLines();
	requestAnimationFrame(loop);
}

function startLoop() {
	balls = [];
	createBalls(
		ammount.value,
		maxSize.value,
		minSize.value,
		maxSpeed.value,
		minSpeed.value
	);
	loop();
}

function resetLoop() {
	balls = [];
	createBalls(
		ammount.value,
		maxSize.value,
		minSize.value,
		maxSpeed.value,
		minSpeed.value
	);
}
