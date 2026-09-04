"use client"

import { useLang } from "@/context/language-context"

const copy = {
  pl: {
    eyebrow: "Czym jest Normovita",
    heading: ["Rewolucja", "w Komorze"],
    p1: "Normovita to nie leczenie — to środowisko nowej generacji zaprojektowane z myślą o optymalizacji człowieka. Łącząc podwyższone ciśnienie atmosferyczne, wzbogacony tlen, dwutlenek węgla i wodór molekularny, tworzy warunki, w których Twoje ciało robi to, co potrafi najlepiej: leczy, regeneruje i rozkwita.",
    p2Bold: "Dr. Jana Pokrywkę",
    p2: ", Normovita jest dopracowywana przez lata badań nad biologią komórkową, medycyną sportową i nauką o długowieczności. To nie trend. To zmiana paradygmatu.",
    p2Pre: "Zapoczątkowana przez ",
    cta: "Dowiedz się więcej",
    metrics: [
      { label: "Ciśnienie", value: "1500 hPa", desc: "Zoptymalizowana gęstość atmosferyczna" },
      { label: "Tlen", value: "40%", desc: "Stężenie powyżej normy otoczenia" },
      { label: "CO₂ Enhanced", value: "Tak", desc: "Wazodylatacja i poprawa dostarczania" },
      { label: "H₂ Infused", value: "Tak", desc: "Antyoksydacyjny wodór molekularny" },
    ],
  },
  en: {
    eyebrow: "What is Normovita",
    heading: ["A Revolution", "in a Chamber"],
    p1: "Normovita is not a medical treatment — it is a next-generation environment engineered for human optimization. By combining elevated atmospheric pressure, enriched oxygen, carbon dioxide, and molecular hydrogen, it creates conditions where your body can do what it does best: heal, regenerate, and thrive.",
    p2Bold: "Dr. Jan Pokrywka",
    p2: ", Normovita has been refined through years of research into cellular biology, sports medicine, and longevity science. It is not a trend. It is a paradigm shift.",
    p2Pre: "Pioneered by ",
    cta: "Learn More",
    metrics: [
      { label: "Pressure", value: "1500 hPa", desc: "Optimized atmospheric density" },
      { label: "Oxygen", value: "40%", desc: "Above ambient concentration" },
      { label: "CO₂ Enhanced", value: "Yes", desc: "Vasodilation and delivery boost" },
      { label: "H₂ Infused", value: "Yes", desc: "Antioxidant molecular hydrogen" },
    ],
  },
  uk: {
    eyebrow: "Що таке Normovita",
    heading: ["Революція", "в камері"],
    p1: "Normovita — це не медичне лікування, а середовище нового покоління, спроектоване для людської оптимізації. Поєднуючи підвищений атмосферний тиск, збагачений кисень, вуглекислий газ і молекулярний водень, воно створює умови, в яких Ваше тіло робить те, що робить найкраще: гояться, регенерується та розквітає.",
    p2Bold: "др. Яна Покривки",
    p2: ", Normovita вдосконалювалася протягом років досліджень в галузі клітинної біології, спортивної медицини та науці про довголіття. Це не тренд. Це зміна парадигми.",
    p2Pre: "Започатковано ",
    cta: "Дізнайтеся більше",
    metrics: [
      { label: "Тиск", value: "1500 гПа", desc: "Оптимізована атмосферна щільність" },
      { label: "Кисень", value: "40%", desc: "Вище за амбієнтну концентрацію" },
      { label: "CO₂ Збагачено", value: "Так ✓", desc: "Вазодилатація та поліпшення доставки" },
      { label: "H₂ Насичено", value: "Так ✓", desc: "Антиоксидантний молекулярний водень" },
    ],
  },
}

export default function About() {
  const { lang } = useLang()
  const t = copy[lang]

  return (
    <section id="about" className="bg-nb-white pt-12 pb-28 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div className="flex flex-col gap-8">
          <p className="font-satoshi text-nb-black/40 text-xs tracking-[0.3em] uppercase">
            {t.eyebrow}
          </p>
          <h2 className="font-stencil text-nb-black text-balance uppercase leading-tight text-5xl md:text-6xl">
            {t.heading[0]}
            <br />
            {t.heading[1]}
          </h2>
          <p className="font-satoshi text-nb-black/70 text-lg leading-relaxed">
            {t.p1}
          </p>
          <p className="font-satoshi text-nb-black/70 text-lg leading-relaxed">
            {t.p2Pre}
            <span className="text-nb-black font-semibold">{t.p2Bold}</span>
            {t.p2}
          </p>
          <a
            href="#locations"
            className="inline-flex self-start font-satoshi text-xs tracking-widest uppercase border border-nb-black text-nb-black px-6 py-3 hover:bg-nb-black hover:text-nb-white transition-all duration-300"
          >
            {t.cta}
          </a>
        </div>

        {/* Metrics card */}
        <div className="grid grid-cols-2 gap-px bg-nb-black/10 border border-nb-black/10">
          {t.metrics.map((item) => (
            <div
              key={item.label}
              className="bg-nb-white p-8 flex flex-col gap-3 group hover:bg-nb-highlight/50 transition-colors duration-300"
            >
              <span className="font-satoshi text-nb-black/40 group-hover:text-nb-black text-xs tracking-widest uppercase transition-colors duration-300">
                {item.label}
              </span>
              <span className="font-stencil text-nb-highlight text-3xl transition-colors duration-300">
                {item.value}
              </span>
              <span className="font-satoshi text-nb-black/60 group-hover:text-nb-black/80 text-sm leading-relaxed transition-colors duration-300">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
