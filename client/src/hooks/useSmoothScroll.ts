import { useCallback } from 'react';
import { Section } from '@/lib/types';

export function useSmoothScroll(sections: Section[]) {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, []);

  return {
    scrollToSection,
    sections,
  };
}
