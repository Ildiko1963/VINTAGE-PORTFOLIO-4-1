import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Background from "@/components/Background";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Prevent scrollbar on the app for a more cinematic feel
  useEffect(() => {
    // Fix for TypeScript error with msOverflowStyle
    document.body.style.setProperty('scrollbar-width', 'none');
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
      <Background />
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
