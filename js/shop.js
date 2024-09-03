fetch("js/items.json")
  .then((response) => response.json())
  .then((data) => {
    let shop_container = document.querySelector(".shop_container");
    let products = data;

    for (let i = 0; i < products.length; i++) {
      shop_container.innerHTML += `
  <div class ="pro" onclick="window.location.href='sproduct.html'">
            <img src="${products[i].img}" alt="">
            <div class="des">
                <span>${products[i].category}</span>
                <h5>${products[i].name}</h5>
                <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h4>${products[i].price}</h4>
            </div>
            <a href="#"><i class="fa-solid fa-cart-shopping  add-to-cart"></i></a>
       
        </div>`;
    }
  });

var MainImg = document.getElementById("MainImg");
var Smallimg = document.getElementsByClassName("small-img");

Smallimg[0].onclick = function () {
  MainImg.src = Smallimg[0].src;
};
Smallimg[1].onclick = function () {
  MainImg.src = Smallimg[1].src;
};
Smallimg[2].onclick = function () {
  MainImg.src = Smallimg[2].src;
};
Smallimg[3].onclick = function () {
  MainImg.src = Smallimg[3].src;
};
