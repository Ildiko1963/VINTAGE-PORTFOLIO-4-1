import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Service } from '@/lib/types';

interface ServiceItemProps {
  service: Service;
  index: number;
}

const ServiceItem = ({ service, index }: ServiceItemProps) => {
  return (
    <motion.div 
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
      className="bg-transparent bg-opacity-20 p-8 rounded-md border border-[#8B7355]"
    >
      <div className="flex items-start mb-6">
        <div className="mr-4 text-[#D9BF77]">
          <i className={`fas fa-${service.icon} text-3xl`}></i>
        </div>
        <div>
          <h3 className="font-playfair text-2xl font-bold mb-3">{service.title}</h3>
          <p className="mb-4">{service.description}</p>
          <ul className="space-y-2">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-center">
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
  const { data: services, isLoading } = useQuery({
    queryKey: ['/api/services'],
  });
  
  return (
    <section id="services" className="py-16 bg-transparent">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-playfair text-4xl md:text-5xl font-bold text-[#463730] text-center mb-12"
        >
          Services Offered
        </motion.h2>
        
        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-transparent bg-opacity-30 p-8 rounded-md border border-[#8B7355] animate-pulse h-64"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services?.map((service: Service, index: number) => (
                <ServiceItem key={service.id} service={service} index={index} />
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
              Request a Quote
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
