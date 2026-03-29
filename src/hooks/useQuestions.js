import { useState, useEffect } from 'react';

/**
 * useQuestions - Sincronización Real con Backend NestJS/Supabase
 * Gestiona el historial de consultas basándose en la identidad (Teléfono).
 */
export function useQuestions() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState(null);

    // Cargar identidad al iniciar
    useEffect(() => {
        const savedIdentity = localStorage.getItem('fajardo_identity');
        if (savedIdentity) {
            const { phone: savedPhone } = JSON.parse(savedIdentity);
            setPhone(savedPhone);
        }
    }, [questions.length]); // Re-evaluar si cambia el historial

    // Cargar preguntas desde la API
    useEffect(() => {
        if (!phone) return;

        const fetchQuestions = async () => {
            setLoading(true);
            try {
                // Suponiendo un endpoint que filtre por teléfono (o el usuario logueado en Supabase)
                // Para este MVP, pedimos las preguntas del usuario al backend.
                const res = await fetch(`http://localhost:3001/questions/by-phone/${phone}`);
                if (res.ok) {
                    const data = await res.json();
                    setQuestions(Array.isArray(data) ? data : [data]);
                }
            } catch (err) {
                console.error('Error cargando historial:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [phone]);

    const submitQuestion = async (qData, onSuccess) => {
        try {
            const res = await fetch('http://localhost:3001/questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(qData)
            });

            if (res.ok) {
                const data = await res.json();
                setQuestions(prev => [data, ...prev]);
                if (onSuccess) onSuccess();
            } else {
                const error = await res.json();
                alert(error.message || 'Error al enviar');
            }
        } catch (err) {
            alert('Error de conexión con el servidor.');
        }
    };

    return {
        questions,
        loading,
        submitQuestion,
        remaining: 1 - questions.length // Lógica de 1 pregunta x usuario
    };
}
