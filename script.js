// script.js
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

const shapes = ['heart', 'circle', 'star', 'spiral', 'ring'];

function Particle(x, y, angle, distance, shape) {
  const t = angle;
  this.x = x;
  this.y = y;
  this.radius = 2;
  this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
  this.alpha = 1;
  this.shape = shape;

  switch (shape) {
    case 'heart':
      this.targetX = x + distance * 16 * Math.pow(Math.sin(t), 3);
      this.targetY = y - distance * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      break;
    case 'circle':
      this.targetX = x + distance * Math.cos(t);
      this.targetY = y + distance * Math.sin(t);
      break;
    case 'star':
      const spikes = 5;
      const step = Math.PI / spikes;
      const outerRadius = distance * 1.5;
      const innerRadius = distance * 0.5;
      const spike = Math.floor(t / step);
      const isOuter = spike % 2 === 0;
      const r = isOuter ? outerRadius : innerRadius;
      this.targetX = x + r * Math.cos(t);
      this.targetY = y + r * Math.sin(t);
      break;
    case 'spiral':
      const spiralTurns = 3;
      const spiralRadius = distance * (t / (Math.PI * 2)) * spiralTurns;
      this.targetX = x + spiralRadius * Math.cos(t);
      this.targetY = y + spiralRadius * Math.sin(t);
      break;
    case 'ring':
      const ringRadius = distance * 2;
      this.targetX = x + ringRadius * Math.cos(t);
      this.targetY = y + ringRadius * Math.sin(t);
      break;
  }

  this.dx = (this.targetX - x) / 30;
  this.dy = (this.targetY - y) / 30;
}

Particle.prototype.update = function () {
  this.x += this.dx;
  this.y += this.dy;
  this.alpha -= 0.02;
};

Particle.prototype.draw = function () {
  ctx.save();
  ctx.globalAlpha = this.alpha;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.restore();
};

function Firework(startX, startY, targetX, targetY, shape) {
  this.x = startX;
  this.y = startY;
  this.targetX = targetX;
  this.targetY = targetY;
  this.speedX = (targetX - startX) / 30;
  this.speedY = (targetY - startY) / 30;
  this.exploded = false;
  this.particles = [];
  this.shape = shape;
}

Firework.prototype.update = function () {
  if (!this.exploded) {
    this.x += this.speedX;
    this.y += this.speedY;
    if (Math.abs(this.x - this.targetX) < 2 && Math.abs(this.y - this.targetY) < 2) {
      this.exploded = true;
      this.explode();
    }
  } else {
    this.particles.forEach(p => p.update());
  }
};

Firework.prototype.draw = function () {
  if (!this.exploded) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
  } else {
    this.particles.forEach(p => p.draw());
  }
};

Firework.prototype.explode = function () {
  const count = 80;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2) * (i / count);
    const distance = 8 + Math.random() * 3;
    this.particles.push(new Particle(this.x, this.y, angle, distance, this.shape));
  }
};

function launchFireworks() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 3;

  // 6 fuegos artificiales al centro con corazón
  for (let i = 0; i <25; i++) {
    const startX = Math.random() * canvas.width;
    const startY = canvas.height;
    const shape = 'heart';
    fireworks.push(new Firework(startX, startY, centerX, centerY, shape));
  }

  // 15 fuegos artificiales aleatorios con diferentes formas
  for (let i = 0; i < 25; i++) {
    const startX = Math.random() * canvas.width;
    const startY = canvas.height;
    const targetX = Math.random() * canvas.width;
    const targetY = Math.random() * canvas.height * 0.7;
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    fireworks.push(new Firework(startX, startY, targetX, targetY, shape));
  }
}

function animate() {
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((firework, index) => {
    firework.update();
    firework.draw();
    if (firework.exploded && firework.particles.every(p => p.alpha <= 0)) {
      fireworks.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

// Lanzar fuegos artificiales cada 4 segundos
setInterval(launchFireworks,500);

animate();
document.addEventListener('click', function() {
      const musica = document.getElementById('musica');
      musica.play();
    }, { once: true });