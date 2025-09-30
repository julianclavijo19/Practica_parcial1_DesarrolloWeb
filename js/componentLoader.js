/**
 * Carga un fragmento/plantilla HTML desde una URL y lo inserta en un contenedor del DOM.
 *
 * Parámetros:
 * - url: string -> Ruta relativa/absoluta del archivo HTML a cargar.
 * - elementId: string -> ID del elemento contenedor donde se inyectará el HTML.
 *
 * Retorno:
 * - Promise<void> -> Resuelve cuando se ha intentado insertar el contenido.
 *
 * Notas:
 * - Si el contenedor con elementId no existe, no se hace nada (evita errores en páginas que no
 *   tienen ciertas secciones).
 * - Los errores de red o parseo se reportan en consola para facilitar el debug.
 */
export const loadComponent = async (url, elementId) => {
    try {
        // Realiza una petición HTTP para obtener el contenido del componente (HTML crudo).
        const response = await fetch(url);
        // Convierte la respuesta a texto plano (HTML en string).
        const data = await response.text();
        // Busca el contenedor destino por ID.
        const element = document.getElementById(elementId);
        if (element) {
            // Inserta el HTML en el contenedor. Reemplaza cualquier contenido previo.
            element.innerHTML = data;
        }
    } catch (error) {
        // Loggea el error con contexto para saber qué componente falló.
        console.error(`Error loading component from ${url}:`, error);
    }
};