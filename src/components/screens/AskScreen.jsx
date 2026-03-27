import { useState } from 'react';
import { ValidationManager } from '../../utils/validation';

export default function AskScreen({ remaining, submitQuestion, navigateTo }) {
    const [questionText, setQuestionText] = useState('');

    const handleSend = () => {
        if (ValidationManager.isValidQuestion(questionText, remaining)) {
            submitQuestion(questionText, () => {
                setQuestionText('');
                navigateTo('screen-history');
            });
        }
    };

    const handleFillExample = () => {
        setQuestionText('¿Qué acciones propone Sergio para mejorar la seguridad y la iluminación en los barrios?');
    };

    return (
        <div className="screen active" id="screen-ask">
            <div className="card">
                <div className="remaining">
                    <span>Preguntas disponibles</span>
                    <strong>{remaining}</strong>
                </div>
                <h2>¿Qué deseas consultar?</h2>
                <p className="sub">
                    Tu pregunta es anónima y será respondida con base en nuestro plan de gobierno.
                </p>
            </div>

            <div className="card">
                <label htmlFor="questionInput">Tu pregunta</label>
                <textarea 
                    id="questionInput"
                    placeholder="Ej: ¿Qué propone Sergio para mejorar la seguridad en mi barrio?"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                ></textarea>
                <div className="actions">
                    <button className="btn btn-secondary" onClick={handleFillExample}>Cargar ejemplo</button>
                    <button className="btn btn-primary" onClick={handleSend}>Enviar pregunta</button>
                </div>
            </div>
        </div>
    );
}
