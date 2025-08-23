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
      className="fixed bottom-4 right-4 z-40 p-3 bg-[#2A1A16] bg-opacity-80 rounded-lg shadow-lg flex items-center space-x-3"
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
      
      <div className="relative group">
        <button 
          className="text-[#463730] hover:text-[#D9BF77] transition-colors" 
          aria-label="Volume control"
        >
          <i className="fas fa-volume-up text-xl"></i>
        </button>
        <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
          <input 
            type="range" 
            className="w-24 appearance-none h-2 bg-[#2A1A16] rounded-lg outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-[#D9BF77] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-[#D9BF77] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:cursor-pointer"
            min="0" 
            max="1" 
            step="0.1" 
            value={state.volume} 
            onChange={handleVolumeChange}
          />
        </div>
      </div>
      
      <button 
        onClick={toggleMute}
        className={`text-[#463730] hover:text-[#D9BF77] transition-colors ${state.isMuted ? 'text-[#D9BF77]' : ''}`} 
        aria-label="Mute all sounds"
      >
        <i className="fas fa-volume-mute text-xl"></i>
      </button>
    </motion.div>
  );
}
