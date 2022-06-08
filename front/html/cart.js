//Voir tuto training Dev Youtube  
///////////TOUTES LES FONCTIONS UTILE LIEES AU PANIER
function saveBasket(basket) {


    //console.log(basket[0]._id);
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

function addToBasket(product) {
    let basket = getBasket();

    product.color = product.colors[1]; //à régler ensuite pour que l'utilisateur choisisse vraiment sa couleur
    let foundProduct = basket.find(p => {
        return (p._id == product._id && p.color == product.color)
    }); //chercher dans le panier si il y a un produit dont l'id est égal à l'id du produit que je veux ajouter
    //retourne l'élement en question si il trouve, sinon underfined.
    if (foundProduct != undefined) {
        foundProduct.quantity++;
    } else {
        product.quantity = 1;
        basket.push(product);
    }


    saveBasket(basket);
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
            quantity: product.quantity

        }

        console.log(productToSave);
        basket.push(productToSave);
    }


    saveBasket(basket);

}

function removeFromBasket(product) { /////// QUESTION MENTOR

    let basket = getBasket();
    //Filtre le tableau par rapport à une condition !! 
    poubelle = basket.filter(p => p._id != product._id && p.color != product.color); //Conserve tous les produits dont l'id est différent de l'id en question
    //en gros supprime le produit
    saveBasket(basket);
}

function changeQuantity(product, quantity) {
    let basket = getBasket();
    let foundProduct = basket.find(p => {
        return (p._id == product._id && p.color == product.color)
    });
    if (foundProduct != undefined) {
        foundProduct.quantity += quantity;
    }
    if (foundProduct.quantity <= 0) {
        removeFromBasket(foundProduct);
    } else {
        saveBasket(basket); //sinon le if à la ligne d'avant le marche pas 
    }
}



/////////Ces fonctions ne marche plus vu je ne stocke pas le prix dans le panier 
function getNumberProduct() {
    let basket = getBasket();
    let number = 0;
    for (let product of basket) {
        number += product.quantity;
    }

    return number;
}

function getTotalPrice() {
    let basket = getBasket();
    let total = 0;
    for (let product of basket) {
        total += product.quantity * product.price;
    }
    return total;
}