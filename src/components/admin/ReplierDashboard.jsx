import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

/**
 * ReplierDashboard Serverless - Panel para Voluntarios
 * Permite listar todas las preguntas pendientes y contactar vía WhatsApp.
 */
export default function ReplierDashboard({ user, onLogout }) {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const handleWhatsAppAndAnswer = async (q) => {
        // Formatear el mensaje
        const whatsappMsg = encodeURIComponent(
            `Hola ${q.name.split(' ')[0]}, somos del equipo de Sergio Fajardo. Ya vimos tu consulta: "${q.text}". Envíanos tus sugerencias y visita sergio-fajardo.app para ver tu historial actualizado.`
        );
        // Construir URL (asume prefijo de Colombia +57 si el usuario no puso, para simplificar)
        let cleanPhone = q.phone.replace(/\D/g, '');
        if (cleanPhone.length === 10) cleanPhone = '57' + cleanPhone;

        const url = `https://wa.me/${cleanPhone}?text=${whatsappMsg}`;

        // Abrir WhatsApp
        window.open(url, '_blank');

        // Actualizar Base de Datos para que el ciudadano lo vea en su historial
        const { data, error } = await supabase
            .from('questions')
            .update({ answer: 'Respuesta gestionada a través de WhatsApp.', status: 'ANSWERED' })
            .eq('id', q.id)
            .select();

        if (!error && data && data.length > 0) {
            alert('Pregunta marcada como RESPONDIDA en la base de datos.');
            setQuestions(questions.filter(item => item.id !== q.id));
        } else {
            console.error('Error al actualizar supabase', error || 'Permisos denegados por RLS');
            alert('Error: La pregunta no se actualizó (Probable problema de permisos).');
        }
    };

    return (
        <div style={{ padding: '20px', background: 'var(--bg-main)', minHeight: '100dvh', overflowY: 'auto', paddingBottom: '90px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0 }}>Dashboard Respondedores</h3>
                <button onClick={async () => { await supabase.auth.signOut(); onLogout(); }} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem', marginBottom: 0 }}>Salir</button>
            </div>

            <div className="card" style={{ background: 'white', padding: '20px', borderRadius: '20px' }}>
                <h4 style={{ marginBottom: '15px' }}>Bandeja de entrada ({questions.length})</h4>
                <button onClick={fetchPendingQuestions} style={{ marginBottom: '20px', padding: '6px 12px' }} className="btn-secondary">🔄 Refrescar lista</button>

                {loading ? (
                    <p>Cargando preguntas...</p>
                ) : questions.length === 0 ? (
                    <p style={{ opacity: 0.6 }}>No hay preguntas pendientes. ¡Gran trabajo!</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {questions.map((q) => (
                            <div key={q.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <strong style={{ fontSize: '1.1rem' }}>{q.name}</strong>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-accent)', fontWeight: 700 }}>{q.phone}</span>
                                </div>
                                <p style={{ margin: '0 0 15px 0', fontSize: '0.95rem' }}>"{q.text}"</p>
                                
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => handleWhatsAppAndAnswer(q)}
                                    style={{ padding: '10px', fontSize: '0.9rem', display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }}
                                >
                                    <span>💬 Contactar por WhatsApp y Cerrar</span>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
