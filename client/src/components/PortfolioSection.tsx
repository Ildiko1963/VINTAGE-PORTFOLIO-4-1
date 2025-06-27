import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import FilmFrameWrapper from './FilmFrameWrapper';
import { PortfolioItem } from '@/lib/types';

export default function PortfolioSection() {
  const { data: portfolioItems, isLoading } = useQuery<PortfolioItem[]>({
    queryKey: ['/api/portfolio'],
  });
  
  return (
    <section id="portfolio" className="py-16 bg-transparent text-[#D9BF77] border-t-[20px] border-[#8B7355] relative">
      {/* Top shadow strip */}
      <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-black to-transparent opacity-60 z-20"></div>
      {/* Bottom shadow strip */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent opacity-60 z-20"></div>
      
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-playfair text-4xl md:text-5xl font-bold text-center mb-12"
        >
          Featured Works
        </motion.h2>
        
        <FilmFrameWrapper className="py-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-[#8B7355] bg-opacity-30 rounded-md h-64 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {(portfolioItems || []).map((item: PortfolioItem, index: number) => (
                <motion.div 
                  key={item.id}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="group relative overflow-hidden rounded-md"
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#463730] bg-opacity-80 flex flex-col justify-center items-center p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <h3 className="font-playfair text-xl font-bold mb-2 text-[#D9BF77]">{item.title}</h3>
                    <p className="text-center mb-4">{item.description}</p>
                    <a 
                      href={item.projectLink || "#"} 
                      className="inline-block px-4 py-2 border border-[#D9BF77] text-[#D9BF77] hover:bg-[#D9BF77] hover:text-[#463730] transition-colors"
                    >
                      View Project
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-8">
            <motion.a 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              href="#" 
              className="inline-block px-8 py-3 bg-[#D9BF77] text-[#463730] font-typewriter rounded-md hover:bg-[#C8B28E] transition-colors"
            >
              View Full Portfolio
            </motion.a>
          </div>
        </FilmFrameWrapper>
      </div>
    </section>
  );
}
