const container = document.getElementById('scrollContainer');
let currentIndex = 0;

const duration = 15 * 1000,
  animationEnd = Date.now() + duration;

let skew = 1;



function scrollToSection(direction) {
    const sections = document.querySelectorAll('.section');
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= sections.length) currentIndex = sections.length - 1;
    sections[currentIndex].scrollIntoView({ behavior: 'smooth' });
}

container.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    let closestIndex = 0;
    let closestDistance = Infinity;
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
        }
    });
    currentIndex = closestIndex;
});

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

(function frame() {
  const timeLeft = animationEnd - Date.now(),
    ticks = Math.max(200, 500 * (timeLeft / duration));

  skew = Math.max(0.8, skew - 0.001);

  confetti({
    particleCount: 1,
    startVelocity: 0,
    ticks: ticks,
    origin: {
      x: Math.random(),
      // since particles fall down, skew start toward the top
      y: Math.random() * skew - 0.2,
    },
    shapes: ["emoji"],
    shapeOptions: {
      emoji: {
        value: ["🌸", "☀️", "⭐", "🌞", "☘️", "🍀", "🌷", "🌼", "🌻", "🌿"],
      },
    },
    gravity: randomInRange(0.9, 1),
    scalar: randomInRange(0.2, 1),
    drift: randomInRange(1, 0.9),
  });

  if (timeLeft > 0) {
    requestAnimationFrame(frame);
  }
})();

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const animatables = entry.target.querySelectorAll('.animate__animated, .tracking-in-expand-fwd, .tracking-in-expand, .bounce-in-fwd, .fade-in-fwd');

        animatables.forEach(el => {
          // Clona el nodo para reiniciar la animación
          const newEl = el.cloneNode(true);
          el.parentNode.replaceChild(newEl, el);
        });
      }
    });
  }, {
    threshold: 0.6 // Ajusta cuánto de la sección debe estar visible
  });

  document.querySelectorAll('.section').forEach(seccion => {
    observer.observe(seccion);
  });
