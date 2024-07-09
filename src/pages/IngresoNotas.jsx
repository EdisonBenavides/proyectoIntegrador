import React, { useEffect, useState } from 'react';
import './IngresoNotasStyle.css';

const emojisFelices = ['😊', '😄', '😁', '😆', '😃', '😀', '🙂', '😍', '🥳', '🌞'];
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

const IngresoNotas = () => {
    const [emojiActual, setEmojiActual] = useState(emojisFelices[0]);
    const [frasePositiva, setFrasePositiva] = useState('');
    const [fechaHora, setFechaHora] = useState('');
    const [nota, setNota] = useState('');
    const usuarioActual = localStorage.getItem('usuarioActual');

    useEffect(() => {
        mostrarFrasePositiva();
    }, []);

    const mostrarFrasePositiva = () => {
        const indiceAleatorio = Math.floor(Math.random() * frasesPositivas.length);
        const frase = frasesPositivas[indiceAleatorio];
        setFrasePositiva(frase);
        leerFrase(frase);

        const ahora = new Date();
        setFechaHora(ahora.toLocaleString());
    };

    const leerFrase = (frase) => {
        const utterance = new SpeechSynthesisUtterance(frase);
        utterance.lang = 'es-ES';
        speechSynthesis.speak(utterance);
    };

    const cambiarEmoji = () => {
        const indice = (emojisFelices.indexOf(emojiActual) + 1) % emojisFelices.length;
        setEmojiActual(emojisFelices[indice]);
    };

    const guardarNota = () => {
        if (nota.trim() !== '') {
            let notas = JSON.parse(localStorage.getItem('notas')) || [];
            notas.push(nota);
            localStorage.setItem('notas', JSON.stringify(notas));
            alert('Nota guardada exitosamente.');
            setNota('');
            cambiarEmoji();
        } else {
            alert('Por favor, escribe una nota antes de guardar.');
        }
    };

    const salir = () => {
        window.location.href = 'index.html';
    };

    const verNotas = () => {
        window.location.href = 'nota_guardada.html';
    };

    return (
        <div className="contenedor">
            <div className="panel-izquierdo">
                <div id="contenedorEmoji" className="contenedor-emoji" onClick={cambiarEmoji}>
                    {emojiActual}
                </div>
                <div className="contenedor-frase" onClick={mostrarFrasePositiva}>
                    <p id="frasePositiva">{frasePositiva}</p>
                    <p id="fechaHora">{fechaHora}</p>
                </div>
            </div>
            <div className="panel-derecho">
                <div id="bienvenida">
                    <p id="mensaje">¡Qué bueno verte, {usuarioActual}! Gracias por cuidar de ti. Tu bienestar es nuestra prioridad</p>
                </div>
                <textarea id="entradaNota" placeholder="Escribe tu nota aquí..." value={nota} onChange={(e) => setNota(e.target.value)}></textarea>
                <div className="contenedor-botones">
                    <div id="noteButtons">
                        <button id="guardarNota" onClick={guardarNota}>Guardar Nota</button>
                        <button id="verNotas" onClick={verNotas}>Leer Notas</button>
                    </div>
                    <button id="botonSalir" onClick={salir}>Salir</button>
                </div>
            </div>
            <div className="imagen-fondo">
                <img src="./images/fondo1.jpg" alt="Descripción de la imagen" />
            </div>
        </div>
    );
};

export default IngresoNotas;
