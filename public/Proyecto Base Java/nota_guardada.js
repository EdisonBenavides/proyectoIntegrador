document.addEventListener('DOMContentLoaded', () => {
    const contenedorNotas = document.getElementById('contenedorNotas');
    const botonVolver = document.getElementById('botonVolver');

    // Cargar notas desde LocalStorage
    const cargarNotas = () => {
        contenedorNotas.innerHTML = '';
        const notas = JSON.parse(localStorage.getItem('notas')) || [];
        notas.forEach((nota, index) => {
            const elementoNota = crearElementoNota(nota, index);
            contenedorNotas.appendChild(elementoNota);
        });
    };

    // Función para crear un elemento de nota con título y contenido
    const crearElementoNota = (nota, index) => {
        const elementoNota = document.createElement('div');
        elementoNota.classList.add('item-nota');

        // Obtener solo la fecha actual
        const fechaActual = new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Parte izquierda: Título de la nota y fecha
        const ladoIzquierdo = document.createElement('div');
        ladoIzquierdo.classList.add('nota-izquierda');
        ladoIzquierdo.innerHTML = `
            <h3>Nota ${index + 1}</h3>
            <p>Fecha: ${fechaActual}</p>
        `;
        elementoNota.appendChild(ladoIzquierdo);

        // Parte derecha: Contenido de la nota y botones
        const ladoDerecho = document.createElement('div');
        ladoDerecho.classList.add('nota-derecha');
        ladoDerecho.innerHTML = `
            <p>${nota}</p>
            <div class="contenedor-botones">
                <button onclick="leerNota('${nota}')">Leer</button>
                <button onclick="eliminarNota(${index})">Eliminar</button>
            </div>
        `;
        elementoNota.appendChild(ladoDerecho);

        return elementoNota;
    };

    // Leer nota usando la API de voz
    window.leerNota = (nota) => {
        const utterance = new SpeechSynthesisUtterance(nota);
        utterance.lang = 'es-ES';
        speechSynthesis.speak(utterance);
    };

    // Eliminar nota de LocalStorage
    window.eliminarNota = (index) => {
        const notas = JSON.parse(localStorage.getItem('notas')) || [];
        notas.splice(index, 1);
        localStorage.setItem('notas', JSON.stringify(notas));
        cargarNotas();
    };

    // Volver a la página principal
    botonVolver.addEventListener('click', () => {
        window.location.href = 'ingreso_notas.html';
    });

    cargarNotas();
});
