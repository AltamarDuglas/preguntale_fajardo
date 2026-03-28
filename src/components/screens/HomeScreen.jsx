import { useState } from 'react';
import { ValidationManager } from '../../utils/validation';

/**
 * HomeScreen - Versión Compacta (Cero Scroll)
 * SOLID - SRP: Interactividad ciudadana en una sola vista.
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
        <div className="screen active no-scroll-view" id="screen-home" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
            
            {/* TITULAR COMPACTO */}
            <div className="welcome-text" style={{ textAlign: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', margin: 0 }}>
                    Pregúntale a Sergio Fajardo
                </h3>
                <p style={{ fontWeight: 600, color: 'var(--text-accent)', fontSize: '0.9rem', margin: '4px 0 0' }}>
                    Tu voz es el motor de este Cambio Serio
                </p>
            </div>

            {/* FORMULARIO DE INTERACCIÓN (ALTURA FIJA) */}
            <section className="interaction-hub" style={{ flexShrink: 0 }}>
                {!isActivated ? (
                    <div className="card" style={{ background: 'white', border: '3px solid var(--text-primary)', padding: '16px', borderRadius: '16px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Activa tu acceso</h4>
                        <input 
                            id="codeInput" 
                            type="text" 
                            placeholder="Ej: SERGIO-7Q2M" 
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            style={{ marginBottom: '12px', padding: '12px' }}
                        />
                        <div className="check" style={{ marginBottom: '16px' }}>
                            <input 
                                id="termsCheck" 
                                type="checkbox" 
                                checked={terms}
                                onChange={(e) => setTerms(e.target.checked)}
                            />
                            <label htmlFor="termsCheck" style={{ margin:0, fontWeight:400, fontSize: '0.75rem' }}>
                                Acepto participar en este diálogo transparente.
                            </label>
                        </div>
                        <button className="btn btn-primary" onClick={handleActivate} style={{ padding: '12px' }}>Activar acceso</button>
                    </div>
                ) : (
                    <div className="card" style={{ background: 'white', border: '3px solid var(--text-primary)', padding: '16px', borderRadius: '16px', animation: 'fadeIn 0.4s ease-out' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', background: 'var(--input-bg)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Consultas:</span>
                            <strong style={{ color: 'var(--text-accent)', fontSize: '1.2rem' }}>{remaining}</strong>
                        </div>
                        <textarea 
                            id="questionInput"
                            placeholder="¿Qué proponemos para tu región?"
                            value={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                            style={{ minHeight: '120px', marginBottom: '12px', fontSize: '1rem', padding: '12px' }}
                        ></textarea>
                        <button className="btn btn-primary" onClick={handleSend} style={{ padding: '12px' }}>Enviar consulta ➔</button>
                    </div>
                )}
            </section>

            {/* ACCESO A PROPUESTAS (REDUCIDO) */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button 
                    className="btn btn-secondary btn-floating-cta" 
                    onClick={() => navigateTo('screen-proposals')}
                    style={{ background: 'white', border: '2px dashed var(--text-primary)', textTransform: 'none', fontSize: '1rem', width: 'auto', padding: '10px 24px', fontWeight: 800 }}
                >
                    Descubre nuestras propuestas ➔
                </button>
            </div>
        </div>
    );
}
