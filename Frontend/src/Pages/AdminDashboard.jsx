import { useState } from "react";
import {
  PlusIcon,
  UserGroupIcon,
  NoSymbolIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import ViewTeachers from "./ViewTeachers";
import BlockedTeachers from "./BlockedTeachers";
import { useTestsStore } from "../stores/useTestsStore";
import { Loader } from "lucide-react";
import ViewStudents from "./ViewStudents";
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("createSubject");
  const [teacherData, setTeacherData] = useState({
    email: "",
    name: "",
    role: "teacher",
  });
  const { createRole, loading, createSubjects } = useTestsStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subjectData, setSubjectData] = useState({
    subjectName: "",
    teacherEmail: "",
    teacherName: "",
  });
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleTeacherChange = (e) => {
    setTeacherData({
      ...teacherData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubjectChange = (e) => {
    setSubjectData({
      ...subjectData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTeacherSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Teacher Data:", teacherData);
    createRole(teacherData).finally(() => {
      setIsSubmitting(false);
    });
  };

  const handleSubjectSubmit = (e) => {
    e.preventDefault();
    setButtonLoading(true);
    console.log("Subject Data:", subjectData);
    createSubjects(subjectData).finally(() => {
      setButtonLoading(false);
    });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-50 pt-24 md:pt-32 pb-8 px-4 md:px-8 font-sans selection:bg-primary-500/30">

      {/* Dynamic Animated Background Elements */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {/* Animated Glowing Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-600/20 blur-[120px] mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-600/15 blur-[120px] mix-blend-screen animate-[pulse_10s_ease-in-out_infinite_reverse]"></div>
        <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] rounded-full bg-teal-500/10 blur-[100px] mix-blend-screen animate-[pulse_12s_ease-in-out_infinite]"></div>

        {/* Subtle Grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBoLTQweiIvPjxwYXRoIGQ9Ik0xMCAyMGgyMHYyMGgtMjB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9nPjwvc3ZnPg==')] bg-repeat opacity-30 mix-blend-overlay"></div>

        {/* Ambient rotating large gradient shape */}
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-gradient-to-tr from-primary-500/10 via-emerald-400/5 to-transparent blur-[80px] rounded-full animate-[spin_40s_linear_infinite] mix-blend-screen origin-center"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center mb-8 md:mb-12 relative">
          <h1 className="text-3xl lg:text-5xl font-bold text-white text-center tracking-tight mb-4 font-outfit drop-shadow-md">
            Admin Boshqaruv Paneli
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-primary-500 to-transparent rounded-full"></div>
        </div>

        {/* Navigation Buttons (Glassmorphism Pills) */}
        <div className="bg-[#1e293b]/40 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-full p-2 mb-8 md:mb-10 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-0">
            <button
              onClick={() => setActiveTab("createSubject")}
              className={`flex items-center justify-center w-full px-4 py-3 rounded-xl md:rounded-full text-sm font-semibold transition-all duration-300
                ${activeTab === "createSubject"
                  ? "bg-primary-600/90 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] border border-primary-500/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              <span className="whitespace-nowrap">Fan Yaratish</span>
            </button>
            <button
              onClick={() => setActiveTab("viewTeachers")}
              className={`flex items-center justify-center w-full px-4 py-3 rounded-xl md:rounded-full text-sm font-semibold transition-all duration-300
                ${activeTab === "viewTeachers"
                  ? "bg-primary-600/90 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] border border-primary-500/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
            >
              <UserGroupIcon className="w-5 h-5 mr-2" />
              <span className="whitespace-nowrap">O'qituvchilar</span>
            </button>
            <button
              onClick={() => setActiveTab("blockedTeachers")}
              className={`flex items-center justify-center w-full px-4 py-3 rounded-xl md:rounded-full text-sm font-semibold transition-all duration-300
                ${activeTab === "blockedTeachers"
                  ? "bg-primary-600/90 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] border border-primary-500/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
            >
              <NoSymbolIcon className="w-5 h-5 mr-2" />
              <span className="whitespace-nowrap">Jazolanganlar</span>
            </button>
            <button
              onClick={() => setActiveTab("viewStudents")}
              className={`flex items-center justify-center w-full px-4 py-3 rounded-xl md:rounded-full text-sm font-semibold transition-all duration-300
                ${activeTab === "viewStudents"
                  ? "bg-primary-600/90 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] border border-primary-500/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
            >
              <AcademicCapIcon className="w-5 h-5 mr-2" />
              <span className="whitespace-nowrap">O'quvchilar</span>
            </button>
          </div>
        </div>

        {activeTab === "createSubject" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Teacher Creation Form */}
            <div className="bg-[#1e293b]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 hover:bg-[#1e293b]/80 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-500/5 border border-primary-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <UserGroupIcon className="w-6 h-6 text-primary-400" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white font-outfit">
                  Yangi O'qituvchi Qo'shish
                </h2>
              </div>

              <form onSubmit={handleTeacherSubmit} className="space-y-5 relative z-10">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Ism
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={teacherData.name}
                    onChange={handleTeacherChange}
                    className="w-full px-5 py-3.5 text-base border border-white/10 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-[#0f172a]/80 text-white placeholder-slate-500 transition-all focus:outline-none"
                    placeholder="O'qituvchi ismini kiriting"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={teacherData.email}
                    onChange={handleTeacherChange}
                    className="w-full px-5 py-3.5 text-base border border-white/10 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-[#0f172a]/80 text-white placeholder-slate-500 transition-all focus:outline-none"
                    placeholder="O'qituvchi emailini kiriting"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Lavozim
                  </label>
                  <select
                    name="role"
                    value={teacherData.role}
                    onChange={handleTeacherChange}
                    className="w-full px-5 py-3.5 text-base border border-white/10 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-[#0f172a]/80 text-white transition-all appearance-none focus:outline-none"
                  >
                    <option value="admin" className="bg-[#1e293b] text-white py-2">
                      Admin
                    </option>
                    <option value="teacher" className="bg-[#1e293b] text-white py-2">
                      O'qituvchi
                    </option>
                    <option value="student" className="bg-[#1e293b] text-white py-2">
                      O'quvchi
                    </option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className={`group/btn relative w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-xl text-base font-bold text-white transition-all duration-300 mt-6 overflow-hidden ${isSubmitting || loading
                    ? "bg-slate-700 cursor-not-allowed text-slate-400"
                    : "bg-primary-600 hover:bg-primary-500"
                    }`}
                >
                  {!isSubmitting && !loading && (
                    <>
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary-600 to-emerald-400 opacity-0 group-hover/btn:opacity-40 blur-lg transition-opacity duration-300 -z-10"></div>
                    </>
                  )}
                  {isSubmitting || loading ? (
                    <>
                      <Loader className="mr-2 h-5 w-5 animate-spin" />
                      <span className="ml-2">Yuklanmoqda...</span>
                    </>
                  ) : (
                    <span className="relative z-10 flex items-center gap-2">
                      <PlusIcon className="w-5 h-5 text-white/80" />
                      Qo'shish
                    </span>
                  )}
                </button>
              </form>
            </div>

            {/* Subject Assignment Form */}
            <div className="bg-[#1e293b]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 hover:bg-[#1e293b]/80 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <AcademicCapIcon className="w-6 h-6 text-emerald-400" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white font-outfit">
                  Fan Biriktirish
                </h2>
              </div>

              <form onSubmit={handleSubjectSubmit} className="space-y-5 relative z-10">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Fan nomi
                  </label>
                  <input
                    type="text"
                    name="subjectName"
                    value={subjectData.subjectName}
                    onChange={handleSubjectChange}
                    className="w-full px-5 py-3.5 text-base border border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-[#0f172a]/80 text-white placeholder-slate-500 transition-all focus:outline-none"
                    placeholder="Fan nomini kiriting"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    O'qituvchi ismi
                  </label>
                  <input
                    type="text"
                    name="teacherName"
                    value={subjectData.teacherName}
                    onChange={handleSubjectChange}
                    className="w-full px-5 py-3.5 text-base border border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-[#0f172a]/80 text-white placeholder-slate-500 transition-all focus:outline-none"
                    placeholder="O'qituvchi ismini kiriting"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    O'qituvchi emaili
                  </label>
                  <input
                    type="email"
                    name="teacherEmail"
                    value={subjectData.teacherEmail}
                    onChange={handleSubjectChange}
                    className="w-full px-5 py-3.5 text-base border border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-[#0f172a]/80 text-white placeholder-slate-500 transition-all focus:outline-none"
                    placeholder="O'qituvchi emailini kiriting"
                  />
                </div>
                <button
                  type="submit"
                  disabled={buttonLoading}
                  className={`group/btn relative w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-xl text-base font-bold text-white transition-all duration-300 mt-6 overflow-hidden ${buttonLoading
                    ? "bg-slate-700 cursor-not-allowed text-slate-400"
                    : "bg-emerald-600 hover:bg-emerald-500"
                    }`}
                >
                  {!buttonLoading && (
                    <>
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-400 opacity-0 group-hover/btn:opacity-40 blur-lg transition-opacity duration-300 -z-10"></div>
                    </>
                  )}
                  {buttonLoading ? (
                    <>
                      <Loader className="mr-2 h-5 w-5 animate-spin" />
                      <span className="ml-2">Yuklanmoqda...</span>
                    </>
                  ) : (
                    <span className="relative z-10 flex items-center gap-2">
                      <AcademicCapIcon className="w-5 h-5 text-white/80" />
                      Biriktirish
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Render child components inside an updated container context if visible */}
        <div className="mt-8 relative z-20">
          {activeTab === "viewTeachers" && <ViewTeachers />}
          {activeTab === "blockedTeachers" && <BlockedTeachers />}
          {activeTab === "viewStudents" && <ViewStudents />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
