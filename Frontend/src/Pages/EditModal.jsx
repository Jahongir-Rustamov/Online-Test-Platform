import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  EnvelopeIcon,
  UserPlusIcon,
  CheckCircleIcon,
  LinkIcon
} from '@heroicons/react/24/outline';
import { useUserStore } from '../stores/useUserStore';

const EditModal = ({ student, onClose, onSave, loading = false, students }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParent, setSelectedParent] = useState(null);
  const [filteredParents, setFilteredParents] = useState([]);
  const { createParents } = useUserStore();
  const modalRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Constants
  const DEFAULT_ROLE = 'parent'; // Only parent role allowed

  // Filter out the current student from search results
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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Search logic
  useEffect(() => {
    if (searchTerm && searchTerm.trim() !== '' && !selectedParent) {
      const lower = searchTerm.toLowerCase();
      const filtered = availableStudents.filter(s =>
        (s.name && s.name.toLowerCase().includes(lower)) ||
        (s.email && s.email.toLowerCase().includes(lower))
      );
      setFilteredParents(filtered.slice(0, 5)); // Limit results for compactness
    } else {
      setFilteredParents([]);
    }
  }, [searchTerm, availableStudents, selectedParent]);

  const handleParentSelect = (parent) => {
    setSelectedParent(parent);
    setSearchTerm(parent.name);
    setFilteredParents([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedParent) return;

    onSave({
      s_ID: student?._id,
      p_ID: selectedParent?._id,
      p_role: DEFAULT_ROLE
    });

    await createParents({
      p_ID: selectedParent?._id,
      p_role: DEFAULT_ROLE,
      s_ID: student?._id
    });
    onClose();
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!student) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#020617]/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          ref={modalRef}
          className="relative w-full max-w-lg bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Subtle decoration */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 via-sky-400 to-emerald-500 opacity-50" />

          {/* Header */}
          <div className="px-6 py-5 flex items-center justify-between border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center border border-primary-500/20">
                <LinkIcon className="h-5 w-5 text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-outfit">Bog'lash</h3>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Ota-ona & Talaba</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-all"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Student Info Card (Compact) */}
            <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
                <UserCircleIcon className="h-6 w-6 text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-0.5">Talaba</p>
                <h4 className="text-sm font-bold text-white truncate">{student.name}</h4>
                <p className="text-xs text-slate-500 truncate">{student.email}</p>
              </div>
              <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <span className="text-[10px] font-black text-emerald-400 uppercase">Faol</span>
              </div>
            </div>

            {/* Parent Search Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <UserPlusIcon className="h-3 w-3 text-primary-400" />
                  Ota-ona Qidiruvi
                </label>
                {selectedParent && (
                  <button
                    type="button"
                    onClick={() => { setSelectedParent(null); setSearchTerm(''); }}
                    className="text-[10px] font-black text-rose-400 uppercase tracking-wider hover:text-rose-300 transition-colors"
                  >
                    O'zgartirish
                  </button>
                )}
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className={`h-4 w-4 transition-colors ${selectedParent ? 'text-emerald-400' : 'text-slate-500 group-focus-within:text-primary-400'}`} />
                </div>
                <input
                  type="text"
                  placeholder="Ism yoki email orqali..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  disabled={!!selectedParent}
                  className={`w-full pl-11 pr-4 py-3 bg-white/[0.03] border rounded-2xl text-sm transition-all outline-none ${selectedParent
                      ? 'border-emerald-500/30 text-emerald-400 font-medium'
                      : 'border-white/5 focus:border-primary-500/50 focus:bg-white/[0.05] text-white placeholder-slate-600'
                    }`}
                />

                {/* Search Results Dropdown */}
                <AnimatePresence>
                  {filteredParents.length > 0 && !selectedParent && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute z-50 w-full mt-2 bg-[#1e293b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-1"
                    >
                      {filteredParents.map((parent) => (
                        <button
                          key={parent._id}
                          type="button"
                          onClick={() => handleParentSelect(parent)}
                          className="w-full flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-all text-left"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center border border-primary-500/10 text-primary-400 text-xs font-bold">
                              {parent.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white leading-none mb-1">{parent.name}</p>
                              <p className="text-[10px] text-slate-500 truncate max-w-[180px]">{parent.email}</p>
                            </div>
                          </div>
                          <CheckCircleIcon className="h-4 w-4 text-emerald-500 opacity-0 group-hover:opacity-100" />
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Role Display (Non-editable as requested) */}
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/10">
                  <UserCircleIcon className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">Ota-ona Rolli</h5>
                  <p className="text-[10px] text-slate-500">Ushbu bog'lanish uchun faqat ota-ona roli amal qiladi</p>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3.5 bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-[10px] uppercase tracking-widest rounded-2xl transition-all active:scale-95 border border-white/5"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                disabled={loading || !selectedParent}
                className={`flex-[1.5] px-6 py-3.5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all active:scale-95 shadow-xl shadow-primary-500/20 disabled:opacity-40 disabled:grayscale disabled:cursor-not-allowed`}
              >
                {loading ? 'Saqlanmoqda...' : 'Saqlash'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EditModal;