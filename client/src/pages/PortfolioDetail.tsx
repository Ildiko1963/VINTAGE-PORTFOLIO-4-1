import { useQuery } from '@tanstack/react-query';
import { useParams, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { PortfolioItem } from '@/lib/types';

export default function PortfolioDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const { data: portfolioItem, isLoading, error } = useQuery<PortfolioItem>({
    queryKey: [`/api/portfolio/${params.id}`],
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

        <div className="py-8 relative z-20">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image Gallery */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <div className="relative">
                <img
                  src={allImages[selectedImage]}
                  alt={portfolioItem.title}
                  className="w-full h-96 object-cover mx-auto block cursor-pointer filter grayscale sepia-[0.4] brightness-[1.05] contrast-[0.9] transition-all duration-500"
                  onClick={() => setIsFullscreen(true)}
                />
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="absolute top-6 right-6 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                >
                  <ZoomIn size={20} />
                </button>
                
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
                <div className="mt-4">
                  <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 max-h-32 overflow-y-auto">
                    {allImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square overflow-hidden transition-all film-frame ${
                          selectedImage === index 
                            ? 'opacity-100' 
                            : 'opacity-60 hover:opacity-80'
                        }`}
                        style={{ transform: 'scale(0.8)' }}
                      >
                        <img
                          src={image}
                          alt={`Image ${index + 1}`}
                          className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                        />
                      </button>
                    ))}
                  </div>
                  <div className="text-center mt-2 text-sm text-[#C8B28E]">
                    {allImages.length} images available
                  </div>
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
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-full max-h-full">
            <img
              src={allImages[selectedImage]}
              alt={portfolioItem.title}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition-all"
            >
              <X size={24} />
            </button>
            
            {/* Navigation buttons in fullscreen */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : allImages.length - 1)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => setSelectedImage(prev => prev < allImages.length - 1 ? prev + 1 : 0)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition-all"
                >
                  <ChevronRight size={24} />
                </button>
                
                {/* Image counter in fullscreen */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
                  {selectedImage + 1} / {allImages.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}