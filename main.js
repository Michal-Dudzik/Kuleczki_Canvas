const menu = document.getElementById('menu');
const hideButton = document.getElementById('hideMenu');

hideButton.addEventListener('click', () => {
	menu.classList.toggle('hide');
});

const defaultSize = document.getElementById('defaultSize');
const ds = document.getElementById('ds');
defaultSize.addEventListener('input', () => {
	ds.innerHTML = defaultSize.value;
});

const smallBallSpeed = document.getElementById('smallBallSpeed');
const sbs = document.getElementById('sbs');
smallBallSpeed.addEventListener('input', () => {
	sbs.innerHTML = smallBallSpeed.value;
});

const speedMultiplier = document.getElementById('speedMultiplier');
const sm = document.getElementById('sm');
speedMultiplier.addEventListener('input', () => {
	sm.innerHTML = speedMultiplier.value;
});

const ammount = document.getElementById('ammount');
const a = document.getElementById('a');
ammount.addEventListener('input', () => {
	a.innerHTML = ammount.value;
});
