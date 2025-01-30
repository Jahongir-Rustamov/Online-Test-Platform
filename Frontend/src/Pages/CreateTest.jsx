import { Loader, PenLine } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useTestsStore } from "../stores/useTestsStore";

const CreateTest = () => {
  const initialState = {
    title: "",
    questionsMassive: [
      {
        questionText: "",
        options: [],
      },
    ],
  };

  const [testData, setTestData] = useState(initialState);

  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleAddOptions = (questionIndex) => {
    if (testData.questionsMassive[questionIndex].optionsCount > 1) {
      const newQuestions = [...testData.questionsMassive];
      const optionsCount = parseInt(
        testData.questionsMassive[questionIndex].optionsCount
      );
      newQuestions[questionIndex].options = Array(optionsCount)
        .fill("")
        .map(() => ({
          optionText: "",
          isCorrect: false,
        }));
      // O'chirib tashlaymiz chunki bu faqat UI uchun kerak
      delete newQuestions[questionIndex].optionsCount;
      setTestData({
        ...testData,
        questionsMassive: newQuestions,
      });
    }
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...testData.questionsMassive];
    newQuestions[questionIndex].options[optionIndex].optionText = value;
    setTestData({
      ...testData,
      questionsMassive: newQuestions,
    });
  };

  const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
    const newQuestions = [...testData.questionsMassive];
    // Avval barcha variantlarni noto'g'ri qilish
    newQuestions[questionIndex].options = newQuestions[
      questionIndex
    ].options.map((option) => ({
      ...option,
      isCorrect: false,
    }));
    // Tanlangan variantni to'g'ri qilish
    newQuestions[questionIndex].options[optionIndex].isCorrect = true;
    setTestData({
      ...testData,
      questionsMassive: newQuestions,
    });
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...testData.questionsMassive];
    newQuestions[index].questionText = value;
    setTestData({
      ...testData,
      questionsMassive: newQuestions,
    });
  };

  const handleAddQuestion = () => {
    setTestData({
      ...testData,
      questionsMassive: [
        ...testData.questionsMassive,
        {
          questionText: "",
          options: [],
        },
      ],
    });
  };

  const { createTest, loading } = useTestsStore();
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validatsiyalar
    if (!testData.title.trim()) {
      toast.error("Test nomini kiriting");
      return;
    }

    if (testData.questionsMassive.length === 0) {
      toast.error("Kamida bitta savol kiriting");
      return;
    }

    for (const question of testData.questionsMassive) {
      if (!question.questionText.trim()) {
        toast.error("Savol matnini kiriting");
        return;
      }

      if (question.options.length < 2) {
        toast.error("Har bir savolda eng kamida 2 ta variant bo'lishi kerak");
        return;
      }

      // Variantlar tekshiruvi
      for (const option of question.options) {
        if (!option.optionText.trim()) {
          toast.error("Barcha variantlarni to'ldiring");
          return;
        }
      }

      const hasCorrectOption = question.options.some(
        (option) => option.isCorrect
      );
      if (!hasCorrectOption) {
        toast.error("Har bir savolda bitta to'g'ri javob bo'lishi kerak");
        return;
      }
    }

    createTest(testData).then(() => {
      // Test muvaffaqiyatli saqlangandan keyin formani tozalash
      setTestData(initialState);
      setIsConfirmed(false);
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-4 sm:py-8 px-3 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-8">
          <PenLine className="w-8 h-8 text-blue-500" strokeWidth={2} />
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Test Yaratish
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Test nomi */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Test nomi
            </label>
            <input
              type="text"
              value={testData.title}
              onChange={(e) =>
                setTestData({ ...testData, title: e.target.value })
              }
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base text-gray-900"
              placeholder="Test nomini kiriting"
              required
            />
          </div>

          {/* Savollar */}
          {testData.questionsMassive.map((questionData, questionIndex) => (
            <div key={questionIndex} className="space-y-4 sm:space-y-6">
              {/* Test savoli */}
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-600">
                    {questionIndex + 1}-savol
                  </label>
                  {questionIndex > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newQuestions = testData.questionsMassive.filter(
                          (_, i) => i !== questionIndex
                        );
                        setTestData({
                          ...testData,
                          questionsMassive: newQuestions,
                        });
                      }}
                      className="text-red-500 hover:text-red-600 text-sm"
                    >
                      O&apos;chirish
                    </button>
                  )}
                </div>
                <textarea
                  value={questionData.questionText}
                  onChange={(e) =>
                    handleQuestionChange(questionIndex, e.target.value)
                  }
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base text-gray-900"
                  rows="3"
                  placeholder="Test savolini kiriting"
                  required
                />
              </div>

              {/* Variantlar soni */}
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <div className="w-full sm:w-32">
                    <input
                      type="number"
                      min="2"
                      value={questionData.optionsCount || ""}
                      onChange={(e) => {
                        const newQuestions = [...testData.questionsMassive];
                        newQuestions[questionIndex].optionsCount =
                          e.target.value;
                        setTestData({
                          ...testData,
                          questionsMassive: newQuestions,
                        });
                      }}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base text-gray-900"
                      placeholder="Soni"
                    />
                  </div>
                  <p className="text-gray-600 text-sm">
                    Nechta variant bo&apos;lsin?
                  </p>
                  <button
                    type="button"
                    onClick={() => handleAddOptions(questionIndex)}
                    className="w-full sm:w-auto sm:ml-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 text-sm"
                  >
                    {questionData.options.length > 0
                      ? "Yangilash"
                      : "+ Qo'shish"}
                  </button>
                </div>
              </div>

              {/* Variantlar */}
              {questionData.options.length > 0 && (
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
                  <label className="block text-sm font-medium text-gray-600 mb-4">
                    Variantlar
                  </label>
                  <div className="space-y-3">
                    {questionData.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="flex items-center space-x-3"
                      >
                        <input
                          type="radio"
                          name={`correctAnswer-${questionIndex}`}
                          value={optionIndex}
                          checked={option.isCorrect}
                          onChange={() =>
                            handleCorrectAnswerChange(
                              questionIndex,
                              optionIndex
                            )
                          }
                          className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-400"
                        />
                        <input
                          type="text"
                          value={option.optionText}
                          onChange={(e) =>
                            handleOptionChange(
                              questionIndex,
                              optionIndex,
                              e.target.value
                            )
                          }
                          className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base text-gray-900"
                          placeholder={`${optionIndex + 1}-variant`}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Savol qo'shish va Testni saqlash */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
            <button
              type="button"
              onClick={handleAddQuestion}
              className="w-full sm:w-auto px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 text-sm sm:text-base"
            >
              + Savol qo'shish
            </button>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="confirmTest"
                checked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.target.checked)}
                className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-400 rounded"
              />
              <label htmlFor="confirmTest" className="text-sm text-gray-600">
                Testni saqlaysizmi?
              </label>
            </div>
          </div>

          {/* Test qo'shish tugmasi */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={!isConfirmed || loading}
              className={`w-full py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 font-medium text-sm sm:text-base flex items-center justify-center ${
                isConfirmed && !loading
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {loading && <Loader className="mr-2 h-5 w-5 animate-spin" />}
              Testni saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTest;
