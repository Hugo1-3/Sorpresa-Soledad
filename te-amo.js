const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Ocupa toda la pantalla
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Frase a imprimir
const letters = ['TE AMO Corayda'];

// Tamaño de fuente
const fontSize = 16;
const columns = Math.floor(canvas.width / (fontSize * 5)); // Ajusta ancho por la frase

// Drops para cada columna
const drops = [];
for(let x = 0; x < columns; x++)
  drops[x] = Math.floor(Math.random() * canvas.height / fontSize);

function draw() {
  // Fondo negro semitransparente
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Estilo del texto
  ctx.fillStyle = '#FF69B4'; // hotpink
  ctx.font = fontSize + 'px monospace';

  // Dibuja cada columna
  for(let i = 0; i < columns; i++) {
    const text = letters[0]; // siempre "TE AMO Corayda"
    ctx.fillText(text, i * fontSize * 8, drops[i] * fontSize); // Ajuste de espacio horizontal

    // Reinicia la caída aleatoriamente
    if(drops[i] * fontSize > canvas.height && Math.random() > 0.250)
      drops[i] = 0;

    drops[i]++;
  }
}

setInterval(draw, 50);

// Redimensiona canvas automáticamente
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
animate();
document.addEventListener('click', function() {
      const musica = document.getElementById('musica');
      musica.play();
    }, { once: true });