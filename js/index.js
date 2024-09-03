const bar = document.querySelector(".bar");
const nav = document.querySelector(".navbar");
const login = document.querySelector(".login");
const close = document.getElementById("close");
const setting = document.getElementById("setting");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}
if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}
if (setting) {
  setting.addEventListener("click", () => {
    login.classList.add("active");
  });
}
// Define global variables
let products = [];
let products_cart = [];

// Function to render products on index.html
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
    button.addEventListener("click", (e) => {
      e.preventDefault();
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

// Load products and set up the page
document.addEventListener("DOMContentLoaded", () => {
  fetch("js/items.json")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      renderProducts();
    });
});
