// Script.js
var cartlist =  new Set();
var Counter = document.getElementById('cart-count');

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('data') === null) {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => { localStorage.setItem('data', JSON.stringify(data));
      loadfunction();
      Counter.innerText = cartlist.size;
      });
  }else {
    loadfunction();
    Counter.innerText = cartlist.size;
  }
});

function loadfunction(){
  var products = JSON.parse(localStorage.getItem('data'));
  var productList = document.getElementById('product-list');
  cartlist = new Set(JSON.parse(localStorage.getItem("Cart")));
  for(let i = 0; i < products.length; i++){
    let product = document.createElement('product-item');
    productList.appendChild(product); 
    product.setIteminfo(products[i]); 
  }
 
}
