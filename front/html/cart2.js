let ListBasket = getBasket();

var ListBasketToDisplay;
var totalPrice = 0;
var totalProductQuantity = 0;

for (let i = 0; i < ListBasket.length; i++) {
    fetch(`http://localhost:3000/api/products/` + ListBasket[i]._id)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(Canape) {



            let itemBasketArticle = document.querySelector("#cart__items");
            ///  ListBasketToDisplay += AfficherCanapePageProduit(Canape, ListBasket[i].quantity, ListBasket[i].color);  
            ///QUESTION MENTOR : COmment faire pour accéder à ListBasketToDIsplay en dehors du fetch
            itemBasketArticle.innerHTML += AfficherCanapePageProduit(Canape, ListBasket[i].quantity, ListBasket[i].color);

            ////Partie pour calculer le prix
            totalPrice += ListBasket[i].quantity * Canape.price;

            ///////////: Partie pour calculer laa quantité totale
            totalProductQuantity += ListBasket[i].quantity;
            console.log(totalProductQuantity);
            ////QUESTION MENTOR : COmment récup totalprice et totalquantity en dehors du fetch
            let cartPrice = document.querySelector(".cart__price");
            cartPrice.innerHTML = `<p>Total (<span id="totalQuantity">${totalProductQuantity}</span> articles) : <span id="totalPrice">${totalPrice}</span> €</p>
            `

        })
        .catch(function(err) {
            // Une erreur est survenue
        });


};
console.log(totalProductQuantity);






//<p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice"><!-- 84,00 --></span> €</p>





const AfficherCanapePageProduit = function(Canape, CanapeQuantity, CanapeColor) {
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