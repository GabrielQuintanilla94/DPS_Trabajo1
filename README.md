# 🛒 Tienda Tu MiniSuper - 

Este es un proyecto académico avanzado de un carrito de compras interactivo desarrollado con **HTML5, CSS3 y JavaScript puro (Vanilla JS)**. El sistema simula una experiencia de comercio electrónico completa, incluyendo autenticación de usuarios, preferencias de visualización y gestión en tiempo real de inventarios.

---

## 🚀 Enlace al Proyecto en Vivo

Puedes probar la aplicación funcionando directamente desde GitHub Pages en el siguiente enlace:
👉 **[https://gabrielquintanilla94.github.io/DPS_Trabajo1/]**

---

## ⭐ Características y Funcionalidades Nuevas

El proyecto ha sido escalado para incluir funcionalidades premium de UI/UX y lógica de negocio:

1. **🔐 Sistema de Autenticación (Login/Registro):** * Flujo completo de creación de cuenta y validación de credenciales simulado usando `localStorage` para la persistencia de datos.
   * La tienda está protegida y oculta hasta que el usuario inicia sesión.
   * "Badge" de perfil de usuario dinámico en el encabezado.
2. **🌙 Modo Oscuro (Dark Mode):** * Botón interactivo (☀️/🌙) que cambia el tema de toda la aplicación web de forma instantánea manipulando el DOM y clases CSS.
3. **📦 Control de Inventario en Tiempo Real:** * Al agregar un producto al carrito, el stock disponible mostrado en la tarjeta disminuye en el instante. 
   * Al vaciar el carrito o seguir comprando, el inventario se restaura o actualiza de manera impecable.
4. **🔍 Buscador Dinámico y Filtros:** * Barra de búsqueda que permite filtrar productos por nombre en tiempo real, combinable con los botones de filtrado por categoría (Abarrotes, Limpieza, Lácteos, etc.).
5. **💳 Panel Flotante y Facturación:** * Carrito tipo "Off-canvas" (panel lateral flotante) moderno.
   * Cálculo automático de Subtotal, IVA (13%) y Total a pagar, reflejados en un comprobante final de compra.

---

## 📂 Estructura del Código y POO

El código está fuertemente modularizado, aplicando Programación Orientada a Objetos (POO):

### 1. Modelo de Datos (`app.js`)
El núcleo lógico se divide en clases especializadas:
* `class Usuario`: Gestiona la información de los clientes (credenciales, tarjeta, nombre).
* `class Producto`: Define la estructura del catálogo (id, nombre, precio, stock, imagen, categoría).
* `class Carrito`: Encapsula los métodos del negocio (`agregar()`, `eliminar()`, `vaciar()`, `obtenerTotales()`).

### 2. Presentación e Interfaz (`index.html` & `styles.css`)
* **Diseño Simétrico:** Uso de CSS Flexbox y CSS Grid para que las tarjetas de productos mantengan proporciones idénticas sin importar la longitud del texto.
* **Aislamiento de Vistas:** Mediante manipulación de clases (`.oculto`), se logra una arquitectura de tipo *Single Page Application (SPA)*, alternando entre Login, Registro, Tienda y Factura sin recargar el navegador.
* **Responsividad:** Adaptación a dispositivos móviles para asegurar una navegación fluida en cualquier pantalla.

---

