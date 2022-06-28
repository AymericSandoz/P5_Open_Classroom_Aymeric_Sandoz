/************ <!--  Promesse pour récupérer la liste de l'ensemble des articles --> *************/
fetch('http://localhost:3000/api/products')
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(listOfProducts) {


        let items = document.getElementById('items');

        items.innerHTML = displayAllProducts(listOfProducts);


    })
    .catch(function(err) {
        // Une erreur est survenue
    });


/************ <!--  Fonction permettant d'afficher un produit(canapé) sur la page d'acceuil --> *************/
const displayOneProduct = function(Canape) {
    let result = `   <a href="./product.html?id=${Canape._id}">      
    <article>
      <img src="${Canape.imageUrl}" alt="${Canape.altTxt}">
      <h3 class="productName">${Canape.name}</h3>
      <p class="productDescription">${Canape.description}</p>
    </article>
  </a> `;

    return result;
}

/************ <!--  Fonction permettant d'afficher l'ensemble des produits sur la page d'acceuil --> *************/
const displayAllProducts = function(listOfProducts) {
    let result = "";
    for (let i = 0; i < listOfProducts.length; i++) {
        result += displayOneProduct(listOfProducts[i]);
    };
    return result;
}