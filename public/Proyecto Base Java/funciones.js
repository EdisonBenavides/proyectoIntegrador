document.addEventListener('DOMContentLoaded', () => {
    const contenedorEmoji = document.getElementById('contenedorEmoji');
    const entradaNota = document.getElementById('entradaNota');
    const guardarNotaButton = document.getElementById('guardarNota');
    const verNotasButton = document.getElementById('verNotas');
    const frasePositivaElemento = document.getElementById('frasePositiva');
    const fechaHoraElemento = document.getElementById('fechaHora');
    const botonSalir = document.getElementById('botonSalir');

    const frasesPositivas = [
        "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
        "Tú eres la única limitación que tienes.",
        "Convierte cada error en una lección, cada sueño en un aprendizaje y cada obstáculo en una oportunidad.",
        "La única forma de hacer un gran trabajo es amar lo que haces.",
        "Nunca es tarde para ser lo que podrías haber sido.",
        "Si lo puedes soñar, lo puedes hacer.",
        "La vida no se trata de encontrarte a ti mismo, sino de crearte a ti mismo.",
        "Tu actitud determina tu dirección.",
        "Cree en ti mismo y todo será posible.",
        "No importa lo lento que vayas, siempre y cuando no te detengas.",
        "El único lugar donde los sueños son imposibles es en tu mente.",
        "Haz que cada día cuente.",
        "No cuentes los días, haz que los días cuenten.",
        "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
        "El momento en el que quieres renunciar es el momento en el que necesitas seguir adelante.",
        "No te detengas hasta estar orgulloso.",
        "Si te caes siete veces, levántate ocho.",
        "Nunca te rindas. Grandes cosas tardan tiempo.",
        "La persistencia es la clave del éxito.",
        "Sueña en grande, trabaja duro, mantén la boca cerrada.",
        "Las oportunidades no ocurren, las creas tú.",
        "Nunca te rindas ante un sueño solo porque te llevará tiempo alcanzarlo. El tiempo pasará de todos modos.",
        "No busques culpables, busca soluciones.",
        "El éxito no es para los que piensan que pueden, es para los que lo hacen.",
        "No midas tu progreso usando lo que has logrado, sino por lo que superaste para llegar ahí.",
        "No esperes a que pase la tormenta, aprende a bailar bajo la lluvia.",
        "Todo lo que siempre has querido está al otro lado del miedo.",
        "Nada es imposible, la palabra misma dice '¡Soy posible!'",
        "Si buscas resultados distintos, no hagas siempre lo mismo.",
        "La diferencia entre lo imposible y lo posible reside en la determinación de una persona."
    ];

    // Mostrar y leer frase positiva aleatoria
    const mostrarFrasePositiva = () => {
        const indiceAleatorio = Math.floor(Math.random() * frasesPositivas.length);
        const frase = frasesPositivas[indiceAleatorio];
        frasePositivaElemento.innerText = frase;
        leerFrase(frase);

        // Mostrar la fecha y hora actual
        const ahora = new Date();
        fechaHoraElemento.innerText = ahora.toLocaleString();
    };

    // Leer frase usando la API de voz
    const leerFrase = (frase) => {
        const utterance = new SpeechSynthesisUtterance(frase);
        utterance.lang = 'es-ES';
        speechSynthesis.speak(utterance);
    };

    // Array de emojis felices
    const emojisFelices = ['😊', '😄', '😁', '😆', '😃', '😀', '🙂', '😍', '🥳', '🌞'];
    let indiceEmojiActual = 0;

    // Función para cambiar el emoji al hacer clic
    contenedorEmoji.addEventListener('click', () => {
        indiceEmojiActual = (indiceEmojiActual + 1) % emojisFelices.length;
        contenedorEmoji.textContent = emojisFelices[indiceEmojiActual];
    });

    // Evento clic para guardar nota
    guardarNotaButton.addEventListener('click', () => {
        const nota = entradaNota.value.trim();
        if (nota !== '') {
            guardarNotaYActualizarEmoji(nota);
            entradaNota.value = '';
        } else {
            alert('Por favor, escribe una nota antes de guardar.');
        }
    });

    // Evento clic para salir (regresar a la pantalla de inicio de sesión)
    botonSalir.addEventListener('click', () => {
        window.location.href = 'login.html';
    });

    // Guardar nota en LocalStorage y actualizar emoji
    const guardarNotaYActualizarEmoji = (nota) => {
        let notas = JSON.parse(localStorage.getItem('notas')) || [];
        notas.push(nota);
        localStorage.setItem('notas', JSON.stringify(notas));
        alert('Nota guardada exitosamente.');

        // Cambiar emoji al guardar una nota
        indiceEmojiActual = (indiceEmojiActual + 1) % emojisFelices.length;
        contenedorEmoji.textContent = emojisFelices[indiceEmojiActual];
    };

    // Evento clic para ver notas guardadas
    verNotasButton.addEventListener('click', () => {
        window.location.href = 'nota_guardada.html'; // Redirigir a la página de notas guardadas
    });

    // Mostrar la primera frase positiva al cargar la página
    mostrarFrasePositiva();

    // Cambiar frase positiva cada vez que se hace clic en el contenedor de frases
    frasePositivaElemento.addEventListener('click', mostrarFrasePositiva);
});
