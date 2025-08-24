import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { PortfolioItem } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface PortfolioItemCardProps {
  item: PortfolioItem;
  index: number;
  t: (key: string) => string;
  totalItems: number;
}

function PortfolioItemCard({ item, index, t, totalItems }: PortfolioItemCardProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const additionalImages = item.additionalImages || [];
  const hasAdditionalImages = additionalImages.length > 0;
  const allImages = hasAdditionalImages ? [item.imageUrl, ...additionalImages] : [item.imageUrl];
  const isFirst = index === 0;
  const isLast = index === totalItems - 1;

  return (
    <motion.div 
      key={item.id}
      initial={{ y: 30, opacity: 0, scale: isLast ? 1.3 : isFirst ? 1.1 : 1 }}
      whileInView={{ y: 0, opacity: 1, scale: isLast ? 1.3 : isFirst ? 1.1 : 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
      className={`group relative overflow-visible ${isLast ? 'mt-8' : ''}`}
      style={{ zIndex: isLast ? 15 : isFirst ? 10 : 0 }}
    >
      <div className="relative h-48 flex items-center justify-center vintage-frame">
        <img 
          src={allImages[selectedImage]} 
          alt={item.title} 
          className="w-full h-full object-cover transition-all duration-500 filter grayscale group-hover:grayscale-0"
        />
        
        {hasAdditionalImages && (
          <div className="absolute bottom-2 left-2 flex gap-1">
            {allImages.map((_, imgIndex) => (
              <button
                key={imgIndex}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(imgIndex);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  selectedImage === imgIndex ? 'bg-[#D9BF77]' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        )}
        
        {hasAdditionalImages && allImages.length > 1 && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-[#D9BF77] px-2 py-1 rounded text-xs">
            {selectedImage + 1}/{allImages.length}
          </div>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="bg-[#2A1A16] bg-opacity-80 px-3 py-2 mx-2 mb-2 rounded">
          <h3 className="text-sm font-bold text-[#D9BF77] text-center" style={{ fontFamily: 'Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif', fontWeight: 'bold', letterSpacing: '0.1em' }}>{item.title}</h3>
          <p className="text-center text-xs font-typewriter mt-1">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const { t } = useLanguage();
  const { data: portfolioItems, isLoading } = useQuery<PortfolioItem[]>({
    queryKey: ['/api/portfolio'],
  });
  
  return (
    <section id="portfolio" className="py-16 bg-transparent text-[#D9BF77] relative">
      
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#D9BF77]"
          style={{ fontFamily: 'Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif', fontWeight: 'bold', letterSpacing: '0.2em' }}
        >
{t('portfolio.title')}
        </motion.h2>
        
        <div className="py-8 flex justify-center">
          <div className="w-full max-w-4xl">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 mb-12 justify-items-center">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-[#2A1A16] bg-opacity-30 rounded-md h-48 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 mb-12 justify-items-center">
                {(portfolioItems || []).map((item: PortfolioItem, index: number) => (
                  <PortfolioItemCard key={item.id} item={item} index={index} t={t} totalItems={(portfolioItems || []).length} />
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
                className="inline-block px-8 py-3 bg-[#D9BF77] text-[#463730] font-typewriter rounded-md hover:bg-[#2A1A16] transition-colors"
              >
                View Full Portfolio
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
