import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-black/80 backdrop-blur-sm rounded-lg p-2">
      <Globe className="w-4 h-4 text-[#D9BF77]" />
      <button
        onClick={() => setLanguage('hu')}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          language === 'hu'
            ? 'bg-[#D9BF77] text-black'
            : 'text-[#D9BF77] hover:bg-[#D9BF77]/20'
        }`}
      >
        HU
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          language === 'en'
            ? 'bg-[#D9BF77] text-black'
            : 'text-[#D9BF77] hover:bg-[#D9BF77]/20'
        }`}
      >
        EN
      </button>
    </div>
  );
}