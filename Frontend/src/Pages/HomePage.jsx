import Lottie from "lottie-react";
import { SubjectCard } from "./SubjectCard";
import { useTestsStore } from "../stores/useTestsStore.js";
import { useEffect } from "react";
import mlAnimation from "../../public/Mapping for machine learning.json";
import {
  BookOpen,
  Target,
  Users,
  GraduationCap,
  BarChart3,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const HomePage = () => {
  const scrollToTests = () => {
    const testsSection = document.getElementById("test-collections");
    if (testsSection) {
      testsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { subject, getSubjects, statistics, getStatistics } = useTestsStore();

  useEffect(() => {
    getSubjects();
  }, [getSubjects]);

  useEffect(() => {
    getStatistics();
  }, [getStatistics]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-50 pt-[68px] overflow-x-hidden font-sans selection:bg-primary-500/30">

      {/* ─── 1. Hero Section ─────────────────────────────────────── */}
      <div className="relative min-h-[60vh] sm:min-h-[90vh] flex items-start sm:items-center pt-10 sm:pt-0 overflow-hidden">
        {/* Animated Mesh Gradient Background */}
        <div className="absolute inset-0 w-full h-full bg-[#0f172a]">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-600/20 blur-[120px] mix-blend-screen animate-pulse duration-10000"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[120px] mix-blend-screen"></div>
          <div className="absolute top-[40%] left-[60%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[100px] mix-blend-screen animate-pulse duration-7000"></div>
          {/* Subtle Grid overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBoLTQweiIvPjxwYXRoIGQ9Ik0xMCAyMGgyMHYyMGgtMjB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9nPjwvc3ZnPg==')] bg-repeat opacity-50"></div>
        </div>

        {/* Two-column hero layout — same container as rest of page */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 py-2 sm:py-0">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-8">

            {/* LEFT — Text content */}
            <div className="flex-1 max-w-2xl text-left">
              {/* Pill badge */}
              <div className="mb-4 sm:mb-10 inline-block">
                <div className="relative inline-flex items-center px-4 sm:px-6 py-2 sm:py-2 rounded-2xl sm:rounded-full border border-primary-500/30 bg-primary-500/10 backdrop-blur-md shadow-[0_0_24px_rgba(16,185,129,0.2)] overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/15 to-primary-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="text-primary-300 text-sm font-semibold tracking-wide flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
                    </span>
                    O&rsquo;zbekistonning ilg&apos;or test platformasi
                  </span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-8 text-white tracking-tight leading-[1.15] sm:leading-[1.1] font-outfit">
                Registon bilan
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-primary-500 to-teal-400 drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  kelajakka qadam
                </span>
              </h1>

              <p className="text-sm sm:text-lg md:text-xl text-slate-300 mb-5 sm:mb-12 leading-relaxed font-light">
                Sun&apos;iy intellekt va zamonaviy texnologiyalar yordamida bilimingizni eng yuqori darajaga olib chiqing.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6">
                {/* Primary Glowing Button */}
                <button
                  onClick={scrollToTests}
                  className="group relative inline-flex items-center justify-center w-full sm:w-auto px-7 sm:px-10 py-3 sm:py-5 font-bold text-white transition-all duration-300 bg-primary-600 rounded-xl sm:rounded-2xl hover:bg-primary-500 overflow-hidden"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary-600 to-emerald-400 opacity-30 group-hover:opacity-60 blur-lg transition-opacity duration-300 -z-10"></div>
                  <span className="relative flex items-center gap-2 text-sm sm:text-lg font-bold">
                    Boshlash
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>

                {/* Secondary Glass Button */}
                <a
                  href="#features"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 sm:px-10 py-3 sm:py-5 font-semibold text-white text-sm sm:text-base transition-all duration-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl"
                >
                  Biz haqimizda
                </a>
              </div>
            </div>

            {/* RIGHT — Lottie Animation — hidden on mobile */}
            <div className="hidden sm:block flex-shrink-0 w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[500px] xl:max-w-[560px] relative">
              <div className="absolute inset-0 rounded-full bg-primary-500/10 blur-[60px] scale-110 pointer-events-none"></div>
              <div className="relative z-10 p-4">
                <Lottie
                  animationData={mlAnimation}
                  loop={true}
                  autoplay={true}
                  className="w-full h-auto drop-shadow-[0_0_40px_rgba(16,185,129,0.2)]"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0f172a] to-transparent z-10"></div>
      </div>

      {/* ─── Shared page container (sections 2–5 + Footer inner) ─── */}
      <div className="container mx-auto px-6 lg:px-12 relative z-20">

        {/* ─── 2. Stats Section ────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-20 sm:mb-32 -mt-4 sm:-mt-16 relative z-30">
          {[
            {
              label: "Jami Fanlar",
              value: statistics?.SubjectsCount ? statistics.SubjectsCount + "+" : "0",
              icon: <BookOpen className="w-5 h-5 sm:w-7 sm:h-7 text-primary-400" />,
            },
            {
              label: "Testlar Bazasi",
              value: statistics?.TestsCount ? statistics.TestsCount + "+" : "0",
              icon: <Target className="w-5 h-5 sm:w-7 sm:h-7 text-emerald-400" />,
            },
            {
              label: "Faol O'quvchilar",
              value: statistics?.StudentCount ? statistics.StudentCount + "+" : "0",
              icon: <Users className="w-5 h-5 sm:w-7 sm:h-7 text-sky-400" />,
            },
            {
              label: "Maxsus Ustozlar",
              value: statistics?.TeacherCount ? statistics.TeacherCount + "+" : "0",
              icon: <GraduationCap className="w-5 h-5 sm:w-7 sm:h-7 text-violet-400" />,
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="group relative bg-[#1e293b]/60 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-3 sm:p-8 hover:bg-[#1e293b]/80 transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Mobile: horizontal / Desktop: vertical */}
              <div className="relative z-10 flex sm:flex-col items-center sm:justify-center gap-2.5 sm:gap-0 sm:text-center">
                <div className="w-9 h-9 sm:w-16 sm:h-16 flex-shrink-0 rounded-lg sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center sm:mb-6 group-hover:scale-110 group-hover:bg-primary-500/20 group-hover:border-primary-500/30 transition-all duration-500">
                  {stat.icon}
                </div>
                <div className="flex flex-col sm:items-center min-w-0">
                  <div className="text-xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-none sm:mb-2 font-outfit drop-shadow-md">
                    {stat.value}
                  </div>
                  <div className="text-[9px] sm:text-sm font-medium text-slate-400 uppercase tracking-wide leading-tight">
                    {stat.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ─── 3. Subjects / Fanlar Katalogi ───────────────────────── */}
        <div id="test-collections" className="scroll-mt-32 mb-32">
          <div className="flex flex-col items-center justify-center mb-16 relative">
            <h2 className="text-3xl lg:text-5xl font-bold text-white text-center tracking-tight mb-6 font-outfit">
              Fanlar Katalogi
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-primary-500 to-transparent rounded-full"></div>
            <p className="text-slate-400 mt-6 text-center max-w-2xl text-lg">
              Eng sifatli testlar bazasidan foydalanib o&apos;z ustingizda ishlang.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {subject && subject?.length > 0 ? (
              subject?.map((subjectItem) => (
                <SubjectCard key={subjectItem._id} subject={subjectItem} />
              ))
            ) : (
              <div className="col-span-full py-20 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 border-dashed relative overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"></div>
                <p className="text-center text-slate-400 text-xl font-medium flex justify-center items-center space-x-3 relative z-10">
                  <span className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-primary-500"></span>
                  </span>
                  <span>Hozircha fanlar mavjud emas</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ─── 4. Features Section ─────────────────────────────────── */}
        <div id="features" className="scroll-mt-32 mb-32 relative">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-primary-600/10 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="flex flex-col items-center justify-center mb-16 relative z-10">
            <h2 className="text-3xl lg:text-5xl font-bold text-white text-center tracking-tight mb-6 font-outfit">
              Nega aynan biz?
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-emerald-500 to-transparent rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {[
              {
                title: "Tezkor Tahlil",
                description: "Testni yakunlashingiz bilan barcha natijalar va xatolar analitikasi taqdim etiladi.",
                icon: <BarChart3 className="w-8 h-8 text-primary-400" />,
                accent: "from-primary-500/20 to-primary-500/5",
                border: "group-hover:border-primary-500/40",
              },
              {
                title: "Yuqori Sifat",
                description: "DTM standartlariga to'la javob beruvchi, ekspertlar tomonidan tuzilgan bazalar.",
                icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
                accent: "from-emerald-500/20 to-emerald-500/5",
                border: "group-hover:border-emerald-500/40",
              },
              {
                title: "Premium Tajriba",
                description: "Chalg'ituvchi reklamalarsiz, mutlaqo toza va zamonaviy interfeys.",
                icon: <Sparkles className="w-8 h-8 text-violet-400" />,
                accent: "from-violet-500/20 to-violet-500/5",
                border: "group-hover:border-violet-500/40",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`bg-[#1e293b]/40 backdrop-blur-lg rounded-3xl p-8 border border-white/5 ${feature.border} transition-all duration-500 group hover:-translate-y-1`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.accent} border border-white/10 flex items-center justify-center mb-8 group-hover:-translate-y-2 transition-all duration-500`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-outfit">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed font-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── 5. CTA Section ──────────────────────────────────────── */}
        <div className="relative rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-12 lg:p-20 overflow-hidden border border-white/10 shadow-2xl group mb-10 sm:mb-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-[#0f172a] to-emerald-900 transition-transform duration-700 group-hover:scale-105"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBoLTQweiIvPjxwYXRoIGQ9Ik0xMCAyMGgyMHYyMGgtMjB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9nPjwvc3ZnPg==')] bg-repeat opacity-30 mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-12">
            <div className="text-left max-w-2xl">
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight font-outfit mb-3 sm:mb-6 leading-tight">
                Bilimingizni sinashga <br className="hidden md:block" /> tayyormisiz?
              </h3>
              <p className="text-primary-100 text-sm sm:text-lg md:text-xl font-light leading-relaxed opacity-80">
                Minglab o&apos;quvchilar qatoriga qo&apos;shiling. Registon LC bilan o&apos;z maqsadingiz sari qadam tashlang.
              </p>
            </div>

            <div className="flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={scrollToTests}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-10 py-2.5 sm:py-5 font-bold text-[#0f172a] transition-all duration-300 bg-white rounded-xl sm:rounded-2xl hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)] focus:outline-none text-sm sm:text-lg"
              >
                <span>Hozir Boshlash</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

      </div>{/* /shared container */}

      {/* ─── Footer ──────────────────────────────────────────────── */}
      <footer className="bg-[#0b1120] border-t border-white/5 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                <span className="text-white font-bold text-2xl font-outfit">R</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-white font-outfit tracking-wide leading-none">Registon</span>
                <span className="block text-sm text-primary-400 mt-1 uppercase tracking-widest font-medium">O&apos;quv Markazi</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a href="https://t.me/Registan_LC" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary-500 hover:border-transparent transition-all duration-300">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z" /></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-purple-500 hover:border-transparent transition-all duration-300">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-600 hover:border-transparent transition-all duration-300">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
              </a>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-slate-500 font-light">
              &copy; {new Date().getFullYear()} Registon LC. Barcha huquqlar himoyalangan.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
