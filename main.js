const canvas = document.getElementById('ballPit');
const ctx = canvas.getContext('2d');

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

// ball bouncing off each other with option to change speed multiplier for bigger balls, ammont of balls, and size of balls

const balls = [];

function Ball(x, y, dx, dy, size) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.size = size;

	this.draw = () => {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
		ctx.fillStyle = 'blue';
		ctx.fill();
	};

	this.update = () => {
		if (this.x + this.size >= innerWidth || this.x - this.size <= 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.size >= innerHeight || this.y - this.size <= 0) {
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;

		this.draw();
	};
}

function init() {
	balls.length = 0;
	for (let i = 0; i < ammount.value; i++) {
		const size = Math.random() * 10 + 10;
		const x = Math.random() * (innerWidth - size * 2) + size;
		const y = Math.random() * (innerHeight - size * 2) + size;
		const dx = (Math.random() - 0.5) * smallBallSpeed.value;
		const dy = (Math.random() - 0.5) * smallBallSpeed.value;

		balls.push(new Ball(x, y, dx, dy, size));
	}
}

function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, innerWidth, innerHeight);

	for (let i = 0; i < balls.length; i++) {
		for (let j = 0; j < balls.length; j++) {
			if (i !== j) {
				if (
					balls[i].x - balls[j].x < balls[i].size * speedMultiplier.value &&
					balls[j].x - balls[i].x < balls[i].size * speedMultiplier.value &&
					balls[i].y - balls[j].y < balls[i].size * speedMultiplier.value &&
					balls[j].y - balls[i].y < balls[i].size * speedMultiplier.value
				) {
					balls[i].dx = -balls[i].dx;
					balls[i].dy = -balls[i].dy;
					balls[j].dx = -balls[j].dx;
					balls[j].dy = -balls[j].dy;
				}
			}
		}
	}

	for (let i = 0; i < balls.length; i++) {
		balls[i].update();
	}
}

init();
animate();
