import { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useTestsStore } from "../stores/useTestsStore";
import { PropagateLoader } from "react-spinners";

const MyTestsOnWorked = () => {
  const { MyTestsWorkedOn, WorkedOn, loading } = useTestsStore();

  useEffect(() => {
    MyTestsWorkedOn();
  }, [MyTestsWorkedOn]);

  const calculateAveragePercentage = () => {
    if (!WorkedOn?.TestWorkedOn?.length) return 0;
    const totalPercentage = WorkedOn.TestWorkedOn.reduce(
      (sum, test) => sum + test.correctPercentage,
      0
    );
    return Math.round(totalPercentage / WorkedOn.TestWorkedOn.length);
  };

  const chartData =
    WorkedOn?.TestWorkedOn?.map((test, index) => ({
      name: `Test ${index + 1}`,
      percentage: test.correctPercentage,
    })) || [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PropagateLoader color="#0e0da2" size={15} />
      </div>
    );
  }

  if (!WorkedOn || !WorkedOn.TestWorkedOn) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Ma&apos;lumotlar topilmadi
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-gradient-to-b from-blue-50 to-white pt-28">
      <div className="container mx-auto px-4 max-w-7xl lg:h-full">
        <div className="flex flex-col lg:flex-row gap-6 lg:h-full">
          {/* Left Side - Test List */}
          <div className="order-2 lg:order-1 lg:w-2/3 lg:h-full lg:overflow-hidden">
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg lg:h-full lg:overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Testlar ro&apos;yxati
              </h3>
              {WorkedOn?.TestWorkedOn?.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <svg
                    className="w-16 h-16 text-gray-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  <p className="text-lg font-medium text-gray-600 mb-1">
                    Hali testlar yo'q
                  </p>
                  <p className="text-sm text-gray-500">
                    Siz hali birorta ham test ishlamagansiz
                  </p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {[...WorkedOn.TestWorkedOn].reverse().map((test) => (
                    <div
                      key={test._id._id}
                      className="p-3 sm:p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col gap-2 sm:gap-3">
                        <div className="flex justify-between items-start">
                          <h4 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1 pr-4">
                            {test._id.title}
                          </h4>
                          <span className="text-base sm:text-lg font-bold text-blue-600 whitespace-nowrap">
                            {test.correctPercentage}%
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-grow h-2 sm:h-2.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                test.correctPercentage >= 70
                                  ? "bg-green-500"
                                  : test.correctPercentage >= 40
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                              style={{ width: `${test.correctPercentage}%` }}
                            ></div>
                          </div>
                          <span className="text-xs sm:text-sm text-gray-500 min-w-[90px] sm:min-w-[100px] text-right">
                            {test.correctCount} / {test.totalQuestions} to'g'ri
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Profile and Stats */}
          <div className="order-1 lg:order-2 lg:w-1/3">
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
              {/* Profile Section */}
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50">
                  <img
                    src="/user.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    {WorkedOn?.name || "Foydalanuvchi"}
                  </h2>
                  <span className="text-sm sm:text-base text-gray-500">
                    Jami testlar: {WorkedOn?.TestWorkedOn?.length || 0}
                  </span>
                </div>
              </div>

              {/* Progress Circle */}
              <div className="mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 text-left pl-4">
                  Umumiy natija
                </h2>
                <div className="flex items-center justify-center">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32">
                    <div className="w-full h-full rounded-full bg-gray-100">
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `conic-gradient(#3B82F6 ${calculateAveragePercentage()}%, transparent 0)`,
                        }}
                      ></div>
                      <div className="absolute inset-2 rounded-full bg-white flex flex-col items-center justify-center">
                        <span className="text-2xl sm:text-3xl font-bold text-gray-800">
                          {calculateAveragePercentage()}%
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500">
                          O'rtacha
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistika grafigi */}
              <div className="bg-white rounded-xl p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-800 text-left ">
                  Natijalar statistikasi
                </h2>
                <div className="w-full h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[...WorkedOn.TestWorkedOn]
                        .reverse()
                        .slice(0, 10)
                        .map((test, index) => ({
                          name: `Test ${index + 1}`,
                          percentage: test.correctPercentage,
                        }))}
                      margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 10, fill: "#64748B" }}
                        axisLine={{ stroke: "#CBD5E1" }}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tick={{ fontSize: 10, fill: "#64748B" }}
                        axisLine={{ stroke: "#CBD5E1" }}
                        tickLine={false}
                        tickCount={6}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "white",
                          border: "none",
                          borderRadius: "8px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          padding: "8px 12px",
                        }}
                        labelStyle={{
                          color: "#64748B",
                          fontWeight: 500,
                          marginBottom: "4px",
                        }}
                        itemStyle={{
                          color: "#3B82F6",
                          fontWeight: 600,
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="percentage"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        dot={{
                          fill: "#3B82F6",
                          r: 4,
                          strokeWidth: 2,
                          stroke: "white",
                        }}
                        activeDot={{
                          r: 6,
                          stroke: "#3B82F6",
                          strokeWidth: 2,
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTestsOnWorked;
