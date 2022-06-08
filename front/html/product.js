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

        const elt = document.querySelector('#addToCart');
        console.log(elt); // On récupère l'élément sur lequel on veut détecter le clic

        ////////QUESTION MENTOR : POURQUOI ON PEUT PAS METTRE ADDEVENTLISTENER EN DEHORS DU FETCH ? 
        elt.addEventListener("click", function(event) { // On écoute l'événement click
            event.preventDefault();
            console.log("Bouton clické !");
            console.log(Canape);


            var selectedcolor = getSelectValue('colors');

            addProductsToBasket(Canape, getProductQuantity(), selectedcolor);

        })

    })
    .catch(function(err) {
        // Une erreur est survenue
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



//////Pour récupérer la couleur du canapé et le nombre d'article désiré avant de cliquer sur ajouter sur le panier

/**Retourne la valeur du select selectId*/
function getSelectValue(selectId) {
    /**On récupère l'élement html <select>*/
    var selectElmt = document.getElementById(selectId);
    /**
    selectElmt.options correspond au tableau des balises <option> du select
    selectElmt.selectedIndex correspond à l'index du tableau options qui est actuellement sélectionné
    */
    return selectElmt.options[selectElmt.selectedIndex].value;
}

function getProductQuantity() {
    var productQuantity = parseInt(document.getElementById("quantity").value, 10);
    return productQuantity;
}