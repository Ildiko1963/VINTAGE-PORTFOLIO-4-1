import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import FilmFrameWrapper from './FilmFrameWrapper';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeroSectionProps {
  onNavigate: (id: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const controls = useAnimation();
  const textRef = useRef<HTMLParagraphElement>(null);
  const { t } = useLanguage();
  
  // Typing effect
  useEffect(() => {
    const startTypingAnimation = async () => {
      if (textRef.current) {
        await controls.start({ width: '100%', transition: { duration: 3.5, ease: "easeInOut" } });
      }
    };
    
    startTypingAnimation();
  }, [controls]);
  
  return (
    <section id="home" className="relative min-h-screen py-16 overflow-hidden">
      {/* Top shadow strip */}
      <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-black to-transparent opacity-60 z-20"></div>
      {/* Bottom shadow strip */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent opacity-60 z-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="inline-block mb-8"
          >
            <motion.img 
              animate={{ 
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
              }}
              src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              alt="Vintage film projector" 
              className="w-40 h-40 mx-auto object-cover rounded-full border-4 border-[#D9BF77]"
            />
          </motion.div>
          
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="font-playfair text-5xl md:text-7xl font-bold text-[#D9BF77] mb-6"
          >
{t('hero.title')}
          </motion.h1>
          
          <div className="max-w-3xl overflow-hidden">
            <motion.p 
              ref={textRef}
              initial={{ width: 0 }}
              animate={controls}
              className="font-typewriter text-xl md:text-2xl text-[#D9BF77] mb-8 overflow-hidden whitespace-nowrap border-r-2 border-[#D9BF77]"
              style={{ borderRightColor: '#D9BF77' }}
            >
{t('hero.subtitle')}
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="mt-8"
          >
            <button 
              onClick={() => onNavigate('portfolio')}
              className="px-8 py-3 bg-[#D9BF77] text-[#463730] font-typewriter text-lg rounded-md hover:bg-[#C8B28E] transition-colors"
            >
              View Projects
            </button>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <FilmFrameWrapper>
          <div className="flex overflow-hidden">
            <div className="flex min-w-full animate-[filmReel_15s_linear_infinite]">
              {/* Film strip images - doubled for seamless loop */}
              {[
                "/static/big_laktanya.jpg",
                "/static/big_nappali_falnezet2.jpg",
                "/static/big_nappali2.jpg",
                "/static/big_nappali3.jpg",
                "/static/big_nappali4.jpg",
                "/static/big_nappali6.jpg"
              ].map((src, index) => (
                <img key={`film-1-${index}`} src={src} alt={`Interior design ${index + 1}`} className="h-24 object-cover mx-1" />
              ))}
              
              {/* Duplicate for seamless loop */}
              {[
                "/static/big_laktanya.jpg",
                "/static/big_nappali_falnezet2.jpg",
                "/static/big_nappali2.jpg",
                "/static/big_nappali3.jpg",
                "/static/big_nappali4.jpg",
                "/static/big_nappali6.jpg"
              ].map((src, index) => (
                <img key={`film-2-${index}`} src={src} alt={`Interior design ${index + 7}`} className="h-24 object-cover mx-1" />
              ))}
            </div>
          </div>
        </FilmFrameWrapper>
      </div>

      {/* Add keyframe animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes filmReel {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes projector-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}} />
    </section>
  );
}
