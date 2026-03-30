// Generador de Efectos de Sonido Sintéticos (Web Audio API)
// No requiere archivos MP3, garantizando carga instantánea.

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

const initAudio = () => {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
};

const playTone = (frequency, type, duration, vol) => {
    initAudio();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
};

export const playTick = () => {
    // Sonido corto y seco tipo ruleta o reloj ('tick')
    playTone(800, 'triangle', 0.05, 0.1);
};

export const playWin = () => {
    initAudio();
    // Sonido de victoria tipo campana/notificación ('ta-da!')
    const now = audioCtx.currentTime;
    
    // Acorde 1 (Rápido)
    playTone(523.25, 'sine', 0.2, 0.2); // C5
    playTone(659.25, 'sine', 0.2, 0.2); // E5
    
    // Acorde 2 (Sostenido)
    setTimeout(() => {
        playTone(659.25, 'sine', 0.6, 0.3); // E5
        playTone(783.99, 'sine', 0.6, 0.3); // G5
        playTone(1046.50, 'sine', 0.6, 0.3); // C6
    }, 150);
};
