import { motion } from "framer-motion";
import { FaTrash, FaChevronRight, FaClock } from "react-icons/fa";
import { RiMailOpenFill, RiInboxArchiveLine } from "react-icons/ri";
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
  const testsPerPage = 5;

  // Ekran o'lchamini kuzatish

  useEffect(() => {
    getMytests(id);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getMytests, id]);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      setAnimate(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentPage]);

  // SubjectInfos dan testlarni olish
  const currentSubject = mytests;
  console.log("Mytests:", mytests);
  const tests = currentSubject
    ? [...currentSubject].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : [];
  const subjectName = name;

  const indexOfLastTest = currentPage * testsPerPage;
  const indexOfFirstTest = indexOfLastTest - testsPerPage;
  const currentTests = tests.slice(indexOfFirstTest, indexOfLastTest);
  const totalPages = Math.ceil(tests.length / testsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleDelete = (test) => {
    setSelectedTest(test);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log("Deleting test:", selectedTest._id);
    deleteTest(selectedTest._id);
    setShowDeleteModal(false);
    setSelectedTest(null);
  };

  // Animatsiyali yoki oddiy komponentni qaytarish
  const renderAnimatedOrStatic = (component, animations) => {
    return isDesktop ? (
      <motion.div {...animations}>{component}</motion.div>
    ) : (
      <div>{component}</div>
    );
  };

  // Animatsiyali yoki oddiy tugmani qaytarish
  const renderAnimatedOrStaticButton = (component, animations) => {
    return isDesktop ? (
      <motion.button {...animations}>{component}</motion.button>
    ) : (
      <button>{component}</button>
    );
  };
  const navigate = useNavigate();
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <PropagateLoader color="#0e0da2" size={15} />
      </div>
    );
  return (
    <div
      className={`min-h-screen bg-white text-gray-900 py-12 pt-20 px-4 sm:px-6 lg:px-8 ${
        animate ? "fade-in" : ""
      }`}
    >
      {/* Fan nomi */}
      <div className="relative mb-8 md:mb-16">
        {renderAnimatedOrStatic(
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center font-['Clash Display'] tracking-tight px-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
              {subjectName}
            </span>
          </h1>,
          {
            initial: { y: -100, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: { duration: 1.2, type: "spring", bounce: 0.5 },
          }
        )}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 md:w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full"></div>
      </div>

      {/* Testlar ro'yxati */}
      <div className="max-w-5xl mx-auto space-y-4 md:space-y-6 px-4">
        {tests.length === 0
          ? renderAnimatedOrStatic(
              <div className="text-center py-8 md:py-16">
                <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full flex items-center justify-center">
                  <RiInboxArchiveLine className="w-8 h-8 md:w-12 md:h-12 text-purple-500" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  Hozircha testlar yo'q
                </h3>
                <p className="text-sm md:text-base text-gray-500">
                  Bu fanda hali testlar qo'shilmagan
                </p>
              </div>,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5 },
              }
            )
          : currentTests.map((test, index) =>
              renderAnimatedOrStatic(
                <div key={test._id} className="relative">
                  <div className="group bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl md:rounded-2xl p-0.5 hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                    <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 relative overflow-hidden">
                      {/* Animated background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
                        <div className="flex items-center gap-3 md:gap-6">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
                              <div className="w-full h-full rounded-lg md:rounded-xl bg-white flex items-center justify-center">
                                <RiMailOpenFill className="text-xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-pink-500" />
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                              {test.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 md:gap-4">
                              <span className="px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs md:text-sm font-medium">
                                {test.questionsMassive.length} ta savol
                              </span>
                              <span className="flex items-center gap-1 text-gray-500 text-xs md:text-sm">
                                <FaClock className="text-gray-400" />
                                <span>{formatDate(test.createdAt)}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 md:gap-4">
                          {user?.role === "teacher" &&
                            user._id === test.teacher &&
                            renderAnimatedOrStaticButton(
                              <div
                                onClick={() => handleDelete(test)}
                                className="p-2 md:p-3 bg-red-500/10 text-red-500 rounded-lg md:rounded-xl hover:bg-red-500/20 transition-colors duration-200"
                              >
                                <FaTrash className="text-base md:text-lg" />
                              </div>,
                              {
                                whileHover: { scale: 1.05 },
                                whileTap: { scale: 0.95 },
                              }
                            )}
                          {renderAnimatedOrStaticButton(
                            <button
                              onClick={() => {
                                navigate(`/get/questions/${test._id}`),
                                  getTestQuestions(test._id);
                              }}
                              className="flex items-center gap-1 md:gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg md:rounded-xl font-medium text-white text-sm md:text-base hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg shadow-purple-500/25"
                            >
                              <span>Boshlash</span>
                              <FaChevronRight className="text-xs md:text-sm" />
                            </button>,
                            {
                              whileHover: { scale: 1.05 },
                              whileTap: { scale: 0.95 },
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>,
                {
                  initial: { x: index % 2 === 0 ? 100 : -100, opacity: 0 },
                  animate: { x: 0, opacity: 1 },
                  transition: {
                    delay: index * 0.3,
                    duration: 0.5,
                    type: "spring",
                  },
                }
              )
            )}
      </div>

      {/* Pagination */}
      {tests.length > 5 && (
        <div className="flex justify-center mt-6 md:mt-8 space-x-1 md:space-x-2">
          {/* Oldingi sahifa tugmasi */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            ❮
          </button>

          {/* Birinchi sahifa */}
          {currentPage > 3 && (
            <>
              <button
                onClick={() => setCurrentPage(1)}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg ${
                  currentPage === 1
                    ? "bg-purple-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                1
              </button>
              {currentPage > 4 && (
                <span className="px-2 md:px-4 py-1.5 md:py-2">...</span>
              )}
            </>
          )}

          {/* O'rta sahifalar */}
          {pageNumbers
            .filter((num) => {
              if (currentPage <= 3) return num <= 5;
              if (currentPage >= totalPages - 2) return num >= totalPages - 4;
              return num >= currentPage - 2 && num <= currentPage + 2;
            })
            .map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg ${
                  currentPage === number
                    ? "bg-purple-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {number}
              </button>
            ))}

          {/* Oxirgi sahifa */}
          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && (
                <span className="px-2 md:px-4 py-1.5 md:py-2">...</span>
              )}
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-purple-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {totalPages}
              </button>
            </>
          )}

          {/* Keyingi sahifa tugmasi */}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            ❯
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Modal backdrop */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative z-50">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FaTrash className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Testni o'chirish
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Rostdan ham bu testni o'chirmoqchimisiz? Bu amalni ortga
                        qaytarib bo'lmaydi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  O&apos;chirish
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Bekor qilish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EachTests;
