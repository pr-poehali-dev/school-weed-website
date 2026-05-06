import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const API_URL = "https://functions.poehali.dev/3edca9be-45bb-4425-80dd-ea21bcc88f24";

interface StatItem {
  key: string;
  value: string;
  label: string;
  unit: string;
}

const statMeta: Record<string, { icon: string; color: string; change: string; placeholder: string }> = {
  hectares: { icon: "Map", color: "text-amber-600 bg-amber-50", change: "+5% к прошлому году", placeholder: "1240" },
  employees: { icon: "Users", color: "text-blue-600 bg-blue-50", change: "+2 к прошлому году", placeholder: "48" },
  harvest: { icon: "Package", color: "text-green-600 bg-green-50", change: "+12% к прошлому году", placeholder: "860" },
  machines: { icon: "Tractor", color: "text-farm-brown bg-orange-50", change: "единиц техники", placeholder: "7" },
};

const tasks = [
  { title: "Опрыскивание поля №3", assignee: "Иванов А.", due: "Сегодня", priority: "high", done: false },
  { title: "ТО трактора Беларус 82", assignee: "Петров Д.", due: "Завтра", priority: "medium", done: false },
  { title: "Инвентаризация склада", assignee: "Сидорова Н.", due: "15 мая", priority: "low", done: false },
  { title: "Сортировка семян кукурузы", assignee: "Козлов В.", due: "12 мая", priority: "medium", done: true },
  { title: "Ремонт ирригации поля №1", assignee: "Михайлов С.", due: "11 мая", priority: "high", done: true },
];

const crops = [
  { name: "Пшеница озимая", area: 480, progress: 75, stage: "Колошение", icon: "🌾" },
  { name: "Подсолнечник", area: 320, progress: 45, stage: "Рост", icon: "🌻" },
  { name: "Кукуруза", area: 250, progress: 30, stage: "Всходы", icon: "🌽" },
  { name: "Ячмень", area: 190, progress: 85, stage: "Восковая спелость", icon: "🌿" },
];

const weather = [
  { day: "Сегодня", icon: "☀️", temp: "+18°", desc: "Ясно" },
  { day: "Завтра", icon: "⛅", temp: "+15°", desc: "Облачно" },
  { day: "Среда", icon: "🌧️", temp: "+12°", desc: "Дождь" },
  { day: "Четверг", icon: "🌤️", temp: "+17°", desc: "Переменно" },
  { day: "Пятница", icon: "☀️", temp: "+20°", desc: "Ясно" },
];

const priorityStyles: Record<string, string> = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-green-100 text-green-700",
};
const priorityLabels: Record<string, string> = { high: "Срочно", medium: "Средний", low: "Низкий" };

export default function FarmDashboard() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    setLoading(true);
    const res = await fetch(API_URL);
    const data = await res.json();
    setStats(data.stats);
    const vals: Record<string, string> = {};
    data.stats.forEach((s: StatItem) => { vals[s.key] = s.value; });
    setEditValues(vals);
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);
    const updates = Object.entries(editValues).map(([key, value]) => ({ key, value }));
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updates }),
    });
    await fetchStats();
    setSaving(false);
    setEditOpen(false);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  }

  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="farm-gradient py-10 px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-body text-farm-wheat text-sm font-medium mb-1">6 мая 2026 · Вторник</p>
              <h1 className="font-display text-3xl font-bold text-white">Дашборд хозяйства</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-2">
                <Icon name="MapPin" size={14} className="text-farm-wheat" />
                <span className="font-body text-sm text-white">ООО «Агро-Юг», Краснодарский край</span>
              </div>
              <button
                onClick={() => setEditOpen(true)}
                className="flex items-center gap-2 bg-farm-wheat text-farm-earth font-body font-bold px-4 py-2 rounded-xl hover:bg-yellow-300 transition-colors text-sm"
              >
                <Icon name="Pencil" size={15} />
                Изменить показатели
              </button>
            </div>
          </div>
        </div>
      </div>

      {savedMsg && (
        <div className="fixed top-20 right-6 z-50 bg-green-600 text-white font-body text-sm font-semibold px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fade-up">
          <Icon name="CheckCircle" size={16} />
          Показатели сохранены!
        </div>
      )}

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-5 animate-pulse">
                  <div className="w-10 h-10 bg-muted rounded-xl mb-4" />
                  <div className="h-7 bg-muted rounded mb-2 w-20" />
                  <div className="h-3 bg-muted rounded w-full" />
                </div>
              ))
            : stats.map((s) => {
                const meta = statMeta[s.key];
                return (
                  <div key={s.key} className="bg-card border border-border rounded-2xl p-5">
                    <div className={`w-10 h-10 ${meta?.color} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon name={meta?.icon ?? "BarChart2"} size={20} />
                    </div>
                    <div className="font-display text-2xl font-bold text-foreground mb-1">
                      {s.value} <span className="text-base font-normal text-muted-foreground">{s.unit}</span>
                    </div>
                    <div className="font-body text-xs text-muted-foreground mb-1">{s.label}</div>
                    <div className="font-body text-xs font-semibold text-farm-green">{meta?.change}</div>
                  </div>
                );
              })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Crops progress */}
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-farm-earth">Текущие посевы</h2>
              <span className="font-body text-xs text-muted-foreground">Сезон 2026</span>
            </div>
            <div className="space-y-5">
              {crops.map((c) => (
                <div key={c.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{c.icon}</span>
                      <div>
                        <p className="font-body text-sm font-semibold text-foreground">{c.name}</p>
                        <p className="font-body text-xs text-muted-foreground">{c.stage} · {c.area} га</p>
                      </div>
                    </div>
                    <span className="font-body text-sm font-bold text-farm-brown">{c.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-gradient-to-r from-farm-brown to-farm-amber rounded-full transition-all duration-700"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weather */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-display text-xl font-bold text-farm-earth mb-6">Погода</h2>
            <div className="space-y-3">
              {weather.map((w, i) => (
                <div key={w.day} className={`flex items-center justify-between p-3 rounded-xl ${i === 0 ? "bg-farm-cream" : ""}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{w.icon}</span>
                    <div>
                      <p className="font-body text-sm font-semibold">{w.day}</p>
                      <p className="font-body text-xs text-muted-foreground">{w.desc}</p>
                    </div>
                  </div>
                  <span className="font-display text-lg font-bold text-farm-earth">{w.temp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold text-farm-earth">Задачи</h2>
            <span className="font-body text-xs text-muted-foreground">
              {tasks.filter(t => !t.done).length} активных
            </span>
          </div>
          <div className="space-y-3">
            {tasks.map((task, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                  task.done ? "bg-muted/50 border-border opacity-60" : "bg-background border-border hover:border-farm-amber"
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                  task.done ? "bg-farm-green border-farm-green" : "border-muted-foreground"
                }`}>
                  {task.done && <Icon name="Check" size={10} className="text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-body text-sm font-medium ${task.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                    {task.title}
                  </p>
                  <p className="font-body text-xs text-muted-foreground">{task.assignee} · {task.due}</p>
                </div>
                {!task.done && (
                  <span className={`font-body text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${priorityStyles[task.priority]}`}>
                    {priorityLabels[task.priority]}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit modal */}
      {editOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setEditOpen(false)}>
          <div className="bg-card rounded-3xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="farm-gradient p-6 rounded-t-3xl flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-white">Общие показатели</h2>
                <p className="font-body text-sm text-white/60 mt-0.5">Обновите цифры по хозяйству</p>
              </div>
              <button onClick={() => setEditOpen(false)} className="text-white/60 hover:text-white">
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {stats.map((s) => (
                <div key={s.key}>
                  <label className="font-body text-sm font-semibold text-foreground mb-1.5 block">
                    {s.label} {s.unit && <span className="font-normal text-muted-foreground">({s.unit})</span>}
                  </label>
                  <input
                    type="text"
                    value={editValues[s.key] ?? s.value}
                    onChange={e => setEditValues(prev => ({ ...prev, [s.key]: e.target.value }))}
                    className="w-full border border-border rounded-xl px-4 py-2.5 font-body text-sm focus:outline-none bg-background focus:border-farm-brown"
                    placeholder={statMeta[s.key]?.placeholder}
                  />
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setEditOpen(false)}
                  className="flex-1 py-3 rounded-xl font-body font-semibold text-sm border border-border hover:bg-muted transition-colors"
                >
                  Отмена
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 py-3 rounded-xl font-body font-bold text-sm bg-farm-brown text-white hover:bg-farm-earth transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {saving ? <Icon name="Loader2" size={16} className="animate-spin" /> : <Icon name="Save" size={16} />}
                  {saving ? "Сохранение..." : "Сохранить"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
