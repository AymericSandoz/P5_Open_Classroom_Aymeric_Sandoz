var str = window.location.href;
var url = new URL(str);
var idOrder = url.searchParams.get("id");

let confirmation = document.querySelector(".confirmation");

confirmation.innerHTML = `<div class="confirmation">
<p> Commande validée !  <br>Votre numéro de commande est : <span id="orderId">${idOrder}</span> <br> Merci pour votre commande.</p>

</div>`;