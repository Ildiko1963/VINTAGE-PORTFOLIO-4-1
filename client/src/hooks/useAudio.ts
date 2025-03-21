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
      projectorSoundRef.current = new Howl({
        src: ['https://actions.google.com/sounds/v1/ambiences/movie_projector.ogg'],
        loop: true,
        volume: state.volume,
        preload: true,
      });
  
      backgroundMusicRef.current = new Howl({
        src: ['https://actions.google.com/sounds/v1/ambiences/quiet_room_tone.ogg'],
        loop: true,
        volume: state.volume * 0.6, // Lower volume for background music
        preload: true,
      });
      
      setAudioInitialized(true);
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
