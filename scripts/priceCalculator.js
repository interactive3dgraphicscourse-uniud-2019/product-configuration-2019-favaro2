var doorPrice = 200;
var handlePrice = 230;

function calcPrice(){
  var price = doorPrice + handlePrice;
  document.getElementById('price').innerHTML = "";
  document.getElementById('price').innerHTML = "Prezzo: " + price + " €";
}
