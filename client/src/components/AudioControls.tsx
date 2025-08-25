import { ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { AudioControls as AudioControlsType } from '@/lib/types';

interface AudioControlsProps {
  audioControls: AudioControlsType;
}

export default function AudioControls({ audioControls }: AudioControlsProps) {
  const { state, toggleProjector, toggleMusic, setVolume, toggleMute } = audioControls;
  
  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };
  
  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-4 right-4 z-[60] p-3 bg-[#2A1A16] bg-opacity-80 rounded-lg shadow-lg flex items-center space-x-3"
    >
      <button 
        onClick={toggleProjector}
        className={`text-[#463730] hover:text-[#D9BF77] transition-colors ${state.isProjectorPlaying ? 'text-[#D9BF77]' : ''}`} 
        aria-label="Toggle projector sound"
      >
        <i className="fas fa-film text-xl"></i>
      </button>
      
      <button 
        onClick={toggleMusic}
        className={`text-[#463730] hover:text-[#D9BF77] transition-colors ${state.isMusicPlaying ? 'text-[#D9BF77]' : ''}`} 
        aria-label="Toggle background music"
      >
        <i className="fas fa-music text-xl"></i>
      </button>
      
      <div className="flex flex-col gap-1 items-center">
        <button 
          onClick={toggleMute}
          className={`hover:text-[#D9BF77] transition-colors text-lg ${state.isMuted ? 'text-red-500' : 'text-[#463730]'}`} 
          aria-label="Mute all sounds"
        >
          {state.isMuted ? '🔇' : '🔊'}
        </button>
        
        <input 
          type="range" 
          className="w-16 h-1 appearance-none bg-[#463730] rounded-lg outline-none slider transform -rotate-90 origin-center"
          min="0" 
          max="1" 
          step="0.1" 
          value={state.volume} 
          onChange={handleVolumeChange}
        />
      </div>
    </motion.div>
  );
}
