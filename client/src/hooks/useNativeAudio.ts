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
    console.log('Audio context unlocked');
    console.log('Starting audio initialization...');
    
    if (!audioInitialized) {
      console.log('Initializing audio with native HTML5 Audio elements...');
      
      try {
        // Create projector audio element using zenegép.mp3 as projector sound
        const projectorElement = new Audio();
        projectorElement.src = '/audio/zenegép.mp3';
        projectorElement.loop = true;
        projectorElement.volume = state.volume;
        projectorElement.preload = 'metadata';
        projectorSoundRef.current = projectorElement;
        
        // Add error handling
        projectorElement.addEventListener('error', (e) => {
          console.error('Error loading projector sound:', e);
        });
        
        projectorElement.addEventListener('loadeddata', () => {
          console.log('Projector sound loaded successfully');
        });
        
        // Background music - using background-music.mp3
        const musicElement = new Audio();
        musicElement.src = '/audio/background-music.mp3';
        musicElement.loop = true;
        musicElement.volume = state.volume * 0.8;
        musicElement.preload = 'auto';
        backgroundMusicRef.current = musicElement;
        
        // Add error handling
        musicElement.addEventListener('error', (e) => {
          console.error('Error loading background music:', e);
        });
        
        musicElement.addEventListener('loadeddata', () => {
          console.log('Background music loaded successfully');
        });
        
        musicElement.addEventListener('canplaythrough', () => {
          console.log('Background music ready to play');
        });
        
        setAudioInitialized(true);
        console.log('Audio initialization completed');
        
      } catch (error) {
        console.error('Error during audio initialization:', error);
      }
    }
  };

  // Toggle projector sound
  const toggleProjector = () => {
    if (!projectorSoundRef.current) {
      console.log('Projector sound not initialized, attempting to initialize...');
      initializeAudio();
      return;
    }

    const newState = !state.isProjectorPlaying;
    console.log('Toggling projector sound... Current state:', state.isProjectorPlaying, 'New state:', newState);
    
    try {
      if (newState) {
        projectorSoundRef.current.volume = state.isMuted ? 0 : state.volume;
        const playPromise = projectorSoundRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Projector sound started successfully');
              setState(prev => ({ ...prev, isProjectorPlaying: true }));
            })
            .catch(err => {
              console.error('Error playing projector sound:', err);
              setState(prev => ({ ...prev, isProjectorPlaying: false }));
            });
        }
      } else {
        projectorSoundRef.current.pause();
        setState(prev => ({ ...prev, isProjectorPlaying: false }));
      }
      
    } catch (error) {
      console.error('Error toggling projector sound:', error);
    }
  };

  // Toggle background music
  const toggleMusic = () => {
    console.log('toggleMusic called, backgroundMusicRef exists:', !!backgroundMusicRef.current);
    if (!backgroundMusicRef.current) {
      console.log('Background music not initialized, attempting to initialize...');
      initializeAudio();
      return;
    }

    const newState = !state.isMusicPlaying;
    console.log('Toggling background music... Current state:', state.isMusicPlaying, 'New state:', newState);
    
    try {
      if (newState) {
        console.log('Attempting to play background music...');
        backgroundMusicRef.current.volume = state.isMuted ? 0 : state.volume * 0.8;
        const playPromise = backgroundMusicRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Background music started successfully!');
              setState(prev => ({ ...prev, isMusicPlaying: true }));
            })
            .catch(err => {
              console.error('Error playing background music:', err);
              setState(prev => ({ ...prev, isMusicPlaying: false }));
            });
        }
      } else {
        console.log('Pausing background music');
        backgroundMusicRef.current.pause();
        setState(prev => ({ ...prev, isMusicPlaying: false }));
      }
      
    } catch (error) {
      console.error('Error toggling background music:', error);
    }
  };

  // Set volume for both sounds
  const setVolume = (value: number) => {
    setState(prev => ({ ...prev, volume: value }));
    
    if (projectorSoundRef.current) {
      projectorSoundRef.current.volume = state.isMuted ? 0 : value;
    }
    
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = state.isMuted ? 0 : value * 0.8;
    }
  };

  // Toggle mute for both sounds
  const toggleMute = () => {
    const newMuteState = !state.isMuted;
    setState(prev => ({ ...prev, isMuted: newMuteState }));
    
    if (projectorSoundRef.current) {
      projectorSoundRef.current.volume = newMuteState ? 0 : state.volume;
      if (newMuteState) {
        projectorSoundRef.current.pause();
      } else if (state.isProjectorPlaying) {
        projectorSoundRef.current.play().catch(console.error);
      }
    }
    
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = newMuteState ? 0 : state.volume * 0.8;
      if (newMuteState) {
        backgroundMusicRef.current.pause();
      } else if (state.isMusicPlaying) {
        backgroundMusicRef.current.play().catch(console.error);
      }
    }
  };

  // Sync volume changes to audio elements
  useEffect(() => {
    if (projectorSoundRef.current) {
      projectorSoundRef.current.volume = state.isMuted ? 0 : state.volume;
    }
    
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = state.isMuted ? 0 : state.volume * 0.8;
    }
  }, [state.volume, state.isMuted]);

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