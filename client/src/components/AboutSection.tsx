import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-16 bg-transparent border-t-[20px] border-[#8B7355] relative">
      {/* Top shadow strip */}
      <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-black to-transparent opacity-60 z-20"></div>
      {/* Bottom shadow strip */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent opacity-60 z-20"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-playfair text-4xl md:text-5xl font-bold text-[#D9BF77] text-center mb-8"
          >
{t('about.title')}
          </motion.h2>
          
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full md:w-1/3"
            >
              <div className="film-frame projector-flicker film-grain">
                <img 
                  src="/static/23358_ildiko.jpg" 
                  alt="Portrait of interior designer" 
                  className="w-full h-auto object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full md:w-2/3 font-lora"
            >
              <p className="text-[#D9BF77] text-lg mb-4">
                {t('about.intro')}
              </p>
              <p className="text-[#D9BF77] text-lg mb-4">
                {t('about.philosophy1')}
              </p>
              <p className="text-[#D9BF77] text-lg mb-4">
                {t('about.philosophy2')}
              </p>
              <p className="text-[#D9BF77] text-lg mb-4">
                {t('about.philosophy3')}
              </p>
              <p className="text-[#D9BF77] text-lg mb-4">
                {t('about.philosophy4')}
              </p>
              <p className="text-[#D9BF77] text-lg mb-4">
                {t('about.philosophy5')}
              </p>
              <p className="text-[#D9BF77] text-lg mb-4">
                {t('about.philosophy6')}
              </p>
              <p className="text-[#D9BF77] text-lg mb-4 font-typewriter italic">
                {t('about.philosophy7')}
              </p>
              <p className="text-[#D9BF77] text-lg mb-4">
                {t('about.philosophy8')}
              </p>
              <p className="text-[#D9BF77] text-lg mb-4">
                {t('about.philosophy9')}
              </p>
              <p className="text-[#D9BF77] text-lg mb-6 font-typewriter">
                "{t('about.armani')}" - Giorgio Armani
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-[#D9BF77] hover:text-[#8B7355] transition-colors">
                  <i className="fab fa-instagram text-2xl"></i>
                </a>
                <a href="#" className="text-[#D9BF77] hover:text-[#8B7355] transition-colors">
                  <i className="fab fa-vimeo-v text-2xl"></i>
                </a>
                <a href="#" className="text-[#D9BF77] hover:text-[#8B7355] transition-colors">
                  <i className="fab fa-behance text-2xl"></i>
                </a>
              </div>
            </motion.div>
          </div>
          

        </div>
      </div>
    </section>
  );
}
