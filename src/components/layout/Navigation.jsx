/**
 * Navegación 3.0
 * Estructura de 3 pilares: Inicio (Acción), Propuestas (Contenido), Historial (Seguimiento).
 */
export default function Navigation({ currentScreen, navigateTo }) {
    return (
        <nav className="app-nav" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <button 
                className={`nav-btn ${currentScreen === 'screen-home' ? 'active' : ''}`} 
                onClick={() => navigateTo('screen-home')}
            >Inicio</button>
            <button 
                className={`nav-btn ${currentScreen === 'screen-proposals' ? 'active' : ''}`} 
                onClick={() => navigateTo('screen-proposals')}
            >Propuestas</button>
            <button 
                className={`nav-btn ${currentScreen === 'screen-history' ? 'active' : ''}`} 
                onClick={() => navigateTo('screen-history')}
            >Historial</button>
        </nav>
    );
}
