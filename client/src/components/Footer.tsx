import { motion } from 'framer-motion';
import { Section } from '@/lib/types';

interface FooterProps {
  sections: Section[];
  onNavigate: (id: string) => void;
}

export default function Footer({ sections, onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-transparent text-[#D9BF77] py-8">
      <div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6 md:mb-0 text-center md:text-left"
            >
              
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 md:mb-0"
            >
              <ul className="flex space-x-6">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button 
                      onClick={() => onNavigate(section.id)} 
                      className="hover:text-[#D9BF77] transition-colors"
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          <hr className="my-6 border-transparent" />
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
            <p className="font-typewriter">&copy; {currentYear} All rights reserved.</p>
            <p className="text-sm mt-2 text-[#C8B28E] font-lora">Crafting beautiful interior spaces with timeless elegance.</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
