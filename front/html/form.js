let contact = new Object();


////////creer un array avec juste les id 
let createProductsIdArray = function() {
    let basket = getBasket();
    let productsIdArray = new Array();
    for (let i = 0; i < basket.length; i++) {
        productsIdArray[i] = basket[i]._id;
    };
    return productsIdArray;
};


//let a = createProductsIdArray;


products = createProductsIdArray();
let order = {
    contact,
    products
};
console.log(order);

/////////////validation et envoie d'un formulaire
let form = document.querySelector(".cart__order__form");

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (validEmail(form.email) && validAddress(form.address) && validCity(form.city) && validFirstName(form.firstName) && validLastName(form.lastName)) {
        //form.submit();
        console.log(contact);
        console.log(products);
        console.log(submitForm());



    } else {
        console.log("NOOOOOOOOOOONNNNNNNNNNNNN");
    }

})


///////****************Validation email***************************
//ecouter la modification du prénom
form.email.addEventListener('change', function() {
    validEmail(this);

})



const validEmail = function(inputEmail) {
    ///creation de la regexp pour la validation email
    let emailRegex = new RegExp(
        '[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g' /////QUestion mentor à quoi sert le g ? 
    );

    let testEmail = emailRegex.test(inputEmail.value);
    let errorEmail = document.querySelector("#emailErrorMsg");
    if (testEmail) {


        errorEmail.innerHTML = "E-mail valide";
        errorEmail.style.color = 'green';
        contact.email = inputEmail.value;
        console.log(contact.email);
        return true;

    } else {
        errorEmail.innerHTML = "E-mail non valide";
        errorEmail.style.color = 'red';
        return false;
    }
    console.log(testEmail);
}



/////////////validation et envoie d'un formulaire




///////****************Validation FirstName***************************

//ecouter la modification de First Name
form.firstName.addEventListener('change', function() {
    validFirstName(this);
})



const validFirstName = function(inputFirstName) {
    ///creation de la regexp pour la validation firstName
    let firstNameRegex = new RegExp(
        /^[A-Za-z_-]+$/
    );



    let testFirstName = firstNameRegex.test(inputFirstName.value);
    console.log(inputFirstName.value);
    console.log(testFirstName);
    let errorFirstName = document.querySelector("#firstNameErrorMsg");
    if (testFirstName) {

        errorFirstName.innerHTML = "Prénom valide";
        errorFirstName.style.color = 'green';
        contact.firstName = inputFirstName.value;
        return true;
    } else {
        errorFirstName.innerHTML = "Prénom non valide";
        errorFirstName.style.color = 'red';
        return false;
    }

}


///////****************Validation lastName***************************

//ecouter la modification de lastName
form.lastName.addEventListener('change', function() {
    validLastName(this);
})



const validLastName = function(inputLastName) {
    ///creation de la regexp pour la validation last name
    let lastNameRegex = new RegExp(
        /^[A-Za-z_-]+$/
    );



    let testLastName = lastNameRegex.test(inputLastName.value);

    let errorLastName = document.querySelector("#lastNameErrorMsg");
    if (testLastName) {

        errorLastName.innerHTML = "Nom valide";
        errorLastName.style.color = 'green';
        contact.lastName = inputLastName.value;
        return true;
    } else {
        errorLastName.innerHTML = "Nom non valide";
        errorLastName.style.color = 'red';
        return false;
    }

}

///////****************Validation Adresse***************************

//ecouter la modification de lastName
form.address.addEventListener('change', function() {
    validAddress(this);
})



const validAddress = function(inputAddress) {
    ///creation de la regexp pour la validation adresse
    let addressRegex = new RegExp(
        /^[a-zA-Z0-9.-_]{2,}$/
    );



    let testAddress = addressRegex.test(inputAddress.value);

    let errorAddress = document.querySelector("#addressErrorMsg");
    console.log(errorAddress);
    if (testAddress) {

        errorAddress.innerHTML = "Adresse valide";
        errorAddress.style.color = 'green';
        contact.address = inputAddress.value;
        return true;
    } else {
        errorAddress.innerHTML = "Adresse non valide";
        errorAddress.style.color = 'red';
        return false;
    }

}


///////****************Validation city***************************

//ecouter la modification de city
form.city.addEventListener('change', function() {
    validCity(this);
})



const validCity = function(inputCity) {
    ///creation de la regexp pour la validation firstName
    let cityRegex = new RegExp(
        /^[a-zA-Z0-9.-_]{2,}$/
    );



    let testCity = cityRegex.test(inputCity.value);

    let errorCity = document.querySelector("#cityErrorMsg");

    if (testCity) {

        errorCity.innerHTML = "Champ valide";
        errorCity.style.color = 'green';
        contact.city = inputCity.value;
        console.log(inputCity.value);
        return true;
    } else {
        errorCity.innerHTML = "Champ non valide";
        errorCity.style.color = 'red';
        return false;
    }

}


async function submitForm() {
    let response = await fetch("http://localhost:3000/api/products/order", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(order)
    });

    let result = await response.json();
    //localStorage.clear();
    orderId = result.orderId;
    document.location.href = `confirmation.html?id=${orderId}`;

};