import React from 'react';
import { useLocation } from 'wouter';

/**
 * Dynamic background component that shows different backgrounds 
 * based on the current route
 */
export default function Background() {
  const [location] = useLocation();
  
  return (
    <div 
      className="absolute top-0 left-0 w-full h-full z-[-1]"
      style={{
        minHeight: '200vh',
        backgroundImage: "url('/static/clean_filmstrip_hatter.png')",
        backgroundSize: 'auto',
        backgroundPosition: 'center top',
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'scroll'
      }}
    >
      {/* Film overlay for texture */}
      <div className="film-overlay absolute inset-0 z-[-1]"></div>
      
      {/* Film perforations */}
      <div className="perforations-left"></div>
      <div className="perforations-right"></div>
    </div>
  );
}