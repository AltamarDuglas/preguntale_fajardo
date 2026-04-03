import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

/**
 * HistoryScreen - Historial de Compromisos Ciudadanos
 * Sincronizado con estados de Supabase (PENDING, ANSWERED)
 * Incluye funcionalidad de "Compartir Captura" estilo Mensaje Oficial.
 */
export default function HistoryScreen({ questions = [], refresh }) {
    const cardRefs = useRef({});

    const handleShare = async (id, text) => {
        const element = cardRefs.current[id];
        if (!element) return;

        try {
            // Optimización para captura: Ocultar temporalmente el botón de compartir
            const shareBtn = element.querySelector('.btn-share-hidden');
            if (shareBtn) shareBtn.style.visibility = 'hidden';

            const canvas = await html2canvas(element, {
                backgroundColor: '#F9A01B',
                scale: 3, // Mayor calidad
                logging: false,
                useCORS: true
            });

            if (shareBtn) shareBtn.style.visibility = 'visible';

            const image = canvas.toDataURL("image/png");

            // Intentar compartir vía Web Share API si está disponible
            if (navigator.share) {
                const blob = await (await fetch(image)).blob();
                const file = new File([blob], `respuesta-fajardo-${id}.png`, { type: 'image/png' });
                navigator.share({
                    title: 'Respuesta de Sergio Fajardo',
                    text: `Mira lo que me respondió Sergio Fajardo: "${text.substring(0, 50)}..."`,
                    files: [file]
                }).catch(() => {
                    // Fallback a descarga si falla el share
                    downloadImage(image, id);
                });
            } else {
                downloadImage(image, id);
            }
        } catch (err) {
            console.error("Error capturando la pantalla:", err);
        }
    };

    const downloadImage = (blob, id) => {
        const link = document.createElement('a');
        link.href = blob;
        link.download = `respuesta-fajardo-${id}.png`;
        link.click();
    };

    if (!questions || questions.length === 0) {
        return (
            <div className="screen active" id="screen-history">
                <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <div style={{ marginBottom: '20px', color: 'var(--text-primary)', opacity: 0.5 }}>
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                    </div>
                    <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Aún no has preguntado</h3>
                    <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Tus preguntas aparecerán aquí una vez las envíes.</p>
                    <button className="btn btn-secondary" onClick={refresh} style={{ marginTop: '15px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: '15px auto 0' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                        Actualizar historial
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="screen active" id="screen-history" style={{ paddingBottom: '110px' }}>
            <div className="card" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', border: '3px solid var(--text-primary)', borderRadius: '20px', padding: '15px 20px' }}>
                <div>
                    <h2 style={{ fontSize: '1.3rem', margin: 0, color: 'var(--text-primary)', fontWeight: 900 }}>TU HISTORIAL</h2>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-accent)', margin: 0 }}>SALA DE RESPUESTAS OFICIALES</p>
                </div>
                <button
                    onClick={refresh}
                    style={{ background: 'var(--bg-main)', border: '2.5px solid var(--text-primary)', borderRadius: '12px', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0, boxShadow: '3px 3px 0 var(--text-primary)' }}
                    title="Actualizar respuestas"
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                </button>
            </div>

            <div className="question-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {questions.map((q) => (
                    <div
                        key={q.id}
                        ref={el => cardRefs.current[q.id] = el}
                        className="question-card"
                        style={q.status === 'ANSWERED' ? {
                            background: 'linear-gradient(160deg, #ffffff 0%, #f4f7fb 100%)',
                            padding: '32px 24px',
                            borderRadius: '24px',
                            border: '1px solid rgba(0, 55, 126, 0.1)',
                            boxShadow: '0 15px 35px rgba(0, 55, 126, 0.08)',
                            position: 'relative',
                            overflow: 'hidden',
                            marginBottom: '20px'
                        } : {
                            background: 'white',
                            padding: '24px',
                            borderRadius: '24px',
                            border: '3px solid var(--text-primary)',
                            boxShadow: '8px 8px 0 var(--text-primary)',
                            position: 'relative',
                            overflow: 'hidden',
                            marginBottom: '20px'
                        }}
                    >
                        {/* MARCA DE AGUA (Solo si está respondida para darle toque Premium) */}
                        {q.status === 'ANSWERED' && (
                            <div style={{
                                position: 'absolute',
                                right: '-5%',
                                bottom: '-5%',
                                fontSize: '130px',
                                fontWeight: 900,
                                color: 'var(--text-primary)',
                                opacity: 0.03,
                                pointerEvents: 'none',
                                lineHeight: 0.8,
                                letterSpacing: '-5px',
                                zIndex: 0
                            }}>
                                FAJARDO<br/>2026
                            </div>
                        )}

                        {/* HEADER DE LA TARJETA */}
                        {q.status === 'ANSWERED' ? (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', position: 'relative', zIndex: 1, borderBottom: '1px solid rgba(0,55,126,0.1)', paddingBottom: '15px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-accent)', letterSpacing: '1px', textTransform: 'uppercase' }}>Comunicado Oficial</span>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>Compromiso Ciudadano</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#e8f5e9', padding: '6px 12px', borderRadius: '20px', border: '1px solid #27ae60' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#27ae60', letterSpacing: '0.5px' }}>VERIFICADO</span>
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 800, opacity: 0.6 }}>
                                        {q.created_at ? new Date(q.created_at).toLocaleDateString() : 'RECIENTE'}
                                    </span>
                                </div>
                                <div style={{
                                    padding: '4px 10px',
                                    borderRadius: '20px',
                                    fontSize: '0.65rem',
                                    fontWeight: 900,
                                    border: '1.5px solid currentColor',
                                    color: 'var(--text-accent)',
                                    textTransform: 'uppercase',
                                    background: '#fff5f5'
                                }}>
                                    ○ En Revisión
                                </div>
                            </div>
                        )}

                        {/* PREGUNTA CIUDADANA */}
                        {q.status === 'ANSWERED' ? (
                            <div style={{ position: 'relative', zIndex: 1, marginBottom: '25px', paddingLeft: '15px', borderLeft: '3px solid var(--text-accent)' }}>
                                <p style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-primary)', opacity: 0.7, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pregunta del Ciudadano:</p>
                                <p style={{ fontSize: '1.1rem', fontStyle: 'italic', fontWeight: 600, margin: 0, lineHeight: 1.4, color: '#444' }}>"{q.text}"</p>
                            </div>
                        ) : (
                            <div style={{ marginBottom: '20px' }}>
                                <p style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-accent)', marginBottom: '5px', textTransform: 'uppercase' }}>Tu Pregunta:</p>
                                <p style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, lineHeight: 1.4, color: 'var(--text-primary)' }}>"{q.text}"</p>
                            </div>
                        )}

                        {/* RESPUESTA OFICIAL */}
                        {q.status === 'ANSWERED' && q.answer ? (
                            <div style={{
                                position: 'relative',
                                zIndex: 1,
                                background: 'white',
                                padding: '24px',
                                borderRadius: '16px',
                                border: '1px solid rgba(0,55,126,0.06)',
                                boxShadow: '0 8px 25px rgba(0,0,0,0.04)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                                    {/* Contenedor del avatar de Sergio Fajardo para la captura */}
                                    <div style={{
                                        width: '46px',
                                        height: '46px',
                                        borderRadius: '50%',
                                        border: '2px solid white',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        flexShrink: 0,
                                        backgroundImage: 'url(/fajardo_sombrero.webp)',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat'
                                    }} title="Sergio Fajardo" aria-label="Avatar de Sergio Fajardo">
                                    </div>
                                    <div>
                                        <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 900 }}>Sergio Fajardo</strong>
                                        <span style={{ fontSize: '0.65rem', color: 'var(--text-accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Candidato Presidencial</span>
                                    </div>
                                </div>

                                <p style={{ fontSize: '1.05rem', color: '#1a1a1a', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                                    {q.answer}
                                </p>

                                <div style={{ marginTop: '20px', borderTop: '1px dashed rgba(0,55,126,0.1)', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ opacity: 0.5, fontSize: '0.6rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.5px' }}>
                                        GENERADO DESDE EL PORTAL OFICIAL
                                    </div>
                                    <button
                                        className="btn-share-hidden"
                                        onClick={() => handleShare(q.id, q.answer)}
                                        style={{
                                            background: 'linear-gradient(90deg, var(--text-primary) 0%, #004d99 100%)',
                                            color: 'white',
                                            border: 'none',
                                            padding: '8px 16px',
                                            borderRadius: '99px',
                                            fontSize: '0.75rem',
                                            fontWeight: 800,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            boxShadow: '0 4px 12px rgba(0, 55, 126, 0.25)',
                                            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                                        }}
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
                                        COMPARTIR
                                    </button>
                                </div>
                            </div>
                        ) : q.status === 'PENDING' ? (
                            <div style={{
                                marginTop: '15px',
                                padding: '15px',
                                background: '#f8f9fa',
                                borderRadius: '15px',
                                border: '1.5px solid #eee',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                fontSize: '0.8rem',
                                color: '#666',
                                fontWeight: 600
                            }}>
                                <div className="spinner-mini" style={{ width: '16px', height: '16px', border: '2px solid #ddd', borderTop: '2px solid var(--text-accent)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                                Analizando tu consulta para darte una respuesta seria...
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}

