var doorPrice = 199.99;
var handlePrice = 35.99;

function calcPrice(){
  var price = doorPrice + handlePrice;
  document.getElementById('price').innerHTML = "";
  document.getElementById('price').innerHTML = "Prezzo: " + price.toFixed(2) + " €";
}
