import { useState } from 'react';

/**
 * Custom Hook para gestionar el histórico de preguntas.
 * SOLID - Single Responsibility Principle: Gestiona el estado y lógica 
 * del conteo de preguntas y simulación de respuestas.
 */
export function useQuestions() {
    const [remaining, setRemaining] = useState(3);
    const [questions, setQuestions] = useState([
        {
            id: 'demo-1',
            text: '¿Qué propone Sergio para apoyar a los jóvenes que buscan empleo?',
            status: 'ready',
            isRecent: false,
            answer: 'Sergio plantea fortalecer rutas de formación para el trabajo, alianzas con empresas locales y programas que conecten capacitación con oportunidades reales para jóvenes.',
            timeLabel: 'Consulta reciente'
        }
    ]);

    const submitQuestion = (texto, onSuccess) => {
        if (remaining <= 0) return;
        
        setRemaining(prev => prev - 1);
        
        const newQuestion = {
            id: Date.now().toString(),
            text: texto,
            status: 'pending',
            isRecent: true,
            answer: null,
            timeLabel: 'Hace un momento'
        };

        setQuestions(prev => [newQuestion, ...prev]);
        
        if (onSuccess) onSuccess();

        // Simular respuesta después de 2.8 segundos
        setTimeout(() => {
            setQuestions(currentQuestions => 
                currentQuestions.map(q => 
                    q.id === newQuestion.id 
                    ? { 
                        ...q, 
                        status: 'ready', 
                        answer: 'Gracias por tu interés en nuestras propuestas. Sergio Fajardo está comprometido con la transparencia y el desarrollo sostenible. Tu pregunta ha sido procesada y esta respuesta refleja nuestra postura oficial sobre el tema consultado.',
                        timeLabel: 'Respondida hace unos segundos'
                      }
                    : q
                )
            );
        }, 2800);
    };

    return {
        remaining,
        questions,
        submitQuestion
    };
}
