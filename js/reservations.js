/**
 * Inicializa el sistema de selección de servicio y barbero para la reserva.
 * - Al seleccionar un corte, completa el input correspondiente y sugiere elegir barbero.
 * - Al seleccionar un barbero, completa el input y sugiere elegir el corte (si falta) o ir a reservar.
 * - Permite limpiar la selección y volver a la sección de cortes.
 *
 * Requisitos del DOM:
 * - Sección #cortes con tarjetas .service-card que contengan <h3> con el nombre del servicio y
 *   botones .btn-select.
 * - Sección #barberos con tarjetas .barber-card que contengan <h3> con el nombre del barbero y
 *   botones .btn-select-barber.
 * - Inputs #cut-selection y #barber-selection dentro de #reservas.
 * - Botón opcional #clear-selection-btn para reiniciar.
 */
export const initReservationSystem = () => {
    // Botones para elegir servicio y barbero.
    const serviceButtons = document.querySelectorAll('#cortes .btn-select');
    const barberButtons = document.querySelectorAll('#barberos .btn-select-barber');

    // Referencias a secciones para hacer scroll según progreso de selección.
    const cortesSection = document.getElementById('cortes');
    const barberosSection = document.getElementById('barberos');
    const reservasSection = document.getElementById('reservas');

    // Inputs donde se refleja la selección elegida por el usuario.
    const cutSelectionInput = document.getElementById('cut-selection');
    const barberSelectionInput = document.getElementById('barber-selection');

    // Botón para limpiar selección (si existe en la página/plantilla actual).
    const clearSelectionButton = document.getElementById('clear-selection-btn');

    // Estado interno de la selección actual (no persistente, solo de la sesión/visita).
    let selectedCut = null;
    let selectedBarber = null;

    // Maneja clic en botones de servicio: toma el título de la tarjeta y lo coloca en el input.
    serviceButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedCut = button.closest('.service-card').querySelector('h3').textContent;
            cutSelectionInput.value = selectedCut;
            // Si ya hay barbero seleccionado, lleva a reservas; si no, sugiere elegir barbero.
            (selectedBarber ? reservasSection : barberosSection).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Maneja clic en botones de barbero: toma el título de la tarjeta y lo coloca en el input.
    barberButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedBarber = button.closest('.barber-card').querySelector('h3').textContent;
            barberSelectionInput.value = selectedBarber;
            // Si ya hay corte seleccionado, lleva a reservas; si no, sugiere elegir corte.
            (selectedCut ? reservasSection : cortesSection).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Permite limpiar la selección y regresar al inicio del flujo (cortes).
    if (clearSelectionButton) {
        clearSelectionButton.addEventListener('click', () => {
            selectedCut = null;
            selectedBarber = null;
            cutSelectionInput.value = '';
            barberSelectionInput.value = '';
            cortesSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
};