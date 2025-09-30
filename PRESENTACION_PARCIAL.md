# Presentación Parcial - Desarrollo Web
## Barbería El Estilo

### 1. Estructura y Modularización del Proyecto (15%)

**Organización de carpetas:**
- `/components`: Contiene componentes HTML reutilizables
  - `/sections`: Secciones específicas de la página principal
  - `header.html` y `footer.html`: Componentes globales
- `/css`: Estilos separados por funcionalidad
- `/js`: Scripts organizados por funcionalidad
- `/data`: Archivos JSON para datos externos
- `/images`: Recursos visuales organizados por categoría

**Ventajas de esta estructura:**
- Facilita el mantenimiento y la escalabilidad
- Permite el trabajo colaborativo en paralelo
- Separa claramente las responsabilidades

### 2. Formulario de Inicio de Sesión (10%)

**Implementación:**
- Archivo `login.html` con estructura semántica
- Validación en JavaScript mediante `loginForm.js`
- Credenciales de prueba: 123@gmail.com / 123

**Características:**
- Validación de campos requeridos
- Manejo de errores con mensajes claros
- Animación de transición al iniciar sesión
- Integración con redes sociales (maquetado)

### 3. Uso de Plantillas con `<template>` (10%)

**Implementación:**
- Definición de plantilla en `product-card.js`:
```javascript
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
```

**Ventajas:**
- El navegador no renderiza el contenido hasta que se utiliza
- Permite clonar la estructura para cada instancia
- Mejora el rendimiento al evitar recrear elementos

### 4. Uso de Datos Externos (fetch + JSON) (10%)

**Implementación:**
- Archivo `productos.json` con datos estructurados
- Carga dinámica mediante fetch en `products.js`:
```javascript
export const loadProducts = async () => {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    try {
        const response = await fetch('data/productos.json');
        const products = await response.json();
        products.forEach(product => {
            const productCard = document.createElement('product-card');
            productCard.setAttribute('name', product.nombre);
            productCard.setAttribute('description', product.descripcion);
            productCard.setAttribute('price', `${product.precio.toLocaleString('es-CO')}`);
            productCard.setAttribute('image-src', product.imagen);
            productList.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
};
```

**Ventajas:**
- Separación de datos y presentación
- Facilita actualizaciones sin modificar código
- Simula integración con API real

### 5. Web Components (10%)

**Implementación:**
- Componente personalizado `<product-card>` con Shadow DOM
- Encapsulación de estilos y estructura
- Atributos observables para actualización dinámica

```javascript
class ProductCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(productTemplate.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['name', 'description', 'price', 'image-src'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // Actualización de atributos
    }
}

customElements.define('product-card', ProductCard);
```

**Ventajas:**
- Encapsulación completa (HTML, CSS, JS)
- Reutilización en cualquier parte de la aplicación
- Previene conflictos de estilos

### 6. Estilos y Consistencia Visual (10%)

**Implementación:**
- Sistema de variables CSS en `base.css`:
```css
:root {
    --primary-color: #1a1a1a;
    --secondary-color: #c5a47e;
    --background-color: #f4f4f4;
    --text-color: #333;
    --white-color: #fff;
    --error-color: #d93025;
    --font-heading: 'Playfair Display', serif;
    --font-body: 'Montserrat', sans-serif;
}
```

**Características:**
- Paleta de colores consistente
- Tipografía definida para títulos y texto
- Componentes visuales coherentes
- Diseño responsivo

### 7. Buenas Prácticas de Nombramiento y Formato (5%)

**Implementación:**
- Nombres descriptivos para archivos y funciones
- Estructura de código consistente
- Organización lógica de archivos y carpetas

**Ejemplos:**
- Archivos CSS nombrados según su función (`login.css`, `product-card.css`)
- Funciones con nombres descriptivos (`loadProducts`, `handleLoginForm`)
- Componentes con nombres semánticos (`product-card`)

### 8. JavaScript en el Proyecto

**Conceptos básicos implementados:**
- **Modularidad con ES6**: Uso de `import` y `export` para organizar el código
  ```javascript
  import { loadComponent } from './componentLoader.js';
  import { handleLoginForm } from './loginForm.js';
  
  export const loadProducts = async () => {
      // Implementación
  };
  ```

- **Manipulación del DOM**: Modificación dinámica de elementos HTML
  ```javascript
  document.getElementById('product-list') // Obtiene un elemento por su ID
  document.createElement('product-card')  // Crea un nuevo elemento
  element.classList.add('fade-in')        // Añade clases CSS
  ```

- **Eventos**: Respuesta a acciones del usuario
  ```javascript
  loginForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Evita que el formulario se envíe
      // Código para validar el formulario
  });
  ```

- **Fetch API**: Carga de datos externos
  ```javascript
  const response = await fetch('data/productos.json');
  const products = await response.json();
  ```

### 9. Animaciones

**Implementación con CSS:**
- Definición de animaciones con `@keyframes` en `animations.css`:
  ```css
  @keyframes fadeIn { 
      from { opacity: 0; transform: translateY(20px); } 
      to { opacity: 1; transform: translateY(0); } 
  }
  
  .fade-in { 
      animation: fadeIn 0.8s ease-out forwards; 
  }
  ```

**Control con JavaScript:**
- Aplicación de clases CSS en momentos específicos:
  ```javascript
  // Añade la animación cuando la página carga
  mainContent.classList.add('fade-in');
  
  // Añade animación al hacer scroll
  if (window.scrollY > bannerSection.offsetHeight * 0.5) {
      mainContainer.classList.add('show-content');
  }
  
  // Animación antes de cambiar de página
  mainContent.classList.add('fade-out');
  setTimeout(() => { window.location.href = loginLink.href; }, 500);
  ```

**Tipos de animaciones:**
- **Fade In**: Elementos aparecen gradualmente
- **Fade Out**: Elementos desaparecen gradualmente
- **Animaciones al scroll**: Contenido que aparece al desplazarse
- **Transiciones suaves**: Como en el formulario de login

### 10. Puntos Clave para la Sustentación (30%)

**Preparación:**
- Explicar la arquitectura general del proyecto
- Demostrar el funcionamiento del login
- Mostrar cómo se cargan dinámicamente los productos
- Explicar la implementación del Shadow DOM
- Destacar las ventajas de la modularización
- Explicar el funcionamiento de las animaciones

**Posibles preguntas:**
- ¿Por qué usar Web Components en lugar de frameworks?
- ¿Cómo manejarías la autenticación en un entorno real?
- ¿Qué mejoras implementarías en una próxima versión?
- ¿Cómo se podría optimizar la carga de imágenes?
- ¿Cómo funcionan las animaciones basadas en scroll?
- ¿Cuáles son las ventajas de usar módulos ES6?

---

## Resumen de Cumplimiento

| Criterio | Porcentaje | Estado |
|----------|------------|--------|
| Estructura y modularización | 15% | ✅ Completo |
| Formulario de login | 10% | ✅ Completo |
| Uso de plantillas | 10% | ✅ Completo |
| Datos externos | 10% | ✅ Completo |
| Web Components | 10% | ✅ Completo |
| Estilos y consistencia | 10% | ✅ Completo |
| Buenas prácticas | 5% | ✅ Completo |
| Sustentación técnica | 30% | Pendiente |

**Total actual:** 70% (Pendiente sustentación)