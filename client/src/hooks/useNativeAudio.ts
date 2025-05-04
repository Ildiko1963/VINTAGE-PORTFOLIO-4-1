import { useState, useEffect, useRef } from 'react';
import { AudioState, AudioControls } from '@/lib/types';

// Initialize default state
const initialState: AudioState = {
  isProjectorPlaying: false,
  isMusicPlaying: false,
  isMuted: false,
  volume: 0.5,
};

export function useNativeAudio(): AudioControls {
  const [state, setState] = useState<AudioState>(initialState);
  const projectorSoundRef = useRef<HTMLAudioElement | null>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const [audioInitialized, setAudioInitialized] = useState(false);

  const initializeAudio = () => {
    if (!audioInitialized) {
      console.log('Initializing audio with native HTML5 Audio elements...');
      
      // Create hard-coded audio elements for better browser compatibility
      const projectorElement = new Audio('https://cdn.freesound.org/previews/459/459977_6142149-lq.mp3');
      projectorElement.loop = true;
      projectorElement.volume = state.volume;
      projectorElement.preload = 'auto';
      projectorSoundRef.current = projectorElement;
      
      // Add error handling
      projectorElement.addEventListener('error', (e) => {
        console.error('Error loading projector sound:', e);
      });
      
      projectorElement.addEventListener('canplaythrough', () => {
        console.log('Projector sound loaded successfully');
      });
      
      // Eltávolítva a madárcsicsergés
      const musicElement = new Audio();
      musicElement.loop = true;
      musicElement.volume = state.volume * 0.6; // Lower volume for background music
      musicElement.preload = 'auto';
      backgroundMusicRef.current = musicElement;
      
      // Add error handling
      musicElement.addEventListener('error', (e) => {
        console.error('Error loading background music:', e);
      });
      
      musicElement.addEventListener('canplaythrough', () => {
        console.log('Background music loaded successfully');
      });
      
      // Create and play a test sound to verify audio is working
      const testSound = new Audio();
      testSound.volume = state.volume;
      
      // Try to play a short sound to test if audio is working
      const playTest = () => {
        testSound.play()
          .then(() => {
            console.log('Test sound playing successfully');
            setTimeout(() => testSound.pause(), 1000);
          })
          .catch(err => {
            console.error('Error playing test sound:', err);
          });
      };
      
      // Try to play after a short delay
      setTimeout(playTest, 500);
      
      setAudioInitialized(true);
    }
  };

  // Toggle projector sound
  const toggleProjector = () => {
    if (!projectorSoundRef.current) return;

    const newState = !state.isProjectorPlaying;
    
    try {
      if (newState) {
        const playPromise = projectorSoundRef.current.play();
        if (playPromise) {
          playPromise.catch(err => {
            console.error('Error playing projector sound:', err);
            // Try once more with user interaction
            document.addEventListener('click', () => {
              projectorSoundRef.current?.play();
            }, { once: true });
          });
        }
      } else {
        projectorSoundRef.current.pause();
      }
      
      setState(prev => ({ ...prev, isProjectorPlaying: newState }));
    } catch (error) {
      console.error('Error toggling projector sound:', error);
    }
  };

  // Toggle background music
  const toggleMusic = () => {
    if (!backgroundMusicRef.current) return;

    const newState = !state.isMusicPlaying;
    
    try {
      if (newState) {
        const playPromise = backgroundMusicRef.current.play();
        if (playPromise) {
          playPromise.catch(err => {
            console.error('Error playing background music:', err);
            // Try once more with user interaction
            document.addEventListener('click', () => {
              backgroundMusicRef.current?.play();
            }, { once: true });
          });
        }
      } else {
        backgroundMusicRef.current.pause();
      }
      
      setState(prev => ({ ...prev, isMusicPlaying: newState }));
    } catch (error) {
      console.error('Error toggling background music:', error);
    }
  };

  // Set volume for both sounds
  const setVolume = (value: number) => {
    if (projectorSoundRef.current) {
      projectorSoundRef.current.volume = state.isMuted ? 0 : value;
    }
    
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = state.isMuted ? 0 : value * 0.6;
    }
    
    setState(prev => ({ ...prev, volume: value }));
  };

  // Toggle mute for both sounds
  const toggleMute = () => {
    const newMuteState = !state.isMuted;
    
    if (projectorSoundRef.current) {
      projectorSoundRef.current.volume = newMuteState ? 0 : state.volume;
    }
    
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = newMuteState ? 0 : state.volume * 0.6;
    }
    
    setState(prev => ({ ...prev, isMuted: newMuteState }));
  };

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (projectorSoundRef.current) {
        projectorSoundRef.current.pause();
        projectorSoundRef.current.src = '';
      }
      
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current.src = '';
      }
    };
  }, []);

  return {
    toggleProjector,
    toggleMusic,
    setVolume,
    toggleMute,
    initializeAudio,
    state,
  };
}