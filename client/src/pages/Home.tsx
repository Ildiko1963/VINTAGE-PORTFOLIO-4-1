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
import AudioInitializer from '@/components/AudioInitializer';
import { useAudio } from '@/hooks/useAudio';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { Section } from '@/lib/types';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioControls = useAudio();
  
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
      {/* Audio initializer component to ensure audio works on all browsers */}
      <AudioInitializer 
        audioControls={audioControls} 
        onError={(error) => setAudioError(error)} 
      />
      
      {showIntro && (
        <IntroScreen 
          audioControls={audioControls} 
          onComplete={() => setShowIntro(false)} 
        />
      )}
      
      {/* Display an error message if audio failed to initialize */}
      {audioError && (
        <div className="fixed bottom-20 left-0 right-0 bg-red-600 text-white py-2 px-4 text-center z-50">
          {audioError}
        </div>
      )}
      
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
