'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 10) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});



/**
 * navbar toggle
 */

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {

  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);

});



/**
 * skills toggle
 */

const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener("click", function () {

    elemToggleFunc(toggleBtnBox);
    for (let i = 0; i < toggleBtns.length; i++) { elemToggleFunc(toggleBtns[i]); }
    elemToggleFunc(skillsBox);

  });
}



/**
 * dark & light theme toggle
 */

const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {

  elemToggleFunc(themeToggleBtn);

  const cursorDot = document.getElementById("cursor-dot");
  const cursorOutline = document.getElementById("cursor-outline");

  const slashElement = document.getElementById("slash");
  const companyYear = document.querySelectorAll('.company__year');

  if (themeToggleBtn.classList.contains("active")) {
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");

    cursorDot.style.backgroundColor = "black";
    cursorOutline.style.border = "2px solid hsla(0, 0%, 0%, 0.5)";
    slashElement ? slashElement.style.color = "black" : '';
    companyYear.forEach(element => {
      element.style.color = "#525252"; // Remplace 'red' par la couleur souhaitée
    });

    localStorage.setItem("theme", "light_theme");
  } else {
    document.body.classList.add("dark_theme");
    document.body.classList.remove("light_theme");

    cursorDot.style.backgroundColor = "white";
    cursorOutline.style.border = "2px solid hsla(0, 0%, 100%, 0.5)";
    slashElement ? slashElement.style.color = "white" : '';
    companyYear.forEach(element => {
      element.style.color = "white"; // Remplace 'red' par la couleur souhaitée
    });

    localStorage.setItem("theme", "dark_theme");
  }

});

/**
 * check & apply last time selected theme from localStorage
 */

if (localStorage.getItem("theme") === "light_theme") {
  themeToggleBtn.classList.add("active");
  document.body.classList.remove("dark_theme");
  document.body.classList.add("light_theme");
} else {
  themeToggleBtn.classList.remove("active");
  document.body.classList.remove("light_theme");
  document.body.classList.add("dark_theme");
}

window.onload = function(){
  Particles.init({
    selector: '.background',
    maxParticles: 150,
    connectParticles: 'true',
    speed:2,
    minDistance: 140,
    sizeVariations: 4,
    color: '#ffffff'
  });
}

//ajout de nouvelle forme d'aniamtion

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const maxParticles = 150;
const minDistance = 140; // Distance minimale pour dessiner les lignes

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.size = Math.random() * 10 + 5; // Taille aléatoire pour le texte                      origin 20 et 10
  this.color = '#ffffff'; // Couleur du texte
  this.speedX = (Math.random() - 0.5) * 4; // Vitesse aléatoire sur l'axe X
  this.speedY = (Math.random() - 0.5) * 4; // Vitesse aléatoire sur l'axe Y
}

function initParticles() {
  for (let i = 0; i < maxParticles; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    particles.push(new Particle(x, y));
  }
}

function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Dessiner une ligne si la distance est inférieure à la distance minimale
      if (distance < minDistance) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'; // Couleur des lignes
        ctx.lineWidth = 1; // Épaisseur des lignes
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function drawSymbols() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Dessiner le symbole "</>"
  particles.forEach(particle => {
    ctx.font = `${particle.size}px Arial`; // Définir la police et la taille
    ctx.fillStyle = particle.color; // Couleur du texte
    ctx.fillText('</>', particle.x - particle.size / 4, particle.y + particle.size / 3); // Centrer le texte
    // Mettre à jour la position de la particule
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    // Vérifier les bords et rebondir
    if (particle.x < 0 || particle.x > canvas.width) {
      particle.speedX *= -1; // Inverser la direction sur l'axe X
    }
    if (particle.y < 0 || particle.y > canvas.height) {
      particle.speedY *= -1; // Inverser la direction sur l'axe Y
    }
  });

  // Dessiner les lignes entre les particules
  drawLines();
}

function animate() {
  drawSymbols();
  requestAnimationFrame(animate);
}

//Gestion popup image
const popup = document.getElementById('popupImageParent');
const closeBtn = document.getElementById('closeBtn');
const popupImage = document.getElementById('popupImage');
const popupDescription = document.getElementById('popupDescription');


// Ouvrir le popup pour chaque image
// Ouvrir le popup pour chaque image
document.querySelectorAll('.popup-image').forEach((image) => {
  image.addEventListener('click', () => {
      const imageSrc = image.src;
      const description = image.nextElementSibling.textContent; // Récupérer le texte du prochain élément (la description)

      popup.style.display = 'flex';
      popupImage.src = imageSrc; // Mettre à jour l'image du popup
      popupDescription.textContent = description; // Mettre à jour la description
  });
});


// Fermer le popup
closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Fermer le popup si on clique en dehors de l'image
popup.addEventListener('click', (e) => {
  if (e.target === popup) {
      popup.style.display = 'none'; // Masquer le popup
      e.preventDefault(); // Empêche le rechargement de la page
  }
});

