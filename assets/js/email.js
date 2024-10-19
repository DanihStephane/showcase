const messagesPopup = {
    success: {
        fr: {
            title: " Confirmation d'envoi du formulaire",
            message: "Je vous remercie d'avoir soumis votre formulaire. \n Votre demande a été reçue avec succès, et je m'engage à vous fournir une réponse dans les plus brefs délais. \n Si vous avez des questions supplémentaires, n'hésitez pas à me contacter."
        },
        en: {
            title: "Form Submission Confirmation",
            message: "Thank you for submitting your form. \n Your request has been successfully received, and I am committed to providing you with a response as soon as possible. \n If you have any additional questions, please feel free to contact me."
        },
        de: {
            title: "Bestätigung des Formularversands",
            message: "Vielen Dank für die Einreichung Ihres Formulars. Ihre Anfrage wurde erfolgreich erhalten, und ich verpflichtete mich, Ihnen so schnell wie möglich eine Antwort zu geben. \n Wenn Sie weitere Fragen haben, zögern Sie bitte nicht, mich zu kontaktieren."
        },
        mg: {
            title: "Fanamafisana ny fandefasana ny taratasy",
            message: "Misaotra anao tamin'ny fandefasana ny taratasinao. \n Nahazoana tsara ny fangatahanao, ary manolo-tena aho hanome valiny anao haingana araka izay azo atao.\n  Raha manana fanontaniana fanampiny ianao, aza misalasala mifandray amiko."
        }         
    },
    error: {
        fr: {
            title: "Erreur lors de l'envoi du formulaire",
            message: "Je regrette de vous informer qu'une erreur est survenue lors de l'envoi de votre formulaire.\n  Je vous invite à réessayer votre soumission. \n Si le problème persiste, vous pouvez me contacter directement par e-mail \n à l'adresse danih.rakotoarison@gmail.com . Je suis là pour vous aider."
        },
        en: {
            title: "Error Sending the Form",
            message: "I regret to inform you that an error occurred while sending your form. \n I invite you to try your submission again. \n If the problem persists, you can contact me directly via email \n at danih.rakotoarison@gmail.com. I am here to help you."
        },
        de: {
            title: "Fehler beim Versenden des Formulars",
            message: "Es tut mir leid, Ihnen mitteilen zu müssen, dass ein Fehler beim Versenden Ihres Formulars aufgetreten ist.\n  Ich lade Sie ein, Ihre Einreichung erneut zu versuchen.\n  Wenn das Problem weiterhin besteht, können Sie mich direkt per E-Mail \n unter danih.rakotoarison@gmail.com kontaktieren. Ich bin hier, um Ihnen zu helfen."
        },
        mg: {
            title: "Hadisoana tamin'ny fandefasana ny taratasy",
            message: "Miala tsiny aho milaza anao fa nisy hadisoana nitranga tamin'ny fandefasana ny taratasinao.\n  Manasa anao aho hanandrana indray ny fandefasana. \n Raha mitohy ny olana, azonao atao ny mifandray amiko mivantana amin'ny alalan'ny mailaka \n any danih.rakotoarison@gmail.com. Eto aho hanampy anao."
        }        
        
    }
};



function showPopup(type) {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    const popupTitle = document.getElementById('popup-title');

    popup.classList.remove('hidden');
    popup.classList.remove('success', 'error'); // Enlève les classes précédentes
    popupTitle.classList.remove('success-title', 'error-title'); // Enlève les classes de titre précédentes

    const message = messagesPopup[type][currentLanguage]; // Récupère le message basé sur le type et la langue

    popupTitle.textContent = message.title; // Définit le titre
    popupMessage.textContent = message.message; // Définit le message

    if (type === 'success') {
        popup.classList.add('success'); // Ajoute la classe de succès
        popupTitle.classList.add('success-title'); // Ajoute la classe de couleur pour le succès
    } else if (type === 'error') {
        popup.classList.add('error'); // Ajoute la classe d'erreur
        popupTitle.classList.add('error-title'); // Ajoute la classe de couleur pour l'erreur
    }
}

// Fonction pour fermer le popup
function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.add('hidden');
    document.getElementById("contact-form").reset();
}

// Écouteur d'événements pour fermer le popup en cliquant en dehors
document.getElementById('popup').addEventListener('click', function(event) {
    // Vérifie si le clic a été effectué à l'extérieur de la zone de contenu du popup
    if (event.target === this) {
        closePopup();
    }
});


const translationsSendMail = {
    fr: {
        loading: 'Chargement',
        send: 'Envoyer',
        change: 'Changement',
    },
    en: {
        loading: 'Loading',
        send: 'Send',
        change: 'Change',
    },
    de: {
        loading: 'Laden',
        send: 'Senden',
        change: 'Änderung',
    },
    mg: {
        loading: 'Fikarakarana',
        send: 'Alefaso',
        change: 'Fiovana',
    },
};


const loadingButton = document.getElementById('loadingButton');
let interval; // Variable pour l'intervalle

function startLoading() {
    loadingButton.textContent = translationsSendMail[currentLanguage].loading; // Modifier le texte du bouton
    let dots = ''; // Variable pour les points

    // Démarrer l'intervalle pour faire clignoter les points
    interval = setInterval(() => {
        dots += '.'; // Ajouter un point
        if (dots.length > 3) { // Limiter à 3 points
            dots = '';
        }
        loadingButton.textContent = `${translationsSendMail[currentLanguage].loading}${dots}`; // Mettre à jour le texte
    }, 500); // Temps entre les mises à jour
}

function stopLoading() {
    clearInterval(interval); // Arrêter l'intervalle
    loadingButton.textContent = translationsSendMail[currentLanguage].send; // Remettre le texte d'origine
}




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

    startLoading();
    // Envoyer l'e-mail
    emailjs.send("service_0v77t9k", "template_40weqie", {
        nom: nom,
        email: email,
        telephone: telephone,
        message: message
    }).then(function(response) {
        console.log("Email envoyé avec succès!", response.status);
        // alert("Votre message a été envoyé !");
        showPopup('success');
        stopLoading();
    }, function(error) {
        console.log("Erreur lors de l'envoi de l'e-mail", error);
        // alert("Une erreur est survenue. Veuillez réessayer.");
        showPopup('error');
        stopLoading();
    });
   
});
