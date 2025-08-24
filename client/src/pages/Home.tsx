
import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import IntroScreen from '@/components/IntroScreen';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import PortfolioSection from '@/components/PortfolioSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import AudioControls from '@/components/AudioControls';
import { useNativeAudio } from '@/hooks/useNativeAudio';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { Section } from '@/lib/types';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioControls = useNativeAudio();
  
  const sections: Section[] = [
    { id: 'home', title: 'Home' },
    { id: 'about', title: 'About' },
    { id: 'portfolio', title: 'Portfolio' },
    { id: 'services', title: 'Services' },
    { id: 'contact', title: 'Contact' },
  ];
  
  const { scrollToSection } = useSmoothScroll(sections);
  
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
      
      .font-bodoni {
        font-family: 'Bodoni Moda', serif;
      }
      
      .font-great-vibes {
        font-family: 'Great Vibes', cursive;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Ez most a Background komponens kezeli
    
  return (
    <>
      <div className="bg-transparent font-lora text-[#D9BF77] min-h-screen relative">
        {showIntro && (
          <IntroScreen 
            audioControls={audioControls} 
            onComplete={() => setShowIntro(false)} 
          />
        )}
        
        <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
          <button 
            onClick={() => setShowIntro(true)}
            className="bg-[#D9BF77] text-[#463730] px-3 py-1 rounded-md text-sm hover:bg-[#C8B28E] transition-colors"
          >
            Show Intro Again
          </button>
          <button 
            onClick={() => audioControls.initializeAudio()}
            className="bg-[#D9BF77] text-[#463730] px-3 py-1 rounded-md text-sm hover:bg-[#2A1A16] transition-colors"
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
    </>
  );
}
