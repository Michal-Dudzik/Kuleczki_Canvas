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

const defaultRadius = document.getElementById('defaultRadius');
const minSpeed = document.getElementById('minSpeed');
const maxSpeed = document.getElementById('maxSpeed');
const ammount = document.getElementById('ammount');

const menu = document.getElementById('menu');
const hideButton = document.getElementById('hideMenu');

const dr = document.getElementById('dr');
const minS = document.getElementById('minS');
const maxS = document.getElementById('maxS');
const a = document.getElementById('a');

hideButton.addEventListener('click', () => {
	menu.classList.toggle('hide');
});

defaultRadius.addEventListener('input', () => {
	dr.innerHTML = defaultRadius.value;
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

class Ball {
	constructor(x, y, velMin, velMax, color, radius) {
		this.x = x;
		this.y = y;
		this.velMin = velMin;
		this.velMax = velMax;
		this.color = color;
		this.radius = radius;
		this.velX = Math.random() * (velMax - velMin) + velMin;
		this.velY = Math.random() * (velMax - velMin) + velMin;
	}

	draw() {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fill();
	}

	update() {
		if (this.x + this.radius >= width) {
			this.velX = -(Math.random() * (this.velMax - this.velMin) + this.velMin);
		}
		if (this.x - this.radius <= 0) {
			this.velX = Math.random() * (this.velMax - this.velMin) + this.velMin;
		}
		if (this.y + this.radius >= height) {
			this.velY = -(Math.random() * (this.velMax - this.velMin) + this.velMin);
		}
		if (this.y - this.radius <= 0) {
			this.velY = Math.random() * (this.velMax - this.velMin) + this.velMin;
		}
		this.x += this.velX;
		this.y += this.velY;
	}

	collisionDetect() {
		for (const ball of balls) {
			if (this !== ball) {
				const dx = this.x - ball.x;
				const dy = this.y - ball.y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < this.radius + ball.radius) {
					ball.color = this.color = randomRGB();
				}
			}
		}
	}

	proximityDetection(otherBall, ctx) {
		let dx = this.x - otherBall.x;
		let dy = this.y - otherBall.y;
		let distance = Math.sqrt(dx * dx + dy * dy);
		if (distance < this.radius + otherBall.radius) {
			ctx.beginPath();
			ctx.strokeStyle = 'white';
			ctx.moveTo(this.x, this.y);
			ctx.lineTo(otherBall.x, otherBall.y);
			ctx.stroke();
		}
	}
}

const balls = [];

while (balls.length < ammount.value) {
	const coordinates = random(10, 20);
	const ball = new Ball(
		// ball position always drawn at least one ball width
		// away from the edge of the canvas, to avoid drawing errors
		random(0 + coordinates, width - coordinates),
		random(0 + coordinates, height - coordinates),
		random(-7, 7),
		random(-7, 7),
		randomRGB(),
		coordinates
	);

	balls.push(ball);
}

function loop() {
	ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
	ctx.fillRect(0, 0, width, height);

	for (const ball of balls) {
		ball.draw();
		ball.update();
		ball.collisionDetect();
		// ball.proximityDetection();
		// ball.cursorDetect();
	}

	requestAnimationFrame(loop);
}

function startLoop() {
	// balls = [];
	// ctx.clearRect(0, 0, width, height);

	loop();
}

function stopLoop() {
	cancelAnimationFrame(myLoop);
}
