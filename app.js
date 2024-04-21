//* SELECT ELEMENT:

const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsIncart = document.querySelector(".total-items-in-cart");

//* RENDER PRODUCTS:

function renderProducts() {
  products.forEach((product) => {
    productsEl.innerHTML += `<div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="t-shirt 1">
                    </div>
                    <div class="desc">
                        <h2>${product.name}</h2>
                        <h2><small>$</small>${product.price}</h2>
                        <p>
                           ${product.description}
                        </p>
                    </div>
                    <div class="add-to-wishlist">
                        <img src="./icons/heart.png" alt="add to wish list">
                    </div>
                    <div class="add-to-cart" onclick="addToCart(${product.id})">
                        <img src="./icons/bag-plus.png" alt="add to cart">
                    </div>
                </div>
            </div>`;
  });
}

renderProducts();

//* CART ARRAY:

let cart = JSON.parse(localStorage.getItem("CART", JSON)) || [];
updateCart()

//* ADD TO CART:

function addToCart(id) {
  // check product already exist in cart
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id); //  in alert replacement
  } else {
    const item = products.find((product) => product.id === id);
    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }
  updateCart();
}

//* UPDATE CART:

function updateCart() {
  renderCartItems();
  renderSubtotal();

  //* update cart to locaal storage
  
  localStorage.setItem("CART" , JSON.stringify(cart))
}

//* RENDER SUBTOTAL:

function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subtotalEl.innerHTML = ` Subtotal (${totalItems} items): $${Math.round(
    totalPrice
  )}`;
  totalItemsIncart.innerHTML = `${totalItems}`
}

//* RENDER CART ITEMS:

function renderCartItems() {
  cartItemsEl.innerHTML = ""; // clear cart elemts (duplicate hoky jo cart mai arhy thy items)
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
    <div class="cart-item">
                    <div class="item-info" onclick="removeItemFromCart(${item.id})">
                        <img src="${item.imgSrc}" alt="${item.name}">
                        <h4>${item.name}</h4>
                    </div>
                    <div class="unit-price">
                        <small>$</small>${item.price}
                    </div>
                    <div class="units">
                        <div class="btn minus" onclick="changeNumberOfUnits('minus' , ${item.id})">-</div>
                        <div class="number">${item.numberOfUnits}</div>
                        <div class="btn plus" onclick="changeNumberOfUnits('plus' , ${item.id})">+</div>           
                    </div>
                </div>`;
  });
}

//* REMOVE CART ITEMS FROM CART:

function removeItemFromCart(id){
   cart = cart.filter((item)=> item.id !== id)
updateCart()
  
}

//* CHANGE NUMBER OF UNITS FOR AN ITEM

function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }
    return {
      ...item,
      numberOfUnits,
    };
  });
  updateCart();
}

//* PROCEED TO CHECKOUT:

function proceed() {
 subtotalEl.innerHTML = ` Subtotal (${"0"} items): $${"0"}`;
 totalItemsIncart.innerHTML = `${"0"}`;
 cartItemsEl.innerHTML = "";

swal({
    title: "Good job!",
    text: "You Order Proceed Sucessfully!",
    icon: "success",
    button: "Aww yiss!",
});
}
