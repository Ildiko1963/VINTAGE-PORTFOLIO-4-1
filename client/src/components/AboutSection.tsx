import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-transparent border-t-[20px] border-[#8B7355] relative">
      {/* Top shadow strip */}
      <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-black to-transparent opacity-60 z-20"></div>
      {/* Bottom shadow strip */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent opacity-60 z-20"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-playfair text-4xl md:text-5xl font-bold text-[#D9BF77] text-center mb-8"
          >
            About the Creator
          </motion.h2>
          
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full md:w-1/3"
            >
              <div className="relative">
                <div className="w-full h-full absolute -top-3 -left-3 border-2 border-[#D9BF77]"></div>
                <img 
                  src="/static/23358_ildiko.jpg" 
                  alt="Portrait of interior designer" 
                  className="w-full h-auto relative z-10 border-2 border-[#463730]"
                />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full md:w-2/3 font-lora"
            >
              <p className="text-[#D9BF77] text-lg mb-4">
                Tölts Ildikó vagyok. A Junior Art neves lakberendező iskola hallgatójaként végeztem. Már iskolai tanulmányaim megkezdése előtt is több referencia munkával büszkélkedhettem.
              </p>
              <p className="text-[#D9BF77] text-lg mb-4">
                Életem szerves része, mindennapjaim alkotó eleme a harmóniára való törekvés, a harmónia megteremtése. Fontosnak érzem, hogy figyeljünk magunkra, mind belsőleg, mind külsőleg, mind az életterünk által, mivel csak egy önmagunkat visszatükröző környezetben érezhetjük igazán jól magunkat. Az erre való tudatos törekvés kellene, hogy átitassa életünk minden szegmensét, területét.
              </p>
              <p className="text-[#D9BF77] text-lg mb-4">
                Ha hagyjuk magunkat a mai, társadalmi struktúrából fakadó, piacorientált, személytelen attitűd által sodródni, tömegnormáknak engedelmeskedve, életünk elsivárosodása, mindennapjaink egyhangúsága örömtelenséggel és kiegyensúlyozatlansággal párosulva nem sok boldog és derűs pillanatot fog tartogatni a számunkra.
              </p>
              <p className="text-[#D9BF77] text-lg mb-4">
                Ezért tartom fontosnak az enteriőrtervezést, mivel általa bátrabban tudunk kilépni az élet küzdőterére, felvértezve magunkat a környezetünk szépségéből, és harmóniájából fakadó biztonságérzettel.
              </p>
              <p className="text-[#D9BF77] text-lg mb-4">
                Egy jó tervező feladata az, hogy meglássa, meglátassa és az életterünkben egyben megalkossa a belső lényünkben lakó indivíduumot, megtalálva a hozzá vezető utat eklektika, minimál art, high-tech, posztmodern, vagy bármely stílus által...
              </p>
              <p className="text-[#D9BF77] text-lg mb-4">
                Továbbá egy jó tervező feladata nem a megszokott szabályok felállítása, ezzel is növelve az életünk merevségét, gátoltságát, hanem azok lerombolása teret adva az egyéniség határtalan szárnyalásának egy minőségibb, kiteljesedettebb élet felé, megnyitva az ajtót belső lényünkben annak a szikrának, aminek a segítségével áttörhetünk a hétköznapok szürkeségén, a többi emberhez való kényszeres megfelelés erőltetett, fojtogató rabszolgaságán!
              </p>
              <p className="text-[#D9BF77] text-lg mb-4">
                Feladatomnak érzem ennek az elkötelezettségnek a szellemében viszonyulni ehhez a munkához, és a munkán keresztül az emberekhez.
              </p>
              <p className="text-[#D9BF77] text-lg mb-4 font-typewriter italic">
                Mert egy alkotó munka sikerét nem az határozza meg, hogy az alkotó mit tett, hanem, hogy az alkotása az alázatnak, és a benne lakó szeretetnek engedelmeskedve, mennyire volt képes javítani az önmagunk iránt érzett elfogadás, az emberi méltóságunk manapság oly megfakult képén...
              </p>
              <p className="text-[#D9BF77] text-lg mb-4">
                És ha egy jól megkomponált enteriőr nem is többet, mint egy parányi örömet, békességet, meghittséget ajándékoz megrendelőjének, már megérte.
              </p>
              <p className="text-[#D9BF77] text-lg mb-6 font-typewriter">
                "Mert megmutatni magunkat a külvilág számára, mégha egy szakember által is, sokunknak nem kis feladat. De bizony megéri! Ehhez bátorság kell, de bátornak lenni egy méltóbb élet reményében, főleg megéri!"
              </p>
              <div className="flex space-x-4 mt-6">
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
            </motion.div>
          </div>
          

        </div>
      </div>
    </section>
  );
}
