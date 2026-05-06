import { FarmSection } from "@/App";
import Icon from "@/components/ui/icon";

interface Props {
  setActiveSection: (s: FarmSection) => void;
}

const features = [
  {
    icon: "LayoutDashboard",
    title: "Дашборд хозяйства",
    desc: "Ключевые показатели фермы в реальном времени — урожай, задачи, погода",
    section: "dashboard" as FarmSection,
    color: "bg-amber-50 text-amber-700",
  },
  {
    icon: "Sprout",
    title: "Каталог культур",
    desc: "Управляйте посевами: пшеница, подсолнечник, кукуруза и другие культуры",
    section: "catalog" as FarmSection,
    color: "bg-green-50 text-green-700",
  },
  {
    icon: "Users",
    title: "Команда фермы",
    desc: "Регистрация и управление сотрудниками, роли, отделы, статусы",
    section: "staff" as FarmSection,
    color: "bg-blue-50 text-blue-700",
  },
];

export default function FarmHero({ setActiveSection }: Props) {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://cdn.poehali.dev/projects/5516d959-d1fd-40cc-9dd5-847977764c4c/files/c88b75b1-fc31-4eeb-b082-fc951e3d5ea7.jpg"
            alt="Фермерские поля"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-farm-earth/90 via-farm-earth/70 to-transparent" />
        </div>

        <div className="container mx-auto px-6 py-24 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="animate-fade-up stagger-1 inline-flex items-center gap-2 bg-farm-wheat/20 border border-farm-wheat/40 text-farm-wheat text-xs font-body font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-farm-wheat rounded-full"></span>
              Цифровая платформа для фермеров
            </div>
            <h1 className="animate-fade-up stagger-2 font-display text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Управляй фермой
              <span className="block text-farm-wheat italic font-light">умнее и быстрее</span>
            </h1>
            <p className="animate-fade-up stagger-3 font-body text-white/80 text-lg leading-relaxed mb-10 max-w-lg">
              Единая система для контроля посевов, учёта сотрудников и планирования урожая. Всё, что нужно фермеру — в одном месте.
            </p>
            <div className="animate-fade-up stagger-4 flex flex-wrap gap-4">
              <button
                onClick={() => setActiveSection("dashboard")}
                className="bg-farm-wheat text-farm-earth font-body font-bold px-8 py-3.5 rounded-xl hover:bg-yellow-300 transition-colors flex items-center gap-2"
              >
                <Icon name="LayoutDashboard" size={18} />
                Открыть дашборд
              </button>
              <button
                onClick={() => setActiveSection("staff")}
                className="border-2 border-white/50 text-white font-body font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Icon name="UserPlus" size={18} />
                Добавить сотрудника
              </button>
            </div>
          </div>

          {/* Stat cards */}
          <div className="animate-fade-up stagger-5 hidden md:grid grid-cols-2 gap-4">
            {[
              { label: "Га земли", value: "1 240", icon: "Map", color: "bg-white/10" },
              { label: "Сотрудников", value: "48", icon: "Users", color: "bg-farm-wheat/15" },
              { label: "Культур", value: "12", icon: "Sprout", color: "bg-white/10" },
              { label: "Урожай, т", value: "860", icon: "Package", color: "bg-farm-wheat/15" },
            ].map((s) => (
              <div key={s.label} className={`${s.color} backdrop-blur-sm border border-white/20 rounded-2xl p-5`}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon name={s.icon} size={16} className="text-farm-wheat" />
                  <span className="font-body text-xs text-white/70">{s.label}</span>
                </div>
                <div className="font-display text-3xl font-bold text-white">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl font-bold text-farm-earth mb-4">Что входит в платформу</h2>
          <p className="font-body text-muted-foreground text-lg">Три модуля для полного управления хозяйством</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <button
              key={f.section}
              onClick={() => setActiveSection(f.section)}
              className={`card-hover text-left bg-card border border-border rounded-2xl p-8 group animate-fade-up stagger-${i + 1}`}
            >
              <div className={`w-12 h-12 ${f.color} rounded-xl flex items-center justify-center mb-5`}>
                <Icon name={f.icon} size={22} />
              </div>
              <h3 className="font-display text-xl font-bold text-farm-earth mb-2 group-hover:text-farm-brown transition-colors">{f.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">{f.desc}</p>
              <div className="flex items-center gap-1 font-body text-sm font-semibold text-farm-brown">
                Перейти <Icon name="ArrowRight" size={15} />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Team photo */}
      <section className="bg-farm-cream py-16">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-farm-earth mb-4">
              Ваша команда — ваш главный ресурс
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              Регистрируйте сотрудников, назначайте роли и отслеживайте работу каждого члена команды. От механизаторов до агрономов — все в единой системе.
            </p>
            <ul className="space-y-3">
              {["Быстрая регистрация новых сотрудников", "Роли: агроном, механизатор, животновод и другие", "Статусы: активный, испытательный срок, в отпуске"].map(t => (
                <li key={t} className="flex items-center gap-3 font-body text-sm">
                  <div className="w-5 h-5 bg-farm-brown rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Check" size={11} className="text-white" />
                  </div>
                  {t}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setActiveSection("staff")}
              className="mt-8 bg-farm-brown text-white font-body font-semibold px-6 py-3 rounded-xl hover:bg-farm-earth transition-colors flex items-center gap-2"
            >
              <Icon name="Users" size={16} />
              Перейти к сотрудникам
            </button>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://cdn.poehali.dev/projects/5516d959-d1fd-40cc-9dd5-847977764c4c/files/0c89ace5-fa74-4385-852e-2e38076fadaf.jpg"
              alt="Команда фермы"
              className="w-full h-72 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Harvest CTA */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-farm-brown rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://cdn.poehali.dev/projects/5516d959-d1fd-40cc-9dd5-847977764c4c/files/4a481116-c43e-4b82-b780-339caebbbc84.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <div className="text-5xl mb-4">🌾</div>
            <h2 className="font-display text-3xl font-bold text-white mb-3">Готовы к цифровому сезону?</h2>
            <p className="font-body text-white/75 mb-8 max-w-md mx-auto">Начните управлять хозяйством эффективнее уже сегодня</p>
            <button
              onClick={() => setActiveSection("dashboard")}
              className="bg-farm-wheat text-farm-earth font-body font-bold px-8 py-3.5 rounded-xl hover:bg-yellow-300 transition-colors"
            >
              Начать работу
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
