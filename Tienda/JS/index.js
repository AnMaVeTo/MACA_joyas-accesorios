const btnCard = document.querySelector(".icont-cart");
const containerCardProducts = document.querySelector(
  ".container-cart-products"
);

btnCard.addEventListener("click", () => {
  containerCardProducts.classList.toggle("hidden-cart");
});

/* ############################## */
const cartInfo = document.querySelector(".cart-product");
const rowProduct = document.querySelector(".row-product");

// Lista de todos los contenedores de productos
const productsList = document.querySelectorAll(".item-container");

// Variable de arreglos de productos
let allProducts = [];

const valorTotal = document.querySelector(".total");
const countProducts = document.querySelector("#contador-productos");

// Define removeProduct fuera de showHTML
// Define removeProduct fuera de showHTML
function removeProduct(index) {
  // Eliminar el producto del array allProducts
  allProducts.splice(index, 1);

  // Volver a mostrar los productos en el DOM
  showHTML();
}

const showHTML = () => {
  if (!allProducts.length) {
    containerCardProducts.innerHTML = `
      <p class="cart-empty">El carrito está vacío</p>
    `;
  } else {
    rowProduct.innerHTML = "";
    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach((product, index) => {
      const containerProduct = document.createElement("div");
      containerProduct.classList.add("cart-product");

      const price = product.price.replace(/\./g, "").slice(1);
      const subtotal = parseInt(product.quantity * price);
      total += subtotal;

      containerProduct.innerHTML = `
        <div class="info-cart-product delete_${index}">
          <span class="catidad-producto-carrito">${product.quantity}</span>
          <p class="titulo-carrito-producto">${product.title}</p>
          <span class="precio-producto-carrito">${subtotal}</span>
        </div>
        <div class="icon close" onclick="removeProduct(${index})">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="icon-close">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
      `;

      rowProduct.append(containerProduct);
      totalOfProducts += product.quantity; // Incrementar el contador de productos
    });

    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;
  }
};

productsList.forEach((product) => {
  product.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart-btn")) {
      const product = e.target.parentElement;

      const infoProduct = {
        quantity: 1,
        title: product.querySelector("h2").textContent,
        price: product.querySelector("p").textContent,
      };

      const exist = allProducts.some(
        (product) => product.title === infoProduct.title
      );

      if (exist) {
        const products = allProducts.map((product) => {
          if (product.title === infoProduct.title) {
            product.quantity++;
            return product;
          } else {
            return product;
          }
        });

        allProducts = [...products];
      } else {
        allProducts = [...allProducts, infoProduct];
      }

      showHTML();
    }
  });
});

rowProduct.addEventListener("click", (e) => {
  if (e.target.classList.contains("icon.close")) {
    const product = e.target.parentElement;
    const title = product.querySelector("p").textContent;

    allProducts = allProducts.filter((product) => product.title !== title);

    showHTML();
  }
});
