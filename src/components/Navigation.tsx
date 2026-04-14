import { useState } from "react";
import { Section } from "@/App";
import Icon from "@/components/ui/icon";

interface NavigationProps {
  activeSection: Section;
  setActiveSection: (s: Section) => void;
}

const navItems: { id: Section; label: string }[] = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "gallery", label: "Галерея" },
  { id: "quiz", label: "Тесты" },
];

export default function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-herb-pale">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => setActiveSection("home")}
          className="flex items-center gap-2 font-display text-xl font-semibold text-herb-dark"
        >
          <span className="text-2xl">🌿</span>
          <span>Мир трав</span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`nav-link font-body text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? "text-herb-mid active"
                  : "text-foreground/70 hover:text-herb-mid"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-herb-dark"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-b border-herb-pale px-6 pb-4 flex flex-col gap-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setMenuOpen(false); }}
              className={`text-left font-body text-base py-1 transition-colors ${
                activeSection === item.id ? "text-herb-mid font-medium" : "text-foreground/70"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
