import {
  Loader,
  PenLine,
  PlusCircle,
  Trash2,
  CheckCircle2,
  Sparkles,
  Send,
  ChevronDown,
  ChevronUp,
  Hash,
  ListChecks,
  Rocket,
  Star,
  BookOpen,
  Zap,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useTestsStore } from "../stores/useTestsStore";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────
   Cosmos Canvas Background
───────────────────────────────────────── */
const StarCanvas = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.2,
      alpha: Math.random() * 0.55 + 0.2,
      speed: Math.random() * 0.007 + 0.002,
      phase: Math.random() * Math.PI * 2,
      hue: ["#ffffff", "#bfdbfe", "#c4b5fd", "#6ee7b7", "#fde68a"][Math.floor(Math.random() * 5)],
    }));

    let shoots = [];
    let shootTick = 0;
    const mkShoot = () => ({
      x: Math.random() * W * 0.75,
      y: Math.random() * H * 0.35,
      len: 100 + Math.random() * 160,
      spd: 9 + Math.random() * 11,
      angle: Math.PI / 5 + Math.random() * 0.35,
      a: 1,
      alive: true,
    });

    const draw = (t) => {
      ctx.clearRect(0, 0, W, H);
      [
        { x: W * 0.08, y: H * 0.2, r: 280, c: "rgba(99,102,241,0.07)" },
        { x: W * 0.88, y: H * 0.5, r: 320, c: "rgba(16,185,129,0.055)" },
        { x: W * 0.45, y: H * 0.88, r: 250, c: "rgba(139,92,246,0.055)" },
        { x: W * 0.9, y: H * 0.05, r: 180, c: "rgba(56,189,248,0.05)" },
      ].forEach(({ x, y, r, c }) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, c); g.addColorStop(1, "transparent");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      });

      const now = t * 0.001;
      stars.forEach((s) => {
        const a = s.alpha * (0.6 + 0.4 * Math.sin(now * s.speed * 20 + s.phase));
        ctx.globalAlpha = a; ctx.fillStyle = s.hue;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
        if (s.r > 1.1) {
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 6);
          glow.addColorStop(0, s.hue); glow.addColorStop(1, "transparent");
          ctx.globalAlpha = a * 0.35; ctx.fillStyle = glow;
          ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 6, 0, Math.PI * 2); ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      if (++shootTick > 160) { shoots.push(mkShoot()); shootTick = 0; }
      shoots = shoots.filter((s) => s.alive);
      shoots.forEach((s) => {
        const ex = s.x + Math.cos(s.angle) * s.len, ey = s.y + Math.sin(s.angle) * s.len;
        const g = ctx.createLinearGradient(s.x, s.y, ex, ey);
        g.addColorStop(0, "rgba(255,255,255,0)");
        g.addColorStop(0.5, `rgba(255,255,255,${s.a * 0.85})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = g; ctx.lineWidth = 1.4; ctx.globalAlpha = s.a;
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(ex, ey); ctx.stroke();
        ctx.globalAlpha = 1;
        s.x += Math.cos(s.angle) * s.spd; s.y += Math.sin(s.angle) * s.spd;
        s.a -= 0.018;
        if (s.a <= 0 || s.x > W || s.y > H) s.alive = false;
      });
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
};

/* ─────────────────────────────────────────
   Custom Animated Toggle
───────────────────────────────────────── */
const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className="relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0"
    style={{
      background: checked ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.1)",
      boxShadow: checked ? "0 0 16px rgba(99,102,241,0.45)" : "none",
    }}
  >
    <motion.div
      animate={{ x: checked ? 24 : 2 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="absolute top-0.5 w-5 h-5 rounded-full bg-white"
      style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.3)" }}
    />
  </button>
);

/* ─────────────────────────────────────────
   Custom Radio Dot
───────────────────────────────────────── */
const RadioDot = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200"
    style={{
      borderColor: checked ? "#8b5cf6" : "rgba(255,255,255,0.18)",
      background: checked ? "rgba(139,92,246,0.15)" : "transparent",
      boxShadow: checked ? "0 0 12px rgba(139,92,246,0.4)" : "none",
    }}
  >
    <AnimatePresence>
      {checked && (
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: "#a78bfa" }}
        />
      )}
    </AnimatePresence>
  </button>
);

/* ─────────────────────────────────────────
   Option Row
───────────────────────────────────────── */
const OptionRow = ({ option, optionIndex, questionIndex, onTextChange, onCorrectChange }) => {
  const letter = String.fromCharCode(65 + optionIndex);
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay: optionIndex * 0.04 }}
      className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200"
      style={{
        background: option.isCorrect ? "rgba(139,92,246,0.1)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${option.isCorrect ? "rgba(139,92,246,0.35)" : "rgba(255,255,255,0.07)"}`,
        boxShadow: option.isCorrect ? "0 0 18px rgba(139,92,246,0.12)" : "none",
      }}
    >
      <span
        className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black"
        style={{
          background: option.isCorrect ? "rgba(139,92,246,0.22)" : "rgba(255,255,255,0.05)",
          color: option.isCorrect ? "#a78bfa" : "#64748b",
          border: `1px solid ${option.isCorrect ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.08)"}`,
        }}
      >{letter}</span>
      <input
        type="text"
        value={option.optionText}
        onChange={(e) => onTextChange(questionIndex, optionIndex, e.target.value)}
        className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-600 text-sm font-medium"
        placeholder={`${optionIndex + 1}-variant javobini yozing…`}
      />
      <div className="flex items-center gap-2 flex-shrink-0">
        <AnimatePresence>
          {option.isCorrect && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
              className="hidden sm:block text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded"
              style={{ background: "rgba(16,185,129,0.15)", color: "#34d399", border: "1px solid rgba(16,185,129,0.3)" }}
            >To'g'ri</motion.span>
          )}
        </AnimatePresence>
        <RadioDot checked={option.isCorrect} onChange={() => onCorrectChange(questionIndex, optionIndex)} />
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   Question Card
───────────────────────────────────────── */
const QuestionCard = ({
  questionData, questionIndex, onQuestionChange,
  onOptionTextChange, onCorrectChange, onAddOptions,
  onOptionsCountChange, onRemove,
}) => {
  const [expanded, setExpanded] = useState(true);
  const isFirst = questionIndex === 0;
  const hasOptions = questionData.options.length > 0;
  const isComplete =
    questionData.questionText.trim() && hasOptions &&
    questionData.options.every((o) => o.optionText.trim()) &&
    questionData.options.some((o) => o.isCorrect);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -8 }}
      transition={{ duration: 0.28 }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(18px)",
        border: `1px solid ${isComplete ? "rgba(16,185,129,0.25)" : "rgba(255,255,255,0.08)"}`,
        boxShadow: isComplete ? "0 4px 32px rgba(16,185,129,0.06)" : "0 4px 24px rgba(0,0,0,0.2)",
      }}
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r"
        style={{
          background: isComplete
            ? "linear-gradient(to bottom,#10b981,#34d399)"
            : "linear-gradient(to bottom,#6366f1,#8b5cf6)",
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 pl-5">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
            style={{
              background: "linear-gradient(135deg,rgba(99,102,241,0.25),rgba(139,92,246,0.15))",
              border: "1px solid rgba(139,92,246,0.3)", color: "#a78bfa",
            }}
          >{questionIndex + 1}</span>
          <div className="min-w-0">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Savol</p>
            <p className="text-sm font-semibold text-white truncate max-w-[200px]">
              {questionData.questionText || <span className="text-slate-600 italic text-xs">Kiritilmadi…</span>}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {isComplete && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </motion.div>
          )}
          {!isFirst && (
            <button type="button" onClick={onRemove}
              className="p-1.5 rounded-lg transition-all hover:scale-105 active:scale-95"
              style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}
            ><Trash2 className="w-3.5 h-3.5" /></button>
          )}
          <button type="button" onClick={() => setExpanded((p) => !p)}
            className="p-1.5 rounded-lg transition-all"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#94a3b8" }}
          >{expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}</button>
        </div>
      </div>

      {/* Body */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4 border-t border-white/[0.05] pt-4">
              {/* Question textarea */}
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 block mb-1.5">
                  Savol matni
                </label>
                <textarea
                  value={questionData.questionText}
                  onChange={(e) => onQuestionChange(questionIndex, e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-white text-sm font-medium placeholder-slate-600 resize-none focus:outline-none transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", minHeight: 80 }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(139,92,246,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                  placeholder="Savolingizni bu yerga yozing…"
                />
              </div>

              {/* Options count + generate */}
              <div className="flex items-center gap-3 p-3 rounded-xl flex-wrap"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <Hash className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
                <input
                  type="number" min="2" max="10"
                  value={questionData.optionsCount || ""}
                  onChange={(e) => onOptionsCountChange(questionIndex, e.target.value)}
                  className="w-16 px-2.5 py-1.5 rounded-lg text-white text-sm font-bold focus:outline-none"
                  style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)" }}
                  placeholder="2–10"
                />
                <span className="text-slate-500 text-xs flex-1">ta variant</span>
                <button
                  type="button" onClick={() => onAddOptions(questionIndex)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-200 active:scale-95 hover:brightness-110"
                  style={
                    hasOptions
                      ? { background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", color: "#fbbf24" }
                      : { background: "linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow: "0 4px 16px rgba(99,102,241,0.3)", color: "#fff" }
                  }
                >
                  {hasOptions
                    ? <><ListChecks className="w-3.5 h-3.5" /> Yangilash</>
                    : <><PlusCircle className="w-3.5 h-3.5" /> Yaratish</>}
                </button>
              </div>

              {/* Options */}
              <AnimatePresence>
                {hasOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    className="space-y-2"
                  >
                    <p className="text-[9px] font-black uppercase tracking-widest text-violet-400 flex items-center gap-1.5 mb-2">
                      <CheckCircle2 className="w-3 h-3" /> To'g'ri javobni radio bilan belgilang
                    </p>
                    {questionData.options.map((opt, oi) => (
                      <OptionRow
                        key={oi} option={opt} optionIndex={oi} questionIndex={questionIndex}
                        onTextChange={onOptionTextChange} onCorrectChange={onCorrectChange}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   Main Page
───────────────────────────────────────── */
const CreateTest = () => {
  const initialState = {
    title: "",
    questionsMassive: [{ questionText: "", options: [] }],
  };

  const [testData, setTestData] = useState(initialState);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { createTest, loading } = useTestsStore();

  const handleAddOptions = (qi) => {
    const cnt = parseInt(testData.questionsMassive[qi].optionsCount);
    if (cnt > 1) {
      const qs = [...testData.questionsMassive];
      qs[qi].options = Array(cnt).fill("").map(() => ({ optionText: "", isCorrect: false }));
      setTestData({ ...testData, questionsMassive: qs });
    } else {
      toast.error("Kamida 2 ta variant bo'lishi kerak");
    }
  };
  const handleOptionsCountChange = (qi, val) => {
    const qs = [...testData.questionsMassive];
    qs[qi].optionsCount = val;
    setTestData({ ...testData, questionsMassive: qs });
  };
  const handleOptionChange = (qi, oi, val) => {
    const qs = [...testData.questionsMassive];
    qs[qi].options[oi].optionText = val;
    setTestData({ ...testData, questionsMassive: qs });
  };
  const handleCorrectAnswerChange = (qi, oi) => {
    const qs = [...testData.questionsMassive];
    qs[qi].options = qs[qi].options.map((o, i) => ({ ...o, isCorrect: i === oi }));
    setTestData({ ...testData, questionsMassive: qs });
  };
  const handleQuestionChange = (qi, val) => {
    const qs = [...testData.questionsMassive];
    qs[qi].questionText = val;
    setTestData({ ...testData, questionsMassive: qs });
  };
  const handleAddQuestion = () => {
    setTestData({ ...testData, questionsMassive: [...testData.questionsMassive, { questionText: "", options: [] }] });
  };
  const handleRemoveQuestion = (qi) => {
    setTestData({ ...testData, questionsMassive: testData.questionsMassive.filter((_, i) => i !== qi) });
  };

  const completedCount = testData.questionsMassive.filter(
    (q) => q.questionText.trim() && q.options.length > 0 &&
      q.options.every((o) => o.optionText.trim()) && q.options.some((o) => o.isCorrect)
  ).length;
  const total = testData.questionsMassive.length;
  const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!testData.title.trim()) { toast.error("Test nomini kiriting"); return; }
    if (total === 0) { toast.error("Kamida bitta savol kiriting"); return; }
    for (const q of testData.questionsMassive) {
      if (!q.questionText.trim()) { toast.error("Savol matnini kiriting"); return; }
      if (q.options.length < 2) { toast.error("Har bir savolda eng kamida 2 ta variant bo'lishi kerak"); return; }
      for (const o of q.options) {
        if (!o.optionText.trim()) { toast.error("Barcha variantlarni to'ldiring"); return; }
      }
      if (!q.options.some((o) => o.isCorrect)) { toast.error("Har bir savolda bitta to'g'ri javob bo'lishi kerak"); return; }
    }
    createTest(testData).then(() => { setTestData(initialState); setIsConfirmed(false); });
  };

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: "linear-gradient(135deg,#010409 0%,#04061a 50%,#010409 100%)" }}>
      <StarCanvas />

      {/*
        ═══════════════════════════════════════
        TWO-PANEL LAYOUT
        ═══════════════════════════════════════
        On desktop: left fixed sidebar + right scrollable panel
        On mobile:  single stacked column
      */}
      <div className="relative z-10 h-full pt-16">
        <div className="container mx-auto px-4 lg:px-12 h-full flex">

          {/* ══════════════════════════════
            LEFT SIDEBAR — fixed, no scroll
        ══════════════════════════════ */}
          <aside
            className="hidden lg:flex flex-col w-[340px] xl:w-[380px] flex-shrink-0 h-full overflow-hidden border-r"
            style={{
              background: "rgba(255,255,255,0.015)",
              backdropFilter: "blur(24px)",
              borderColor: "rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex flex-col h-full p-6 xl:p-8 overflow-hidden">

              {/* Branding */}
              <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <div
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5"
                  style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)" }}
                >
                  <Sparkles className="w-3 h-3 text-violet-400" />
                  <span className="text-violet-300 text-[10px] font-black tracking-[0.2em] uppercase">Smart Exam</span>
                </div>

                <h1 className="text-3xl xl:text-4xl font-black text-white tracking-tight leading-tight font-outfit mb-2">
                  Test{" "}
                  <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#818cf8,#a78bfa,#34d399)" }}>
                    Yaratish
                  </span>
                </h1>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Talabalar uchun mukammal bilim darajasini tekshirish tizimini loyihalashtiring.
                </p>
              </motion.div>

              {/* Title Input */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mb-6">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">
                  Test Mavzusi
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={testData.title}
                    onChange={(e) => setTestData({ ...testData, title: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl text-white text-sm font-medium placeholder-slate-600 focus:outline-none transition-all duration-200 pr-10"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(139,92,246,0.55)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    placeholder="Masalan: JavaScript Asoslari…"
                  />
                  <PenLine className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-3 mb-6">
                {[
                  { icon: ListChecks, label: "Jami savollar", val: total, color: "#818cf8" },
                  { icon: CheckCircle2, label: "To'liq to'ldirilgan", val: completedCount, color: "#34d399" },
                  { icon: Star, label: "Tahrirlanmagan", val: total - completedCount, color: "#fbbf24" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${s.color}18` }}>
                      <s.icon className="w-4 h-4" style={{ color: s.color }} />
                    </div>
                    <span className="text-slate-400 text-sm flex-1">{s.label}</span>
                    <span className="font-black text-lg" style={{ color: s.color }}>{s.val}</span>
                  </div>
                ))}
              </motion.div>

              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Jarayon</span>
                  <span className="text-[10px] font-black text-violet-400">{pct}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6,#10b981)" }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Confirm + Submit — in sidebar */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="rounded-2xl p-4 space-y-4"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setIsConfirmed(p => !p)}>
                  <div className="pointer-events-none">
                    <Toggle checked={isConfirmed} onChange={() => { }} />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">Tayyorman</p>
                    <p className="text-slate-500 text-xs">Barcha savollar to'g'ri</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isConfirmed || loading}
                  className="relative w-full py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 overflow-hidden transition-all duration-300 active:scale-95"
                  style={
                    isConfirmed && !loading
                      ? {
                        background: "linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#10b981 100%)",
                        boxShadow: "0 8px 32px rgba(99,102,241,0.4)",
                        color: "#fff",
                      }
                      : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#475569", cursor: "not-allowed" }
                  }
                >
                  {isConfirmed && !loading && (
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ background: "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.35) 50%,transparent 60%)", animation: "shine 2.5s infinite" }}
                    />
                  )}
                  {loading
                    ? <Loader className="w-4 h-4 animate-spin" />
                    : <><Rocket className="w-4 h-4" /> Testni Saqlash <Send className="w-3.5 h-3.5 opacity-70" /></>}
                </button>

                {!isConfirmed && (
                  <p className="text-center text-[10px] text-slate-600">Toggle'ni yoqib, testni yuborish mumkin</p>
                )}
              </motion.div>
            </div>
          </aside>

          {/* ══════════════════════════════
            RIGHT PANEL — scrollable
        ══════════════════════════════ */}
          <main className="flex-1 h-full overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(139,92,246,0.3) transparent" }}>

            {/* Mobile-only top header */}
            <div className="lg:hidden px-4 pt-4 pb-2">
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3"
                  style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)" }}
                >
                  <Sparkles className="w-3 h-3 text-violet-400" />
                  <span className="text-violet-300 text-[10px] font-black tracking-widest uppercase">Smart Exam</span>
                </div>
                <h1 className="text-3xl font-black text-white font-outfit mb-1">
                  Test <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#818cf8,#34d399)" }}>Yaratish</span>
                </h1>
              </motion.div>

              {/* Mobile title input */}
              <div className="mb-4">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 block mb-1.5">Test Mavzusi</label>
                <div className="relative">
                  <input
                    type="text"
                    value={testData.title}
                    onChange={(e) => setTestData({ ...testData, title: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl text-white text-sm font-medium placeholder-slate-600 focus:outline-none transition-all duration-200 pr-10"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(139,92,246,0.55)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    placeholder="Test mavzusini kiriting…"
                  />
                  <PenLine className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                </div>
              </div>

              {/* Mobile progress */}
              <div className="h-1 rounded-full overflow-hidden mb-2" style={{ background: "rgba(255,255,255,0.05)" }}>
                <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6,#10b981)" }}
                  animate={{ width: `${pct}%` }} transition={{ duration: 0.5 }} />
              </div>
              <div className="flex justify-between text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2">
                <span>{completedCount}/{total} to'ldirilgan</span>
                <span style={{ color: "#818cf8" }}>{pct}%</span>
              </div>
            </div>

            {/* Questions list */}
            <div className="px-4 lg:px-8 xl:px-10 py-4 lg:py-8 space-y-4 pb-10">

              {/* Section label */}
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-0.5 h-5 rounded-full" style={{ background: "linear-gradient(to bottom,#6366f1,#8b5cf6)" }} />
                <h2 className="text-base font-black text-white font-outfit tracking-tight flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-violet-400" /> Savollar
                </h2>
                <span className="px-2 py-0.5 rounded-lg text-xs font-black"
                  style={{ background: "rgba(99,102,241,0.12)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.25)" }}>
                  {total}
                </span>
              </div>

              <AnimatePresence mode="popLayout">
                {testData.questionsMassive.map((q, qi) => (
                  <QuestionCard
                    key={qi}
                    questionData={q} questionIndex={qi}
                    onQuestionChange={handleQuestionChange}
                    onOptionTextChange={handleOptionChange}
                    onCorrectChange={handleCorrectAnswerChange}
                    onAddOptions={handleAddOptions}
                    onOptionsCountChange={handleOptionsCountChange}
                    onRemove={() => handleRemoveQuestion(qi)}
                  />
                ))}
              </AnimatePresence>

              {/* Add Question */}
              <motion.button
                type="button" onClick={handleAddQuestion}
                whileHover={{ scale: 1.008 }} whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm uppercase tracking-widest transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.025)", border: "2px dashed rgba(99,102,241,0.3)", color: "#818cf8" }}
              >
                <PlusCircle className="w-4 h-4" /> Yangi Savol Qo'shish
              </motion.button>

              {/* Mobile submit */}
              <div className="lg:hidden space-y-4 pt-2">
                <div className="rounded-2xl p-4 space-y-4"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}
                >
                  <div className="flex items-center gap-3 cursor-pointer" onClick={() => setIsConfirmed(p => !p)}>
                    <div className="pointer-events-none">
                      <Toggle checked={isConfirmed} onChange={() => { }} />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">Testni yakunlashga tayyorman</p>
                      <p className="text-slate-500 text-xs">Barcha savollar to'g'ri to'ldirilganini tasdiqlang</p>
                    </div>
                  </div>
                  <button
                    type="button" onClick={handleSubmit} disabled={!isConfirmed || loading}
                    className="w-full py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 relative overflow-hidden"
                    style={
                      isConfirmed && !loading
                        ? { background: "linear-gradient(135deg,#6366f1,#8b5cf6,#10b981)", boxShadow: "0 8px 32px rgba(99,102,241,0.4)", color: "#fff" }
                        : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#475569", cursor: "not-allowed" }
                    }
                  >
                    {isConfirmed && !loading && (
                      <div className="absolute inset-0 pointer-events-none"
                        style={{ background: "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.3) 50%,transparent 60%)", animation: "shine 2.5s infinite" }}
                      />
                    )}
                    {loading ? <Loader className="w-4 h-4 animate-spin" /> : <><Rocket className="w-4 h-4" /> Testni Tizimga Saqlash <Send className="w-3.5 h-3.5" /></>}
                  </button>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>

      <style>{`
        @keyframes shine {
          0%   { transform: translateX(-120%); }
          100% { transform: translateX(200%); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.3); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(139,92,246,0.5); }
      `}</style>
    </div>
  );
};

export default CreateTest;
