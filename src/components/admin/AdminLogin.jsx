import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

/**
 * AdminLogin Serverless - Acceso vía Supabase Auth con UX Mejorada
 * Foco: Estética Premium y Navegación de regreso.
 */
export default function AdminLogin({ onLoginSuccess, navigateTo }) {
    const [email, setEmail] = useState('');
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
        <div className="admin-login-layout" style={{ 
            height: '100dvh', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center', 
            background: 'var(--bg-main)',
            padding: '20px'
        }}>
            {/* BOTÓN VOLVER AL INICIO */}
            <button 
                onClick={() => navigateTo('screen-home')}
                className="btn-secondary"
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    padding: '8px 16px',
                    fontSize: '0.8rem',
                    borderRadius: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'white',
                    border: '2px solid var(--text-primary)',
                    boxShadow: '4px 4px 0 var(--text-primary)'
                }}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Volver al Inicio
            </button>

            <div className="card login-card" style={{ 
                maxWidth: '420px', 
                width: '100%', 
                padding: '40px 30px', 
                background: 'white', 
                borderRadius: '32px', 
                border: '3.5px solid var(--text-primary)',
                boxShadow: '10px 10px 0 var(--text-primary)',
                animation: 'cardPopIn 0.5s ease-out'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div style={{ 
                        width: '70px', 
                        height: '70px', 
                        background: 'var(--bg-main)', 
                        borderRadius: '20px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        margin: '0 auto 15px',
                        border: '2px solid var(--text-primary)'
                    }}>
                        <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '5px' }}>Acceso Staff</h2>
                    <p style={{ color: 'var(--text-accent)', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.05em' }}>SERGIO FAJARDO 2026</p>
                </div>

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Correo Electrónico</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Escribe aquí el correo" 
                            required 
                            style={{
                                width: '100%',
                                padding: '14px 18px',
                                borderRadius: '14px',
                                border: '2px solid var(--text-primary)',
                                background: '#f8f9fa',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '25px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Contraseña</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="••••••••" 
                            required 
                            style={{
                                width: '100%',
                                padding: '14px 18px',
                                borderRadius: '14px',
                                border: '2px solid var(--text-primary)',
                                background: '#f8f9fa',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    {error && (
                        <div style={{ 
                            background: '#ffe3e3', 
                            color: '#d32f2f', 
                            padding: '12px', 
                            borderRadius: '12px', 
                            fontSize: '0.85rem', 
                            fontWeight: 600, 
                            marginBottom: '20px',
                            textAlign: 'center',
                            border: '1px solid #ffbaba'
                        }}>
                            {error}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={loading} 
                        className="btn btn-primary" 
                        style={{ 
                            width: '100%', 
                            padding: '16px', 
                            fontSize: '1.1rem',
                            fontWeight: 800,
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}
                    >
                        {loading ? 'Validando...' : (
                            <>
                                Ingresar al Portal
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </>
                        )}
                    </button>
                </form>
            </div>

            <div style={{ marginTop: '30px', opacity: 0.6, fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Portal de Seguridad - Solo Personal Autorizado
            </div>
        </div>
    );
}
