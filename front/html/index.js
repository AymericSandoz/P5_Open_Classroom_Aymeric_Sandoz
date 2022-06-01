let CanapeID;

fetch('http://localhost:3000/api/products')
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(ListCanape) {


        let items = document.getElementById('items');



        items.innerHTML = AfficherTousLesCanapes(ListCanape);
        console.log(ListCanape);

    })
    .catch(function(err) {
        // Une erreur est survenue
    });



const AfficherCanape = function(Canape) {
    let result = `   <a href="./product.html?id=${Canape._id}">      
    <article>
      <img src="${Canape.imageUrl}" alt="${Canape.altTxt}">
      <h3 class="productName">${Canape.name}</h3>
      <p class="productDescription">${Canape.description}</p>
    </article>
  </a> `;

    return result;
}


const AfficherTousLesCanapes = function(ListCanape) {
    let result = "";
    for (let i = 0; i < ListCanape.length; i++) {
        result += AfficherCanape(ListCanape[i]);
    };
    return result;
}