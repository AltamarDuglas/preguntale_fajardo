import { useState, useEffect } from 'react';

/**
 * HomeScreen UX 4.0 - Identidad Ciudadana
 * Foco: Nombre + Teléfono (1 Pregunta x Usuario)
 * SOLID - SRP: Gestión delegada de identidad y envío.
 */
export default function HomeScreen({ navigateTo, submitQuestion, totalCount }) {
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
        <div className="screen active" id="screen-home" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-start', paddingTop: '10px' }}>
            
            {/* TITULAR ESTRATÉGICO (Basado en Estrategia 2026) */}
            <div className="welcome-text" style={{ textAlign: 'center', marginBottom: '12px', padding: '0 10px' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: 900, lineHeight: 1.1, textTransform: 'uppercase', marginBottom: '8px' }}>
                    CAMBIO SERIO <br/> Y SEGURO
                </h3>
                <p style={{ fontWeight: 600, color: 'var(--text-accent)', fontSize: '0.9rem', margin: '0 auto', maxWidth: '300px', lineHeight: 1.3 }}>
                    "Construyamos orden sin odio y el progreso que solo la educación puede darnos."
                </p>

                {/* CONTADOR EN VIVO PREMIUM */}
                <div style={{ 
                    marginTop: '15px', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'white',
                        padding: '6px 14px',
                        borderRadius: '50px',
                        border: '2px solid var(--text-primary)',
                        boxShadow: '4px 4px 0 var(--text-primary)',
                        gap: '8px'
                    }}>
                        <div style={{ position: 'relative', width: '10px', height: '10px' }}>
                            <div style={{ position: 'absolute', width: '100%', height: '100%', background: '#ff5252', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></div>
                            <div style={{ position: 'absolute', width: '100%', height: '100%', background: '#ff5252', borderRadius: '50%' }}></div>
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
                            {totalCount || 0} CIUDADANOS CONECTADOS
                        </span>
                    </div>
                </div>

                <div style={{ marginTop: '10px', fontSize: '0.7rem', opacity: 0.7, fontWeight: 700 }}>
                    PLATAFORMA DE ESCUCHA DIRECTA
                </div>
            </div>

            {/* FORMULARIO DE IDENTIDAD / PREGUNTA */}
            <section className="interaction-hub" style={{ flexShrink: 0, padding: '5px' }}>
                {!isIdentified ? (
                    <div className="card" style={{ 
                        background: 'white', 
                        border: '3px solid var(--text-primary)', 
                        padding: '24px 20px', 
                        borderRadius: '24px', 
                        boxShadow: '8px 8px 0 var(--text-primary)',
                        animation: 'cardPopIn 0.5s ease-out'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                            <div style={{ background: 'var(--bg-main)', padding: '8px', borderRadius: '12px', border: '1.5px solid var(--text-primary)' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase' }}>Tu Identidad</h4>
                                <p style={{ fontSize: '0.7rem', margin: 0, color: 'var(--text-accent)', fontWeight: 700 }}>PASO 1: REGISTRO CIUDADANO</p>
                            </div>
                        </div>

                        <div style={{ position: 'relative', marginBottom: '12px' }}>
                            <input 
                                type="text" 
                                placeholder="Escribe tu nombre completo" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ 
                                    padding: '14px 14px 14px 45px', 
                                    fontSize: '0.95rem', 
                                    borderRadius: '14px', 
                                    border: '2.5px solid var(--text-primary)',
                                    background: '#fcfcfc',
                                    width: '100%'
                                }}
                            />
                            <div style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            </div>
                        </div>

                        <div style={{ position: 'relative', marginBottom: '15px' }}>
                            <input 
                                type="tel" 
                                placeholder="Tu número de WhatsApp" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                style={{ 
                                    padding: '14px 14px 14px 45px', 
                                    fontSize: '0.95rem', 
                                    borderRadius: '14px', 
                                    border: '2.5px solid var(--text-primary)',
                                    background: '#fcfcfc',
                                    width: '100%'
                                }}
                            />
                            <div style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            </div>
                        </div>

                        {error && (
                            <div style={{ color: '#d32f2f', fontSize: '0.75rem', marginBottom: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                {error}
                            </div>
                        )}

                        <button className="btn btn-primary" onClick={handleIdentify} style={{ 
                            padding: '16px', 
                            fontSize: '1rem', 
                            borderRadius: '16px', 
                            width: '100%',
                            fontWeight: 800,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}>
                            Continuar a Preguntar
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </button>
                    </div>
                ) : (
                    <div className="card" style={{ 
                        background: 'white', 
                        border: '3px solid var(--text-primary)', 
                        padding: '24px 20px', 
                        borderRadius: '24px', 
                        boxShadow: '8px 8px 0 var(--text-primary)',
                        animation: 'fadeIn 0.4s ease-out',
                        textAlign: 'center'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', background: 'var(--bg-main)', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid var(--text-primary)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '8px', height: '8px', background: '#4caf50', borderRadius: '50%' }}></div>
                                <span style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--text-primary)' }}>Hola, {name.split(' ')[0]}</span>
                            </div>
                            <button 
                                onClick={() => { localStorage.removeItem('fajardo_identity'); setIsIdentified(false); }}
                                style={{ background: 'white', border: '2px solid var(--text-primary)', borderRadius: '8px', color: 'var(--text-accent)', fontSize: '0.7rem', fontWeight: 800, padding: '4px 8px', cursor: 'pointer' }}
                            >CAMBIAR</button>
                        </div>
                        
                        <div style={{ width: '60px', height: '60px', background: 'var(--input-bg)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', border: '2px solid var(--text-primary)' }}>
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--text-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
                        </div>
                        
                        <h4 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '8px', color: 'var(--text-primary)' }}>Tu Identidad Confirmada</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', opacity: 0.8, fontWeight: 600, marginBottom: '25px', lineHeight: 1.4 }}>
                            Ya estás listo para enviar tu compromiso o pregunta al equipo de Sergio Fajardo.
                        </p>

                        <button className="btn btn-primary btn-floating-cta" onClick={() => navigateTo('screen-question')} style={{ 
                            padding: '18px', 
                            fontSize: '1.1rem', 
                            borderRadius: '16px', 
                            width: '100%',
                            fontWeight: 900,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}>
                            Escribir Compromiso
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
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
