import { useEffect } from 'react';

export default function Background() {
  useEffect(() => {
    // Add background styles to body
    const style = document.createElement('style');
    style.textContent = `
      body {
        background-image: url('/filmszalag_hatter.png');
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        background-repeat: no-repeat;
        min-height: 100vh;
      }
      
      body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(42, 26, 22, 0.7);
        z-index: -1;
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
}
