import { PortfolioItem, Service, ContactForm } from "@shared/schema";

export interface AudioState {
  isProjectorPlaying: boolean;
  isMusicPlaying: boolean;
  isMuted: boolean;
  volume: number;
}

export type AudioAction =
  | { type: 'TOGGLE_PROJECTOR' }
  | { type: 'TOGGLE_MUSIC' }
  | { type: 'SET_VOLUME'; value: number }
  | { type: 'TOGGLE_MUTE' }
  | { type: 'INIT'; value: AudioState };

export type AudioControls = {
  toggleProjector: () => void;
  toggleMusic: () => void;
  setVolume: (value: number) => void;
  toggleMute: () => void;
  initializeAudio: () => void;
  state: AudioState;
};

export interface Section {
  id: string;
  title: string;
}

export type { PortfolioItem, Service, ContactForm };
