import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const STATS_URL = "https://functions.poehali.dev/3edca9be-45bb-4425-80dd-ea21bcc88f24";
const TASKS_URL = "https://functions.poehali.dev/08c4aa1f-ceea-4a1e-b7de-6e95337f3082";

interface StatItem {
  key: string;
  value: string;
  label: string;
  unit: string;
}

interface Task {
  id: number;
  title: string;
  assignee: string;
  due: string;
  priority: string;
  done: boolean;
}

const statMeta: Record<string, { icon: string; color: string; change: string; placeholder: string }> = {
  hectares: { icon: "Map", color: "text-amber-600 bg-amber-50", change: "+5% к прошлому году", placeholder: "1240" },
  employees: { icon: "Users", color: "text-blue-600 bg-blue-50", change: "+2 к прошлому году", placeholder: "48" },
  harvest: { icon: "Package", color: "text-green-600 bg-green-50", change: "+12% к прошлому году", placeholder: "860" },
  machines: { icon: "Tractor", color: "text-farm-brown bg-orange-50", change: "единиц техники", placeholder: "7" },
};

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

const emptyTask = { title: "", assignee: "", due: "", priority: "medium" };

export default function FarmDashboard() {
  // Stats state
  const [stats, setStats] = useState<StatItem[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [editStatsOpen, setEditStatsOpen] = useState(false);
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [statsSaving, setStatsSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

  // Tasks state
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [taskForm, setTaskForm] = useState(emptyTask);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [taskSaving, setTaskSaving] = useState(false);

  useEffect(() => {
    fetchStats();
    fetchTasks();
  }, []);

  async function fetchStats() {
    setStatsLoading(true);
    const res = await fetch(STATS_URL);
    const data = await res.json();
    setStats(data.stats);
    const vals: Record<string, string> = {};
    data.stats.forEach((s: StatItem) => { vals[s.key] = s.value; });
    setEditValues(vals);
    setStatsLoading(false);
  }

  async function fetchTasks() {
    setTasksLoading(true);
    const res = await fetch(TASKS_URL);
    const data = await res.json();
    setTasks(data.tasks);
    setTasksLoading(false);
  }

  async function handleSaveStats() {
    setStatsSaving(true);
    const updates = Object.entries(editValues).map(([key, value]) => ({ key, value }));
    await fetch(STATS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updates }),
    });
    await fetchStats();
    setStatsSaving(false);
    setEditStatsOpen(false);
    showSaved("Показатели сохранены!");
  }

  async function handleToggleDone(task: Task) {
    await fetch(TASKS_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, done: !task.done }),
    });
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, done: !t.done } : t));
  }

  async function handleDeleteTask(id: number) {
    await fetch(`${TASKS_URL}?id=${id}`, { method: "DELETE" });
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  async function handleSaveTask() {
    setTaskSaving(true);
    if (editTask) {
      await fetch(TASKS_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...editTask, ...taskForm }),
      });
      showSaved("Задача обновлена!");
    } else {
      await fetch(TASKS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskForm),
      });
      showSaved("Задача добавлена!");
    }
    await fetchTasks();
    setTaskSaving(false);
    setAddOpen(false);
    setEditTask(null);
    setTaskForm(emptyTask);
  }

  function openEdit(task: Task) {
    setEditTask(task);
    setTaskForm({ title: task.title, assignee: task.assignee, due: task.due, priority: task.priority });
    setAddOpen(true);
  }

  function openAdd() {
    setEditTask(null);
    setTaskForm(emptyTask);
    setAddOpen(true);
  }

  function showSaved(msg: string) {
    setSavedMsg(msg);
    setTimeout(() => setSavedMsg(""), 2500);
  }

  return (
    <div className="pt-16 min-h-screen bg-background">
      {/* Header */}
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
                onClick={() => setEditStatsOpen(true)}
                className="flex items-center gap-2 bg-farm-wheat text-farm-earth font-body font-bold px-4 py-2 rounded-xl hover:bg-yellow-300 transition-colors text-sm"
              >
                <Icon name="Pencil" size={15} />
                <span className="hidden sm:inline">Изменить показатели</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {savedMsg && (
        <div className="fixed top-20 right-6 z-50 bg-green-600 text-white font-body text-sm font-semibold px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <Icon name="CheckCircle" size={16} />
          {savedMsg}
        </div>
      )}

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsLoading
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

        {/* Crops + Weather */}
        <div className="grid lg:grid-cols-3 gap-6">
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
            <div>
              <h2 className="font-display text-xl font-bold text-farm-earth">Задачи</h2>
              {!tasksLoading && (
                <p className="font-body text-xs text-muted-foreground mt-0.5">
                  {tasks.filter(t => !t.done).length} активных · {tasks.filter(t => t.done).length} выполнено
                </p>
              )}
            </div>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 bg-farm-brown text-white font-body font-bold px-4 py-2 rounded-xl hover:bg-farm-earth transition-colors text-sm"
            >
              <Icon name="Plus" size={16} />
              Добавить
            </button>
          </div>

          {tasksLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-16 bg-muted rounded-xl animate-pulse" />
              ))}
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <Icon name="ClipboardList" size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-body text-sm">Задач пока нет. Добавьте первую!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-colors group ${
                    task.done ? "bg-muted/40 border-border opacity-60" : "bg-background border-border hover:border-farm-amber"
                  }`}
                >
                  <button
                    onClick={() => handleToggleDone(task)}
                    className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                      task.done ? "bg-farm-green border-farm-green" : "border-muted-foreground hover:border-farm-green"
                    }`}
                  >
                    {task.done && <Icon name="Check" size={10} className="text-white" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`font-body text-sm font-medium ${task.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {task.title}
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      {task.assignee && <span>{task.assignee}</span>}
                      {task.assignee && task.due && <span> · </span>}
                      {task.due && <span>{task.due}</span>}
                    </p>
                  </div>
                  {!task.done && (
                    <span className={`font-body text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${priorityStyles[task.priority]}`}>
                      {priorityLabels[task.priority]}
                    </span>
                  )}
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEdit(task)}
                      className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Icon name="Pencil" size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors"
                    >
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stats edit modal */}
      {editStatsOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setEditStatsOpen(false)}>
          <div className="bg-card rounded-3xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="farm-gradient p-6 rounded-t-3xl flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-white">Общие показатели</h2>
                <p className="font-body text-sm text-white/60 mt-0.5">Обновите цифры по хозяйству</p>
              </div>
              <button onClick={() => setEditStatsOpen(false)} className="text-white/60 hover:text-white">
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
                  />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button onClick={() => setEditStatsOpen(false)} className="flex-1 py-3 rounded-xl font-body font-semibold text-sm border border-border hover:bg-muted transition-colors">
                  Отмена
                </button>
                <button
                  onClick={handleSaveStats}
                  disabled={statsSaving}
                  className="flex-1 py-3 rounded-xl font-body font-bold text-sm bg-farm-brown text-white hover:bg-farm-earth transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {statsSaving ? <Icon name="Loader2" size={16} className="animate-spin" /> : <Icon name="Save" size={16} />}
                  {statsSaving ? "Сохранение..." : "Сохранить"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Task add/edit modal */}
      {addOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => { setAddOpen(false); setEditTask(null); }}>
          <div className="bg-card rounded-3xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="farm-gradient p-6 rounded-t-3xl flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-white">
                  {editTask ? "Редактировать задачу" : "Новая задача"}
                </h2>
                <p className="font-body text-sm text-white/60 mt-0.5">Заполните поля ниже</p>
              </div>
              <button onClick={() => { setAddOpen(false); setEditTask(null); }} className="text-white/60 hover:text-white">
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="font-body text-sm font-semibold text-foreground mb-1.5 block">Название задачи *</label>
                <input
                  type="text"
                  value={taskForm.title}
                  onChange={e => setTaskForm(p => ({ ...p, title: e.target.value }))}
                  placeholder="Например: Полив поля №2"
                  className="w-full border border-border rounded-xl px-4 py-2.5 font-body text-sm focus:outline-none bg-background focus:border-farm-brown"
                />
              </div>
              <div>
                <label className="font-body text-sm font-semibold text-foreground mb-1.5 block">Ответственный</label>
                <input
                  type="text"
                  value={taskForm.assignee}
                  onChange={e => setTaskForm(p => ({ ...p, assignee: e.target.value }))}
                  placeholder="Иванов А."
                  className="w-full border border-border rounded-xl px-4 py-2.5 font-body text-sm focus:outline-none bg-background focus:border-farm-brown"
                />
              </div>
              <div>
                <label className="font-body text-sm font-semibold text-foreground mb-1.5 block">Срок</label>
                <input
                  type="text"
                  value={taskForm.due}
                  onChange={e => setTaskForm(p => ({ ...p, due: e.target.value }))}
                  placeholder="Сегодня / 15 мая"
                  className="w-full border border-border rounded-xl px-4 py-2.5 font-body text-sm focus:outline-none bg-background focus:border-farm-brown"
                />
              </div>
              <div>
                <label className="font-body text-sm font-semibold text-foreground mb-1.5 block">Приоритет</label>
                <div className="flex gap-2">
                  {(["high", "medium", "low"] as const).map(p => (
                    <button
                      key={p}
                      onClick={() => setTaskForm(prev => ({ ...prev, priority: p }))}
                      className={`flex-1 py-2 rounded-xl font-body text-sm font-semibold border transition-colors ${
                        taskForm.priority === p
                          ? priorityStyles[p] + " border-transparent"
                          : "border-border text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {priorityLabels[p]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => { setAddOpen(false); setEditTask(null); }} className="flex-1 py-3 rounded-xl font-body font-semibold text-sm border border-border hover:bg-muted transition-colors">
                  Отмена
                </button>
                <button
                  onClick={handleSaveTask}
                  disabled={taskSaving || !taskForm.title.trim()}
                  className="flex-1 py-3 rounded-xl font-body font-bold text-sm bg-farm-brown text-white hover:bg-farm-earth transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {taskSaving ? <Icon name="Loader2" size={16} className="animate-spin" /> : <Icon name="Save" size={16} />}
                  {taskSaving ? "Сохранение..." : "Сохранить"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
