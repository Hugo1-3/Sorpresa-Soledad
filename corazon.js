const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

const totalHeartParticles = 200;
const totalColumnParticles = 50;
const heartParticles = [];
const columnParticles = [];

function heartFunction(t, scale = 10) {
  let x = 16 * Math.pow(Math.sin(t), 3);
  let y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) - Math.cos(4 * t));
  return { x: x * scale, y: y * scale };
}

// Partículas que forman el corazón
for (let i = 0; i < totalHeartParticles; i++) {
  let t = Math.random() * Math.PI * 2;
  let pos = heartFunction(t);
  heartParticles.push({
    baseX: canvas.width / 2 + pos.x,
    baseY: canvas.height / 2 + pos.y,
    size: Math.random() * 2 + 1,
    angle: Math.random() * 360
  });
}

// Partículas que viajan hacia la columna
function createColumnParticle() {
  let t = Math.random() * Math.PI * 2;
  let pos = heartFunction(t);
  return {
    x: canvas.width / 2 + pos.x,
    y: canvas.height / 2 + pos.y,
    size: Math.random() * 2 + 1,
    targetX: canvas.width / 2,
    targetY: canvas.height / 2 - 100 + Math.random() * 200
  };
}

// Genera partículas iniciales de columna
for (let i = 0; i < totalColumnParticles; i++) {
  columnParticles.push(createColumnParticle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const time = Date.now() * 0.002;
  const beatScale = 1 + 0.2 * Math.sin(time * 3);

  // Dibujar el corazón latiente
  for (let p of heartParticles) {
    let angleRad = p.angle * (Math.PI / 180);
    let x = p.baseX + Math.cos(angleRad + time) * 5 * beatScale;
    let y = p.baseY + Math.sin(angleRad + time) * 5 * beatScale;

    ctx.beginPath();
    ctx.arc(x, y, p.size * beatScale, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.shadowColor = 'red';
    ctx.shadowBlur = 10;
    ctx.fill();
  }

  // Dibujar partículas que viajan a la columna
  for (let p of columnParticles) {
    p.x += (p.targetX - p.x) * 0.02;
    p.y += (p.targetY - p.y) * 0.02;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = 'pink';
    ctx.shadowColor = 'pink';
    ctx.shadowBlur = 10;
    ctx.fill();

    // Si ya llegó cerca de su objetivo, renacer en el corazón
    if (Math.abs(p.x - p.targetX) < 1 && Math.abs(p.y - p.targetY) < 1) {
      let newP = createColumnParticle();
      p.x = newP.x;
      p.y = newP.y;
      p.targetX = newP.targetX;
      p.targetY = newP.targetY;
    }
  }

  requestAnimationFrame(animate);
}

animate();
document.addEventListener('click', function() {
      const musica = document.getElementById('musica');
      musica.play();
    }, { once: true });
