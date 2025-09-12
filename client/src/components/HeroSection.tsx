import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const { t } = useLanguage();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-transparent">
      <div className="container mx-auto px-4 text-center relative z-20">
        <motion.h1
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-7xl font-bold text-[#D9BF77] mb-6"
          style={{ fontFamily: 'Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif', letterSpacing: '0.1em' }}
        >
          {t('hero.title')}
        </motion.h1>
        
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl md:text-2xl text-[#C8B28E] mb-12 max-w-3xl mx-auto font-typewriter"
        >
          {t('hero.subtitle')}
        </motion.p>
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <button
            onClick={() => onNavigate('portfolio')}
            className="px-8 py-4 bg-[#D9BF77] text-[#463730] font-typewriter rounded-md hover:bg-[#2A1A16] hover:text-[#F2E8D5] transition-colors shadow-lg"
          >
            {t('hero.cta')}
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-4 border border-[#D9BF77] text-[#D9BF77] font-typewriter rounded-md hover:bg-[#D9BF77] hover:text-[#463730] transition-colors"
          >
            {t('hero.contact')}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
