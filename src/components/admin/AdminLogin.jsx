import { useState } from 'react';

/**
 * AdminLogin - Portal de Acceso para Sergio y Equipo
 * Maneja la autenticación multirrol (Sergio, Admin, Respondedores)
 */
export default function AdminLogin({ onLoginSuccess }) {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:3001/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, password })
            });

            if (!response.ok) throw new Error('Credenciales inválidas');

            const data = await response.json();
            localStorage.setItem('fajardo_admin_session', JSON.stringify(data));
            onLoginSuccess(data.user);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-container" style={{ 
            height: '100dvh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'var(--bg-main)' 
        }}>
            <div className="card" style={{ 
                maxWidth: '400px', 
                width: '90%', 
                padding: '30px', 
                background: 'white',
                borderRadius: '24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                border: '3px solid var(--text-primary)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <h2 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.8rem' }}>Portal Oficial</h2>
                    <p style={{ color: 'var(--text-accent)', fontWeight: 700 }}>Gestión de Campaña</p>
                </div>

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Usuario / Teléfono</label>
                        <input 
                            type="text" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Ej: sergiofajardo"
                            style={{ padding: '12px', fontSize: '1rem' }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Contraseña</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            style={{ padding: '12px', fontSize: '1rem' }}
                            required
                        />
                    </div>

                    {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '16px', fontSize: '0.9rem' }}>{error}</p>}

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="btn btn-primary" 
                        style={{ padding: '14px', width: '100%', fontSize: '1.1rem' }}
                    >
                        {loading ? 'Validando...' : 'Ingresar al Panel ➔'}
                    </button>
                </form>
            </div>
        </div>
    );
}
