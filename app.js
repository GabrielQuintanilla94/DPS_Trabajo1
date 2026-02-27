

class Usuario {
    constructor(usuario, nombre, direccion, tarjeta, contraseña) {
        this.usuario = usuario;
        this.nombre = nombre;
        this.direccion = direccion;
        this.tarjeta = tarjeta;
        this.contraseña = contraseña;
        this.fechaRegistro = new Date().toLocaleDateString('es-ES');
    }
}

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
    new Producto(4, "Pan de caja", 1.70, "https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00085358400229L.jpg", 12, "Abarrotes"),
    new Producto(5, "Pan Integral", 1.90, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzoBb5eXieweFKnhrTeWVJcvIA_l7GLwuPOQ&s", 14, "Abarrotes"),
    new Producto(6, "Margarina 400g", 0.80, "https://walmartsv.vtexassets.com/arquivos/ids/656787/47496_01.jpg?v=638718749155930000", 7, "Abarrotes"),

    // Limpieza
    new Producto(7, "Jabón Zote", 0.90, "https://m.media-amazon.com/images/I/41XojCyTsjL._SS400_.jpg", 50, "Limpieza"),
    new Producto(8, "Detergente en polvo 1kg", 2.50, "https://walmartsv.vtexassets.com/arquivos/ids/488030/44194_01.jpg?v=638576047880100000", 10, "Limpieza"),
    new Producto(9, "Desinfectante Lavanda", 1.75, "https://walmartsv.vtexassets.com/arquivos/ids/775840/40551_01.jpg?v=638901789244400000", 12, "Limpieza"),
    new Producto(10, "Cloro 1L", 2.75, "https://chile.clorox.com/wp-content/uploads/sites/2/2019/05/Copia-de-220224_CBX_CH_CLX_Splashless_Original_950g.png", 6, "Limpieza"),
    new Producto(11, "Papel Higiènico", 1.15, "https://walmartsv.vtexassets.com/arquivos/ids/782633/48563_01.jpg?v=638917410445970000", 18, "Limpieza"),
    new Producto(12, "Esponja", 0.35, "https://kywiec.vtexassets.com/arquivos/ids/202274/459506.jpg?v=638584908558500000", 21, "Limpieza"),

    // Bebidas
    new Producto(13, "Agua Mineral 355ml", 0.90, "https://walmartsv.vtexassets.com/arquivos/ids/845930/agua-mineral-salutaris-bebida-carbonatada-en-lata-355-ml-7401005904059.jpg?v=639058221301200000", 9, "Bebidas"),
    new Producto(14, "Coca Cola 354ml", 0.80, "https://walmartsv.vtexassets.com/arquivos/ids/372484/Gaseosa-Coca-Cola-Regular-Lata-354-ml-2-3689.jpg?v=638392773683200000", 25, "Bebidas"),
    new Producto(15, "Jugo de Naranja 235ml", 0.70, "https://walmartsv.vtexassets.com/arquivos/ids/405206/Jugo-De-La-Granja-De-Naranja-Con-Pulpa-235ml-1-3420.jpg?v=638423891020130000", 15, "Bebidas"),
    new Producto(16, "Cerveza 355ml", 1.50, "https://walmartsv.vtexassets.com/arquivos/ids/807589/cerveza-modelo-especial-botella-355-ml-0000075031602.webp?v=638973600037670000", 8, "Bebidas"),

    // Lácteos
    new Producto(17, "Leche Entera 1L", 1.40, "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=200&q=80", 15, "Lácteos"),
    new Producto(18, "Leche Deslactosada 1L", 1.70, "https://www.etiqueteando.com/wp-content/uploads/2020/08/E0077-500x500-2.jpg", 10, "Lácteos"),
    new Producto(19, "Queso Fresco 1lb", 3.00, "https://lh5.googleusercontent.com/proxy/kQlWBdbCmEfRZdvinrtaKXbypBHtpXAIRGDeWVbUapWzCtADMWXiaUoVK11Pdr5Jx1xpJFWlXsIhXQ91FeoOlQL8iytJfL0UViPwaAXRIaLc-bMn", 5, "Lácteos"),
    new Producto(20, "Yogur de Fresa", 0.80, "https://statics.dinoonline.com.ar/imagenes/full_600x600_ma/3260702_f.jpg", 12, "Lácteos"),
    new Producto(21, "Leche en polvo", 6.00, "https://walmartsv.vtexassets.com/arquivos/ids/750688/83183_01.jpg?v=638852013193300000", 7, "Lácteos"),
    new Producto(22, "Queso Mozzarella", 2.50, "https://sigmafoodservice.com/medias/515Wx515H-7823.png?context=bWFzdGVyfGltYWdlc3wyNDM5MDd8aW1hZ2UvcG5nfGFEZzJMMmd4TkM4eE1ESTVNRGc0TVRJNU9EUTJNaTgxTVRWWGVEVXhOVWhmTnpneU15NXdibWN8ZmE5YzcwN2NjYmUwMzc1Yzc1MjJlMWYyMjkzMzc5NjJiMzc5YTA4ZjIxZTRkYjVjZDFkNmVlMTdjYWViYWJkZg", 6, "Lácteos"),

    // Carnes
    new Producto(23, "Pollo Entero 1kg", 4.00, "https://walmartsv.vtexassets.com/arquivos/ids/582560/54349_01.jpg?v=638660788982600000", 4, "Carnes"),
    new Producto(24, "Carne Molida 1kg", 3.50, "https://walmartsv.vtexassets.com/arquivos/ids/402123/Carne-Molida-Super-Especial-Lb-As-1-12033.jpg?v=638421289499800000", 8, "Carnes"),
    new Producto(25, "Pechuga de Pollo 1kg", 6.00, "https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/202508/29/00118460511365____5__600x600.jpg", 12, "Carnes"),
    new Producto(26, "Costilla 1kg", 7.00, "https://img.freepik.com/fotos-premium/parte-carne-costillas-ternera-cruda-fresca-aislada_219193-9689.jpg", 5, "Carnes"),
    new Producto(27, "Filete de Res 1kg", 7.50, "https://bitworks-multimedia.superselectos.com/api/selectos/multimedia/ebec4a6b-2d34-4033-8d9f-103217b281a3/content", 7, "Carnes"),
];

// Instancia global del carrito
const miCarrito = new Carrito();

// Cargar usuarios desde localStorage
function obtenerUsuarios() {
    const usuarios = localStorage.getItem('usuarios');
    return usuarios ? JSON.parse(usuarios) : {};
}

// Guardar usuarios en localStorage
function guardarUsuarios(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Obtener usuario actual
function obtenerUsuarioActual() {
    return localStorage.getItem('usuarioActual');
}

// Guardar usuario actual
function guardarUsuarioActual(usuario) {
    if (usuario) {
        localStorage.setItem('usuarioActual', usuario);
    } else {
        localStorage.removeItem('usuarioActual');
    }
}

// Registrar nuevo usuario
function registrarUsuario(usuario, nombre, direccion, tarjeta, contraseña) {
    // Validar que no esté vacío
    if (!usuario || !nombre || !direccion || !tarjeta || !contraseña) {
        return { exito: false, mensaje: 'Todos los campos son obligatorios' };
    }

    const usuarios = obtenerUsuarios();

    // Validar que el usuario no exista
    if (usuarios[usuario]) {
        return { exito: false, mensaje: 'El usuario ya existe' };
    }

    // Validar tarjeta (al menos 13 dígitos)
    if (!/^\d{13,19}$/.test(tarjeta)) {
        return { exito: false, mensaje: 'Tarjeta inválida (debe tener entre 13 y 19 dígitos)' };
    }

    // Crear nuevo usuario
    usuarios[usuario] = new Usuario(usuario, nombre, direccion, tarjeta, contraseña);
    guardarUsuarios(usuarios);

    return { exito: true, mensaje: 'Usuario registrado exitosamente' };
}

// Iniciar sesión
function iniciarSesion(usuario, contraseña) {
    if (!usuario || !contraseña) {
        return { exito: false, mensaje: 'Usuario y contraseña son requeridos' };
    }

    const usuarios = obtenerUsuarios();

    if (!usuarios[usuario]) {
        return { exito: false, mensaje: 'Usuario no encontrado' };
    }

    if (usuarios[usuario].contraseña !== contraseña) {
        return { exito: false, mensaje: 'Contraseña incorrecta' };
    }

    guardarUsuarioActual(usuario);
    return { exito: true, mensaje: 'Sesión iniciada exitosamente' };
}

// Cerrar sesión
function cerrarSesion() {
    guardarUsuarioActual(null);
    miCarrito.vaciar();
}

// --- 2. FUNCIONES DEL SISTEMA ---

document.addEventListener('DOMContentLoaded', () => {
    // Verificar si hay usuario autenticado
    const usuarioActual = obtenerUsuarioActual();

    if (usuarioActual) {
        ocultarVistasAutenticacion();
        mostrarVistaTienda();
        actualizarNombreUsuario(usuarioActual);
        renderizarProductos();
    } else {
        mostrarVistaLogin();
    }
});

// Cambiar a vista de registro
function mostrarVistaRegistro() {
    document.getElementById('vista-login').classList.add('oculto');
    document.getElementById('vista-registro').classList.remove('oculto');
}

// Cambiar a vista de login
function mostrarVistaLogin() {
    document.getElementById('vista-registro').classList.add('oculto');
    document.getElementById('vista-login').classList.remove('oculto');
}

// Mostrar vistas de usuario autenticado
function mostrarVistaTienda() {
    document.getElementById('vista-tienda').classList.remove('oculto');
}

// Ocultar vistas de autenticación
function ocultarVistasAutenticacion() {
    document.getElementById('vista-login').classList.add('oculto');
    document.getElementById('vista-registro').classList.add('oculto');
}

// Actualizar nombre del usuario en header
function actualizarNombreUsuario(nombreUsuario) {
    const usuarios = obtenerUsuarios();
    const usuario = usuarios[nombreUsuario];
    const usuarioSpan = document.getElementById('usuario-actual');
    if (usuarioSpan && usuario) {
        usuarioSpan.textContent = usuario.nombre;
    }
}

// Registro
function manejarRegistro(event) {
    event.preventDefault();

    const usuario = document.getElementById('registro-usuario').value;
    const nombre = document.getElementById('registro-nombre').value;
    const direccion = document.getElementById('registro-direccion').value;
    const tarjeta = document.getElementById('registro-tarjeta').value;
    const contraseña = document.getElementById('registro-contraseña').value;

    const resultado = registrarUsuario(usuario, nombre, direccion, tarjeta, contraseña);

    if (resultado.exito) {
        alert(resultado.mensaje);
        document.getElementById('form-registro').reset();
        mostrarVistaLogin();
    } else {
        alert(resultado.mensaje);
    }
}

// Manejar el login
function manejarLogin(event) {
    event.preventDefault();

    const usuario = document.getElementById('login-usuario').value;
    const contraseña = document.getElementById('login-contraseña').value;

    const resultado = iniciarSesion(usuario, contraseña);

    if (resultado.exito) {
        alert(resultado.mensaje);
        document.getElementById('form-login').reset();

        // Mostrar tienda
        ocultarVistasAutenticacion();
        mostrarVistaTienda();
        actualizarNombreUsuario(usuario);
        renderizarProductos();
    } else {
        alert(resultado.mensaje);
    }
}

// Manejar Cierre de sesión
function manejarLogout() {
    if (confirm('¿Deseas cerrar la sesión?')) {
        cerrarSesion();
        ocultarVistasAutenticacion();
        mostrarVistaLogin();
        document.getElementById('form-login').reset();
        document.getElementById('panel-carrito').classList.add('oculto');
        const usuarioSpan = document.getElementById('usuario-actual');
        if (usuarioSpan) {
            usuarioSpan.textContent = '';
        }
    }
}

function toggleCarrito() {
    const panel = document.getElementById('panel-carrito');
    panel.classList.toggle('oculto');
}

// Variables para mantener el estado de búsqueda y filtros
let categoriaActual = 'Todas';

// Función para filtrar y mostrar productos
function renderizarProductos(categoriaFiltro = categoriaActual, terminoBusqueda = document.getElementById('buscador') ? document.getElementById('buscador').value : '') {
    categoriaActual = categoriaFiltro; // Guardar la categoría seleccionada
    const contenedor = document.getElementById('lista-productos');
    contenedor.innerHTML = '';

    // Filtrar por categoría y búsqueda de texto
    let productosAMostrar = inventarioDB.filter(prod => {
        const coincideCategoria = categoriaActual === 'Todas' || prod.categoria === categoriaActual;
        const coincideTexto = prod.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase());
        return coincideCategoria && coincideTexto;
    });

    if (productosAMostrar.length === 0) {
        contenedor.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #666; margin-top: 20px;">No se encontraron productos con ese nombre.</p>';
        return;
    }

    productosAMostrar.forEach(prod => {
        const card = document.createElement('div');
        card.classList.add('card-producto');

        const stockHTML = prod.stock > 0
            ? `<p class="stock-info">Disponibles: ${prod.stock}</p>`
            : `<p class="sin-stock" style="color:red; font-weight:bold;">AGOTADO</p>`;

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

// Función ejecutada por el input del buscador
function manejarBusqueda() {
    const termino = document.getElementById('buscador').value;
    renderizarProductos(categoriaActual, termino);
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
        if (productoOriginal) {
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

    // Limpiar el buscador visualmente y en la lógica
    const inputBuscador = document.getElementById('buscador');
    if (inputBuscador) inputBuscador.value = '';

    renderizarCarrito();
    // Volvemos a renderizar 'Todas' las categorías sin texto de búsqueda
    renderizarProductos('Todas', '');

    document.getElementById('vista-factura').classList.add('oculto');
    document.getElementById('vista-tienda').classList.remove('oculto');
}

// --- FUNCIÓN DE TEMA OSCURO ---
function toggleTema() {
    // Alternar la clase 'dark-mode' en el body
    document.body.classList.toggle('dark-mode');

    // Cambiar el ícono del botón
    const btnTema = document.getElementById('btn-tema');
    if (document.body.classList.contains('dark-mode')) {
        btnTema.innerText = '☀️'; // Sol cuando está oscuro
    } else {
        btnTema.innerText = '🌙'; // Luna cuando está claro
    }
}