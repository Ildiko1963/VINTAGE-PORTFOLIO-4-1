import { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  hu: {
    nav: {
      home: 'Kezdőlap',
      about: 'Rólunk',
      portfolio: 'Portfólió',
      services: 'Szolgáltatások',
      contact: 'Kapcsolat'
    },
    hero: {
      title: 'Vintage Film Portfolio',
      subtitle: 'Fedezze fel egyedi vintage stílusú munkáinkat és kreatív projektjeinket.',
      cta: 'Portfólió megtekintése',
      contact: 'Kapcsolatfelvétel'
    },
    about: {
      title: 'Rólunk',
      content1: 'Több mint 10 éve dolgozunk a vintage stílus és a modern technológia határmezsgyéjén.',
      content2: 'Csapatunk szenvedélyesen kutatja a múlt esztétikáját és ötvözi azt a jelen innovációival.',
      projects: 'Befejezett projekt',
      clients: 'Elégedett ügyfél'
    },
    portfolio: {
      title: 'Portfólió',
      subtitle: 'Tekintse meg legkiemelkedőbb munkáinkat különböző kategoriákban.',
      categories: {
        all: 'Összes',
        industrial: 'Indusztriális',
        creative: 'Kreatív',
        photography: 'Fotográfia'
      },
      viewDetails: 'Részletek',
      noItems: 'Nincsenek elemek ebben a kategóriában.'
    },
    services: {
      title: 'Szolgáltatások',
      design: {
        title: 'Tervezés',
        desc: 'Kreatív tervezési szolgáltatások vintage stílusban',
        features: {
          1: 'Logó tervezés',
          2: 'Grafikai arculat',
          3: 'Print design'
        }
      },
      construction: {
        title: 'Kivitelezés',
        desc: 'Belső terek vintage átalakítása és kivitelezése',
        features: {
          1: 'Tér tervezés',
          2: 'Bútor készítés',
          3: 'Dekoráció'
        }
      },
      consulting: {
        title: 'Tanácsadás',
        desc: 'Szakértői tanácsadás vintage projektekhez',
        features: {
          1: 'Stílus tanácsadás',
          2: 'Projekt menedzsment',
          3: 'Költségvetés tervezés'
        }
      },
      cta: 'Kapcsolatfelvétel'
    },
    contact: {
      title: 'Kapcsolat',
      subtitle: 'Érdekelné egy együttműködés? Küldje el üzenetét!',
      form: {
        name: 'Név',
        email: 'E-mail',
        subject: 'Tárgy',
        message: 'Üzenet',
        send: 'Üzenet küldése'
      },
      info: {
        title: 'Elérhetőségek',
        follow: 'Kövessen minket'
      }
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      portfolio: 'Portfolio',
      services: 'Services',
      contact: 'Contact'
    },
    hero: {
      title: 'Vintage Film Portfolio',
      subtitle: 'Discover our unique vintage-style works and creative projects.',
      cta: 'View Portfolio',
      contact: 'Get in Touch'
    },
    about: {
      title: 'About Us',
      content1: 'We have been working at the intersection of vintage style and modern technology for over 10 years.',
      content2: 'Our team passionately researches the aesthetics of the past and combines it with today\'s innovations.',
      projects: 'Completed Projects',
      clients: 'Satisfied Clients'
    },
    portfolio: {
      title: 'Portfolio',
      subtitle: 'View our most outstanding work in different categories.',
      categories: {
        all: 'All',
        industrial: 'Industrial',
        creative: 'Creative',
        photography: 'Photography'
      },
      viewDetails: 'View Details',
      noItems: 'No items in this category.'
    },
    services: {
      title: 'Services',
      design: {
        title: 'Design',
        desc: 'Creative design services in vintage style',
        features: {
          1: 'Logo design',
          2: 'Graphic identity',
          3: 'Print design'
        }
      },
      construction: {
        title: 'Construction',
        desc: 'Interior transformation and implementation in vintage style',
        features: {
          1: 'Space planning',
          2: 'Furniture making',
          3: 'Decoration'
        }
      },
      consulting: {
        title: 'Consulting',
        desc: 'Expert advice for vintage projects',
        features: {
          1: 'Style consulting',
          2: 'Project management',
          3: 'Budget planning'
        }
      },
      cta: 'Contact Us'
    },
    contact: {
      title: 'Contact',
      subtitle: 'Interested in collaboration? Send us your message!',
      form: {
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        send: 'Send Message'
      },
      info: {
        title: 'Contact Information',
        follow: 'Follow Us'
      }
    }
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('hu');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language as keyof typeof translations];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
