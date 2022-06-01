var str = window.location.href;
console.log(str);
var url = new URL(str);
var idItem = url.searchParams.get("id");

fetch(`http://localhost:3000/api/products/` + idItem)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(Canape) {


        let itemArticle = document.querySelector(".item article");

        itemArticle.innerHTML = afficherItemCanape(Canape);

    })
    .catch(function(err) {
        // Une erreur est survenue
    })




const elt = document.getElementById('title');
console.log(elt); // On récupère l'élément sur lequel on veut détecter le clic
elt.addEventListener("click", function(event) { // On écoute l'événement click
    event.preventDefault();
    console.log("Bouton clické !");
})


/*fonctions pour insérer les élements de la page produits à partir de la liste de canapé*/

const afficherProductColor = function(Canape) {

    let result = "";
    for (let i = 0; i < Canape.colors.length; i++) {
        result += `<option value="${Canape.colors[i]}">${Canape.colors[i]}</option>`
    };

    return result;

}


const afficherItemCanape = function(Canape) {
    let result = `
    <div class="item__img">
        <img src="${Canape.imageUrl}" alt="Photographie d'un canapé"> 
    </div>
    <div class="item__content">

        <div class="item__content__titlePrice">
            <h1 id="title">
                ${Canape.name} 
            </h1>
            <p>Prix : <span id="price"> ${Canape.price} </span>€</p>
        </div>

        <div class="item__content__description">
            <p class="item__content__description__title">Description :</p>
            <p id="description">
                 ${Canape.description} 
            </p>
        </div>

        <div class="item__content__settings">
            <div class="item__content__settings__color">
                <label for="color-select">Choisir une couleur :</label>
                <select name="color-select" id="colors">
                ${afficherProductColor(Canape)}
  </select>
            </div>

            <div class="item__content__settings__quantity">
                <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
            </div>
        </div>

        <div class="item__content__addButton">
            <button id="addToCart">Ajouter au panier</button>
        </div>

    </div>`;

    return result;

}