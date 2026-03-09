import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaChevronRight, FaClock, FaSearch, FaTimes, FaPlus, FaPlay } from "react-icons/fa";
import { RiMailOpenFill, RiInboxArchiveLine, RiMistLine, RiRocket2Fill } from "react-icons/ri";
import { HiSparkles } from "react-icons/hi";
import { useUserStore } from "../stores/useUserStore";
import { useState, useEffect } from "react";
import { useTestsStore } from "../stores/useTestsStore";
import { useNavigate, useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

const EachTests = ({ name }) => {
  const { user } = useUserStore();
  const { id } = useParams();
  const { deleteTest, mytests, getMytests, loading, getTestQuestions } =
    useTestsStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [animate, setAnimate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const testsPerPage = 6;

  const tests = mytests
    ? [...mytests]
      .filter(test => test.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];
  const subjectName = name;

  const indexOfLastTest = currentPage * testsPerPage;
  const indexOfFirstTest = indexOfLastTest - testsPerPage;
  const currentTests = tests.slice(indexOfFirstTest, indexOfLastTest);
  const totalPages = Math.ceil(tests.length / testsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

  useEffect(() => {
    getMytests(id);
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getMytests, id]);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setAnimate(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const handleDelete = (test) => {
    setSelectedTest(test);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteTest(selectedTest._id);
    setShowDeleteModal(false);
    setSelectedTest(null);
  };

  const navigate = useNavigate();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-[#020617]">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-primary-500/10 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-[#020617] text-white pt-24 pb-12 sm:pt-32 relative overflow-hidden flex flex-col items-center">
      {/* Cosmos Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Deep Space Nebulae */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-900/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] bg-indigo-900/10 blur-[90px] rounded-full animate-pulse" style={{ animationDelay: '5s' }} />

        {/* Twinkling Stars */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            initial={{ opacity: Math.random() }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.8)]"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
          />
        ))}

        {/* Cosmic Dust Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0,
              scale: 0.1
            }}
            animate={{
              x: [null, Math.random() * 100 + "%", Math.random() * 100 + "%"],
              y: [null, Math.random() * 100 + "%", Math.random() * 100 + "%"],
              opacity: [0, 0.3, 0],
              scale: [0.1, 1, 0.1]
            }}
            transition={{ duration: 30 + Math.random() * 40, repeat: Infinity, ease: "linear" }}
            className="absolute"
            style={{ left: 0, top: 0 }}
          >
            <HiSparkles className="text-primary-400 text-sm" />
          </motion.div>
        ))}

        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.2]" />
      </div>

      {/* Header Section: Title Left, Search Right */}
      <div className="relative mb-12 sm:mb-20 w-full container mx-auto px-4 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Left: Title & Info */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex-1"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-primary-500/10 border border-primary-500/20 rounded-xl flex items-center justify-center">
                <RiRocket2Fill className="text-xl text-primary-400 animate-bounce" style={{ animationDuration: '3s' }} />
              </div>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-primary-400/80">Cosmos Experience</span>
            </div>
            <h1 className="text-4xl sm:text-7xl font-black font-outfit tracking-tighter text-white drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              {subjectName}
            </h1>
            <p className="mt-4 text-slate-400 text-sm sm:text-base font-medium flex items-center gap-2">
              <RiMistLine className="text-primary-500" />
              <span>Jami <span className="text-white font-bold">{tests.length} ta</span> koinot testlari mavjud</span>
            </p>
          </motion.div>

          {/* Right: Search Only */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 lg:min-w-[400px]"
          >
            {/* Search Input */}
            <div className="relative flex-1 group">
              <div className="absolute inset-0 bg-primary-500/5 blur-xl group-hover:bg-primary-500/10 transition-colors pointer-events-none" />
              <div className="relative flex items-center backdrop-blur-3xl bg-white/[0.03] border border-white/10 hover:border-primary-500/40 rounded-2xl px-5 transition-all duration-300 focus-within:border-primary-500/50">
                <FaSearch className="text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Test nomini qidiring..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 outline-none py-3.5 px-3 text-sm text-white placeholder-slate-500 font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="p-1.5 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-all"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Testlar ro'yxati: 2-Column Grid with Compact Rows */}
      <div className="w-full container mx-auto px-4 lg:px-12 relative z-10 mb-20">
        {tests.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 backdrop-blur-3xl bg-white/[0.02] border border-white/5 rounded-[3rem] shadow-2xl"
          >
            <div className="w-24 h-24 mx-auto mb-8 bg-white/5 rounded-[2rem] flex items-center justify-center border border-white/10 relative group">
              <div className="absolute inset-0 bg-primary-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <RiInboxArchiveLine className="w-10 h-10 text-slate-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 font-outfit">Testlar topilmadi</h3>
            <p className="text-slate-500 max-w-xs mx-auto leading-relaxed">Qidiringiz bo'yicha yoki ushbu fan uchun testlar mavjud emas.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
            {currentTests.map((test, index) => (
              <motion.div
                key={test._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div className="relative backdrop-blur-3xl bg-[#0a0f1e]/60 hover:bg-[#0f172a]/80 border border-white/10 hover:border-primary-500/40 rounded-3xl p-5 sm:p-6 transition-all duration-300 shadow-xl flex items-center gap-5 active:scale-[0.98]">
                  {/* Miniature Icon */}
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-primary-600/20 to-sky-400/20 flex items-center justify-center border border-white/5">
                      <RiMailOpenFill className="text-lg text-primary-400" />
                    </div>
                  </div>

                  {/* Title and Info in middle Row */}
                  <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <h3 className="text-sm sm:text-base font-bold text-white font-outfit truncate flex-grow group-hover:text-primary-400 transition-colors">
                      {test.title}
                    </h3>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="px-3 py-1 bg-primary-500/10 rounded-lg text-primary-400 text-[9px] font-black uppercase tracking-wider border border-primary-500/10 whitespace-nowrap">
                        {test.questionsMassive.length} TA SAVOL
                      </span>
                      <div className="flex items-center gap-1.5 text-slate-500 text-[8px] font-bold uppercase tracking-widest">
                        <span>{formatDate(test.createdAt).split(' ')[0]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {user?.role === "teacher" && user._id === test.teacher && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(test);
                        }}
                        className="p-2.5 bg-rose-500/5 text-rose-500 hover:bg-rose-500 hover:text-white rounded-lg border border-rose-500/10 transition-all active:scale-90"
                      >
                        <FaTrash className="text-[10px]" />
                      </button>
                    )}
                    <button
                      onClick={() => {
                        navigate(`/get/questions/${test._id}`);
                        getTestQuestions(test._id);
                      }}
                      className="p-2.5 bg-primary-600/10 text-primary-400 hover:bg-primary-600 hover:text-white rounded-lg border border-primary-500/20 transition-all group/btn"
                    >
                      <FaPlay className="text-[10px] sm:text-[11px] group-hover/btn:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {tests.length > testsPerPage && (
        <div className="flex items-center justify-center mb-20 space-x-2 relative z-10">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="w-12 h-12 flex items-center justify-center rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 text-slate-400 disabled:opacity-20 hover:text-white hover:bg-white/10 transition-all active:scale-90"
          >
            ❮
          </button>
          <div className="flex items-center gap-2 px-2">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`w-12 h-12 rounded-2xl font-black transition-all duration-500 flex items-center justify-center ${currentPage === number
                  ? "bg-primary-600 text-white shadow-[0_0_25px_rgba(59,130,246,0.3)] scale-110"
                  : "backdrop-blur-xl bg-white/5 border border-white/10 text-slate-500 hover:text-white hover:bg-white/10"
                  }`}
              >
                {number}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="w-12 h-12 flex items-center justify-center rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 text-slate-400 disabled:opacity-20 hover:text-white hover:bg-white/10 transition-all active:scale-90"
          >
            ❯
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal (Premium Refined) */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#020617]/90 backdrop-blur-md"
              onClick={() => setShowDeleteModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md backdrop-blur-3xl bg-[#0f172a]/95 border border-white/10 rounded-[3rem] p-10 text-center shadow-[0_0_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-600 to-rose-400 opacity-50" />

              <div className="w-20 h-20 mx-auto mb-8 bg-rose-500/10 border border-rose-500/20 rounded-[2rem] flex items-center justify-center group shadow-inner">
                <FaTrash className="text-2xl text-rose-500 group-hover:scale-110 transition-transform" />
              </div>

              <h3 className="text-3xl font-bold text-white mb-4 font-outfit tracking-tight">Testni o'chirish</h3>
              <p className="text-slate-400 text-sm mb-10 leading-relaxed font-medium">
                Rostdan ham bu testni butunlay o'chirib yubormoqchimisiz? Ushbu amalni qaytarib bo'lmaydi.
              </p>

              <div className="flex flex-col gap-4">
                <button
                  onClick={confirmDelete}
                  className="w-full py-4 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl shadow-xl shadow-rose-500/20 transition-all active:scale-95"
                >
                  O'chirishni tasdiqlash
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="w-full py-4 bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs uppercase tracking-widest rounded-2xl border border-white/10 transition-all active:scale-95"
                >
                  Bekor qilish
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div >
  );
};

export default EachTests;
