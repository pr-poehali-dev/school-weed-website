import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import FarmNavigation from "./components/FarmNavigation";
import FarmHero from "./components/FarmHero";
import FarmDashboard from "./components/FarmDashboard";
import FarmCatalog from "./components/FarmCatalog";
import FarmStaff from "./components/FarmStaff";

export type FarmSection = "home" | "dashboard" | "catalog" | "staff";

const App = () => {
  const [activeSection, setActiveSection] = useState<FarmSection>("home");

  return (
    <TooltipProvider>
      <Toaster />
      <div className="min-h-screen bg-background">
        <FarmNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
        <main>
          {activeSection === "home" && <FarmHero setActiveSection={setActiveSection} />}
          {activeSection === "dashboard" && <FarmDashboard />}
          {activeSection === "catalog" && <FarmCatalog />}
          {activeSection === "staff" && <FarmStaff />}
        </main>
      </div>
    </TooltipProvider>
  );
};

export default App;
