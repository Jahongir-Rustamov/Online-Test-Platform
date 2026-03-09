import { Home, LogIn, Menu, UserPlus, X, ChevronDown, Bell } from "lucide-react";
import {
  FaTachometerAlt,
  FaClipboardList,
  FaHeadset,
  FaSignOutAlt,
  FaTelegramPlane,
  FaUser,
  FaShieldAlt,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useUserStore();
  const Navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);

  const HaveId = user?.ID;

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside — close profile dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    Navigate("/login");
  };

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const navLinks = [
    { to: "/", text: "Bosh sahifa", icon: <Home className="w-4 h-4" /> },
    ...(user?.role === "admin"
      ? [{ to: "/admin-dashboard", text: "Dashboard", icon: <FaTachometerAlt className="w-4 h-4" />, badge: "Admin" }]
      : []),
    ...(user?.role === "teacher" && HaveId
      ? [{ to: "/create-test", text: "Test Yaratish", icon: <FaClipboardList className="w-4 h-4" /> }]
      : []),
    ...(user?.role === "parent"
      ? [{ to: "/parents-profile", text: "Farzandim", icon: <FaUser className="w-4 h-4" /> }]
      : []),
    { to: "/contact", text: "Bog'lanish", icon: <FaHeadset className="w-4 h-4" /> },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-[#0f172a]/95 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4)] border-b border-white/10"
        : "bg-[#0f172a]/70 backdrop-blur-xl border-b border-white/5"
        }`}
    >
      {/* Top accent line — emerald gradient matching HomePage */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-80" />

      <div className="container mx-auto px-4 lg:px-12 flex items-center justify-between h-[68px]">

        {/* ── LOGO ── */}
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 group-hover:scale-105 transition-all duration-300">
              <span className="text-white font-extrabold text-sm tracking-wider">SM</span>
            </div>
            {/* Online indicator */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0f172a] shadow-sm shadow-emerald-400/50" />
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-extrabold text-white text-[15px] tracking-wide group-hover:text-emerald-300 transition-colors duration-300">
              SMART<span className="text-emerald-400">-EXAM</span>
            </span>
            <span className="text-[10px] text-emerald-500/80 font-medium tracking-widest uppercase">
              Online Platform
            </span>
          </div>
        </Link>

        {/* ── DESKTOP NAV LINKS ── */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${active
                    ? "text-emerald-300 bg-emerald-500/10 border border-emerald-500/20"
                    : "text-slate-300 hover:text-emerald-300 hover:bg-white/5 border border-transparent"
                    }`}
                >
                  <span className={`transition-colors duration-300 ${active ? "text-emerald-400" : "text-slate-500 group-hover:text-emerald-400"}`}>
                    {link.icon}
                  </span>
                  {link.text}
                  {link.badge && (
                    <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                      {link.badge}
                    </span>
                  )}
                  {/* Active glow underline */}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── RIGHT SECTION ── */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              {/* Notification bell */}
              <button className="hidden lg:flex relative w-9 h-9 items-center justify-center rounded-xl bg-white/5 hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 border border-white/10 hover:border-emerald-500/30 transition-all duration-300">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              </button>

              {/* Profile Dropdown */}
              <div ref={profileRef} className="relative hidden lg:block">
                <button
                  onClick={() => setIsProfileOpen((p) => !p)}
                  className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border transition-all duration-300 ${isProfileOpen
                    ? "bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_20px_rgba(52,211,153,0.1)]"
                    : "bg-white/5 border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5"
                    }`}
                >
                  <div className="relative">
                    <img
                      className="w-7 h-7 rounded-lg object-cover ring-2 ring-emerald-500/30"
                      src="/fotouser.jpg"
                      alt={user.name}
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0f172a]" />
                  </div>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-white font-semibold text-[13px]">{user.name}</span>
                    <span className="text-[10px] text-emerald-400 font-medium capitalize flex items-center gap-1">
                      <FaShieldAlt className="w-2.5 h-2.5" />
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 ml-1 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      className="profile-menu absolute right-0 mt-3 w-64 rounded-2xl bg-[#1e293b]/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden"
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    >
                      {/* Header */}
                      <div className="px-5 py-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <img
                            className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-500/30"
                            src="/fotouser.jpg"
                            alt={user.name}
                          />
                          <div>
                            <p className="text-white font-bold text-sm">{user.name}</p>
                            <p className="text-slate-400 text-xs truncate max-w-[150px]">{user.email}</p>
                            <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold capitalize border border-emerald-500/20">
                              <FaShieldAlt className="w-2.5 h-2.5" />
                              {user.role}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Menu items */}
                      <ul className="py-2 px-2">
                        {[
                          { to: "/my-tests", icon: <FaClipboardList className="w-4 h-4" />, label: "Mening Testlarim" },
                          { to: "https://t.me/JR0525", icon: <FaTelegramPlane className="w-4 h-4" />, label: "Admin bilan bog'lanish", external: true },
                        ].filter((item) => {
                          if (user.role === "parent" && item.label === "Mening Testlarim") {
                            return false;
                          }
                          return true;
                        }).map((item) => (

                          <li key={item.label}>
                            <Link
                              to={item.to}
                              target={item.external ? "_blank" : undefined}
                              onClick={() => setIsProfileOpen(false)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-300 transition-all duration-200 text-sm font-medium group"
                            >
                              <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-slate-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-all duration-200 border border-white/10 group-hover:border-emerald-500/30">
                                {item.icon}
                              </span>
                              {item.label}
                            </Link>
                          </li>
                        ))}
                        <li className="mt-1 pt-1 border-t border-white/10">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200 text-sm font-medium group"
                          >
                            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-slate-400 group-hover:bg-red-500/20 group-hover:text-red-400 transition-all duration-200 border border-white/10 group-hover:border-red-500/30">
                              <FaSignOutAlt className="w-4 h-4" />
                            </span>
                            Chiqish
                          </button>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            /* Auth buttons */
            <div className="hidden lg:flex items-center gap-2">
              <Link
                to="/signup"
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-slate-300 hover:text-emerald-300 hover:border-emerald-500/30 hover:bg-emerald-500/5 font-medium text-sm transition-all duration-300"
              >
                <UserPlus size={15} />
                Ro&apos;yxatdan o&apos;tish
              </Link>
              <Link
                to="/login"
                className="relative group flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <LogIn size={15} className="relative" />
                <span className="relative">Kirish</span>
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <motion.button
            onClick={() => setIsMenuOpen((p) => !p)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-emerald-500/10 text-slate-300 hover:text-emerald-300 border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
            whileTap={{ scale: 0.92 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="lg:hidden overflow-hidden bg-[#0f172a]/98 backdrop-blur-2xl border-t border-white/10"
          >
            {/* User info card */}
            {user && (
              <div className="mx-4 mt-3 p-3 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 flex items-center gap-3">
                <img src="/fotouser.jpg" alt={user.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-500/30" />
                <div>
                  <p className="text-white font-bold text-sm">{user.name}</p>
                  <p className="text-slate-400 text-xs">{user.email}</p>
                </div>
                <span className="ml-auto px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase border border-emerald-500/20">
                  {user.role}
                </span>
              </div>
            )}

            <ul className="px-4 py-3 space-y-1">
              {navLinks.map((link, i) => {
                const active = isActive(link.to);
                return (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, type: "spring", stiffness: 300 }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${active
                        ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-300 border border-emerald-500/20"
                        : "text-slate-300 hover:bg-white/5 hover:text-emerald-300 border border-transparent"
                        }`}
                    >
                      <span className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all duration-200 ${active ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-white/5 text-slate-400 border-white/10"}`}>
                        {link.icon}
                      </span>
                      {link.text}
                      {link.badge && (
                        <span className="ml-auto px-1.5 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </motion.li>
                );
              })}

              {user && (
                <>
                  <motion.li initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navLinks.length * 0.06, type: "spring", stiffness: 300 }}>
                    <Link
                      to="/my-tests"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-white/5 hover:text-emerald-300 font-medium text-sm transition-all duration-200 border border-transparent"
                    >
                      <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-slate-400 border border-white/10">
                        <FaClipboardList className="w-4 h-4" />
                      </span>
                      Mening Testlarim
                    </Link>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navLinks.length + 1) * 0.06, type: "spring", stiffness: 300 }}
                    className="pt-1 border-t border-white/10"
                  >
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 font-medium text-sm transition-all duration-200"
                    >
                      <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-red-400/70 border border-white/10">
                        <FaSignOutAlt className="w-4 h-4" />
                      </span>
                      Chiqish
                    </button>
                  </motion.li>
                </>
              )}

              {!user && (
                <motion.li
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.06 + 0.1, type: "spring", stiffness: 300 }}
                  className="pt-2 flex flex-col gap-2"
                >
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 text-slate-300 font-semibold text-sm hover:border-emerald-500/30 hover:text-emerald-300 hover:bg-emerald-500/5 transition-all duration-300"
                  >
                    <UserPlus size={16} />
                    Ro&apos;yxatdan O&apos;tish
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="relative group flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm shadow-lg shadow-emerald-500/25 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <LogIn size={16} className="relative" />
                    <span className="relative">Kirish</span>
                  </Link>
                </motion.li>
              )}
            </ul>
            <div className="h-3" />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
