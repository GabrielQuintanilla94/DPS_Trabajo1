// --- 1. CLASES Y MODELO DE DATOS 

class Producto {
    constructor(id, nombre, precio, imagen, stock) {
        this.id = id;               // id_producto
        this.nombre = nombre;       // nombre_producto
        this.precio = precio;       // precio_venta
        this.imagen = imagen;       // imagen_url
        this.stock = stock;         // stock_actual (de Inventario.cs)
    }
}

// MOCK DATA)
const inventarioDB = [
    new Producto(1, "Arroz San Pedro 1lb", 1.25, "https://via.placeholder.com/100?text=Arroz", 20),
    new Producto(2, "Frijoles Rojos", 1.50, "https://via.placeholder.com/100?text=Frijoles", 15),
    new Producto(3, "Aceite 500ml", 2.00, "https://via.placeholder.com/100?text=Aceite", 8),
    new Producto(4, "Jabón Zote", 0.90, "https://via.placeholder.com/100?text=Jabon", 50),
    new Producto(5, "Harina de Maíz", 1.10, "https://via.placeholder.com/100?text=Harina", 5)
];

// Estado del Carrito
let carrito = [];
let totalCompra = 0; // Variable global para el total

// --- 2. FUNCIONES DEL SISTEMA ---

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
});

// REQ 1: Mostrar lista de productos
function renderizarProductos() {
    const contenedor = document.getElementById('lista-productos');
    contenedor.innerHTML = '';

    inventarioDB.forEach(prod => {
        const card = document.createElement('div');
        card.classList.add('card-producto');
        
        // Validar Stock visualmente
        const stockHTML = prod.stock > 0 
            ? `<p class="stock-info">Disponibles: ${prod.stock}</p>` 
            : `<p class="sin-stock">AGOTADO</p>`;

        const btnDisabled = prod.stock === 0 ? 'disabled' : '';

        card.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <h3>${prod.nombre}</h3>
            <p class="precio">$${prod.precio.toFixed(2)}</p>
            ${stockHTML}
            <input type="number" id="cant-${prod.id}" value="1" min="1" max="${prod.stock}" style="width:50px">
            <button class="btn-agregar" onclick="agregarAlCarrito(${prod.id})" ${btnDisabled}>
                Agregar
            </button>
        `;
        contenedor.appendChild(card);
    });
}

//Agregar al carrito con validaciones
function agregarAlCarrito(id) {
    const producto = inventarioDB.find(p => p.id === id);
    const inputCantidad = document.getElementById(`cant-${id}`);
    const cantidadSolicitada = parseInt(inputCantidad.value);

    // Validaciones
    if (isNaN(cantidadSolicitada) || cantidadSolicitada <= 0) return alert("Cantidad inválida");
    if (cantidadSolicitada > producto.stock) return alert("No hay suficiente stock");

    // Buscar si ya existe en el carrito
    const itemEnCarrito = carrito.find(item => item.id === id);

    if (itemEnCarrito) {
        // Si ya existe, validamos que la suma no exceda el stock real
        if (itemEnCarrito.cantidad + cantidadSolicitada > producto.stock) {
            return alert("No puedes llevar más de lo que hay en inventario");
        }
        itemEnCarrito.cantidad += cantidadSolicitada;
    } else {
        // Agregamos nuevo objeto al carrito
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: cantidadSolicitada
        });
    }

    renderizarCarrito();
}

// Visualizar y Eliminar del carrito
function renderizarCarrito() {
    const contenedor = document.getElementById('items-carrito');
    const totalSpan = document.getElementById('total-carrito');
    contenedor.innerHTML = '';

    let total = 0;

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        const div = document.createElement('div');
        div.style.borderBottom = '1px solid #eee';
        div.style.padding = '5px 0';
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between;">
                <strong>${item.nombre}</strong>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div style="font-size:0.8rem; display:flex; justify-content:space-between; align-items:center;">
                Cant: ${item.cantidad} x $${item.precio}
                <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">X</button>
            </div>
        `;
        contenedor.appendChild(div);
    });

    totalSpan.innerText = total.toFixed(2);
    totalCompra = total; // Actualizamos la global
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    renderizarCarrito();
}

//Generar Factura y Actualizar Inventario Real
function confirmarCompra() {
    if (carrito.length === 0) return alert("El carrito está vacío");

    // 1. Ocultar tienda, mostrar factura
    document.getElementById('vista-tienda').classList.add('oculto');
    document.getElementById('vista-factura').classList.remove('oculto');

    // 2. Llenar datos de factura
    const tbody = document.getElementById('cuerpo-factura');
    tbody.innerHTML = '';
    
    carrito.forEach(item => {
        // Actualizar stock en el "backend" (array inventarioDB)
        const productoOriginal = inventarioDB.find(p => p.id === item.id);
        productoOriginal.stock -= item.cantidad;

        // Renderizar fila en factura
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.nombre}</td>
            <td>${item.cantidad}</td>
            <td>$${item.precio.toFixed(2)}</td>
            <td>$${(item.cantidad * item.precio).toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });

    // 3. Cálculos de Totales e Impuestos 
    const subtotal = totalCompra;
    const impuestos = subtotal * 0.13; // IVA 13%
    const granTotal = subtotal + impuestos;

    document.getElementById('factura-subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('factura-impuestos').innerText = impuestos.toFixed(2);
    document.getElementById('factura-total').innerText = granTotal.toFixed(2);

  
    const fecha = new Date();
    // Usamos 'es-ES' que fuerza dia/mes/año
    const fechaTexto = fecha.toLocaleDateString('es-ES', {
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric'
    }); 
    

    document.getElementById('fecha-factura').innerText = fechaTexto;
}

//Seguir comprando
function reiniciarTienda() {
    // Limpiar carrito
    carrito = [];
    renderizarCarrito();
    
    // Actualizar la vista de productos 
    renderizarProductos();

    // Cambiar vistas
    document.getElementById('vista-factura').classList.add('oculto');
    document.getElementById('vista-tienda').classList.remove('oculto');
}