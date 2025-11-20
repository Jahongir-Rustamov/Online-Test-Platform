import { useState, useEffect } from 'react';
import { 
  TrashIcon, 
  PencilSquareIcon,
  AcademicCapIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { useUserStore } from '../stores/useUserStore';
import EditModal from './EditModal';

const ViewStudents = () => {
  
  const { getAllStudents,loading,studentss,deleteStudent} = useUserStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;
  const students = studentss;
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

  return (
    <div className="p-4 md:p-6">
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
            // await updateStudent(data);
            setIsEditModalOpen(false);
            setSelectedStudent(null);
          }}
        />
      )}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center">
            <AcademicCapIcon className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 whitespace-nowrap">
              O'quvchilar Ro'yxati
            </h1>
          </div>
          
          <div className="relative w-full sm:w-72 md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Qidirish..."
              className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition duration-150"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="w-16 px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th scope="col" className="w-1/4 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ism Familiya
                </th>
                <th scope="col" className="w-1/3 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Testlar soni
                </th>
                <th scope="col" className="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  O'rtacha Ball
                </th>
                <th scope="col" className="w-32 px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <ArrowPathIcon className="animate-spin h-8 w-8 text-blue-500 mb-2" />
                      <p>Ma'lumotlar yuklanmoqda...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    Hech qanday o&apos;quvchi topilmadi
                  </td>
                </tr>
              ) : (
                currentStudents.map((student, index) => (
                  <tr key={student._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {index + 1 + (currentPage - 1) * studentsPerPage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-medium">
                            {student.name.split(' ').map(n => n[0].toUpperCase()).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.name.charAt(0).toUpperCase() + student.name.slice(1).toLowerCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.countOfTests} ta
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div 
                            className={`h-2.5 rounded-full ${
                              student.averageScore >= 80 ? 'bg-green-500' : 
                              student.averageScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${student.averageScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {student.averageScore}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleDelete(student._id)}
                          className="text-red-600 hover:text-red-900 p-1.5 rounded-full hover:bg-red-50"
                          title="O'chirish"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                        {/* TODO: Implement edit student functionality */}
                        <button
                          onClick={() => handleEditClick(student)}
                          className="text-blue-600 hover:text-blue-900 p-1.5 rounded-full hover:bg-blue-50"
                          title="Tahrirlash"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
            <div className="text-sm text-gray-700">
              {filteredStudents.length} ta o'quvchidan {indexOfFirstStudent + 1}-{Math.min(indexOfLastStudent, filteredStudents.length)} ko'rsatilmoqda
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => paginate(1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &laquo;
              </button>
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &lsaquo;
              </button>
              
              {startPage > 1 && (
                <span className="px-2 text-gray-500">...</span>
              )}
              
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === number
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {number}
                </button>
              ))}
              
              {endPage < totalPages && (
                <span className="px-2 text-gray-500">...</span>
              )}
              
              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &rsaquo;
              </button>
              <button
                onClick={() => paginate(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &raquo;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewStudents;
