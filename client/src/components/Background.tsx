import React from 'react';
import { useLocation } from 'wouter';

/**
 * Dynamic background component that shows different backgrounds 
 * based on the current route
 */
export default function Background() {
  const [location] = useLocation();
  const isHomePage = location === '/';
  
  return (
    <>
      {/* Film strip background for home page */}
      {isHomePage && (
        <div className="fixed inset-0 z-[-1] bg-background">
          <img 
            src="/static/filmszalag_hatter.png" 
            alt="Filmszalag háttér" 
            className="absolute inset-0 w-full h-full object-cover z-[-2]"
          />
          <div className="film-overlay absolute inset-0 z-[-1]"></div>
          <div className="perforations-left"></div>
          <div className="perforations-right"></div>
        </div>
      )}
      
      {/* Simple background for other pages */}
      {!isHomePage && (
        <div className="fixed inset-0 z-[-1] bg-background">
          <img 
            src="/static/sima_hatter.png" 
            alt="Sima háttér" 
            className="absolute inset-0 w-full h-full object-cover z-[-2]"
          />
          <div className="simple-bg-overlay absolute inset-0 z-[-1]"></div>
        </div>
      )}
    </>
  );
}