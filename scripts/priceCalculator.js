var doorPrice = 200;
var handlePrice = 20;

function calcPrice(){
  var price = doorPrice + handlePrice;
  document.getElementById('price').innerHTML = "";
  document.getElementById('price').innerHTML = "Prezzo: " + price + " €";
}
