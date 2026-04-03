import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-fade]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav
        className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 pt-[env(safe-area-inset-top)]"
        aria-label="Navegação principal"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-5 py-3 sm:py-4 flex justify-between items-center gap-3 min-h-14">
          <button
            type="button"
            onClick={() => scrollToSection("hero")}
            className="text-left text-xl sm:text-2xl font-bold shrink-0 min-h-11 min-w-0 py-2 -my-1"
            style={{ color: "#E85D04" }}
          >
            Sabor da Vila
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 lg:gap-8 items-center">
            {["sobre", "menu", "testemunhos", "contacto"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => scrollToSection(item)}
                className="font-bold capitalize hover:text-orange-600 transition-colors text-sm lg:text-base"
                style={{ color: "#1A1008" }}
              >
                {item === "testemunhos" ? "Opiniões" : item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center size-11 rounded-lg -mr-1 text-[#1A1008] hover:bg-gray-100 active:bg-gray-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-menu"
            className="md:hidden bg-white border-t flex flex-col gap-1 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
          >
            {["sobre", "menu", "testemunhos", "contacto"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => scrollToSection(item)}
                className="font-bold capitalize text-left min-h-12 px-2 rounded-lg hover:bg-gray-50 active:bg-gray-100"
                style={{ color: "#1A1008" }}
              >
                {item === "testemunhos" ? "Opiniões" : item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        className="min-h-dvh w-full bg-cover bg-center flex flex-col justify-center items-center text-center text-white pt-[calc(3.5rem+env(safe-area-inset-top))] pb-10 px-4 sm:px-6"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,5,0,0.55), rgba(10,5,0,0.55)), url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        data-fade
        id="hero"
      >
        <div
          className={`max-w-3xl mx-auto transition-all duration-700 ${
            visibleElements.has("hero")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xs sm:text-sm font-bold tracking-[0.2em] sm:tracking-widest mb-3 sm:mb-4 uppercase px-1">
            Restaurante em Lisboa
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 font-serif leading-tight">
            Sabor da Vila
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light mb-6 sm:mb-8 text-white/95 px-1">
            Comida caseira com sabor tradicional
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center w-full max-w-md sm:max-w-none mx-auto">
            <Button
              type="button"
              onClick={() => scrollToSection("contacto")}
              className="w-full sm:w-auto min-h-12 px-8 py-3 rounded-full font-bold text-base"
              style={{ backgroundColor: "#E85D04", color: "white" }}
            >
              Reservar Mesa
            </Button>
            <Button
              type="button"
              onClick={() => scrollToSection("menu")}
              variant="outline"
              className="w-full sm:w-auto min-h-12 px-8 py-3 rounded-full font-bold text-base text-white border-2 border-white bg-white/10 hover:bg-white hover:text-gray-900 backdrop-blur-sm"
            >
              Ver Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="py-14 sm:py-20 px-4 sm:px-5 max-w-6xl mx-auto" data-fade>
        <div
          className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center transition-all duration-700 ${
            visibleElements.has("sobre")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="order-2 md:order-1">
            <p className="font-bold uppercase tracking-wider mb-2 text-sm sm:text-base" style={{ color: "#E85D04" }}>
              A Nossa História
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-serif leading-snug">
              Tradição à mesa, família no coração
            </h2>
            <p className="text-gray-700 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg">
              No Sabor da Vila, combinamos ingredientes frescos e receitas
              tradicionais para criar momentos de sabor inesquecíveis. Ambiente
              familiar e acolhedor, perfeito para toda a família.
            </p>
            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              <div>
                <p className="text-xl sm:text-2xl font-bold" style={{ color: "#E85D04" }}>
                  12+
                </p>
                <p className="text-xs sm:text-sm text-gray-600 leading-tight">Anos de história</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold" style={{ color: "#E85D04" }}>
                  500+
                </p>
                <p className="text-xs sm:text-sm text-gray-600 leading-tight">Clientes felizes</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold" style={{ color: "#E85D04" }}>
                  100%
                </p>
                <p className="text-xs sm:text-sm text-gray-600 leading-tight">Receitas caseiras</p>
              </div>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop"
            alt="Cozinha tradicional"
            className="order-1 md:order-2 rounded-2xl w-full h-56 sm:h-72 md:h-96 object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-14 sm:py-20 px-4 sm:px-5 bg-gray-50" data-fade>
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-8 sm:mb-12 px-1 transition-all duration-700 ${
              visibleElements.has("menu")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-bold uppercase tracking-wider mb-2 text-sm sm:text-base" style={{ color: "#E85D04" }}>
              Os Nossos Pratos
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif leading-snug">
              O Melhor da Cozinha Portuguesa
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                img: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=600&auto=format&fit=crop",
                title: "Bacalhau à Vila",
                desc: "Bacalhau fresco com batatas e legumes da época",
                badge: "Prato Principal",
              },
              {
                img: "https://images.unsplash.com/photo-1527477399490-64bcd8844763?w=600&auto=format&fit=crop",
                title: "Frango de Churrasco",
                desc: "Marinado com ervas aromáticas e grelhado na perfeição",
                badge: "Prato Principal",
              },
              {
                img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop",
                title: "Sopa do Dia",
                desc: "Sempre fresca e caseira, confeccionada diariamente",
                badge: "Entrada",
              },
              {
                img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop",
                title: "Sobremesas",
                desc: "Doçaria tradicional feita na casa",
                badge: "Sobremesa",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm md:hover:shadow-lg md:hover:-translate-y-2 transition-all duration-300 ${
                  visibleElements.has("menu")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${idx * 80}ms`,
                }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-44 sm:h-48 object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="p-4">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2"
                    style={{ backgroundColor: "#FFF8F0", color: "#E85D04" }}
                  >
                    {item.badge}
                  </span>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios Section */}
      <section
        id="beneficios"
        className="py-14 sm:py-20 px-4 sm:px-5"
        style={{ backgroundColor: "#E85D04" }}
        data-fade
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-8 md:gap-12 text-white text-center">
            {[
              {
                icon: "🍃",
                title: "Ingredientes Frescos",
                desc: "Selecionados diariamente nos melhores mercados locais",
              },
              {
                icon: "🏠",
                title: "Ambiente Acolhedor",
                desc: "Um espaço familiar e confortável para toda a família",
              },
              {
                icon: "⚡",
                title: "Serviço Rápido",
                desc: "Atendimento eficiente porque o seu tempo importa",
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className={`transition-all duration-700 max-w-sm mx-auto ${
                  visibleElements.has("beneficios")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${idx * 80}ms`,
                }}
              >
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4" aria-hidden>
                  {benefit.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm opacity-90 leading-relaxed px-1">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testemunhos Section */}
      <section id="testemunhos" className="py-14 sm:py-20 px-4 sm:px-5 bg-white" data-fade>
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-8 sm:mb-12 px-1 transition-all duration-700 ${
              visibleElements.has("testemunhos")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-bold uppercase tracking-wider mb-2 text-sm sm:text-base" style={{ color: "#E85D04" }}>
              Testemunhos
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif leading-snug">
              O que dizem os nossos clientes
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                quote: "Melhor restaurante da zona! Atendimento impecável.",
                author: "Ana P.",
              },
              {
                quote: "Comida caseira como a da minha avó!",
                author: "João R.",
              },
              {
                quote: "Adoro a sopa do dia, sempre diferente e deliciosa.",
                author: "Maria C.",
              },
            ].map((test, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border-2 relative transition-all duration-700 ${
                  visibleElements.has("testemunhos")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  backgroundColor: "#FFF8F0",
                  borderColor: "#E85D04",
                  transitionDelay: `${idx * 80}ms`,
                }}
              >
                <div
                  className="absolute top-2 right-4 text-4xl opacity-20"
                  style={{ color: "#E85D04" }}
                >
                  "
                </div>
                <p className="text-yellow-500 mb-3">★★★★★</p>
                <p className="italic mb-4 text-gray-700">"{test.quote}"</p>
                <p className="font-bold">— {test.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto Section */}
      <section
        id="contacto"
        className="py-14 sm:py-20 px-4 sm:px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))]"
        style={{ backgroundColor: "#1A1008" }}
        data-fade
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 text-white">
            <div
              className={`transition-all duration-700 ${
                visibleElements.has("contacto")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <p className="font-bold uppercase tracking-wider mb-2 text-sm sm:text-base" style={{ color: "#E85D04" }}>
                Fale Connosco
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 font-serif leading-snug">
                Venha Visitar-nos
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(232, 93, 4, 0.2)" }}
                  >
                    <span style={{ color: "#E85D04" }}>📞</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm uppercase" style={{ color: "#E85D04" }}>
                      Telefone
                    </p>
                    <p>912 345 678</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(232, 93, 4, 0.2)" }}
                  >
                    <span style={{ color: "#E85D04" }}>📍</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm uppercase" style={{ color: "#E85D04" }}>
                      Morada
                    </p>
                    <p>Rua das Flores, 24, Lisboa</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(232, 93, 4, 0.2)" }}
                  >
                    <span style={{ color: "#E85D04" }}>🕐</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm uppercase" style={{ color: "#E85D04" }}>
                      Horário
                    </p>
                    <p>Segunda a Domingo · 12h – 22h</p>
                  </div>
                </div>
              </div>

              <a
                href="tel:912345678"
                className="inline-flex items-center justify-center w-full sm:w-auto mt-6 sm:mt-8 min-h-12 px-8 py-3 rounded-full font-bold text-white text-center transition-all hover:opacity-90 active:opacity-80"
                style={{ backgroundColor: "#E85D04" }}
              >
                📞 Ligar Agora
              </a>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Rua+das+Flores+24+Lisboa"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-2xl border-2 border-dashed flex flex-col items-center justify-center min-h-52 sm:min-h-64 md:min-h-72 p-6 hover:opacity-90 active:opacity-80 transition-all duration-700 ${
                visibleElements.has("contacto")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ borderColor: "rgba(255,255,255,0.2)", backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              <div
                className="w-8 h-8 rounded-full mb-4"
                style={{ backgroundColor: "#E85D04" }}
              ></div>
              <p className="font-bold mb-2">Ver no Google Maps</p>
              <p className="text-sm opacity-70">Rua das Flores, 24 · Lisboa</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-6 sm:py-8 px-4 text-sm sm:text-base leading-relaxed pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <p>
          © 2026 <span style={{ color: "#E85D04" }}>Sabor da Vila</span> · Projeto de
          demonstração · Todos os direitos reservados · Feito com ♥ em Lisboa
        </p>
      </footer>
    </div>
  );
}
