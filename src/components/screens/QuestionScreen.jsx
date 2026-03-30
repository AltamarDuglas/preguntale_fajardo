import { useState, useEffect } from 'react';

/**
 * Pantalla Focus: Escribir Compromiso/Pregunta
 * UX enfocada completamente en la escritura sin distracciones.
 */
export default function QuestionScreen({ navigateTo, submitQuestion }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [error, setError] = useState('');

    // Estado para controlar si el usuario ya tiene identidad guardada
    const [isAlreadyIdentified, setIsAlreadyIdentified] = useState(false);

    useEffect(() => {
        const savedIdentity = localStorage.getItem('fajardo_identity');
        if (savedIdentity) {
            try {
                const { name: savedName, phone: savedPhone } = JSON.parse(savedIdentity);
                setName(savedName);
                setPhone(savedPhone);
                setIsAlreadyIdentified(true);
            } catch (e) {
                console.error("Error al leer identidad:", e);
                setIsAlreadyIdentified(false);
            }
        }
        // Eliminamos el redireccionamiento para permitir flujo directo desde el Home
    }, []);

    const handleSend = () => {
        // Validación rigurosa de identidad y mensaje (SOLID: SRP)
        if (!name.trim() || !phone.trim() || phone.trim().length < 7) {
            setError('Por favor completa tu nombre y un teléfono válido antes de enviar.');
            return;
        }

        if (questionText.trim()) {
            // Guardar identidad si no existía para persistencia UX
            if (!isAlreadyIdentified) {
                localStorage.setItem('fajardo_identity', JSON.stringify({ name, phone }));
            }

            submitQuestion({ name, phone, text: questionText }, () => {
                setQuestionText('');
                navigateTo('screen-history');
            });
        } else {
            setError('Escribe tu pregunta o compromiso antes de enviar.');
        }
    };

    return (
        <div className="screen active" id="screen-question" style={{ display: 'flex', flexDirection: 'column', height: '100%', paddingTop: '10px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap: '15px' }}>
                <button 
                    onClick={() => navigateTo('screen-home')}
                    style={{ background: 'white', border: '2px solid var(--text-primary)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                </button>
                <div>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>Tu Compromiso</h3>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-accent)', margin: 0 }}>PASO 2: REDACTAR Y ENVIAR</p>
                </div>
            </div>

            <div className="card" style={{ 
                background: 'white', 
                border: '3px solid var(--text-primary)', 
                padding: '24px 20px', 
                borderRadius: '24px', 
                boxShadow: '8px 8px 0 var(--text-primary)',
                animation: 'cardPopIn 0.4s ease-out',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                marginBottom: '10px'
            }}>
                {isAlreadyIdentified ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', background: 'var(--bg-main)', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid var(--text-primary)' }}>
                        <div style={{ width: '10px', height: '10px', background: '#4caf50', borderRadius: '50%' }}></div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>Escribiendo como {name.split(' ')[0]}</span>
                    </div>
                ) : (
                    <div style={{ marginBottom: '15px' }}>
                        <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-accent)', marginBottom: '10px', textTransform: 'uppercase' }}>Completa tus datos para enviar:</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <input 
                                type="text" 
                                placeholder="Nombre" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ padding: '10px', borderRadius: '10px', border: '2px solid var(--text-primary)', fontSize: '0.85rem' }}
                            />
                            <input 
                                type="tel" 
                                placeholder="WhatsApp" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                style={{ padding: '10px', borderRadius: '10px', border: '2px solid var(--text-primary)', fontSize: '0.85rem' }}
                            />
                        </div>
                    </div>
                )}
                
                <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <textarea 
                        id="focusQuestionInput"
                        placeholder="Escribe aquí tu consulta, propuesta o compromiso para Sergio Fajardo o su equipo técnico..."
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        autoFocus
                        style={{ 
                            flex: 1,
                            minHeight: '200px',
                            marginBottom: '16px', 
                            fontSize: '1.1rem', 
                            padding: '18px',
                            borderRadius: '16px',
                            border: '2.5px solid var(--text-primary)',
                            background: '#fcfcfc',
                            lineHeight: 1.5,
                            resize: 'none'
                        }}
                    ></textarea>
                    <div style={{ position: 'absolute', right: '16px', bottom: '32px', fontSize: '0.75rem', fontWeight: 900, opacity: 0.3, color: 'var(--text-primary)' }}>
                        COMPROMISO 2026
                    </div>
                </div>
                
                {error && (
                    <div style={{ color: '#d32f2f', fontSize: '0.8rem', marginBottom: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        {error}
                    </div>
                )}

                <button className="btn btn-primary" onClick={handleSend} style={{ 
                    padding: '18px', 
                    fontSize: '1.2rem', 
                    borderRadius: '16px', 
                    width: '100%',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px'
                }}>
                    Enviar mi compromiso
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                </button>
            </div>
            
            <p style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', opacity: 0.7, marginTop: '10px' }}>
                Tu mensaje será leído directamente por el equipo estratégico.
            </p>
        </div>
    );
}
