import { useState } from 'react';
import { ValidationManager } from '../../utils/validation';

/**
 * HomeScreen con Segmented Control (Cero Scroll)
 * SOLID - SRP: Gestiona la alternancia entre mensaje y acción sin scroll excesivo.
 */
export default function HomeScreen({ navigateTo, remaining, submitQuestion }) {
    const [activeTab, setActiveTab] = useState('preguntar'); // Foco inicial en la acción
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
        <div className="screen active" id="screen-home" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            
            {/* 1. HEADER COMPACTO */}
            <header style={{ marginBottom: '16px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0 }}>
                    Cambio Serio y Seguro
                </h3>
            </header>

            {/* 2. SEGMENTED CONTROL / TABS INTERNAS */}
            <div className="segmented-control" style={{ 
                display: 'flex', 
                background: 'rgba(0,0,0,0.05)', 
                borderRadius: '12px', 
                padding: '4px', 
                marginBottom: '20px',
                border: '1px solid rgba(0,0,0,0.1)'
            }}>
                <button 
                    onClick={() => setActiveTab('mensaje')}
                    style={{ 
                        flex: 1, 
                        padding: '10px', 
                        border: 'none', 
                        borderRadius: '8px',
                        background: activeTab === 'mensaje' ? 'white' : 'transparent',
                        color: activeTab === 'mensaje' ? 'var(--text-primary)' : 'rgba(0,0,0,0.5)',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: activeTab === 'mensaje' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                        transition: 'all 0.2s ease'
                    }}
                >
                    Propuesta
                </button>
                <button 
                    onClick={() => setActiveTab('preguntar')}
                    style={{ 
                        flex: 1, 
                        padding: '10px', 
                        border: 'none', 
                        borderRadius: '8px',
                        background: activeTab === 'preguntar' ? 'white' : 'transparent',
                        color: activeTab === 'preguntar' ? 'var(--text-primary)' : 'rgba(0,0,0,0.5)',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: activeTab === 'preguntar' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                        transition: 'all 0.2s ease'
                    }}
                >
                    Preguntar
                </button>
            </div>

            {/* 3. CONTENIDO DINÁMICO (CERO SCROLL) */}
            <div className="tab-content" style={{ flex: 1, overflowY: 'auto' }}>
                
                {activeTab === 'mensaje' && (
                    <div className="fade-in" style={{ animation: 'fadeIn 0.3s ease' }}>
                        <div className="card" style={{ padding: 0, overflow: 'hidden', borderRadius: '16px', border: '2px solid var(--text-primary)', marginBottom: '16px' }}>
                            <img src="/fajardo_sombrero.jpg" alt="Sergio Fajardo" style={{ width: '100%', display: 'block' }} />
                        </div>
                        <div className="card" style={{ background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', marginBottom: '12px' }}>
                            <h4 style={{ color: 'var(--text-accent)', marginBottom: '8px' }}>El Compromiso</h4>
                            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.4 }}>
                                <strong>Plan Guardián:</strong> Seguridad total y control territorial.<br/>
                                <strong>Educación:</strong> Motor de competitividad nacional.<br/>
                                <strong>Honestidad:</strong> Crecimiento sin corrupción.
                            </p>
                        </div>
                        <p style={{ fontSize: '0.85rem', fontWeight: 600, textAlign: 'center', color: 'var(--text-primary)' }}>
                            "El enemigo no es el colombiano, es el corrupto."
                        </p>
                    </div>
                )}

                {activeTab === 'preguntar' && (
                    <div className="fade-in" style={{ animation: 'fadeIn 0.3s ease' }}>
                        {!isActivated ? (
                            <div className="card" style={{ background: 'white', border: '2px solid var(--text-primary)', padding: '20px', borderRadius: '16px' }}>
                                <h4 style={{ marginBottom: '12px' }}>Activatú código</h4>
                                <input 
                                    id="codeInput" 
                                    type="text" 
                                    placeholder="Ej: SERGIO-7Q2M" 
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    style={{ marginBottom: '12px' }}
                                />
                                <div className="check" style={{ marginBottom: '16px' }}>
                                    <input 
                                        id="termsCheck" 
                                        type="checkbox" 
                                        checked={terms}
                                        onChange={(e) => setTerms(e.target.checked)}
                                    />
                                    <label htmlFor="termsCheck" style={{ margin:0, fontWeight:400, fontSize: '0.8rem' }}>
                                        Autorizo el tratamiento de mis datos.
                                    </label>
                                </div>
                                <button className="btn btn-primary" onClick={handleActivate}>Comenzar ahora</button>
                            </div>
                        ) : (
                            <div className="card" style={{ background: 'white', border: '2px solid var(--text-primary)', padding: '20px', borderRadius: '16px' }}>
                                <div className="remaining" style={{ marginBottom: '12px', border: 'none', padding: 0 }}>
                                    <span>Cupos libres: <strong>{remaining}</strong></span>
                                </div>
                                <textarea 
                                    placeholder="Escribe tu pregunta aquí..."
                                    value={questionText}
                                    onChange={(e) => setQuestionText(e.target.value)}
                                    style={{ minHeight: '130px', marginBottom: '12px', fontSize: '1rem' }}
                                ></textarea>
                                <button className="btn btn-primary" onClick={handleSend} style={{ width: '100%' }}>Enviar a Sergio ➔</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
