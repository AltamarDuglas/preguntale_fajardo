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
        <div className="screen active no-scroll-view" id="screen-home" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-start', paddingTop: '10px' }}>
            
            {/* TITULAR COMPACTO */}
            <div className="welcome-text" style={{ textAlign: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.1 }}>
                    Pregúntale a <br/> Sergio Fajardo
                </h3>
                <p style={{ fontWeight: 600, color: 'var(--text-accent)', fontSize: '0.8rem', margin: '4px 0 0' }}>
                    Tu voz es el motor de este Cambio Serio
                </p>
            </div>

            {/* FORMULARIO DE INTERACCIÓN (ALTURA FIJA Y COMPACTA) */}
            <section className="interaction-hub" style={{ flexShrink: 1, overflow: 'hidden' }}>
                {!isActivated ? (
                    <div className="card" style={{ background: 'white', border: '2px solid var(--text-primary)', padding: '12px 16px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                        <h4 style={{ fontSize: '1rem', marginBottom: '6px' }}>Activa tu acceso</h4>
                        <input 
                            id="codeInput" 
                            type="text" 
                            placeholder="Ej: SERGIO-7Q2M" 
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            style={{ marginBottom: '8px', padding: '10px', fontSize: '0.9rem' }}
                        />
                        <div className="check" style={{ marginBottom: '12px' }}>
                            <input 
                                id="termsCheck" 
                                type="checkbox" 
                                checked={terms}
                                onChange={(e) => setTerms(e.target.checked)}
                            />
                            <label htmlFor="termsCheck" style={{ margin:0, fontWeight:400, fontSize: '0.7rem', display: 'inline', marginLeft: '6px' }}>
                                Acepto participar en este diálogo.
                            </label>
                        </div>
                        <button className="btn btn-primary" onClick={handleActivate} style={{ padding: '10px', fontSize: '0.9rem' }}>Comenzar</button>
                    </div>
                ) : (
                    <div className="card" style={{ background: 'white', border: '2px solid var(--text-primary)', padding: '12px 16px', borderRadius: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', background: 'var(--input-bg)', padding: '6px 10px', borderRadius: '6px' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Consultas:</span>
                            <strong style={{ color: 'var(--text-accent)', fontSize: '1rem' }}>{remaining}</strong>
                        </div>
                        <textarea 
                            id="questionInput"
                            placeholder="¿Qué proponemos?"
                            value={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                            style={{ minHeight: '90px', maxHeight: '120px', marginBottom: '8px', fontSize: '0.95rem', padding: '10px' }}
                        ></textarea>
                        <button className="btn btn-primary" onClick={handleSend} style={{ padding: '10px', fontSize: '1rem' }}>Enviar consulta ➔</button>
                    </div>
                )}
            </section>

            {/* ACCESO A PROPUESTAS (REDUCIDO) */}
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <button 
                    className="btn btn-secondary btn-floating-cta" 
                    onClick={() => navigateTo('screen-proposals')}
                    style={{ background: 'white', border: '2px dashed var(--text-primary)', textTransform: 'none', fontSize: '0.85rem', width: 'auto', padding: '8px 16px', fontWeight: 800 }}
                >
                    Descubre nuestras propuestas ➔
                </button>
            </div>
        </div>
    );

}
