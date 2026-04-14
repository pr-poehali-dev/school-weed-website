import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import CatalogSection from "./components/CatalogSection";
import GallerySection from "./components/GallerySection";
import QuizSection from "./components/QuizSection";

export type Section = "home" | "catalog" | "gallery" | "quiz";

const App = () => {
  const [activeSection, setActiveSection] = useState<Section>("home");

  return (
    <TooltipProvider>
      <Toaster />
      <div className="min-h-screen bg-background">
        <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
        <main>
          {activeSection === "home" && <HeroSection setActiveSection={setActiveSection} />}
          {activeSection === "catalog" && <CatalogSection />}
          {activeSection === "gallery" && <GallerySection />}
          {activeSection === "quiz" && <QuizSection />}
        </main>
      </div>
    </TooltipProvider>
  );
};

export default App;
