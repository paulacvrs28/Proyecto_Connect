//Productos

const productos = [
    //Balones
    {
        id: "Balon-01",
        titulo:"Balon Spalding",
        imagen:"../assets/img/Balones/Balon01.webp",
        categoria:{
            nombre:"Balones",
            id:"Balones"
        },
        precio:350000
    },
    {
        id: "Balon-02",
        titulo:"Balon Molten",
        imagen:"../assets/img/Balones/Balon02.jpeg",
        categoria:{
            nombre:"Balones",
            id:"Balones"
        },
        precio:250000
    },
    {
        id: "Balon-03",
        titulo:"Balon Golty",
        imagen:"../assets/img/Balones/Balon03.webp",
        categoria:{
            nombre:"Balones",
            id:"Balones"
        },
        precio:90000
    },
    {
        id: "Balon-04",
        titulo:"Balon Wilson",
        imagen:"../assets/img/Balones/Balon01.webp",
        categoria:{
            nombre:"Balones",
            id:"Balones"
        },
        precio:200000
    },
// Zapatillas

{
        id: "Tenis-01",
        titulo:"Tenis Kyrie Irving",
        imagen:"../assets/img/tenis/imagen1.jpeg",
        categoria:{
            nombre:"Tenis",
            id:"Tenis"
        },
        precio:350000
    },
    {
        id: "Tenis-02",
        titulo:"Teni Jordan 22",
        imagen:"../assets/img/tenis/imagen2.jpeg",
        categoria:{
            nombre:"Tenis",
            id:"Tenis"
        },
        precio:250000
    },
    {
        id: "Tenis-03",
        titulo:"Tenis Kobe 22",
        imagen:"../assets/img/tenis/imagen3.jpeg",
        categoria:{
            nombre:"Tenis",
            id:"Tenis"
        },
        precio:90000
    },
    {
        id: "Tenis-04",
        titulo:"Tenis Melo 2.0",
        imagen:"../assets/img/tenis/imagen4.jpeg",
        categoria:{
            nombre:"Tenis",
            id:"Tenis"
        },
        precio:200000
    },
//Ropa Deportiva

{
        id: "Prenda-01",
        titulo:"Leggis Levnata cola",
        imagen:"../assets/img/Ropa/prenda01.jpeg",
        categoria:{
            nombre:"Ropa deportiva",
            id:"Ropa deportiva"
        },
        precio:350000
    },{
        id: "Prenda-02",
        titulo:"Licra Hombre",
        imagen:"../assets/img/Ropa/prenda02.avif",
        categoria:{
            nombre:"Ropa deportiva",
            id:"Ropa deportiva"
        },
        precio:350000
    },
    {
        id: "Prenda-03",
        titulo:"Yersy de equipo Lakers",
        imagen:"../assets/img/Ropa/prenda03.avif",
        categoria:{
            nombre:"Ropa deportiva",
            id:"Ropa deportiva"
        },
        precio:350000
    },
     {
        id: "Prenda-04",
        titulo:"Bandas absorrbentes",
        imagen:"../assets/img/Ropa/prenda04.webp",
        categoria:{
            nombre:"Ropa deportiva",
            id:"Ropa deportiva"
        },
        precio:350000
    }
];

const contenedorProductos = document.querySelector("#contenedor__productos");
const BotonesCategorias = document.querySelectorAll(".boton__categoria");
const TituloPrincipal = document.querySelector("#TituloPrincipal");
let BotonesAgregar = document.querySelector(".producto__agregar");
let numerito = document.querySelector(".numerito");



function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto =>{

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto__imagen" src="${producto.imagen}" alt="${producto.titulo}">
           <div class="producto__detalles"> 
                    <h3 class="producto__titulo">${producto.titulo}</h3>
                    <p class="producto__precio">${producto.precio}</p>
                    <button class="producto__agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    });
}
cargarProductos(productos);

BotonesCategorias.forEach(boton =>{
    boton.addEventListener("click", (e) => {
        BotonesCategorias.forEach(boton=> boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const ProductoCategortia = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            TituloPrincipal.innerText = ProductoCategortia.categoria.nombre;

            const ProductosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
        cargarProductos(ProductosBoton);
        }else{
            TituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    })

    ActulizarBotonesAgregar();
});

function ActulizarBotonesAgregar(){
    BotonesAgregar = document.querySelectorAll(".producto__agregar");
    BotonesAgregar.forEach(boton => {
        boton.addEventListener("click", AgregarAlCarrito);
    });
}
 
let productosCarrito; 

let productosCarritoLS = localStorage.getItem("productos__en__carrito");


if (productosCarritoLS){
    productosCarrito = JSON.parse(productosCarritoLS);
    ActualizarNumerito();
}else{
productosCarrito = [];
}

function AgregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosCarrito.some(producto => producto.id === idBoton)){
       const index =  productosCarrito.findIndex(producto => producto.id === idBoton);
        productosCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
         productosCarrito.push(productoAgregado);
    }
 ActualizarNumerito();
    localStorage.setItem("productos__en__carrito", JSON.stringify(productosCarrito));
}

function ActualizarNumerito(){
    let nuevoNumerito = productosCarrito.reduce((acc, producto)=> acc + producto.cantidad,0);
    numerito.innerText= nuevoNumerito;
}
