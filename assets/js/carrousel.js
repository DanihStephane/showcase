const track = document.querySelector('.track');
const carousel = document.querySelector('.carousel');

const left = document.querySelector('.left');
const right = document.querySelector('.right');
let babaWidth = document.querySelector('.baba').offsetWidth;
let carouselWidth = carousel.offsetWidth;

let index = 0;
let sumOfRight = 0;
let sumOfLeft = 0;

let initialPosition = null;
let moving = false;
let transform = 0;
let lastPageX = 0;
let transformValue = 0;

right.addEventListener('click', function () {
    track.classList.add('smooth-transition');
    index++;
    left.classList.add('show');
    sumOfRight += carouselWidth;

    // Vérifie si on est à la fin du carrousel
    if ((sumOfRight + carouselWidth) >= track.offsetWidth) {
        // Reviens au début (boucle)
        track.style.transform = `translate(0px)`;
        sumOfRight = 0;
        index = 0;
    } else {
        track.style.transform = `translateX(-${sumOfRight}px)`;
    }

    // Gérer le cas où on arrive à la fin du carrousel
    if (track.offsetWidth - (index * carouselWidth) < carouselWidth) {
        right.classList.add('lock');
    }
});

left.addEventListener('click', function () {
    track.classList.add('smooth-transition');
    sumOfLeft = sumOfRight - carouselWidth;

    // Vérifie si on est au début du carrousel
    if (sumOfLeft < 0) {
        // Reviens à la fin (boucle)
        sumOfRight = track.offsetWidth - carouselWidth;
        track.style.transform = `translateX(-${sumOfRight}px)`;
        index = Math.floor(track.offsetWidth / carouselWidth) - 1;
    } else {
        track.style.transform = `translateX(-${sumOfLeft}px)`;
        sumOfRight -= carouselWidth;
        index--;
    }

    right.classList.remove('lock');

    if (index === 0) {
        left.classList.remove('show');
    }
    stopAutoScroll(); // Arrêter l'auto-défilement
});

const gestureStart = (e) => {
    initialPosition = e.pageX;
    moving = true;
    const transformMatrix = window.getComputedStyle(track).getPropertyValue('transform');
    if (transformMatrix !== 'none') {
        transform = parseInt(transformMatrix.split(',')[4].trim());
    }
};

const gestureMove = (e) => {
    track.classList.remove('smooth-transition');
    if (moving) {
        const diff = e.pageX - initialPosition;
        if (e.pageX - lastPageX > 0) {
            if (transformValue > 0) {
                return;
            }
        } else {
            if (Math.abs(transformValue) > track.offsetWidth - carousel.offsetWidth) {
                return;
            }
        }
        transformValue = parseInt(transform) + diff;
        track.style.transform = `translateX(${transformValue}px)`;
    }
    lastPageX = e.pageX;
};

const gestureEnd = (e) => {
    moving = false;
};

if (window.PointerEvent) {
    carousel.addEventListener('pointerdown', gestureStart);
    carousel.addEventListener('pointermove', gestureMove);
    carousel.addEventListener('pointerup', gestureEnd);
} else {
    carousel.addEventListener('touchdown', gestureStart);
    carousel.addEventListener('touchmove', gestureMove);
    carousel.addEventListener('touchup', gestureEnd);
    carousel.addEventListener('mousedown', gestureStart);
    carousel.addEventListener('mousemove', gestureMove);
    carousel.addEventListener('mouseup', gestureEnd);
}

let autoScrollInterval;

const autoScrollNext = () => {
    autoScrollInterval = setInterval(() => {
        right.click(); // Simuler un clic sur le bouton "next"
    }, 2000); // Toutes les 2 secondes
};

const stopAutoScroll = () => {
    clearInterval(autoScrollInterval); // Stopper le défilement
};

// Initialiser le défilement automatique au chargement
autoScrollNext();
