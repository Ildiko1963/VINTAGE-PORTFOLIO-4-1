import React, { useEffect } from 'react';
import { Link } from 'wouter';

export default function About() {
  
  return (
    <div className="container mx-auto px-4 py-12 bg-transparent min-h-screen relative">
      {/* Top shadow strip */}
      <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-black to-transparent opacity-60 z-20"></div>
      {/* Bottom shadow strip */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent opacity-60 z-20"></div>
      <h1 className="text-4xl font-bold text-center mb-8 font-playfair text-[#D9BF77]">Rólunk</h1>
      <div className="prose prose-lg mx-auto">
        <p className="text-[#D9BF77] font-lora">
          Ez egy tesztoldal az Ildikostyle Portfolio-hoz. Most már minden oldal ugyanazt a tiszta filmszalag háttérképet használja a forgó árnyék effektussal.
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