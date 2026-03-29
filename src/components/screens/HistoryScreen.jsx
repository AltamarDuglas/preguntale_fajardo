/**
 * HistoryScreen - Historial de Compromisos Ciudadanos
 * Sincronizado con estados de Supabase (PENDING, ANSWERED)
 */
export default function HistoryScreen({ questions = [] }) {
    if (!questions || questions.length === 0) {
        return (
            <div className="screen active" id="screen-history">
                <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '20px' }}>✉️</div>
                    <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Aún no has preguntado</h3>
                    <p style={{ opacity: 0.7, fontSize: '0.9rem', marginTop: '10px' }}>
                        Tus inquietudes son el motor del Cambio Serio de Sergio Fajardo.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="screen active" id="screen-history" style={{ paddingBottom: '100px' }}>
            <div className="card" style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Tu historial</h2>
                <p style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '5px' }}>
                    Seguimiento en tiempo real de tus consultas oficiales.
                </p>
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
                            <div style={{ marginTop: '12px', fontSize: '0.75rem', color: '#666', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                ⏳ Sergio o su equipo están analizando tu consulta.
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
