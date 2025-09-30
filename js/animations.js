/**
 * Inicializa animaciones y transiciones globales del sitio.
 * - Aplica fade-in al contenido principal cuando carga la página.
 * - Si existe el enlace de login, aplica fade-out antes de navegar (transición suave).
 * - Muestra contenido adicional al hacer scroll más allá de la mitad del banner.
 *
 * Requisitos CSS:
 * - Clases .fade-in, .fade-out y .show-content deben estar definidas en css/animations.css
 *   (o archivos relacionados) con las transiciones/animaciones necesarias.
 */
export const initAnimations = () => {
    // 1) Efecto de entrada del contenido principal.
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.classList.add('fade-in');
    }

    // 2) Transición de salida al navegar hacia login desde la página principal.
    const loginLink = document.getElementById('login-link');
    if (loginLink && mainContent) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Reemplaza fade-in por fade-out para animar la salida.
            mainContent.classList.remove('fade-in');
            mainContent.classList.add('fade-out');
            // Espera a que termine la animación antes de cambiar de URL.
            setTimeout(() => { window.location.href = loginLink.href; }, 500);
        });
    }

    // 3) Mostrar gradualmente el contenido principal tras pasar parte del banner al hacer scroll.
    const mainContainer = document.querySelector('.main-container');
    const bannerSection = document.getElementById('banner-section-container');
    if (mainContainer && bannerSection) {
        //
        // Animación de "subida" del contenido después del banner
        // --------------------------------------------------------
        // Cómo funciona:
        // - En CSS (base.css), .main-container inicia con margin-top: 100vh y transition: margin-top 0.8s ease-out.
        //   Esto coloca el contenido principal justo por debajo del banner (que mide 100vh).
        // - Al detectar que el usuario ha scrolleado más del 50% de la altura del banner,
        //   agregamos la clase .show-content a .main-container.
        // - CSS para .main-container.show-content cambia margin-top a 0, y como hay transition,
        //   el cambio se anima suavemente (de 100vh a 0), dando la sensación de que el contenido "sube".
        // - Se remueve el listener tras activarse para evitar cálculos continuos.
        const handleScrollAnimation = () => {
            // Umbral: 50% de la altura del banner.
            const threshold = bannerSection.offsetHeight * 0.5;
            if (window.scrollY > threshold) {
                mainContainer.classList.add('show-content');
                window.removeEventListener('scroll', handleScrollAnimation);
            }
        };
        window.addEventListener('scroll', handleScrollAnimation);
        // Ejecuta una vez al cargar por si ya se cumplió la condición (p. ej., recarga a mitad de página).
        handleScrollAnimation();
    }
};