import { Section } from "@/App";
import Icon from "@/components/ui/icon";

interface HeroSectionProps {
  setActiveSection: (s: Section) => void;
}

const features = [
  {
    icon: "BookOpen",
    title: "Каталог трав",
    desc: "Подробные описания более 40 видов растений с характеристиками и применением",
    section: "catalog" as Section,
  },
  {
    icon: "Camera",
    title: "Галерея",
    desc: "Фотографии трав в их естественной среде обитания",
    section: "gallery" as Section,
  },
  {
    icon: "Brain",
    title: "Интерактивные тесты",
    desc: "Проверь знания о травах в игровом формате",
    section: "quiz" as Section,
  },
];

export default function HeroSection({ setActiveSection }: HeroSectionProps) {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="hero-gradient min-h-[90vh] flex items-center relative overflow-hidden">
        {/* Decorative blobs */}
        <div
          className="absolute top-10 right-10 w-72 h-72 bg-white/5 animate-float"
          style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
        />
        <div
          className="absolute bottom-20 left-10 w-48 h-48 bg-herb-gold/10 animate-float"
          style={{ borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%", animationDelay: "2s" }}
        />

        <div className="container mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <p className="animate-fade-up stagger-1 font-body text-herb-gold text-sm uppercase tracking-widest mb-4">
              Энциклопедия растений
            </p>
            <h1 className="animate-fade-up stagger-2 font-display text-5xl md:text-7xl font-light text-white leading-tight mb-6">
              Мир трав
              <span className="block italic text-herb-gold">и растений</span>
            </h1>
            <p className="animate-fade-up stagger-3 font-body text-white/75 text-lg mb-10 leading-relaxed max-w-md">
              Погрузитесь в удивительный мир флоры. Изучайте, сравнивайте и проверяйте знания о лекарственных и дикорастущих травах.
            </p>
            <div className="animate-fade-up stagger-4 flex flex-wrap gap-4">
              <button
                onClick={() => setActiveSection("catalog")}
                className="bg-herb-gold text-herb-dark font-body font-semibold px-8 py-3 rounded-full hover:bg-yellow-300 transition-colors"
              >
                Начать изучение
              </button>
              <button
                onClick={() => setActiveSection("quiz")}
                className="border border-white/40 text-white font-body font-medium px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
              >
                Пройти тест
              </button>
            </div>
          </div>

          <div className="animate-fade-up stagger-5 hidden md:block">
            <div
              className="overflow-hidden shadow-2xl"
              style={{ borderRadius: "60% 40% 55% 45% / 45% 55% 45% 55%" }}
            >
              <img
                src="https://cdn.poehali.dev/projects/5516d959-d1fd-40cc-9dd5-847977764c4c/files/6f7b13a9-f126-450e-81af-c93e4e9fb07e.jpg"
                alt="Травы и растения"
                className="w-full h-[480px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="hsl(45 25% 96%)" />
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl text-herb-dark mb-4">
            Что вас ждёт
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            Три раздела для глубокого изучения мира трав
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <button
              key={f.section}
              onClick={() => setActiveSection(f.section)}
              className={`card-hover text-left bg-card border border-border rounded-2xl p-8 group animate-fade-up stagger-${i + 1}`}
            >
              <div className="w-14 h-14 bg-herb-pale rounded-2xl flex items-center justify-center mb-6 group-hover:bg-herb-mid transition-colors">
                <Icon name={f.icon} size={26} className="text-herb-mid group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display text-2xl text-herb-dark mb-3">{f.title}</h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              <div className="mt-6 flex items-center gap-2 text-herb-mid font-body text-sm font-medium">
                Перейти <Icon name="ArrowRight" size={16} />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-herb-pale py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "40+", label: "видов трав" },
              { num: "6", label: "семейств растений" },
              { num: "120+", label: "фотографий" },
              { num: "5", label: "тестов знаний" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-4xl text-herb-mid mb-1">{s.num}</div>
                <div className="font-body text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom image strip */}
      <section className="py-20 container mx-auto px-6">
        <div className="rounded-3xl overflow-hidden relative h-64 md:h-80">
          <img
            src="https://cdn.poehali.dev/projects/5516d959-d1fd-40cc-9dd5-847977764c4c/files/c8f4d55c-d78e-4212-b022-52c35d529157.jpg"
            alt="Коллекция трав"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-herb-dark/50 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="font-display text-4xl md:text-5xl mb-4 italic">
                Природа — лучший учитель
              </h2>
              <button
                onClick={() => setActiveSection("gallery")}
                className="font-body bg-herb-gold text-herb-dark font-semibold px-6 py-3 rounded-full hover:bg-yellow-300 transition-colors"
              >
                Смотреть галерею
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
