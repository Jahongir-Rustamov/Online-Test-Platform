import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { ArrowRight, Loader, Eye, EyeOff, UserPlus } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { motion } from "framer-motion";

const SignUp = () => {
  const [authInfo, setauthInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { signup, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(authInfo, navigate);
  };

  const fields = [
    {
      id: "fullname",
      label: "To'liq ism",
      type: "text",
      placeholder: "Ismingiz Familiyangiz",
      icon: <FaUser className="w-4 h-4" />,
      value: authInfo.name,
      onChange: (v) => setauthInfo({ ...authInfo, name: v }),
    },
    {
      id: "email",
      label: "Email manzil",
      type: "email",
      placeholder: "example@gmail.com",
      icon: <FaEnvelope className="w-4 h-4" />,
      value: authInfo.email,
      onChange: (v) => setauthInfo({ ...authInfo, email: v }),
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4 py-8 pt-[84px] sm:pt-8 overflow-hidden relative">

      {/* Ambient orbs */}
      <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[55%] h-[55%] rounded-full bg-teal-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full bg-violet-500/5 blur-[100px] pointer-events-none" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='rgba(255,255,255,0.025)' fill-rule='evenodd'%3E%3Crect width='1' height='40' x='20'/%3E%3Crect width='40' height='1' y='20'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-7">
          <div className="relative mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.4)]">
              <span className="text-white font-extrabold text-xl">SM</span>
            </div>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#0f172a] shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </div>
          <h1 className="text-white font-extrabold text-2xl font-outfit tracking-wide">
            SMART<span className="text-emerald-400">-EXAM</span>
          </h1>
          <p className="text-slate-500 text-xs tracking-widest uppercase mt-1">Online Test Platform</p>
        </div>

        {/* Card */}
        <div className="bg-[#1e293b]/70 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.5)] overflow-hidden">

          {/* Header */}
          <div className="px-8 pt-8 pb-5 border-b border-white/10 bg-gradient-to-br from-emerald-500/8 to-transparent">
            <div className="flex items-center gap-2 mb-1">
              <UserPlus className="w-4 h-4 text-emerald-400" />
              <h2 className="text-white font-bold text-xl font-outfit">Ro&apos;yxatdan o&apos;tish</h2>
            </div>
            <p className="text-slate-400 text-sm">Ma&apos;lumotlaringizni to&apos;ldiring</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-5 space-y-4">

            {/* Text + Email fields */}
            {fields.map((f) => (
              <div key={f.id}>
                <label className="block text-slate-300 text-sm font-medium mb-2">{f.label}</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                    {f.icon}
                  </div>
                  <input
                    type={f.type}
                    id={f.id}
                    placeholder={f.placeholder}
                    required
                    value={f.value}
                    onChange={(e) => f.onChange(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                  />
                </div>
              </div>
            ))}

            {/* Password */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Parol</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                  <FaLock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  required
                  value={authInfo.password}
                  onChange={(e) => setauthInfo({ ...authInfo, password: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-xl pl-10 pr-11 py-3 text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                />
                <button type="button" onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-emerald-400 transition-colors duration-200">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Parolni tasdiqlang</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                  <FaLock className="w-4 h-4" />
                </div>
                <input
                  type={showConfirm ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="••••••••"
                  required
                  value={authInfo.confirmPassword}
                  onChange={(e) => setauthInfo({ ...authInfo, confirmPassword: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-xl pl-10 pr-11 py-3 text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                />
                <button type="button" onClick={() => setShowConfirm((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-emerald-400 transition-colors duration-200">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Password match indicator */}
            {authInfo.confirmPassword && (
              <p className={`text-xs flex items-center gap-1.5 ${authInfo.password === authInfo.confirmPassword ? "text-emerald-400" : "text-red-400"}`}>
                <span className={`w-1.5 h-1.5 rounded-full inline-block ${authInfo.password === authInfo.confirmPassword ? "bg-emerald-400" : "bg-red-400"}`} />
                {authInfo.password === authInfo.confirmPassword ? "Parollar mos keldi" : "Parollar mos kelmadi"}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.01] transition-all duration-300 disabled:opacity-60 disabled:scale-100 overflow-hidden mt-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin relative" />
                  <span className="relative">Yuklanmoqda...</span>
                </>
              ) : (
                <>
                  <span className="relative">Ro&apos;yxatdan o&apos;tish</span>
                  <ArrowRight className="w-4 h-4 relative group-hover:translate-x-0.5 transition-transform duration-300" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="px-8 pb-7 text-center">
            <p className="text-slate-500 text-sm">
              Hisobingiz bormi?{" "}
              <Link to="/login" className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors duration-200 inline-flex items-center gap-1">
                Kirish <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          © {new Date().getFullYear()} Registon LC · Barcha huquqlar himoyalangan
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
