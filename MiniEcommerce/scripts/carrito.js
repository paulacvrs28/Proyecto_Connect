let productosCarrito = localStorage.getItem("productos__en__carrito");
  productosCarrito = JSON.parse(productosCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito__vacio");
const contenedorCarritoProductos = document.querySelector("#carrito__productos");
const ContenedorCarritoAcciones = document.querySelector("#carrito__acciones");
const contenedorCarritoComprado = document.querySelector("#carrito__comprado");
let BotonesEliminar = document.querySelectorAll("#carrito__producto__eliminar");
let botonVaciarCarrito = document.querySelector("#carrito__acciones__vaciar");
const contenedorTotal = document.querySelector("#Total"); 
const botonComprar = document.querySelector("#carrito__acciones__comprar"); 


function cargarProductosCarrito(){
if (productosCarrito && productosCarrito.length > 0){

 contenedorCarritoVacio.classList.add("disabled");
 contenedorCarritoProductos.classList.remove("disabled");
 ContenedorCarritoAcciones.classList.remove("disabled");
 contenedorCarritoComprado.classList.add("disabled");

 contenedorCarritoProductos.innerHTML = "";

productosCarrito.forEach(producto => {
    
 const div= document.createElement("div");
 div.classList.add("carrito__producto");
 div.innerHTML =  `    
 <img class="carrito__producto__imagen" src="${producto.imagen}" alt="${producto.titulo}">
    <div class="carrito__producto__titulo">    
   <small>titulo</small>
            <h3>${producto.titulo}</h3>
        </div>
        <div class="carrito__producto__titulo">
            <small>cantidad</small>
            <p>${producto.cantidad}</p>
        </div>
        <div class="carrito__producto__precio">
            <small>Precio</small>
            <p>$${producto.precio}</p>
        </div>
        <div class="carrito__producto__subtotal">
            <small>Subtotal</small>
            <p>$${producto.precio * producto.cantidad}</p>
        </div>
        <button class="carrito__producto__eliminar" id="${producto.id}"><i class="bi bi-trash3-fill"></i>
            </button>`;

            contenedorCarritoProductos.append(div);
})
}else{
   

 contenedorCarritoVacio.classList.remove("disabled");
 contenedorCarritoProductos.classList.add("disabled");
 ContenedorCarritoAcciones.classList.add("disabled");
 contenedorCarritoComprado.classList.add("disabled");
}
   ActulizarBotonesEliminar();
   ActualizarTotal();
}

cargarProductosCarrito();


function ActulizarBotonesEliminar(){
    BotonesEliminar = document.querySelectorAll(".carrito__producto__eliminar");
    BotonesEliminar.forEach(boton => {
        boton.addEventListener("click", EliminarDelCarrito);
    });
}

function EliminarDelCarrito(e){
    let idBoton = e.currentTarget.id;
    const index = productosCarrito.findIndex(producto => producto.id === idBoton);
    productosCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos__en__carrito", JSON.stringify(productosCarrito));
}

botonVaciarCarrito.addEventListener("click", vaciarCarrito );
 function vaciarCarrito(){
   productosCarrito.length = 0;
   localStorage.setItem("productos__en__carrito", JSON.stringify(productosCarrito));
   cargarProductosCarrito();
}

function ActualizarTotal(){
   const totalCalculado =  productosCarrito.reduce((acc, producto) => acc +(producto.precio * producto.cantidad), 0);
   Total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito );
 function comprarCarrito(){
   productosCarrito.length = 0;
   localStorage.setItem("productos__en__carrito", JSON.stringify(productosCarrito));

 contenedorCarritoVacio.classList.add("disabled");
 contenedorCarritoProductos.classList.add("disabled");
 ContenedorCarritoAcciones.classList.add("disabled");
 contenedorCarritoComprado.classList.remove("disabled");
}
  


