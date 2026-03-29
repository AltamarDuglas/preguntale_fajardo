import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

/**
 * AdminDashboard Serverless - Gestión de Equipo de Campaña
 */
export default function AdminDashboard({ user, onLogout }) {
    const [repliers, setRepliers] = useState([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchRepliers();
    }, []);

    const fetchRepliers = async () => {
        const { data } = await supabase.from('profiles').select('*').eq('role', 'REPLIER');
        setRepliers(data || []);
    };

    const handleInviteReplier = () => {
        setMessage('Por seguridad, crea el usuario en "Authentication" de Supabase y luego asígnale el perfil aquí.');
    };

    return (
        <div style={{ padding: '20px', background: 'var(--bg-main)', minHeight: '100dvh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h3 style={{ margin: 0 }}>Panel Admin</h3>
                <button onClick={onLogout} className="btn-secondary" style={{ padding: '8px 15px', fontSize: '0.8rem' }}>Cerrar sesión</button>
            </div>

            <div className="card" style={{ background: 'white', padding: '25px', borderRadius: '24px', marginBottom: '30px' }}>
                <h4 style={{ marginBottom: '15px' }}>Equipo de Respuesta</h4>
                {repliers.length === 0 ? (
                    <p style={{ opacity: 0.6 }}>No hay respondedores activos.</p>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {repliers.map(r => (
                            <li key={r.id} style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
                                <strong>{r.name}</strong> - <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>ID: {r.id.substring(0,8)}...</span>
                            </li>
                        ))}
                    </ul>
                )}
                
                <div style={{ marginTop: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '12px', border: '1px dashed #ccc' }}>
                    <p style={{ fontSize: '0.85rem', margin: 0 }}>
                        <strong>Guía para agregar personal:</strong><br/>
                        1. Crea el usuario en <strong>Auth</strong> de Supabase.<br/>
                        2. Copia su ID y agrégalo a la tabla <code>profiles</code> con rol 'REPLIER'.
                    </p>
                </div>
            </div>

            <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Esta arquitectura Serverless protege las llaves maestras de tu base de datos.</p>
            </div>
        </div>
    );
}
