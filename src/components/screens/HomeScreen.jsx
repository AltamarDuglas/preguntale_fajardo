import { useState, useEffect } from 'react';

/**
 * HomeScreen UX 4.0 - Identidad Ciudadana
 * Foco: Nombre + Teléfono (1 Pregunta x Usuario)
 * SOLID - SRP: Gestión delegada de identidad y envío.
 */
export default function HomeScreen({ navigateTo, submitQuestion }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [isIdentified, setIsIdentified] = useState(false);
    const [error, setError] = useState('');

    // Recuperar identidad de cache/localStorage para persistencia silenciosa
    useEffect(() => {
        const savedIdentity = localStorage.getItem('fajardo_identity');
        if (savedIdentity) {
            const { name: savedName, phone: savedPhone } = JSON.parse(savedIdentity);
            setName(savedName);
            setPhone(savedPhone);
            setIsIdentified(true);
        }
    }, []);

    const handleIdentify = () => {
        if (name.trim() && phone.trim().length >= 7) {
            const identity = { name, phone };
            localStorage.setItem('fajardo_identity', JSON.stringify(identity));
            setIsIdentified(true);
            setError('');
        } else {
            setError('Por favor ingresa tu nombre y un teléfono válido.');
        }
    };

    const handleSend = () => {
        if (questionText.trim()) {
            submitQuestion({ name, phone, text: questionText }, () => {
                setQuestionText('');
                navigateTo('screen-history');
            });
        } else {
            setError('Escribe tu pregunta antes de enviar.');
        }
    };

    return (
        <div className="screen active no-scroll-view" id="screen-home" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-start', paddingTop: '10px' }}>
            
            {/* TITULAR ESTRATÉGICO */}
            <div className="welcome-text" style={{ textAlign: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.1 }}>
                    Plataforma de Escucha <br/> Sergio Fajardo
                </h3>
                <p style={{ fontWeight: 600, color: 'var(--text-accent)', fontSize: '0.8rem', margin: '4px 0 0' }}>
                    Sin intermediarios, de ciudadano a líder.
                </p>
            </div>

            {/* FORMULARIO DE IDENTIDAD / PREGUNTA */}
            <section className="interaction-hub" style={{ flexShrink: 1, overflow: 'hidden' }}>
                {!isIdentified ? (
                    <div className="card" style={{ background: 'white', border: '2px solid var(--text-primary)', padding: '12px 16px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                        <h4 style={{ fontSize: '1rem', marginBottom: '6px' }}>Identifícate para participar</h4>
                        <p style={{ fontSize: '0.75rem', marginBottom: '12px', color: 'rgba(0,0,0,0.6)' }}>Solo puedes realizar una pregunta por número telefónico.</p>
                        
                        <input 
                            type="text" 
                            placeholder="Tu nombre completo" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ marginBottom: '8px', padding: '10px', fontSize: '0.9rem' }}
                        />
                        <input 
                            type="tel" 
                            placeholder="Tu número de teléfono" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{ marginBottom: '12px', padding: '10px', fontSize: '0.9rem' }}
                        />

                        {error && <p style={{ color: 'red', fontSize: '0.7rem', marginBottom: '8px' }}>{error}</p>}

                        <button className="btn btn-primary" onClick={handleIdentify} style={{ padding: '10px', fontSize: '0.9rem' }}>
                            Continuar a Preguntar
                        </button>
                    </div>
                ) : (
                    <div className="card" style={{ background: 'white', border: '2px solid var(--text-primary)', padding: '12px 16px', borderRadius: '16px', animation: 'fadeIn 0.4s ease-out' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', background: 'var(--input-bg)', padding: '6px 10px', borderRadius: '6px' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Hola, {name.split(' ')[0]}</span>
                            <button 
                                onClick={() => { localStorage.removeItem('fajardo_identity'); setIsIdentified(false); }}
                                style={{ background: 'none', border: 'none', color: 'var(--text-accent)', fontSize: '0.65rem', textDecoration: 'underline', cursor: 'pointer' }}
                            >Cambiar datos</button>
                        </div>
                        <textarea 
                            id="questionInput"
                            placeholder="Escribe aquí tu consulta para Sergio o su equipo técnico..."
                            value={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                            style={{ minHeight: '100px', maxHeight: '140px', marginBottom: '8px', fontSize: '0.95rem', padding: '10px' }}
                        ></textarea>
                        
                        {error && <p style={{ color: 'red', fontSize: '0.7rem', marginBottom: '8px' }}>{error}</p>}

                        <button className="btn btn-primary" onClick={handleSend} style={{ padding: '10px', fontSize: '1rem' }}>
                            Enviar mi compromiso ➔
                        </button>
                    </div>
                )}
            </section>

            {/* ACCESO A PROPUESTAS */}
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <button 
                    className="btn btn-secondary btn-floating-cta" 
                    onClick={() => navigateTo('screen-proposals')}
                    style={{ background: 'white', border: '2px dashed var(--text-primary)', textTransform: 'none', fontSize: '0.85rem', width: 'auto', padding: '8px 16px', fontWeight: 800 }}
                >
                    Explora el Plan de Gobierno ➔
                </button>
            </div>
        </div>
    );
}
