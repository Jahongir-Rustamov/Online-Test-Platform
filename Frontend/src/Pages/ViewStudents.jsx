import { useState, useEffect } from 'react';
import {
  TrashIcon,
  PencilSquareIcon,
  AcademicCapIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { useUserStore } from '../stores/useUserStore';
import EditModal from './EditModal';

const ViewStudents = () => {
  const { getAllStudents, loading, studentss, deleteStudent } = useUserStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 8;
  const students = studentss || [];
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    getAllStudents();
  }, [getAllStudents]);

  const handleDelete = async (id) => {
    if (window.confirm('Haqiqatan ham bu o\'quvchini o\'chirmoqchimisiz?')) {
      await deleteStudent(id);
    }
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  // Filter students based on search term
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Check if we need to adjust the current page
  useEffect(() => {
    if (currentPage > 1 && filteredStudents.length > 0) {
      const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
      if (currentPage > totalPages) {
        setCurrentPage(totalPages > 0 ? totalPages : 1);
      }
    } else if (currentPage > 1 && filteredStudents.length === 0) {
      setCurrentPage(1);
    }
  }, [filteredStudents.length, currentPage, studentsPerPage]);

  // Get current students for pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  // Calculate total pages
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate page numbers to display
  const pageNumbers = [];
  const maxPageButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-[50vh] w-full mt-8">
        <div className="relative flex items-center justify-center p-8 bg-[#1e293b]/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(16,185,129,0.1)]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-50 rounded-3xl pointer-events-none" />
          <div className="h-12 w-12 border-4 border-white/10 border-t-primary-500 rounded-full animate-spin relative z-10" />
          <span className="ml-4 text-slate-300 font-medium tracking-wide relative z-10 animate-pulse">
            Yuklanmoqda...
          </span>
        </div>
      </div>
    );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      {/* Edit Student Modal */}
      {isEditModalOpen && selectedStudent && (
        <EditModal
          student={selectedStudent}
          students={students}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedStudent(null);
          }}
          onSave={async (data) => {
            console.log('Saving:', data);
            setIsEditModalOpen(false);
            setSelectedStudent(null);
          }}
        />
      )}

      {/* Header & Search Area */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary-500/10 border border-primary-500/20 rounded-2xl shadow-inner">
            <AcademicCapIcon className="w-8 h-8 text-primary-400" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-outfit">
              O'quvchilar Ro'yxati
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">
              Jami {filteredStudents.length} ta o'quvchi topildi
            </p>
          </div>
        </div>

        <div className="relative group w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="O'quvchini qidirish..."
            className="block w-full pl-11 pr-4 py-3.5 border border-white/10 rounded-2xl bg-[#1e293b]/40 backdrop-blur-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300 shadow-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-[#1e293b]/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-420px)] custom-scrollbar">
          <table className="min-w-full divide-y divide-white/5">
            <thead>
              <tr className="bg-slate-900/40">
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">#</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">O'quvchi</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Testlar</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="p-4 bg-slate-800/40 rounded-full border border-white/5">
                        <UserIcon className="w-8 h-8 text-slate-500" />
                      </div>
                      <p className="text-slate-400 font-medium">Hech qanday o'quvchi topilmadi</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentStudents.map((student, index) => (
                  <tr key={student._id} className="hover:bg-white/5 transition-all duration-200 group">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium">
                      {index + 1 + (currentPage - 1) * studentsPerPage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/10 border border-primary-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <span className="text-primary-400 font-bold text-sm tracking-tighter">
                            {student.name.split(' ').map(n => n[0].toUpperCase()).join('').substring(0, 2)}
                          </span>
                        </div>
                        <div className="text-sm font-bold text-white group-hover:text-primary-400 transition-colors">
                          {student.name.charAt(0).toUpperCase() + student.name.slice(1).toLowerCase()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300 font-light">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full font-medium">
                        {student.countOfTests || 0} ta
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap min-w-[200px]">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-slate-800/60 rounded-full h-2 overflow-hidden border border-white/5">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(var(--tw-gradient-from),0.5)] ${student.averageScore >= 80 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' :
                              student.averageScore >= 50 ? 'bg-gradient-to-r from-amber-500 to-orange-400' :
                                'bg-gradient-to-r from-red-500 to-rose-400'
                              }`}
                            style={{ width: `${student.averageScore || 0}%` }}
                          ></div>
                        </div>
                        <span className={`text-xs font-bold min-w-[35px] text-right ${student.averageScore >= 80 ? 'text-emerald-400' :
                          student.averageScore >= 50 ? 'text-amber-400' : 'text-rose-400'
                          }`}>
                          {student.averageScore || 0}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEditClick(student)}
                          className="p-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300"
                          title="Tahrirlash"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(student._id)}
                          className="p-2 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl hover:bg-rose-500 hover:text-white transition-all duration-300"
                          title="O'chirish"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4 px-2 overflow-y-auto max-h-[calc(100vh-380px)] custom-scrollbar pb-4">
        {filteredStudents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 bg-[#1e293b]/40 backdrop-blur-xl border border-white/5 rounded-3xl">
            <div className="p-4 bg-slate-800/40 rounded-full border border-white/5 mb-3">
              <UserIcon className="w-8 h-8 text-slate-500" />
            </div>
            <p className="text-slate-400 font-medium font-outfit">Hech qanday o'quvchi topilmadi</p>
          </div>
        ) : (
          currentStudents.map((student) => (
            <div
              key={student._id}
              className="backdrop-blur-xl bg-[#1e293b]/60 border border-white/10 rounded-3xl p-5 shadow-xl relative overflow-hidden group active:scale-[0.98] transition-all duration-200"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/5 blur-2xl rounded-full -mr-10 -mt-10 group-hover:bg-primary-500/10 transition-colors" />

              <div className="flex justify-between items-start mb-5 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/10 border border-primary-500/20 flex items-center justify-center">
                    <span className="text-primary-400 font-bold text-base tracking-tighter">
                      {student.name.split(' ').map(n => n[0].toUpperCase()).join('').substring(0, 2)}
                    </span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h3 className="text-base font-bold text-white font-outfit leading-tight group-hover:text-primary-400 transition-colors truncate pr-2">
                      {student.name.charAt(0).toUpperCase() + student.name.slice(1).toLowerCase()}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-light mt-0.5 break-all line-clamp-1 opacity-80">{student.email}</p>
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEditClick(student)}
                    className="p-2.5 bg-blue-500/10 text-blue-400 border border-blue-500/10 rounded-xl active:bg-blue-500 active:text-white transition-all shadow-sm"
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(student._id)}
                    className="p-2.5 bg-rose-500/10 text-rose-400 border border-rose-500/10 rounded-xl active:bg-rose-500 active:text-white transition-all shadow-sm"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 relative z-10">
                <div className="bg-slate-900/40 p-3 rounded-2xl border border-white/5">
                  <span className="block text-[10px] text-slate-500 uppercase font-bold mb-1 tracking-wider">Testlar</span>
                  <span className="inline-flex px-2 py-0.5 rounded-lg text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/20">
                    {student.countOfTests || 0} ta
                  </span>
                </div>
                <div className="bg-slate-900/40 p-3 rounded-2xl border border-white/5">
                  <span className="block text-[10px] text-slate-500 uppercase font-bold mb-1 tracking-wider">O'rtacha Ball</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold leading-none ${student.averageScore >= 80 ? 'text-emerald-400' :
                      student.averageScore >= 50 ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                      {student.averageScore || 0}%
                    </span>
                    <div className="flex-1 bg-slate-800 rounded-full h-1.5 overflow-hidden border border-white/5">
                      <div
                        className={`h-full rounded-full ${student.averageScore >= 80 ? 'bg-emerald-500' :
                          student.averageScore >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                        style={{ width: `${student.averageScore || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Improved Pagination Area */}
      {totalPages > 1 && (
        <div className="mt-8 relative z-10 px-2">
          <div className="bg-[#1e293b]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-4 md:p-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs md:text-sm text-slate-400 font-medium">
                Showing <span className="text-white">{indexOfFirstStudent + 1}</span> to <span className="text-white">{Math.min(indexOfLastStudent, filteredStudents.length)}</span> of <span className="text-white">{filteredStudents.length}</span> students
              </div>
              <div className="flex items-center gap-1 md:gap-1.5">
                <button
                  onClick={() => paginate(1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl text-slate-500 hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                >
                  &laquo;
                </button>

                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`min-w-[32px] md:min-w-[40px] h-8 md:h-10 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 ${currentPage === number
                      ? 'bg-primary-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] border border-primary-500/30'
                      : 'text-slate-400 hover:bg-white/5 border border-transparent hover:text-white'
                      }`}
                  >
                    {number}
                  </button>
                ))}

                <button
                  onClick={() => paginate(totalPages)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl text-slate-500 hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                >
                  &raquo;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewStudents;
