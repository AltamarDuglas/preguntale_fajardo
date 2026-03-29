import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

/**
 * useQuestions - Sincronización Serverless Directa con Supabase
 */
export function useQuestions() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);

    // Cargar preguntas desde Supabase basándose en el teléfono guardado
    useEffect(() => {
        const fetchQuestions = async () => {
            const savedIdentity = localStorage.getItem('fajardo_identity');
            if (!savedIdentity) return;

            const { phone } = JSON.parse(savedIdentity);
            setLoading(true);

            const { data, error } = await supabase
                .from('questions')
                .select('*, profiles(name)')
                .eq('phone', phone)
                .order('created_at', { ascending: false });

            if (error) console.error('Error:', error);
            else setQuestions(data || []);
            setLoading(false);
        };

        fetchQuestions();
    }, []);

    const submitQuestion = async (qData, onSuccess) => {
        setLoading(true);
        
        // 1. Verificar si ya existe una pregunta para este teléfono
        const { data: existing } = await supabase
            .from('questions')
            .select('id')
            .eq('phone', qData.phone)
            .single();

        if (existing) {
            alert('Solo puedes realizar una pregunta por número telefónico.');
            setLoading(false);
            return;
        }

        // 2. Insertar nueva pregunta
        const { data, error } = await supabase
            .from('questions')
            .insert([{
                text: qData.text,
                name: qData.name,
                phone: qData.phone,
                status: 'PENDING'
            }])
            .select()
            .single();

        if (error) {
            alert('Error al enviar la pregunta.');
        } else {
            setQuestions(prev => [data, ...prev]);
            if (onSuccess) onSuccess();
        }
        setLoading(false);
    };

    return {
        questions,
        loading,
        submitQuestion,
        remaining: 1 - questions.length
    };
}
