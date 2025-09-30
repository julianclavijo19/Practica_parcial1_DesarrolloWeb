/*
  Archivo: main.js
  Descripción: Punto de entrada para inicializar las páginas del sitio.
  Se encarga de cargar fragmentos/plantillas HTML, activar animaciones, carouseles
  y el sistema de reservas. También decide qué inicializar según el contenido del DOM.

  Dependencias:
  - componentLoader.js: utilidades para insertar componentes HTML en contenedores.
  - loginForm.js: maneja la lógica del formulario de inicio de sesión.
  - products.js: carga/renderiza productos y configura los carouseles.
  - reservations.js: inicializa el sistema de reservas.
  - animations.js: activa animaciones globales (scroll, transiciones, etc.).
*/

// Importa la función para cargar componentes HTML dentro de contenedores por ID.
import { loadComponent } from './componentLoader.js';
// Importa el manejador del formulario de login.
import { handleLoginForm } from './loginForm.js';
// Importa la carga de productos (datos + render) y la configuración de carouseles.
import { loadProducts, initCarousels } from './products.js';
// Importa la inicialización del sistema de reservas (listeners/validaciones).
import { initReservationSystem } from './reservations.js';
// Importa la activación de animaciones globales.
import { initAnimations } from './animations.js';

/**
 * Inicializa la página principal (index.html).
 * - Inserta header y footer en paralelo para optimizar rendimiento.
 * - Carga secciones en orden para evitar parpadeos/saltos de layout.
 * - Carga productos antes de inicializar carouseles para asegurar que el DOM exista.
 * - Inicializa el sistema de reservas al final.
 *
 * Importante: los IDs de los contenedores deben existir previamente en el HTML.
 */
const initIndexPage = async () => {
    // Carga simultánea de Header y Footer para reducir tiempo total de espera.
    await Promise.all([
        loadComponent('components/header.html', 'header-container'),
        loadComponent('components/footer.html', 'footer-container')
    ]);

    // Activa animaciones globales (observadores de intersección, clases CSS, etc.).
    initAnimations();

    // Carga del contenido de la sección Banner.
    await loadComponent('components/sections/banner.html', 'banner-section-container');
    // Carga de la sección de cortes/servicios.
    await loadComponent('components/sections/cortes.html', 'cortes-section-container');
    // Carga del contenedor de productos (estructura HTML donde se insertarán las tarjetas).
    await loadComponent('components/sections/productos.html', 'productos-section-container');
    // Carga y render de productos desde data/productos.json (según implementación en products.js).
    await loadProducts();
    // Carga de la sección de barberos (equipo/estilistas).
    await loadComponent('components/sections/barberos.html', 'barberos-section-container');
    // Carga de la sección de reservas (formularios/inputs necesarios).
    await loadComponent('components/sections/reservas.html', 'reservas-section-container');
    
    // Inicializa carouseles una vez que el DOM (productos/galerías) ya está disponible.
    initCarousels();
    // Inicializa listeners y validaciones del sistema de reservas.
    initReservationSystem();
};

// Espera a que el documento esté listo para decidir qué inicializar según el contenido.
// Este enfoque permite reutilizar el mismo bundle JS en varias páginas.
// - Si existe #login-form => estamos en login.html.
// - Si existe #main-content => estamos en index.html.
// Nota: Si algún ID cambia en el HTML, actualiza estas comprobaciones.

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('login-form')) {
        // Página de inicio de sesión: inicializa validaciones y manejo del formulario.
        handleLoginForm();
    } else if (document.getElementById('main-content')) {
        // Página principal: carga componentes, productos, carouseles y reservas.
        initIndexPage();
    }
});