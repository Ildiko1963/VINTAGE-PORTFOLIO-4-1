import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Background from "@/components/Background";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import React, { useEffect, Suspense } from "react";

const AboutPage = React.lazy(() => import('@/pages/About'));
const PortfolioDetail = React.lazy(() => import('@/pages/PortfolioDetail'));

function Router() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Background />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={AboutPage} />
        <Route path="/portfolio/:id" component={PortfolioDetail} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  // Prevent scrollbar on the app for a more cinematic feel
  useEffect(() => {
    // Fix for TypeScript error with msOverflowStyle
    document.body.style.setProperty('scrollbar-width', 'none');
    // Dinamikus háttérkép beállítása
    document.body.style.backgroundImage = "url('/static/clean_filmstrip_hatter.png')";
    document.body.style.backgroundSize = "auto";
    document.body.style.backgroundPosition = "center top";
    document.body.style.backgroundRepeat = "repeat";
    document.body.style.backgroundAttachment = "scroll";
    
    const style = document.createElement("style");
    style.textContent = `
      body::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <LanguageSwitcher />
        <Router />
        <Toaster />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
