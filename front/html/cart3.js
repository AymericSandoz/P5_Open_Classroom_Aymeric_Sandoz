var ListBasket = getBasket();

var ListBasketToDisplay;
var totalPrice = 0;
var totalProductQuantity = 0;
var tabCanapePrice = new Array();



/************ <!-- fonction pour afficher les articles du panier --> *************/

async function displayAllBasketproducts(ListBasket) {
    for (let i = 0; i < ListBasket.length; i++) {



        canapePrice = await fetchProductById(ListBasket, i);
        tabCanapePrice[i] = canapePrice;


    };

    actualiseTotalPriceAndQuantity(tabCanapePrice);


    /************ <!--  Ajoute un addeventlistener pour chaque élément pour changer la quantité d'un produit--> *************/

    let selectElement = document.getElementsByClassName('itemQuantity');

    for (let i = 0; i < selectElement.length; i++) {
        selectElement[i].addEventListener('change', (event) => {

            let inputChange = selectElement[i].value;
            changeQuantity(ListBasket[i], inputChange, i);



        });
    }

    /************ <!--  Ajoute un addeventlistener pour chaque élément pour supprimer un produit--> *************/

    const itemToDelete = document.getElementsByClassName('deleteItem');

    for (let i = 0; i < itemToDelete.length; i++) {
        itemToDelete[i].addEventListener('click', (event) => {
            itemToDelete[i].closest('article').style.display = 'none';
            removeFromBasket(ListBasket[i]);

        });
    }

}

/************ <!--  fonction qui permet de récupérer un produit grâce à son ID--> *************/

async function fetchProductById(ListBasket, i) {
    let response = await fetch(`http://localhost:3000/api/products/` + ListBasket[i]._id);
    let Canape = await response.json();

    let itemBasketArticle = document.querySelector("#cart__items");

    itemBasketArticle.innerHTML += displayBasketProduct(Canape, ListBasket[i].quantity, ListBasket[i].color);

    return Canape.price;



};





/************ <!--  Ajoute un addeventlistener pour chaque élément pour changer la quantité d'un produit--> *************/

const displayBasketProduct = function(Canape, CanapeQuantity, CanapeColor) {
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