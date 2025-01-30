import { useState } from "react";
import {
  PlusIcon,
  UserGroupIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import ViewTeachers from "./ViewTeachers";
import BlockedTeachers from "./BlockedTeachers";
import { useTestsStore } from "../stores/useTestsStore";
import { Loader } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50 pt-24 md:pt-32 pb-8 px-2 md:px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl md:text-3xl font-bold text-center text-blue-600 mb-6 md:mb-12">
          Admin Boshqaruv Paneli
        </h1>

        {/* Navigation Buttons */}
        <div className="bg-white rounded-xl shadow-md p-1 mb-6 md:mb-8">
          <div className="flex">
            <button
              onClick={() => setActiveTab("createSubject")}
              className={`flex items-center justify-center flex-1 px-2 md:px-4 py-2 md:py-3 rounded-lg text-xs md:text-sm font-medium transition-all duration-200
                ${
                  activeTab === "createSubject"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <PlusIcon className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
              <span className="whitespace-nowrap">Fan Yaratish</span>
            </button>
            <button
              onClick={() => setActiveTab("viewTeachers")}
              className={`flex items-center justify-center flex-1 px-2 md:px-4 py-2 md:py-3 rounded-lg text-xs md:text-sm font-medium transition-all duration-200
                ${
                  activeTab === "viewTeachers"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <UserGroupIcon className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
              <span className="whitespace-nowrap">O&apos;qituvchilar</span>
            </button>
            <button
              onClick={() => setActiveTab("blockedTeachers")}
              className={`flex items-center justify-center flex-1 px-2 md:px-4 py-2 md:py-3 rounded-lg text-xs md:text-sm font-medium transition-all duration-200
                ${
                  activeTab === "blockedTeachers"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <NoSymbolIcon className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
              <span className="whitespace-nowrap">Jazolanganlar</span>
            </button>
          </div>
        </div>

        {activeTab === "createSubject" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {/* Teacher Creation Form */}
            <div className="bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-4 md:mb-6">
                Yangi O'qituvchi Qo'shish
              </h2>
              <form onSubmit={handleTeacherSubmit} className="space-y-4">
                <div>
                  <label className="block text-base md:text-sm font-medium text-gray-700 mb-2 md:mb-1">
                    Ism
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={teacherData.name}
                    onChange={handleTeacherChange}
                    className="w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
                    placeholder="O'qituvchi ismini kiriting"
                  />
                </div>
                <div>
                  <label className="block text-base md:text-sm font-medium text-gray-700 mb-2 md:mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={teacherData.email}
                    onChange={handleTeacherChange}
                    className="w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
                    placeholder="O'qituvchi emailini kiriting"
                  />
                </div>
                <div>
                  <label className="block text-base md:text-sm font-medium text-gray-700 mb-2 md:mb-1">
                    Lavozim
                  </label>
                  <select
                    name="role"
                    value={teacherData.role}
                    onChange={handleTeacherChange}
                    className="w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
                  >
                    <option value="admin" className="text-base py-1">
                      Admin
                    </option>
                    <option value="teacher" className="text-base py-1">
                      O&apos;qituvchi
                    </option>
                    <option value="student" className="text-base py-1">
                      O&apos;quvchi
                    </option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className={`w-full flex justify-center items-center py-3 md:py-2.5 px-4 border border-transparent rounded-lg text-sm md:text-base font-medium text-white ${
                    isSubmitting || loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } transition-colors duration-200 mt-4 md:mt-2`}
                >
                  {isSubmitting || loading ? (
                    <>
                      <Loader className="mr-2 h-5 w-5 animate-spin" />
                      <span className="ml-2">Yuklanmoqda...</span>
                    </>
                  ) : (
                    <>+ Qo&apos;shish</>
                  )}
                </button>
              </form>
            </div>

            {/* Subject Assignment Form */}
            <div className="bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-4 md:mb-6">
                Fan Biriktirish
              </h2>
              <form onSubmit={handleSubjectSubmit} className="space-y-4">
                <div>
                  <label className="block text-base md:text-sm font-medium text-gray-700 mb-2 md:mb-1">
                    Fan nomi
                  </label>
                  <input
                    type="text"
                    name="subjectName"
                    value={subjectData.subjectName}
                    onChange={handleSubjectChange}
                    className="w-full px-4 py-3 md:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
                    placeholder="Fan nomini kiriting"
                  />
                </div>

                <div>
                  <label className="block text-base md:text-sm font-medium text-gray-700 mb-2 md:mb-1">
                    O'qituvchi ismi
                  </label>
                  <input
                    type="text"
                    name="teacherName"
                    value={subjectData.teacherName}
                    onChange={handleSubjectChange}
                    className="w-full px-4 py-3 md:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
                    placeholder="O'qituvchi ismini kiriting"
                  />
                </div>
                <div>
                  <label className="block text-base md:text-sm font-medium text-gray-700 mb-2 md:mb-1">
                    O'qituvchi emaili
                  </label>
                  <input
                    type="email"
                    name="teacherEmail"
                    value={subjectData.teacherEmail}
                    onChange={handleSubjectChange}
                    className="w-full px-4 py-3 md:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
                    placeholder="O'qituvchi emailini kiriting"
                  />
                </div>
                <button
                  type="submit"
                  disabled={buttonLoading}
                  className={`w-full flex justify-center items-center py-3 md:py-2.5 px-4 border border-transparent rounded-lg text-sm md:text-base font-medium text-white ${
                    buttonLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } transition-colors duration-200 mt-4 md:mt-2`}
                >
                  {buttonLoading ? (
                    <>
                      <Loader className="mr-2 h-5 w-5 animate-spin" />
                      <span className="ml-2">Yuklanmoqda...</span>
                    </>
                  ) : (
                    <>Biriktirish</>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
        {activeTab === "viewTeachers" && <ViewTeachers />}
        {activeTab === "blockedTeachers" && <BlockedTeachers />}
      </div>
    </div>
  );
};

export default AdminDashboard;
