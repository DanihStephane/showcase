document.addEventListener("DOMContentLoaded", function() {
    const cursorDot = document.getElementById("cursor-dot");
    const cursorOutline = document.getElementById("cursor-outline");

     // Cibler les éléments sur lesquels l'effet de grossissement se déclenche
     const hoverTargets = document.querySelectorAll(".hover-target");

    if (cursorDot && cursorOutline) {
        window.addEventListener("mousemove", function(e){
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // cursorOutline.style.left = `${posX}px`;
            // cursorOutline.style.top = `${posY}px`;

            cursorOutline.animate({
                left:  `${posX}px`,
                top: `${posY}px`,
            }, {duration: 500,fill: "forwards"});
        });
         // Ajouter l'effet de grossissement au survol
         hoverTargets.forEach(target => {
            target.addEventListener("mouseenter", function() {
                cursorDot.style.transform = "translate(-50%, -50%) scale(2)"; // Grossir le curseur
                cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";

                // Cacher le point
                cursorDot.style.opacity = "0"; // Rendre le point transparent
            });

            target.addEventListener("mouseleave", function() {
                cursorDot.style.transform = "translate(-50%, -50%) scale(1)"; // Revenir à la taille normale
                cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";

                // Réafficher le point
                cursorDot.style.opacity = "1"; // Rendre le point visible
            });

            target.addEventListener("mousedown", function() {
                cursorOutline.classList.add("square"); // Ajouter la classe pour changer la forme
            });

            target.addEventListener("mouseup", function() {
                cursorOutline.classList.remove("square"); // Retirer la classe pour revenir à la forme originale
            });
        });
    } else {
        console.error("Les éléments cursorDot ou cursorOutline sont introuvables.");
    }
});
