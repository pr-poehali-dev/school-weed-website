import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  phone: string;
  hireDate: string;
  status: "active" | "trial" | "inactive";
  avatar: string;
  skills: string[];
}

const initialStaff: Employee[] = [
  { id: "1", name: "Иванов Алексей Петрович", role: "Главный агроном", department: "Растениеводство", phone: "+7 918 123-45-67", hireDate: "15.03.2018", status: "active", avatar: "ИА", skills: ["Зерновые", "Агрохимия", "ГИС"] },
  { id: "2", name: "Петров Дмитрий Сергеевич", role: "Механизатор", department: "Техника", phone: "+7 918 234-56-78", hireDate: "01.06.2020", status: "active", avatar: "ПД", skills: ["Тракторы", "Комбайны", "ТО"] },
  { id: "3", name: "Сидорова Наталья Ивановна", role: "Бухгалтер", department: "Администрация", phone: "+7 918 345-67-89", hireDate: "10.01.2019", status: "active", avatar: "СН", skills: ["1С", "Отчётность", "Расчёт зарплат"] },
  { id: "4", name: "Козлов Виктор Андреевич", role: "Агроном", department: "Растениеводство", phone: "+7 918 456-78-90", hireDate: "14.02.2024", status: "trial", avatar: "КВ", skills: ["Пестициды", "Мониторинг"] },
  { id: "5", name: "Михайлов Степан Николаевич", role: "Инженер-механик", department: "Техника", phone: "+7 918 567-89-01", hireDate: "22.09.2021", status: "active", avatar: "МС", skills: ["Ремонт", "Ирригация", "Электрика"] },
  { id: "6", name: "Фёдорова Анна Владимировна", role: "Зоотехник", department: "Животноводство", phone: "+7 918 678-90-12", hireDate: "05.03.2023", status: "active", avatar: "ФА", skills: ["КРС", "Птицеводство", "Ветеринария"] },
];

const roles = ["Агроном", "Главный агроном", "Механизатор", "Инженер-механик", "Зоотехник", "Бухгалтер", "Разнорабочий", "Водитель", "Охранник", "Кладовщик"];
const departments = ["Растениеводство", "Животноводство", "Техника", "Администрация", "Склад"];

const statusLabel: Record<string, string> = { active: "Работает", trial: "Испытательный", inactive: "Не активен" };
const statusStyle: Record<string, string> = {
  active: "status-active",
  trial: "status-trial",
  inactive: "status-inactive",
};

const avatarColors = [
  "bg-amber-500", "bg-farm-green", "bg-blue-500", "bg-purple-500",
  "bg-red-500", "bg-indigo-500", "bg-pink-500", "bg-teal-500",
];

interface FormData {
  name: string;
  role: string;
  department: string;
  phone: string;
  status: "active" | "trial" | "inactive";
  skills: string;
}

const emptyForm: FormData = {
  name: "",
  role: "",
  department: "",
  phone: "",
  status: "active",
  skills: "",
};

export default function FarmStaff() {
  const [staff, setStaff] = useState<Employee[]>(initialStaff);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("Все");
  const [filterStatus, setFilterStatus] = useState("Все");
  const [viewEmployee, setViewEmployee] = useState<Employee | null>(null);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [success, setSuccess] = useState(false);

  const depts = ["Все", ...departments];
  const statuses = ["Все", "active", "trial", "inactive"];

  const filtered = staff.filter(e => {
    const matchQ = e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase());
    const matchDept = filterDept === "Все" || e.department === filterDept;
    const matchStatus = filterStatus === "Все" || e.status === filterStatus;
    return matchQ && matchDept && matchStatus;
  });

  function validate() {
    const err: Partial<FormData> = {};
    if (!form.name.trim() || form.name.trim().split(" ").length < 2) err.name = "Введите полное ФИО";
    if (!form.role) err.role = "Выберите должность";
    if (!form.department) err.department = "Выберите отдел";
    if (form.phone && form.phone.replace(/[\d\s\-+()]/g, "").length > 0) err.phone = "Некорректный телефон";
    return err;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length > 0) { setErrors(err); return; }

    const today = new Date().toLocaleDateString("ru-RU");
    const newEmployee: Employee = {
      id: String(Date.now()),
      name: form.name.trim(),
      role: form.role,
      department: form.department,
      phone: form.phone || "—",
      hireDate: today,
      status: form.status,
      avatar: form.name.trim().split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase(),
      skills: form.skills.split(",").map(s => s.trim()).filter(Boolean),
    };

    setStaff(prev => [newEmployee, ...prev]);
    setForm(emptyForm);
    setErrors({});
    setShowForm(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="farm-gradient py-14 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="text-white">
              <h1 className="font-display text-4xl font-bold mb-2">Сотрудники</h1>
              <p className="font-body text-white/70">Управление командой фермерского хозяйства</p>
            </div>
            <button
              onClick={() => { setShowForm(true); setErrors({}); setForm(emptyForm); }}
              className="flex items-center gap-2 bg-farm-wheat text-farm-earth font-body font-bold px-6 py-3 rounded-xl hover:bg-yellow-300 transition-colors self-start md:self-auto"
            >
              <Icon name="UserPlus" size={18} />
              Зарегистрировать сотрудника
            </button>
          </div>
        </div>
      </div>

      {success && (
        <div className="fixed top-20 right-6 z-50 bg-green-600 text-white font-body text-sm font-semibold px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fade-up">
          <Icon name="CheckCircle" size={16} />
          Сотрудник успешно добавлен!
        </div>
      )}

      <div className="container mx-auto px-6 py-8">
        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Всего", value: staff.length, icon: "Users", color: "text-blue-600 bg-blue-50" },
            { label: "Работают", value: staff.filter(e => e.status === "active").length, icon: "CheckCircle", color: "text-green-600 bg-green-50" },
            { label: "Испытательный", value: staff.filter(e => e.status === "trial").length, icon: "Clock", color: "text-amber-600 bg-amber-50" },
            { label: "Отделов", value: [...new Set(staff.map(e => e.department))].length, icon: "Building2", color: "text-purple-600 bg-purple-50" },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
              <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Icon name={s.icon} size={18} />
              </div>
              <div>
                <div className="font-display text-xl font-bold text-foreground">{s.value}</div>
                <div className="font-body text-xs text-muted-foreground">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск по имени или должности..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-card border border-border rounded-xl py-2.5 pl-10 pr-4 font-body text-sm focus:outline-none focus:border-farm-brown"
            />
          </div>
          <select
            value={filterDept}
            onChange={e => setFilterDept(e.target.value)}
            className="bg-card border border-border rounded-xl px-4 py-2.5 font-body text-sm focus:outline-none focus:border-farm-brown text-foreground"
          >
            {depts.map(d => <option key={d}>{d}</option>)}
          </select>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="bg-card border border-border rounded-xl px-4 py-2.5 font-body text-sm focus:outline-none focus:border-farm-brown text-foreground"
          >
            {statuses.map(s => <option key={s} value={s}>{s === "Все" ? "Все статусы" : statusLabel[s]}</option>)}
          </select>
        </div>

        {/* Staff list */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((emp, i) => (
            <button
              key={emp.id}
              onClick={() => setViewEmployee(emp)}
              className="card-hover text-left bg-card border border-border rounded-2xl p-5 flex items-start gap-4 group"
            >
              <div className={`w-12 h-12 ${avatarColors[i % avatarColors.length]} rounded-xl flex items-center justify-center text-white font-body font-bold text-sm flex-shrink-0`}>
                {emp.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-body font-semibold text-sm text-foreground group-hover:text-farm-brown transition-colors leading-tight">{emp.name}</h3>
                </div>
                <p className="font-body text-xs text-farm-brown mb-1">{emp.role}</p>
                <p className="font-body text-xs text-muted-foreground mb-2">{emp.department}</p>
                <span className={`font-body text-xs font-medium px-2 py-0.5 rounded-full ${statusStyle[emp.status]}`}>
                  {statusLabel[emp.status]}
                </span>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">👤</div>
            <p className="font-body text-muted-foreground">Сотрудники не найдены</p>
          </div>
        )}
      </div>

      {/* Registration form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-card rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="farm-gradient p-6 rounded-t-3xl flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-white">Регистрация сотрудника</h2>
                <p className="font-body text-sm text-white/60 mt-0.5">Заполните данные нового члена команды</p>
              </div>
              <button onClick={() => setShowForm(false)} className="text-white/60 hover:text-white">
                <Icon name="X" size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* ФИО */}
              <div>
                <label className="font-body text-sm font-semibold text-foreground mb-1.5 block">
                  ФИО <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Иванов Иван Иванович"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className={`w-full border rounded-xl px-4 py-2.5 font-body text-sm focus:outline-none bg-background ${errors.name ? "border-red-400 focus:border-red-400" : "border-border focus:border-farm-brown"}`}
                />
                {errors.name && <p className="font-body text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              {/* Должность + Отдел */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-body text-sm font-semibold text-foreground mb-1.5 block">
                    Должность <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.role}
                    onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
                    className={`w-full border rounded-xl px-3 py-2.5 font-body text-sm focus:outline-none bg-background text-foreground ${errors.role ? "border-red-400" : "border-border focus:border-farm-brown"}`}
                  >
                    <option value="">Выберите...</option>
                    {roles.map(r => <option key={r}>{r}</option>)}
                  </select>
                  {errors.role && <p className="font-body text-xs text-red-500 mt-1">{errors.role}</p>}
                </div>
                <div>
                  <label className="font-body text-sm font-semibold text-foreground mb-1.5 block">
                    Отдел <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.department}
                    onChange={e => setForm(p => ({ ...p, department: e.target.value }))}
                    className={`w-full border rounded-xl px-3 py-2.5 font-body text-sm focus:outline-none bg-background text-foreground ${errors.department ? "border-red-400" : "border-border focus:border-farm-brown"}`}
                  >
                    <option value="">Выберите...</option>
                    {departments.map(d => <option key={d}>{d}</option>)}
                  </select>
                  {errors.department && <p className="font-body text-xs text-red-500 mt-1">{errors.department}</p>}
                </div>
              </div>

              {/* Телефон */}
              <div>
                <label className="font-body text-sm font-semibold text-foreground mb-1.5 block">Телефон</label>
                <input
                  type="tel"
                  placeholder="+7 918 000-00-00"
                  value={form.phone}
                  onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                  className={`w-full border rounded-xl px-4 py-2.5 font-body text-sm focus:outline-none bg-background ${errors.phone ? "border-red-400 focus:border-red-400" : "border-border focus:border-farm-brown"}`}
                />
                {errors.phone && <p className="font-body text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>

              {/* Статус */}
              <div>
                <label className="font-body text-sm font-semibold text-foreground mb-2 block">Статус при приёме</label>
                <div className="flex gap-2">
                  {(["active", "trial", "inactive"] as const).map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm(p => ({ ...p, status: s }))}
                      className={`flex-1 py-2 rounded-xl font-body text-xs font-semibold border transition-colors ${
                        form.status === s
                          ? "bg-farm-brown text-white border-farm-brown"
                          : "bg-background border-border text-muted-foreground hover:border-farm-brown"
                      }`}
                    >
                      {statusLabel[s]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Навыки */}
              <div>
                <label className="font-body text-sm font-semibold text-foreground mb-1.5 block">
                  Навыки <span className="font-normal text-muted-foreground">(через запятую)</span>
                </label>
                <input
                  type="text"
                  placeholder="Трактор, Комбайн, Агрохимия..."
                  value={form.skills}
                  onChange={e => setForm(p => ({ ...p, skills: e.target.value }))}
                  className="w-full border border-border rounded-xl px-4 py-2.5 font-body text-sm focus:outline-none bg-background focus:border-farm-brown"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 rounded-xl font-body font-semibold text-sm border border-border hover:bg-muted transition-colors"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl font-body font-bold text-sm bg-farm-brown text-white hover:bg-farm-earth transition-colors flex items-center justify-center gap-2"
                >
                  <Icon name="UserPlus" size={16} />
                  Зарегистрировать
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View employee modal */}
      {viewEmployee && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setViewEmployee(null)}>
          <div className="bg-card rounded-3xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="farm-gradient p-6 rounded-t-3xl flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-white">Карточка сотрудника</h2>
              <button onClick={() => setViewEmployee(null)} className="text-white/60 hover:text-white">
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-farm-brown rounded-2xl flex items-center justify-center text-white font-body font-bold text-lg">
                  {viewEmployee.avatar}
                </div>
                <div>
                  <h3 className="font-body font-bold text-foreground">{viewEmployee.name}</h3>
                  <p className="font-body text-sm text-farm-brown">{viewEmployee.role}</p>
                  <span className={`font-body text-xs font-medium px-2 py-0.5 rounded-full ${statusStyle[viewEmployee.status]}`}>
                    {statusLabel[viewEmployee.status]}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                {[
                  { icon: "Building2", label: "Отдел", value: viewEmployee.department },
                  { icon: "Phone", label: "Телефон", value: viewEmployee.phone },
                  { icon: "Calendar", label: "Дата найма", value: viewEmployee.hireDate },
                ].map(r => (
                  <div key={r.label} className="flex items-center gap-3 py-2 border-b border-border">
                    <Icon name={r.icon} size={15} className="text-muted-foreground flex-shrink-0" />
                    <span className="font-body text-xs text-muted-foreground w-20 flex-shrink-0">{r.label}</span>
                    <span className="font-body text-sm font-medium text-foreground">{r.value}</span>
                  </div>
                ))}
              </div>

              {viewEmployee.skills.length > 0 && (
                <div>
                  <p className="font-body text-xs text-muted-foreground mb-2">Навыки:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {viewEmployee.skills.map(s => (
                      <span key={s} className="font-body text-xs bg-farm-cream text-farm-earth px-2.5 py-1 rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}