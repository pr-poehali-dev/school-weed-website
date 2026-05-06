import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Crop {
  id: string;
  name: string;
  latin: string;
  category: string;
  emoji: string;
  season: string;
  harvestPeriod: string;
  yieldPerHa: string;
  soilType: string;
  waterNeed: "Низкая" | "Средняя" | "Высокая";
  difficulty: "Лёгкая" | "Средняя" | "Сложная";
  description: string;
  benefits: string[];
  pests: string[];
  profit: "Высокая" | "Средняя" | "Низкая";
}

const crops: Crop[] = [
  {
    id: "wheat",
    name: "Пшеница озимая",
    latin: "Triticum aestivum",
    category: "Зерновые",
    emoji: "🌾",
    season: "Осень — лето",
    harvestPeriod: "Июль — август",
    yieldPerHa: "4–7 т/га",
    soilType: "Чернозём, суглинок",
    waterNeed: "Средняя",
    difficulty: "Средняя",
    description: "Основная зерновая культура России. Высевается осенью, зимует под снегом и формирует урожай к середине лета. Универсальная культура для хлебопечения.",
    benefits: ["Высокий спрос", "Долгое хранение", "Механизированная уборка"],
    pests: ["Ржавчина", "Септориоз", "Злаковые тли"],
    profit: "Высокая",
  },
  {
    id: "sunflower",
    name: "Подсолнечник",
    latin: "Helianthus annuus",
    category: "Масличные",
    emoji: "🌻",
    season: "Весна — осень",
    harvestPeriod: "Сентябрь — октябрь",
    yieldPerHa: "2–3.5 т/га",
    soilType: "Чернозём, каштановые",
    waterNeed: "Низкая",
    difficulty: "Лёгкая",
    description: "Главная масличная культура Юга России. Неприхотлив к условиям выращивания, хорошо переносит засуху. Семена содержат до 50% масла.",
    benefits: ["Засухоустойчив", "Высокая маржинальность", "Улучшает структуру почвы"],
    pests: ["Заразиха", "Белая гниль", "Подсолнечниковая огнёвка"],
    profit: "Высокая",
  },
  {
    id: "corn",
    name: "Кукуруза",
    latin: "Zea mays",
    category: "Зерновые",
    emoji: "🌽",
    season: "Весна — осень",
    harvestPeriod: "Август — октябрь",
    yieldPerHa: "6–12 т/га",
    soilType: "Чернозём, суглинок",
    waterNeed: "Высокая",
    difficulty: "Средняя",
    description: "Высокоурожайная культура с широкими возможностями использования: зерно, силос, биоэтанол. Требовательна к теплу и влаге.",
    benefits: ["Максимальная урожайность", "Универсальное использование", "Кормовая база"],
    pests: ["Кукурузный мотылёк", "Диплодиоз", "Пузырчатая головня"],
    profit: "Высокая",
  },
  {
    id: "barley",
    name: "Ячмень яровой",
    latin: "Hordeum vulgare",
    category: "Зерновые",
    emoji: "🌿",
    season: "Весна — лето",
    harvestPeriod: "Июль — август",
    yieldPerHa: "3–5 т/га",
    soilType: "Суглинок, супесь",
    waterNeed: "Низкая",
    difficulty: "Лёгкая",
    description: "Скороспелая зерновая культура. Широко используется в пивоварении и животноводстве. Хорошо адаптируется к различным почвенно-климатическим условиям.",
    benefits: ["Скороспелость", "Пивоваренное применение", "Кормовая база"],
    pests: ["Мучнистая роса", "Сетчатая пятнистость", "Злаковые мухи"],
    profit: "Средняя",
  },
  {
    id: "soybean",
    name: "Соя",
    latin: "Glycine max",
    category: "Бобовые",
    emoji: "🫘",
    season: "Весна — осень",
    harvestPeriod: "Сентябрь — октябрь",
    yieldPerHa: "2–3.5 т/га",
    soilType: "Чернозём, суглинок",
    waterNeed: "Средняя",
    difficulty: "Средняя",
    description: "Ценная белково-масличная культура. Обогащает почву азотом благодаря симбиозу с клубеньковыми бактериями. Спрос на рынке стабильно растёт.",
    benefits: ["Азотфиксатор", "Высокобелковый продукт", "Растущий рынок"],
    pests: ["Акациевая огнёвка", "Ложная мучнистая роса", "Соевая нематода"],
    profit: "Высокая",
  },
  {
    id: "sugar-beet",
    name: "Сахарная свёкла",
    latin: "Beta vulgaris",
    category: "Технические",
    emoji: "🫚",
    season: "Весна — осень",
    harvestPeriod: "Сентябрь — ноябрь",
    yieldPerHa: "30–60 т/га",
    soilType: "Чернозём глубокий",
    waterNeed: "Высокая",
    difficulty: "Сложная",
    description: "Основная сахароносная культура России. Требует точного соблюдения агротехники и специализированной техники. Высокая сахаристость обеспечивает стабильный сбыт.",
    benefits: ["Контрактное производство", "Высокий валовый сбор", "Жом — ценный корм"],
    pests: ["Свекловичная нематода", "Церкоспороз", "Свекловичная блошка"],
    profit: "Средняя",
  },
];

const categories = ["Все", "Зерновые", "Масличные", "Бобовые", "Технические"];

const profitColor: Record<string, string> = {
  Высокая: "bg-green-100 text-green-800",
  Средняя: "bg-amber-100 text-amber-800",
  Низкая: "bg-red-100 text-red-800",
};
const waterColor: Record<string, string> = {
  Низкая: "bg-blue-50 text-blue-700",
  Средняя: "bg-blue-100 text-blue-800",
  Высокая: "bg-blue-200 text-blue-900",
};

function CropModal({ crop, onClose }: { crop: Crop; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="farm-gradient p-8 rounded-t-3xl relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white">
            <Icon name="X" size={20} />
          </button>
          <div className="text-6xl mb-3">{crop.emoji}</div>
          <h2 className="font-display text-2xl font-bold text-white">{crop.name}</h2>
          <p className="font-body text-sm text-white/60 italic mt-1">{crop.latin} · {crop.category}</p>
        </div>

        <div className="p-8 space-y-6">
          <p className="font-body text-sm text-foreground/80 leading-relaxed">{crop.description}</p>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Сезон", value: crop.season, icon: "Calendar" },
              { label: "Уборка", value: crop.harvestPeriod, icon: "Scissors" },
              { label: "Урожайность", value: crop.yieldPerHa, icon: "TrendingUp" },
              { label: "Почва", value: crop.soilType, icon: "Mountain" },
            ].map(r => (
              <div key={r.label} className="bg-farm-cream rounded-xl p-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon name={r.icon} size={13} className="text-farm-brown" />
                  <span className="font-body text-xs text-muted-foreground">{r.label}</span>
                </div>
                <p className="font-body text-sm font-semibold">{r.value}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap">
            <span className={`font-body text-xs font-semibold px-3 py-1.5 rounded-full ${profitColor[crop.profit]}`}>
              💰 Доходность: {crop.profit}
            </span>
            <span className={`font-body text-xs font-semibold px-3 py-1.5 rounded-full ${waterColor[crop.waterNeed]}`}>
              💧 Потребность в воде: {crop.waterNeed}
            </span>
          </div>

          <div>
            <h4 className="font-display text-base font-bold text-farm-earth mb-3">Преимущества</h4>
            <ul className="space-y-1.5">
              {crop.benefits.map(b => (
                <li key={b} className="flex items-center gap-2 font-body text-sm">
                  <Icon name="Check" size={13} className="text-farm-green flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base font-bold text-farm-earth mb-3">Основные болезни и вредители</h4>
            <div className="flex flex-wrap gap-2">
              {crop.pests.map(p => (
                <span key={p} className="font-body text-xs bg-red-50 text-red-700 px-3 py-1 rounded-full">⚠️ {p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FarmCatalog() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Crop | null>(null);

  const filtered = crops.filter(c => {
    const matchCat = activeCategory === "Все" || c.category === activeCategory;
    const matchQ = c.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="pt-16 min-h-screen">
      <div className="farm-gradient py-14 px-6">
        <div className="container mx-auto text-center text-white">
          <h1 className="font-display text-5xl font-bold mb-4">Каталог культур</h1>
          <p className="font-body text-white/70 text-lg mb-8">Все культуры вашего хозяйства с агрономическими данными</p>
          <div className="relative max-w-md mx-auto">
            <Icon name="Search" size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
            <input
              type="text"
              placeholder="Поиск по культуре..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded-xl py-3 pl-11 pr-4 font-body focus:outline-none focus:border-farm-wheat"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-body text-sm px-5 py-2 rounded-xl transition-colors ${
                activeCategory === cat ? "bg-farm-brown text-white" : "bg-muted text-foreground hover:bg-farm-brown/15"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto font-body text-sm text-muted-foreground self-center">{filtered.length} культур</span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(crop => (
            <button
              key={crop.id}
              onClick={() => setSelected(crop)}
              className="card-hover text-left bg-card border border-border rounded-2xl overflow-hidden group"
            >
              <div className="bg-farm-cream h-28 flex items-center justify-center text-5xl relative">
                {crop.emoji}
                <span className={`absolute top-3 right-3 font-body text-xs font-semibold px-2 py-0.5 rounded-full ${profitColor[crop.profit]}`}>
                  {crop.profit} доход
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-display font-bold text-lg text-farm-earth group-hover:text-farm-brown transition-colors">{crop.name}</h3>
                </div>
                <p className="font-body text-xs text-muted-foreground italic mb-3">{crop.latin}</p>
                <p className="font-body text-sm text-foreground/70 line-clamp-2 mb-4">{crop.description}</p>
                <div className="flex items-center justify-between text-xs font-body">
                  <span className="text-muted-foreground">📅 {crop.harvestPeriod}</span>
                  <span className="font-semibold text-farm-brown">📦 {crop.yieldPerHa}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && <CropModal crop={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
