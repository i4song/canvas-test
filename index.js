var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var particlesOnScreen = 245;
var particlesArray = [];
var w, h;
w = canvas.width = window.innerWidth;
h = canvas.height = window.innerHeight;

function random(min, max) {
	return min + Math.random() * (max - min + 1);
}

function clientResize(ev) {
	w = canvas.width = window.innerWidth;
	h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", clientResize);

function createSnowFlakes() {
	for(var i = 0; i < particlesOnScreen; i++){
		particlesArray.push({
			x: Math.random() * w,
			y: Math.random() * h,
			opacity: Math.random(),
			speedX: random(-1, 1),
			speedY: random(0.5, 2),
			radius: random(0.5, 4.2)
		})
	}
	
}

function drawSnowFlakes(){
	for(var i = 0; i < particlesArray.length; i++) {
		var gradient = ctx.createRadialGradient(
			particlesArray[i].x,
			particlesArray[i].y,
			0,
			particlesArray[i].x,
			particlesArray[i].y,
			particlesArray[i].radius
		);
		
		gradient.addColorStop(0, `rgba(255,255,255,${particlesArray[i].opacity})`);
		gradient.addColorStop(.8, `rgba(210,236,242,${particlesArray[i].opacity})`);
		gradient.addColorStop(1, `rgba(237,247,249,${particlesArray[i].opacity})`);
		
		ctx.beginPath();
		ctx.arc(
			particlesArray[i].x,
			particlesArray[i].y,
			particlesArray[i].radius,
			0,
			Math.PI*2,
			false
		);
		ctx.fillStyle = gradient;
		ctx.fill();
	}
}

function moveSnowFlakes() {
	particlesArray.map(p => {
		p.x += p.speedX;
		p.y += p.speedY;
		if(p.y > h) {
			p.x = Math.random() * w * 1.5;
			p.y = -50;
		}
	});
}

function updateSnowFall () {
	ctx.clearRect(0,0,w,h);
	drawSnowFlakes();
	moveSnowFlakes();
	requestAnimationFrame(updateSnowFall);
}

requestAnimationFrame(updateSnowFall);

createSnowFlakes();
