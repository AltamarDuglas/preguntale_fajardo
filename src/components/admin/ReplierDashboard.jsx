import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

/**
 * ReplierDashboard Serverless - Panel para Voluntarios
 * Permite listar todas las preguntas pendientes, responder directamente o vía WhatsApp.
 */
export default function ReplierDashboard({ user, onLogout }) {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState({}); // Objeto para manejar múltiples inputs: { id: 'texto' }

    useEffect(() => {
        fetchPendingQuestions();
    }, []);

    const fetchPendingQuestions = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('questions')
            .select('*')
            .eq('status', 'PENDING')
            .order('created_at', { ascending: true });

        if (!error && data) {
            setQuestions(data);
        }
        setLoading(false);
    };

    const handleAnswerChange = (id, text) => {
        setAnswers(prev => ({ ...prev, [id]: text }));
    };

    const submitResponse = async (q, type = 'APP') => {
        const textToSave = answers[q.id] || (type === 'WA' ? 'Respuesta gestionada por WhatsApp.' : '');
        
        if (!textToSave.trim()) {
            alert('Por favor escribe una respuesta antes de enviar.');
            return;
        }

        // 1. Si es WhatsApp, abrimos la pestaña primero
        if (type === 'WA') {
            const whatsappMsg = encodeURIComponent(
                `Hola ${q.name.split(' ')[0]}, ya respondimos tu consulta: "${q.text}". La respuesta es: "${textToSave}". Revisa tu historial en sergio-fajardo.app`
            );
            let cleanPhone = q.phone.replace(/\D/g, '');
            if (cleanPhone.length === 10) cleanPhone = '57' + cleanPhone;
            window.open(`https://wa.me/${cleanPhone}?text=${whatsappMsg}`, '_blank');
        }

        // 2. Guardamos en Base de Datos
        const { data, error } = await supabase
            .from('questions')
            .update({ 
                answer: textToSave, 
                status: 'ANSWERED',
                answered_by: user.id 
            })
            .eq('id', q.id)
            .select();

        if (!error && data && data.length > 0) {
            alert('¡Pregunta respondida y cerrada con éxito!');
            setQuestions(questions.filter(item => item.id !== q.id));
        } else {
            console.error('Error al actualizar supabase', error || 'RLS bloqueó la acción');
            alert('Error: No se pudo guardar la respuesta. Verifica permisos.');
        }
    };

    return (
        <div style={{ padding: '20px', background: 'var(--bg-main)', minHeight: '100dvh', overflowY: 'auto', paddingBottom: '90px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0 }}>Panel de Respuesta</h3>
                <button onClick={async () => { await supabase.auth.signOut(); onLogout(); }} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem', marginBottom: 0 }}>Salir</button>
            </div>

            <div className="card" style={{ background: 'white', padding: '20px', borderRadius: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h4 style={{ margin: 0 }}>Pendientes ({questions.length})</h4>
                    <button onClick={fetchPendingQuestions} className="chip" style={{ padding: '4px 10px', fontSize: '0.7rem' }}>🔄 Refrescar</button>
                </div>

                {loading ? (
                    <p>Cargando preguntas...</p>
                ) : questions.length === 0 ? (
                    <p style={{ opacity: 0.6 }}>No hay preguntas pendientes.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {questions.map((q) => (
                            <div key={q.id} style={{ border: '2px solid var(--text-primary)', padding: '15px', borderRadius: '16px', background: '#fff9f0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <strong style={{ fontSize: '1rem' }}>{q.name}</strong>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-accent)', fontWeight: 800 }}>{q.phone}</span>
                                </div>
                                <p style={{ margin: '0 0 15px 0', fontSize: '0.9rem', color: '#444', fontStyle: 'italic' }}>"{q.text}"</p>
                                
                                <textarea 
                                    placeholder="Escribe aquí la respuesta oficial..."
                                    value={answers[q.id] || ''}
                                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                    style={{ minHeight: '80px', fontSize: '0.9rem', marginBottom: '12px', background: 'white' }}
                                />

                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button 
                                        className="btn btn-primary" 
                                        onClick={() => submitResponse(q, 'APP')}
                                        style={{ padding: '10px', fontSize: '0.85rem' }}
                                    > Solo en App </button>
                                    
                                    <button 
                                        className="btn btn-secondary" 
                                        onClick={() => submitResponse(q, 'WA')}
                                        style={{ padding: '10px', fontSize: '0.85rem', background: '#25D366', color: 'white', border: 'none' }}
                                    > WhatsApp + App </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
