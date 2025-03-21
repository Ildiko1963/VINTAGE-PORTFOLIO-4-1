import { useState, useEffect } from 'react';
import IntroScreen from '@/components/IntroScreen';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import PortfolioSection from '@/components/PortfolioSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import AudioControls from '@/components/AudioControls';
// Use native audio hook instead of Howler
import { useNativeAudio } from '@/hooks/useNativeAudio';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { Section } from '@/lib/types';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [audioError, setAudioError] = useState<string | null>(null);
  // Use the native audio implementation instead of Howler
  const audioControls = useNativeAudio();
  
  const sections: Section[] = [
    { id: 'home', title: 'Home' },
    { id: 'about', title: 'About' },
    { id: 'portfolio', title: 'Portfolio' },
    { id: 'services', title: 'Services' },
    { id: 'contact', title: 'Contact' },
  ];
  
  const { scrollToSection } = useSmoothScroll(sections);
  
  // Add vintage font styles to the document
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .font-playfair {
        font-family: 'Playfair Display', serif;
      }
      
      .font-lora {
        font-family: 'Lora', serif;
      }
      
      .font-typewriter {
        font-family: 'Special Elite', cursive;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <div className="bg-[#F2E8D5] font-lora text-[#463730] min-h-screen">
      {showIntro && (
        <IntroScreen 
          audioControls={audioControls} 
          onComplete={() => setShowIntro(false)} 
        />
      )}
      
      {/* Add manual audio initialization button if needed */}
      <div className="fixed bottom-5 right-5 z-50">
        <button 
          onClick={() => audioControls.initializeAudio()}
          className="bg-[#D9BF77] text-[#463730] px-3 py-1 rounded-md text-sm hover:bg-[#C8B28E] transition-colors"
        >
          Initialize Audio
        </button>
      </div>
      
      <AudioControls audioControls={audioControls} />
      
      <Header sections={sections} onNavigate={scrollToSection} />
      
      <main>
        <HeroSection onNavigate={scrollToSection} />
        <AboutSection />
        <PortfolioSection />
        <ServicesSection />
        <ContactSection />
      </main>
      
      <Footer sections={sections} onNavigate={scrollToSection} />
    </div>
  );
}
