import { useState } from 'react';

/**
 * Custom Hook para gestionar la navegación entre pantallas.
 * SOLID - SRP: Extrae la lógica de visibilidad de pantallas de los componentes UI.
 */
export function useNavigation(initialScreen = 'screen-home') {
    const [currentScreen, setCurrentScreen] = useState(initialScreen);

    const navigateTo = (screenId) => {
        setCurrentScreen(screenId);
    };

    return {
        currentScreen,
        navigateTo
    };
}
