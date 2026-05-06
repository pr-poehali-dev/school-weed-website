import { useState } from "react";
import { FarmSection } from "@/App";
import Icon from "@/components/ui/icon";

interface Props {
  activeSection: FarmSection;
  setActiveSection: (s: FarmSection) => void;
}

const navItems: { id: FarmSection; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "dashboard", label: "Дашборд", icon: "LayoutDashboard" },
  { id: "catalog", label: "Культуры", icon: "Sprout" },
  { id: "staff", label: "Сотрудники", icon: "Users" },
];

export default function FarmNavigation({ activeSection, setActiveSection }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => setActiveSection("home")}
          className="flex items-center gap-2.5"
        >
          <div className="w-8 h-8 bg-farm-brown rounded-lg flex items-center justify-center">
            <span className="text-white text-base">🌾</span>
          </div>
          <span className="font-display text-lg font-bold text-farm-earth">АгроПлатформа</span>
        </button>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`nav-link flex items-center gap-1.5 font-body text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? "text-farm-brown active"
                  : "text-foreground/60 hover:text-farm-brown"
              }`}
            >
              <Icon name={item.icon} size={15} />
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setActiveSection("staff")}
          className="hidden md:flex bg-farm-brown text-white font-body text-sm font-semibold px-4 py-2 rounded-lg hover:bg-farm-earth transition-colors items-center gap-2"
        >
          <Icon name="UserPlus" size={15} />
          Добавить сотрудника
        </button>

        <button className="md:hidden text-farm-earth" onClick={() => setOpen(!open)}>
          <Icon name={open ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-b border-border px-6 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setOpen(false); }}
              className={`w-full text-left flex items-center gap-2 py-2.5 font-body text-sm transition-colors ${
                activeSection === item.id ? "text-farm-brown font-semibold" : "text-foreground/70"
              }`}
            >
              <Icon name={item.icon} size={16} />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
