import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

/**
 * SergioDashboard Serverless - Ruleta con lógica de cliente Supabase
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

        setTimeout(async () => {
            const { data, error } = await supabase
                .from('questions')
                .select('*')
                .eq('status', 'PENDING');

            if (error || !data || data.length === 0) {
                setMessage('No hay preguntas pendientes.');
            } else {
                const randomIndex = Math.floor(Math.random() * data.length);
                setCurrentQuestion(data[randomIndex]);
            }
            setIsSpinning(false);
        }, 1500);
    };

    const handleAnswer = async () => {
        if (!answer.trim()) return;

        const { error } = await supabase
            .from('questions')
            .update({ answer, status: 'ANSWERED' })
            .eq('id', currentQuestion.id);

        if (!error) {
            alert('¡Respuesta oficial enviada con éxito!');
            setMessage('Respuesta enviada con éxito.');
            setCurrentQuestion(null);
        } else {
            console.error('Error Supabase:', error);
            alert('Error al enviar la respuesta: ' + error.message);
            setMessage('Error al enviar la respuesta.');
        }
    };

    return (
        <div className="sergio-dash" style={{ padding: '20px', textAlign: 'center', height: '100dvh', overflowY: 'auto', background: 'var(--bg-main)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0 }}>Bienvenido, {user.name}</h3>
                <button onClick={async () => { await supabase.auth.signOut(); onLogout(); }} style={{ background: 'none', border: 'none', color: 'var(--text-accent)' }}>Salir</button>
            </div>

            <div className={`roulette-wheel ${isSpinning ? 'spinning' : ''}`} style={{ width: '180px', height: '180px', borderRadius: '50%', border: '8px solid var(--text-primary)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', fontSize: '3rem' }}>🗳️</div>
            <button className="btn btn-primary" onClick={spinRoulette} disabled={isSpinning} style={{ marginTop: '20px' }}>{isSpinning ? 'GIRANDO...' : 'GIRAR RULETA'}</button>

            {currentQuestion && (
                <div className="card" style={{ background: 'white', padding: '20px', borderRadius: '24px', textAlign: 'left', marginTop: '30px' }}>
                    <p style={{ fontWeight: 700 }}>Consulta de: {currentQuestion.name}</p>
                    <p style={{ marginBottom: '20px' }}>"{currentQuestion.text}"</p>
                    <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} style={{ minHeight: '100px' }}></textarea>
                    <button className="btn btn-primary" onClick={handleAnswer} style={{ width: '100%', marginTop: '10px' }}>Responder</button>
                </div>
            )}
            {message && <p style={{ marginTop: '20px', fontWeight: 700 }}>{message}</p>}
        </div>
    );
}
