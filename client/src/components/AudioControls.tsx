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
      
      <div className="relative">
        <button 
          onClick={() => {
            const slider = document.getElementById('volume-slider');
            if (slider) {
              slider.style.display = slider.style.display === 'block' ? 'none' : 'block';
            }
          }}
          className="text-[#463730] hover:text-[#D9BF77] transition-colors" 
          aria-label="Volume control"
        >
          🔊
        </button>
        <div 
          id="volume-slider"
          className="absolute bottom-full right-0 mb-2 bg-[#2A1A16] bg-opacity-90 p-2 rounded"
          style={{ display: 'none' }}
        >
          <input 
            type="range" 
            className="w-24 appearance-none h-2 bg-[#463730] rounded-lg outline-none slider"
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
        className={`hover:text-[#D9BF77] transition-colors ${state.isMuted ? 'text-red-500' : 'text-[#463730]'}`} 
        aria-label="Mute all sounds"
      >
        {state.isMuted ? '🔇' : '🔊'}
      </button>
    </motion.div>
  );
}
