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

// check for updates to the variables

const defaultSize = document.getElementById('defaultSize');
const smallBallSpeed = document.getElementById('smallBallSpeed');
const speedMultiplier = document.getElementById('speedMultiplier');
const ammount = document.getElementById('ammount');

const menu = document.getElementById('menu');
const hideButton = document.getElementById('hideMenu');

const ds = document.getElementById('ds');
const sbs = document.getElementById('sbs');
const sm = document.getElementById('sm');
const a = document.getElementById('a');

hideButton.addEventListener('click', () => {
	menu.classList.toggle('hide');
});

defaultSize.addEventListener('input', () => {
	ds.innerHTML = defaultSize.value;
});

smallBallSpeed.addEventListener('input', () => {
	sbs.innerHTML = smallBallSpeed.value;
});

speedMultiplier.addEventListener('input', () => {
	sm.innerHTML = speedMultiplier.value;
});

ammount.addEventListener('input', () => {
	a.innerHTML = ammount.value;
});

class Ball {
	constructor(x, y, velX, velY, color, size, speedMultiplier) {
		this.x = x;
		this.y = y;
		this.velX = velX;
		this.velY = velY;
		this.color = color;
		this.size = size;
	}

	draw() {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
		ctx.fill();
	}

	update() {
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
	}

	collisionDetect() {
		for (const ball of balls) {
			if (this !== ball) {
				const dx = this.x - ball.x;
				const dy = this.y - ball.y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < this.size + ball.size) {
					ball.color = this.color = randomRGB();
				}
			}
		}
	}

	proximityDetect() {
		for (const ball of balls) {
			if (this !== ball) {
				const dx = this.x - ball.x;
				const dy = this.y - ball.y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < this.size + ball.size) {
					ctx.beginPath();
					ctx.strokeStyle = this.color;
					ctx.moveTo(this.x, this.y);
					ctx.lineTo(ball.x, ball.y);
					ctx.stroke();
				}
			}
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
		// ball.proximityDetect();
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
