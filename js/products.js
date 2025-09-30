// Asegura el registro del Web Component <product-card> antes de crear instancias.
import './components/product-card.js';

/**
 * Carga productos desde data/productos.json y los renderiza como <product-card>.
 * - Inserta cada producto como un Web Component dentro de #product-list.
 * - Formatea precios usando la localización 'es-CO'.
 *
 * Notas:
 * - Si #product-list no existe (otra página), no hace nada.
 * - Los errores de red/parseo se reportan en consola.
 */
export const loadProducts = async () => {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    try {
        // Obtiene el JSON de productos.
        const response = await fetch('data/productos.json');
        const products = await response.json();
        // Crea e inserta una tarjeta por cada producto.
        products.forEach(product => {
            const productCard = document.createElement('product-card');
            // Atributos observados por el Web Component (ver components/product-card.js)
            productCard.setAttribute('name', product.nombre);
            productCard.setAttribute('description', product.descripcion);
            // Formatea el precio con separadores de miles según locale.
            productCard.setAttribute('price', `${product.precio.toLocaleString('es-CO')}`);
            productCard.setAttribute('image-src', product.imagen);
            productList.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
};

/**
 * Inicializa la navegación por carrusel en la sección de productos.
 * - Calcula la cantidad de scroll por clic usando el ancho de la tarjeta + el gap del contenedor.
 * - Aplica desplazamiento suave (behavior: 'smooth').
 *
 * Requisitos del DOM:
 * - Contenedor principal con id #productos.
 * - Dentro, contenedores .carousel-container que tengan:
 *    - .card-container (con display: grid/flex y gap definido en CSS)
 *    - .left-arrow y .right-arrow (botones para desplazamiento)
 */
export const initCarousels = () => {
    document.querySelectorAll('#productos .carousel-container').forEach(carousel => {
        const cardContainer = carousel.querySelector('.card-container');
        const leftArrow = carousel.querySelector('.left-arrow');
        const rightArrow = carousel.querySelector('.right-arrow');

        if (leftArrow && rightArrow && cardContainer) {
            //
            // Lógica del carrusel (desplazamiento por "una tarjeta")
            // ------------------------------------------------------
            // ¿Cómo determinamos cuánto desplazar?
            // - Tomamos el ancho real de la primera tarjeta (offsetWidth) como referencia.
            // - Sumamos el 'gap' definido en CSS entre tarjetas para que el encuadre quede exacto.
            // - El resultado (cardWidth + gap) es la distancia que desplazamos por clic.
            const firstCard = cardContainer.querySelector('product-card');
            if (!firstCard) return;
            
            // Ancho real de la tarjeta (incluye padding/border según box-sizing del shadow host).
            const cardWidth = firstCard.offsetWidth;
            // Lee el 'gap' definido en CSS para evitar recortes entre tarjetas.
            const gap = parseFloat(getComputedStyle(cardContainer).gap);
            const scrollAmount = cardWidth + gap;

            // Desplazamiento suave usando scrollBy con behavior: 'smooth'.
            // - leftArrow: mueve a la izquierda una "tarjeta".
            // - rightArrow: mueve a la derecha una "tarjeta".
            leftArrow.addEventListener('click', () => cardContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
            rightArrow.addEventListener('click', () => cardContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
        }
    });
};