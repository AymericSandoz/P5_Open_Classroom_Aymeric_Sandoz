 /************ <!--  Fonction qui permet de sauvegarder le panier dans le local storage, en le triant dans un premier temps--> *************/

 function saveBasket(basket) {
     basket.sort(compareKanapName);
     localStorage.setItem("basket", JSON.stringify(basket));
 }

 /************ <!--  Fonction pour trier le panier par ordre alphabétique, donc par nom de produits--> *************/

 function compareKanapName(a, b) {
     if (a.name.toLowerCase() < b.name.toLowerCase()) {
         return -1;
     }
     if (a.name.toLowerCase() > b.name.toLowerCase()) {
         return 1;
     }
     return 0;
 }

 /************ <!-- Fonction qui permet de récuperer le contenu du local storage, soit le panier--> *************/

 function getBasket() {

     let basket = localStorage.getItem("basket");

     if (basket == null) {
         return [];

     } else {
         return JSON.parse(basket);
     }
 }

 /************ <!--  fonction qui permet d'ajouter des articles dans le panier--> *************/

 function addProductsToBasket(product, productQuantity, productColor) {
     let basket = getBasket();
     product.color = productColor;
     let foundProduct = basket.find(p => {
         return (p._id == product._id && p.color == product.color)
     });
     if (foundProduct != undefined) {
         foundProduct.quantity += productQuantity;

     } else if (productQuantity > 0) {
         product.quantity = productQuantity;
         var productToSave = {
             _id: product._id,
             color: product.color,
             quantity: product.quantity,
             name: product.name


         }

         basket.push(productToSave);
     }


     saveBasket(basket);

 }

 /************ <!--  fonction qui permet de supprimer des articles du panier--> *************/
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

 /************ <!--  fonction qui de modifier la quantité d'un articles présent dans le panier --> *************/
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

 /************ <!--  fonctions pour afficher  la quantité totale et le prix total--> *************/

 function actualiseTotalPriceAndQuantity(tabCanapePrice) {
     totalProductQuantity = getNumberProduct();
     totalPrice = getTotalPrice(tabCanapePrice);
     let cartPrice = document.querySelector(".cart__price");
     cartPrice.innerHTML = `<p>Total (<span id="totalQuantity">${totalProductQuantity}</span> articles) : <span id="totalPrice">${totalPrice}</span> €</p>`;
 }


 /************ <!--  fonction pour calculer la quantité total d'article dans le panier --> *************/

 function getNumberProduct() {
     let basket = getBasket();
     let number = 0;
     for (let product of basket) {
         number += parseInt(product.quantity);
     }

     return number;
 }

 /************ <!--  fonctions pour calculer le prix total--> *************/

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

 /************ <!--  fonctions pour trier les articles du panier par nom--> *************/

 function compareKanapName(a, b) {
     if (a.name.toLowerCase() < b.name.toLowerCase()) {
         return -1;
     }
     if (a.name.toLowerCase() > b.name.toLowerCase()) {
         return 1;
     }
     return 0;
 }



 function clearBasket(basket) {
     localStorage.clear();
     basket = getBasket();
 }