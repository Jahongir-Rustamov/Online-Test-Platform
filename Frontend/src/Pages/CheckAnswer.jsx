import { useTestsStore } from "../stores/useTestsStore";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaClipboardList,
  FaPercentage,
  FaCheck,
  FaTimes,
  FaQuestionCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

const CheckAnswer = () => {
  const { CheckingProccess, loading } = useTestsStore();
  const navigate = useNavigate();

  if (
    !CheckingProccess ||
    !CheckingProccess.TestMassive ||
    CheckingProccess.TestMassive.length === 0
  ) {
    return (
      <div className="container mx-auto px-4 min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center w-full max-w-lg mx-auto p-4"
        >
          <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8">
            <FaClipboardList className="mx-auto text-5xl sm:text-6xl text-primary mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              Test Natijalari
            </h2>
            <p className="text-gray-600 mb-8 text-sm sm:text-base">
              Siz topshirgan testlar natijalarini "Mening Testlarim" bo'limidan
              ko'rishingiz mumkin
            </p>
            <button
              onClick={() => navigate("/my-tests")}
              className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2 w-full sm:w-auto mx-auto"
            >
              <FaClipboardList className="text-xl" />
              <span>Mening Testlarim</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <PropagateLoader color="#0e0da2" size={15} />
      </div>
    );
  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 pt-20 sm:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-3 sm:p-6"
      >
        {/* Statistika */}
        <div className="grid grid-cols-2 sm:flex sm:justify-around items-center bg-gray-50 p-2 sm:p-4 rounded-lg mb-4 sm:mb-8 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-2xl sm:text-4xl font-bold text-primary">
              <FaPercentage className="text-xl sm:text-3xl" />
              <span>{CheckingProccess.correctPercentage}%</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Umumiy natija</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-xl sm:text-3xl font-bold text-green-500">
              <FaCheck className="text-lg sm:text-2xl" />
              <span>{CheckingProccess.correctCount}</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">To'g'ri</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-xl sm:text-3xl font-bold text-red-500">
              <FaTimes className="text-lg sm:text-2xl" />
              <span>
                {CheckingProccess.totalQuestions -
                  CheckingProccess.correctCount}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Noto'g'ri</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-xl sm:text-3xl font-bold text-blue-500">
              <FaQuestionCircle className="text-lg sm:text-2xl" />
              <span>{CheckingProccess.totalQuestions}</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Jami savollar</p>
          </div>
        </div>

        {/* Savollar */}
        <div className="space-y-4 sm:space-y-8">
          {CheckingProccess.TestMassive?.map((test, index) => (
            <div
              key={index}
              className="border rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
            >
              {/* Savol */}
              <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                {test.correctOption ? (
                  <FaCheckCircle className="text-lg sm:text-xl text-green-500 mt-1 flex-shrink-0" />
                ) : (
                  <FaTimesCircle className="text-lg sm:text-xl text-red-500 mt-1 flex-shrink-0" />
                )}
                <h3 className="text-base sm:text-lg font-medium">
                  {index + 1}. {test.questionText}
                </h3>
              </div>

              {/* Variantlar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 ml-4 sm:ml-8">
                {test.totalOptions.map((option, optIndex) => (
                  <div
                    key={optIndex}
                    className={`p-2 sm:p-3 rounded-md text-sm sm:text-base transition-all hover:shadow-sm ${
                      option._id === test._id
                        ? "bg-blue-100 border-2 border-blue-500"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    {option.optionText}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Ogohlantirish */}
        <div className="mt-4 sm:mt-8 p-3 sm:p-4 bg-yellow-50 rounded-lg text-center">
          <p className="text-yellow-800 text-sm sm:text-base flex items-center justify-center gap-2">
            <span>
              ⚠️ Sahifani yangilamang! Natijalar "Mening Testlarim" bo'limida
              saqlanadi
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckAnswer;
