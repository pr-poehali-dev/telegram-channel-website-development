import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const TG_LINK = "https://t.me/your_channel"; // ← замените на ссылку вашего канала

const NAV_LINKS = [
  { label: "Главная", href: "#hero" },
  { label: "О канале", href: "#about" },
  { label: "Преимущества", href: "#features" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

const FEATURES = [
  {
    icon: "Zap",
    title: "Эксклюзивный контент",
    desc: "Публикуем материалы, которые вы не найдёте больше нигде. Только актуальное и проверенное.",
    color: "#00cfff",
  },
  {
    icon: "TrendingUp",
    title: "Аналитика и тренды",
    desc: "Разбираем последние тренды с цифрами и фактами, чтобы вы всегда были на шаг впереди.",
    color: "#a855f7",
  },
  {
    icon: "Users",
    title: "Живое сообщество",
    desc: "Активная аудитория, обсуждения и нетворкинг с единомышленниками каждый день.",
    color: "#ec4899",
  },
  {
    icon: "Bell",
    title: "Без информационного шума",
    desc: "Тщательно отобранный контент — без спама, без воды. Только то, что реально важно.",
    color: "#f59e0b",
  },
  {
    icon: "BookOpen",
    title: "Практические гайды",
    desc: "Пошаговые инструкции и готовые решения, которые можно применить прямо сейчас.",
    color: "#10b981",
  },
  {
    icon: "Star",
    title: "Экспертный опыт",
    desc: "Автор с 10-летним опытом делится знаниями, кейсами и личными инсайтами.",
    color: "#00cfff",
  },
];

const FAQS = [
  {
    q: "Как часто публикуется контент?",
    a: "Мы публикуем материалы каждый день, обычно 2–3 поста в будни и 1 пост в выходные.",
  },
  {
    q: "Канал платный или бесплатный?",
    a: "Основной канал полностью бесплатный. Подписывайтесь и читайте без ограничений.",
  },
  {
    q: "Можно ли задавать вопросы автору?",
    a: "Да! В канале есть чат для обсуждений, где автор регулярно отвечает на вопросы подписчиков.",
  },
  {
    q: "О чём именно канал?",
    a: "Канал посвящён [вашей теме]. Разбираем всё — от основ до продвинутых практик.",
  },
  {
    q: "Есть ли архив старых постов?",
    a: "Все посты доступны в архиве Telegram — можно читать с самого первого дня.",
  },
];

const STATS = [
  { value: "12K+", label: "подписчиков" },
  { value: "3", label: "поста в день" },
  { value: "2", label: "года в эфире" },
  { value: "98%", label: "довольных читателей" },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 12,
    color: ["#00cfff", "#a855f7", "#ec4899"][Math.floor(Math.random() * 3)],
    size: 2 + Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function FaqItem({ q, a, idx }: { q: string; a: string; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="glass rounded-2xl overflow-hidden mb-3 transition-all duration-300"
      style={{
        border: `1px solid ${open ? "rgba(0,207,255,0.3)" : "rgba(255,255,255,0.06)"}`,
      }}
    >
      <button
        className="w-full flex items-center justify-between p-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-white text-base pr-4 leading-snug">
          <span className="text-sm font-bold mr-3" style={{ color: "#00cfff" }}>
            {String(idx + 1).padStart(2, "0")}
          </span>
          {q}
        </span>
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: open
              ? "linear-gradient(135deg,#00cfff,#a855f7)"
              : "rgba(255,255,255,0.08)",
            transform: open ? "rotate(45deg)" : "rotate(0)",
          }}
        >
          <Icon name="Plus" size={16} className="text-white" />
        </div>
      </button>
      <div
        style={{
          maxHeight: open ? "200px" : "0",
          overflow: "hidden",
          transition: "max-height 0.4s ease",
        }}
      >
        <p className="px-5 pb-5 text-gray-400 leading-relaxed text-sm">{a}</p>
      </div>
    </div>
  );
}

export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useReveal();
  const featuresRef = useReveal();
  const faqRef = useReveal();
  const contactsRef = useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.opacity = String(Math.max(0, 1 - window.scrollY / 400));
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "#050714", color: "#fff", fontFamily: "'Golos Text', sans-serif" }} className="min-h-screen overflow-x-hidden">

      {/* НАВИГАЦИЯ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "navbar-glass" : ""}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#hero" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#00cfff,#a855f7)" }}>
              <Icon name="Send" size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg" style={{ fontFamily: "Montserrat, sans-serif" }}>
              <span className="text-gradient-blue">Дизайнер,</span><span className="text-white"> Креатор, Инфографика</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200 relative group">
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{ background: "linear-gradient(90deg,#00cfff,#a855f7)" }} />
              </a>
            ))}
          </div>

          <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 tg-button text-white font-semibold text-sm px-5 py-2.5 rounded-xl">
            <Icon name="Send" size={15} />
            Подписаться
          </a>

          <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden navbar-glass px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-gray-300 hover:text-white text-base py-1" onClick={() => setMobileOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 tg-button text-white font-semibold px-5 py-3 rounded-xl mt-2">
              <Icon name="Send" size={16} />
              Подписаться
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/8db0a905-2900-47c4-8cf3-39a798b1fa14/files/c7e784e0-be8b-405a-b0ad-1512a66f2939.jpg)`, opacity: 0.35 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 30% 40%, rgba(168,85,247,0.25) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(0,207,255,0.2) 0%, transparent 60%), linear-gradient(to bottom, transparent 60%, #050714 100%)" }}
        />
        <div className="absolute top-1/4 right-10 w-64 h-64 rounded-full animate-float" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute bottom-1/3 left-10 w-48 h-48 rounded-full animate-float" style={{ background: "radial-gradient(circle, rgba(0,207,255,0.2) 0%, transparent 70%)", filter: "blur(30px)", animationDelay: "2s" }} />
        <Particles />

        <div ref={heroRef} className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-20">
          <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-2 mb-8 animate-fade-in-up" style={{ border: "1px solid rgba(0,207,255,0.2)" }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00cfff" }} />
            <span className="text-sm text-gray-300">Уже 12 000+ подписчиков</span>
          </div>

          <h1 className="font-black leading-tight mb-6 animate-fade-in-up delay-200" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}>
            <span className="text-white">Контент, который</span><br />
            <span className="text-gradient">меняет мышление</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-300">
            Telegram-канал с эксклюзивными материалами, аналитикой и практическими советами для тех, кто хочет расти быстрее.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-400">
            <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="tg-button animate-pulse-glow flex items-center gap-3 text-white font-bold text-lg px-10 py-4 rounded-2xl">
              <Icon name="Send" size={22} />
              Подписаться бесплатно
            </a>
            <a href="#about" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 text-base font-medium">
              Узнать подробнее
              <Icon name="ArrowDown" size={18} />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-fade-in-up delay-500">
            {STATS.map((s, i) => (
              <div key={i} className="glass rounded-2xl p-4 text-center feature-card">
                <div className="text-3xl font-black mb-1" style={{ fontFamily: "Montserrat, sans-serif", background: "linear-gradient(135deg,#00cfff,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {s.value}
                </div>
                <div className="text-xs text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs text-gray-400">Прокрути вниз</span>
          <div className="w-5 h-8 rounded-full border border-gray-600 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full animate-bounce" style={{ background: "#00cfff" }} />
          </div>
        </div>
      </section>

      {/* О КАНАЛЕ */}
      <section id="about" className="py-28 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(168,85,247,0.07) 0%, transparent 60%)" }} />
        <div ref={aboutRef} className="max-w-6xl mx-auto px-6 reveal" style={{ transition: "opacity 1s ease, transform 1s ease" }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4 text-sm font-semibold" style={{ color: "#a855f7" }}>
                <div className="w-8 h-px" style={{ background: "linear-gradient(90deg,#a855f7,transparent)" }} />
                О канале
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Зачем читать <span className="text-gradient">именно нас?</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Мы создаём контент для людей, которые ценят своё время. Никакой воды — только конкретика, факты и инсайты от практика с многолетним опытом.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Каждый пост — это маленький прорыв. Мы анализируем сотни источников, чтобы доставить вам только самое важное в удобном формате.
              </p>
              <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 tg-button text-white font-semibold px-7 py-3.5 rounded-xl">
                <Icon name="Send" size={18} />
                Открыть канал
              </a>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl animate-spin-slow opacity-20" style={{ background: "conic-gradient(from 0deg, #00cfff, #a855f7, #ec4899, #00cfff)", filter: "blur(2px)" }} />
              <div className="relative glass rounded-3xl p-6 space-y-4">
                {[
                  { emoji: "🔥", title: "Топ-10 инструментов 2025", time: "2 часа назад", views: "4.2K" },
                  { emoji: "📊", title: "Разбор кейса: рост x3 за месяц", time: "вчера", views: "8.7K" },
                  { emoji: "💡", title: "Почему большинство делает это неправильно", time: "2 дня назад", views: "12.1K" },
                ].map((post, i) => (
                  <div key={i} className="glass-light rounded-2xl p-4 flex items-center gap-4 feature-card cursor-pointer">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "rgba(255,255,255,0.05)" }}>
                      {post.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">{post.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{post.time}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
                      <Icon name="Eye" size={12} />
                      {post.views}
                    </div>
                  </div>
                ))}
                <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="block text-center text-sm py-2" style={{ color: "#00cfff" }}>
                  Смотреть все посты →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ПРЕИМУЩЕСТВА */}
      <section id="features" className="py-28 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(0,207,255,0.06) 0%, transparent 60%)" }} />
        <div className="max-w-6xl mx-auto px-6">
          <div ref={featuresRef} className="text-center mb-16 reveal" style={{ transition: "opacity 1s ease" }}>
            <div className="inline-flex items-center gap-2 mb-4 text-sm font-semibold" style={{ color: "#00cfff" }}>
              <div className="w-8 h-px" style={{ background: "linear-gradient(90deg,#00cfff,transparent)" }} />
              Преимущества
              <div className="w-8 h-px" style={{ background: "linear-gradient(270deg,#00cfff,transparent)" }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Почему <span className="text-gradient">12 000 человек</span><br />уже с нами?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="glass rounded-3xl p-7 feature-card" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: `${f.color}18`, border: `1px solid ${f.color}30`, boxShadow: `0 0 20px ${f.color}20` }}>
                  <Icon name={f.icon} size={26} style={{ color: f.color }} />
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(0,207,255,0.12), rgba(168,85,247,0.12))", border: "1px solid rgba(0,207,255,0.2)" }}>
            <div className="absolute inset-0 animate-shimmer pointer-events-none" style={{ opacity: 0.5 }} />
            <h3 className="text-3xl md:text-4xl font-black mb-4 text-white" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Присоединяйтесь прямо сейчас
            </h3>
            <p className="text-gray-400 mb-8 text-lg">Бесплатная подписка за один клик</p>
            <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 tg-button animate-pulse-glow text-white font-bold text-lg px-12 py-4 rounded-2xl">
              <Icon name="Send" size={22} />
              Подписаться в Telegram
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-28">
        <div className="max-w-3xl mx-auto px-6">
          <div ref={faqRef} className="text-center mb-14 reveal" style={{ transition: "opacity 1s ease" }}>
            <div className="inline-flex items-center gap-2 mb-4 text-sm font-semibold" style={{ color: "#ec4899" }}>
              <div className="w-8 h-px" style={{ background: "linear-gradient(90deg,#ec4899,transparent)" }} />
              Вопросы и ответы
              <div className="w-8 h-px" style={{ background: "linear-gradient(270deg,#ec4899,transparent)" }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Часто задаваемые <span className="text-gradient">вопросы</span>
            </h2>
          </div>
          {FAQS.map((item, i) => (
            <FaqItem key={i} {...item} idx={i} />
          ))}
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section id="contacts" className="py-28 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(168,85,247,0.08) 0%, transparent 70%)" }} />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div ref={contactsRef} className="reveal" style={{ transition: "opacity 1s ease" }}>
            <div className="inline-flex items-center gap-2 mb-4 text-sm font-semibold" style={{ color: "#a855f7" }}>
              <div className="w-8 h-px" style={{ background: "linear-gradient(90deg,#a855f7,transparent)" }} />
              Контакты
              <div className="w-8 h-px" style={{ background: "linear-gradient(270deg,#a855f7,transparent)" }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Есть вопросы? <span className="text-gradient">Напишите нам</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
              Мы всегда на связи в Telegram. Отвечаем быстро и по делу.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { icon: "Send", label: "Telegram канал", value: "@your_channel", href: TG_LINK, color: "#00cfff" },
                { icon: "MessageCircle", label: "Чат поддержки", value: "@your_support", href: TG_LINK, color: "#a855f7" },
                { icon: "Mail", label: "Email", value: "hello@example.com", href: "mailto:hello@example.com", color: "#ec4899" },
              ].map((c, i) => (
                <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" className="glass rounded-3xl p-6 flex flex-col items-center gap-3 feature-card" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${c.color}15`, border: `1px solid ${c.color}25` }}>
                    <Icon name={c.icon} size={24} style={{ color: c.color }} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">{c.label}</p>
                    <p className="text-white font-semibold text-sm">{c.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 tg-button animate-pulse-glow text-white font-bold text-xl px-14 py-5 rounded-2xl">
              <Icon name="Send" size={24} />
              Подписаться на канал
            </a>
          </div>
        </div>
      </section>

      {/* ФУТЕР */}
      <footer className="py-8 border-t text-center" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <p className="text-gray-600 text-sm">
          © 2025 Дизайнер, Креатор, Инфографика · Сделано с <span className="text-neon-violet">♥</span> в Telegram
        </p>
      </footer>
    </div>
  );
}