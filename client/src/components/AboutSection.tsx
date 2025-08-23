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
            className="text-4xl md:text-5xl font-bold text-[#D9BF77] text-center mb-8"
            style={{ fontFamily: 'Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif', fontWeight: 'bold', letterSpacing: '0.2em' }}
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
                        <h3 className="text-[#D9BF77] text-lg font-bold mb-4 font-typewriter">Üdvözlöm!</h3>
                        <p className="text-[#D9BF77] text-base mb-4 font-typewriter leading-relaxed">
                          Ildikó vagyok, belsőépítész és designer. Több mint 15 éve foglalkozom terek átalakításával, 
                          lakások és irodák egyedi tervezésével. Számomra minden projekt egy új kaland, ahol a funkcionalitás 
                          és az esztétikum tökéletes harmóniájára törekszem.
                        </p>
                        <p className="text-[#D9BF77] text-base mb-4 font-typewriter leading-relaxed">
                          Hiszem, hogy minden térnek megvan a maga karaktere, és az én feladatom, hogy ezt kibontakoztassam. 
                          Nem csak szép tereket tervezek, hanem olyan környezetet, amely tükrözi az ott élők személyiségét 
                          és támogatja életstílusukat.
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
                        <h3 className="text-[#D9BF77] text-lg font-bold mb-4 font-typewriter">Filozófiám</h3>
                        <p className="text-[#D9BF77] text-base mb-4 font-typewriter leading-relaxed">
                          Minden projektben egyedi megoldásokat keresek, amelyek a megbízó igényeihez és életstílusához 
                          igazodnak. Szeretem az anyagok játékát, a színek és formák összehangolását. Klasszikus elegancia 
                          és modern funkcionalizmus - ez jellemzi a munkáimat.
                        </p>
                        <p className="text-[#D9BF77] text-base mb-4 font-typewriter leading-relaxed">
                          Munkám során különös figyelmet fordítok a fenntarthatóságra és a környezettudatos megoldásokra. 
                          Szívesen használok újrahasznosított anyagokat és vintage darabokat, amelyek egyedi karaktert 
                          adnak a tereknek.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {currentPage === 2 && (
                    <motion.div
                      key="page2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="text-[#D9BF77] text-lg font-bold mb-4 font-typewriter">Együttműködés</h3>
                        <p className="text-[#D9BF77] text-base mb-4 font-typewriter leading-relaxed">
                          A projekt minden szakaszában szorosan együttműködöm ügyfeleimmel. Hiszem, hogy a legjobb eredmény 
                          akkor születik, amikor a tervező és a megbízó együtt álmodják meg az új teret.
                        </p>
                        <p className="text-[#D9BF77] text-base mb-6 font-typewriter leading-relaxed">
                          Minden terem egy történetet mesél. Az én feladatom, hogy ezt a történetet láthatóvá tegyem 
                          a bútorokon, a színeken és a részleteken keresztül.
                        </p>
                        <div className="flex space-x-4">
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
                    {[0, 1, 2].map(page => (
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
                    onClick={() => setCurrentPage(prev => Math.min(2, prev + 1))}
                    disabled={currentPage === 2}
                    className={`flex items-center gap-2 px-4 py-2 transition-colors ${
                      currentPage === 2 
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
