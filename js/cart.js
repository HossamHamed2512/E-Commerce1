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
