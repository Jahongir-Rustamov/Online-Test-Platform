import React, { useEffect, useRef, useState } from 'react';
import { XMarkIcon, MagnifyingGlassIcon, UserCircleIcon, EnvelopeIcon, AcademicCapIcon, UserPlusIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useUserStore } from '../stores/useUserStore';

const EditModal = ({ student, onClose, onSave, loading = false, students }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedParent, setSelectedParent] = React.useState(null);
  const [role, setRole] = React.useState('student');
  const [filteredParents, setFilteredParents] = React.useState([]);
  const { createParents } = useUserStore();
  const modalRef = useRef(null);

  // Get all students except the current one
  const availableStudents = React.useMemo(() => {
    if (!students || !student) return [];
    return students.filter(s => s._id !== student._id);
  }, [students, student]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Filter students based on search term
  useEffect(() => {
    // Only show results if there's a search term and no parent is selected
    if (searchTerm && searchTerm.trim() !== '' && !selectedParent) {
      const searchTermLower = searchTerm.toLowerCase();
      const filtered = availableStudents.filter(student => 
        (student.name && student.name.toLowerCase().includes(searchTermLower)) ||
        (student.email && student.email.toLowerCase().includes(searchTermLower))
      );
      setFilteredParents(filtered);
    } else {
      setFilteredParents([]);
    }
  }, [searchTerm, availableStudents, selectedParent]);

  const handleParentSelect = (student) => {
    setSelectedParent(student);
    setSearchTerm(student.name);
    // Clear the search results immediately after selection
    setFilteredParents([]);
    // Also clear the search input
    // setSearchTerm(''); // Uncomment this line if you want to clear the search input after selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave({
      s_ID: student?._id,
      p_ID: selectedParent?._id,
      p_role: role
    });
    await createParents({
      p_ID: selectedParent?._id,
      p_role: role,
      s_ID: student?._id
    });
    onClose();
  };

  if (!student) return null;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the animation when the component mounts
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div 
        ref={modalRef}
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} border border-gray-200 overflow-hidden`}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-blue-600 text-white z-10 shadow-sm">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <AcademicCapIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">Ota-onani va uning farzandini bog'lash</h3>
                <p className="text-sm text-blue-100/90 mt-0.5 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-200 mr-2"></span>
                  Talaba va ota-onani bog'lash
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg text-blue-100 hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
              aria-label="Yopish"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Student Info Section */}
          <div className="space-y-5 bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center space-x-3 mb-5">
              <div className="p-1.5 bg-indigo-100 rounded-lg">
                <UserCircleIcon className="h-5 w-5 text-indigo-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                O'quvchi ma'lumotlari
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-full">
                  Faol
                </span>
              </h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-600 flex items-center">
                  <span className="text-indigo-500 mr-1.5">•</span>
                  Ism Familiya
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserCircleIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={student.name || ''}
                    readOnly
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-600 flex items-center">
                  <span className="text-indigo-500 mr-1.5">•</span>
                  Elektron pochta
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={student.email || ''}
                    readOnly
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-700"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Parent Search Section */}
          <div className="space-y-5 bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl border border-amber-100 shadow-sm">
            <div className="flex items-center space-x-3 mb-5">
              <div className="p-1.5 bg-amber-100 rounded-lg">
                <UserPlusIcon className="h-5 w-5 text-amber-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800">Ota-ona bilan bog'lanish</h4>
            </div>
            
            <div className="relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-amber-400" />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ota-onani ismi yoki emaili orqali qidiring..."
                    className="block w-full pl-10 pr-10 py-2.5 border-2 border-amber-100 rounded-xl bg-white focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all text-gray-700 placeholder-amber-400/70"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedParent(null);
                        setFilteredParents([]);
                      }}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-amber-500 hover:text-amber-700 transition-colors"
                      aria-label="Tozalash"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
              
              {filteredParents.length > 0 && (
                <div className="absolute z-20 w-full mt-2 bg-white border border-amber-100 rounded-xl shadow-xl overflow-hidden">
                  {filteredParents.map((parent, index) => (
                    <div
                      key={parent._id}
                      className={`px-4 py-3 hover:bg-amber-50 cursor-pointer border-b border-amber-50 last:border-0 transition-all ${index === 0 ? 'pt-4' : ''} ${index === filteredParents.length - 1 ? 'pb-4' : ''}`}
                      onClick={() => handleParentSelect(parent)}
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-medium">
                          {parent.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium text-gray-900 flex items-center">
                            {parent.name}
                            {selectedParent?._id === parent._id && (
                              <CheckCircleIcon className="h-4 w-4 text-green-500 ml-2" />
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{parent.email}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedParent && (
              <div className="mt-4 p-5 bg-amber-50/50 border-2 border-amber-100 rounded-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="text-sm font-medium text-amber-800 flex items-center">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1.5" />
                    Tanlangan ota-ona
                  </h5>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedParent(null);
                      setSearchTerm('');
                    }}
                    className="text-xs text-amber-600 hover:text-amber-800 transition-colors"
                  >
                    O'chirish
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-amber-700">Ism Familiya</label>
                    <div className="px-3 py-2 bg-white border border-amber-100 rounded-lg text-gray-700">
                      {selectedParent.name}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-amber-700">Elektron pochta</label>
                    <div className="px-3 py-2 bg-white border border-amber-100 rounded-lg text-gray-700">
                      {selectedParent.email}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Role Selection */}
          <div className="space-y-5 bg-gradient-to-br from-emerald-50 to-white p-6 rounded-xl border border-emerald-100 shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="p-1.5 bg-emerald-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Rolni tanlang</h4>
              </div>
              
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="appearance-none w-full pl-12 pr-10 py-3 border-2 border-emerald-100 rounded-xl bg-white focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all text-gray-700 cursor-pointer"
                >
                  <option value="student">O'quvchi</option>
                  <option value="parent">Ota-ona</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-emerald-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="h-5 w-5 text-emerald-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>
              
              <div className="mt-2 text-sm text-emerald-700 bg-emerald-50/80 border border-emerald-100 rounded-lg p-3">
                <p className="flex items-start">
                  <svg className="h-4 w-4 text-emerald-500 mr-1.5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>O'quvchi roli tanlanganda, o'quvchi o'z hisobiga kirish huquqiga ega bo'ladi. Ota-ona roli tanlanganda, faqatgina o'z farzandining natijalarini ko'ra oladi.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 -mx-6 px-6 py-4 -mb-6 mt-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="text-xs text-gray-500">
                <p>Barcha maydonlar to'g'ri to'ldirilganligini tekshiring</p>
              </div>
              <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100 transition-all duration-200 hover:shadow-sm w-full sm:w-auto flex items-center justify-center"
                >
                  <span>Bekor qilish</span>
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 border border-transparent rounded-xl text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-100 w-full sm:w-auto flex items-center justify-center"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Saqlanmoqda...</span>
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Saqlash</span>
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;