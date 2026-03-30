import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

/**
 * useQuestions - Sincronización Serverless Directa con Supabase
 * Optimizado para historial de usuario y contador global en tiempo real.
 */
export function useQuestions() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0); // <--- NUEVO: Contador Global

    useEffect(() => {
        fetchQuestions();
        fetchGlobalCount();

        // 🟢 SUSCRIPCIÓN EN TIEMPO REAL (Contador Global)
        const channel = supabase
            .channel('public:questions')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'questions' }, (payload) => {
                setTotalCount(prev => prev + 1);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchGlobalCount = async () => {
        const { count, error } = await supabase
            .from('questions')
            .select('*', { count: 'exact', head: true });
        
        if (!error) setTotalCount(count || 0);
    };

    const fetchQuestions = async () => {
        const savedIdentity = localStorage.getItem('fajardo_identity');
        if (!savedIdentity) return;

        const { phone } = JSON.parse(savedIdentity);
        setLoading(true);

        const { data, error } = await supabase
            .from('questions')
            .select('*')
            .eq('phone', phone)
            .order('created_at', { ascending: false });

        if (error) console.error('Error cargando historial:', error);
        else setQuestions(data || []);
        setLoading(false);
    };

    const submitQuestion = async (qData, onSuccess) => {
        setLoading(true);
        
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
            // El totalCount se actualizará vía la suscripción Realtime automáticamente
            if (onSuccess) onSuccess();
        }
        setLoading(false);
    };

    return {
        questions,
        loading,
        submitQuestion,
        remaining: 1 - questions.length,
        totalCount, // <--- EXPOSICIÓN GLOBAL
        refresh: fetchQuestions
    };
}
