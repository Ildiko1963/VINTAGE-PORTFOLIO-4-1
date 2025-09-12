import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Section } from '@/lib/types';

interface HeaderProps {
  sections: Section[];
  onNavigate: (sectionId: string) => void;
}

export default function Header({ sections, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'hu' ? 'en' : 'hu');
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#2A1A16]/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-[#D9BF77]"
            style={{ fontFamily: 'Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif' }}
          >
            Ildikostyle
          </motion.div>

          {/* Desktop Menu */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden md:flex items-center space-x-8"
          >
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => onNavigate(section.id)}
                className="text-[#D9BF77] hover:text-[#F2E8D5] transition-colors font-typewriter"
              >
                {section.title}
              </motion.button>
            ))}
            
            <button
              onClick={toggleLanguage}
              className="text-[#D9BF77] hover:text-[#F2E8D5] transition-colors font-typewriter px-3 py-1 border border-[#D9BF77] rounded"
            >
              {language.toUpperCase()}
            </button>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#D9BF77] z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <motion.div
              animate={isMenuOpen ? { rotate: 45 } : { rotate: 0 }}
              className="relative w-6 h-6"
            >
              <span
                className={`absolute top-0 left-0 w-full h-0.5 bg-current transition-all ${
                  isMenuOpen ? 'rotate-45 top-3' : ''
                }`}
              />
              <span
                className={`absolute top-2 left-0 w-full h-0.5 bg-current transition-all ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`absolute top-4 left-0 w-full h-0.5 bg-current transition-all ${
                  isMenuOpen ? '-rotate-45 top-3' : ''
                }`}
              />
            </motion.div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-4">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      onNavigate(section.id);
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-[#D9BF77] hover:text-[#F2E8D5] transition-colors font-typewriter"
                  >
                    {section.title}
                  </button>
                ))}
                
                <button
                  onClick={() => {
                    toggleLanguage();
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-[#D9BF77] hover:text-[#F2E8D5] transition-colors font-typewriter w-fit px-3 py-1 border border-[#D9BF77] rounded"
                >
                  {language.toUpperCase()}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
