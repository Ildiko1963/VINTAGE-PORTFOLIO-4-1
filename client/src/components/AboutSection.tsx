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
                As a passionate filmmaker and visual artist, I blend traditional cinematography techniques with modern digital artistry to create timeless portfolio pieces.
              </p>
              <p className="text-[#D9BF77] text-lg mb-6">
                My work draws inspiration from the golden age of cinema, where storytelling was an art form that captured the imagination and transported viewers to different worlds.
              </p>
              <p className="text-[#D9BF77] text-lg mb-6 font-typewriter">
                "Every frame tells a story, every film reel captures a moment in time."
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
          
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            {[
              {
                icon: "camera-retro",
                title: "Photography",
                description: "Capturing moments with a vintage aesthetic and timeless composition."
              },
              {
                icon: "film",
                title: "Cinematography",
                description: "Creating visual stories with an emphasis on lighting and framing."
              },
              {
                icon: "paint-brush",
                title: "Visual Design",
                description: "Crafting cohesive visual identities that tell powerful stories."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.8 + (index * 0.1) }}
                className="bg-[#C8B28E] bg-opacity-30 p-6 rounded-md border border-[#8B7355]"
              >
                <div className="mb-4 text-[#D9BF77]">
                  <i className={`fas fa-${item.icon} text-3xl`}></i>
                </div>
                <h3 className="font-playfair text-xl font-bold mb-3">{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
