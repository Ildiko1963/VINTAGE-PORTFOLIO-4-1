import React, { useEffect } from 'react';
import { Link } from 'wouter';

export default function About() {
  useEffect(() => {
    // Direkt beállítjuk a háttérképet a sima_hatter.png-re
    document.body.style.backgroundImage = "url('/static/sima_hatter.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    
    return () => {
      // Visszaállítjuk az eredeti hátteret amikor elhagyjuk az oldalt
      document.body.style.backgroundImage = "";
    }
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-12 bg-transparent min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 font-playfair text-[#463730]">Rólunk</h1>
      <div className="prose prose-lg mx-auto">
        <p className="text-[#463730] font-lora">
          Ez egy tesztoldal, ami a háttérkép váltás tesztelésére szolgál. Ezen az oldalon a "sima_hatter.png" képnek kellene megjelennie.
        </p>
        <div className="mt-8 text-center">
          <Link href="/">
            <button className="px-6 py-3 bg-[#D9BF77] text-[#463730] rounded-md font-semibold shadow-lg hover:bg-[#C8B28E] transition-colors">
              Vissza a főoldalra
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}