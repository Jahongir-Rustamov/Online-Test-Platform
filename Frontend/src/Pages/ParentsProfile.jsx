import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useTestsStore } from "../stores/useTestsStore";
import { useUserStore } from "../stores/useUserStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiUser3Fill,
  RiLineChartFill,
  RiMailOpenFill,
  RiInboxArchiveLine,
  RiCheckFill,
  RiTimeFill,
  RiParentFill,
  RiAwardFill,
  RiBookOpenFill,
  RiShieldUserFill,
  RiTrophyFill,
  RiBarChartGroupedFill,
} from "react-icons/ri";
import { FaChild, FaGraduationCap } from "react-icons/fa";

/* ─── Cosmos Background ──────────────────────────────────────────────── */
const CosmosBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Deep space base */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,#0a0f1e_0%,#020617_100%)]" />

    {/* Nebula blobs */}
    <motion.div
      animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.08, 1], rotate: [0, 6, 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      className="absolute -top-[15%] -left-[10%] w-[75%] h-[75%] bg-violet-900/20 blur-[120px] rounded-full mix-blend-screen"
    />
    <motion.div
      animate={{ opacity: [0.2, 0.38, 0.2], scale: [1.08, 1, 1.08], rotate: [0, -6, 0] }}
      transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      className="absolute -bottom-[15%] -right-[10%] w-[65%] h-[65%] bg-blue-900/20 blur-[100px] rounded-full mix-blend-screen"
    />
    <div className="absolute top-1/3 right-1/4 w-[45%] h-[45%] bg-emerald-900/8 blur-[150px] rounded-full opacity-40" />

    {/* Tiny distant stars */}
    <div className="absolute inset-0">
      {[...Array(230)].map((_, i) => (
        <div
          key={`ts-${i}`}
          className="absolute w-[1px] h-[1px] bg-white/35 rounded-full"
          style={{ left: (i * 137.5) % 100 + "%", top: (i * 97.3) % 100 + "%" }}
        />
      ))}
    </div>

    {/* Blinking mid stars */}
    {[...Array(80)].map((_, i) => (
      <motion.div
        key={`ms-${i}`}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: (i % 6) * 0.7 }}
        className="absolute w-0.5 h-0.5 bg-white rounded-full shadow-[0_0_3px_rgba(255,255,255,0.8)]"
        style={{ left: (i * 149.3) % 100 + "%", top: (i * 113.7) % 100 + "%" }}
      />
    ))}

    {/* Hero glowing stars */}
    {[...Array(18)].map((_, i) => (
      <motion.div
        key={`hs-${i}`}
        animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6], rotate: [0, 45, 0] }}
        transition={{ duration: 4 + (i % 3), repeat: Infinity }}
        className="absolute"
        style={{ left: (i * 193.1) % 100 + "%", top: (i * 167.9) % 100 + "%" }}
      >
        <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_#fff,0_0_20px_#818cf8]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-[1px] bg-white/25 blur-[0.5px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-4 bg-white/25 blur-[0.5px]" />
      </motion.div>
    ))}

    {/* Shooting stars */}
    {[0, 1, 2].map((i) => (
      <motion.div
        key={`meteor-${i}`}
        initial={{ x: "-10%", y: `${20 + i * 25}%`, opacity: 0 }}
        animate={{ x: "110%", y: `${35 + i * 15}%`, opacity: [0, 0.9, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: i * 7 + 3, ease: "easeIn" }}
        className="absolute h-[1px] w-[160px] bg-gradient-to-r from-transparent via-white to-transparent -rotate-[20deg] shadow-[0_0_16px_rgba(255,255,255,0.9)]"
      />
    ))}
  </div>
);

/* ─── Score colour helper ────────────────────────────────────────────── */
const scoreColor = (pct) =>
  pct >= 80 ? "text-emerald-400" : pct >= 50 ? "text-amber-400" : "text-rose-400";
const barColor = (pct) =>
  pct >= 80 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-500" : "bg-rose-500";
const barGlow = (pct) =>
  pct >= 80
    ? "rgba(16,185,129,0.35)"
    : pct >= 50
      ? "rgba(245,158,11,0.35)"
      : "rgba(244,63,94,0.35)";

/* ─── Stat mini card ─────────────────────────────────────────────────── */
const StatCard = ({ label, value, suffix = "", icon }) => (
  <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.025] border border-white/8 hover:bg-white/[0.05] transition-all duration-300 flex flex-col gap-2">
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-violet-500/15 border border-violet-500/20">
        {icon}
      </div>
      <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">{label}</span>
    </div>
    <div className="flex items-end gap-1">
      <span className="text-2xl sm:text-3xl font-black text-white font-outfit leading-none">{value}</span>
      {suffix && <span className="text-violet-400 font-black text-base mb-0.5">{suffix}</span>}
    </div>
  </div>
);

/* ─── Empty state ────────────────────────────────────────────────────── */
const EmptyState = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center py-16 text-center backdrop-blur-3xl bg-white/[0.02] border border-white/8 rounded-[2.5rem]"
  >
    <div className="w-20 h-20 bg-white/5 rounded-[1.5rem] flex items-center justify-center border border-white/10 mb-5">
      <RiInboxArchiveLine className="w-10 h-10 text-slate-600" />
    </div>
    <h4 className="text-lg font-bold text-white mb-2 font-outfit">Hali testlar yo'q</h4>
    <p className="text-slate-500 text-sm max-w-xs px-4">{message}</p>
  </motion.div>
);


const ParentsProfile = () => {
  const { getMySonProfile, sonWorkedOn, loading } = useTestsStore();
  const { user } = useUserStore();
  const [selectedChild, setSelectedChild] = useState(0);

  useEffect(() => {
    getMySonProfile();
  }, [getMySonProfile]);

  console.log("Son Worked On:", sonWorkedOn);

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#020617]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-violet-500/10 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  /* ── No data ── */
  if (!sonWorkedOn || sonWorkedOn.length === 0) {
    return (
      <div className="relative flex flex-col justify-center items-center h-screen bg-[#020617] text-slate-400 space-y-4 overflow-hidden">
        <CosmosBackground />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
            <FaChild className="w-12 h-12 text-slate-500" />
          </div>
          <p className="text-lg font-medium font-outfit">Farzandingiz ma'lumotlari topilmadi</p>
          <p className="text-sm text-slate-600">Administrator orqali farzandingizni ulang</p>
        </div>
      </div>
    );
  }

  /* ── Data exists ─────────────────────────────────────────────────── */
  // Backend returns an array of children
  const children = Array.isArray(sonWorkedOn) ? sonWorkedOn : [sonWorkedOn];
  const child = children[selectedChild] || children[0];

  const tests = child?.TestWorkedOn || [];
  const reversedTests = [...tests].reverse();

  const avgPercentage = tests.length
    ? Math.round(tests.reduce((s, t) => s + (t.correctPercentage || 0), 0) / tests.length)
    : 0;

  const bestScore = tests.length ? Math.max(...tests.map((t) => t.correctPercentage || 0)) : 0;

  const chartData = reversedTests.slice(0, 10).map((test, i) => ({
    name: `T-${i + 1}`,
    percentage: test.correctPercentage,
  }));

  return (
    <div className="w-full min-h-screen lg:h-screen bg-[#020617] text-white pt-20 sm:pt-28 relative overflow-y-auto lg:overflow-hidden flex flex-col items-center">
      <CosmosBackground />

      <div className="container mx-auto px-4 lg:px-12 relative z-10 w-full flex-1 flex flex-col min-h-0 pb-8">

        {/* ── Page header ── */}
        <div className="mb-6 sm:mb-8 shrink-0">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col items-start">
            <div className="px-4 py-1 bg-white/5 border border-white/10 rounded-full mb-3 flex items-center gap-2">
              <RiParentFill className="text-violet-400 text-xs" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-violet-400">Ota-ona Paneli</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-outfit tracking-tighter text-white">
              Farzandim{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                Profili
              </span>
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-outfit">
              {user?.name} — farzandingizning o'quv natijalarini kuzating
            </p>
          </motion.div>
        </div>

        {/* ── Child selector tabs (if multiple children) ── */}
        {children.length > 1 && (
          <div className="flex gap-2 mb-5 shrink-0 flex-wrap">
            {children.map((c, i) => (
              <button
                key={i}
                onClick={() => setSelectedChild(i)}
                className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all border ${selectedChild === i
                  ? "bg-violet-600/30 border-violet-500/50 text-violet-300"
                  : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                  }`}
              >
                {c?.name || `Farzand ${i + 1}`}
              </button>
            ))}
          </div>
        )}

        {/* ── Main grid ── */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 flex-1 min-h-0 w-full">

          {/* ════ LEFT — Test history list ════ */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col min-h-0">

            {/* Section title */}
            <div className="flex items-center gap-3 mb-4 shrink-0">
              <div className="w-8 h-8 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center">
                <RiBookOpenFill className="text-violet-400 text-sm" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Test Tarixi</span>
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
                {tests.length} ta test
              </span>
            </div>

            <div className="space-y-3 overflow-y-auto custom-scrollbar pr-1 flex-1 pb-6">
              <AnimatePresence>
                {reversedTests.length === 0 ? (
                  <EmptyState message="Bu farzandingiz hali birorta ham test ishlamagan." />
                ) : (
                  reversedTests.map((test, index) => (
                    <motion.div
                      key={test?._id?._id || index}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="group relative"
                    >
                      <div className="relative backdrop-blur-3xl bg-white/[0.025] hover:bg-white/[0.055] border border-white/10 hover:border-violet-500/30 rounded-2xl sm:rounded-[1.8rem] p-4 sm:p-5 transition-all duration-500 shadow-xl overflow-hidden">
                        {/* Shimmer on hover */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.015] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                        <div className="flex items-center justify-between gap-4 relative z-10">
                          {/* Left: icon + info */}
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            {/* Icon badge */}
                            <div className="flex-shrink-0 relative">
                              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 p-[1.5px]">
                                <div className="w-full h-full rounded-[10px] sm:rounded-[14px] bg-[#020617] flex items-center justify-center">
                                  <RiMailOpenFill className="text-lg sm:text-xl text-violet-400 group-hover:scale-110 transition-transform" />
                                </div>
                              </div>
                              {/* Completed dot */}
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#020617] flex items-center justify-center shadow">
                                <RiCheckFill className="text-[8px] text-white" />
                              </div>
                            </div>

                            <div className="min-w-0 flex-1">
                              <h3 className="text-sm sm:text-base font-bold text-white mb-1 font-outfit group-hover:text-violet-300 transition-colors truncate">
                                {test?._id?.title || "Sarlavhasiz Test"}
                              </h3>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="px-2 py-0.5 bg-violet-500/10 rounded-lg text-violet-400 text-[8px] sm:text-[9px] font-black uppercase tracking-wider border border-violet-500/15">
                                  {test?.correctCount}/{test?.totalQuestions} to'g'ri
                                </span>
                                <div className="flex items-center gap-1 text-slate-600 text-[8px] font-black tracking-widest uppercase">
                                  <RiTimeFill className="text-xs" />
                                  <span>
                                    {test?.createdAt
                                      ? new Date(test.createdAt).toLocaleDateString("uz-UZ")
                                      : test?._id?.createdAt
                                        ? new Date(test._id.createdAt).toLocaleDateString("uz-UZ")
                                        : "—"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right: percentage + bar */}
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <span className={`text-2xl sm:text-3xl font-black font-outfit ${scoreColor(test?.correctPercentage)}`}>
                              {test?.correctPercentage}%
                            </span>
                            <div className="w-20 sm:w-28 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${test.correctPercentage}%` }}
                                transition={{ duration: 1, delay: 0.4 + index * 0.04 }}
                                className={`h-full rounded-full ${barColor(test?.correctPercentage)}`}
                                style={{ boxShadow: `0 0 10px ${barGlow(test?.correctPercentage)}` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ════ RIGHT — Profile + Analytics ════ */}
          <div className="order-1 lg:order-2 lg:col-span-5 space-y-5 lg:overflow-y-auto custom-scrollbar pr-1 shrink-0">

            {/* ── Child Profile Card ── */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="relative backdrop-blur-3xl bg-white/[0.025] border border-white/10 rounded-[2rem] p-5 sm:p-6 shadow-2xl overflow-hidden"
            >
              {/* Decorative glow top-right */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-violet-500/10 blur-[70px] rounded-full -mr-16 -mt-16 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-fuchsia-500/8 blur-[60px] rounded-full -ml-12 -mb-12 pointer-events-none" />

              {/* Child avatar + name */}
              <div className="flex items-center gap-4 mb-5 relative z-10">
                <div className="relative group">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-700" />
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-[#020617] border border-white/10 relative p-1">
                    <img src="/user.png" alt="Profile" className="w-full h-full object-cover rounded-xl" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-violet-500 border-2 border-[#020617] flex items-center justify-center shadow-lg">
                    <FaGraduationCap className="text-white text-[8px]" />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-violet-400 mb-0.5 block">
                    Talaba
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white font-outfit tracking-tight truncate">
                    {child?.name || "Farzand"}<span className="text-violet-500">.</span>
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="px-2 py-0.5 bg-white/5 rounded-lg border border-white/8 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">
                        {tests.length} test ishlangan
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/5 mb-4" />

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 relative z-10">
                <StatCard
                  label="O'rtacha"
                  value={avgPercentage}
                  suffix="%"
                  icon={<RiBarChartGroupedFill className="text-violet-400 text-sm" />}
                />
                <StatCard
                  label="Eng yuqori"
                  value={bestScore}
                  suffix="%"
                  icon={<RiTrophyFill className="text-amber-400 text-sm" />}
                />
                <StatCard
                  label="Jami testlar"
                  value={tests.length}
                  icon={<RiBookOpenFill className="text-sky-400 text-sm" />}
                />
                <StatCard
                  label="Daraja"
                  value={avgPercentage >= 80 ? "A'lo" : avgPercentage >= 60 ? "Yaxshi" : avgPercentage >= 40 ? "O'rta" : "Past"}
                  icon={<RiAwardFill className="text-fuchsia-400 text-sm" />}
                />
              </div>

              {/* Progress bar row */}
              <div className="mt-4 relative z-10">
                <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-500 mb-2">
                  <span>Umumiy daraja</span>
                  <span>{avgPercentage}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${avgPercentage}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                    style={{ boxShadow: "0 0 12px rgba(139,92,246,0.5)" }}
                  />
                </div>
              </div>
            </motion.div>

            {/* ── Analytics Chart ── */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="backdrop-blur-3xl bg-[#0a0f1e]/50 border border-white/10 rounded-[2rem] p-5 sm:p-6 shadow-2xl relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center border border-violet-500/20">
                    <RiLineChartFill className="text-violet-400 text-base" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white leading-none mb-0.5">
                      Progress Trend
                    </h3>
                    <span className="text-[7px] text-slate-500 uppercase font-black tracking-widest">
                      So'nggi 10 test
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[7px] font-black text-emerald-400 uppercase tracking-widest">Live</span>
                </div>
              </div>

              {/* Chart */}
              <div className="w-full h-[140px] sm:h-[175px]">
                {chartData.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-slate-600 text-xs">
                    Ma'lumot yo'q
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="parentColorPct" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 9, fill: "#64748B", fontWeight: 900 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tick={{ fontSize: 9, fill: "#64748B", fontWeight: 900 }}
                        axisLine={false}
                        tickLine={false}
                        tickCount={3}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "rgba(2,6,23,0.85)",
                          backdropFilter: "blur(16px)",
                          border: "1px solid rgba(139,92,246,0.25)",
                          borderRadius: "14px",
                          boxShadow: "0 0 30px rgba(0,0,0,0.5)",
                          padding: "10px 14px",
                        }}
                        itemStyle={{ color: "#a78bfa", fontWeight: 900, fontSize: "11px", textTransform: "uppercase" }}
                        labelStyle={{ color: "#94A3B8", fontWeight: 900, fontSize: "10px", marginBottom: "4px" }}
                        formatter={(val) => [`${val}%`, "Natija"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="percentage"
                        stroke="#8B5CF6"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#parentColorPct)"
                        dot={{ r: 3, fill: "#8B5CF6", strokeWidth: 0 }}
                        activeDot={{ r: 5, fill: "#a78bfa", strokeWidth: 0 }}
                        animationDuration={2000}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </motion.div>

            {/* ── Email info ── */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="backdrop-blur-3xl bg-white/[0.015] border border-white/8 rounded-[1.5rem] p-4 sm:p-5 shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-fuchsia-500/15 border border-fuchsia-500/20 flex items-center justify-center flex-shrink-0">
                  <RiShieldUserFill className="text-fuchsia-400 text-base" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[7px] font-black uppercase tracking-[0.25em] text-slate-600 mb-0.5">Email</span>
                  <p className="text-sm font-bold text-slate-300 truncate">{child?.email || "—"}</p>
                </div>
                <div className="ml-auto flex-shrink-0">
                  <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-[8px] font-black uppercase tracking-widest text-emerald-400">Faol</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentsProfile;
