/**
 * Utilidades de validación basadas en funciones puras.
 * SOLID - Single Responsibility Principle (SRP): Este módulo solo se
 * encarga de validar reglas de negocio sobre los datos entrantes.
 */

export const ValidationManager = {
    isValidActivation: (code, termsAccepted) => {
        if (!code) {
            alert('Ingresa un código para continuar.');
            return false;
        }
        if (!termsAccepted) {
            alert('Debes aceptar el tratamiento de datos para continuar.');
            return false;
        }
        return true;
    },

    isValidQuestion: (question, remaining) => {
        if (!question) {
            alert('Escribe una pregunta antes de enviarla.');
            return false;
        }
        if (remaining <= 0) {
            alert('Ya usaste tus 3 preguntas.');
            return false;
        }
        return true;
    }
};
