document.addEventListener('DOMContentLoaded', () => {
    const formularioInicioSesion = document.getElementById('formularioInicioSesion');
    const botonRegistro = document.getElementById('botonRegistro');
    const popupRegistro = document.getElementById('popupRegistro');
    const cerrarPopup = document.getElementById('cerrarPopup');
    const formularioRegistro = document.getElementById('formularioRegistro');
    const botonCancelar = document.getElementById('botonCancelar');

    // Inicialmente ocultar el popup de registro
    popupRegistro.style.display = 'none';

    // Manejar el inicio de sesión
    formularioInicioSesion.addEventListener('submit', (event) => {
        event.preventDefault();
        const usuario = document.getElementById('usuario').value;
        const contrasena = document.getElementById('contrasena').value;

        const usuarioAlmacenado = localStorage.getItem(usuario);
        if (usuarioAlmacenado) {
            const usuarioParseado = JSON.parse(usuarioAlmacenado);
            if (usuarioParseado.password === contrasena) {
                alert('¡Inicio de sesión exitoso!');
                window.location.href = 'ingreso_notas.html';
            } else {
                alert('Contraseña incorrecta');
            }
        } else {
            alert('Usuario no encontrado');
        }
    });

    // Mostrar el popup de registro al hacer clic en "Registrarse"
    botonRegistro.addEventListener('click', () => {
        popupRegistro.style.display = 'flex';
    });

    // Cerrar el popup de registro al hacer clic en la "X"
    cerrarPopup.addEventListener('click', () => {
        popupRegistro.style.display = 'none';
    });

    // Cerrar el popup de registro al hacer clic en "Cancelar"
    botonCancelar.addEventListener('click', () => {
        popupRegistro.style.display = 'none';
    });

    // Manejar el registro
    formularioRegistro.addEventListener('submit', (event) => {
        event.preventDefault();
        const nuevoUsuario = document.getElementById('nuevoUsuario').value;
        const nuevaContrasena = document.getElementById('nuevaContrasena').value;

        if (localStorage.getItem(nuevoUsuario)) {
            alert('El usuario ya existe');
        } else {
            localStorage.setItem(nuevoUsuario, JSON.stringify({ password: nuevaContrasena }));
            alert('¡Registro exitoso!');
            popupRegistro.style.display = 'none';
        }
    });
});
