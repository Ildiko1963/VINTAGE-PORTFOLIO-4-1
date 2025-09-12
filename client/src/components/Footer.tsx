import { motion } from 'framer-motion';
import { Section } from '@/lib/types';

interface FooterProps {
  sections: Section[];
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ sections, onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#463730] text-[#F2E8D5] py-12 relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 
              className="text-2xl font-bold text-[#D9BF77] mb-4"
              style={{ fontFamily: 'Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif' }}
            >
              Ildikostyle
            </h3>
            <p className="text-[#C8B28E] leading-relaxed font-typewriter">
              Kreatív megoldások vintage stílusban. 
              Minden projekt egyedi történetet mesél el.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-medium mb-4 text-[#D9BF77] font-typewriter">Navigáció</h4>
            <ul className="space-y-2 text-[#C8B28E]">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => onNavigate(section.id)}
                    className="hover:text-[#D9BF77] transition-colors duration-300 font-typewriter"
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-medium mb-4 text-[#D9BF77] font-typewriter">Kapcsolat</h4>
            <ul className="space-y-2 text-[#C8B28E] font-typewriter">
              <li>info@ildikostyle.hu</li>
              <li>+36 1 234 5678</li>
              <li>1052 Budapest, Váci utca 123.</li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-[#D9BF77]/30 mt-8 pt-8 text-center text-[#C8B28E]"
        >
          <p className="font-typewriter">&copy; 2025 Ildikostyle Portfolio. Minden jog fenntartva.</p>
        </motion.div>
      </div>
    </footer>
  );
}
