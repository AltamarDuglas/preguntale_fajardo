import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

/**
 * useQuestions - Sincronización Serverless Directa con Supabase
 * Optimizado para evitar errores de relación (Joins) inexistentes.
 */
export function useQuestions() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        const savedIdentity = localStorage.getItem('fajardo_identity');
        if (!savedIdentity) return;

        const { phone } = JSON.parse(savedIdentity);
        setLoading(true);

        const { data, error } = await supabase
            .from('questions')
            .select('*') // Eliminamos el join con profiles para evitar errores PGRST200
            .eq('phone', phone)
            .order('created_at', { ascending: false });

        if (error) console.error('Error cargando historial:', error);
        else setQuestions(data || []);
        setLoading(false);
    };

    const submitQuestion = async (qData, onSuccess) => {
        setLoading(true);
        
        // 1. Verificar si ya existe una pregunta 
        // (Nota: RLS o un índice único en 'phone' en Supabase es más seguro)
        const { data: existing } = await supabase
            .from('questions')
            .select('id')
            .eq('phone', qData.phone)
            .maybeSingle();

        if (existing) {
            alert('Ya tenemos una consulta registrada con este número telefónico.');
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
        remaining: 1 - questions.length,
        refresh: fetchQuestions
    };
}
