# 🛒 Tienda Tu MiniSuper - Carrito de Compras JS

Este es un proyecto académico de un carrito de compras interactivo desarrollado con **HTML5, CSS3 y JavaScript puro (Vanilla JS)**. El sistema simula la experiencia de compra en un supermercado, permitiendo seleccionar productos, gestionar un carrito de compras y generar una factura detallada.

---

## 🚀 Enlace al Proyecto en Vivo

Puedes probar la aplicación funcionando directamente desde GitHub Pages en el siguiente enlace:
👉 **[https://gabrielquintanilla94.github.io/DPS_Trabajo1/]**

---

## ⚙️ Funcionalidades Principales

El proyecto cumple con todos los requerimientos solicitados:
1. **Catálogo Dinámico:** Muestra una lista de productos divididos por categorías (Abarrotes, Limpieza, Lácteos) con sus respectivos precios, imágenes y control de stock real.
2. **Gestión del Carrito:** Permite agregar y eliminar productos. Valida que no se ingresen cantidades negativas ni se exceda el inventario disponible.
3. **Panel Flotante (UI/UX):** El carrito se visualiza de forma moderna como un panel lateral flotante que actualiza los totales en tiempo real.
4. **Facturación e Impuestos:** Al generar la factura, el sistema calcula el subtotal, aplica automáticamente el IVA (13%) y muestra el gran total a pagar.
5. **Control de Inventario:** Al confirmar una compra, los productos se descuentan automáticamente del inventario global.
6. **Continuidad de Compra:** Permite al usuario "seguir comprando" después de ver su factura, reiniciando el carrito pero conservando el nuevo estado del inventario.

---

## 📂 Estructura del Código

El código está modularizado aplicando buenas prácticas y Programación Orientada a Objetos (POO):

### 1. `index.html`
Contiene la estructura semántica de la página. Está dividido en:
* **Header:** Contiene el título y el botón interactivo que muestra el resumen del carrito.
* **Main (Tienda):** Contiene los botones de filtrado por catálogo y el contenedor `grid` donde se inyectan dinámicamente las tarjetas de los productos.
* **Panel Carrito:** Un `div` flotante que muestra la lista de items a comprar.
* **Sección Factura:** Inicialmente oculta (`display: none`), se activa mediante JavaScript para mostrar la tabla de la compra confirmada.

### 2. `styles.css`
Maneja toda la presentación visual, garantizando una interfaz limpia y simétrica:
* Uso de **Flexbox** y **CSS Grid** para la alineación de las tarjetas de productos, logrando que todas tengan exactamente el mismo tamaño.
* Estilos interactivos (`hover`, `transitions`) en botones y tarjetas para mejorar la experiencia de usuario (UX).
* Diseño **Responsivo** básico para adaptarse a dispositivos móviles.

### 3. `app.js`
Es el motor lógico de la aplicación. Se divide en dos partes fundamentales:
* **Modelo de Datos (POO):**
    * `class Producto`: Define la estructura de cada artículo (id, nombre, precio, imagen, stock, categoría).
    * `class Carrito`: Encapsula toda la lógica de compras. Contiene métodos para `agregar()`, `eliminar()`, `vaciar()` y `obtenerTotales()` (calculando el IVA).
* **Lógica de Interfaz y Eventos:**
    * Funciones de renderizado como `renderizarProductos(categoria)` y `renderizarCarrito()` que actualizan el DOM sin recargar la página.
    * Validaciones estrictas de input de usuario e inventario en `manejadorAgregar()`.
    * Manipulación del DOM para intercambiar vistas (Tienda vs Factura) en la función `confirmarCompra()`.

---

## 🛠️ Cómo Ejecutar la Aplicación de forma Local

Si deseas correr este proyecto en tu propia computadora:

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/TU_USUARIO/TU_REPOSITORIO.git](https://github.com/TU_USUARIO/TU_REPOSITORIO.git)
