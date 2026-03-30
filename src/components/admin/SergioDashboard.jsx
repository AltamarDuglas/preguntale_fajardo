import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient';

/**
 * SergioDashboard Premium - Ruleta estilo Tragamonedas (Slot Machine)
 */
export default function SergioDashboard({ user, onLogout }) {
    const [allQuestions, setAllQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [answer, setAnswer] = useState('');
    const [isSpinning, setIsSpinning] = useState(false);
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null); // <--- NUEVO
    
    // Estados para la animación de la Slot Machine
    const [visualNames, setVisualNames] = useState([]);
    const [offset, setOffset] = useState(0);
    const [showCard, setShowCard] = useState(false);
    const [transitionEnabled, setTransitionEnabled] = useState(false); // <--- NUEVO

    const spinRoulette = async () => {
        if (isSpinning) return;
        
        setIsSpinning(true);
        setShowCard(false);
        setCurrentQuestion(null);
        setAnswer('');
        setMessage('');
        
        // RESET INSTANTÁNEO: Quitamos la transición para volver al inicio sin que se vea el scroll hacia arriba
        setTransitionEnabled(false);
        setOffset(0);

        // 1. Obtener las preguntas pendientes
        const { data, error } = await supabase
            .from('questions')
            .select('*')
            .eq('status', 'PENDING');

        if (error || !data || data.length === 0) {
            setMessage('No hay preguntas pendientes en este momento.');
            setIsSpinning(false);
            return;
        }

        // 2. Preparar la lista visual (Slot Strip)
        const winnerIndex = Math.floor(Math.random() * data.length);
        const winner = data[winnerIndex];
        
        let tempNames = [];
        // Llenamos la tira con nombres aleatorios
        for (let i = 0; i < 30; i++) {
            const randomName = data[Math.floor(Math.random() * data.length)].name;
            tempNames.push(randomName);
        }
        tempNames.push(winner.name); // El ganador al final de la tira
        
        setVisualNames(tempNames);

        // 3. Iniciar la animación de scroll con un pequeño delay para que el navegador capte el reset
        setTimeout(() => {
            setTransitionEnabled(true); // Re-activamos la transición suave
            setTimeout(() => {
                const finalOffset = (tempNames.length - 1) * 90; 
                setOffset(finalOffset);
            }, 50);
        }, 50);

        // 4. Finalizar después de la animación
        setTimeout(() => {
            setIsSpinning(false);
            setCurrentQuestion(winner);
            setShowCard(true);
            // Autofoco en el textarea después de que la animación de pop-in empiece
            setTimeout(() => {
                if (textareaRef.current) textareaRef.current.focus();
            }, 600);
        }, 3500); 
    };

    const handleAnswer = async () => {
        if (!answer.trim()) return;

        const { data, error } = await supabase
            .from('questions')
            .update({ answer, status: 'ANSWERED' })
            .eq('id', currentQuestion.id)
            .select();

        if (!error && data && data.length > 0) {
            alert('¡Respuesta oficial enviada con éxito!');
            setShowCard(false);
            setCurrentQuestion(null);
        } else {
            console.error('Error:', error);
            alert('Error al guardar la respuesta.');
        }
    };

    return (
        <div className="sergio-dash" style={{ padding: '20px', textAlign: 'center', height: '100dvh', overflowY: 'auto', background: 'var(--bg-main)', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ margin: 0, fontSize: '0.9rem' }}>Bienvenido, {user.name}</h4>
                <button onClick={async () => { await supabase.auth.signOut(); onLogout(); }} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.7rem', marginBottom: 0 }}>Salir</button>
            </div>

            <div style={{ marginTop: '20px', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--text-primary)' }}>🎰 Selección <br/> de Compromiso</h2>
            </div>

            {/* SLOT MACHINE VISOR */}
            <div className="slot-machine-container">
                <div className="slot-indicator"></div>
                <div 
                    className="slot-strip" 
                    style={{ 
                        transform: `translateY(-${offset}px)`,
                        transition: transitionEnabled ? 'transform 3s cubic-bezier(0.15, 0, 0.1, 1)' : 'none' 
                    }}
                >
                    {visualNames.length === 0 ? (
                        <div className="slot-name">LISTO PARA GIRAR</div>
                    ) : (
                        visualNames.map((name, idx) => (
                            <div key={idx} className="slot-name">{name}</div>
                        ))
                    )}
                </div>
            </div>

            <button 
                className="btn btn-primary" 
                onClick={spinRoulette} 
                disabled={isSpinning}
                style={{ width: 'min(90%, 280px)', height: '60px', borderRadius: '30px' }}
            >
                {isSpinning ? 'ANALIZANDO...' : '¡GIRAR RULETA!'}
            </button>

            {message && <p style={{ marginTop: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>{message}</p>}

            {/* CARD GANADORA CON ANIMACIÓN POP-IN */}
            {currentQuestion && showCard && (
                <div className="winner-card" style={{ marginTop: '30px' }}>
                    <div className="card" style={{ background: 'white', padding: '24px', borderRadius: '28px', border: '4px solid var(--text-primary)', textAlign: 'left', boxShadow: '0 20px 50px rgba(0,0,0,0.15)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <span className="pill ready" style={{ fontSize: '0.7rem' }}>SELECCIONADO</span>
                            <span style={{ fontWeight: 800, fontSize: '0.85rem' }}>{currentQuestion.phone}</span>
                        </div>
                        
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>{currentQuestion.name} pregunta:</h3>
                        <p style={{ fontSize: '1.2rem', marginBottom: '25px', lineHeight: 1.4, fontWeight: 500 }}>"{currentQuestion.text}"</p>
                        
                        <textarea 
                            ref={textareaRef}
                            placeholder="Escribe tu compromiso aquí, Sergio..."
                            value={answer} 
                            onChange={(e) => setAnswer(e.target.value)} 
                            style={{ minHeight: '120px', border: '2px solid var(--text-primary)', background: '#f9f9f9', marginBottom: '15px' }}
                        ></textarea>
                        
                        <button className="btn btn-primary" onClick={handleAnswer} style={{ width: '100%', fontSize: '1rem' }}>ENVIAR RESPUESTA OFICIAL</button>
                    </div>
                </div>
            )}
            
            <div style={{ marginTop: '40px', opacity: 0.5, fontSize: '0.7rem' }}>
                Sistema de Escucha Directa - Sergio Fajardo 2026
            </div>
        </div>
    );
}
