/**
 * Maneja el flujo del formulario de inicio de sesión en login.html.
 * - Previene el envío tradicional (recarga de página).
 * - Valida credenciales contra un valor fijo (solo para demo).
 * - Aplica animación de salida y redirige al index cuando es correcto.
 * - Muestra mensaje de error cuando las credenciales son inválidas.
 *
 * Nota de seguridad:
 * - En producción, las credenciales no deben validarse en el cliente ni estar hardcodeadas.
 *   Se debe usar un backend/servicio de autenticación y enviar los datos de forma segura (HTTPS),
 *   además de manejar tokens/sesiones con políticas adecuadas.
 */
export const handleLoginForm = () => {
    // Obtiene el elemento <form> por su ID. Si no existe, significa que no estamos en la página de login.
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;

    // Escucha el evento submit del formulario (cuando el usuario intenta iniciar sesión).
    loginForm.addEventListener('submit', (e) => {
        // Evita que el formulario haga la navegación por defecto (recargar la página).
        e.preventDefault();

        // Lee los valores de los campos del formulario.
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('error-message');

        // Validación muy básica (solo para demostración):
        // Si el correo y la contraseña coinciden con los valores esperados, se considera válido.
        if (email === '123@gmail.com' && password === '123') {
            // Añade una clase para animar la caja de login antes de redirigir.
            const loginBox = document.querySelector('.login-box');
            loginBox.classList.add('slide-up');
            // Espera 500ms (duración de la animación) y luego navega a la página principal.
            setTimeout(() => { window.location.href = 'index.html'; }, 500);
        } else {
            // Muestra un mensaje de error cuando las credenciales no son correctas.
            errorMessage.textContent = 'Correo o contraseña incorrectos.';
        }
    });
};