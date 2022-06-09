/////////////validation et envoie d'un formulaire

let form = document.querySelector(".cart__order__form");
console.log(form.name);
//ecouter la modification de l'email
form.email.addEventListener('change', function() {
    validEmail(this);
})

const validEmail = function(inputEmail) {
    ///creation de la regexp pour la validation email
    let emailRegex = new RegExp(
        '[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'
    );

    let testEmail = emailRegex.test(inputEmail.value);

    console.log(testEmail);
}