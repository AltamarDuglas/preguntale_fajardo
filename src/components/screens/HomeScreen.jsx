import { useState } from 'react';
import { ValidationManager } from '../../utils/validation';

/**
 * HomeScreen Focalizado (Participación Ciudadana)
 * SOLID - SRP: Centro de interacción directo para preguntas al candidato.
 */
export default function HomeScreen({ navigateTo, remaining, submitQuestion }) {
    const [code, setCode] = useState('');
    const [terms, setTerms] = useState(false);
    const [questionText, setQuestionText] = useState('');
    const [isActivated, setIsActivated] = useState(false);

    const handleActivate = () => {
        if (ValidationManager.isValidActivation(code, terms)) {
            setIsActivated(true);
        }
    };

    const handleSend = () => {
        if (ValidationManager.isValidQuestion(questionText, remaining)) {
            submitQuestion(questionText, () => {
                setQuestionText('');
                navigateTo('screen-history');
            });
        }
    };

    return (
        <div className="screen active" id="screen-home" style={{ paddingBottom: '120px' }}>
            
            {/* MENSAJE DE PODER */}
            <div className="welcome-text" style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
                    Pregúntale a Sergio Fajardo
                </h3>
                <p style={{ fontWeight: 600, color: 'var(--text-accent)' }}>
                    Tu voz es el motor de este Cambio Serio y Seguro.
                </p>
            </div>

            {/* FORMULARIO DE INTERACCIÓN */}
            <section className="interaction-hub">
                {!isActivated ? (
                    <div className="card" style={{ background: 'white', border: '3px solid var(--text-primary)', padding: '24px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                        <h4 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Activa tu acceso gratuito</h4>
                        <p className="sub" style={{ fontSize: '0.9rem' }}>Usa el código único de tu volante para desbloquear tus 3 consultas directas.</p>
                        
                        <input 
                            id="codeInput" 
                            type="text" 
                            placeholder="Ej: SERGIO-7Q2M" 
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            style={{ marginBottom: '16px' }}
                        />
                        <div className="check" style={{ marginBottom: '24px' }}>
                            <input 
                                id="termsCheck" 
                                type="checkbox" 
                                checked={terms}
                                onChange={(e) => setTerms(e.target.checked)}
                            />
                            <label htmlFor="termsCheck" style={{ margin:0, fontWeight:400, fontSize: '0.8rem' }}>
                                Acepto participar en este diálogo ciudadano transparente.
                            </label>
                        </div>
                        <button className="btn btn-primary" onClick={handleActivate}>Comenzar ahora</button>
                    </div>
                ) : (
                    <div className="card" style={{ background: 'white', border: '3px solid var(--text-primary)', padding: '24px', borderRadius: '20px', animation: 'fadeIn 0.4s ease-out' }}>
                        <div className="remaining" style={{ marginBottom: '20px', padding: '12px', background: 'var(--input-bg)', border: '1px solid rgba(0,0,0,0.1)' }}>
                            <span>Consultas disponibles:</span>
                            <strong style={{ color: 'var(--text-accent)', fontSize: '1.5rem' }}>{remaining}</strong>
                        </div>
                        <label htmlFor="questionInput" style={{ fontSize: '1rem' }}>Escribe tu inquietud para el equipo técnico</label>
                        <textarea 
                            id="questionInput"
                            placeholder="Ej: ¿Qué propone Sergio para mejorar el empleo juvenil en las regiones?"
                            value={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                            style={{ minHeight: '150px', marginBottom: '20px', fontSize: '1.1rem' }}
                        ></textarea>
                        <button className="btn btn-primary" onClick={handleSend} style={{ py: '20px' }}>Enviar consulta ➔</button>
                    </div>
                )}
            </section>

            {/* ACCESO A PROPUESTAS DETALLADAS */}
            <div style={{ marginTop: '40px', textAlign: 'center' }}>
                <p style={{ fontWeight: 700, marginBottom: '16px' }}>¿Quieres conocer nuestro Plan de Gobierno?</p>
                <button 
                    className="btn btn-secondary" 
                    onClick={() => navigateTo('screen-proposals')}
                    style={{ background: 'white', border: '2px dashed var(--text-primary)', textTransform: 'none', fontSize: '1rem' }}
                >
                    Explora las propuestas detalladas para Colombia
                </button>
            </div>
        </div>
    );
}
