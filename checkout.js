const result = new URLSearchParams(location.search).get('resultado');
const allowed = ['BASE PROFESIONAL','PROFESIONAL EN EVOLUCIÓN','MICRONEEDLING AVANZADO'];
if (allowed.includes(result)) document.querySelector('#quiz-summary').textContent = 'Tu punto de partida: '+result+'. Encontrá las herramientas para seguir avanzando.';
