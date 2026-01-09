// === ÉCRITURE AUTOMATIQUE ===
document.addEventListener("DOMContentLoaded", () => {
  const typingText = document.getElementById("typingText");
  const text = "Bienvenue sur mon Portfolio ";
  let index = 0;

  function type() {
    if (index < text.length) {
      typingText.textContent += text.charAt(index);
      index++;
      setTimeout(type, 90);
    } else {
      // effet lumineux une fois terminé
      typingText.style.animation =
        "glow 1.5s ease-in-out infinite alternate";
    }
  }

  type();
});

// === ANIMATION SECTIONS AU SCROLL ===
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

document
  .querySelectorAll(".section")
  .forEach((section) => observer.observe(section));

// === STYLE GLOW (injecté dynamiquement) ===
const glowStyle = document.createElement("style");
glowStyle.textContent = `
            @keyframes glow {
              from { text-shadow: 0 0 15px var(--neon), 0 0 30px var(--neon); }
              to { text-shadow: 0 0 25px var(--neon), 0 0 50px var(--neon); }
            }`;
document.head.appendChild(glowStyle);

// === FORMULAIRE CONTACT (SON + ANIM) ===
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const animationContainer = document.getElementById("sendAnimation");
  const sendSound = document.getElementById("sendSound");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    // 🔊 Lecture du son
    sendSound.currentTime = 0;
    sendSound.volume = 0.6;
    sendSound.play();

    document.body.classList.add("sending");
    setTimeout(() => document.body.classList.remove("sending"), 1200);

    // ✉️ Création de l’enveloppe
    const mail = document.createElement("div");
    mail.classList.add("mail-icon");
    mail.innerHTML = "✉️";
    animationContainer.appendChild(mail);

    // 💫 Particules dynamiques
    let particleInterval = setInterval(
      () => createParticle(animationContainer),
      90
    );

    // Nettoyage
    setTimeout(() => {
      clearInterval(particleInterval);
      mail.remove();
    }, 2800);

    form.reset();
  });
});

// === CANVAS FOND FLUIDE ===
const canvas = document.getElementById("fluid-bg");
const ctx = canvas.getContext("2d");

let width, height;
let t = 0;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function draw() {
  t += 0.003; // vitesse fluide lente
  ctx.clearRect(0, 0, width, height);

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "rgba(0,180,255,0.12)");
  gradient.addColorStop(1, "rgba(0,100,255,0.08)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const waves = 5;
  for (let i = 0; i < waves; i++) {
    const hue = 200 + i * 10;
    ctx.beginPath();

    for (let x = 0; x < width; x += 8) {
      const y =
        Math.sin(x * 0.004 + t * (1.5 + i * 0.3)) * 50 +
        height / 2 +
        i * 40;

      ctx.lineTo(x, y);
    }

    allowStroke(hue);
  }

  requestAnimationFrame(draw);
}

function allowStroke(hue) {
  ctx.strokeStyle = `hsla(${hue}, 100%, 80%, 0.20)`;
  ctx.lineWidth = 2.5;
  ctx.stroke();
}

draw();
