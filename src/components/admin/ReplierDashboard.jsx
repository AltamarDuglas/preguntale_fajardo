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
                    <button onClick={fetchPendingQuestions} className="chip" style={{ padding: '6px 12px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                        Refrescar
                    </button>
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
                                        style={{ padding: '10px', fontSize: '0.85rem', background: '#25D366', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                                    > 
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                                WhatsApp + App 
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
