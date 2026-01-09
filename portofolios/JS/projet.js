// ==============================
// 🎬 Animation des sections au scroll
// ==============================
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

// Appliquer à toutes les sections avec .fade
document.querySelectorAll(".fade").forEach((section) => {
  observer.observe(section);
});

// ==============================
// 🌈 Animation du dégradé principal du HERO
// (ajoute un effet lent de changement de teinte)
// ==============================
const heroBg = document.querySelector(".hero-bg");

if (heroBg) {
  let hue = 0;
  setInterval(() => {
    hue = (hue + 1) % 360;
    heroBg.style.filter = `hue-rotate(${hue}deg)`;
  }, 80); // vitesse du changement de teinte
}

// ==============================
// 🪶 Parallax léger sur le texte du HERO
// ==============================
const heroContent = document.querySelector(".hero-content");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  if (heroContent) {
    heroContent.style.transform = `translateY(${scrollY * 0.2}px)`; // léger mouvement vertical
  }
});

// ==============================
// 💫 Animation subtile des images au scroll
// ==============================
const images = document.querySelectorAll(".banner img");

function animateOnScroll() {
  images.forEach((img) => {
    const rect = img.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
      img.style.transform = "scale(1)";
      img.style.opacity = "1";
    } else {
      img.style.transform = "scale(0.98)";
      img.style.opacity = "0.8";
    }
  });
}

window.addEventListener("scroll", animateOnScroll);
animateOnScroll(); // exécution au chargement

// Effet parallax doux sur le texte du Hero
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero-ultra, .hero-graphic, .hero-ultra");
  const title = document.querySelector(".hero-title");
  const subtitle = document.querySelector(".hero-subtitle");

  if (!hero || !title || !subtitle) return;
  const scrollY = window.scrollY;
  const limit = hero.offsetHeight;

  if (scrollY < limit) {
    const offset = scrollY * 0.4;
    title.style.transform = `translateY(${offset}px)`;
    subtitle.style.transform = `translateY(${offset * 0.6}px)`;
  }
});
