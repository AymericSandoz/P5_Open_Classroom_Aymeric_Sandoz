function compareKanapName(a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
    }
    return 0;
}





//Voir tuto training Dev Youtube  


///////////TOUTES LES FONCTIONS UTILE LIEES AU PANIER
function saveBasket(basket) {
    basket.sort(compareKanapName);
    localStorage.setItem("basket", JSON.stringify(basket));
}

function getBasket() {

    let basket = localStorage.getItem("basket");

    if (basket == null) {
        return [];

    } else {
        return JSON.parse(basket);
    }
}


function addProductsToBasket(product, productQuantity, productColor) {
    let basket = getBasket();
    product.color = productColor;
    let foundProduct = basket.find(p => {
        return (p._id == product._id && p.color == product.color)
    }); //chercher dans le panier si il y a un produit dont l'id est égal à l'id du produit que je veux ajouter
    //retourne l'élement en question si il trouve, sinon undefined.
    if (foundProduct != undefined) {
        foundProduct.quantity += productQuantity;
        console.log("go");
    } else {
        product.quantity = productQuantity;
        var productToSave = {
            _id: product._id,
            color: product.color,
            quantity: product.quantity,
            name: product.name


        }

        console.log(productToSave);
        basket.push(productToSave);
    }


    saveBasket(basket);

}

function removeFromBasket(product) {

    let basket = getBasket();
    //Filtre le tableau par rapport à une condition !! 
    basket = basket.filter(p => {
        return p._id != product._id || p.color != product.color;
    }); //Conserve tous les produits dont l'id est différent de l'id en question
    //en gros supprime le produit
    saveBasket(basket);

    actualiseTotalPriceAndQuantity(tabCanapePrice);
}

function changeQuantity(product, quantity, i) {
    let cartContentQuantity = document.querySelectorAll('.cart__item__content__settings__quantity p');

    let basket = getBasket();
    let foundProduct = basket.find(p => {
        return (p._id == product._id && p.color == product.color)
    });
    if (foundProduct != undefined) {
        foundProduct.quantity = quantity;
    }
    if (foundProduct.quantity <= 0) {
        removeFromBasket(foundProduct);
    } else {
        saveBasket(basket);
        cartContentQuantity[i].innerHTML = `Qté : ${foundProduct.quantity}`;


    }
    actualiseTotalPriceAndQuantity(tabCanapePrice);
}


////////fonctions pour actualiser la quantitée totale et le prix total
function actualiseTotalPriceAndQuantity(tabCanapePrice) {
    totalProductQuantity = getNumberProduct();
    totalPrice = getTotalPrice(tabCanapePrice);
    let cartPrice = document.querySelector(".cart__price");
    cartPrice.innerHTML = `<p>Total (<span id="totalQuantity">${totalProductQuantity}</span> articles) : <span id="totalPrice">${totalPrice}</span> €</p>`;
}





















/////////Ces fonctions ne marche plus vu je ne stocke pas le prix dans le panier 
function getNumberProduct() {
    let basket = getBasket();
    let number = 0;
    for (let product of basket) {
        number += parseInt(product.quantity);
    }

    return number;
}

function getTotalPrice(tabCanapePrice) {
    let basket = getBasket();
    let total = 0;
    let i = 0;

    for (let product of basket) {

        product.price = tabCanapePrice[i];
        total += product.quantity * product.price;
        i++;
    }
    return total;
}
/*
async function getProductPrice(product) {
    let response = await fetch(`http://localhost:3000/api/products/` + product._id);
    let product = await response.json();
    return product.price;
}*/