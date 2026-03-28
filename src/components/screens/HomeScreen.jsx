import { useState } from 'react';
import { ValidationManager } from '../../utils/validation';

/**
 * HomeScreen Consolidado (Foco Nacional - Colombia)
 * SOLID - SRP: Centraliza la experiencia de aterrizaje, mensaje estratégico 
 * y la acción de participación ciudadana.
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

    const handleFillExample = () => {
        setQuestionText('¿Qué acciones concretas propone Sergio para que la educación sea el motor de la economía en Colombia?');
    };

    return (
        <div className="screen active" id="screen-home" style={{ paddingBottom: '100px' }}>
            
            {/* 1. HERO & NARRATIVA NACIONAL */}
            <div className="welcome-text">
                <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.1 }}>
                    Cambio Serio y Seguro para Colombia
                </h3>
                <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>
                    Un país no se construye con insultos, sino con carácter y decencia. 
                    Sergio Fajardo: la fuerza de las propuestas para unir a Colombia.
                </p>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden', borderRadius: '16px', border: '2px solid var(--text-primary)', marginBottom: '32px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
                <img src="/fajardo_sombrero.jpg" alt="Sergio Fajardo" style={{ width: '100%', display: 'block' }} />
                <div style={{ padding: '16px', background: 'white', borderTop: '2px solid var(--text-primary)', textAlign: 'center' }}>
                    <strong style={{ fontSize: '1rem', color: 'var(--text-accent)' }}> Sergio Fajardo: Liderazgo con carácter y resultados</strong>
                </div>
            </div>

            {/* 2. ACCIÓN PRINCIPAL (FORMULARIO INTEGRADO) */}
            <section className="interaction-hub" style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Pregúntale a Sergio</h2>
                
                {!isActivated ? (
                    <div className="card" style={{ background: 'white', border: '2px solid var(--text-primary)', padding: '24px', borderRadius: '16px' }}>
                        <p className="sub" style={{ marginBottom: '20px' }}>Para desbloquear tus 3 preguntas, por favor valida tu acceso.</p>
                        <label htmlFor="codeInput">Ingresa tu código de volante</label>
                        <input 
                            id="codeInput" 
                            type="text" 
                            placeholder="Ej: SERGIO-7Q2M" 
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            style={{ marginBottom: '16px' }}
                        />
                        <div className="check" style={{ marginBottom: '20px' }}>
                            <input 
                                id="termsCheck" 
                                type="checkbox" 
                                checked={terms}
                                onChange={(e) => setTerms(e.target.checked)}
                            />
                            <label htmlFor="termsCheck" style={{ margin:0, fontWeight:400, fontSize: '0.85rem' }}>
                                Autorizo el tratamiento de mis datos y acepto las políticas de la campaña.
                            </label>
                        </div>
                        <button className="btn btn-primary" onClick={handleActivate}>Activar ahora</button>
                    </div>
                ) : (
                    <div className="card" style={{ background: 'white', border: '2px solid var(--text-primary)', padding: '24px', borderRadius: '16px', animation: 'fadeIn 0.4s ease-out' }}>
                        <div className="remaining" style={{ marginBottom: '16px', border: 'none', padding: 0 }}>
                            <span>Preguntas disponibles:</span>
                            <strong style={{ color: 'var(--text-accent)' }}>{remaining}</strong>
                        </div>
                        <label htmlFor="questionInput">Tu consulta para el equipo</label>
                        <textarea 
                            id="questionInput"
                            placeholder="¿Qué proponemos para mejorar la seguridad en tu barrio?"
                            value={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                            style={{ minHeight: '120px', marginBottom: '16px' }}
                        ></textarea>
                        <div className="actions" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', marginTop: 0 }}>
                            <button className="btn btn-secondary" onClick={handleFillExample} style={{ margin: 0 }}>Ver ejemplo</button>
                            <button className="btn btn-primary" onClick={handleSend}>Enviar pregunta</button>
                        </div>
                    </div>
                )}
            </section>

            {/* 3. COMPROMISO COLOMBIA (Estrategia PDF) */}
            <section className="commitments">
                <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', color: 'var(--text-primary)' }}>Nuestro Compromiso con Colombia</h2>
                
                <div className="card" style={{ background: 'rgba(255,255,255,0.6)', border: '2px solid var(--text-primary)', padding: '20px', borderRadius: '16px', marginBottom: '16px' }}>
                    <h4 style={{ color: 'var(--text-accent)', marginBottom: '8px', fontSize: '1.1rem' }}>Seguridad: El Plan Guardián</h4>
                    <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>Recuperaremos el control territorial con inteligencia y mando. Orden sin autoritarismo para que vuelvas a caminar seguro por tu calle.</p>
                </div>

                <div className="card" style={{ background: 'rgba(255,255,255,0.6)', border: '2px solid var(--text-primary)', padding: '20px', borderRadius: '16px', marginBottom: '16px' }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '1.1rem' }}>Revolución Educativa</h4>
                    <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>El conocimiento como motor de productividad. Educación pública de calidad conectada con las necesidades de empleo de cada región.</p>
                </div>

                <div className="card" style={{ background: 'rgba(255,255,255,0.6)', border: '2px solid var(--text-primary)', padding: '20px', borderRadius: '16px', marginBottom: '16px' }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '1.1rem' }}>Economía con Transparencia</h4>
                    <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>Crecimiento serio, sin corrupción. Eliminación de beneficios injustos y apoyo total a la agroindustria nacional.</p>
                </div>

                <div style={{ textAlign: 'center', marginTop: '32px', opacity: 0.8 }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase' }}>El enemigo no somos los colombianos, es la corrupción y la violencia.</p>
                </div>
            </section>
        </div>
    );
}
