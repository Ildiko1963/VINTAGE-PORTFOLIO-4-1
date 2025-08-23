import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Service } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServiceItemProps {
  service: Service;
  index: number;
}

interface ServiceItemPropsWithT extends ServiceItemProps {
  t: (key: string) => string;
}

const ServiceItem = ({ service, index, t }: ServiceItemPropsWithT) => {
  const getTranslatedTitle = () => {
    if (service.title === 'Design') return t('services.design.title');
    if (service.title === 'Construction') return t('services.construction.title');
    if (service.title === 'Consulting') return t('services.consulting.title');
    return service.title;
  };

  const getTranslatedDescription = () => {
    if (service.title === 'Design') return t('services.design.desc');
    if (service.title === 'Construction') return t('services.construction.desc');
    if (service.title === 'Consulting') return t('services.consulting.desc');
    return service.description;
  };

  const getTranslatedFeatures = () => {
    if (service.title === 'Design') return [
      t('services.design.features.1'),
      t('services.design.features.2'),
      t('services.design.features.3')
    ];
    if (service.title === 'Construction') return [
      t('services.construction.features.1'),
      t('services.construction.features.2'),
      t('services.construction.features.3')
    ];
    if (service.title === 'Consulting') return [
      t('services.consulting.features.1'),
      t('services.consulting.features.2'),
      t('services.consulting.features.3')
    ];
    return service.features;
  };

  return (
    <motion.div 
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
      className="bg-transparent bg-opacity-20 p-8 rounded-md border border-transparent"
    >
      <div className="flex items-start mb-6">
        <div className="mr-4 text-[#D9BF77]">
          <i className={`fas fa-${service.icon} text-3xl`}></i>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif', fontWeight: 'bold', letterSpacing: '0.2em' }}>{getTranslatedTitle()}</h3>
          <p className="mb-4 font-typewriter">{getTranslatedDescription()}</p>
          <ul className="space-y-2">
            {getTranslatedFeatures().map((feature, idx) => (
              <li key={idx} className="flex items-center font-typewriter">
                <i className="fas fa-check text-[#D9BF77] mr-2"></i>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default function ServicesSection() {
  const { t } = useLanguage();
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });
  
  return (
    <section id="services" className="py-16 bg-transparent relative">
      
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-[#D9BF77] text-center mb-12"
          style={{ fontFamily: 'Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif', fontWeight: 'bold', letterSpacing: '0.2em' }}
        >
{t('services.title')}
        </motion.h2>
        
        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-transparent bg-opacity-30 p-8 rounded-md border border-transparent animate-pulse h-64"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(services || []).map((service: Service, index: number) => (
                <ServiceItem key={service.id} service={service} index={index} t={t} />
              ))}
            </div>
          )}
          
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-12"
          >
            <a 
              href="#contact" 
              className="inline-block px-8 py-3 bg-[#D9BF77] text-[#463730] font-typewriter rounded-md hover:bg-[#8B7355] hover:text-[#F2E8D5] transition-colors"
            >
{t('services.cta')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
