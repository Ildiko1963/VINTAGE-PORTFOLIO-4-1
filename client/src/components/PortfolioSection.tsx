import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'wouter';
import { PortfolioItem } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { t } = useLanguage();
  
  const { data: portfolioItems, isLoading } = useQuery<PortfolioItem[]>({
    queryKey: ['/api/portfolio'],
  });

  const categories = [
    { id: 'all', label: t('portfolio.categories.all') },
    { id: 'industrial', label: t('portfolio.categories.industrial') },
    { id: 'creative', label: t('portfolio.categories.creative') },
    { id: 'photography', label: t('portfolio.categories.photography') },
  ];

  const filteredItems = portfolioItems?.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  ) || [];

  return (
    <section id="portfolio" className="py-20 bg-transparent relative">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-[#D9BF77] text-center mb-6"
          style={{ fontFamily: 'Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif', fontWeight: 'bold', letterSpacing: '0.2em' }}
        >
          {t('portfolio.title')}
        </motion.h2>
        
        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-[#C8B28E] mb-12 max-w-2xl mx-auto font-typewriter"
        >
          {t('portfolio.subtitle')}
        </motion.p>

        {/* Category Filter */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-md font-typewriter transition-colors ${
                selectedCategory === category.id
                  ? 'bg-[#D9BF77] text-[#463730]'
                  : 'bg-transparent border border-[#D9BF77] text-[#D9BF77] hover:bg-[#D9BF77] hover:text-[#463730]'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-transparent bg-opacity-30 p-6 rounded-md border border-transparent animate-pulse h-80"></div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-transparent bg-opacity-20 rounded-md border border-transparent overflow-hidden hover:border-[#D9BF77] transition-all duration-300 hover:shadow-lg"
              >
                <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#D9BF77] uppercase tracking-wider font-typewriter">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[#D9BF77]" 
                      style={{ fontFamily: 'Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif', fontWeight: 'bold', letterSpacing: '0.1em' }}>
                    {item.title}
                  </h3>
                  <p className="text-[#C8B28E] mb-4 font-typewriter">{item.description}</p>
                  <Link href={`/portfolio/${item.id}`}>
                    <button className="text-[#D9BF77] hover:text-[#C8B28E] transition-colors font-typewriter">
                      {t('portfolio.viewDetails')} →
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {filteredItems.length === 0 && !isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-[#C8B28E] font-typewriter">{t('portfolio.noItems')}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
