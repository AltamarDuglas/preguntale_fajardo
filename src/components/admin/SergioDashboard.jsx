import { useState, useEffect } from 'react';

/**
 * SergioDashboard - La Experiencia de Respuesta Inmersiva
 * Presenta la Ruleta de Ciudadanos para gamificar y humanizar la respuesta.
 */
export default function SergioDashboard({ user, onLogout }) {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [answer, setAnswer] = useState('');
    const [isSpinning, setIsSpinning] = useState(false);
    const [message, setMessage] = useState('');

    const spinRoulette = async () => {
        setIsSpinning(true);
        setCurrentQuestion(null);
        setAnswer('');
        setMessage('');

        // Simulación visual de "giro" (espera de 1.5s)
        setTimeout(async () => {
            try {
                const res = await fetch('http://localhost:3001/questions/random');
                const data = await res.json();
                
                if (!data) {
                    setMessage('¡Felicidades! No hay preguntas pendientes por ahora.');
                } else {
                    setCurrentQuestion(data);
                }
            } catch (err) {
                setMessage('Error al conectar con la plataforma.');
            } finally {
                setIsSpinning(false);
            }
        }, 1500);
    };

    const handleAnswer = async () => {
        if (!answer.trim()) return;

        try {
            const res = await fetch(`http://localhost:3001/questions/${currentQuestion.id}/answer`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answer })
            });

            if (res.ok) {
                setMessage('Respuesta enviada con éxito.');
                setCurrentQuestion(null);
                setAnswer('');
            }
        } catch (err) {
            setMessage('Error al enviar la respuesta.');
        }
    };

    return (
        <div className="sergio-dash" style={{ padding: '20px', textAlign: 'center', height: '100dvh', overflowY: 'auto', background: 'var(--bg-main)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ textAlign: 'left' }}>
                    <h3 style={{ margin: 0 }}>Bienvenido, {user.name}</h3>
                    <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Rol: {user.role}</span>
                </div>
                <button onClick={onLogout} style={{ background: 'none', border: 'none', color: 'var(--text-accent)', textDecoration: 'underline' }}>Cerrar sesión</button>
            </div>

            {/* LA RULETA (UI Representativa) */}
            <div className="roulette-container" style={{ marginBottom: '40px', position: 'relative' }}>
                <div className={`roulette-wheel ${isSpinning ? 'spinning' : ''}`} style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    border: '10px solid var(--text-primary)',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'white',
                    fontSize: '3rem',
                    transition: 'transform 1.5s cubic-bezier(0.17, 0.67, 0.83, 0.67)'
                }}>
                    🗳️
                </div>
                <button 
                    className="btn btn-primary" 
                    onClick={spinRoulette} 
                    disabled={isSpinning}
                    style={{ marginTop: '20px', borderRadius: '50px', padding: '12px 30px' }}
                >
                    {isSpinning ? 'Girando...' : 'Girar la Ruleta Ciudadana ➔'}
                </button>
            </div>

            {/* PREGUNTA SELECCIONADA */}
            {currentQuestion && (
                <div className="card" style={{ background: 'white', padding: '20px', borderRadius: '24px', textAlign: 'left', animation: 'fadeIn 0.5s ease' }}>
                    <div style={{ marginBottom: '12px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                        <strong style={{ color: 'var(--text-accent)' }}>Consulta de: {currentQuestion.users?.name || 'Ciudadano'}</strong>
                    </div>
                    <p style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '20px' }}>"{currentQuestion.text}"</p>
                    
                    <textarea 
                        placeholder="Escribe aquí tu respuesta oficial..."
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        style={{ minHeight: '120px', marginBottom: '16px' }}
                    ></textarea>
                    
                    <button className="btn btn-primary" onClick={handleAnswer} style={{ width: '100%' }}>Enviar Respuesta Oficial</button>
                </div>
            )}

            {message && <p style={{ marginTop: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>{message}</p>}
        </div>
    );
}
