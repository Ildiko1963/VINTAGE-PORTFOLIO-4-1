import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { apiRequest } from '@/lib/queryClient';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { t } = useLanguage();

  const submitMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Üzenet elküldve!",
        description: "Hamarosan felvesszük Önnel a kapcsolatot.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    },
    onError: (error) => {
      toast({
        title: "Hiba történt",
        description: "Kérjük, próbálja újra később.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 bg-transparent relative">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-[#D9BF77] text-center mb-6"
          style={{ fontFamily: 'Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif', fontWeight: 'bold', letterSpacing: '0.2em' }}
        >
          {t('contact.title')}
        </motion.h2>
        
        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-[#C8B28E] mb-12 max-w-2xl mx-auto font-typewriter"
        >
          {t('contact.subtitle')}
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#D9BF77] mb-2 font-typewriter">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-transparent border border-[#D9BF77] rounded-md text-[#F2E8D5] focus:outline-none focus:ring-2 focus:ring-[#D9BF77] font-typewriter"
                  placeholder="Az Ön neve"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#D9BF77] mb-2 font-typewriter">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-transparent border border-[#D9BF77] rounded-md text-[#F2E8D5] focus:outline-none focus:ring-2 focus:ring-[#D9BF77] font-typewriter"
                  placeholder="email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[#D9BF77] mb-2 font-typewriter">
                  {t('contact.form.subject')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-transparent border border-[#D9BF77] rounded-md text-[#F2E8D5] focus:outline-none focus:ring-2 focus:ring-[#D9BF77] font-typewriter"
                  placeholder="Üzenet tárgya"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#D9BF77] mb-2 font-typewriter">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-transparent border border-[#D9BF77] rounded-md text-[#F2E8D5] focus:outline-none focus:ring-2 focus:ring-[#D9BF77] resize-none font-typewriter"
                  placeholder="Írja le üzenetét..."
                />
              </div>
              
              <button
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full px-8 py-3 bg-[#D9BF77] text-[#463730] font-typewriter rounded-md hover:bg-[#2A1A16] hover:text-[#F2E8D5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitMutation.isPending ? 'Küldés...' : t('contact.form.send')}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold text-[#D9BF77] mb-4 font-typewriter">
                {t('contact.info.title')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <i className="fas fa-envelope text-[#D9BF77] mr-4 text-lg"></i>
                  <span className="text-[#C8B28E] font-typewriter">info@ildikostyle.hu</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-phone text-[#D9BF77] mr-4 text-lg"></i>
                  <span className="text-[#C8B28E] font-typewriter">+36 1 234 5678</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt text-[#D9BF77] mr-4 text-lg"></i>
                  <span className="text-[#C8B28E] font-typewriter">1052 Budapest, Váci utca 123.</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#D9BF77] mb-4 font-typewriter">
                {t('contact.info.follow')}
              </h3>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-[#D9BF77] rounded-full flex items-center justify-center text-[#463730] hover:bg-[#2A1A16] hover:text-[#F2E8D5] transition-colors">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-[#D9BF77] rounded-full flex items-center justify-center text-[#463730] hover:bg-[#2A1A16] hover:text-[#F2E8D5] transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-[#D9BF77] rounded-full flex items-center justify-center text-[#463730] hover:bg-[#2A1A16] hover:text-[#F2E8D5] transition-colors">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-[#D9BF77] rounded-full flex items-center justify-center text-[#463730] hover:bg-[#2A1A16] hover:text-[#F2E8D5] transition-colors">
                  <i className="fab fa-behance"></i>
                </a>
              </div>
            </div>

            <div className="bg-[#463730]/30 p-6 rounded-lg border border-[#D9BF77]/30">
              <h4 className="font-bold text-[#D9BF77] mb-2 font-typewriter">Nyitvatartás</h4>
              <div className="space-y-1 text-sm text-[#C8B28E] font-typewriter">
                <div className="flex justify-between">
                  <span>Hétfő - Péntek:</span>
                  <span>9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Szombat:</span>
                  <span>10:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Vasárnap:</span>
                  <span>Zárva</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
