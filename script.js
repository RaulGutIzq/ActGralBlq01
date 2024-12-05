// Declaración de variables
let cart = []; // Array para almacenar los productos del carrito
const cartItems = document.getElementById("cart-items"); // Contenedor para los productos del carrito
const cartTotal = document.getElementById("cart-total"); // Elemento para mostrar el total del carrito
const cartCount = document.getElementById("cart-count"); // Badge que muestra la cantidad de productos en el carrito

// Función para actualizar el total del carrito
function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = `$${total}`;
  cartCount.textContent = cart.length;
}

// Función para agregar un producto al carrito
function addToCart(name, price) {
  // Verificar si el total supera $1000
  const currentTotal = cart.reduce((sum, item) => sum + item.price, 0);
  if (currentTotal + price > 1000) {
    alert("No puedes exceder el límite de 1000€.");
    return;
  }

  // Crear el producto
  const product = { name, price };
  cart.push(product);

  // Actualizar DOM (añadir producto al carrito visual)
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";
  li.textContent = `${name} - ${price}€`;
  li.addEventListener("click", () => removeFromCart(product, li)); // Hacer clic para eliminar
  cartItems.appendChild(li);

  // Actualizar total
  updateCartTotal();
}

// Función para eliminar un producto del carrito
function removeFromCart(product, element) {
  // Eliminar el producto del array
  cart = cart.filter((item) => item !== product);

  // Eliminar el elemento del DOM
  element.remove();

  // Actualizar el total
  updateCartTotal();
}

// Función para vaciar el carrito
function clearCart() {
  if (cart.length === 0) {
    alert("El carrito ya está vacío.");
    return;
  }

  // Vaciar el carrito
  cart = [];
  cartItems.innerHTML = ""; // Limpiar el DOM
  updateCartTotal();
}

// Evento para vaciar el carrito
document.getElementById("clear-cart").addEventListener("click", clearCart);

// Agregar eventos a los botones "Añadir al Carrito"
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));
    addToCart(name, price);
  });
});

// Evitar que el dropdown se cierre al hacer clic en elementos dentro de él
document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
    dropdown.addEventListener('click', function(event) {
      event.stopPropagation();
    });
  });
  
  // Cerrar el dropdown al hacer clic fuera de él
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.dropdown-menu') && !event.target.closest('#cart-button')) {
      const dropdowns = document.querySelectorAll('.dropdown-menu.show');
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('show');
      });
    }
  });
  