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
    title: "Marcus T. — 16-Week Body Recomposition",
    tag: "FAT LOSS & MUSCLE GAIN",
    thumbnail: "/images/transformation.png",
    metric: "-32 LBS FAT · +12 LBS MUSCLE",
    desc: "Marcus dropped 32 lbs of body fat while increasing his total squat and deadlift numbers through progressive tension overload.",
  },
  {
    id: "t5",
    type: "image",
    category: "strength",
    title: "David K. — Advanced Strength Breakthrough",
    tag: "BENCH & SQUAT PR",
    thumbnail: "/images/coach_hero.png",
    metric: "+25 LB BENCH · +35 LB SQUAT",
    desc: "David broke through a 2-year lifting plateau after biomechanic bracing adjustments.",
  },
  {
    id: "t6",
    type: "image",
    category: "hypertrophy",
    title: "Sarah L. — Mobility & Core Alignment Recomp",
    tag: "POSTURE & CORE",
    thumbnail: "/images/video_poster.png",
    metric: "POSTURE CORRECTION & MOBILITY",
    desc: "Sarah corrected pelvic tilt and shoulder tightness while building functional core stability.",
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
function Nav({ page, setPage }) {
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
          <button onClick={() => go("home")} className="flex items-center gap-2.5 cursor-pointer">
            <img
              src="/images/logo.jpeg"
              alt="Team X-Factor Logo"
              className="w-10 h-10 rounded object-cover"
            />
            <span className="text-lg sm:text-xl font-extrabold tracking-tight" style={{ ...fontBody, color: C.text }}>
              TEAM <span style={{ color: C.volt, fontWeight: 700 }}>X-FACTOR</span>
            </span>
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
              <PrimaryButton onClick={() => go("consult")} full>
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
                  <span className="text-[10px] font-normal tracking-wide normal-case mt-0.5 opacity-90" style={{ ...fontMono }}>
                    limited to only 2 slots per day to ensure quality
                  </span>
                </div>
              </PrimaryButton>
            </div>
            <div className="hidden lg:block text-xs mb-8 opacity-80 leading-relaxed max-w-lg" style={{ color: C.textDim, ...fontBody }}>
              At Team X-Factor, we combine Dietetics, Applied Nutrition, and Exercise Biomechanics to create personalized nutrition and training plans tailored to your body, lifestyle, and goals for sustainable results.
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-bold" style={{ color: C.textMute, ...fontMono }}>
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} style={{ color: C.volt }} /> 250+ TRANSFORMATIONS
              </span>
              <span>·</span>
              <span className="flex items-center gap-2">
                <Star size={16} style={{ color: C.volt }} /> 4.9/5 AVERAGE RATING
              </span>
            </div>
          </div>

          {/* Right Media Card */}
          <div className="lg:col-span-5">
            <div
              className="relative cursor-pointer overflow-hidden rounded-md border"
              style={{ background: C.card, borderColor: C.border }}
              onClick={() => onOpenMedia(TRANSFORMATIONS_ITEMS[0])}
            >
              <div className="relative aspect-[4/3] sm:aspect-[14/10] overflow-hidden bg-black">
                <img
                  src="/images/transformation.png"
                  alt="Client Transformation Marcus T."
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Zoom Button Badge */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
                    style={{ background: C.volt, color: "#0c0d0e" }}
                  >
                    <Maximize2 size={24} className="text-black" />
                  </div>
                </div>

                {/* Top Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span
                    className="px-3 py-1 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow rounded-sm"
                    style={{ background: C.ember, color: C.text, ...fontMono }}
                  >
                    SPOTLIGHT TRANSFORMATION
                  </span>
                </div>

                {/* Bottom Overlay Text */}
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: C.volt, ...fontMono }}>
                    Marcus T. (-32 LBS Fat · +12 LBS Muscle)
                  </div>
                  <div className="text-sm font-bold text-white leading-snug" style={{ ...fontBody }}>
                    Click to view full 16-week strength &amp; physique recomp details
                  </div>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between border-t" style={{ borderColor: C.border, background: C.surfaceAlt }}>
                <span className="text-xs font-bold uppercase" style={{ color: C.textDim, ...fontMono }}>
                  Verified 16-Week Recomp
                </span>
                <span className="text-xs font-extrabold uppercase tracking-wide flex items-center gap-1" style={{ color: C.volt, ...fontMono }}>
                  View Details <ArrowRight size={14} />
                </span>
              </div>
            </div>

            {/* Mobile-only CTA Button directly below the video card */}
            <div className="flex lg:hidden flex-col gap-4 mt-6">
              <PrimaryButton onClick={goConsult}>
                <div className="flex flex-col items-center text-center leading-tight">
                  <span className="font-extrabold uppercase">Book Consultation</span>
                  <span className="text-[10px] font-normal tracking-wide normal-case mt-0.5 opacity-90" style={{ ...fontMono }}>
                    limited to only 2 slots per day to ensure quality
                  </span>
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
      <Eyebrow>About Team X-factor achievements and track records</Eyebrow>
      <h2 className="text-3xl sm:text-5xl uppercase mb-10 sm:mb-14 max-w-2xl" style={{ ...fontDisplay, color: C.text }}>
        Numbers don't lie
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        <StatCard icon={Trophy} target={8} suffix="+" label="Years Coaching" sub="Strength, hypertrophy & fat-loss programming for real schedules." />
        <StatCard icon={Users} target={250} suffix="+" label="Clients Coached" sub="Transformed through individualized 1-on-1 programming." />
        <StatCard icon={TrendingUp} target={94} suffix="%" label="Goal Completion" sub="Of clients hit their primary 12-week goal on schedule." />
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
  const [filter, setFilter] = useState("all");

  const filteredItems = TRANSFORMATIONS_ITEMS.filter((item) => {
    if (filter === "all") return true;
    if (filter === "recomp") return item.category === "recomp";
    if (filter === "strength") return item.category === "strength";
    if (filter === "hypertrophy") return item.category === "hypertrophy";
    return true;
  });

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
          See real body recomp results, fat-loss milestones, and strength PR transformations from 1-on-1 coaching.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-10 pb-4 border-b" style={{ borderColor: C.border }}>
        {[
          { id: "all", label: "All Transformations", icon: ImageIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-md cursor-pointer"
              style={{
                background: active ? C.volt : C.surface,
                color: active ? "#0c0d0e" : C.textDim,
                border: `1px solid ${active ? C.volt : C.border}`,
                ...fontMono,
              }}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Transformations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectMedia(item)}
            className="group cursor-pointer flex flex-col h-full border rounded-md overflow-hidden"
            style={{ background: C.card, borderColor: C.border }}
          >
            {/* Thumbnail Box */}
            <div className="relative aspect-[16/10] overflow-hidden bg-black">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Tag Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span
                  className="px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider rounded-sm"
                  style={{ background: C.surfaceAlt, color: C.volt, border: `1px solid ${C.border}`, ...fontMono }}
                >
                  {item.tag}
                </span>
              </div>

              {/* Photo Indicator */}
              <div className="absolute top-3 right-3">
                <span
                  className="px-2 py-0.5 text-[11px] font-bold tracking-wider flex items-center gap-1 rounded-sm"
                  style={{ background: "rgba(0,0,0,0.8)", color: C.text, ...fontMono }}
                >
                  <ImageIcon size={12} style={{ color: C.volt }} /> TRANSFORMATION
                </span>
              </div>

              {/* Expand Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-13 h-13 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.9)", color: "#0c0d0e" }}
                >
                  <Maximize2 size={20} className="text-black" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-lg font-bold uppercase mb-2 leading-snug" style={{ ...fontBody, color: C.text }}>
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4" style={{ color: C.textMute, ...fontBody }}>
                  {item.desc}
                </p>
              </div>

              {item.metric && (
                <div className="pt-3 border-t text-xs font-bold uppercase tracking-wider" style={{ borderColor: C.border, color: C.ember, ...fontMono }}>
                  {item.metric}
                </div>
              )}
            </div>
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

  const testimonialsData = [
    {
      name: "Jordan M.",
      role: "Corporate Executive · Austin, TX",
      tag: "Body Recomposition",
      result: "-32 LBS · 16 WEEKS",
      quote:
        "Alex didn't just hand me a generic spreadsheet. Every four weeks the plan evolved as my strength and body composition changed. First coach who actually paid attention to my busy schedule, work travel, and joint health.",
    },
    {
      name: "Priya S.",
      role: "Software Engineer · Remote",
      tag: "Heavy Strength PR",
      result: "+80 LB DEADLIFT PR",
      quote:
        "I came in wanting to get stronger without wrecking my lower back or knees. Alex's programming was smart, patient, and methodical. Hit an 80 lb deadlift PR completely pain-free.",
    },
    {
      name: "Marcus T.",
      role: "Endurance Athlete · Austin, TX",
      tag: "Hybrid Athletics",
      result: "SUB-4 MARATHON & PR",
      quote:
        "Combining heavy strength work alongside marathon training sounded risky until I worked with Alex. Faster marathon finish time, zero injuries, and gained noticeable leg power.",
    },
    {
      name: "Elena R.",
      role: "Design Lead · Remote",
      tag: "Physique Transformation",
      result: "-22 LBS · 12 WEEKS",
      quote:
        "The nutrition guidance was a complete game changer — no restrictive starvation diets, just sustainable macro tracking and strength progression that built confidence I've never felt before.",
    },
    {
      name: "David K.",
      role: "Former Athlete · Austin, TX",
      tag: "Advanced Strength",
      result: "+25 LB BENCH & SQUAT",
      quote:
        "After hitting a 2-year plateau on my main lifts, Alex analyzed my bar path, corrected my bracing, and broke through my plateaus within the first month of coaching.",
    },
    {
      name: "Sarah L.",
      role: "Physical Therapist · Austin, TX",
      tag: "Injury Prevention",
      result: "PAIN-FREE MOBILITY",
      quote:
        "As a healthcare professional, I'm extremely picky about strength coaches. Alex's understanding of human biomechanics, mobility, and progressive overload is top tier.",
    },
  ];

  const total = testimonialsData.length;

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIdx, total]);

  return (
    <section id="testimonials" className="max-w-6xl mx-auto px-5 sm:px-8 pb-8 sm:pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
        <div>
          <Eyebrow>TRANSFORMATIONS &amp; TESTIMONIALS</Eyebrow>
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
            <div className="text-sm font-extrabold text-white" style={{ ...fontBody }}>4.9 out of 5 Stars</div>
            <div className="text-xs text-gray-400" style={{ ...fontMono }}>250+ Verified Clients</div>
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
            {testimonialsData.map((t) => (
              <div key={t.name} className="w-full flex-shrink-0">
                <TestimonialCard {...t} />
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
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Indicators Dots */}
          <div className="flex gap-2">
            {testimonialsData.map((_, idx) => (
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
            aria-label="Next testimonial"
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
        <h2 className="text-3xl sm:text-5xl uppercase max-w-xl leading-tight" style={{ ...fontDisplay, color: C.text }}>
          If you're committed to becoming the strongest version of yourself, you're in the right place. Apply now and take the first step toward an extraordinary transformation.
        </h2>
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
            1-on-1 strength &amp; performance coaching, in-person and online. Tailored programming for real body transformations.
          </p>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.textMute, ...fontMono }}>
            Contact
          </div>
          <div className="flex flex-col gap-3 text-sm" style={{ color: C.textDim, ...fontBody }}>
            <span className="flex items-center gap-2">
              <Mail size={16} style={{ color: C.volt }} /> coach@alexrivera.fit
            </span>
            <span className="flex items-center gap-2">
              <Phone size={16} style={{ color: C.volt }} /> (555) 010-2938
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} style={{ color: C.volt }} /> Austin, TX · In-person &amp; online
            </span>
            <span className="flex items-center gap-2">
              <Instagram size={16} style={{ color: C.volt }} /> @alexrivera.coaching
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
        No pressure, no pitch. Just a real conversation about where you are, where you want to be,
        and whether coaching together makes sense.
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

          <div className="p-6 rounded-md border" style={{ background: C.card, borderColor: C.border }}>
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
          </div>
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
    setPage("consult");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full relative" style={{ background: C.bg, ...fontBody }}>
      <style>{FONT_IMPORT}</style>
      <ScrollProgress />
      <Nav page={page} setPage={setPage} />
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
