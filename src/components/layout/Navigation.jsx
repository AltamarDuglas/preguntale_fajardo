/**
 * Navegación Simplificada
 * Solo 2 pestañas para evitar desorganización y focalizar al usuario.
 */
export default function Navigation({ currentScreen, navigateTo }) {
    return (
        <nav className="app-nav" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <button 
                className={`nav-btn ${currentScreen === 'screen-home' ? 'active' : ''}`} 
                onClick={() => navigateTo('screen-home')}
            >Inicio</button>
            <button 
                className={`nav-btn ${currentScreen === 'screen-history' ? 'active' : ''}`} 
                onClick={() => navigateTo('screen-history')}
            >Mi Historial</button>
        </nav>
    );
}
