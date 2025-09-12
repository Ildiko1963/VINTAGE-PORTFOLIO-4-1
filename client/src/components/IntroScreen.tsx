import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AudioControls } from '@/lib/types';

interface IntroScreenProps {
  audioControls: AudioControls;
  onComplete: () => void;
}

export default function IntroScreen({ audioControls, onComplete }: IntroScreenProps) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    audioControls.initializeAudio();
    onComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#2A1A16] text-[#F2E8D5]"
        style={{
          backgroundImage: 'url(/filmszalag_hatter.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="text-center relative z-10">
          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-[#D9BF77] mb-4"
            style={{ fontFamily: 'Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif', letterSpacing: '0.1em' }}
          >
            Vintage Film Portfolio
          </motion.h1>
          
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-xl md:text-2xl text-[#C8B28E] mb-8 font-typewriter"
          >
            Loading the projector...
          </motion.p>
          
          <AnimatePresence>
            {showButton && (
              <motion.button
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.5 }}
                onClick={handleStart}
                className="px-8 py-4 bg-[#D9BF77] text-[#463730] font-typewriter rounded-md hover:bg-[#C8B28E] transition-colors shadow-lg border-2 border-[#D9BF77]"
              >
                Initialize Audio
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        
        <div 
          className="absolute inset-0 bg-[#2A1A16] opacity-60"
          style={{ zIndex: 1 }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
