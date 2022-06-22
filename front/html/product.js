/************ <!--  Définition d'une variable, en recherchant dans l'URl de page, 
 de idItem qui contient l'Id du produit que l'utilisateur a cliqué  --> *************/
var str = window.location.href;
console.log(str);
var url = new URL(str);
var idItem = url.searchParams.get("id");

/************ <!--  Promesse qui va rechercher 1 produit définit par son ID --> *************/
fetch(`http://localhost:3000/api/products/` + idItem)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(Canape) {


        let itemArticle = document.querySelector(".item article");

        itemArticle.innerHTML = displayItemCanape(Canape);

        const elt = document.querySelector('#addToCart');

        /************ <!--  Evenement listener ou on écoute le clic de l'utilsateur sur le bouton "Ajouter au panier"--> *************/
        elt.addEventListener("click", function(event) {
            var selectedcolor = getSelectedValue('colors');

            addProductsToBasket(Canape, getProductQuantity(), selectedcolor);

        })

    })
    .catch(function(err) {
        alert("Une erreur est survenue");
    })

/************ <!--  Promesse qui va rechercher 1 produit définit par son ID --> *************/

/**** <!--  Fonction pour afficher la couleur du produit --> ***/

const displayProductColor = function(Canape) {

    let result = "";
    for (let i = 0; i < Canape.colors.length; i++) {
        result += `<option value="${Canape.colors[i]}">${Canape.colors[i]}</option>`
    };

    return result;

}

/**** <!--  Fonction pour afficher le produit --> ***/
const displayItemCanape = function(Canape) {
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
                ${displayProductColor(Canape)}
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



/**** <!--  Fonction qui retourne la valeur du select selectId --> ***/

function getSelectedValue(selectId) {
    /**On récupère l'élement html <select>*/
    var selectElmt = document.getElementById(selectId);
    /**
    selectElmt.options correspond au tableau des balises <option> du select
    selectElmt.selectedIndex correspond à l'index du tableau options qui est actuellement sélectionné
    */
    return selectElmt.options[selectElmt.selectedIndex].value;
}

/**** <!--  Fonction qui retourne la quantité de produit selectionné --> ***/
function getProductQuantity() {
    var productQuantity = parseInt(document.getElementById("quantity").value, 10);
    return productQuantity;
}