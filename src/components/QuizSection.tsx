import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  emoji: string;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  emoji: string;
  difficulty: string;
  questions: Question[];
}

const quizzes: Quiz[] = [
  {
    id: "basics",
    title: "Основы ботаники",
    description: "Проверь базовые знания о травах и растениях",
    emoji: "🌿",
    difficulty: "Начальный",
    questions: [
      {
        id: 1,
        question: "Какое растение называют «аптекой у дороги»?",
        options: ["Ромашка", "Подорожник", "Мята", "Крапива"],
        correct: 1,
        explanation: "Подорожник растёт вдоль дорог и троп, а его листья отлично заживляют раны и порезы — отсюда народное прозвище.",
        emoji: "🍃",
      },
      {
        id: 2,
        question: "Из какого растения получают самое популярное успокоительное эфирное масло?",
        options: ["Мяты", "Шалфея", "Лаванды", "Ромашки"],
        correct: 2,
        explanation: "Лавандовое масло — одно из самых известных успокоительных средств ароматерапии. 1 кг масла требует 150 кг цветков.",
        emoji: "💜",
      },
      {
        id: 3,
        question: "Какое растение по легенде использовал Ахиллес для лечения ран?",
        options: ["Зверобой", "Тысячелистник", "Подорожник", "Крапива"],
        correct: 1,
        explanation: "Тысячелистник (Achillea millefolium) получил название от имени Ахиллеса, который лечил им раны своих воинов.",
        emoji: "🌸",
      },
      {
        id: 4,
        question: "Какое семейство растений объединяет мяту, лаванду и шалфей?",
        options: ["Астровые", "Розовые", "Яснотковые", "Бобовые"],
        correct: 2,
        explanation: "Яснотковые (губоцветные) — крупное семейство, включающее большинство ароматических трав: мяту, лаванду, шалфей, базилик, тимьян.",
        emoji: "🌿",
      },
      {
        id: 5,
        question: "Зверобой научно доказан при каком состоянии?",
        options: ["Боли в суставах", "Лёгкой депрессии", "Высоком давлении", "Аллергии"],
        correct: 1,
        explanation: "Клинические исследования подтвердили эффективность зверобоя при лёгкой и умеренной депрессии — он является одним из немногих растений с доказанным действием.",
        emoji: "🌻",
      },
    ],
  },
  {
    id: "habitats",
    title: "Места обитания",
    description: "Где растут различные травы в природе?",
    emoji: "🗺️",
    difficulty: "Средний",
    questions: [
      {
        id: 1,
        question: "Где предпочитает расти мята перечная?",
        options: ["На сухих склонах", "У воды и на влажных местах", "В хвойных лесах", "На городских газонах"],
        correct: 1,
        explanation: "Мята любит влагу — её можно найти по берегам рек, ручьёв и в других влажных местах.",
        emoji: "🌿",
      },
      {
        id: 2,
        question: "Лаванда родом из...",
        options: ["Северной Европы", "Сибири", "Средиземноморья", "Центральной Азии"],
        correct: 2,
        explanation: "Лаванда — типичное средиземноморское растение, родина которого — юг Европы и Северная Африка.",
        emoji: "💜",
      },
      {
        id: 3,
        question: "Крапива двудомная предпочитает расти...",
        options: ["В пустынях", "На солнечных лугах", "У жилья, на пустырях, в лесах", "На вершинах гор"],
        correct: 2,
        explanation: "Крапива — синантропное растение, часто селится рядом с жильём, на пустырях, по лесным опушкам и берегам водоёмов.",
        emoji: "🌱",
      },
      {
        id: 4,
        question: "На каких почвах растёт тысячелистник?",
        options: ["Только на болотах", "На самых разных — он неприхотлив", "Только в горах", "В тропических лесах"],
        correct: 1,
        explanation: "Тысячелистник — одно из наиболее неприхотливых растений: растёт на лугах, опушках, пустырях, обочинах дорог — практически везде.",
        emoji: "🌸",
      },
      {
        id: 5,
        question: "Подорожник получил своё название потому что...",
        options: ["Его корни уходят глубоко", "Он растёт вдоль дорог и троп", "Его листья похожи на дорогу", "Его собирают по дороге в аптеку"],
        correct: 1,
        explanation: "Подорожник действительно любит расти вдоль дорог и тропинок — его семена легко переносятся на колёсах и подошвах обуви.",
        emoji: "🍃",
      },
    ],
  },
  {
    id: "properties",
    title: "Свойства и применение",
    description: "Знаешь ли ты, как правильно применять травы?",
    emoji: "💊",
    difficulty: "Продвинутый",
    questions: [
      {
        id: 1,
        question: "Сколько биологически активных веществ содержит ромашка аптечная?",
        options: ["Около 10", "Около 50", "Более 120", "Около 300"],
        correct: 2,
        explanation: "Чашечка ромашки содержит более 120 биологически активных веществ — именно поэтому она используется в медицине уже тысячи лет.",
        emoji: "🌼",
      },
      {
        id: 2,
        question: "Что произойдёт, если вдыхать аромат мяты?",
        options: ["Снизится давление", "Повысится концентрация внимания", "Улучшится сон", "Снизится температура"],
        correct: 1,
        explanation: "Исследования показывают, что запах мяты стимулирует работу мозга и повышает концентрацию внимания и работоспособность.",
        emoji: "🌿",
      },
      {
        id: 3,
        question: "Название шалфея происходит от латинского слова, означающего...",
        options: ["«Зелёный»", "«Здоровый»", "«Мудрый»", "«Горький»"],
        correct: 1,
        explanation: "Salvia от латинского salvus — «здоровый». Уже в названии закодировано целебное предназначение этого растения.",
        emoji: "🌿",
      },
      {
        id: 4,
        question: "Крапива богата белком. Сколько его содержится в сухом весе?",
        options: ["Около 5%", "Около 12%", "Около 25%", "Около 50%"],
        correct: 2,
        explanation: "По содержанию белка (~25% от сухого веса) крапива сравнима с бобовыми растениями — именно поэтому её веками добавляли в пищу.",
        emoji: "🌱",
      },
      {
        id: 5,
        question: "Тысячелистник применялся в медицине примерно...",
        options: ["500 лет назад", "3 000 лет назад", "10 000 лет назад", "60 000 лет назад"],
        correct: 3,
        explanation: "При раскопках стоянок неандертальцев были обнаружены остатки тысячелистника — его использовали около 60 000 лет назад!",
        emoji: "🌸",
      },
    ],
  },
];

function QuizCard({ quiz, onStart }: { quiz: Quiz; onStart: () => void }) {
  const colors: Record<string, string> = {
    "Начальный": "bg-green-100 text-green-800",
    "Средний": "bg-yellow-100 text-yellow-800",
    "Продвинутый": "bg-red-100 text-red-800",
  };

  return (
    <div className="card-hover bg-card border border-border rounded-2xl p-8 flex flex-col">
      <div className="text-5xl mb-5">{quiz.emoji}</div>
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-body font-medium px-3 py-1 rounded-full ${colors[quiz.difficulty]}`}>
          {quiz.difficulty}
        </span>
        <span className="text-xs font-body text-muted-foreground">{quiz.questions.length} вопросов</span>
      </div>
      <h3 className="font-display text-2xl text-herb-dark mb-2">{quiz.title}</h3>
      <p className="font-body text-sm text-muted-foreground mb-6 flex-1">{quiz.description}</p>
      <button
        onClick={onStart}
        className="bg-herb-mid text-white font-body font-medium py-3 rounded-xl hover:bg-herb-dark transition-colors"
      >
        Начать тест
      </button>
    </div>
  );
}

function ActiveQuiz({ quiz, onBack }: { quiz: Quiz; onBack: () => void }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);

  const q = quiz.questions[current];
  const isAnswered = selected !== null;
  const isCorrect = selected === q.correct;

  function handleSelect(idx: number) {
    if (isAnswered) return;
    setSelected(idx);
  }

  function handleNext() {
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);

    if (current + 1 < quiz.questions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  }

  function restart() {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setShowResult(false);
  }

  const score = answers.filter(Boolean).length;

  if (showResult) {
    const pct = Math.round((score / quiz.questions.length) * 100);
    const msg = pct >= 80 ? "Отлично! Ты настоящий знаток трав!" : pct >= 60 ? "Хороший результат! Есть куда расти." : "Стоит ещё почитать наш каталог!";

    return (
      <div className="max-w-lg mx-auto text-center">
        <div className="text-7xl mb-6">{pct >= 80 ? "🏆" : pct >= 60 ? "⭐" : "📚"}</div>
        <h2 className="font-display text-4xl text-herb-dark mb-2">Результат</h2>
        <p className="font-body text-muted-foreground mb-8">{msg}</p>

        <div className="bg-card border border-border rounded-3xl p-8 mb-8">
          <div className="text-6xl font-display text-herb-mid mb-2">{pct}%</div>
          <p className="font-body text-sm text-muted-foreground">Правильно: {score} из {quiz.questions.length}</p>

          <div className="mt-6 space-y-2">
            {quiz.questions.map((q, i) => (
              <div key={q.id} className={`flex items-center gap-3 p-3 rounded-xl ${answers[i] ? "bg-green-50" : "bg-red-50"}`}>
                <span>{answers[i] ? "✅" : "❌"}</span>
                <span className="font-body text-sm text-left">{q.question}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button onClick={restart} className="bg-herb-mid text-white font-body px-6 py-3 rounded-xl hover:bg-herb-dark transition-colors">
            Пройти снова
          </button>
          <button onClick={onBack} className="border border-herb-mid text-herb-mid font-body px-6 py-3 rounded-xl hover:bg-herb-pale transition-colors">
            Все тесты
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground mb-8">
        <Icon name="ArrowLeft" size={16} /> Назад к тестам
      </button>

      {/* Progress */}
      <div className="flex items-center gap-4 mb-8">
        <span className="font-body text-sm text-muted-foreground">{current + 1} / {quiz.questions.length}</span>
        <div className="flex-1 bg-herb-pale rounded-full h-2">
          <div
            className="bg-herb-mid h-2 rounded-full transition-all duration-500"
            style={{ width: `${((current) / quiz.questions.length) * 100}%` }}
          />
        </div>
        <span className="text-lg">{q.emoji}</span>
      </div>

      <div className="bg-card border border-border rounded-3xl p-8 mb-6">
        <h2 className="font-display text-2xl md:text-3xl text-herb-dark mb-8 leading-snug">{q.question}</h2>

        <div className="space-y-3">
          {q.options.map((opt, idx) => {
            let style = "border border-border bg-background hover:border-herb-mid hover:bg-herb-pale";
            if (isAnswered) {
              if (idx === q.correct) style = "border-2 border-green-500 bg-green-50";
              else if (idx === selected) style = "border-2 border-red-400 bg-red-50";
              else style = "border border-border bg-background opacity-50";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-4 rounded-xl font-body transition-all ${style}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-medium">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {isAnswered && (
        <div className={`rounded-2xl p-5 mb-6 ${isCorrect ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"}`}>
          <div className="flex items-start gap-3">
            <span className="text-xl">{isCorrect ? "🎉" : "💡"}</span>
            <div>
              <p className="font-body font-medium text-sm mb-1">{isCorrect ? "Верно!" : "Неверно, но не беда!"}</p>
              <p className="font-body text-sm text-foreground/75">{q.explanation}</p>
            </div>
          </div>
        </div>
      )}

      {isAnswered && (
        <button
          onClick={handleNext}
          className="w-full bg-herb-mid text-white font-body font-medium py-3 rounded-xl hover:bg-herb-dark transition-colors"
        >
          {current + 1 < quiz.questions.length ? "Следующий вопрос" : "Посмотреть результаты"}
        </button>
      )}
    </div>
  );
}

export default function QuizSection() {
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);

  return (
    <div className="pt-16 min-h-screen">
      <div className="hero-gradient py-16 px-6">
        <div className="container mx-auto text-center text-white">
          <h1 className="font-display text-5xl md:text-6xl mb-4">Тесты знаний</h1>
          <p className="font-body text-white/75 text-lg">Проверь, насколько хорошо ты знаешь травы</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-14">
        {!activeQuiz ? (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              {quizzes.map(quiz => (
                <QuizCard key={quiz.id} quiz={quiz} onStart={() => setActiveQuiz(quiz)} />
              ))}
            </div>

            <div className="mt-12 bg-herb-pale rounded-3xl p-8 text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="font-display text-2xl text-herb-dark mb-2">Совет перед тестом</h3>
              <p className="font-body text-muted-foreground max-w-md mx-auto">
                Посети наш каталог трав, чтобы лучше подготовиться. Каждое описание содержит ключевые факты для тестов!
              </p>
            </div>
          </>
        ) : (
          <ActiveQuiz quiz={activeQuiz} onBack={() => setActiveQuiz(null)} />
        )}
      </div>
    </div>
  );
}
