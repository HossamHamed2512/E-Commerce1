let products = [];
let products_cart = [];

function renderProducts() {
  let container1 = document.querySelector(".container1");
  let container2 = document.querySelector(".container2");

  container1.innerHTML = "";
  container2.innerHTML = "";

  products.forEach((product, i) => {
    let container = i < products.length - 8 ? container1 : container2;
    container.innerHTML += `
      <div class="pro">
        <img src="${product.img}" alt="${product.name}">
        <div class="des">
          <span>${product.category}</span>
          <h5>${product.name}</h5>
          <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h4>${product.price}</h4>
        </div>
        <a href="#" data-index="${i}" class="add-to-cart">
          <i class="fa-solid fa-cart-shopping cart"></i>
        </a>
      </div>`;
  });
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      let index = button.getAttribute("data-index");
      AddToCart(index);
    });
  });
}
function AddToCart(index) {
  let product = products[index];
  if (product) {
    let existingProduct = products_cart.find((p) => p.name === product.name);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      products_cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("products_cart", JSON.stringify(products_cart));

    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `${product.name} has been added to your cart.`,
      confirmButtonText: "OK",
      position: "center",
      timer: 500,
      timerProgressBar: true,
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("js/items.json")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      renderProducts(); // Call renderProducts to display products
    })
    .catch((error) => console.error("Error loading products:", error));
});


// Function to update the cart UI
function updateCartUI() {
  let item_in_cart = document.querySelector(".item_in_cart");
  if (item_in_cart) {
    if (products_cart.length === 0) {
      item_in_cart.innerHTML = "<p>No Items Added</p>";
    } else {
      item_in_cart.innerHTML = `
        <table>
          <thead>
            <tr>
              <td>Remove</td>
              <td>Image</td>
              <td>Product</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Total</td>
            </tr>
          </thead>
          <tbody>
            ${products_cart
              .map(
                (product, i) => `
              <tr>
                <td><a class="remove" data-index="${i}"><i class="fa-regular fa-circle-xmark"></i></a></td>
                <td><img src="${product.img}" alt="${product.name}"></td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>
                  <input type="number" value="${
                    product.quantity
                  }" min="1" data-index="${i}" class="quantity">
                </td>
                <td>${(product.price * product.quantity).toFixed(2)}</td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>

      `;
    }
    updateCartTotals();
    // Add event listeners for remove and quantity change buttons
    document.querySelectorAll(".remove").forEach((button) => {
      button.addEventListener("click", () => {
        let index = button.getAttribute("data-index");
        removeFromCart(index);
      });
    });
    document.querySelectorAll(".quantity").forEach((input) => {
      input.addEventListener("change", () => {
        let index = input.getAttribute("data-index");
        let quantity = parseInt(input.value, 10);
        updateSubtotal(index, quantity);
      });
    });
  }
}

// Function to remove a product from the cart
function removeFromCart(index) {
  products_cart.splice(index, 1);
  localStorage.setItem("products_cart", JSON.stringify(products_cart));
  updateCartUI();
}

// Function to update subtotal for a product
function updateSubtotal(index, quantity) {
  if (quantity < 1) quantity = 1;
  products_cart[index].quantity = quantity;
  localStorage.setItem("products_cart", JSON.stringify(products_cart));
  updateCartUI();
}

// Function to update cart totals
function updateCartTotals() {
  let total = products_cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  let cartTotals = document.querySelector(".subtotal");
  if (cartTotals) {
    cartTotals.innerHTML = `
      <h3>Cart Totals</h3>
            <table>

                <tr>
                    <td>Cart Subtotal</td>
                    <td>${total.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Shipping</td>
                    <td>Free</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td>${total.toFixed(2)}</td>
                </tr>

            </table>
                      <button class="normal">Proced To CheckOut</button>

    `;
  }
}

// Load cart data and update UI
document.addEventListener("DOMContentLoaded", () => {
  let cartData = localStorage.getItem("products_cart");
  if (cartData) {
    products_cart = JSON.parse(cartData);
  }
  updateCartUI();
});




