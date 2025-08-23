import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
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
              src="/static/23358_ildiko.jpg" 
              alt="Portrait of interior designer" 
              className="w-40 h-40 mx-auto object-cover rounded-full border-4 border-[#D9BF77]"
            />
          </motion.div>
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mb-6 relative"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-[#D9BF77]" style={{ fontFamily: 'Bodoni Moda, serif' }}>
              Ildikó Style
            </h1>
            <p className="text-3xl md:text-4xl text-[#D9BF77]" style={{ fontFamily: 'Great Vibes, cursive', position: 'relative', top: '-20px' }}>Interior Design</p>
          </motion.div>
          
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="mt-8 mb-24 max-w-2xl mx-auto p-6 bg-[#463730] bg-opacity-30 rounded-lg border border-[#8B7355] border-opacity-60"
          >
            <blockquote className="text-[#D9BF77] font-lora italic text-lg leading-relaxed text-center">
              "The only real luxury is style which anybody can afford independent from amount of money they have. This is the kind of thing that was born with us but it can be learnt supposing one has the proper intelligence for it..."
            </blockquote>
            <p className="text-[#C8B28E] font-typewriter text-right mt-4">— Giorgio Armani</p>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <div className="relative">
          {/* Film strip background */}
          <div className="bg-[#2A1A16] bg-opacity-10 h-24 relative overflow-hidden">
            {/* Top perforations */}
            <div className="absolute top-0 left-0 right-0 h-3 bg-transparent z-10 flex justify-around items-center">
              {[...Array(200)].map((_, i) => (
                <div key={`top-perf-${i}`} 
                     className="bg-[#2A1A16]"
                     style={{
                       width: '2px',
                       height: '6px',
                       clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)'
                     }}></div>
              ))}
            </div>
            {/* Bottom perforations */}
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-transparent z-10 flex justify-around items-center">
              {[...Array(200)].map((_, i) => (
                <div key={`bottom-perf-${i}`} 
                     className="bg-[#2A1A16]"
                     style={{
                       width: '2px',
                       height: '6px',
                       clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)'
                     }}></div>
              ))}
            </div>
            
            {/* Film strip images */}
            <div className="flex overflow-hidden h-full">
              <div className="flex min-w-full animate-[filmReel_15s_linear_infinite]">
                {[
                  "/static/big_laktanya.jpg",
                  "/static/big_nappali_falnezet2.jpg",
                  "/static/big_nappali2.jpg",
                  "/static/big_nappali3.jpg",
                  "/static/big_nappali4.jpg",
                  "/static/big_nappali6.jpg"
                ].map((src, index) => (
                  <img key={`film-1-${index}`} src={src} alt={`Interior design ${index + 1}`} className="h-full object-cover mx-1" />
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
                  <img key={`film-2-${index}`} src={src} alt={`Interior design ${index + 7}`} className="h-full object-cover mx-1" />
                ))}
              </div>
            </div>
          </div>
        </div>
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
