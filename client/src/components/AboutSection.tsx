import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-transparent relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 
              className="text-4xl md:text-5xl font-bold text-[#D9BF77] mb-6"
              style={{ fontFamily: 'Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif', fontWeight: 'bold', letterSpacing: '0.2em' }}
            >
              {t('about.title')}
            </h2>
            
            <p className="text-[#C8B28E] mb-6 leading-relaxed font-typewriter">
              {t('about.content1')}
            </p>
            
            <p className="text-[#C8B28E] mb-8 leading-relaxed font-typewriter">
              {t('about.content2')}
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl font-bold text-[#D9BF77] mb-2"
                  style={{ fontFamily: 'Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif' }}
                >
                  150+
                </motion.div>
                <div className="text-sm text-[#C8B28E] font-typewriter">{t('about.projects')}</div>
              </div>
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-3xl font-bold text-[#D9BF77] mb-2"
                  style={{ fontFamily: 'Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif' }}
                >
                  50+
                </motion.div>
                <div className="text-sm text-[#C8B28E] font-typewriter">{t('about.clients')}</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <img
              src="https://pixabay.com/get/g7930d4408aae3ef9ed7a96e98ff7b60c747a22ff84d5b4358895843eb5e628d48c1fb01facad3e8df3d24337a7aa2e06e9af878640ea0c097dec6dc7a0843da5_1280.jpg"
              alt="Vintage design workspace"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#D9BF77] rounded-full flex items-center justify-center">
              <i className="fas fa-palette text-[#463730] text-2xl"></i>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
