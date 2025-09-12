import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'hu' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  hu: {
    // Navigation
    'nav.home': 'Főoldal',
    'nav.about': 'Rólam',
    'nav.portfolio': 'Portfólió',
    'nav.services': 'Szolgáltatások',
    'nav.contact': 'Kapcsolat',
    
    // Hero Section
    'hero.title': 'Ildikostyle Portfolio',
    'hero.subtitle': 'lakberendezés',
    'hero.cta': 'Fedezze fel munkáimat',
    
    // About Section
    'about.title': 'Rólam',
    'about.intro': 'Tölts Ildikó vagyok. A Junior Art neves lakberendező iskola hallgatójaként végeztem. Már iskolai tanulmányaim megkezdése előtt is több referencia munkával büszkélkedhettem.',
    'about.philosophy1': 'Életem szerves része, mindennapjaim alkotó eleme a harmóniára való törekvés, a harmónia megteremtése.',
    'about.philosophy1b': 'Fontosnak érzem, hogy figyeljünk magunkra, mind belsőleg, mind külsőleg, mind az életterünk által, mivel csak egy önmagunkat visszatükröző környezetben érezhetjük igazán jól magunkat. Az erre való tudatos törekvés kellene, hogy átitassa életünk minden szegmensét, területét.',
    'about.philosophy2': 'Ha hagyjuk magunkat a mai, társadalmi struktúrából fakadó, piacorientált, személytelen attitűd által sodródni, tömegnormáknak engedelmeskedve, életünk elsivárosodása, mindennapjaink egyhangúsága örömtelenséggel és kiegyensúlyozatlansággal párosulva nem sok boldog és derűs pillanatot fog tartogatni a számunkra.',
    'about.philosophy3': 'Ezért tartom fontosnak az enteriőrtervezést, mivel általa bátrabban tudunk kilépni az élet küzdőterére, felvértezve magunkat a környezetünk szépségéből, és harmóniájából fakadó biztonságérzettel.',
    'about.philosophy4': 'Egy jó tervező feladata az, hogy meglássa, meglátassa és az életterünkben egyben megalkossa a belső lényünkben lakó indivíduumot, megtalálva a hozzá vezető utat eklektika, minimál art, high-tech, posztmodern, vagy bármely stílus által...',
    'about.philosophy5': 'Továbbá egy jó tervező feladata nem a megszokott szabályok felállítása, ezzel is növelve az életünk merevségét, gátoltságát, hanem azok lerombolása teret adva az egyéniség határtalan szárnyalásának egy minőségibb, kiteljesedettebb élet felé, megnyitva az ajtót belső lényünkben annak a szikrának, aminek a segítségével áttörhetünk a hétköznapok szürkeségén, a többi emberhez való kényszeres megfelelés erőltetett, fojtogató rabszolgaságán!',
    'about.philosophy6': 'Feladatomnak érzem ennek az elkötelezettségnek a szellemében viszonyulni ehhez a munkához, és a munkán keresztül az emberekhez.',
    'about.philosophy7': 'Mert egy alkotó munka sikerét nem az határozza meg, hogy az alkotó mit tett, hanem, hogy az alkotása az alázatnak és a benne lakó szeretetnek engedelmeskedve, mennyire volt képes javítani az önmagunk iránt érzett elfogadás, az emberi méltóságunk manapság oly megfakult képén...',
    'about.philosophy7_highlighted': '<strong><em>Mert egy alkotó munka sikerét nem az határozza meg, hogy az alkotó mit tett, hanem, hogy az alkotása az alázatnak és a benne lakó szeretetnek engedelmeskedve, mennyire volt képes javítani az önmagunk iránt érzett elfogadás, az emberi méltóságunk manapság oly megfakult képén...</em></strong>',
    'about.philosophy8': 'És ha egy jól megkomponált enteriőr nem is többet, mint egy parányi örömet, békességet, meghittséget ajándékoz megrendelőjének, már megérte.',
    'about.philosophy9': 'Mert megmutatni magunkat a külvilág számára, mégha egy szakember által is, sokunknak nem kis feladat. De bizony megéri! Ehhez bátorság kell, de bátornak lenni egy méltóbb élet reményében, főleg megéri!',
    'about.armani': 'A stílus az egyetlen olyan igazi luxus, amit bárki megengedhet magának, függetlenül attól, hogy mennyi pénze van. Ez olyan dolog, ami velünk született, de tanulható, feltéve, ha megvan hozzá az emberben a kellő intelligencia.',
    
    // Portfolio Section
    'portfolio.title': 'Portfólió',
    'portfolio.viewGallery': 'Galéria megtekintése',
    'portfolio.viewFull': 'Teljes portfólió megtekintése',
    'portfolio.closeModal': 'Bezárás',
    
    // Portfolio Projects
    'portfolio.publications.title': 'Publikációk',
    'portfolio.publications.desc': 'Publikációk',
    'portfolio.plans.title': 'Tervek',
    'portfolio.plans.desc': 'Építészeti tervek és tervezési koncepciók',
    'portfolio.studio.title': 'Stúdió lakás',
    'portfolio.studio.desc': 'luxus és kényelem 27m2-en',
    'portfolio.industrial.title': 'Indusztrális legénylakás',
    'portfolio.industrial.desc': 'Retro, ipari stílus a funkcionalitás jegyében',
    'portfolio.historic.title': 'A jó öreg laktanya',
    'portfolio.historic.desc': 'Történelmi terek átalakítása modern funkcionalitással',
    'portfolio.bold.title': 'Vakmerő színpompa',
    'portfolio.bold.desc': 'Merész belső terek egyedi karakterrel',
    'portfolio.provence.title': 'Provence stílus',
    'portfolio.provence.desc': 'Francia vidéki báj rusztikus eleganciával',
    'portfolio.ancient.title': 'Ókori design',
    'portfolio.ancient.desc': 'Cipőbolt Vasarelyvel',
    'portfolio.commercial.title': 'Üzleti épület tetőtérrel és lakás tervezéssel',
    'portfolio.commercial.desc': 'Kortárs belső tervezés meleg családi légkörrel',
    
    // Services Section
    'services.title': 'Szolgáltatások',
    'services.design.title': 'Tervezés',
    'services.design.desc': 'Professzionális lakberendezési tervek és koncepcióalkotás',
    'services.design.features.1': 'Lakástervezés és térszervezés',
    'services.design.features.2': 'Színkiválasztás és anyaghasználat',
    'services.design.features.3': 'Bútor és dekoráció kiválasztása',
    'services.construction.title': 'Kivitelezés',
    'services.construction.desc': 'Teljes körű projektmenedzsment és kivitelezési felügyelet',
    'services.construction.features.1': 'Projektmenedzsment szolgáltatások',
    'services.construction.features.2': 'Kivitelezői koordináció',
    'services.construction.features.3': 'Minőségbiztosítás és felügyelet',
    'services.consulting.title': 'Tanácsadás',
    'services.consulting.desc': 'Személyre szabott stílustanácsadás és tervezési konzultáció',
    'services.consulting.features.1': 'Személyes stíluskonsultáció',
    'services.consulting.features.2': 'Lakberendezési tanácsadás',
    'services.consulting.features.3': 'Szakértői vélemény és javaslatok',
    'services.cta': 'Árajánlat kérése',
    
    // Contact Section
    'contact.title': 'Kapcsolat',
    'contact.info': 'Kapcsolati információk',
    'contact.studio': 'Stúdió helyszíne',
    'contact.address': '2900 Komárom, Igmándi út 27. Magyarország',
    'contact.form.title': 'Üzenet küldése',
    'contact.form.name': 'Név',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Tárgy',
    'contact.form.message': 'Üzenet',
    'contact.form.send': 'Küldés',
    'contact.form.subject.design': 'Tervezés',
    'contact.form.subject.construction': 'Kivitelezés',
    'contact.form.subject.consulting': 'Tanácsadás',
    'contact.form.success': 'Köszönjük!',
    'contact.form.successMsg': 'Az üzeneted megérkezett. Hamarosan felvesszük veled a kapcsolatot.',
    
    // Common
    'loading': 'Betöltés...',
    'intro.startProjection': 'Indítsd a vetítőt',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.portfolio': 'Portfolio',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Ildikostyle Portfolio',
    'hero.subtitle': 'interior design',
    'hero.cta': 'Explore My Work',
    
    // About Section
    'about.title': 'About Me',
    'about.intro': 'I am Ildikó Tölts. I graduated from the renowned Junior Art interior design school. Even before starting my studies, I could already boast several reference works.',
    'about.philosophy1': 'An integral part of my life, a creative element of my daily routine is the pursuit of harmony, the creation of harmony.',
    'about.philosophy1b': 'I feel it is important that we pay attention to ourselves, both internally and externally, and through our living space, since we can only truly feel comfortable in an environment that reflects ourselves. This conscious striving should permeate every segment and area of our lives.',
    'about.philosophy2': 'If we allow ourselves to be swept away by today\'s market-oriented, impersonal attitude stemming from social structure, obeying mass norms, the suburbanization of our lives, the monotony of our daily lives paired with joylessness and imbalance will not hold many happy and cheerful moments for us.',
    'about.philosophy3': 'This is why I consider interior design important, because through it we can step more boldly into the arena of life, arming ourselves with the sense of security arising from the beauty and harmony of our environment.',
    'about.philosophy4': 'A good designer\'s task is to see, show and create in our living space the individual living within our inner being, finding the path to it through eclecticism, minimal art, high-tech, postmodern, or any style...',
    'about.philosophy5': 'Furthermore, a good designer\'s task is not to establish the usual rules, thereby increasing the rigidity and inhibition of our lives, but to break them down, giving space to the unlimited soaring of individuality towards a higher quality, more fulfilled life, opening the door in our inner being to that spark with which we can break through the grayness of everyday life, the forced, suffocating slavery of compulsive conformity to others!',
    'about.philosophy6': 'I feel it is my task to approach this work and through work, people, in the spirit of this commitment.',
    'about.philosophy7': 'Because the success of a creative work is not determined by what the creator did, but by how much their creation, obeying humility and the love within, was able to improve our self-acceptance, the nowadays so faded image of our human dignity...',
    'about.philosophy7_highlighted': '<strong><em>Because the success of a creative work is not determined by what the creator did, but by how much their creation, obeying humility and the love within, was able to improve our self-acceptance, the nowadays so faded image of our human dignity...</em></strong>',
    'about.philosophy8': 'And if a well-composed interior gives nothing more than a tiny joy, peace, intimacy to its client, it was already worth it.',
    'about.philosophy9': 'Because showing ourselves to the outside world, even through a professional, is no small task for many of us. But it\'s definitely worth it! This requires courage, but being brave in the hope of a more worthy life is especially worth it!',
    'about.armani': 'Style is the only real luxury that anyone can afford, regardless of how much money they have. It\'s something we\'re born with, but it can be learned, provided one has the necessary intelligence.',
    
    // Portfolio Section
    'portfolio.title': 'Portfolio',
    'portfolio.viewGallery': 'View Gallery',
    'portfolio.viewFull': 'View Full Portfolio',
    'portfolio.closeModal': 'Close',
    
    // Portfolio Projects
    'portfolio.publications.title': 'Publications',
    'portfolio.publications.desc': 'Publications',
    'portfolio.plans.title': 'Plans',
    'portfolio.plans.desc': 'Architectural plans and design concepts',
    'portfolio.studio.title': 'Studio apartment',
    'portfolio.studio.desc': 'luxury and comfort in 27m2',
    'portfolio.industrial.title': 'Industrial bachelor pad',
    'portfolio.industrial.desc': 'Retro, industrial style in the spirit of functionality',
    'portfolio.historic.title': 'The Good Old Barracks',
    'portfolio.historic.desc': 'Transforming historic spaces with modern functionality',
    'portfolio.bold.title': 'Daring Color Spectacle',
    'portfolio.bold.desc': 'Daring interior concepts with unique character',
    'portfolio.provence.title': 'Provence Style',
    'portfolio.provence.desc': 'French countryside charm with rustic elegance',
    'portfolio.ancient.title': 'Ancient Design',
    'portfolio.ancient.desc': 'Shoe Store with Vasarely',
    'portfolio.commercial.title': 'Commercial building with attic and apartment design',
    'portfolio.commercial.desc': 'Contemporary interior design with warm family atmosphere',
    
    // Services Section
    'services.title': 'Services',
    'services.design.title': 'Design',
    'services.design.desc': 'Professional interior design plans and concept development',
    'services.design.features.1': 'Space planning and organization',
    'services.design.features.2': 'Color selection and material usage',
    'services.design.features.3': 'Furniture and decoration selection',
    'services.construction.title': 'Construction',
    'services.construction.desc': 'Complete project management and construction supervision',
    'services.construction.features.1': 'Project management services',
    'services.construction.features.2': 'Construction coordination',
    'services.construction.features.3': 'Quality assurance and supervision',
    'services.consulting.title': 'Consulting',
    'services.consulting.desc': 'Personalized style consulting and design consultation',
    'services.consulting.features.1': 'Personal style consultation',
    'services.consulting.features.2': 'Interior design advice',
    'services.consulting.features.3': 'Expert opinion and recommendations',
    'services.cta': 'Request Quote',
    
    // Contact Section
    'contact.title': 'Contact',
    'contact.info': 'Contact Information',
    'contact.studio': 'Studio Location',
    'contact.address': '2900 Komárom, Igmándi út 27. Hungary',
    'contact.form.title': 'Send Message',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send',
    'contact.form.subject.design': 'Design',
    'contact.form.subject.construction': 'Construction',
    'contact.form.subject.consulting': 'Consulting',
    'contact.form.success': 'Thank You!',
    'contact.form.successMsg': 'Your message has been received. We\'ll get back to you shortly.',
    
    // Common
    'loading': 'Loading...',
    'intro.startProjection': 'Start Projection',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('hu');

  const t = (key: string): string => {
    return (translations[language] as Record<string, string>)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}