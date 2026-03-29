import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

/**
 * AdminLogin Serverless - Acceso vía Supabase Auth
 */
export default function AdminLogin({ onLoginSuccess }) {
    const [email, setEmail] = useState(''); // Supabase recomienda email p/ Auth
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { data, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) {
            setError('Credenciales inválidas o acceso denegado.');
        } else {
            // Obtener perfil del usuario para el rol
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', data.user.id)
                .single();

            const userSession = {
                id: data.user.id,
                name: profile?.name || 'Staff',
                role: profile?.role || 'REPLIER',
                email: email
            };

            localStorage.setItem('fajardo_admin_session', JSON.stringify({ user: userSession }));
            onLoginSuccess(userSession);
        }
        setLoading(false);
    };

    return (
        <div className="admin-login-container" style={{ height: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)' }}>
            <div className="card" style={{ maxWidth: '400px', width: '90%', padding: '30px', background: 'white', borderRadius: '24px', border: '3px solid var(--text-primary)' }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>Portal de Gestión</h2>
                    <p style={{ color: 'var(--text-accent)', fontWeight: 700 }}>Sergio Fajardo 2026</p>
                </div>

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Correo Electrónico</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="sergio@fajardo.com" required />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Contraseña</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
                    </div>
                    {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '16px' }}>{error}</p>}
                    <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%' }}>
                        {loading ? 'Ingresando...' : 'Iniciar Sesión ➔'}
                    </button>
                </form>
            </div>
        </div>
    );
}
