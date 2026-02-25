// --- 1. CLASES Y MODELO DE DATOS ---

class Producto {
    
    constructor(id, nombre, precio, imagen, stock, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.stock = stock;
        this.categoria = categoria;
    }
}


class Carrito {
    constructor() {
        this.items = [];
        this.tasaIVA = 0.13; // Impuestos
    }

    agregar(producto, cantidad) {
        const itemEnCarrito = this.items.find(item => item.id === producto.id);
        if (itemEnCarrito) {
            itemEnCarrito.cantidad += cantidad;
        } else {
            this.items.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: cantidad
            });
        }
    }

    eliminar(index) {
        this.items.splice(index, 1);
    }

    vaciar() {
        this.items = [];
    }

    // Centralizamos los cálculos 
    obtenerTotales() {
        const subtotal = this.items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        const impuestos = subtotal * this.tasaIVA;
        const total = subtotal + impuestos;
        return { subtotal, impuestos, total };
    }
}


const inventarioDB = [
    // Abarrotes
    new Producto(1, "Arroz San Pedro 1lb", 1.25, "https://bitworks-multimedia.superselectos.com/api/selectos/multimedia/89244c1f-d9da-4691-b9d4-ad4e58876e73/content", 20, "Abarrotes"),
    new Producto(2, "Frijoles Rojos 1lb", 1.50, "https://bitworks-multimedia.superselectos.com/api/selectos/multimedia/c5c28aa6-797b-4151-a424-835a8c937756/content", 15, "Abarrotes"),
    new Producto(3, "Aceite 500ml", 2.00, "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=200&q=80", 8, "Abarrotes"),

    // Limpieza
    new Producto(4, "Jabón Zote", 0.90, "https://m.media-amazon.com/images/I/41XojCyTsjL._SS400_.jpg", 50, "Limpieza"),
    new Producto(5, "Detergente en polvo 1kg", 2.50, "https://walmartsv.vtexassets.com/arquivos/ids/488030/44194_01.jpg?v=638576047880100000", 10, "Limpieza"),
    new Producto(6, "Desinfectante Lavanda", 1.75, "https://walmartsv.vtexassets.com/arquivos/ids/775840/40551_01.jpg?v=638901789244400000", 12, "Limpieza"),

    // Lácteos
    new Producto(7, "Leche Entera 1L", 1.40, "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=200&q=80", 15, "Lácteos"),
    new Producto(8, "Queso Fresco 1lb", 3.00, "https://lh5.googleusercontent.com/proxy/kQlWBdbCmEfRZdvinrtaKXbypBHtpXAIRGDeWVbUapWzCtADMWXiaUoVK11Pdr5Jx1xpJFWlXsIhXQ91FeoOlQL8iytJfL0UViPwaAXRIaLc-bMn", 5, "Lácteos")
];

// Instancia global del carrito
const miCarrito = new Carrito();

// --- 2. FUNCIONES DEL SISTEMA ---

document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos(); 
});


function toggleCarrito() {
    const panel = document.getElementById('panel-carrito');
    panel.classList.toggle('oculto');
}

// Función para filtrar y mostrar productos
function renderizarProductos(categoriaFiltro = 'Todas') {
    const contenedor = document.getElementById('lista-productos');
    contenedor.innerHTML = '';

  
    let productosAMostrar = inventarioDB;
    if (categoriaFiltro !== 'Todas') {
        productosAMostrar = inventarioDB.filter(prod => prod.categoria === categoriaFiltro);
    }

    
    productosAMostrar.forEach(prod => {
        const card = document.createElement('div');
        card.classList.add('card-producto');

        const stockHTML = prod.stock > 0
            ? `<p class="stock-info">Disponibles: ${prod.stock}</p>`
            : `<p class="sin-stock">AGOTADO</p>`;

        const btnDisabled = prod.stock === 0 ? 'disabled' : '';

        
        card.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}">
            
            <div class="card-info">
                <span style="font-size: 0.7rem; color: #888; text-transform: uppercase; display: block; margin-top: 5px;">${prod.categoria}</span>
                <h3 style="margin: 5px 0;">${prod.nombre}</h3>
                <p class="precio">$${prod.precio.toFixed(2)}</p>
                ${stockHTML}
            </div>

            <div class="card-controles">
                <input type="number" id="cant-${prod.id}" value="1" min="1" max="${prod.stock}">
                <button class="btn-agregar" onclick="manejadorAgregar(${prod.id})" ${btnDisabled}>
                    Agregar
                </button>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

function manejadorAgregar(id) {
    const producto = inventarioDB.find(p => p.id === id);
    const inputCantidad = document.getElementById(`cant-${id}`);
    const cantidadSolicitada = parseInt(inputCantidad.value);

    // Validaciones
    if (isNaN(cantidadSolicitada) || cantidadSolicitada <= 0) return alert("Cantidad inválida");

    // Validar contra stock disponible
    const itemExistente = miCarrito.items.find(item => item.id === id);
    const cantidadEnCarrito = itemExistente ? itemExistente.cantidad : 0;

    if (cantidadEnCarrito + cantidadSolicitada > producto.stock) {
        return alert("No hay suficiente stock en inventario");
    }

    miCarrito.agregar(producto, cantidadSolicitada);
    renderizarCarrito();
}

function renderizarCarrito() {
    const contenedor = document.getElementById('items-carrito');
    const totalSpan = document.getElementById('total-carrito');
    const btnPagar = document.getElementById('btn-pagar');

   
    contenedor.innerHTML = '';

  
    if (miCarrito.items.length === 0) {
        contenedor.innerHTML = '<p>El carrito está vacío</p>';
        btnPagar.disabled = true;
        btnPagar.style.backgroundColor = '#ccc';
        btnPagar.style.cursor = 'not-allowed';
    } else {
        miCarrito.items.forEach((item, index) => {
            const subtotalItem = item.precio * item.cantidad;
            const div = document.createElement('div');
            div.style.borderBottom = '1px solid #eee';
            div.style.padding = '5px 0';
            div.innerHTML = `
                <div style="display:flex; justify-content:space-between;">
                    <strong>${item.nombre}</strong>
                    <span>$${subtotalItem.toFixed(2)}</span>
                </div>
                <div style="font-size:0.8rem; display:flex; justify-content:space-between; align-items:center;">
                    Cant: ${item.cantidad} x $${item.precio}
                    <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">X</button>
                </div>
            `;
            contenedor.appendChild(div);
        });

        btnPagar.disabled = false;
        btnPagar.style.backgroundColor = '#2980b9';
        btnPagar.style.cursor = 'pointer';
    }

    
    const totales = miCarrito.obtenerTotales();
    totalSpan.innerText = totales.subtotal.toFixed(2);
    
    
    const totalHeader = document.getElementById('total-header');
    if (totalHeader) totalHeader.innerText = totales.subtotal.toFixed(2);
}

function eliminarDelCarrito(index) {
    miCarrito.eliminar(index);
    renderizarCarrito();
}

// Confirmar compra y manejar inventario
function confirmarCompra() {
    if (miCarrito.items.length === 0) return alert("El carrito está vacío");

    
    document.getElementById('panel-carrito').classList.add('oculto');

    
    document.getElementById('vista-tienda').classList.add('oculto');
    document.getElementById('vista-factura').classList.remove('oculto');

    const tbody = document.getElementById('cuerpo-factura');
    tbody.innerHTML = '';

    miCarrito.items.forEach(item => {
        
        const productoOriginal = inventarioDB.find(p => p.id === item.id);
        if(productoOriginal) {
            productoOriginal.stock -= item.cantidad;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.nombre}</td>
            <td>${item.cantidad}</td>
            <td>$${item.precio.toFixed(2)}</td>
            <td>$${(item.cantidad * item.precio).toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });

    // Mostrar totales con impuestos en factura
    const totales = miCarrito.obtenerTotales();

    document.getElementById('factura-subtotal').innerText = totales.subtotal.toFixed(2);
    document.getElementById('factura-impuestos').innerText = totales.impuestos.toFixed(2);
    document.getElementById('factura-total').innerText = totales.total.toFixed(2);

    const fecha = new Date();
    document.getElementById('fecha-factura').innerText = fecha.toLocaleDateString('es-ES');
}

// Seguir comprando
function reiniciarTienda() {
    miCarrito.vaciar();

    // Al reiniciar, forzamos que el carrito se renderice vacío
    renderizarCarrito();
    // Volvemos a renderizar 'Todas' las categorías para resetear la vista
    renderizarProductos('Todas');

    document.getElementById('vista-factura').classList.add('oculto');
    document.getElementById('vista-tienda').classList.remove('oculto');
}