"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLang } from "@/context/language-context"

const EMAIL = "biuro@normobariawarszawa24h.pl"

const copy = {
  pl: {
    back: "Powrót",
    title: "Polityka Prywatności",
    intro:
      "Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych użytkowników korzystających ze strony internetowej Normovita.",
    sections: [
      {
        heading: "1. Informacje ogólne",
        body: "Dbamy o Twoją prywatność. Poniżej opisujemy, jakie dane przetwarzamy i w jakim celu, w sposób maksymalnie przejrzysty.",
      },
      {
        heading: "2. Kto jest administratorem danych?",
        body: `Administratorem Twoich danych osobowych jest Normovita.\nKontakt: ${EMAIL}`,
      },
      {
        heading: "3. Jakie dane zbieramy i po co?",
        body: "Nasza strona internetowa działa w sposób maksymalnie szanujący Twoją prywatność. Nie zbieramy, nie śledzimy ani nie przetwarzamy żadnych dodatkowych danych osobowych, takich jak imiona, nazwiska, adresy zamieszkania czy numery telefonów.\n\nPrzetwarzamy wyłącznie dane absolutnie niezbędne do prawidłowego działania i wyświetlania strony (tzw. pliki cookies techniczne lub logi serwera, np. adres IP, rodzaj przeglądarki). Dane te są przetwarzane automatycznie w celu zapewnienia bezpieczeństwa strony (np. ochrony przed atakami hakerskimi) oraz prawidłowego wyświetlania zawartości serwisu.",
      },
      {
        heading: "4. Pliki cookies (Ciasteczka)",
        body: "Strona korzysta wyłącznie z niezbędnych plików cookies. Są one konieczne do jej technicznego działania. Nie używamy plików cookies do celów marketingowych, analitycznych (np. Google Analytics) ani profilowania.",
      },
      {
        heading: "5. Udostępnianie danych",
        body: "Twoje dane nie są sprzedawane, wypożyczane ani przekazywane firmom trzecim w celach marketingowych. Dostęp do logów serwera może mieć jedynie nasza firma hostingowa w celu utrzymania sprawności technicznej usługi.",
      },
      {
        heading: "6. Twoje prawa",
        body: `Ponieważ dbamy o minimalizm danych, nie przechowujemy informacji, które mogłyby Cię bezpośrednio zidentyfikować w celach marketingowych. Jeśli jednak masz pytania dotyczące tego, jak działa nasza strona, zawsze możesz skontaktować się z nami pod adresem: ${EMAIL}.`,
      },
    ],
  },
  en: {
    back: "Back",
    title: "Privacy Policy",
    intro:
      "This Privacy Policy sets out the rules for processing and protecting the personal data of users of the Normovita website.",
    sections: [
      {
        heading: "1. General information",
        body: "We care about your privacy. Below we describe what data we process and for what purpose, in the most transparent way possible.",
      },
      {
        heading: "2. Who is the data controller?",
        body: `The controller of your personal data is Normovita.\nContact: ${EMAIL}`,
      },
      {
        heading: "3. What data do we collect and why?",
        body: "Our website operates in a way that maximally respects your privacy. We do not collect, track or process any additional personal data such as names, home addresses or phone numbers.\n\nWe process only the data absolutely necessary for the proper functioning and display of the site (so-called technical cookies or server logs, e.g. IP address, browser type). This data is processed automatically to ensure the security of the site (e.g. protection against hacker attacks) and the correct display of its content.",
      },
      {
        heading: "4. Cookies",
        body: "The site uses only essential cookies. They are required for its technical operation. We do not use cookies for marketing, analytics (e.g. Google Analytics) or profiling purposes.",
      },
      {
        heading: "5. Data sharing",
        body: "Your data is not sold, rented or transferred to third parties for marketing purposes. Access to server logs may be granted only to our hosting provider in order to maintain the technical performance of the service.",
      },
      {
        heading: "6. Your rights",
        body: `Because we value data minimization, we do not store information that could directly identify you for marketing purposes. However, if you have questions about how our site works, you can always contact us at: ${EMAIL}.`,
      },
    ],
  },
  uk: {
    back: "Назад",
    title: "Політика конфіденційності",
    intro:
      "Ця Політика конфіденційності визначає правила обробки та захисту персональних даних користувачів вебсайту Normovita.",
    sections: [
      {
        heading: "1. Загальна інформація",
        body: "Ми піклуємося про вашу конфіденційність. Нижче ми максимально прозоро описуємо, які дані обробляємо та з якою метою.",
      },
      {
        heading: "2. Хто є розпорядником даних?",
        body: `Розпорядником ваших персональних даних є Normovita.\nКонтакт: ${EMAIL}`,
      },
      {
        heading: "3. Які дані ми збираємо і навіщо?",
        body: "Наш вебсайт працює у спосіб, що максимально поважає вашу конфіденційність. Ми не збираємо, не відстежуємо та не обробляємо жодних додаткових персональних даних, таких як імена, адреси проживання чи номери телефонів.\n\nМи обробляємо виключно дані, абсолютно необхідні для правильної роботи та відображення сайту (так звані технічні файли cookie або журнали сервера, напр. IP-адреса, тип браузера). Ці дані обробляються автоматично для забезпечення безпеки сайту (напр. захисту від хакерських атак) та правильного відображення вмісту.",
      },
      {
        heading: "4. Файли cookie",
        body: "Сайт використовує лише необхідні файли cookie. Вони потрібні для його технічної роботи. Ми не використовуємо файли cookie з маркетинговою, аналітичною (напр. Google Analytics) метою чи для профілювання.",
      },
      {
        heading: "5. Передача даних",
        body: "Ваші дані не продаються, не орендуються та не передаються третім сторонам з маркетинговою метою. Доступ до журналів сервера може мати лише наш хостинг-провайдер з метою підтримки технічної працездатності послуги.",
      },
      {
        heading: "6. Ваші права",
        body: `Оскільки ми цінуємо мінімізацію даних, ми не зберігаємо інформацію, яка могла б прямо ідентифікувати вас з маркетинговою метою. Однак, якщо у вас є запитання щодо роботи нашого сайту, ви завжди можете зв'язатися з нами за адресою: ${EMAIL}.`,
      },
    ],
  },
}

export default function PrivacyPolicy() {
  const { lang } = useLang()
  const t = copy[lang]

  return (
    <main className="min-h-screen bg-nb-white px-6 py-16 md:py-24">
      <article className="max-w-3xl mx-auto flex flex-col gap-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-satoshi text-nb-black/60 text-xs tracking-widest uppercase hover:text-nb-black transition-colors duration-300 self-start"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          {t.back}
        </Link>

        <header className="flex flex-col gap-4">
          <h1 className="font-stencil text-nb-black text-4xl md:text-5xl uppercase leading-none">
            {t.title}
          </h1>
          <p className="font-satoshi text-nb-black/60 text-base leading-relaxed">
            {t.intro}
          </p>
        </header>

        <div className="h-px bg-nb-black/10" />

        <div className="flex flex-col gap-10">
          {t.sections.map((section) => (
            <section key={section.heading} className="flex flex-col gap-3">
              <h2 className="font-stencil text-nb-black text-xl md:text-2xl uppercase">
                {section.heading}
              </h2>
              {section.body.split("\n\n").map((paragraph, i) => (
                <p
                  key={i}
                  className="font-satoshi text-nb-black/70 text-base leading-relaxed whitespace-pre-line"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </main>
  )
}
