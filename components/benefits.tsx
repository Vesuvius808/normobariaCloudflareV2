"use client"

import { Zap, Brain, Shield, Activity, Flame, Clock } from "lucide-react"
import { useLang } from "@/context/language-context"

const copy = {
  pl: {
    benefitsEyebrow: "Co robi Normovita",
    benefitsHeading: "Przeprogramuj swoją biologię",
    benefits: [
      {
        icon: Zap,
        title: "Aktywacja komórek macierzystych",
        description:
          "Twoje ciało wzmacnia produkcję komórek macierzystych — naprawiając uszkodzenia i regenerując tkanki od wewnątrz.",
      },
      {
        icon: Brain,
        title: "Poprawa funkcji poznawczych",
        description:
          "Podwyższony poziom tlenu napędza ostrzejsze skupienie, lepszą pamięć i umysł pracujący na pełnych obrotach.",
      },
      {
        icon: Shield,
        title: "Redukcja stanów zapalnych",
        description:
          "Przewlekłe stany zapalne są neutralizowane u źródła — Twoje ciało goi się szybciej i czuje się lżej.",
      },
      {
        icon: Activity,
        title: "Regeneracja sportowa",
        description:
          "Przyspiesz regenerację po treningu, kontuzji lub operacji — wróć do szczytowej formy szybciej.",
      },
      {
        icon: Flame,
        title: "Głęboki detoks komórkowy",
        description:
          "Wypłucz toksyny, wolne rodniki i metaboliczne odpady, które po cichu degradują Twoje komórki.",
      },
      {
        icon: Clock,
        title: "Długowieczność i anti-aging",
        description:
          "Naukowo potwierdzone mechanizmy spowalniające starzenie biologiczne — najbliżej cellular fountain of youth.",
      },
    ],
    whoEyebrow: "Dla kogo",
    whoHeading: "Dla prawie każdego",
    audiences: [
      "Biohackerzy i entuzjaści długowieczności",
      "Sportowcy i aktywni weekendowi",
      "Zapracowani profesjonaliści",
      "Rodziny i seniorzy",
      "Rekonwalescencja po operacjach i chorobach przewlekłych",
    ],
    noteEyebrow: "Ważna informacja",
    noteMain: (
      <>
        Normovita to nie leczenie medyczne — to{" "}
        <span className="text-nb-highlight font-medium">
          profilaktyka i optymalizacja na najwyższym poziomie
        </span>
        . Sesje odbywają się w spokojnym środowisku bez limitów czasu.
      </>
    ),
    noteSub:
      "Zalecamy rezygnację z sesji podczas aktywnego przeziębienia, grypy lub infekcji dróg oddechowych. W przypadku wątpliwości dotyczących przeciwwskazań zawsze skonsultuj się z lekarzem.",
  },
  en: {
    benefitsEyebrow: "What Normovita Does",
    benefitsHeading: "Rewire Your Biology",
    benefits: [
      {
        icon: Zap,
        title: "Stem Cell Activation",
        description:
          "Your body amplifies stem cell production — repairing damage and regenerating tissue from the inside out.",
      },
      {
        icon: Brain,
        title: "Cognitive Enhancement",
        description:
          "Elevated oxygen fuels sharper focus, better memory recall, and a mind running on premium fuel.",
      },
      {
        icon: Shield,
        title: "Anti-Inflammation",
        description:
          "Chronic inflammation is neutralized at the source, allowing your body to heal faster and feel lighter.",
      },
      {
        icon: Activity,
        title: "Athletic Recovery",
        description:
          "Accelerate recovery from workouts, injuries, and surgeries — get back to peak performance faster.",
      },
      {
        icon: Flame,
        title: "Deep Cellular Detox",
        description:
          "Flush toxins, free radicals, and metabolic waste that silently degrade your cellular health.",
      },
      {
        icon: Clock,
        title: "Longevity & Anti-Aging",
        description:
          "Science-backed mechanisms that slow biological aging — the closest thing to a cellular fountain of youth.",
      },
    ],
    whoEyebrow: "Who It's For",
    whoHeading: "Almost Everyone",
    audiences: [
      "Biohackers & longevity enthusiasts",
      "Athletes & weekend warriors",
      "Stressed-out professionals",
      "Families & seniors",
      "Post-surgery & chronic illness recovery",
    ],
    noteEyebrow: "Important Note",
    noteMain: (
      <>
        Normovita is not a medical treatment — it is{" "}
        <span className="text-nb-highlight font-medium">
          next-level prevention and optimization
        </span>
        . Sessions are calm, pressure-free environments with no time limits.
      </>
    ),
    noteSub:
      "We recommend skipping sessions during active colds, flu, or respiratory infections. Always consult your physician if you have concerns about contraindications.",
  },
  uk: {
    benefitsEyebrow: "Що робить Normovita",
    benefitsHeading: "Перепрограмуйте вашу біологію",
    benefits: [
      {
        icon: Zap,
        title: "Активація стовбурових клітин",
        description:
          "Ваше тіло посилює виробництво стовбурових клітин — відновлюючи пошкодження та регенеруючи тканини зсередини.",
      },
      {
        icon: Brain,
        title: "Покращення когнітивних функцій",
        description:
          "Підвищена кількість кисню забезпечує гостріший фокус, кращу пам'ять і ум на повну потужність.",
      },
      {
        icon: Shield,
        title: "Зменшення запалення",
        description:
          "Хронічне запалення нейтралізується в джерелі — Ваше тіло гояється швидше й почувається легше.",
      },
      {
        icon: Activity,
        title: "Спортивне відновлення",
        description:
          "Прискорте відновлення після тренувань, травм і операцій — повернітеся до пікової форми швидше.",
      },
      {
        icon: Flame,
        title: "Глибока клітинна детоксикація",
        description:
          "Вимийте токсини, вільні радикали та метаболічні відходи, які мовчазно деградують Ваші клітини.",
      },
      {
        icon: Clock,
        title: "Довголіття й анти-старіння",
        description:
          "Науково обґрунтовані механізми, що сповільнюють біологічне старіння — найближче до клітинного фонтану молоді.",
      },
    ],
    whoEyebrow: "Для кого",
    whoHeading: "Майже для кожного",
    audiences: [
      "Біохакери та ентузіасти довголіття",
      "Спортсмени та активні люди",
      "Стресовані професіонали",
      "Сім'ї та пенсіонери",
      "Відновлення після операцій і хронічних хвороб",
    ],
    noteEyebrow: "Важлива примітка",
    noteMain: (
      <>
        Normovita — це не медичне лікування, а{" "}
        <span className="text-nb-highlight font-medium">
          профілактика та оптимізація найвищого рівня
        </span>
        . Сеанси проходять у спокійному середовищі без обмежень часу.
      </>
    ),
    noteSub:
      "Ми рекомендуємо пропустити сеанси під час активної застуди, грипу або респіраторних інфекцій. Завжди проконсультуйтеся зі своїм лікарем, якщо у вас є питання щодо протипоказань.",
  },
}

export default function Benefits() {
  const { lang } = useLang()
  const t = copy[lang]

  return (
    <>
      {/* Benefits Grid */}
      <section id="benefits" className="bg-nb-white py-28 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-4 max-w-xl">
            <p className="font-satoshi text-nb-black/40 text-xs tracking-[0.3em] uppercase">
              {t.benefitsEyebrow}
            </p>
            <h2 className="font-stencil text-nb-black uppercase leading-tight text-5xl md:text-6xl">
              {t.benefitsHeading}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-nb-black/10">
            {t.benefits.map((b) => {
              const Icon = b.icon
              return (
                <div
                  key={b.title}
                  className="bg-nb-white p-10 flex flex-col gap-5 group hover:bg-nb-highlight/40 transition-colors duration-300 border border-nb-black/10"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-nb-highlight/70 transition-colors duration-300">
                    <Icon
                      size={18}
                      className="text-white transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="font-stencil text-nb-black text-xl uppercase">
                    {b.title}
                  </h3>
                  <p className="font-satoshi text-nb-black/60 text-sm leading-relaxed">
                    {b.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Science / Who It's For */}
      <section id="science" className="bg-nb-white border-t border-nb-black/10 py-28 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          {/* Who */}
          <div className="flex flex-col gap-8">
            <p className="font-satoshi text-nb-black/40 text-xs tracking-[0.3em] uppercase">
              {t.whoEyebrow}
            </p>
            <h2 className="font-stencil text-nb-black uppercase leading-tight text-4xl md:text-5xl">
              {t.whoHeading}
            </h2>
            <ul className="flex flex-col gap-4">
              {t.audiences.map((a) => (
                <li key={a} className="flex items-center gap-4 font-satoshi text-nb-black/60 text-base">
                  <span className="w-2 h-2 rounded-full bg-nb-highlight shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="flex flex-col gap-6 bg-nb-highlight/30 border-l-4 border-nb-highlight p-10">
            <p className="font-satoshi text-nb-black/40 text-xs tracking-[0.2em] uppercase">
              {t.noteEyebrow}
            </p>
            <p className="font-satoshi text-nb-black text-lg leading-relaxed">
              {t.noteMain}
            </p>
            <p className="font-satoshi text-nb-black/60 text-sm leading-relaxed">
              {t.noteSub}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
