const PaletaColores = {
    primario: '#0d6efd',    // Azul primario
    secundario: '#6c757d',  // Gris secundario
    exito: '#198754',       // Verde éxito
    peligro: '#dc3545',     // Rojo peligro/eliminar
    advertencia: '#ffc107', // Amarillo advertencia
    info: '#0dcaf0',        // Celeste información
    fondo: '#ffffff',       // Fondo del modal
    texto: '#212529'        // Color del texto
};

document.addEventListener('DOMContentLoaded', () => {

    // --- CAPTURA DEL BOTÓN ELIMINAR ---
    const btnEliminar = document.getElementById('btn-eliminar');
    if (btnEliminar) {
        btnEliminar.addEventListener('click', (e) => {
            e.preventDefault(); 
            Confirmaciones.eliminar('Usuario seleccionado', () => {

            });
        });
    }

    /* -------------------------------------- MODULO SOCIO -------------------------------------- */
    
    // --- GUARDAR SOCIO ---
    const btnGuardar = document.getElementById('btn-guardar-socio');
    if (btnGuardar) {
        btnGuardar.addEventListener('click', (e) => {

            if (!form.checkValidity()) {
                form.reportValidity();
                return; 
            }

            e.preventDefault();
            
            Confirmaciones.guardar('Se guardarán los datos del formulario.', () => {

                const form = btnGuardar.closest('form');
                const eventoSimulado = {
                    preventDefault: () => {},
                    target: form || document.createElement('form')
                };
                

                if (typeof handleGuardarSocio === 'function') {
                    handleGuardarSocio(eventoSimulado);
                }
            });
        });
    }

    // --- CANCELAR SOCIO ---
    const btnCancelar = document.getElementById('btn-cancelar-socio');
    if (btnCancelar) {
        btnCancelar.addEventListener('click', (e) => {
            e.preventDefault();
            Confirmaciones.cancelar(() => {
                closeModal('modal-nuevo-socio');
                if (typeof showToast === 'function') showToast('Los cambios no se guardaron.');
            });
        });
    }

    /* ------------------------------- MODULO DE PROCESAR PAGO ------------------------------- */

    const btnProcesarPago = document.getElementById('btn-procesar-pago');
    if (btnProcesarPago) {
        btnProcesarPago.addEventListener('click', (e) => {

            if (!form.checkValidity()) {
                form.reportValidity();
                return; 
            }

            e.preventDefault();
            Confirmaciones.procesarPago('Se procesarán los datos del pago.', () => {

                const eventoSimulado = { preventDefault: () => {} };
                
                if (typeof handleRegistrarPago === 'function') {
                    handleRegistrarPago(eventoSimulado);
                }
            });
        });
    }

    const btnCancelarPago = document.getElementById('btn-cancelar-pago');
    if (btnCancelarPago) {
        btnCancelarPago.addEventListener('click', (e) => {
            e.preventDefault();
            Confirmaciones.cancelar(() => {
                closeModal('modal-pago');
                if (typeof showToast === 'function') showToast('Los cambios no se guardaron.');
            });
        });
    }

    /* -------------------------------- MODULO DE ENTRENADORES -------------------------------- */

    const btnGuardarEntrenador = document.getElementById('btn-guardar-entrenador');
    if (btnGuardarEntrenador) {
        btnGuardarEntrenador.addEventListener('click', (e) => {

            if (!form.checkValidity()) {
                form.reportValidity();
                return; 
            }

            e.preventDefault();
            const form = btnGuardarEntrenador.closest('form');
            
            Confirmaciones.guardar('Se guardarán los datos del formulario.', () => {
                if (form) form.reset();
                closeModal('modal-nuevo-entrenador');

            });
        });
    }

    const btnCancelarEntrenador = document.getElementById('btn-cancelar-entrenador');
    if (btnCancelarEntrenador) {
        btnCancelarEntrenador.addEventListener('click', (e) => {
            e.preventDefault();
            Confirmaciones.cancelar(() => {
                closeModal('modal-nuevo-entrenador');
                
                const form = btnCancelarEntrenador.closest('form');
                if (form) form.reset();
                
                if (typeof showToast === 'function') showToast('Los cambios no se guardaron.');
            });
        });
    }

    /* -------------------------------- MODULO DE CONFIGURACION -------------------------------- */
    
    const btnGuardarConfig = document.getElementById('btn-guardar-config');
    if (btnGuardarConfig) {
        btnGuardarConfig.addEventListener('click', (e) => {
            e.preventDefault();
            Confirmaciones.guardar('Se guardarán las configuraciones del sistema.', () => {
                // Lógica futura de configuración
            })
        });
    }

    /* --------------------------------------- CERRAR SESIÓN ----------------------------------- */
    
    const btnCerrarSesion = document.getElementById('btn-logout');
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', (e) => {
            e.preventDefault();
            Confirmaciones.cerrarSesion(() => {
                document.getElementById('app-view').classList.remove('active');
                document.getElementById('login-view').classList.add('active');
                if (typeof showToast === 'function') showToast('Sesión cerrada correctamente');
            });
        });
    }
});

/* -------------------------------- OBJETO DE CONFIRMACIONES (SWEETALERT2) -------------------------------- */

const Confirmaciones = {
    // 1. Confirmación Crítica (Ej: Eliminar un registro)
    eliminar: function(nombreElemento, callbackExito) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: `Estás a punto de eliminar "${nombreElemento}". Esta acción no se puede deshacer.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: PaletaColores.peligro,
            cancelButtonColor: PaletaColores.secundario,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            background: PaletaColores.fondo,
            color: PaletaColores.texto,
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                callbackExito();
                this.notificacionExito('Eliminado correctamente');
            }
        });
    },

    // 2. Confirmación Positiva (Ej: Guardar o Procesar algo importante)
    guardar: function(mensaje, callbackExito) {
        Swal.fire({
            title: '¿Confirmar acción?',
            text: mensaje || "Se guardarán los cambios realizados en el sistema.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: PaletaColores.exito,
            cancelButtonColor: PaletaColores.secundario,
            confirmButtonText: 'Sí, guardar',
            cancelButtonText: 'Volver',
            background: PaletaColores.fondo,
            color: PaletaColores.texto
        }).then((result) => {
            if (result.isConfirmed) {
                callbackExito();
                // La notificación de éxito se manejará desde app.js (showToast) para no duplicar alertas
            }
        });
    },

    // 3. Confirmación de Procesar Pago
    procesarPago: function(mensaje, callbackExito) {
        Swal.fire({
            title: '¿Confirmar acción?',
            text: mensaje || "Se procesarán los datos del formulario.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: PaletaColores.exito,
            cancelButtonColor: PaletaColores.secundario,
            confirmButtonText: 'Sí, procesar el pago',
            cancelButtonText: 'Volver',
            background: PaletaColores.fondo,
            color: PaletaColores.texto
        }).then((result) => {
            if (result.isConfirmed) {
                callbackExito();
            }
        });
    },

    // 4. Confirmación de Abandono (Ej: Cancelar un formulario con datos llenos)
    cancelar: function(callbackExito) {
        Swal.fire({
            title: '¿Deseas salir?',
            text: "Tus cambios no se guardarán. Si sales ahora, se perderán.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: PaletaColores.advertencia,
            cancelButtonColor: PaletaColores.secundario,
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'Continuar',
            background: PaletaColores.fondo,
            color: PaletaColores.texto
        }).then((result) => {
            if (result.isConfirmed) {
                callbackExito();
            }
        });
    },

    // 5. Confirmación de Cierre de Sesión
    cerrarSesion: function(callbackExito) {
        Swal.fire({
            title: '¿Cerrar sesión?',
            text: "Tendrás que volver a ingresar tus credenciales para acceder.",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: PaletaColores.primario,
            cancelButtonColor: PaletaColores.secundario,
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar',
            background: PaletaColores.fondo,
            color: PaletaColores.texto
        }).then((result) => {
            if (result.isConfirmed) {
                callbackExito();
            }
        });
    },

    // Extras: Notificaciones Toast
    notificacionExito: function(mensaje) {
        Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: PaletaColores.fondo,
            color: PaletaColores.texto
        });
    },
    
    notificacionError: function(mensaje) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: mensaje,
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            background: PaletaColores.fondo,
            color: PaletaColores.texto
        });
    }
};