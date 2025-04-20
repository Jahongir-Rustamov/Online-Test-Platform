import { useEffect, useState } from "react";
import { useTestsStore } from "../stores/useTestsStore";
import { PropagateLoader } from "react-spinners";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const QuestionsPages = () => {
  const { Questions, getTestQuestions, loading, checkAnswers } =
    useTestsStore();
  const { id } = useParams();
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);
  const [randomizedQuestions, setRandomizedQuestions] = useState([]);
  const [Yuborish, SetYuborish] = useState([]);

  const handleOptionChange = (testID, optionID) => {
    // Yangi tanlovni yangilash yoki qo'shish
    SetYuborish((prev) => {
      const existingIndex = prev.findIndex((item) => item._id === testID);
      if (existingIndex > -1) {
        // Agar test mavjud bo'lsa, yangilash
        const updated = [...prev];
        updated[existingIndex].optionsID = optionID;
        return updated;
      } else {
        // Yangi testni qo'shish
        return [...prev, { _id: testID, optionsID: optionID }];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const completedAnswers = randomizedQuestions.map((q) => {
      const answer = Yuborish.find((ans) => ans._id === q._id);
      if (answer && answer.optionsID) {
        return { _id: q._id, optionsID: answer.optionsID }; // Tanlanganlar
      } else {
        return { _id: q._id }; // Tanlanmaganlar
      }
    });
    console.log("Yuboriladigan javoblar:", completedAnswers);
    checkAnswers(completedAnswers, id);
  };

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

  const handleRightClick = (e) => {
    e.preventDefault();
    alert("Nusxalash imkoniyati cheklangan!");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <PropagateLoader color="#0e0da2" size={15} />
      </div>
    );

  if (randomizedQuestions.length === 0)
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
            Hozircha testlar yo&apos;q
          </h1>
          <p className="text-base sm:text-lg text-gray-700">
            Yangi testlar qo&apos;shilishini kuting yoki boshqa bo&apos;limni
            ko&apos;ring.
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="py-2 px-4 sm:py-3 sm:px-6 text-sm sm:text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          Ortga qaytish
        </button>
      </div>
    );

  const testID = `12028$834598ybjb-0%check_answer_correct/!@test/${id}`;
  const encodedTestID = btoa(testID); // btoa() funksiyasi Base64 kodlashni bajaradi
  return (
    <div
      className="max-w-3xl sm:max-w-5xl mx-auto p-4 sm:p-6 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-lg shadow-lg mt-16 sm:mt-16"
      onContextMenu={handleRightClick}
    >
      <h1 className="text-2xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 mb-8 break-words">
        {Questions?.title?.length > 50
          ? `${Questions.title.slice(0, 50)}...`
          : Questions?.title || "Test"}
      </h1>

      <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
        {randomizedQuestions.map((q, index) => (
          <div
            key={index}
            className="p-3 sm:p-6 bg-white shadow-lg rounded-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center space-x-3 mb-3 sm:mb-4">
              <span className="text-base sm:text-lg font-bold text-green-600 bg-green-100 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow">
                {index + 1}.
              </span>
              <p className="text-base sm:text-lg font-semibold text-gray-800">
                {q.questionText}
              </p>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {q.options.map((option, i) => (
                <label
                  key={i}
                  className="flex items-center space-x-2 sm:space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option.optionText}
                    className="radio radio-primary"
                    checked={
                      Yuborish.find((ans) => ans._id === q._id)?.optionsID ===
                      option._id
                    }
                    onChange={() => handleOptionChange(q._id, option._id)} // Test ID va variant ID sini uzatish
                  />
                  <span className="text-gray-800">{option.optionText}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="flex items-center space-x-2 sm:space-x-3 justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
            <span className="text-sm sm:text-base text-gray-700">
              Natijangizni bilmoqchimisiz?
            </span>
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)} // Orqaga qaytish uchun navigate(-1) ishlatamiz
            className="flex items-center space-x-1 text-sm sm:text-base text-blue-500 hover:underline ml-auto"
          >
            <FaArrowLeft className="text-xl" />
            <span>Boshqa test tanlash</span>
          </button>
        </div>
        <button
          type="submit"
          className={`block w-full py-2 sm:py-3 px-4 sm:px-6 text-base sm:text-lg font-bold text-white rounded-lg transition-all duration-300 ${
            isChecked
              ? "bg-gradient-to-r from-green-500 to-blue-600 hover:from-blue-600 hover:to-green-500"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isChecked}
          onClick={() => navigate(`/checked_answers/${encodedTestID}`)}
        >
          Testni Yuborish
        </button>
      </form>
    </div>
  );
};

export default QuestionsPages;
