# Datos de productos

Este directorio contiene el archivo `productos.json`, que es consumido por `js/products.js` para renderizar tarjetas de productos en la sección de "Productos Destacados".

Esquema de cada objeto de producto:
- id: number (identificador único)
- nombre: string (título mostrado en la tarjeta)
- descripcion: string (texto corto bajo el título)
- precio: number (valor numérico en pesos; se formatea en `products.js` con `toLocaleString('es-CO')`)
- imagen: string (ruta relativa a la imagen usada en la tarjeta)

Notas de uso:
- El archivo JSON no admite comentarios; mantén la estructura válida para evitar errores de parseo.
- Asegúrate de que las rutas de `imagen` existan en `images/products/`.
- Si agregas propiedades nuevas, actualiza `js/products.js` y/o el Web Component `js/components/product-card.js` para que se usen.
