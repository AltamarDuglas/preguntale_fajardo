import { useState } from 'react';
import { ValidationManager } from '../../utils/validation';

export default function HomeScreen({ navigateTo }) {
    const [code, setCode] = useState('');
    const [terms, setTerms] = useState(false);

    const handleActivate = () => {
        if (ValidationManager.isValidActivation(code, terms)) {
            navigateTo('screen-ask');
        }
    };

    return (
        <div className="screen active" id="screen-home">
            <div className="welcome-text">
                <h3>¡Gracias por hacer parte de este equipo!</h3>
                <p>Tu compromiso y confianza en este sueño nos motivan. Te invitamos a registrar tu información para ponernos en contacto y trabajar juntos en sacar a Colombia adelante.</p>
            </div>
            
            <div className="card">
                <h2>Haz tus preguntas</h2>
                <p className="sub">
                    Usa el código de tu volante para desbloquear hasta 3 preguntas y recibir respuestas
                    dentro de las próximas horas.
                </p>
                <div className="stats">
                    <div className="stat">
                        <strong>3</strong>
                        <span>preguntas por persona</span>
                    </div>
                    <div className="stat">
                        <strong>1</strong>
                        <span>código único</span>
                    </div>
                    <div className="stat">
                        <strong>24h</strong>
                        <span>respuesta estimada</span>
                    </div>
                </div>
            </div>

            <div className="card">
                <label htmlFor="codeInput">Ingresa tu código</label>
                <input 
                    id="codeInput" 
                    type="text" 
                    placeholder="Ej: SERGIO-7Q2M" 
                    maxLength="20" 
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <div className="check">
                    <input 
                        id="termsCheck" 
                        type="checkbox" 
                        checked={terms}
                        onChange={(e) => setTerms(e.target.checked)}
                    />
                    <label htmlFor="termsCheck" style={{ margin:0, fontWeight:400 }}>
                        Autorizo el tratamiento de mis datos para esta interacción y acepto que las
                        respuestas provienen del equipo oficial de la campaña.
                    </label>
                </div>
                <div className="actions">
                    <button className="btn btn-primary" onClick={handleActivate}>Activar acceso</button>
                </div>
            </div>

            <div className="card">
                <h3>Temas prioritarios</h3>
                <div className="chips">
                    <span className="chip">Seguridad</span>
                    <span className="chip">Empleo</span>
                    <span className="chip">Movilidad</span>
                    <span className="chip">Educación</span>
                    <span className="chip">Servicios públicos</span>
                    <span className="chip">Juventud</span>
                </div>
            </div>
        </div>
    );
}
