import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <section id="about" className="py-16 bg-transparent relative">
      
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
          
          <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full md:w-1/2 flex items-start justify-center"
            >
              <div className="film-frame projector-flicker film-grain w-full max-w-lg">
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
              className="w-full md:w-1/2 font-lora relative"
            >
              <div className="min-h-[300px] flex flex-col justify-between">
                {/* Page content */}
                <div>
                  {currentPage === 0 && (
                    <motion.div
                      key="page0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-[#D9BF77] text-sm mb-3">
                        {t('about.intro')}
                      </p>
                      <p className="text-[#D9BF77] text-sm mb-3">
                        {t('about.philosophy1')}
                      </p>
                    </motion.div>
                  )}
                  
                  {currentPage === 1 && (
                    <motion.div
                      key="page1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-[#D9BF77] text-sm mb-3">
                        {t('about.philosophy2')}
                      </p>
                      <p className="text-[#D9BF77] text-sm mb-3">
                        {t('about.philosophy3')}
                      </p>
                    </motion.div>
                  )}
                  
                  {currentPage === 2 && (
                    <motion.div
                      key="page2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-[#D9BF77] text-sm mb-3">
                        {t('about.philosophy4')}
                      </p>
                      <p className="text-[#D9BF77] text-sm mb-3">
                        {t('about.philosophy5')}
                      </p>
                    </motion.div>
                  )}
                  
                  {currentPage === 3 && (
                    <motion.div
                      key="page3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-[#D9BF77] text-sm mb-3">
                        {t('about.philosophy6')}
                      </p>
                      <p className="text-[#D9BF77] text-sm mb-3 font-typewriter italic">
                        {t('about.philosophy7')}
                      </p>
                    </motion.div>
                  )}
                  
                  {currentPage === 4 && (
                    <motion.div
                      key="page4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-[#D9BF77] text-sm mb-3">
                        {t('about.philosophy8')}
                      </p>
                      <p className="text-[#D9BF77] text-sm mb-3">
                        {t('about.philosophy9')}
                      </p>
                    </motion.div>
                  )}
                  
                  {currentPage === 5 && (
                    <motion.div
                      key="page5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-[#D9BF77] text-sm mb-4 font-typewriter">
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
                  )}
                </div>
                
                {/* Navigation */}
                <div className="flex justify-between items-center mt-8">
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
                    {[0, 1, 2, 3, 4, 5].map(page => (
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
                    onClick={() => setCurrentPage(prev => Math.min(5, prev + 1))}
                    disabled={currentPage === 5}
                    className={`flex items-center gap-2 px-4 py-2 transition-colors ${
                      currentPage === 5 
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
