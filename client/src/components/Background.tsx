import React from 'react';
import { useLocation } from 'wouter';

/**
 * Dynamic background component that shows different backgrounds 
 * based on the current route
 */
export default function Background() {
  const [location] = useLocation();
  
  return (
    <div className="fixed inset-0 z-[-1] bg-background">
      <img 
        src="/static/clean_filmstrip_hatter.png" 
        alt="Tiszta filmszalag háttér" 
        className="absolute inset-0 w-full h-full object-cover z-[-2]"
      />
      <div className="film-overlay absolute inset-0 z-[-1]"></div>
      <div className="perforations-left"></div>
      <div className="perforations-right"></div>
      {/* Rotating shadow effect */}
      <div className="rotating-shadow absolute inset-0 z-[-1]"></div>
    </div>
  );
}