import { useState } from "react";
import { herbs, categories, Herb } from "@/data/herbs";
import Icon from "@/components/ui/icon";

const propLabels: Record<string, string> = {
  medicinal: "Лекарственная",
  edible: "Съедобная",
  aromatic: "Ароматическая",
};

const diffColor: Record<string, string> = {
  "Лёгкая": "bg-green-100 text-green-800",
  "Средняя": "bg-yellow-100 text-yellow-800",
  "Сложная": "bg-red-100 text-red-800",
};

function HerbCard({ herb, onClick }: { herb: Herb; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="card-hover text-left bg-card border border-border rounded-2xl overflow-hidden group w-full"
    >
      <div className="bg-herb-pale h-32 flex items-center justify-center text-6xl relative">
        {herb.emoji}
        <span className={`absolute top-3 right-3 text-xs font-body font-medium px-2 py-0.5 rounded-full ${diffColor[herb.difficulty]}`}>
          {herb.difficulty}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl text-herb-dark group-hover:text-herb-mid transition-colors">{herb.name}</h3>
        <p className="font-body text-xs text-muted-foreground italic mb-3">{herb.latin}</p>
        <p className="font-body text-sm text-foreground/70 line-clamp-2 mb-4">{herb.description}</p>
        <div className="flex flex-wrap gap-1">
          {herb.medicinal && <span className="text-xs bg-herb-pale text-herb-mid px-2 py-0.5 rounded-full font-body">💊 Лекарственная</span>}
          {herb.edible && <span className="text-xs bg-herb-cream text-herb-dark px-2 py-0.5 rounded-full font-body">🍃 Съедобная</span>}
          {herb.aromatic && <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full font-body">✨ Ароматическая</span>}
        </div>
      </div>
    </button>
  );
}

function HerbModal({ herb, onClose, onCompare, compareList }: {
  herb: Herb;
  onClose: () => void;
  onCompare: (h: Herb) => void;
  compareList: Herb[];
}) {
  const inCompare = compareList.some(h => h.id === herb.id);
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-card rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-herb-pale p-10 text-center rounded-t-3xl relative">
          <div className="text-7xl mb-3">{herb.emoji}</div>
          <h2 className="font-display text-3xl text-herb-dark">{herb.name}</h2>
          <p className="font-body text-sm text-muted-foreground italic mt-1">{herb.latin} · {herb.family}</p>
          <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <p className="font-body text-foreground/80 leading-relaxed">{herb.description}</p>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "MapPin", label: "Место обитания", val: herb.habitat },
              { icon: "Flower2", label: "Цветение", val: herb.flowering },
              { icon: "Ruler", label: "Высота", val: herb.height },
              { icon: "Tag", label: "Категория", val: herb.category },
            ].map(row => (
              <div key={row.label} className="bg-herb-cream rounded-xl p-4">
                <div className="flex items-center gap-2 text-herb-mid mb-1">
                  <Icon name={row.icon} size={14} />
                  <span className="font-body text-xs text-muted-foreground">{row.label}</span>
                </div>
                <p className="font-body text-sm font-medium">{row.val}</p>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-display text-lg text-herb-dark mb-3">Свойства</h4>
            <div className="flex flex-wrap gap-2">
              {herb.properties.map(p => (
                <span key={p} className="bg-herb-pale text-herb-mid text-sm font-body px-3 py-1 rounded-full">{p}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg text-herb-dark mb-3">Применение</h4>
            <ul className="space-y-1">
              {herb.uses.map(u => (
                <li key={u} className="flex items-center gap-2 font-body text-sm text-foreground/80">
                  <Icon name="Check" size={14} className="text-herb-mid flex-shrink-0" />
                  {u}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-herb-gold/20 rounded-xl p-4 border border-herb-gold/30">
            <div className="flex items-start gap-3">
              <span className="text-xl">💡</span>
              <div>
                <p className="font-body text-xs font-medium text-herb-dark mb-1">Интересный факт</p>
                <p className="font-body text-sm text-foreground/80">{herb.interesting}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onCompare(herb)}
            className={`w-full py-3 rounded-xl font-body font-medium transition-colors ${
              inCompare
                ? "bg-herb-mid text-white"
                : "border border-herb-mid text-herb-mid hover:bg-herb-pale"
            }`}
          >
            {inCompare ? "✓ Добавлено в сравнение" : "Добавить к сравнению"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ComparePanel({ list, onRemove, onClear }: { list: Herb[]; onRemove: (id: string) => void; onClear: () => void }) {
  if (list.length === 0) return null;

  const props: (keyof Herb)[] = ["family", "habitat", "flowering", "height", "medicinal", "edible", "aromatic"];
  const propNames: Record<string, string> = {
    family: "Семейство",
    habitat: "Место обитания",
    flowering: "Цветение",
    height: "Высота",
    medicinal: "Лекарственная",
    edible: "Съедобная",
    aromatic: "Ароматическая",
  };

  return (
    <div className="bg-card border border-border rounded-3xl p-6 mb-8 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-2xl text-herb-dark">Сравнение трав</h3>
        <button onClick={onClear} className="font-body text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
          <Icon name="Trash2" size={14} /> Очистить
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm font-body">
          <thead>
            <tr>
              <td className="py-2 pr-4 text-muted-foreground font-medium">Характеристика</td>
              {list.map(h => (
                <td key={h.id} className="py-2 px-4 text-center min-w-[140px]">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl">{h.emoji}</span>
                    <span className="font-medium text-herb-dark text-xs">{h.name}</span>
                    <button onClick={() => onRemove(h.id)} className="text-muted-foreground hover:text-red-500">
                      <Icon name="X" size={12} />
                    </button>
                  </div>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.map(prop => (
              <tr key={String(prop)} className="border-t border-border">
                <td className="py-3 pr-4 text-muted-foreground">{propNames[String(prop)]}</td>
                {list.map(h => {
                  const val = h[prop];
                  const display = typeof val === "boolean"
                    ? (val ? <span className="text-herb-mid">✓</span> : <span className="text-red-400">✗</span>)
                    : String(val);
                  return (
                    <td key={h.id} className="py-3 px-4 text-center text-foreground/80">{display}</td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function CatalogSection() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [search, setSearch] = useState("");
  const [selectedHerb, setSelectedHerb] = useState<Herb | null>(null);
  const [compareList, setCompareList] = useState<Herb[]>([]);

  const filtered = herbs.filter(h => {
    const matchCat = activeCategory === "Все" || h.category === activeCategory;
    const matchSearch = h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.latin.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  function toggleCompare(herb: Herb) {
    setCompareList(prev =>
      prev.some(h => h.id === herb.id)
        ? prev.filter(h => h.id !== herb.id)
        : prev.length < 4 ? [...prev, herb] : prev
    );
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="hero-gradient py-16 px-6">
        <div className="container mx-auto text-center text-white">
          <h1 className="font-display text-5xl md:text-6xl mb-4">Каталог трав</h1>
          <p className="font-body text-white/75 text-lg mb-8">Подробные описания и характеристики растений</p>
          <div className="relative max-w-md mx-auto">
            <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
            <input
              type="text"
              placeholder="Поиск по названию..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded-full py-3 pl-12 pr-4 font-body focus:outline-none focus:border-herb-gold"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        {/* Category filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-body text-sm px-5 py-2 rounded-full transition-colors ${
                activeCategory === cat
                  ? "bg-herb-mid text-white"
                  : "bg-herb-pale text-herb-dark hover:bg-herb-mid/20"
              }`}
            >
              {cat}
            </button>
          ))}
          {compareList.length > 0 && (
            <span className="ml-auto font-body text-sm text-muted-foreground self-center">
              Сравниваем: {compareList.length}/4
            </span>
          )}
        </div>

        <ComparePanel list={compareList} onRemove={id => setCompareList(p => p.filter(h => h.id !== id))} onClear={() => setCompareList([])} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(herb => (
            <HerbCard key={herb.id} herb={herb} onClick={() => setSelectedHerb(herb)} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="font-body text-muted-foreground">Ничего не найдено по запросу «{search}»</p>
          </div>
        )}
      </div>

      {selectedHerb && (
        <HerbModal
          herb={selectedHerb}
          onClose={() => setSelectedHerb(null)}
          onCompare={toggleCompare}
          compareList={compareList}
        />
      )}
    </div>
  );
}
