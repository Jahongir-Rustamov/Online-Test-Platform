import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import { useTestsStore } from "../stores/useTestsStore";
import { PropagateLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiHistoryFill,
  RiUser3Fill,
  RiLineChartFill,
  RiCompass3Fill,
  RiMailOpenFill,
  RiInboxArchiveLine,
  RiCheckFill,
  RiTimeFill
} from "react-icons/ri";
import { FaClock, FaChevronRight } from "react-icons/fa";

const MyTestsOnWorked = () => {
  const { MyTestsWorkedOn, WorkedOn, loading } = useTestsStore();

  useEffect(() => {
    MyTestsWorkedOn();
  }, [MyTestsWorkedOn]);

  const calculateAveragePercentage = () => {
    if (!WorkedOn?.TestWorkedOn?.length) return 0;
    const totalPercentage = WorkedOn.TestWorkedOn.reduce(
      (sum, test) => sum + test.correctPercentage,
      0
    );
    return Math.round(totalPercentage / WorkedOn.TestWorkedOn.length);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f172a]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-primary-500/10 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!WorkedOn || !WorkedOn.TestWorkedOn) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#0f172a] text-slate-400 space-y-4">
        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
          <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-lg font-medium font-outfit">Ma'lumotlar topilmadi</p>
      </div>
    );
  }

  const chartData = [...WorkedOn.TestWorkedOn]
    .reverse()
    .slice(0, 10)
    .map((test, index) => ({
      name: `T-${index + 1}`,
      percentage: test.correctPercentage,
    }));

  return (
    <div className="w-full min-h-screen lg:h-screen bg-[#020617] text-white pt-20 sm:pt-28 relative overflow-y-auto lg:overflow-hidden flex flex-col items-center">
      {/* High-Fidelity Realistic Cosmos Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Deep Space Base Layer */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0a0f1e_0%,#020617_100%)]" />

        {/* Dynamic Nebulae Layers */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] bg-indigo-900/20 blur-[120px] rounded-full mix-blend-screen"
        />
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1.1, 1, 1.1],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-blue-900/20 blur-[100px] rounded-full mix-blend-screen"
        />
        <div className="absolute top-1/4 right-1/4 w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full opacity-50" />

        {/* Realistic Subtle Crescent Moon Removed */}

        {/* Starfield Layer 1: Distant Tiny Stars */}
        <div className="absolute inset-0">
          {[...Array(250)].map((_, i) => (
            <div
              key={`star-tiny-${i}`}
              className="absolute w-[1px] h-[1px] bg-white/40 rounded-full"
              style={{
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
            />
          ))}
        </div>

        {/* Starfield Layer 2: Mid-range Bright Stars */}
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={`star-mid-${i}`}
            initial={{ opacity: Math.random() }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-0.5 h-0.5 bg-white rounded-full shadow-[0_0_3px_rgba(255,255,255,0.8)]"
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
          />
        ))}

        {/* Starfield Layer 3: Hero Stars (Big and Glowing) */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`star-hero-${i}`}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.6, 1, 0.6],
              rotate: [0, 45, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity
            }}
            className="absolute"
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
          >
            <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_#fff,0_0_20px_#3b82f6]" />
            {/* Cross Flare */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-[1px] bg-white/30 blur-[0.5px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-4 bg-white/30 blur-[0.5px]" />
          </motion.div>
        ))}

        {/* Meteor Streaks (Shooting Stars) */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`meteor-${i}`}
            initial={{ x: "-100%", y: Math.random() * 100 + "%", opacity: 0 }}
            animate={{
              x: "200%",
              y: (Math.random() * 80 + 10) + "%",
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 1 + Math.random() * 1,
              repeat: Infinity,
              delay: Math.random() * 20,
              ease: "easeIn"
            }}
            className="absolute h-[1px] w-[200px] bg-gradient-to-r from-transparent via-white to-transparent rotate-[-30deg] shadow-[0_0_20px_rgba(255,255,255,1)]"
          />
        ))}

        {/* Cosmic Dust / Texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-4 lg:px-12 relative z-10 w-full flex-1 flex flex-col min-h-0 pb-6 sm:pb-10">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8 shrink-0">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-start"
          >
            <div className="px-4 py-1 bg-white/5 border border-white/10 rounded-full mb-3">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary-400">Mening Natijalarim</span>
            </div>
            <h1 className="text-3xl sm:text-6xl font-black font-outfit tracking-tighter text-white">
              Testlar <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-sky-400">Tarixi</span>
            </h1>
          </motion.div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 sm:gap-8 flex-1 min-h-0 w-full">
          {/* Left Side - Test History List */}
          <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col min-h-0">
            <div className="space-y-4 overflow-y-auto custom-scrollbar pr-2 flex-1 pb-10">
              <AnimatePresence>
                {WorkedOn?.TestWorkedOn?.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center backdrop-blur-3xl bg-white/[0.02] border border-white/5 rounded-[2.5rem]"
                  >
                    <div className="w-20 h-20 bg-white/5 rounded-[1.5rem] flex items-center justify-center border border-white/10 mb-6">
                      <RiInboxArchiveLine className="w-10 h-10 text-slate-600" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 font-outfit">Hali testlar yo'q</h4>
                    <p className="text-slate-500 text-sm max-w-xs px-4">
                      Siz hali birorta ham test ishlamagansiz. Bilimingizni sinashni boshlang!
                    </p>
                  </motion.div>
                ) : (
                  [...WorkedOn.TestWorkedOn].reverse().map((test, index) => (
                    <motion.div
                      key={test?._id?._id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative"
                    >
                      <div className="relative backdrop-blur-3xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-primary-500/30 rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 transition-all duration-500 shadow-xl overflow-hidden active:scale-98">
                        {/* Diagonal Reflection Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                        <div className="flex flex-row items-center justify-between gap-4 relative z-10">
                          <div className="flex flex-row items-center gap-4 sm:gap-6 flex-1 min-w-0">
                            <div className="flex-shrink-0 relative hidden xs:block">
                              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary-600 to-sky-400 p-[1px]">
                                <div className="w-full h-full rounded-xl sm:rounded-2xl bg-[#020617] flex items-center justify-center">
                                  <RiMailOpenFill className="text-xl sm:text-2xl text-primary-400 group-hover:scale-110 transition-transform" />
                                </div>
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#020617] flex items-center justify-center shadow-lg">
                                <RiCheckFill className="text-[10px] text-white" />
                              </div>
                            </div>

                            <div className="text-left min-w-0 flex-grow">
                              <h3 className="text-base sm:text-xl font-bold text-white mb-1 sm:mb-2 font-outfit group-hover:text-primary-400 transition-colors truncate">
                                {test?._id?.title || "Sarlavhasiz Test"}
                              </h3>
                              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                                <span className="px-2 py-0.5 bg-primary-500/10 rounded-lg text-primary-400 text-[8px] sm:text-[9px] font-black uppercase tracking-wider border border-primary-500/10">
                                  {test?.correctCount} / {test?.totalQuestions} TO'G'RI
                                </span>
                                <div className="flex items-center gap-1.5 text-slate-500 text-[8px] sm:text-[9px] font-black tracking-widest uppercase">
                                  <RiTimeFill className="text-slate-600 text-xs" />
                                  <span>{new Date(test?._id?.createdAt).toLocaleDateString('uz-UZ')}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <div className={`text-2xl sm:text-3xl font-black font-outfit ${test?.correctPercentage >= 80 ? "text-emerald-400" :
                              test?.correctPercentage >= 50 ? "text-amber-400" : "text-rose-400"
                              }`}>
                              {test?.correctPercentage}%
                            </div>
                            <div className="w-24 sm:w-32 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${test.correctPercentage}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`h-full rounded-full ${test?.correctPercentage >= 80 ? "bg-emerald-500" :
                                  test?.correctPercentage >= 50 ? "bg-amber-500" : "bg-rose-500"
                                  }`}
                                style={{
                                  boxShadow: `0 0 10px ${test?.correctPercentage >= 80 ? "rgba(16,185,129,0.3)" :
                                    test?.correctPercentage >= 50 ? "rgba(245,158,11,0.3)" : "rgba(244,63,94,0.3)"
                                    }`
                                }}
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

          {/* Right Side - Profile and Analytics */}
          <div className="order-1 lg:order-2 lg:col-span-5 space-y-6 sm:space-y-8 lg:overflow-y-auto custom-scrollbar pr-1 shrink-0">
            {/* Profile Card */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="backdrop-blur-3xl bg-white/[0.03] border border-white/10 rounded-[2rem] p-4 sm:p-6 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 blur-[60px] rounded-full -mr-16 -mt-16 pointer-events-none" />

              <div className="flex items-center gap-3 sm:gap-4 mb-6 relative z-10">
                <div className="relative group">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden bg-[#020617] border border-white/10 relative p-1">
                    <img
                      src="/user.png"
                      alt="Profile"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary-500 border-[2px] border-[#020617] flex items-center justify-center shadow-lg">
                    <RiUser3Fill className="text-white text-[8px]" />
                  </div>
                </div>
                <div className="min-w-0">
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary-400 mb-0.5 block">Talaba Dashboard</span>
                  <h2 className="text-lg sm:text-2xl font-black text-white font-outfit tracking-tight truncate">
                    {WorkedOn?.name || "Talaba"}<span className="text-primary-500">.</span>
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="px-2 py-0.5 bg-white/5 rounded-lg border border-white/5 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">
                        {WorkedOn?.TestWorkedOn?.length || 0} Testlar
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.05] transition-all">
                  <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-2">O'rtacha</span>
                  <div className="flex items-end gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black text-white font-outfit">{calculateAveragePercentage()}</span>
                    <span className="text-primary-500 font-black text-lg mb-0.5">%</span>
                  </div>
                </div>
                <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.05] transition-all flex flex-col justify-center">
                  <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-2">Yutuq</span>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                      <RiLineChartFill className="text-emerald-400 text-lg" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-tighter">O'sishda</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Analytics Section */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="backdrop-blur-3xl bg-[#0a0f1e]/40 border border-white/10 rounded-[2rem] p-4 sm:p-6 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center border border-primary-500/20">
                    <RiLineChartFill className="text-primary-400 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white leading-none mb-1">
                      Progress Trend
                    </h3>
                    <span className="text-[7px] text-slate-500 uppercase font-black tracking-widest">Statistika tahlili</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[7px] font-black text-emerald-400 uppercase tracking-widest">Live Data</span>
                </div>
              </div>

              <div className="w-full h-[140px] sm:h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPct" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
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
                        background: "rgba(2, 6, 23, 0.8)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "16px",
                        boxShadow: "0 0 30px rgba(0,0,0,0.5)",
                        padding: "12px"
                      }}
                      itemStyle={{ color: "#3B82F6", fontWeight: 900, fontSize: '11px', textTransform: 'uppercase' }}
                      labelStyle={{ color: "#94A3B8", fontWeight: 900, fontSize: '10px', marginBottom: '4px' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="percentage"
                      stroke="#3B82F6"
                      strokeWidth={4}
                      fillOpacity={1}
                      fill="url(#colorPct)"
                      animationDuration={2500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTestsOnWorked;
