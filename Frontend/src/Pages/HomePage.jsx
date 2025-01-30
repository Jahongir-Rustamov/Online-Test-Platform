import { FaClipboardList } from "react-icons/fa";
import { SubjectCard } from "./SubjectCard";
import { useTestsStore } from "../stores/useTestsStore.js";
import { useEffect } from "react";

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
    <div className="min-h-screen bg-gray-50 pt-14 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBoLTQweiIvPjxwYXRoIGQ9Ik0xMCAyMGgyMHYyMGgtMjB6IiBmaWxsPSIjZmZmIi8+PC9nPjwvc3ZnPg==')] bg-repeat opacity-5"></div>

        {/* Animated Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 -top-10 -left-10 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute w-96 h-96 -top-10 -right-10 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute w-96 h-96 bottom-0 left-1/2 transform -translate-x-1/2 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 inline-block">
              <span className="inline-flex items-center px-6 py-2 rounded-full border border-blue-400 bg-blue-800/30 text-blue-200 text-sm font-medium backdrop-blur-sm">
                🎓 O&rsquo;zbekistonning eng yaxshi online test platformasi
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white whitespace-normal break-words leading-tight">
              Registon O&apos;quv Markazi bilan
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                {" "}
                kelajakka qadam
              </span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Zamonaviy ta&apos;lim platformasi orqali bilimlaringizni
              mustahkamlang va o&apos;z sohanggizda eng yaxshi mutaxassis
              bo&apos;ling
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={scrollToTests}
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-black rounded-xl group-hover:mt-0 group-hover:ml-0 opacity-10"></span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl"></span>
                <span className="relative flex items-center">
                  <FaClipboardList className="w-5 h-5 mr-2" />
                  Testni boshlash
                  <svg
                    className="w-5 h-5 ml-2 transition-transform duration-200 ease-out transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
              </button>
              <a
                href="#features"
                className="inline-flex items-center justify-center px-8 py-4 font-semibold text-blue-100 transition-all duration-200 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 focus:outline-none"
              >
                Ko&apos;proq ma&apos;lumot
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-2 sm:px-4 py-12 max-w-full">
        {/* Stats Section */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-16 ">
          {[
            {
              label: "Jami Fanlar",
              value: statistics?.SubjectsCount + "+",
              icon: "📚",
              color: "bg-gradient-to-br from-blue-100 to-blue-50 text-blue-800",
              description: "Turli xil fanlardan testlar",
            },
            {
              label: "Testlar",
              value: statistics?.TestsCount + "+",
              icon: "📝",
              color:
                "bg-gradient-to-br from-purple-100 to-purple-50 text-purple-800",
              description: "Sifatli va ishonchli testlar",
            },
            {
              label: "O'quvchilar",
              value: statistics?.StudentCount + "+",
              icon: "👨‍🎓",
              color:
                "bg-gradient-to-br from-green-100 to-green-50 text-green-800",
              description: "Faol o'quvchilar",
            },
            {
              label: "O'qituvchilar",
              value: statistics?.TeacherCount + "+",
              icon: "👨‍🏫",
              color: "bg-gradient-to-br from-pink-100 to-pink-50 text-pink-800",
              description: "Tajribali o'qituvchilar",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/50 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <div
                className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300`}
              >
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-500">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Subjects Section */}
        <div id="test-collections" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-12">
              <div className="h-px bg-gray-300 w-full max-w-xs"></div>
              <h2 className="text-3xl font-bold text-gray-800 px-6 text-center whitespace-nowrap">
                SINOV TEST TO&lsquo;PLAMLARI
              </h2>
              <div className="h-px bg-gray-300 w-full max-w-xs"></div>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 px-2">
              {subject && subject?.length > 0 ? (
                subject?.map((subject) => (
                  <SubjectCard key={subject._id} subject={subject} />
                ))
              ) : (
                <p className="text-center text-gray-500 text-xl font-semibold flex justify-center items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400 animate-pulse"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M12 4a8 8 0 11-8 8 8 8 0 018-8z"
                    />
                  </svg>
                  <span>Hozirch Hech Qanday Fan Yo&apos;q </span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div id="features" className="mb-16">
          <div className="flex items-center justify-center mb-12">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-full max-w-xs"></div>
            <h2 className="text-3xl font-bold text-gray-800 px-6 text-center whitespace-nowrap">
              BIZNING AFZALLIKLARIMIZ
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-full max-w-xs"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Aniq Natijalar",
                description: "Test natijalarini tezkor va aniq baholash tizimi",
                icon: "🎯",
                color: "from-blue-500 to-blue-600",
                features: [
                  "Real vaqt rejimida",
                  "Xatolar tahlili",
                  "Progress monitoring",
                ],
              },
              {
                title: "Tezkor Javob",
                description: "Har bir test uchun tezkor javob va tushuntirish",
                icon: "⚡",
                color: "from-purple-500 to-purple-600",
                features: [
                  "Tushuntirishlar",
                  "Video yechimlar",
                  "Qo'shimcha ma'lumotlar",
                ],
              },
              {
                title: "Qulay Interfeys",
                description: "Foydalanuvchilar uchun qulay va sodda interfeys",
                icon: "💻",
                color: "from-green-500 to-green-600",
                features: [
                  "Zamonaviy dizayn",
                  "Mobil versiya",
                  "Oson navigatsiya",
                ],
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} text-white flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative bg-gradient-to-br from-blue-800 to-indigo-900 rounded-2xl p-8 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
          </div>

          {/* Content */}
          <div className="relative flex flex-col items-center text-center space-y-6">
            <div className="bg-blue-700/30 p-3 rounded-full inline-flex">
              <span className="text-3xl">🚀</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-white bg-clip-text">
              Hoziroq testlarni yechishni boshlang!
            </h3>

            <p className="text-blue-200 text-lg max-w-md mx-auto">
              Registon o&apos;quv markazi bilan bilimlaringizni mustahkamlang
            </p>

            <div className="pt-4">
              <button
                onClick={scrollToTests}
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-black rounded-xl group-hover:mt-0 group-hover:ml-0 opacity-10"></span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl"></span>
                <span className="relative flex items-center">
                  <FaClipboardList className="w-5 h-5 mr-2" />
                  Testni boshlash
                  <svg
                    className="w-5 h-5 ml-2 transition-transform duration-200 ease-out transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Footer */}
      {/* Modern Footer with Visible Contact */}
      <footer className="bg-gradient-to-r from-blue-950 to-indigo-950 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">Registon LC</span>
            </div>

            {/* Contact Number - Highlighted */}
            <div className="flex items-center">
              <a
                href="https://t.me/Registan_LC"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-3 rounded-full bg-white/10 px-6 py-3 transition-all hover:bg-white/20"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z" />
                </svg>
                <span className="text-lg font-medium">
                  Registon O&apos;quv Markazi Yangiliklari
                </span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 p-3 transition-all hover:bg-white/20"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="#"
                className="rounded-full bg-white/10 p-3 transition-all hover:bg-white/20"
              >
                <span className="sr-only">YouTube</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Bottom Bar with Gradient Line */}
          <div className="mt-8">
            <div className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            <p className="mt-6 text-center text-sm text-white/70">
              &copy; {new Date().getFullYear()} Registon O&rsquo;quv Markazi
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
