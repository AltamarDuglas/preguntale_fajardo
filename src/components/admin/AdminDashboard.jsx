import { useState } from 'react';

/**
 * AdminDashboard - Control de Equipo de Respuesta
 * Permite al administrador crear perfiles de Respondedores.
 */
export default function AdminDashboard({ user, onLogout }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleCreateReplier = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3001/users/replier', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, password })
            });

            if (res.ok) {
                setMessage('Respondedor creado exitosamente.');
                setName(''); setPhone(''); setPassword('');
            } else {
                const data = await res.json();
                setMessage(data.message || 'Error al crear.');
            }
        } catch (err) {
            setMessage('Error de conexión.');
        }
    };

    return (
        <div style={{ padding: '20px', background: 'var(--bg-main)', minHeight: '100dvh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h3>Panel de Administración</h3>
                <button onClick={onLogout} style={{ background: 'none', border: 'none', color: 'var(--text-accent)' }}>Cerrar sesión</button>
            </div>

            <div className="card" style={{ background: 'white', padding: '25px', borderRadius: '24px' }}>
                <h4 style={{ marginBottom: '20px' }}>Crear Nuevo Respondedor</h4>
                <form onSubmit={handleCreateReplier}>
                    <input 
                        type="text" 
                        placeholder="Nombre del técnico/equipo" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ marginBottom: '12px' }}
                        required
                    />
                    <input 
                        type="text" 
                        placeholder="Usuario / Teléfono" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{ marginBottom: '12px' }}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Contraseña" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ marginBottom: '20px' }}
                        required
                    />
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Dar de Alta Respondedor</button>
                </form>
                {message && <p style={{ marginTop: '16px', fontWeight: 600, textAlign: 'center' }}>{message}</p>}
            </div>
            
            <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Los respondedores podrán usar la Ruleta para contestar preguntas ciudadanas.</p>
            </div>
        </div>
    );
}
