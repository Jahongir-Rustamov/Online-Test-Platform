import { useNavigate } from "react-router-dom";
import { useTestsStore } from "../stores/useTestsStore";
import { useUserStore } from "../stores/useUserStore";
import { Crown } from "lucide-react";

const SubjectCard = ({ subject }) => {
  const navigate = useNavigate();
  const { getMytests } = useTestsStore();
  const { user } = useUserStore();

  const isTeacher = user && user.name === subject.teacherName;

  return (
    <div
      onClick={() => {
        navigate(`/subject/${subject._id}`, { state: { name: subject.name } });
        getMytests(subject._id);
      }}
      className="bg-[#1e293b]/50 backdrop-blur-xl border border-white/10 h-[150px] md:h-[180px] rounded-3xl cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:bg-[#1e293b]/80 hover:border-primary-500/50 hover:shadow-[0_10px_40px_-10px_rgba(16,185,129,0.3)] relative group flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

      {/* Teacher Crown Icon */}
      {isTeacher && (
        <div className="absolute top-4 left-4 z-20 animate-pulse">
          <Crown className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]" />
        </div>
      )}

      {/* Teacher Badge */}
      <div
        className="absolute top-4 right-4 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 shadow-sm flex items-center gap-1.5 group-hover:bg-primary-500/20 group-hover:text-primary-300 group-hover:border-primary-500/30 transition-all duration-300 backdrop-blur-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
        {subject.teacherName.charAt(0).toUpperCase() +
          subject.teacherName.slice(1).toLowerCase()}
      </div>

      <div className="text-center z-10 w-full px-4 mt-4">
        <h3 className="text-xl md:text-2xl font-bold text-white font-outfit truncate group-hover:text-primary-400 transition-colors duration-300">
          {subject.name}
        </h3>
        <div className="mt-4 inline-flex items-center space-x-2 bg-white/5 border border-white/5 px-4 py-1.5 rounded-full group-hover:bg-primary-500/10 group-hover:border-primary-500/20 transition-all duration-300">
          <span className="text-xs md:text-sm font-medium text-slate-400 group-hover:text-primary-200 transition-colors">
            Umumiy testlar: <strong className="text-white group-hover:text-primary-400">{subject.testsCount}</strong> ta
          </span>
        </div>
      </div>
    </div>
  );
};

export { SubjectCard };
