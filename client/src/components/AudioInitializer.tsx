import { useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { AudioControls } from '@/lib/types';

// Define supported audio formats for different browsers
const AUDIO_FORMATS = ['.mp3', '.ogg', '.wav'];

// Create backup audio sources in case the main one fails
const backupAudioSources = {
  projector: [
    'https://freesound.org/data/previews/243/243616_1565376-lq.mp3',
    'https://freesound.org/data/previews/96/96541_1574583-lq.mp3',
    'https://actions.google.com/sounds/v1/ambiences/movie_projector.ogg'
  ],
  music: [
    'https://freesound.org/data/previews/528/528858_9022615-lq.mp3',
    'https://freesound.org/data/previews/612/612092_5674468-lq.mp3',
    'https://actions.google.com/sounds/v1/ambiences/quiet_room_tone.ogg'
  ]
};

interface AudioInitializerProps {
  audioControls: AudioControls;
  onError: (error: string) => void;
}

export default function AudioInitializer({ audioControls, onError }: AudioInitializerProps) {
  const hasInitialized = useRef(false);

  // This component creates an Audio element to ensure audio is unlocked
  useEffect(() => {
    if (hasInitialized.current) return;
    
    const initializeAudio = () => {
      try {
        console.log('AudioInitializer: Attempting to unlock audio context...');
        
        // Create a silent audio element to unlock audio on iOS/Safari
        const audioElement = document.createElement('audio');
        audioElement.setAttribute('src', 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA');
        audioElement.setAttribute('playsinline', 'true');
        audioElement.muted = true;
        audioElement.play().catch(err => console.log('Silent audio play attempt error:', err));
        
        // Try to initialize Howler's audio context by playing a short silent sound
        const silentSound = new Howl({
          src: ['data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA'],
          format: ['wav'],
          html5: true,
          volume: 0.01,
          onend: () => {
            console.log('Silent sound ended, audio context should be unlocked');
          },
          onloaderror: (id, err) => {
            console.log('Silent sound load error:', err);
          }
        });
        
        silentSound.play();
        
        // Mark as initialized
        hasInitialized.current = true;
        
        console.log('AudioInitializer: Audio context initialization complete');
      } catch (error) {
        console.error('AudioInitializer: Error initializing audio:', error);
        onError('Audio initialization failed. Please try again.');
      }
    };
    
    // Run once on component mount
    initializeAudio();
    
    // Add a global event listener for user interaction
    const handleUserInteraction = () => {
      if (!hasInitialized.current) {
        initializeAudio();
      }
    };
    
    // Add listeners to ensure audio is unlocked on first user interaction
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });
    
    // Cleanup
    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [onError]);

  // This is a hidden component, so no visible UI
  return null;
}