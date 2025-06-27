import { useQuery } from '@tanstack/react-query';
import { useParams, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { PortfolioItem } from '@/lib/types';
import FilmFrameWrapper from '@/components/FilmFrameWrapper';

export default function PortfolioDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const [selectedImage, setSelectedImage] = useState(0);
  
  const { data: portfolioItem, isLoading, error } = useQuery<PortfolioItem>({
    queryKey: [`/api/portfolio/${params.id}`],
  });

  // Debug logging
  console.log('Portfolio Detail Debug:', { 
    params, 
    portfolioItem, 
    isLoading, 
    error,
    queryKey: `/api/portfolio/${params.id}`
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-transparent text-[#D9BF77] flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading project... (ID: {params.id})</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-transparent text-[#D9BF77] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Error loading project</h2>
          <p className="mb-4">Error: {error.message}</p>
          <button
            onClick={() => setLocation('/')}
            className="px-6 py-2 border border-[#D9BF77] text-[#D9BF77] hover:bg-[#D9BF77] hover:text-[#463730] transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!portfolioItem) {
    return (
      <div className="min-h-screen bg-transparent text-[#D9BF77] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Project not found</h2>
          <p className="mb-4">Looking for ID: {params.id}</p>
          <button
            onClick={() => setLocation('/')}
            className="px-6 py-2 border border-[#D9BF77] text-[#D9BF77] hover:bg-[#D9BF77] hover:text-[#463730] transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const additionalImages = portfolioItem.additionalImages || [];
  const allImages = additionalImages.length > 0 ? [portfolioItem.imageUrl, ...additionalImages] : [portfolioItem.imageUrl];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="min-h-screen bg-transparent text-[#D9BF77] pt-20 pb-16 relative">
      {/* Top shadow strip */}
      <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-black to-transparent opacity-60 z-10"></div>
      {/* Bottom shadow strip */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent opacity-60 z-10"></div>
      
      <div className="container mx-auto px-4 relative z-20">
        {/* Back button */}
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => setLocation('/')}
          className="flex items-center gap-2 mb-8 text-[#D9BF77] hover:text-[#C8B28E] transition-colors z-30 relative"
        >
          <ArrowLeft size={20} />
          Back to Portfolio
        </motion.button>

        <FilmFrameWrapper className="py-8 relative z-20">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image Gallery */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <img
                  src={allImages[selectedImage]}
                  alt={portfolioItem.title}
                  className="w-full h-96 object-cover rounded-lg shadow-2xl"
                />
                
                {allImages.length > 1 && (
                  <>
                    {/* Navigation arrows */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-[#D9BF77] p-2 rounded-full hover:bg-opacity-70 transition-all"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-[#D9BF77] p-2 rounded-full hover:bg-opacity-70 transition-all"
                    >
                      <ChevronRight size={24} />
                    </button>
                    
                    {/* Image counter */}
                    <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-[#D9BF77] px-3 py-1 rounded">
                      {selectedImage + 1} / {allImages.length}
                    </div>
                  </>
                )}
              </div>
              
              {/* Thumbnail navigation */}
              {allImages.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                        selectedImage === index 
                          ? 'border-[#D9BF77] opacity-100' 
                          : 'border-transparent opacity-60 hover:opacity-80'
                      }`}
                    >
                      <img
                        src={image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Project Details */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <div className="text-sm text-[#C8B28E] mb-2 uppercase tracking-wider">
                  {portfolioItem.category}
                </div>
                <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
                  {portfolioItem.title}
                </h1>
                <p className="text-lg leading-relaxed">
                  {portfolioItem.description}
                </p>
              </div>

              {allImages.length > 1 && (
                <div className="bg-[#463730] bg-opacity-30 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Project Gallery</h3>
                  <p className="text-sm">
                    This project features {allImages.length} images showcasing different aspects of the design.
                    Use the navigation arrows or thumbnails to explore all views.
                  </p>
                </div>
              )}

              <div className="pt-4">
                <button
                  onClick={() => setLocation('/')}
                  className="px-8 py-3 bg-[#D9BF77] text-[#463730] font-semibold rounded-md hover:bg-[#C8B28E] transition-colors"
                >
                  View More Projects
                </button>
              </div>
            </motion.div>
          </div>
        </FilmFrameWrapper>
      </div>
    </div>
  );
}