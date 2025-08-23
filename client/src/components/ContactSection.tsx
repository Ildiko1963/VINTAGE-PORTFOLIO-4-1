import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiRequest } from '@/lib/queryClient';
import { contactFormSchema, ContactForm } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactSection() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });
  
  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: ContactForm) => {
      const res = await apiRequest('POST', '/api/contact', formData);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      setFormSubmitted(true);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  const onSubmit = (data: ContactForm) => {
    mutate(data);
  };
  
  return (
    <section id="contact" className="py-16 bg-transparent text-[#D9BF77] relative">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
          style={{ fontFamily: 'Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif', fontWeight: 'bold', letterSpacing: '0.2em' }}
        >
{t('contact.title')}
        </motion.h2>
        
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-3/5"
          >
            <h3 className="text-2xl font-bold mb-6 text-[#D9BF77]" style={{ fontFamily: 'Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif', fontWeight: 'bold', letterSpacing: '0.2em' }}>{t('contact.info')}</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mr-4 text-[#D9BF77]">
                  <i className="fas fa-map-marker-alt text-2xl"></i>
                </div>
                <div>
                  <h4 className="font-bold mb-1">{t('contact.studio')}</h4>
                  <p className="font-typewriter">{t('contact.address')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 text-[#D9BF77]">
                  <i className="fas fa-phone text-2xl"></i>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Phone</h4>
                  <p className="font-typewriter">+36209220239</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 text-[#D9BF77]">
                  <i className="fas fa-envelope text-2xl"></i>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Email</h4>
                  <p className="font-typewriter">jonathan5@t-online.hu</p>
                </div>
              </div>
              

            </div>
            
            {/* Gallery images */}
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="film-frame projector-flicker film-grain">
                  <img 
                    src="/static/23358_pic02.jpg" 
                    alt="Interior design project" 
                    className="w-full h-40 object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="film-frame projector-flicker film-grain">
                  <img 
                    src="/static/23358_pic03.jpg" 
                    alt="Interior design project" 
                    className="w-full h-40 object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-bold mb-4">Connect With Me</h4>
              <div className="flex space-x-6">
                <a href="#" className="text-[#D9BF77] hover:text-[#C8B28E] transition-colors">
                  <i className="fab fa-instagram text-2xl"></i>
                </a>
                <a href="#" className="text-[#D9BF77] hover:text-[#C8B28E] transition-colors">
                  <i className="fab fa-vimeo-v text-2xl"></i>
                </a>
                <a href="#" className="text-[#D9BF77] hover:text-[#C8B28E] transition-colors">
                  <i className="fab fa-youtube text-2xl"></i>
                </a>
                <a href="#" className="text-[#D9BF77] hover:text-[#C8B28E] transition-colors">
                  <i className="fab fa-twitter text-2xl"></i>
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full md:w-2/5"
          >
            {formSubmitted ? (
              <div className="bg-[#F2E8D5] p-6 rounded-md text-[#463730] h-full flex flex-col justify-center items-center">
                <i className="fas fa-check-circle text-5xl text-[#D9BF77] mb-4"></i>
                <h3 className="font-playfair text-2xl font-bold mb-4">Thank You!</h3>
                <p className="text-center mb-6">Your message has been received. We'll get back to you shortly.</p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2 bg-[#D9BF77] text-[#463730] font-typewriter rounded-md hover:bg-[#C8B28E] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit(onSubmit)}
                className="bg-[#F2E8D5] p-6 rounded-md text-[#463730]"
              >
                <h3 className="text-2xl font-bold mb-6 text-[#463730]" style={{ fontFamily: 'Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif', fontWeight: 'bold', letterSpacing: '0.2em' }}>{t('contact.form.title')}</h3>
                
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-2 font-bold">{t('contact.form.name')}</label>
                  <input 
                    type="text" 
                    id="name"
                    {...register('name')}
                    className="w-full px-4 py-2 bg-[#C8B28E] bg-opacity-30 border border-[#8B7355] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D9BF77]"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2 font-bold">{t('contact.form.email')}</label>
                  <input 
                    type="email" 
                    id="email"
                    {...register('email')}
                    className="w-full px-4 py-2 bg-[#C8B28E] bg-opacity-30 border border-[#8B7355] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D9BF77]"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block mb-2 font-bold">{t('contact.form.subject')}</label>
                  <select 
                    id="subject"
                    {...register('subject')}
                    className="w-full px-4 py-2 bg-[#C8B28E] bg-opacity-30 border border-[#8B7355] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D9BF77]"
                  >
                    <option value="">Select a subject</option>
                    <option value="Design">{t('contact.form.subject.design')}</option>
                    <option value="Construction">{t('contact.form.subject.construction')}</option>
                    <option value="Consulting">{t('contact.form.subject.consulting')}</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.subject && (
                    <p className="text-red-600 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2 font-bold">{t('contact.form.message')}</label>
                  <textarea 
                    id="message"
                    {...register('message')}
                    rows={5}
                    className="w-full px-4 py-2 bg-[#C8B28E] bg-opacity-30 border border-[#8B7355] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D9BF77] resize-none font-typewriter"
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>
                
                <button 
                  type="submit"
                  disabled={isPending}
                  className="w-full px-6 py-3 bg-[#D9BF77] text-[#463730] font-typewriter text-lg rounded-md hover:bg-[#8B7355] hover:text-[#F2E8D5] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
{isPending ? t('loading') : t('contact.form.send')}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
