import React from 'react';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Rólunk</h1>
      <div className="prose prose-lg mx-auto">
        <p>
          Ez egy tesztoldal, ami a háttérkép váltás tesztelésére szolgál. Ezen az oldalon a "sima_hatter.png" képnek kellene megjelennie.
        </p>
      </div>
    </div>
  );
}