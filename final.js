let contador = 0;
const declaracion = document.getElementById("declaracion");
const ticket = document.getElementById("ticket");
const mensaje = document.getElementById("mensaje");
const boton = document.getElementById("boton");

// FUNCION CUANDO DICE "SI"
function si() {
  declaracion.style.display = 'none';
  ticket.style.display = 'block';

  // Enviar respuesta a Google Forms usando el form real
  document.getElementById('respuestaInput').value = 'Sí aceptó salir conmigo ❤️';
  document.getElementById('miForm').submit();
}

// FUNCION CUANDO DICE "NO"
function no() {
  contador++;
  const respuestas = [
    "amiga para llantear pues",
    "yape dime que si",
    "piensalo bien no te vas ha arrepentir",
    "ante todo muy buenas noches",
    "amiga no te votes pe",
    "Corayda asi eso no vale haaa 😭"
  ];

  mensaje.textContent = respuestas[contador % respuestas.length];

  // Enviar respuesta a Google Forms usando el form real
  document.getElementById('respuestaInput').value = 'No quiso 😢';
  document.getElementById('miForm').submit();
}

// BOTON QUE SE MUEVE
document.addEventListener("mousemove", (e) => {
  const rect = boton.getBoundingClientRect();
  const distancia = 100; // Distancia de activación en px

  const dx = e.clientX - (rect.left + rect.width / 2);
  const dy = e.clientY - (rect.top + rect.height / 2);

  const distanciaCursor = Math.sqrt(dx * dx + dy * dy);

  if (distanciaCursor < distancia) {
    const nuevaX = Math.random() * (window.innerWidth - rect.width);
    const nuevaY = Math.random() * (window.innerHeight - rect.height);
    boton.style.left = `${nuevaX}px`;
    boton.style.top = `${nuevaY}px`;
  }
});

boton.addEventListener("click", no);

