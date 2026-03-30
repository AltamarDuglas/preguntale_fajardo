/**
 * HistoryScreen - Historial de Compromisos Ciudadanos
 * Sincronizado con estados de Supabase (PENDING, ANSWERED)
 */
export default function HistoryScreen({ questions = [], refresh }) {
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
                    <button className="btn btn-secondary" onClick={refresh} style={{ marginTop: '15px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: '15px auto 0' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                        Actualizar historial
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="screen active" id="screen-history" style={{ paddingBottom: '100px' }}>
            <div className="card" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Tu historial</h2>
                    <p style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '5px' }}>Sincronizado con Sergio.</p>
                </div>
                <button 
                    onClick={refresh} 
                    style={{ background: 'var(--bg-main)', border: '2px solid var(--text-primary)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}
                    title="Actualizar respuestas"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                </button>
            </div>

            <div className="question-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {questions.map((q) => (
                    <div key={q.id} className="question-card" style={{ 
                        background: 'white', 
                        padding: '20px', 
                        borderRadius: '20px',
                        border: '2px solid var(--text-primary)',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                    }}>
                        <div className="question-head" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                            <span style={{ opacity: 0.6 }}>
                                {q.created_at ? new Date(q.created_at).toLocaleDateString() : 'Reciente'}
                            </span>
                            <span style={{ 
                                color: q.status === 'ANSWERED' ? '#27ae60' : 'var(--text-accent)',
                                textTransform: 'uppercase'
                            }}>
                                {q.status === 'ANSWERED' ? '● Respondida' : '● En revisión'}
                            </span>
                        </div>
                        <p style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0, lineHeight: 1.4 }}>"{q.text}"</p>
                        
                        {q.status === 'ANSWERED' && q.answer && (
                            <div className="answer" style={{ 
                                marginTop: '16px', 
                                padding: '15px', 
                                background: 'rgba(249, 160, 27, 0.1)', 
                                borderRadius: '12px',
                                borderLeft: '4px solid var(--text-accent)',
                                fontSize: '0.95rem',
                                color: 'var(--text-primary)'
                            }}>
                                <strong style={{ display: 'block', marginBottom: '5px', fontSize: '0.75rem', color: 'var(--text-accent)' }}>Respuesta de Sergio:</strong>
                                {q.answer}
                            </div>
                        )}

                        {q.status === 'PENDING' && (
                            <div style={{ marginTop: '12px', fontSize: '0.75rem', color: '#666', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                Sergio o su equipo están analizando tu consulta.
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
