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

    </div>
  );
}