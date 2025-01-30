import { useNavigate } from "react-router-dom";
import { useTestsStore } from "../stores/useTestsStore";

const SubjectCard = ({ subject }) => {
  const navigate = useNavigate();
  const { getMytests } = useTestsStore();
  const colors = {
    blue: "bg-blue-800",
    purple: "bg-purple-800",
    green: "bg-green-800",
    pink: "bg-pink-800",
    indigo: "bg-indigo-800",
    teal: "bg-teal-800",
    red: "bg-red-800",
    yellow: "bg-yellow-800",
    orange: "bg-orange-800",
    cyan: "bg-cyan-800",
    lime: "bg-lime-800",
    amber: "bg-amber-800",
    emerald: "bg-emerald-800",
    rose: "bg-rose-800",
    fuchsia: "bg-fuchsia-800",
    violet: "bg-violet-800",
    slate: "bg-slate-800",
    stone: "bg-stone-800",
    sky: "bg-sky-800",
  };

  const lightColors = {
    blue: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
    green: "bg-green-100 text-green-800",
    pink: "bg-pink-100 text-pink-800",
    indigo: "bg-indigo-100 text-indigo-800",
    teal: "bg-teal-100 text-teal-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
    orange: "bg-orange-100 text-orange-800",
    cyan: "bg-cyan-100 text-cyan-800",
    lime: "bg-lime-100 text-lime-800",
    amber: "bg-amber-100 text-amber-800",
    emerald: "bg-emerald-100 text-emerald-800",
    rose: "bg-rose-100 text-rose-800",
    fuchsia: "bg-fuchsia-100 text-fuchsia-800",
    violet: "bg-violet-100 text-violet-800",
    slate: "bg-slate-100 text-slate-800",
    stone: "bg-stone-100 text-stone-800",
    sky: "bg-sky-100 text-sky-800",
  };

  // Tasodifiy ranglar
  const randomColorKey =
    Object.keys(colors)[Math.floor(Math.random() * Object.keys(colors).length)];
  return (
    <div
      onClick={() => (
        navigate(`/subject/${subject._id}`, { state: { name: subject.name} }),
        getMytests(subject._id)
      )}
      className={`${colors[randomColorKey]} h-[120px] md:h-[150px] rounded-lg cursor-pointer transition-all duration-300 hover:shadow-2xl text-white relative group flex items-center justify-center overflow-hidden`}
    >
      {/* Teacher Badge */}
      <div
        className={`absolute top-2 right-2 ${lightColors[randomColorKey]} px-3 py-1 rounded-full text-sm font-medium shadow-lg flex items-center gap-1`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
        {subject.teacherName.charAt(0).toUpperCase() +
          subject.teacherName.slice(1).toLowerCase()}
      </div>

      <div className="text-center">
        <h3 className="text-xl md:text-3xl font-bold tracking-wider">
          {subject.name}
        </h3>
        <p className="text-sm md:text-lg opacity-90">
          Testlar soni: {subject.testsCount}
        </p>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
    </div>
  );
};

export { SubjectCard };
