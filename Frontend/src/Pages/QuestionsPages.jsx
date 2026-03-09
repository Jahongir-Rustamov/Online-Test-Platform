import { useEffect, useState } from "react";
import { useTestsStore } from "../stores/useTestsStore";
import { PropagateLoader } from "react-spinners";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaChevronRight, FaPlay, FaCheck } from "react-icons/fa";
import { RiInboxArchiveLine, RiRocket2Fill, RiCompass3Fill } from "react-icons/ri";
import { HiSparkles } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const QuestionsPages = () => {
  const { Questions, getTestQuestions, loading, checkAnswers } =
    useTestsStore();
  const { id } = useParams();
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);
  const [randomizedQuestions, setRandomizedQuestions] = useState([]);
  const [Yuborish, SetYuborish] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    getTestQuestions(id);
  }, [getTestQuestions, id]);

  useEffect(() => {
    if (Questions?.questionsMassive) {
      const randomQuestions = Questions.questionsMassive
        .map((q) => ({
          ...q,
          options: [...q.options].sort(() => Math.random() - 0.5),
        }))
        .sort(() => Math.random() - 0.5);
      setRandomizedQuestions(randomQuestions);
    }
  }, [Questions]);

  const handleOptionChange = (testID, optionID) => {
    SetYuborish((prev) => {
      const existingIndex = prev.findIndex((item) => item._id === testID);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].optionsID = optionID;
        return updated;
      } else {
        return [...prev, { _id: testID, optionsID: optionID }];
      }
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < randomizedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    const completedAnswers = randomizedQuestions.map((q) => {
      const answer = Yuborish.find((ans) => ans._id === q._id);
      if (answer && answer.optionsID) {
        return { _id: q._id, optionsID: answer.optionsID };
      } else {
        return { _id: q._id };
      }
    });
    checkAnswers(completedAnswers, id);
    const testID = `12028$834598ybjb-0%check_answer_correct/!@test/${id}`;
    const encodedTestID = btoa(testID);
    navigate(`/checked_answers/${encodedTestID}`);
  };

  const handleRightClick = (e) => {
    e.preventDefault();
  };

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

  if (randomizedQuestions.length === 0)
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#020617] px-4">
        <div className="backdrop-blur-3xl bg-white/[0.02] border border-white/10 rounded-[3rem] p-10 sm:p-16 shadow-2xl text-center max-w-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-primary-500/5 blur-3xl rounded-full" />
          <div className="relative z-10">
            <div className="w-24 h-24 mx-auto mb-10 bg-white/5 rounded-[2rem] flex items-center justify-center border border-white/10">
              <RiInboxArchiveLine className="text-4xl text-slate-600" />
            </div>
            <h1 className="text-4xl font-extrabold text-white mb-4 font-outfit tracking-tight">Hozircha testlar yo&apos;q</h1>
            <p className="text-slate-500 mb-10 leading-relaxed text-lg">
              Yangi testlar qo&apos;shilishini kuting yoki boshqa bo&apos;limni ko&apos;ring.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="w-full py-5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl transition-all active:scale-95 shadow-2xl shadow-primary-500/20"
            >
              Ortga qaytish
            </button>
          </div>
        </div>
      </div>
    );

  const currentQuestion = randomizedQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / randomizedQuestions.length) * 100;
  const isFinished = Yuborish.length === randomizedQuestions.length;

  return (
    <div
      className="w-full min-h-screen bg-[#020617] text-white pt-20 pb-8 sm:pt-32 relative overflow-hidden flex flex-col items-center"
      onContextMenu={handleRightClick}
    >
      {/* Dynamic Enhanced Cosmos Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-[10%] w-[80%] h-[80%] bg-primary-950/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 -right-[10%] w-[70%] h-[70%] bg-sky-950/20 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/4 left-1/4 w-[40%] h-[40%] bg-indigo-950/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '4s' }} />

        {/* Dense Twinkling Stars */}
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 1.5 + 0.5 + "px",
              height: Math.random() * 1.5 + 0.5 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{
              opacity: [0.1, 0.7, 0.1],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 1.5 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Meteors/Shooting Stars */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`meteor-${i}`}
            className="absolute h-[1px] bg-gradient-to-r from-primary-400 to-transparent"
            style={{
              width: 100 + Math.random() * 100 + "px",
              top: Math.random() * 60 + "%",
              left: "-20%",
              rotate: "25deg",
              opacity: 0,
            }}
            animate={{
              x: ["0vw", "140vw"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1 + Math.random() * 1.5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 4 + Math.random() * 10,
              repeatDelay: 5 + Math.random() * 15,
            }}
          />
        ))}

        {/* Shimmering Sparkles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-primary-400/15"
            style={{
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -30, 10, 0],
              x: [0, 20, -10, 0],
              opacity: [0, 0.4, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <HiSparkles size={10 + Math.random() * 20} />
          </motion.div>
        ))}
      </div>

      {/* Prominent Progress Header */}
      <div className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-2xl bg-[#020617]/60 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-4 sm:py-5">
          <div className="flex flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg">
                <RiCompass3Fill className="text-primary-400 text-xl sm:text-2xl" />
              </div>
              <div className="hidden sm:flex flex-col">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 leading-none mb-1">
                  Savollar
                </h3>
                <span className="text-xs font-semibold text-slate-200 truncate max-w-[200px]">
                  {Questions?.title || "Test"}
                </span>
              </div>
            </div>

            <div className="flex-1 max-w-xl bg-white/5 h-2.5 rounded-full relative overflow-hidden border border-white/10 shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-600 via-sky-400 to-primary-400 shadow-[0_0_20px_rgba(56,189,248,0.5)]"
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                <div className="absolute top-0 right-0 w-8 h-full bg-white/20 skew-x-[30deg] translate-x-4 animate-pulse" />
              </motion.div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Hozirgi</span>
                <span className="text-lg sm:text-xl font-black text-white font-outfit leading-none">
                  {currentQuestionIndex + 1}<span className="text-slate-600 text-xs mx-1">/</span>{randomizedQuestions.length}
                </span>
              </div>
              <div className="hidden xs:block w-px h-8 bg-white/10" />
              <div className="text-center min-w-[3.5rem]">
                <span className="block text-[10px] font-black text-primary-400 uppercase tracking-widest mb-0.5">Progress</span>
                <span className="text-lg sm:text-xl font-black text-white font-outfit leading-none">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-3xl px-4 flex flex-col justify-center relative z-10 pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, scale: 0.99, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.01, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative"
          >
            {/* Compact Question Card */}
            <div className="backdrop-blur-3xl bg-[#0a0f1e]/40 border border-white/10 rounded-[2rem] p-6 sm:p-10 shadow-2xl transition-all duration-500">
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />

              <div className="mb-6 sm:mb-8 relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-500/10 rounded-full border border-primary-500/20 mb-4 scale-90 sm:scale-100">
                  <RiRocket2Fill className="text-primary-400 text-[10px] animate-bounce" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary-400">FAOL SAVOL</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-outfit leading-snug text-white">
                  {currentQuestion.questionText}
                </h2>
              </div>

              {/* Compact Options Grid */}
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = Yuborish.find((ans) => ans._id === currentQuestion._id)?.optionsID === option._id;
                  return (
                    <button
                      key={option._id}
                      onClick={() => handleOptionChange(currentQuestion._id, option._id)}
                      className={`group relative flex items-center gap-4 p-4 sm:p-5 rounded-[1.2rem] border transition-all duration-300 text-left overflow-hidden ${isSelected
                        ? "bg-primary-500/10 border-primary-500/40 shadow-[0_0_30px_rgba(56,189,248,0.1)]"
                        : "bg-white/[0.015] border-white/5 hover:border-white/10 hover:bg-white/[0.03]"
                        }`}
                    >
                      <div className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center text-[10px] sm:text-xs font-black transition-all relative z-10 ${isSelected
                        ? "bg-primary-500 border-primary-400 text-white"
                        : "bg-slate-900/40 border-white/5 text-slate-500"
                        }`}>
                        {String.fromCharCode(65 + index)}
                      </div>

                      <span className={`text-sm sm:text-lg font-bold transition-colors relative z-10 flex-1 ${isSelected ? "text-white" : "text-slate-400"
                        }`}>
                        {option.optionText}
                      </span>

                      {isSelected ? (
                        <div className="relative z-10 w-7 h-7 rounded-full bg-primary-500 flex items-center justify-center">
                          <FaCheck className="text-white text-[10px]" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-full border border-white/5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slender Controls */}
        <div className="mt-6 sm:mt-10 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl border font-black text-[10px] uppercase tracking-widest transition-all ${currentQuestionIndex === 0
                ? "opacity-10 grayscale border-white/5 text-slate-600"
                : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                }`}
            >
              <FaArrowLeft size={10} />
              <span>Oldingi</span>
            </button>

            <div className="flex items-center gap-1.5">
              {[...Array(randomizedQuestions.length)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1 transition-all duration-500 rounded-full ${i === currentQuestionIndex ? "w-6 bg-primary-500" :
                    Yuborish.find(a => a._id === randomizedQuestions[i]?._id) ? "w-2 bg-emerald-500/40" : "w-1 bg-white/10"
                    }`}
                />
              ))}
            </div>

            {currentQuestionIndex === randomizedQuestions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={!isChecked}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-black uppercase text-[10px] tracking-widest rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-20"
              >
                Yuborish
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-8 py-4 bg-primary-600 text-white font-black uppercase text-[10px] tracking-widest rounded-xl shadow-lg transition-all active:scale-95"
              >
                Next
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 backdrop-blur-2xl bg-white/[0.01] border border-white/5 rounded-2xl px-5 py-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setIsChecked(!isChecked)}>
              <div className={`w-5 h-5 rounded-md border transition-all flex items-center justify-center ${isChecked ? "bg-primary-500 border-primary-500" : "bg-slate-900/50 border-white/10"
                }`}>
                {isChecked && <div className="w-1.5 h-1.5 rounded-sm bg-white" />}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Yakunlash</span>
            </div>

            <button
              onClick={() => navigate("/")}
              className="text-[9px] font-black uppercase tracking-widest text-slate-600 hover:text-white transition-colors"
            >
              Chiqish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPages;
