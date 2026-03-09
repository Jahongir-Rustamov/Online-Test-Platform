import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTelegramPlane,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaClock,
} from "react-icons/fa";
import { MessageCircle, Send, Sparkles } from "lucide-react";

/* ── Reusable fade-in variant ── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" },
  }),
};

const Contact = () => {
  const starsArray = useMemo(() => Array.from({ length: 45 }).map(() => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 5,
    xOffset: Math.random() * 20 - 10,
  })), []);

  const contacts = [
    {
      icon: <FaPhone className="w-5 h-5" />,
      label: "Telefon raqam",
      value: "+998 99 765 43 21",
      href: "tel:+998997654321",
      color: "emerald",
    },
    {
      icon: <FaTelegramPlane className="w-5 h-5" />,
      label: "Telegram (Reseption)",
      value: "@registon_admin",
      href: "https://t.me/registon_admin",
      color: "sky",
      external: true,
    },
    {
      icon: <FaMapMarkerAlt className="w-5 h-5" />,
      label: "Manzil",
      value: "Urganch shahri, Al-Xorazmiy ko'chasi,15-uy",
      color: "violet",
    },
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      label: "Email",
      value: "info@registonlc.uz",
      href: "mailto:info@registonlc.uz",
      color: "teal",
    },
  ];

  const socials = [
    {
      icon: <FaTelegramPlane className="w-6 h-6" />,
      label: "Telegram",
      handle: "@Registan_LC",
      href: "https://t.me/Registan_LC",
      gradient: "from-sky-400 to-blue-600",
      glow: "shadow-sky-500/30",
    },
    {
      icon: <FaInstagram className="w-6 h-6" />,
      label: "Instagram",
      handle: "@registon.uz",
      href: "https://instagram.com/registon.uz",
      gradient: "from-pink-500 via-red-500 to-yellow-500",
      glow: "shadow-pink-500/30",
    },
    {
      icon: <FaFacebookF className="w-6 h-6" />,
      label: "Facebook",
      handle: "Registon LC",
      href: "https://facebook.com/registon",
      gradient: "from-blue-600 to-indigo-700",
      glow: "shadow-blue-500/30",
    },
    {
      icon: <FaYoutube className="w-6 h-6" />,
      label: "YouTube",
      handle: "@registonuz",
      href: "https://youtube.com/registonuz",
      gradient: "from-red-500 to-rose-700",
      glow: "shadow-red-500/30",
    },
  ];

  const hours = [
    { day: "Dushanba – Juma", time: "08:00 – 18:00", open: true },
    { day: "Shanba", time: "09:00 – 15:00", open: true },
    { day: "Yakshanba", time: "Yopiq", open: false },
  ];

  const colorMap = {
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", hover: "hover:border-emerald-500/40 hover:bg-emerald-500/15" },
    sky: { bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/20", hover: "hover:border-sky-500/40 hover:bg-sky-500/15" },
    violet: { bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/20", hover: "hover:border-violet-500/40 hover:bg-violet-500/15" },
    teal: { bg: "bg-teal-500/10", text: "text-teal-400", border: "border-teal-500/20", hover: "hover:border-teal-500/40 hover:bg-teal-500/15" },
  };

  return (
    <div className="min-h-screen bg-[#0b1021] text-slate-100 overflow-x-hidden font-sans pt-[68px] relative">

      {/* ── Breathtaking Animated Background ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* Dynamic Glowing Nebulas */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 15, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-600/20 blur-[140px] mix-blend-screen"
        />
        <motion.div
          animate={{ scale: [1, 1.25, 1], rotate: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-teal-600/20 blur-[150px] mix-blend-screen"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-[35%] left-[50%] w-[45%] h-[45%] rounded-full bg-violet-600/15 blur-[120px] mix-blend-screen"
        />

        {/* Floating Stars Layer */}
        {starsArray.map((star, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.1, y: 0 }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              y: [0, -30, 0],
              x: [0, star.xOffset, 0]
            }}
            transition={{ duration: star.duration, repeat: Infinity, ease: "easeInOut", delay: star.delay }}
            className="absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: "0 0 12px rgba(255,255,255,0.9)",
            }}
          />
        ))}

        {/* Aesthetic Tech Grid */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='rgba(255,255,255,0.06)' fill-rule='evenodd'%3E%3Cpath d='M0 40h40V0H0v40zM1 39h38V1H1v38z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-20">

        {/* ── HERO ── */}
        <motion.div
          className="text-center mb-16 sm:mb-24"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {/* Pill badge */}
          <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-emerald-300 text-sm font-semibold tracking-wide">
              7/5 jonli qo&apos;llab-quvvatlash
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6 font-outfit"
          >
            Biz bilan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 drop-shadow-[0_0_30px_rgba(52,211,153,0.3)]">
              bog&apos;laning
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Savollaringiz bormi? Biz doim yordamga tayyormiz. Quyidagi
            kanallar orqali murojaat qiling — tez javob beramiz.
          </motion.p>
        </motion.div>

        {/* ── CONTACT CARDS ── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {contacts.map((c, i) => {
            const cl = colorMap[c.color];
            const Inner = (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className={`group relative bg-[#1e293b]/60 backdrop-blur-xl rounded-2xl p-6 border ${cl.border} ${cl.hover} transition-all duration-400 hover:-translate-y-1 overflow-hidden cursor-pointer`}
              >
                {/* Hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cl.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl`} />
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl ${cl.bg} ${cl.text} flex items-center justify-center mb-4 border ${cl.border} group-hover:scale-110 transition-transform duration-300`}>
                    {c.icon}
                  </div>
                  <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">{c.label}</p>
                  <p className={`text-white font-semibold text-sm leading-snug group-hover:${cl.text} transition-colors duration-300`}>
                    {c.value}
                  </p>
                </div>
              </motion.div>
            );

            return c.href ? (
              <a key={i} href={c.href} target={c.external ? "_blank" : undefined} rel="noopener noreferrer" className="block">
                {Inner}
              </a>
            ) : (
              <div key={i}>{Inner}</div>
            );
          })}
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* LEFT — Working hours + CTA */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Working hours */}
            <motion.div
              variants={fadeUp}
              custom={0}
              className="bg-[#1e293b]/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-emerald-500/20 transition-all duration-400 h-full"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <FaClock className="w-5 h-5" />
                </div>
                <h3 className="text-white font-bold text-lg font-outfit">Ish vaqtlari</h3>
              </div>

              <div className="space-y-3">
                {hours.map((h, i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center py-3 px-4 rounded-xl border transition-all duration-300 ${h.open
                      ? "bg-emerald-500/5 border-emerald-500/15"
                      : "bg-red-500/5 border-red-500/15"
                      }`}
                  >
                    <span className="text-slate-300 text-sm">{h.day}</span>
                    <span className={`text-sm font-semibold flex items-center gap-2 ${h.open ? "text-emerald-400" : "text-red-400"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${h.open ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" : "bg-red-400"}`} />
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quick contact CTA */}
              <a
                href="https://t.me/registon_admin"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 flex items-center justify-center gap-3 w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all duration-300 overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Send className="w-4 h-4 relative" />
                <span className="relative">Hozir yozing</span>
              </a>
            </motion.div>

            {/* Sparkle card */}
            <motion.div
              variants={fadeUp}
              custom={1}
              className="relative bg-gradient-to-br from-emerald-900/40 to-teal-900/30 backdrop-blur-xl rounded-2xl p-6 border border-emerald-500/20 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/15 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              <div className="relative z-10">
                <Sparkles className="w-8 h-8 text-emerald-400 mb-4" />
                <h4 className="text-white font-bold text-lg font-outfit mb-2">Ustoz bo&apos;lishni xohlaysizmi?</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  O&apos;z bilim va tajribangizni o&apos;quvchilar bilan baham ko&apos;ring. Resepstion orqali murojaat qiling.
                </p>
                <a
                  href="https://t.me/registon_admin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-300 text-sm font-semibold hover:text-emerald-200 transition-colors duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  Bog&apos;lanish &rarr;
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — Map + Socials */}
          <motion.div
            className="lg:col-span-3 flex flex-col gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {/* Google Maps */}
            <motion.div
              variants={fadeUp}
              custom={0}
              className="bg-[#1e293b]/60 backdrop-blur-xl rounded-2xl p-2 border border-white/10 hover:border-emerald-500/20 transition-all duration-400 overflow-hidden"
            >
              <div className="relative w-full h-[260px] sm:h-[340px] rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2986.7975041673584!2d60.629753!3d41.550987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDMzJzAzLjYiTiA2MMKwMzcnNDcuMSJF!5e0!3m2!1suz!2s!4v1625136425784!5m2!1suz!2s"
                  className="w-full h-full"
                  style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) brightness(0.85) saturate(0.8)" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                {/* Map overlay badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0f172a]/90 backdrop-blur-sm border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
                  <FaMapMarkerAlt className="w-3 h-3" />
                  Urganch, Al-Xorazmiy ko&apos;chasi
                </div>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              variants={fadeUp}
              custom={1}
              className="bg-[#1e293b]/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-emerald-500/20 transition-all duration-400"
            >
              <h3 className="text-white font-bold text-lg font-outfit mb-6 flex items-center gap-2">
                <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-emerald-400 to-teal-500 inline-block" />
                Ijtimoiy tarmoqlarda kuzating
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {socials.map((s, i) => (
                  <motion.a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={fadeUp}
                    custom={i * 0.5 + 1}
                    className={`group flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white shadow-lg ${s.glow} group-hover:scale-110 transition-transform duration-300`}>
                      {s.icon}
                    </div>
                    <div className="text-center">
                      <p className="text-white font-semibold text-sm">{s.label}</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">{s.handle}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── BOTTOM CTA BANNER ── */}
        <motion.div
          className="relative mt-16 rounded-[2rem] overflow-hidden border border-white/10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={0}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-[#0f172a] to-teal-900" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/15 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='rgba(255,255,255,0.03)' fill-rule='evenodd'%3E%3Crect width='1' height='40' x='20'/%3E%3Crect width='40' height='1' y='20'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 px-8 sm:px-12 py-10 sm:py-14">
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white font-outfit mb-3">
                Hali ham savolingiz bormi?
              </h3>
              <p className="text-emerald-200/70 text-base sm:text-lg max-w-xl leading-relaxed">
                Telegram orqali bizga yozing — 5 daqiqada javob beramiz.
              </p>
            </div>
            <a
              href="https://t.me/registon_admin"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-[#0f172a] font-bold text-base shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-100/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <FaTelegramPlane className="w-5 h-5 relative text-sky-600" />
              <span className="relative">Telegram orqali yozing</span>
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;
