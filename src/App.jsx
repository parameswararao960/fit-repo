import React, { useState, useEffect, useCallback } from "react";
import {
  Dumbbell,
  Trophy,
  Award,
  Star,
  Calendar,
  Clock,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Quote,
  CheckCircle2,
  TrendingUp,
  Users,
  Instagram,
  ArrowRight,
  Image as ImageIcon,
  Sparkles,
  Maximize2,
  ArrowUp,
  Check,
  ShieldCheck,
  Plus,
  Minus,
} from "lucide-react";
import CalendlyBooking from "./CalendlyBooking";

/* =========================================================================
   DESIGN TOKENS & UTILS
   ========================================================================= */
const C = {
  bg: "var(--color-bg)",
  surface: "var(--color-surface)",
  surfaceAlt: "var(--color-surface-alt)",
  card: "var(--color-card)",
  cardHover: "var(--color-card-hover)",
  border: "var(--color-border)",
  borderSoft: "var(--color-border-soft)",
  text: "var(--color-text)",
  textDim: "var(--color-text-dim)",
  textMute: "var(--color-text-mute)",
  volt: "var(--color-volt)",
  voltDim: "var(--color-volt-dim)",
  voltGlow: "var(--color-volt-glow)",
  ember: "var(--color-ember)",
  emberGlow: "var(--color-ember-glow)",
};

const fontDisplay = { fontFamily: "'Anton', sans-serif" };
const fontMono = { fontFamily: "'Space Mono', monospace" };
const fontBody = { fontFamily: "'Inter', sans-serif" };

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');`;

/* =========================================================================
   CLIENT TRANSFORMATIONS DATA
   ========================================================================= */
const TRANSFORMATIONS_ITEMS = [
  {
    id: "t1",
    type: "image",
    category: "recomp",
    title: "Transformation 1",
    tag: "FAT LOSS & MUSCLE GAIN",
    thumbnail: "/images/transformation1.jpg",
    metric: "12-WEEK PHYSIQUE RECOMP",
    desc: "Achieved significant body recomposition with structured strength training and progressive overload.",
  },
  {
    id: "t2",
    type: "image",
    category: "strength",
    title: "Transformation 2",
    tag: "STRENGTH & PERFORMANCE",
    thumbnail: "/images/transformation2.png",
    metric: "16-WEEK BULK & POWERBUILD",
    desc: "Increased lifting total while gaining solid muscle mass and improving relative lifting biomechanics.",
  },
  {
    id: "t3",
    type: "image",
    category: "recomp",
    title: "Transformation 3",
    tag: "FAT LOSS & MOBILITY",
    thumbnail: "/images/transformation3.png",
    metric: "14-WEEK CARDIOVASCULAR SHIFT",
    desc: "Drastically reduced body fat percentage while improving cardiovascular base and mobility.",
  },
  {
    id: "t4",
    type: "image",
    category: "hypertrophy",
    title: "Transformation 4",
    tag: "HYPERTROPHY & DEFINE",
    thumbnail: "/images/transformation4.png",
    metric: "12-WEEK SHRED PROGRAM",
    desc: "Targeted fat loss while preserving lean skeletal muscle tissue and highlighting muscle definition.",
  },
  {
    id: "t5",
    type: "image",
    category: "strength",
    title: "Transformation 5",
    tag: "ATHLETIC CONDITIONING",
    thumbnail: "/images/transformation5.png",
    metric: "20-WEEK ELITE PERFORMANCE RECOMP",
    desc: "Enhanced overall athletic power output, core alignment, and metabolic conditioning.",
  },
  {
    id: "t6",
    type: "image",
    category: "strength",
    title: "Transformation 6",
    tag: "ATHLETIC CONDITIONING",
    thumbnail: "/images/transformation6.jpeg",
    metric: "20-WEEK ELITE PERFORMANCE RECOMP",
    desc: "Enhanced overall athletic power output, core alignment, and metabolic conditioning.",
  },
  {
    id: "t7",
    type: "image",
    category: "strength",
    title: "Transformation 7",
    tag: "ATHLETIC CONDITIONING",
    thumbnail: "/images/transformation7.jpeg",
    metric: "20-WEEK ELITE PERFORMANCE RECOMP",
    desc: "Enhanced overall athletic power output, core alignment, and metabolic conditioning.",
  },
];

/* =========================================================================
   SCROLL PROGRESS BAR
   ========================================================================= */
function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalHeight > 0) {
        setScrollProgress((currentScroll / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none bg-transparent">
      <div
        className="h-full"
        style={{ width: `${scrollProgress}%`, background: C.volt }}
      />
    </div>
  );
}

/* =========================================================================
   SHARED PRIMITIVES
   ========================================================================= */

function Eyebrow({ children }) {
  return (
    <div
      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest mb-4"
      style={{ color: C.volt, ...fontMono }}
    >
      <span style={{ width: 24, height: 2, background: C.volt, display: "inline-block" }} />
      {children}
    </div>
  );
}

function PrimaryButton({ children, onClick, icon: Icon = ArrowRight, type = "button", full = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-7 py-4 text-sm sm:text-base font-extrabold uppercase tracking-wide cursor-pointer rounded-md ${full ? "w-full" : ""
        }`}
      style={{
        background: C.volt,
        color: "#0c0d0e",
        ...fontBody,
      }}
    >
      {children}
      <Icon size={18} />
    </button>
  );
}

function GhostButton({ children, onClick, full = false }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-7 py-4 text-sm sm:text-base font-bold uppercase tracking-wide border cursor-pointer rounded-md hover:border-volt hover:text-volt ${full ? "w-full" : ""
        }`}
      style={{ borderColor: C.border, color: C.text, ...fontBody }}
    >
      {children}
    </button>
  );
}

/* =========================================================================
   TRANSFORMATION LIGHTBOX MODAL
   ========================================================================= */
function TransformationModal({ item, onClose, goConsult }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="relative max-w-4xl w-full my-auto overflow-hidden border rounded-lg"
        style={{ background: C.surface, borderColor: C.border }}
      >
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b bg-theme-surfaceAlt" style={{ borderColor: C.border }}>
          <div className="flex items-center gap-3">
            <span
              className="px-3 py-1 text-xs font-extrabold uppercase tracking-wider rounded-sm"
              style={{ background: C.volt, color: "#0c0d0e", ...fontMono }}
            >
              {item.tag}
            </span>
            <span className="text-xs font-bold" style={{ color: C.textMute, ...fontMono }}>
              VERIFIED CLIENT TRANSFORMATION
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-300 hover:text-white cursor-pointer"
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* Image Showcase Container */}
        <div className="relative bg-black flex items-center justify-center min-h-[280px] max-h-[65vh] overflow-hidden">
          <img src={item.thumbnail} alt={item.title} className="w-full h-full max-h-[65vh] object-contain" />
        </div>

        {/* Bottom Details */}
        <div className="p-6 sm:p-8" style={{ background: C.card }}>
          <h3 className="text-2xl sm:text-3xl uppercase font-bold mb-3" style={{ ...fontDisplay, color: C.text }}>
            {item.title}
          </h3>
          <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: C.textDim, ...fontBody }}>
            {item.desc}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 border-t pt-5" style={{ borderColor: C.border }}>
            <PrimaryButton
              onClick={() => {
                onClose();
                goConsult();
              }}
              full
            >
              Start Your Transformation
            </PrimaryButton>
            <GhostButton onClick={onClose} full>
              Close Showcase
            </GhostButton>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   NAVBAR (ICON ONLY TOGGLE BUTTON)
   ========================================================================= */
function Nav({ page, setPage, goConsult }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (p) => {
    setPage(p);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id) => {
    if (page !== "home") {
      setPage("home");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <>
      <header
        className="sticky top-0 z-40 border-b py-1"
        style={{ backgroundColor: C.bg, borderColor: C.border }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => go("home")} className="flex items-center gap-2.5 cursor-pointer text-left">
            <img
              src="/images/logo.jpeg"
              alt="Team X-Factor Logo"
              className="w-10 h-10 rounded object-cover"
            />
            <div className="flex flex-col text-left justify-center">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight leading-none" style={{ ...fontBody, color: C.text }}>
                TEAM <span style={{ color: C.volt, fontWeight: 700 }}>X-FACTOR</span>
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-wider leading-tight -mt-0.5 opacity-90 ml-0.5" style={{ color: C.textDim, ...fontMono }}>
                by flexwithroshan
              </span>
            </div>
          </button>

          {/* Menu Toggle Button (Icon Only - No text labels) */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen((o) => !o)}
              className="p-2.5 rounded-md border hover:border-volt bg-theme-surfaceAlt cursor-pointer flex items-center justify-center"
              style={{ borderColor: C.border, color: C.text }}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={22} className="text-volt" /> : <Menu size={22} className="text-volt" />}
            </button>
          </div>
        </div>
      </header>

      {/* Instant Side Drawer */}
      {open && (
        <>
          {/* Backdrop Overlay */}
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-black/80"
          />

          {/* Side Drawer Panel */}
          <aside
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[420px] border-l p-6 sm:p-8 flex flex-col justify-between"
            style={{ backgroundColor: C.surface, borderColor: C.border }}
          >
            {/* Side Drawer Header */}
            <div className="flex items-center justify-between pb-6 border-b border-[#2e3238]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-volt" />
                <span className="text-xs font-bold uppercase tracking-widest text-volt" style={{ ...fontMono }}>
                  NAVIGATION MENU
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 text-gray-300 hover:text-white cursor-pointer"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Vertical Links Stack */}
            <div className="flex flex-col gap-3.5 my-auto py-6 mt-0">
              {[
                { num: "01", label: "HOME", action: () => go("home") },
                { num: "02", label: "ACHIEVEMENTS", action: () => scrollToSection("achievements") },
                { num: "03", label: "TRANSFORMATIONS", action: () => scrollToSection("transformations") },
                { num: "04", label: "TESTIMONIALS", action: () => scrollToSection("testimonials") },
              ].map((item) => (
                <button
                  key={item.num}
                  onClick={item.action}
                  className="p-4 rounded-md border text-left hover:border-volt flex items-center justify-between cursor-pointer"
                  style={{ background: C.card, borderColor: C.border }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-volt">{item.num}.</span>
                    <span className="text-base sm:text-lg font-extrabold tracking-wide text-white" style={{ ...fontBody }}>
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight size={18} className="text-gray-500" />
                </button>
              ))}
            </div>

            {/* Side Drawer Footer */}
            <div className="pt-6 border-t border-[#2e3238] flex flex-col gap-3">
              <PrimaryButton onClick={() => { setOpen(false); goConsult(); }} full>
                Book Consultation
              </PrimaryButton>
            </div>
          </aside>
        </>
      )}
    </>
  );
}

/* =========================================================================
   HERO
   ========================================================================= */
function Hero({ goConsult, onOpenMedia }) {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-8 sm:pt-14 pb-8 sm:pb-14 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left Text */}
          <div className="lg:col-span-7">
            <h2
              className="text-5xl sm:text-7xl lg:text-8xl leading-[0.96] uppercase mb-6 tracking-tight"
              style={{ ...fontDisplay, color: C.text }}
            >
              TRANSFORMING ORDINARY
              <br />
              <span style={{ color: C.volt }}>INTO EXTRAORDINARY</span>
            </h2>
            <p className="max-w-xl text-base sm:text-lg mb-9 leading-relaxed" style={{ color: C.textDim, ...fontBody }}>
              Science-backed coaching built on the principles of Dietetics, Applied Nutrition, Exercise Biomechanics, and international bodybuilding experience.
            </p>

            <div className="hidden lg:flex flex-col sm:flex-row gap-4 mb-4">
              <PrimaryButton onClick={goConsult}>
                <div className="flex flex-col items-center text-center leading-tight">
                  <span className="font-extrabold uppercase">Book Consultation</span>
                </div>
              </PrimaryButton>
            </div>
            <div className="hidden lg:block text-xs mb-8 opacity-80 leading-relaxed max-w-lg" style={{ color: C.textDim, ...fontBody }}>
              At Team X-Factor, we combine Dietetics, Applied Nutrition, and Exercise Biomechanics to create personalized nutrition and training plans tailored to your body, lifestyle, and goals for sustainable results.
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-bold" style={{ color: C.textMute, ...fontMono }}>
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} style={{ color: C.volt }} /> 1000+ TRANSFORMATIONS
              </span>
              <span>·</span>
              <span className="flex items-center gap-2">
                <Star size={16} style={{ color: C.volt }} /> 4.3/5 AVERAGE RATING
              </span>
            </div>
          </div>

          {/* Right Media Card */}
          <div className="lg:col-span-5">
            <div
              className="relative overflow-hidden rounded-md border"
              style={{ background: C.card, borderColor: C.border }}
            >
              <div className="relative aspect-[9/13] max-h-[500px] w-full overflow-hidden bg-black mx-auto">
                <iframe
                  src="https://www.youtube.com/embed/E7gEWUEed90?controls=0&rel=0&modestbranding=1&loop=1&playlist=E7gEWUEed90"
                  title="Transformation Video"
                  className="w-full h-[116%] border-0 origin-top"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Mobile-only CTA Button directly below the video card */}
            <div className="flex lg:hidden flex-col gap-4 mt-6">
              <PrimaryButton onClick={goConsult}>
                <div className="flex flex-col items-center text-center leading-tight">
                  <span className="font-extrabold uppercase">Book Consultation</span>
                </div>
              </PrimaryButton>
            </div>
            <div className="flex lg:hidden text-xs mt-3 opacity-80 leading-relaxed text-center" style={{ color: C.textDim, ...fontBody }}>
              At Team X-Factor, we combine Dietetics, Applied Nutrition, and Exercise Biomechanics to create personalized nutrition and training plans tailored to your body, lifestyle, and goals for sustainable results.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   TRAINER ACHIEVEMENTS SECTION
   ========================================================================= */
function StatCard({ icon: Icon, target, suffix = "", label, sub }) {
  return (
    <div className="p-6 sm:p-7 rounded-md border shadow-volt-glow" style={{ background: C.card, borderColor: C.border }}>
      <div className="w-12 h-12 mb-5 rounded bg-volt/10 flex items-center justify-center">
        <Icon size={24} style={{ color: C.volt }} />
      </div>
      <div className="text-4xl sm:text-5xl font-bold mb-2" style={{ ...fontMono, color: C.text }}>
        {target}
        {suffix}
      </div>
      <div className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: C.text, ...fontBody }}>
        {label}
      </div>
      <p className="text-sm leading-relaxed" style={{ color: C.textMute, ...fontBody }}>
        {sub}
      </p>
    </div>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
      <Eyebrow>Team X-factor achievements and track records</Eyebrow>
      <h2 className="text-3xl sm:text-5xl uppercase mb-10 sm:mb-14 max-w-2xl" style={{ ...fontDisplay, color: C.text }}>
        Numbers don't lie
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        <StatCard icon={Trophy} target={8} suffix="+" label="Years Coaching" sub="Helping busy professionals build stronger, leaner physiques through science-backed coaching." />
        <StatCard icon={Users} target={1000} suffix="+" label="Clients Coached" sub="Personalized coaching tailored to every individual's body, lifestyle, and goals." />
        <StatCard icon={TrendingUp} target={94} suffix="%" label="Goal Completion" sub="Every plan is engineered to produce lasting transformations." />
      </div>
    </section>
  );
}

/* =========================================================================
   CREDENTIALS STRIP
   ========================================================================= */
function Credentials() {
  const creds = ["CSCS Certified", "NASM-CPT", "Precision Nutrition L1", "CPR / AED Certified"];
  return (
    <section style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.surface }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 sm:py-6 flex flex-wrap items-center gap-x-10 gap-y-4 justify-between">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.textMute, ...fontMono }}>
          Trainer Credentials
        </span>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {creds.map((c) => (
            <span key={c} className="text-sm sm:text-base font-bold uppercase tracking-wide flex items-center gap-2" style={{ color: C.textDim, ...fontBody }}>
              <Check size={16} className="text-volt" /> {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   EXCLUSIVE CLIENT TRANSFORMATIONS SHOWCASE
   ========================================================================= */
function TransformationsShowcase({ onSelectMedia }) {
  return (
    <section id="transformations" className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
        <div>
          <Eyebrow>Client Transformations Showcase</Eyebrow>
          <h2 className="text-3xl sm:text-5xl uppercase max-w-xl" style={{ ...fontDisplay, color: C.text }}>
            Real Client Transformations
          </h2>
        </div>
        <p className="max-w-md text-sm sm:text-base leading-relaxed" style={{ color: C.textDim, ...fontBody }}>
          Every transformation shown is achieved through personalized coaching, training, and nutrition. Results vary from person to person depending on commitment and lifestyle.
        </p>
      </div>

      {/* Transformations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TRANSFORMATIONS_ITEMS.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-md border bg-black aspect-[4/3] sm:aspect-[14/10] shadow-volt-glow"
            style={{ borderColor: C.border, height: '500px', width: '100%' }}
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================================
   CLIENT TESTIMONIALS SECTION
   ========================================================================= */
function TestimonialCard({ name, role, result, tag, quote, rating = 5 }) {
  return (
    <div className="p-6 sm:p-8 flex flex-col h-full border rounded-md transition-all duration-300 hover:border-volt/30 hover:-translate-y-0.5" style={{ background: C.card, borderColor: C.border }}>
      <div className="flex items-center justify-between mb-4">
        <Quote size={30} style={{ color: C.volt }} />
        <span className="px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider rounded-sm" style={{ background: C.surfaceAlt, color: C.volt, border: `1px solid ${C.border}`, ...fontMono }}>
          {tag}
        </span>
      </div>

      <p className="text-sm sm:text-base leading-relaxed mb-6 flex-1 italic" style={{ color: C.textDim, ...fontBody }}>
        "{quote}"
      </p>

      <div style={{ borderTop: `1px solid ${C.border}` }} className="pt-4 mt-auto">
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} size={15} fill={C.volt} color={C.volt} />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-base font-extrabold" style={{ color: C.text, ...fontBody }}>
              {name}
            </div>
            {role && <div className="text-xs" style={{ color: C.textMute, ...fontMono }}>{role}</div>}
          </div>
          <div className="text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-sm" style={{ background: "rgba(255,90,54,0.15)", color: C.ember, border: `1px solid ${C.ember}`, ...fontMono }}>
            {result}
          </div>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const videoTestimonials = [
    {
      id: "v1",
      src: "/videos/VN20260726_111246.mp4",
      title: "Client Video Review 1",
    },
    {
      id: "v2",
      src: "/videos/VN20260726_111645.mp4",
      title: "Client Video Review 2",
    },
    {
      id: "v3",
      src: "/videos/VN20260726_111558.mp4",
      title: "Client Video Review 3",
    },

  ];

  const total = videoTestimonials.length;

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="max-w-6xl mx-auto px-5 sm:px-8 pb-8 sm:pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
        <div>
          <Eyebrow>TESTIMONIALS</Eyebrow>
          <h2 className="text-3xl sm:text-5xl uppercase max-w-2xl" style={{ ...fontDisplay, color: C.text }}>
            What Clients Say
          </h2>
        </div>
        <div className="p-4 rounded-md border flex items-center gap-4 animate-fade-in" style={{ background: C.card, borderColor: C.border }}>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} fill={C.volt} color={C.volt} />
            ))}
          </div>
          <div>
            <div className="text-sm font-extrabold text-white" style={{ ...fontBody }}>4.3 out of 5 Stars</div>
            <div className="text-xs text-gray-400" style={{ ...fontMono }}>1000+ Verified Clients</div>
          </div>
        </div>
      </div>

      {/* Carousel Wrapper */}
      <div className="relative max-w-3xl mx-auto">
        <div className="overflow-hidden rounded-md">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIdx * 100}%)` }}
          >
            {videoTestimonials.map((v) => (
              <div key={v.id} className="w-full flex-shrink-0 px-2">
                <div className="w-full max-w-sm mx-auto aspect-[9/16] max-h-[680px] rounded-md overflow-hidden bg-black border shadow-volt-glow" style={{ borderColor: C.border }}>
                  <video
                    src={v.src}
                    controls
                    className="w-full h-full object-contain"
                    preload="metadata"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Navigation Bar */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-md border border-volt/20 bg-theme-surfaceAlt text-white hover:border-volt hover:text-volt cursor-pointer transition-colors"
            style={{ borderColor: C.border }}
            aria-label="Previous video"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Indicators Dots */}
          <div className="flex gap-2">
            {videoTestimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${activeIdx === idx ? "bg-volt w-6" : "bg-theme-border w-2"
                  }`}
                style={{ background: activeIdx === idx ? C.volt : C.border }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2.5 rounded-md border border-volt/20 bg-theme-surfaceAlt text-white hover:border-volt hover:text-volt cursor-pointer transition-colors"
            style={{ borderColor: C.border }}
            aria-label="Next video"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   CTA BAND
   ========================================================================= */
function CtaBand({ goConsult }) {
  return (
    <section className="py-10 sm:py-14 relative overflow-hidden" style={{ background: C.surface, borderTop: `1px solid ${C.border}` }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
        <p className="text-base sm:text-base max-w-xl leading-tight" style={{ ...fontBody, color: C.text }}>
          If you're committed to becoming the strongest version of yourself, you're in the right place. Apply now and take the first step toward an extraordinary transformation.
        </p>
        <PrimaryButton onClick={goConsult}>Book Consultation</PrimaryButton>
      </div>
    </section>
  );
}

/* =========================================================================
   FOOTER
   ========================================================================= */
function Footer({ goConsult }) {
  return (
    <footer style={{ borderTop: `1px solid ${C.border}` }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src="/images/logo.jpeg"
              alt="Team X-Force Logo"
              className="w-8 h-8 rounded object-cover"
            />
            <span className="text-base font-extrabold" style={{ color: C.text, ...fontBody }}>
              TEAM X-FORCE
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: C.textMute, ...fontBody }}>
            Powered by the science of Applied Nutrition, Dietetics, and Exercise Biomechanics. Refined through international bodybuilding experience. Designed for extraordinary results.
          </p>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.textMute, ...fontMono }}>
            Contact
          </div>
          <div className="flex flex-col gap-3 text-sm" style={{ color: C.textDim, ...fontBody }}>
            <span className="flex items-center gap-2">
              <Mail size={16} style={{ color: C.volt }} /> teamxfactor7799@gmail.com
            </span>
            <span className="flex items-center gap-2">
              <Phone size={16} style={{ color: C.volt }} /> +91 6304421193
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} style={{ color: C.volt }} /> Hyderabad & Guntur
            </span>
            <span className="flex items-center gap-2">
              <Instagram size={16} style={{ color: C.volt }} /> @flexwithroshan & @teamxfactor__
            </span>
          </div>
        </div>
      </div>
      <div
        className="text-center text-xs py-6"
        style={{ color: C.textMute, borderTop: `1px solid ${C.border}`, ...fontMono }}
      >
        © {new Date().getFullYear()} TEAM X-FORCE. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}

/* =========================================================================
   WHO WE WORK WITH / WHO WE DON'T WORK WITH
   ========================================================================= */
function TargetAudience() {
  const workWith = [
    "Serious individuals committed to long-term transformation",
    "Busy professionals who value expert guidance",
    "Those who want personalized coaching—not one-size-fits-all plans",
    "People ready to trust the process and stay accountable",
  ];

  const dontWorkWith = [
    "People looking for shortcuts",
    "Those unwilling to stay consistent",
    "Anyone expecting results without effort",
    "Those searching for free advice instead of professional coaching",
  ];

  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-12 border-t" style={{ borderColor: C.border }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">

        {/* Who We Work With */}
        <div className="p-6 sm:p-8 rounded-md border flex flex-col justify-between shadow-volt-glow transition-all duration-300 hover:border-volt/30" style={{ background: C.card, borderColor: C.border }}>
          <div>
            <h3 className="text-2xl sm:text-4xl uppercase mb-6" style={{ ...fontDisplay, color: C.text }}>
              Who We Work With
            </h3>
            <ul className="flex flex-col gap-4">
              {workWith.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-volt/15 text-volt mt-0.5">
                    <Check size={12} />
                  </div>
                  <span className="text-sm sm:text-base leading-relaxed" style={{ color: C.textDim, ...fontBody }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Who We Don't Work With */}
        <div className="p-6 sm:p-8 rounded-md border flex flex-col justify-between shadow-ember-glow transition-all duration-300 hover:border-ember/30" style={{ background: C.card, borderColor: C.border }}>
          <div>
            <h3 className="text-2xl sm:text-4xl uppercase mb-6" style={{ ...fontDisplay, color: C.text }}>
              Who We Don't Work With
            </h3>
            <ul className="flex flex-col gap-4">
              {dontWorkWith.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-ember/15 text-ember mt-0.5">
                    <X size={12} />
                  </div>
                  <span className="text-sm sm:text-base leading-relaxed" style={{ color: C.textDim, ...fontBody }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}

/* =========================================================================
   FAQ SECTION
   ========================================================================= */
const FAQ_ITEMS = [
  {
    q: "Is this coaching right for me?",
    a: "Yes—if you're serious about building muscle, losing fat, and improving your physique with a structured, personalized plan. Whether you're a beginner or experienced lifter, your coaching is tailored to your goals and lifestyle."
  },
  {
    q: "I'm busy with work and family. Will this fit my schedule?",
    a: "Absolutely. Your training and nutrition plan is built around your work, travel, family commitments, and available training time, making it realistic and sustainable."
  },
  {
    q: "What kind of results can I expect?",
    a: "Results vary based on your starting point and consistency, but with adherence to the plan, you can expect measurable improvements in strength, body composition, and overall fitness over the coming weeks and months."
  },
  {
    q: "Will I receive a customized training and nutrition plan?",
    a: "Yes. Every program is built specifically for you based on your goals, body, experience level, lifestyle, food preferences, and available equipment. Nothing is generic."
  },
  {
    q: "How much support will I receive?",
    a: "You'll receive regular check-ins, progress reviews, program adjustments, technique feedback, and direct coach support to ensure you're consistently moving toward your goals."
  },
  {
    q: "Can I train from home?",
    a: "Yes. Whether you train at a fully equipped gym or at home with limited equipment, your program will be designed to maximize results with what you have available."
  },
  {
    q: "What makes Team X-Factor different from other online coaches?",
    a: "We don't believe in copy-paste programs. Every decision—from training and nutrition to recovery and progression—is personalized using evidence-based methods to help you achieve lasting results."
  },
  {
    q: "How do I get started?",
    a: "Book your consultation, we'll discuss your goals, current situation, and expectations. If we're the right fit, we'll create a personalized roadmap and start building your transformation together."
  }
];

function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-5 sm:px-8 py-10 sm:py-16">
      <h2 className="text-3xl sm:text-5xl uppercase mb-10 text-left" style={{ ...fontDisplay, color: C.text }}>
        Got Questions?
      </h2>
      <div className="flex flex-col gap-4">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = activeIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-md border overflow-hidden transition-all duration-300 shadow-volt-glow"
              style={{ background: C.card, borderColor: C.border }}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-theme-surfaceAlt"
                aria-expanded={isOpen}
              >
                <span className="text-base sm:text-lg font-bold text-white flex items-start gap-3" style={{ ...fontBody }}>
                  {item.q}
                </span>
                <span className="ml-4 flex-shrink-0 text-volt">
                  {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-96 opacity-100 border-t" : "max-h-0 opacity-0"
                  }`}
                style={{ borderColor: C.border }}
              >
                <p className="p-6 text-sm sm:text-base leading-relaxed" style={{ color: C.textDim, ...fontBody }}>
                  {item.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* =========================================================================
   HOME PAGE
   ========================================================================= */
function HomePage({ goConsult, onSelectMedia }) {
  return (
    <>
      <Hero goConsult={goConsult} onOpenMedia={onSelectMedia} />
      <Achievements />
      {/* <Credentials /> */}
      <TransformationsShowcase onSelectMedia={onSelectMedia} />
      <Testimonials />
      <TargetAudience />
      <Faq />
      <CtaBand goConsult={goConsult} />
    </>
  );
}

/* =========================================================================
   CONSULTATION PAGE
   ========================================================================= */
const GOALS = ["Fat Loss", "Muscle Gain", "Strength & Performance", "General Health", "Sport-Specific", "Other"];
const TIMES = ["Morning (7–10am)", "Midday (10am–2pm)", "Afternoon (2–5pm)", "Evening (5–8pm)"];

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.textMute, ...fontMono }}>
        {label}
      </span>
      {children}
    </label>
  );
}

const inputStyle = {
  background: C.surfaceAlt,
  border: `1px solid ${C.border}`,
  color: C.text,
  ...fontBody,
};
const inputClass = "w-full px-4 py-3 text-sm outline-none focus:border-volt transition-colors rounded-md";

function ConsultationPage() {
  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
      <h1 className="text-4xl sm:text-6xl uppercase mb-4 max-w-2xl leading-[0.95]" style={{ ...fontDisplay, color: C.text }}>
        Book your consultation
      </h1>
      <p className="text-base sm:text-lg max-w-xl mb-12" style={{ color: C.textDim, ...fontBody }}>
        Your transformation starts with a strategy—not guesswork. Book your consultation and receive a personalized roadmap built specifically for your body, goals, and lifestyle.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
        {/* Info column */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            {[
              { icon: Calendar, title: "1. Pick a slot", desc: "Select a date and time from the booking calendar." },
              { icon: Users, title: "2. We Talk Goals", desc: "Discuss your history, injuries, and what is realistic." },
              { icon: Dumbbell, title: "3. Get a Custom Plan", desc: "Walk away with clear next steps, coaching or not." },
            ].map((s) => (
              <div key={s.title} className="flex gap-4">
                <div
                  className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-md"
                  style={{ background: C.card, border: `1px solid ${C.border}` }}
                >
                  <s.icon size={20} style={{ color: C.volt }} />
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-wide mb-1" style={{ color: C.text, ...fontBody }}>
                    {s.title}
                  </div>
                  <div className="text-sm" style={{ color: C.textMute, ...fontBody }}>
                    {s.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="p-6 rounded-md border" style={{ background: C.card, borderColor: C.border }}>
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.textMute, ...fontMono }}>
              Direct Contact
            </div>
            <div className="flex flex-col gap-3 text-sm" style={{ color: C.textDim, ...fontBody }}>
              <span className="flex items-center gap-2">
                <Mail size={16} style={{ color: C.volt }} /> coach@alexrivera.fit
              </span>
              <span className="flex items-center gap-2">
                <Phone size={16} style={{ color: C.volt }} /> (555) 010-2938
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} style={{ color: C.volt }} /> Replies within 24 hours
              </span>
            </div>
          </div> */}
        </div>

        {/* Calendly booking column */}
        <div className="lg:col-span-3 rounded-md border overflow-hidden p-2 w-full max-w-full" style={{ background: C.card, borderColor: C.border }}>
          <CalendlyBooking />
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   FLOATING ACTION BUTTON & BACK TO TOP
   ========================================================================= */
function FloatingControls({ onScrollTop }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      <button
        onClick={onScrollTop}
        className="p-3 rounded-full shadow-2xl border flex items-center justify-center cursor-pointer"
        style={{ background: C.surfaceAlt, borderColor: C.volt, color: C.volt }}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}

/* =========================================================================
   ROOT APP
   ========================================================================= */
export default function App() {
  const [page, setPage] = useState("home");
  const [activeMedia, setActiveMedia] = useState(null);

  const goConsult = () => {
    window.open("https://calendly.com/teamxfactor7799", "_blank", "noopener,noreferrer");
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full relative" style={{ background: C.bg, ...fontBody }}>
      <style>{FONT_IMPORT}</style>
      <ScrollProgress />
      <Nav page={page} setPage={setPage} goConsult={goConsult} />
      {page === "home" ? (
        <HomePage goConsult={goConsult} onSelectMedia={setActiveMedia} />
      ) : (
        <ConsultationPage />
      )}
      <Footer goConsult={goConsult} />
      <FloatingControls onScrollTop={scrollTop} />

      {activeMedia && (
        <TransformationModal
          item={activeMedia}
          onClose={() => setActiveMedia(null)}
          goConsult={goConsult}
        />
      )}
    </div>
  );
}
