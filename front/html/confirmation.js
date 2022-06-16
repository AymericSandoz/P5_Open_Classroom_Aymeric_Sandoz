var str = window.location.href;

var url = new URL(str);
var idOrder = url.searchParams.get("id");
console.log(idOrder);

let confirmation = document.querySelector("#orderId");

confirmation.innerHTML = `${idOrder}`
;

