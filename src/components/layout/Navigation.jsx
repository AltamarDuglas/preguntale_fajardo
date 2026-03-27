export default function Navigation({ currentScreen, navigateTo }) {
    return (
        <nav className="app-nav">
            <button 
                className={`nav-btn ${currentScreen === 'screen-home' ? 'active' : ''}`} 
                onClick={() => navigateTo('screen-home')}
            >Inicio</button>
            <button 
                className={`nav-btn ${currentScreen === 'screen-ask' ? 'active' : ''}`} 
                onClick={() => navigateTo('screen-ask')}
            >Preguntar</button>
            <button 
                className={`nav-btn ${currentScreen === 'screen-history' ? 'active' : ''}`} 
                onClick={() => navigateTo('screen-history')}
            >Historial</button>
        </nav>
    );
}
