import { useReducer, useEffect, useRef, useState, useCallback } from 'react';
import { Howl } from 'howler';
import { AudioState, AudioAction, AudioControls } from '@/lib/types';

// Initialize default state
const initialState: AudioState = {
  isProjectorPlaying: false,
  isMusicPlaying: false,
  isMuted: false,
  volume: 0.5,
};

// Reducer for audio state management
function audioReducer(state: AudioState, action: AudioAction): AudioState {
  switch (action.type) {
    case 'TOGGLE_PROJECTOR':
      return { ...state, isProjectorPlaying: !state.isProjectorPlaying };
    case 'TOGGLE_MUSIC':
      return { ...state, isMusicPlaying: !state.isMusicPlaying };
    case 'SET_VOLUME':
      return { ...state, volume: action.value };
    case 'TOGGLE_MUTE':
      return { ...state, isMuted: !state.isMuted };
    case 'INIT':
      return action.value;
    default:
      return state;
  }
}

export function useAudio(): AudioControls {
  const [state, dispatch] = useReducer(audioReducer, initialState);
  const projectorSoundRef = useRef<Howl | null>(null);
  const backgroundMusicRef = useRef<Howl | null>(null);
  const [audioInitialized, setAudioInitialized] = useState(false);

  // Initialize sound objects after user interaction
  const initializeAudio = useCallback(() => {
    if (!audioInitialized) {
      // Add console log for debugging
      console.log('Initializing audio...');
      
      // Use a different movie projector sound
      projectorSoundRef.current = new Howl({
        src: [
          'https://freesound.org/data/previews/243/243616_1565376-lq.mp3',
          'https://actions.google.com/sounds/v1/ambiences/movie_projector.ogg'
        ],
        loop: true,
        volume: state.volume,
        preload: true,
        html5: true,
        onload: () => {
          console.log('Projector sound loaded successfully');
        },
        onloaderror: (id, error) => {
          console.error('Error loading projector sound:', error);
        }
      });
  
      // Use a different background music sound
      backgroundMusicRef.current = new Howl({
        src: [
          'https://freesound.org/data/previews/528/528858_9022615-lq.mp3',
          'https://actions.google.com/sounds/v1/ambiences/quiet_room_tone.ogg'
        ],
        loop: true,
        volume: state.volume * 0.6, // Lower volume for background music
        preload: true,
        html5: true,
        onload: () => {
          console.log('Background music loaded successfully');
        },
        onloaderror: (id, error) => {
          console.error('Error loading background music:', error);
        }
      });
      
      setAudioInitialized(true);
      
      // Add a test sound to verify that Howler is working
      const testSound = new Howl({
        src: ['https://freesound.org/data/previews/560/560444_5754274-lq.mp3'],
        volume: state.volume,
        html5: true,
        onload: () => {
          console.log('Test sound loaded successfully');
          testSound.play();
        }
      });
    }
  }, [audioInitialized, state.volume]);

  // Setup a one-time cleanup effect
  useEffect(() => {
    return () => {
      projectorSoundRef.current?.unload();
      backgroundMusicRef.current?.unload();
    };
  }, []);

  // Update volume when it changes
  useEffect(() => {
    if (projectorSoundRef.current) {
      projectorSoundRef.current.volume(state.isMuted ? 0 : state.volume);
    }
    
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume(state.isMuted ? 0 : state.volume * 0.6);
    }
  }, [state.volume, state.isMuted]);

  // Handle projector sound state changes
  useEffect(() => {
    if (projectorSoundRef.current) {
      if (state.isProjectorPlaying) {
        projectorSoundRef.current.play();
      } else {
        projectorSoundRef.current.pause();
      }
    }
  }, [state.isProjectorPlaying]);

  // Handle background music state changes
  useEffect(() => {
    if (backgroundMusicRef.current) {
      if (state.isMusicPlaying) {
        backgroundMusicRef.current.play();
      } else {
        backgroundMusicRef.current.pause();
      }
    }
  }, [state.isMusicPlaying]);

  // Audio control functions
  const toggleProjector = () => dispatch({ type: 'TOGGLE_PROJECTOR' });
  const toggleMusic = () => dispatch({ type: 'TOGGLE_MUSIC' });
  const setVolume = (value: number) => dispatch({ type: 'SET_VOLUME', value });
  const toggleMute = () => dispatch({ type: 'TOGGLE_MUTE' });

  return {
    toggleProjector,
    toggleMusic,
    setVolume,
    toggleMute,
    initializeAudio,
    state,
  };
}
