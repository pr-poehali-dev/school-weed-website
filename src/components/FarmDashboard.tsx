import Icon from "@/components/ui/icon";

const stats = [
  { label: "Гектаров под посевом", value: "1 240", change: "+5%", icon: "Map", color: "text-amber-600 bg-amber-50" },
  { label: "Активных сотрудников", value: "48", change: "+2", icon: "Users", color: "text-blue-600 bg-blue-50" },
  { label: "Урожай этого сезона, т", value: "860", change: "+12%", icon: "Package", color: "text-green-600 bg-green-50" },
  { label: "Техника в работе", value: "7", change: "из 10", icon: "Tractor", color: "text-farm-brown bg-orange-50" },
];

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
  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="farm-gradient py-10 px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-body text-farm-wheat text-sm font-medium mb-1">6 мая 2026 · Вторник</p>
              <h1 className="font-display text-3xl font-bold text-white">Дашборд хозяйства</h1>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-2">
              <Icon name="MapPin" size={14} className="text-farm-wheat" />
              <span className="font-body text-sm text-white">ООО «Агро-Юг», Краснодарский край</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-5">
              <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center mb-4`}>
                <Icon name={s.icon} size={20} />
              </div>
              <div className="font-display text-2xl font-bold text-foreground mb-1">{s.value}</div>
              <div className="font-body text-xs text-muted-foreground mb-1">{s.label}</div>
              <div className="font-body text-xs font-semibold text-farm-green">{s.change} к прошлому году</div>
            </div>
          ))}
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
            <div className="flex items-center gap-2">
              <span className="font-body text-xs text-muted-foreground">
                {tasks.filter(t => !t.done).length} активных
              </span>
            </div>
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
    </div>
  );
}
