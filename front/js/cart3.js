var ListBasket = getBasket();

var ListBasketToDisplay;
var totalPrice = 0;
var totalProductQuantity = 0;
var tabCanapePrice = new Array();



/************ <!-- fonction pour afficher les articles du panier et on pour attacher des événements aux fonctions modifier et supprimer  --> *************/

async function displayAllBasketproducts(ListBasket) {

    if (ListBasket.length == 0) {
        displayEmptyBasket();

    } else {
        let itemBasketArticle = document.querySelector("#cart__items");
        for (let i = 0; i < ListBasket.length; i++) {

            result = await displayProductById(ListBasket, i);

            itemBasketArticle.innerHTML += result.codeHTML;
            tabCanapePrice[i] = result.canapePrice;


        };

        actualiseTotalPriceAndQuantity(tabCanapePrice);

        /************ <!--  Ajoute un addeventlistener pour chaque élément pour changer la quantité d'un produit--> *************/
        listenerToQuantityChange(ListBasket);

        /************ <!--  Ajoute un addeventlistener pour chaque élément pour supprimer un produit--> *************/
        listenerToRemoveFromBasket(ListBasket);

    }

}

/************ <!--  fonction qui permet de récupérer un produit grâce à son ID, et de retourner le code html permettant de l'afficher ainsi que le prix de produit--> *************/

async function displayProductById(ListBasket, i) {
    let response = await fetch(`http://localhost:3000/api/products/` + ListBasket[i]._id);
    let Canape = await response.json();

    //let itemBasketArticle = document.querySelector("#cart__items");

    //itemBasketArticle.innerHTML += displayOneBasketProduct(Canape, ListBasket[i].quantity, ListBasket[i].color);
    canapePrice = Canape.price;
    codeHTML = displayOneBasketProduct(Canape, ListBasket[i].quantity, ListBasket[i].color);
    let basketProduct = {
        canapePrice,
        codeHTML
    };
    return basketProduct;



};





/************ <!--  retourne le code HTMl pour afficher un produit--> *************/

const displayOneBasketProduct = function(Canape, CanapeQuantity, CanapeColor) {
    let result = `<article class="cart__item" data-id="${Canape._id}" data-color="${CanapeColor}">
    <div class="cart__item__img">
      <img src="${Canape.imageUrl}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${Canape.name}</h2>
        <p>${CanapeColor}</p>
        <p>${Canape.price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : ${CanapeQuantity}</p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${CanapeQuantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
    </article> `;

    return result;
}



displayAllBasketproducts(ListBasket);