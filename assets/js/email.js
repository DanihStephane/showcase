// Initialiser EmailJS avec votre utilisateur ID
(function() {
    emailjs.init("6QR73bMKseuVsewsA"); // Remplace "YOUR_USER_ID" par votre ID utilisateur EmailJS
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les données du formulaire
    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;
    const telephone = document.getElementById('telephone').value;
    const message = document.getElementById('message').value;

    // Envoyer l'e-mail
    // emailjs.send("service_0v77t9k", "template_40weqie", {
    //     nom: nom,
    //     email: email,
    //     telephone: telephone,
    //     message: message
    // }).then(function(response) {
    //     console.log("Email envoyé avec succès!", response.status);
    //     alert("Votre message a été envoyé !");
    // }, function(error) {
    //     console.log("Erreur lors de l'envoi de l'e-mail", error);
    //     alert("Une erreur est survenue. Veuillez réessayer.");
    // });
    alert('Email envoyé avec succès!');
});
