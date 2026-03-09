import { useTestsStore } from "../stores/useTestsStore";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaClipboardList,
  FaCheck,
  FaTimes,
  FaQuestionCircle,
  FaTrophy,
  FaBolt,
  FaHome,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useMemo } from "react";

/* ─────────────────────────────────────────
   Canvas Star Field
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

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    // Static stars
    const NUM_STARS = 260;
    const stars = Array.from({ length: NUM_STARS }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.6 + 0.2,
      alpha: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.008 + 0.002,
      phase: Math.random() * Math.PI * 2,
      color: ["#ffffff", "#a5f3fc", "#c4b5fd", "#86efac", "#fde68a"][
        Math.floor(Math.random() * 5)
      ],
    }));

    // Shooting stars
    const createShoot = () => ({
      x: Math.random() * W * 0.7,
      y: Math.random() * H * 0.4,
      len: Math.random() * 180 + 80,
      speed: Math.random() * 12 + 8,
      alpha: 1,
      angle: Math.PI / 5 + Math.random() * 0.3,
      active: true,
    });
    let shoots = [];
    let shootTimer = 0;

    const draw = (t) => {
      ctx.clearRect(0, 0, W, H);

      // Nebula blobs
      const nebulae = [
        { x: W * 0.15, y: H * 0.2, r: 280, c: "rgba(99,102,241,0.07)" },
        { x: W * 0.8, y: H * 0.6, r: 320, c: "rgba(16,185,129,0.06)" },
        { x: W * 0.5, y: H * 0.85, r: 260, c: "rgba(139,92,246,0.06)" },
        { x: W * 0.9, y: H * 0.1, r: 200, c: "rgba(59,130,246,0.06)" },
      ];
      nebulae.forEach(({ x, y, r, c }) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, c);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Twinkling stars
      const now = t * 0.001;
      stars.forEach((s) => {
        const a = s.alpha * (0.6 + 0.4 * Math.sin(now * s.speed * 20 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = a;
        ctx.fill();

        // Small glow for brighter stars
        if (s.r > 1.2) {
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 5);
          glow.addColorStop(0, s.color.replace(")", ",0.3)").replace("rgb", "rgba"));
          glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow;
          ctx.globalAlpha = a * 0.5;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 5, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      // Shooting stars
      shootTimer++;
      if (shootTimer > 140) {
        shoots.push(createShoot());
        shootTimer = 0;
      }
      shoots = shoots.filter((s) => s.active);
      shoots.forEach((s) => {
        const ex = s.x + Math.cos(s.angle) * s.len;
        const ey = s.y + Math.sin(s.angle) * s.len;
        const g = ctx.createLinearGradient(s.x, s.y, ex, ey);
        g.addColorStop(0, `rgba(255,255,255,0)`);
        g.addColorStop(0.5, `rgba(255,255,255,${s.alpha * 0.9})`);
        g.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        ctx.globalAlpha = 1;

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.018;
        if (s.alpha <= 0 || s.x > W || s.y > H) s.active = false;
      });

      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

/* ─────────────────────────────────────────
   Score Ring (SVG)
───────────────────────────────────────── */
const ScoreRing = ({ pct }) => {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);

  const color =
    pct >= 80
      ? ["#10b981", "#34d399"]
      : pct >= 50
        ? ["#f59e0b", "#fbbf24"]
        : ["#ef4444", "#f87171"];

  return (
    <div className="relative w-36 h-36 mx-auto mb-3">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60" cy="60" r={r}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="10"
        />
        <motion.circle
          cx="60" cy="60" r={r}
          fill="none"
          stroke={`url(#ring-grad)`}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
        />
        <defs>
          <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color[0]} />
            <stop offset="100%" stopColor={color[1]} />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="text-2xl font-black font-outfit"
          style={{ color: color[1] }}
        >
          {pct}%
        </motion.span>
        <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold mt-0.5">
          Natija
        </span>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
const CheckAnswer = () => {
  const { CheckingProccess, loading } = useTestsStore();
  const navigate = useNavigate();

  const pct = parseFloat(CheckingProccess?.correctPercentage || 0);
  const correct = CheckingProccess?.correctCount ?? 0;
  const total = CheckingProccess?.totalQuestions ?? 0;
  const wrong = total - correct;

  const grade = useMemo(() => {
    if (pct >= 90) return { label: "A'lo!", icon: "🏆", color: "text-emerald-400" };
    if (pct >= 70) return { label: "Yaxshi", icon: "⭐", color: "text-sky-400" };
    if (pct >= 50) return { label: "Qoniqarli", icon: "👍", color: "text-amber-400" };
    return { label: "Pastroq", icon: "💪", color: "text-rose-400" };
  }, [pct]);

  /* Empty / loading states */
  if (!CheckingProccess || !CheckingProccess.TestMassive || CheckingProccess.TestMassive.length === 0) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#020617 0%,#0f172a 50%,#020617 100%)" }}>
        <StarCanvas />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center w-full max-w-md mx-auto p-6 relative z-10"
        >
          <div className="backdrop-blur-2xl bg-white/[0.04] border border-white/10 rounded-3xl p-10 shadow-2xl">
            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.2))", border: "1px solid rgba(139,92,246,0.3)" }}>
              <FaClipboardList className="text-4xl text-violet-400" />
            </div>
            <h2 className="text-3xl font-black text-white mb-3 font-outfit">Test Natijalari</h2>
            <p className="text-slate-400 mb-8 text-sm leading-relaxed">
              Siz topshirgan testlar natijalarini <span className="text-violet-400 font-semibold">«Mening Testlarim»</span> bo'limidan to'liq ko'rishingiz mumkin.
            </p>
            <button
              onClick={() => navigate("/my-tests")}
              className="w-full py-4 rounded-2xl font-bold text-white text-sm uppercase tracking-widest transition-all duration-300 active:scale-95"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow: "0 8px 32px rgba(99,102,241,0.35)" }}
            >
              <div className="flex items-center justify-center gap-2">
                <FaClipboardList /> Mening Testlarim
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#020617 0%,#0f172a 50%,#020617 100%)" }}>
        <StarCanvas />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full border-4 border-violet-500/20 border-t-violet-500 animate-spin" />
          <p className="text-slate-400 text-sm font-medium animate-pulse">Natijalar yuklanmoqda…</p>
        </div>
      </div>
    );

  return (
    <div
      className="w-full min-h-screen relative overflow-x-hidden"
      style={{ background: "linear-gradient(135deg,#020617 0%,#0a0f2e 40%,#020617 100%)" }}
    >
      {/* Stars */}
      <StarCanvas />

      {/* Content */}
      <div className="relative z-10 pb-20 pt-24 sm:pt-28 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          {/* ── Score Hero Card ── */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative mb-8 rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg,rgba(99,102,241,0.12) 0%,rgba(139,92,246,0.08) 50%,rgba(16,185,129,0.08) 100%)",
              border: "1px solid rgba(139,92,246,0.2)",
              boxShadow: "0 0 80px rgba(99,102,241,0.1),inset 0 1px 0 rgba(255,255,255,0.06)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* glow */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse,rgba(139,92,246,0.2) 0%,transparent 70%)" }} />

            <div className="relative p-6 sm:p-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
              {/* Ring */}
              <div className="flex-shrink-0">
                <ScoreRing pct={pct} />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className={`text-center text-base font-black ${grade.color}`}
                >
                  {grade.icon} {grade.label}
                </motion.p>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-32 bg-white/10" />
              <div className="block sm:hidden w-full h-px bg-white/10" />

              {/* Stat pills */}
              <div className="flex-1 grid grid-cols-3 gap-3 w-full">
                {[
                  { label: "To'g'ri", val: correct, color: "#10b981", glow: "rgba(16,185,129,0.25)", icon: FaCheck },
                  { label: "Noto'g'ri", val: wrong, color: "#ef4444", glow: "rgba(239,68,68,0.25)", icon: FaTimes },
                  { label: "Savollar", val: total, color: "#38bdf8", glow: "rgba(56,189,248,0.25)", icon: FaQuestionCircle },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 200 }}
                    className="rounded-2xl p-4 flex flex-col items-center text-center"
                    style={{
                      background: `radial-gradient(ellipse at top,${s.glow.replace("0.25", "0.07")} 0%,rgba(0,0,0,0) 80%)`,
                      border: `1px solid ${s.color}28`,
                      boxShadow: `0 4px 24px ${s.glow.replace("0.25", "0.1")}`,
                    }}
                  >
                    <s.icon style={{ color: s.color }} className="text-lg mb-2" />
                    <span className="text-2xl sm:text-3xl font-black font-outfit" style={{ color: s.color }}>
                      {s.val}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mt-1">{s.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Section Header ── */}
          <div className="flex items-center justify-between mb-6 px-1">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 rounded-full" style={{ background: "linear-gradient(to bottom,#6366f1,#8b5cf6)" }} />
              <h3 className="text-xl sm:text-2xl font-black text-white font-outfit tracking-tight">
                Batafsil tahlil
              </h3>
            </div>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest"
              style={{
                background: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.25)",
                color: "#34d399",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Saqlandi
            </motion.span>
          </div>

          {/* ── Question Cards ── */}
          <div className="space-y-5">
            {CheckingProccess.TestMassive?.map((test, index) => {
              const isRight = test.correctOption;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.06, ease: "easeOut" }}
                  className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(16px)",
                    border: `1px solid ${isRight ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"}`,
                    boxShadow: isRight
                      ? "0 4px 32px rgba(16,185,129,0.06)"
                      : "0 4px 32px rgba(239,68,68,0.06)",
                  }}
                >
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-full"
                    style={{
                      background: isRight
                        ? "linear-gradient(to bottom,#10b981,#34d399)"
                        : "linear-gradient(to bottom,#ef4444,#f87171)",
                    }}
                  />

                  <div className="p-5 sm:p-7 pl-6 sm:pl-8">
                    {/* Question header */}
                    <div className="flex items-start gap-4 mb-5">
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: isRight ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
                          border: `1px solid ${isRight ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
                          boxShadow: isRight
                            ? "0 0 16px rgba(16,185,129,0.2)"
                            : "0 0 16px rgba(239,68,68,0.2)",
                        }}
                      >
                        {isRight
                          ? <FaCheckCircle className="text-emerald-400 text-lg" />
                          : <FaTimesCircle className="text-rose-400 text-lg" />}
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest mb-1"
                          style={{ color: isRight ? "#34d399" : "#f87171" }}>
                          Savol #{index + 1}
                        </p>
                        <h3 className="text-base sm:text-lg font-bold text-white font-outfit leading-snug">
                          {test.questionText}
                        </h3>
                      </div>
                    </div>

                    {/* Options grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {test.totalOptions.map((option, optIndex) => {
                        const isSelected = option._id === test._id;
                        const isCorrectAnswer = option.isCorrect;

                        let style = {};
                        let labelStyle = {};
                        let badgeStyle = {};

                        if (isSelected && isRight) {
                          style = { background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.4)", color: "#6ee7b7" };
                          labelStyle = { background: "rgba(16,185,129,0.2)", border: "1px solid rgba(16,185,129,0.3)", color: "#34d399" };
                        } else if (isSelected && !isRight) {
                          style = { background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.4)", color: "#fca5a5" };
                          labelStyle = { background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171" };
                        } else if (isCorrectAnswer && !isRight) {
                          style = { background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.25)", color: "#6ee7b7" };
                          labelStyle = { background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)", color: "#34d399" };
                        } else {
                          style = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "#94a3b8" };
                          labelStyle = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#64748b" };
                        }

                        return (
                          <div
                            key={optIndex}
                            className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl transition-all duration-200"
                            style={style}
                          >
                            <span
                              className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black"
                              style={labelStyle}
                            >
                              {String.fromCharCode(65 + optIndex)}
                            </span>
                            <span className="text-sm font-medium tracking-tight flex-1">
                              {option.optionText}
                            </span>
                            {isSelected && (
                              isRight
                                ? <FaCheck className="text-emerald-400 text-xs flex-shrink-0" />
                                : <FaTimes className="text-rose-400 text-xs flex-shrink-0" />
                            )}
                            {isCorrectAnswer && !isRight && !isSelected && (
                              <FaCheck className="text-emerald-400/70 text-xs flex-shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Bottom CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <button
              onClick={() => navigate("/my-tests")}
              className="group flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-white text-sm uppercase tracking-widest transition-all duration-300 active:scale-95 hover:brightness-110"
              style={{
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                boxShadow: "0 8px 32px rgba(99,102,241,0.35)",
              }}
            >
              <FaClipboardList className="group-hover:rotate-12 transition-transform" />
              Mening Testlarim
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-slate-300 text-sm uppercase tracking-widest transition-all duration-300 active:scale-95 hover:bg-white/10"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <FaHome /> Bosh sahifa
            </button>
          </motion.div>

          {/* ── Warning banner ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-6 p-4 rounded-2xl flex items-center justify-center gap-3"
            style={{
              background: "rgba(245,158,11,0.08)",
              border: "1px solid rgba(245,158,11,0.2)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping flex-shrink-0" />
            <p className="text-amber-400/90 text-xs font-bold uppercase tracking-widest text-center">
              ⚠️ Sahifani yangilamang! Natijalar profil bo'limida saqlandi
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckAnswer;
