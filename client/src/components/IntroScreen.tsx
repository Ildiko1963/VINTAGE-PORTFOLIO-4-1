import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AudioControls } from '@/lib/types';

interface IntroScreenProps {
  audioControls: AudioControls;
  onComplete: () => void;
}

export default function IntroScreen({ audioControls, onComplete }: IntroScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
        }
        return newProgress;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleEnterSite = useCallback(() => {
    setIsVisible(false);
    
    // Initialize audio context first (browser requires user interaction)
    audioControls.initializeAudio();
    
    // Start projector sound
    audioControls.toggleProjector();
    
    // Start background music with delay
    setTimeout(() => {
      audioControls.toggleMusic();
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#463730]"
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="text-center">
            <div className="mb-8">
              <motion.img 
                src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Vintage film projector" 
                className="w-40 h-40 mx-auto object-cover rounded-full border-4 border-[#D9BF77]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              />
            </div>
            <motion.h1 
              className="text-3xl md:text-5xl font-playfair text-[#D9BF77] mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Vintage Film Portfolio
            </motion.h1>
            <motion.p 
              className="text-[#C8B28E] text-lg mb-8"
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
