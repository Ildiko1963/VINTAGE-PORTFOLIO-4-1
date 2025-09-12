import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AudioControls as AudioControlsType } from '@/lib/types';

interface AudioControlsProps {
  audioControls: AudioControlsType;
}

export default function AudioControls({ audioControls }: AudioControlsProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-[#D9BF77] text-[#463730] p-3 rounded-full shadow-lg hover:bg-[#C8B28E] transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <i className="fas fa-music text-lg"></i>
      </motion.button>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="absolute bottom-16 right-0 bg-[#463730] p-4 rounded-lg shadow-lg min-w-[200px]"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-[#D9BF77] text-sm mb-2 font-typewriter">
                  Hangerő
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={audioControls.state.volume}
                  onChange={(e) => audioControls.setVolume(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={audioControls.toggleProjector}
                  className={`flex-1 py-2 px-3 rounded text-xs font-typewriter transition-colors ${
                    audioControls.state.isProjectorPlaying
                      ? 'bg-[#D9BF77] text-[#463730]'
                      : 'bg-transparent border border-[#D9BF77] text-[#D9BF77]'
                  }`}
                >
                  <i className="fas fa-film mr-1"></i>
                  {audioControls.state.isProjectorPlaying ? 'Pause' : 'Play'}
                </button>
                
                <button
                  onClick={audioControls.toggleMusic}
                  className={`flex-1 py-2 px-3 rounded text-xs font-typewriter transition-colors ${
                    audioControls.state.isMusicPlaying
                      ? 'bg-[#D9BF77] text-[#463730]'
                      : 'bg-transparent border border-[#D9BF77] text-[#D9BF77]'
                  }`}
                >
                  <i className="fas fa-music mr-1"></i>
                  {audioControls.state.isMusicPlaying ? 'Pause' : 'Play'}
                </button>
              </div>
              
              <button
                onClick={audioControls.toggleMute}
                className={`w-full py-2 px-3 rounded text-xs font-typewriter transition-colors ${
                  audioControls.state.isMuted
                    ? 'bg-red-500 text-white'
                    : 'bg-transparent border border-[#D9BF77] text-[#D9BF77]'
                }`}
              >
                <i className={`fas ${audioControls.state.isMuted ? 'fa-volume-mute' : 'fa-volume-up'} mr-1`}></i>
                {audioControls.state.isMuted ? 'Unmute' : 'Mute'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
