import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

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
    const [loading, setLoading] = useState(false);
    const [acceptedLegal, setAcceptedLegal] = useState(false);
    const [showPolicy, setShowPolicy] = useState(false);

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
        <div className="screen active" id="screen-home">

            {/* TITULAR ESTRATÉGICO (Basado en Estrategia 2026) */}
            <div className="welcome-text">
                <h3>
                    CAMBIO SERIO <br /> Y SEGURO
                </h3>
                <p>
                    "Construyamos orden sin odio y el progreso que solo la educación puede darnos."
                </p>

                {/* CONTADOR EN VIVO PREMIUM */}
                <div style={{
                    marginTop: '8px',
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

                <div style={{ marginTop: '5px', fontSize: '0.7rem', opacity: 0.7, fontWeight: 700 }}>
                    PLATAFORMA DE ESCUCHA DIRECTA
                </div>
            </div>

            {/* FORMULARIO DE IDENTIDAD / PREGUNTA */}
            <section className="interaction-hub">
                {!isIdentified ? (
                    <div className="card" style={{
                        background: 'white',
                        border: '3px solid var(--text-primary)',
                        padding: '16px 20px',
                        borderRadius: '24px',
                        boxShadow: '8px 8px 0 var(--text-primary)',
                        animation: 'cardPopIn 0.5s ease-out',
                        marginBottom: '10px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                            <div style={{ background: 'var(--bg-main)', padding: '8px', borderRadius: '12px', border: '1.5px solid var(--text-primary)' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
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
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
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
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                            </div>
                        </div>

                        {error && (
                            <div style={{ color: '#d32f2f', fontSize: '0.75rem', marginBottom: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                {error}
                            </div>
                        )}

                        {/* COMPONENTE LEGAL / HABEAS DATA */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '15px', background: '#f8f9fa', padding: '10px', borderRadius: '12px', border: '1px solid #eee' }}>
                            <input 
                                type="checkbox" 
                                id="habeasData" 
                                checked={acceptedLegal}
                                onChange={(e) => setAcceptedLegal(e.target.checked)}
                                style={{ marginTop: '3px', width: '18px', height: '18px', cursor: 'pointer' }}
                            />
                            <label htmlFor="habeasData" style={{ fontSize: '0.72rem', lineHeight: '1.2', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer' }}>
                                Autorizo el tratamiento de mis datos personales según la <span onClick={(e) => { e.preventDefault(); setShowPolicy(true); }} style={{ color: 'var(--text-accent)', textDecoration: 'underline' }}>Política de Privacidad</span> y Ley de Habeas Data.
                            </label>
                        </div>

                        <button 
                            className="btn btn-primary" 
                            disabled={loading}
                            onClick={async () => {
                                if (!acceptedLegal) {
                                    setError('Debes aceptar la política de tratamiento de datos para continuar.');
                                    return;
                                }
                                
                                if (name.trim() && phone.trim().length >= 7) {
                                    setLoading(true);
                                    setError('');
                                    
                                    try {
                                        // 🔍 Verificar si el ciudadano ya existe en Supabase
                                        const { data: existing, error: fetchError } = await supabase
                                            .from('questions')
                                            .select('*')
                                            .eq('phone', phone.trim())
                                            .maybeSingle();

                                        if (existing) {
                                            // ¡Reconocido! Restauramos identidad y vamos al historial
                                            localStorage.setItem('fajardo_identity', JSON.stringify({ 
                                                name: existing.name || name, 
                                                phone: phone.trim() 
                                            }));
                                            navigateTo('screen-history');
                                        } else {
                                            // Usuario nuevo: Guardamos localmente y vamos a que escriba su pregunta
                                            localStorage.setItem('fajardo_identity', JSON.stringify({ name, phone }));
                                            navigateTo('screen-question');
                                        }
                                    } catch (err) {
                                        console.error("Error reconociendo identidad:", err);
                                        // Fallback por si falla la red: flujo normal
                                        localStorage.setItem('fajardo_identity', JSON.stringify({ name, phone }));
                                        navigateTo('screen-question');
                                    } finally {
                                        setLoading(false);
                                    }
                                } else {
                                    setError('Por favor ingresa tu nombre y un teléfono válido (mín. 7 dígitos).');
                                }
                            }} 
                            style={{
                                padding: '16px',
                                opacity: acceptedLegal && !loading ? 1 : 0.7,
                                fontSize: '1rem',
                                borderRadius: '16px',
                                width: '100%',
                                fontWeight: 800,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px'
                            }}
                        >
                            {loading ? 'Verificando...' : 'Preguntar...'}
                            {!loading && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>}
                        </button>
                    </div>
                ) : (
                    <div className="card" style={{
                        background: 'white',
                        border: '3px solid var(--text-primary)',
                        padding: '16px 20px',
                        borderRadius: '24px',
                        boxShadow: '8px 8px 0 var(--text-primary)',
                        animation: 'fadeIn 0.4s ease-out',
                        textAlign: 'center',
                        marginBottom: '10px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', background: 'var(--bg-main)', padding: '8px 12px', borderRadius: '12px', border: '1.5px solid var(--text-primary)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '8px', height: '8px', background: '#4caf50', borderRadius: '50%' }}></div>
                                <span style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--text-primary)' }}>Hola, {name.split(' ')[0]}</span>
                            </div>
                            <button
                                onClick={() => { localStorage.removeItem('fajardo_identity'); setIsIdentified(false); }}
                                style={{ background: 'white', border: '2px solid var(--text-primary)', borderRadius: '8px', color: 'var(--text-accent)', fontSize: '0.7rem', fontWeight: 800, padding: '4px 8px', cursor: 'pointer' }}
                            >CAMBIAR</button>
                        </div>

                        <div style={{ width: '50px', height: '50px', background: 'var(--input-bg)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', border: '2px solid var(--text-primary)' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>
                        </div>

                        <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '5px', color: 'var(--text-primary)' }}>Tu Identidad Confirmada</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', opacity: 0.8, fontWeight: 600, marginBottom: '15px', lineHeight: 1.3 }}>
                            Ya estás listo/a para enviar tu pregunta al equipo de Sergio Fajardo.
                        </p>

                        <button className="btn btn-primary btn-floating-cta" onClick={() => navigateTo('screen-question')} style={{
                            padding: '14px',
                            fontSize: '1.05rem',
                            borderRadius: '16px',
                            width: '100%',
                            fontWeight: 900,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}>
                            Escribir Pregunta
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                        </button>
                    </div>
                )}
            </section>

            {/* MODAL DE POLÍTICA DE PRIVACIDAD */}
            {showPolicy && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <div className="card" style={{ background: 'white', maxWidth: '500px', width: '100%', maxHeight: '80vh', overflowY: 'auto', padding: '30px', borderRadius: '24px', border: '3px solid var(--text-primary)', position: 'relative' }}>
                        <button onClick={() => setShowPolicy(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-primary)' }}>✕</button>
                        <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px', fontSize: '1.4rem' }}>Tratamiento de Datos Personales</h3>
                        <div style={{ fontSize: '0.85rem', lineHeight: '1.6', color: '#444' }}>
                            <p><strong>Responsable:</strong> Equipo Estratégico Compromiso Nacional Fajardo 2026.</p>
                            <p><strong>Finalidad:</strong> Los datos recolectados (Nombre y WhatsApp) se utilizarán exclusivamente para:</p>
                            <ul>
                                <li>Responder de manera directa a sus consultas ciudadanas.</li>
                                <li>Enviar actualizaciones sobre el Plan de Gobierno 2026.</li>
                                <li>Gestionar compromisos ciudadanos con la campaña.</li>
                            </ul>
                            <p><strong>Derechos:</strong> Bajo la Ley 1581 de 2012 (Habeas Data), usted tiene derecho a conocer, actualizar, rectificar y suprimir sus datos de nuestra base de datos en cualquier momento enviando un mensaje a nuestro canal oficial.</p>
                            <p>Al aceptar, usted declara que los datos suministrados son veraces y que autoriza expresamente este contacto.</p>
                        </div>
                        <button className="btn btn-primary" onClick={() => { setAcceptedLegal(true); setShowPolicy(false); }} style={{ marginTop: '20px', width: '100%' }}>Entendido y Acepto</button>
                    </div>
                </div>
            )}
        </div>
    );
}
