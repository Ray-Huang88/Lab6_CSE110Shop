//product-item.js
class ProductItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    let shadow = this.shadowRoot;

    const productList= shadow.appendChild (document.createElement ('li'));
    productList.setAttribute('class', 'product');

    const image = productList.appendChild (document.createElement ('img'));

    const title = productList.appendChild (document.createElement ('p'));
    title.setAttribute('class', 'title');

    const price = productList.appendChild (document.createElement ('p'));
    price.setAttribute('class', 'price');

    const button = productList.appendChild (document.createElement ('button'));
    button.innerHTML = "Add to Cart";
    button.addEventListener("click", function () {
      let itemId = button.parentElement.dataset.id;
      if (button.innerText == 'Add to Cart') {
        button.innerText = 'Remove from Cart';
        alert('Added to Cart!');
        cartlist.add(itemId);
        Counter.innerText= cartlist.size;
      }
      else {
        button.innerText = 'Add to Cart';
        alert('Remove from Cart!');
        cartlist.delete(itemId);
        Counter.innerText= cartlist.size;
      }
      localStorage.setItem('cartlist', JSON.stringify(Array.from(cartlist)));
    })

    let style = shadow.appendChild (document.createElement('style'));
        style.textContent = 
        `
        .price {
          color: green;
          font-size: 1.8em;
          font-weight: bold;
          margin: 0;
        }
        
        .product {
          align-items: center;
          background-color: white;
          border-radius: 5px;
          display: grid;
          grid-template-areas: 
          'image'
          'title'
          'price'
          'add';
          grid-template-rows: 67% 11% 11% 11%;
          height: 450px;
          filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
          margin: 0 30px 30px 0;
          padding: 10px 20px;
          width: 200px;
        }
        
        .product > button {
          background-color: rgb(255, 208, 0);
          border: none;
          border-radius: 5px;
          color: black;
          justify-self: center;
          max-height: 35px;
          padding: 8px 20px;
          transition: 0.1s ease all;
        }
        
        .product > button:hover {
          background-color: rgb(255, 166, 0);
          cursor: pointer;
          transition: 0.1s ease all;
        }
        
        .product > img {
          align-self: center;
          justify-self: center;
          width: 100%;
        }
        
        .title {
          font-size: 1.1em;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .title:hover {
          font-size: 1.1em;
          margin: 0;
          white-space: wrap;
          overflow: auto;
          text-overflow: unset;
        }
        `
  }

  setIteminfo(itemdata) {
    let item = this.shadowRoot.firstChild;

    let itemImage = item.getElementsByTagName ('img')[0];
        itemImage.src = itemdata.image;
        itemImage.alt = itemdata.title;

    let itemTitle = item.getElementsByClassName ('title')[0];
        itemTitle.innerHTML = itemdata.title;

    let itemPrice = item.getElementsByClassName ('price')[0];
        itemPrice.innerHTML = itemdata.price;

    item.dataset.id = itemdata.id;
  }

}

customElements.define('product-item', ProductItem);
