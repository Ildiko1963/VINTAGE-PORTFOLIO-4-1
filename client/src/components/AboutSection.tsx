import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <section id="about" className="pt-16 pb-8 bg-transparent relative">
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-playfair text-4xl md:text-5xl font-bold text-[#D9BF77] text-center mb-8"
          >
{t('about.title')}
          </motion.h2>
          
          <div className="flex flex-col md:flex-row items-stretch gap-8 mb-12">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full md:w-[30%] flex items-start justify-center image-hover-container"
            >
              <div className="film-frame projector-flicker film-grain w-full max-w-xs hover:scale-105 hover:rotate-1 transition-all duration-300 ease-in-out cursor-pointer">
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
              className="w-full md:w-[70%] font-lora relative md:pt-0 px-2"
            >
              <div className="h-full flex flex-col justify-between">
                {/* Page content - kitölti a teljes magasságot */}
                <div className="flex-1 flex flex-col justify-between">
                  {currentPage === 0 && (
                    <motion.div
                      key="page0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full flex flex-col justify-between"
                    >
                      <div>
                        <p className="text-[#D9BF77] text-base mb-0.5" style={{ fontFamily: '1942 Report, Special Elite, monospace' }}>
                          {t('about.intro')}
                        </p>
                        <p className="text-[#D9BF77] text-base mb-0.5" style={{ fontFamily: '1942 Report, Special Elite, monospace' }}>
                          {t('about.philosophy1')}
                        </p>
                        <p className="text-[#D9BF77] text-base mb-0.5" style={{ fontFamily: '1942 Report, Special Elite, monospace' }}>
                          {t('about.philosophy2')}
                        </p>
                        <p className="text-[#D9BF77] text-base mb-0.5" style={{ fontFamily: '1942 Report, Special Elite, monospace' }}>
                          {t('about.philosophy3')}
                        </p>
                        <p className="text-[#D9BF77] text-base mb-0.5" style={{ fontFamily: '1942 Report, Special Elite, monospace' }}>
                          {t('about.philosophy4')}
                        </p>
                      </div>
                    </motion.div>
                  )}
                  
                  {currentPage === 1 && (
                    <motion.div
                      key="page1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full flex flex-col justify-between"
                    >
                      <div>
                        <p className="text-[#D9BF77] text-base mb-0.5" style={{ fontFamily: '1942 Report, Special Elite, monospace' }}>
                          {t('about.philosophy5')}
                        </p>
                        <p className="text-[#D9BF77] text-base mb-0.5" style={{ fontFamily: '1942 Report, Special Elite, monospace' }}>
                          {t('about.philosophy6')}
                        </p>
                        <p className="text-[#D9BF77] text-base mb-0.5" style={{ fontFamily: '1942 Report, Special Elite, monospace' }}>
                          {t('about.philosophy7')}
                        </p>
                        <p className="text-[#D9BF77] text-base mb-0.5" style={{ fontFamily: '1942 Report, Special Elite, monospace' }}>
                          {t('about.philosophy8')}
                        </p>
                        <p className="text-[#D9BF77] text-base mb-0.5" style={{ fontFamily: '1942 Report, Special Elite, monospace' }}>
                          {t('about.philosophy9')}
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
                      </div>
                    </motion.div>
                  )}
                </div>
                
                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 mb-4">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                    disabled={currentPage === 0}
                    className={`flex items-center gap-2 px-4 py-2 transition-colors ${
                      currentPage === 0 
                        ? 'text-gray-500 cursor-not-allowed' 
                        : 'text-[#D9BF77] hover:text-[#C8B28E]'
                    }`}
                  >
                    <ChevronLeft size={20} />
                    Előző
                  </button>
                  
                  <div className="flex gap-2">
                    {[0, 1].map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          currentPage === page ? 'bg-[#D9BF77]' : 'bg-gray-500'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(1, prev + 1))}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-2 px-4 py-2 transition-colors ${
                      currentPage === 1 
                        ? 'text-gray-500 cursor-not-allowed' 
                        : 'text-[#D9BF77] hover:text-[#C8B28E]'
                    }`}
                  >
                    Következő
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
          

        </div>
      </div>
    </section>
  );
}
