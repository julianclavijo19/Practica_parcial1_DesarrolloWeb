/**
 * Web Component: <product-card>
 * - Renderiza una tarjeta de producto utilizando Shadow DOM para encapsular estilos y estructura.
 * - Atributos soportados:
 *    - name: string -> Título del producto.
 *    - description: string -> Descripción corta del producto.
 *    - price: string -> Precio ya formateado (se recomienda formatearlo en el llamador).
 *    - image-src: string -> Ruta de la imagen del producto.
 *
 * Estilos:
 * - Se cargan desde css/product-card.css mediante un <link> dentro del shadow root.
 */

// Template reutilizable para instancias del componente.
const productTemplate = document.createElement('template');
productTemplate.innerHTML = `
    <link rel="stylesheet" href="css/product-card.css">
    <div class="product-card">
        <img src="" alt="Imagen del producto">
        <div class="card-content">
            <h3></h3>
            <p class="description"></p>
            <p class="price"></p>
            <button class="btn-add">Añadir al Carrito</button>
        </div>
    </div>
`;

class ProductCard extends HTMLElement {
    constructor() {
        super();
        // Crea un Shadow DOM abierto para encapsular el contenido y estilos del componente.
        this.attachShadow({ mode: 'open' });
        // Inserta el template dentro del shadow root.
        this.shadowRoot.appendChild(productTemplate.content.cloneNode(true));
    }

    // Lista de atributos del elemento que, al cambiar, disparan attributeChangedCallback.
    static get observedAttributes() {
        return ['name', 'description', 'price', 'image-src'];
    }

    /**
     * Se ejecuta cada vez que uno de los atributos observados cambia.
     * Permite mantener el DOM del componente sincronizado con sus atributos.
     */
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'name':
                this.shadowRoot.querySelector('h3').textContent = newValue;
                break;
            case 'description':
                this.shadowRoot.querySelector('.description').textContent = newValue;
                break;
            case 'price':
                this.shadowRoot.querySelector('.price').textContent = newValue;
                break;
            case 'image-src':
                this.shadowRoot.querySelector('img').setAttribute('src', newValue);
                this.shadowRoot.querySelector('img').setAttribute('alt', `Imagen de ${this.getAttribute('name')}`);
                break;
        }
    }
}

// Registra la etiqueta personalizada en el navegador.
customElements.define('product-card', ProductCard);
