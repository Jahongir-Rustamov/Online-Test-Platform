import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0f172a] overflow-hidden">

      {/* Ambient glow orbs — same as HomePage */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-600/15 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-teal-600/10 blur-[120px]" />
      <div className="absolute top-[40%] left-[60%] w-[40%] h-[40%] rounded-full bg-emerald-500/8 blur-[100px] animate-pulse" style={{ animationDuration: "7s" }} />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M0 0h40v40h-40z'/%3E%3Cpath d='M10 20h20v20h-20z' fill='rgba(255,255,255,0.02)'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Main loader card */}
      <div className="relative flex flex-col items-center gap-10 z-10">

        {/* Spinning rings + logo */}
        <div className="relative flex items-center justify-center">
          {/* Outer slow ring */}
          <motion.div
            className="absolute w-28 h-28 rounded-full border border-emerald-500/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
          </motion.div>

          {/* Middle ring */}
          <motion.div
            className="absolute w-20 h-20 rounded-full border border-teal-500/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.9)]" />
          </motion.div>

          {/* Center glow */}
          <div className="absolute w-14 h-14 rounded-full bg-emerald-500/10 blur-md" />

          {/* Logo box */}
          <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-[0_0_40px_rgba(52,211,153,0.4)]">
            <span className="text-white font-extrabold text-lg tracking-wider">SM</span>
          </div>
        </div>

        {/* Brand text */}
        <div className="flex flex-col items-center gap-2">
          <motion.h2
            className="text-2xl font-extrabold text-white tracking-wide font-outfit"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            SMART<span className="text-emerald-400">-EXAM</span>
          </motion.h2>
          <motion.p
            className="text-xs text-slate-500 tracking-[0.2em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Online Test Platform
          </motion.p>
        </div>

        {/* Progress bar */}
        <motion.div
          className="w-48 h-[2px] rounded-full bg-white/5 overflow-hidden relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
            initial={{ width: "0%" }}
            animate={{ width: ["0%", "60%", "80%", "95%"] }}
            transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
          />
        </motion.div>

        {/* Loading dots */}
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
