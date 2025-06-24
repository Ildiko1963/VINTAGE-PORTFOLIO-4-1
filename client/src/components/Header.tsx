import { motion } from 'framer-motion';
import { Section } from '@/lib/types';

interface HeaderProps {
  sections: Section[];
  onNavigate: (id: string) => void;
}

export default function Header({ sections, onNavigate }: HeaderProps) {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-[#463730] text-[#F2E8D5] py-8 z-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.2)_0%,_rgba(255,255,255,0)_70%)] animate-[projector-rotate_10s_infinite_linear] z-[-1]"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold">
              <span className="text-[#D9BF77]">Ildiko</span>style Portfolio
            </h1>
            <p className="font-typewriter mt-2">interior design</p>
          </div>
          
          <nav className="w-full md:w-auto">
            <ul className="flex flex-wrap justify-center space-x-1 md:space-x-4">
              {sections.map((section) => (
                <li key={section.id}>
                  <button 
                    onClick={() => onNavigate(section.id)}
                    className="px-3 py-2 rounded hover:bg-[#8B7355] hover:text-[#D9BF77] transition-colors"
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
