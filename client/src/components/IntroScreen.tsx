import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AudioControls } from '@/lib/types';

interface IntroScreenProps {
  audioControls: AudioControls;
  onComplete: () => void;
}

export default function IntroScreen({ audioControls, onComplete }: IntroScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [audioPreloaded, setAudioPreloaded] = useState(false);
  const instrumentalRef = useRef<HTMLAudioElement | null>(null);
  
  // Pre-initialize audio when component mounts to ensure proper loading
  useEffect(() => {
    console.log('Preparing audio resources...');
    
    // Initialize instrumental music for loading screen
    const instrumental = new Audio('/audio/instrumental.mp3.mp3');
    instrumental.loop = true;
    instrumental.volume = 0.7;
    instrumentalRef.current = instrumental;
    
    // Try to play instrumental music immediately (some browsers allow it)
    const playInstrumental = async () => {
      try {
        await instrumental.play();
        console.log('Instrumental music started during loading');
      } catch (error) {
        console.log('Instrumental music will start after user interaction');
      }
    };
    
    playInstrumental();
    
    return () => {
      if (instrumentalRef.current) {
        instrumentalRef.current.pause();
        instrumentalRef.current.src = '';
      }
    };
  }, []);
  
  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          // Mark audio as ready to be initialized
          setAudioPreloaded(true);
        }
        return newProgress;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleEnterSite = useCallback(() => {
    // Stop instrumental music
    if (instrumentalRef.current) {
      instrumentalRef.current.pause();
      console.log('Instrumental music stopped');
    }
    
    // Mark site as entering
    setIsVisible(false);
    
    // Play a test sound to break audio restrictions
    const unlockAudio = () => {
      // Create a silent audio element
      const unlockElement = new Audio();
      unlockElement.play().then(() => {
        console.log('Audio playback unlocked successfully');
      }).catch(err => {
        console.log('Audio unlock attempted');
      });
      
      // Also create AudioContext to unlock audio on iOS/Safari
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        const audioContext = new AudioContext();
        // Resume the audio context (required by some browsers like Chrome)
        if (audioContext.state === 'suspended') {
          audioContext.resume();
        }
        
        // Create and play a silent buffer to unlock the audio
        const buffer = audioContext.createBuffer(1, 1, 22050);
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(0);
        
        console.log('Audio context unlocked');
      }
    };
    
    // Unlock audio on all browsers
    unlockAudio();
    
    // Initialize main audio system (browser requires user interaction)
    console.log('Starting audio initialization...');
    audioControls.initializeAudio();
    
    // Auto-start the background music (zenegép.mp3) after site loads
    setTimeout(() => {
      console.log('Starting background music...');
      audioControls.toggleMusic();
    }, 500);
    
    // Try again if first attempt fails
    setTimeout(() => {
      if (!audioControls.state.isMusicPlaying) {
        console.log('Retrying background music...');
        audioControls.toggleMusic();
      }
    }, 2000);
    
    // Notify parent that intro is complete
    setTimeout(() => {
      onComplete();
    }, 1000);
  }, [audioControls, onComplete]);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center film-frame"
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            backgroundImage: "url('/static/clean_filmstrip_hatter.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="text-center">
            <div className="mb-8">
              <motion.img 
                src="/static/23358_ildiko.jpg" 
                alt="Portrait of interior designer" 
                className="w-40 h-40 mx-auto object-cover rounded-full border-4 border-[#D9BF77]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              />
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mb-4 relative"
            >
              <h1 className="text-3xl md:text-5xl font-bold text-[#D9BF77]" style={{ fontFamily: 'Didot, serif', fontWeight: 'bold' }}>
                Ildikó Style
              </h1>
              <p className="text-2xl md:text-3xl text-[#D9BF77]" style={{ fontFamily: 'Great Vibes, cursive', position: 'relative', top: '-20px' }}>Interior Design</p>
            </motion.div>
            <motion.p 
              className="text-[#D9BF77] text-lg mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Loading the projector...
            </motion.p>
            <motion.div 
              className="w-64 h-4 mx-auto bg-[#8B7355] rounded-full overflow-hidden"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "16rem", opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <motion.div 
                className="h-full bg-[#D9BF77] rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
            <motion.button
              id="enter-site"
              className="mt-8 px-6 py-3 bg-[#D9BF77] text-[#463730] font-typewriter rounded-md hover:bg-[#C8B28E] transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: progress >= 100 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              onClick={handleEnterSite}
              disabled={progress < 100}
            >
              Start Projection
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
