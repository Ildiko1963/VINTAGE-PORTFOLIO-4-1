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
      className="relative bg-[#2A1A16] bg-opacity-60 text-[#F2E8D5] py-3 z-20"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <nav className="w-auto">
            <ul className="flex flex-wrap justify-center space-x-1 md:space-x-4">
              {sections.map((section) => (
                <li key={section.id}>
                  <button 
                    onClick={() => onNavigate(section.id)}
                    className="px-3 py-2 rounded text-[#D9BF77] font-typewriter hover:bg-[#8B7355] hover:text-[#F2E8D5] transition-colors"
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
