export default function HistoryScreen({ questions }) {
    return (
        <div className="screen active" id="screen-history">
            <div className="card">
                <h2>Tu historial</h2>
                <p className="sub">
                    Seguimiento de tus consultas y respuestas oficiales.
                </p>
            </div>
            <div className="question-list">
                {questions.map((q) => (
                    <div key={q.id} className="question-card">
                        <div className="question-head">
                            <span>{q.timeLabel || 'Hace un momento'}</span>
                            <span className={`pill ${q.status === 'ready' ? 'ready' : 'pending'}`}>
                                {q.status === 'ready' ? '● Respondida' : '● En revisión'}
                            </span>
                        </div>
                        <p>{q.text}</p>
                        
                        {q.status === 'ready' && q.answer && (
                            <div className="answer">
                                {q.answer}
                            </div>
                        )}
                        {q.status === 'pending' && (
                            <div className="mini" style={{marginTop:'8px', fontSize:'0.8rem', color:'#666', fontWeight: 600}}>Respuesta estimada entre 2 y 6 horas</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
