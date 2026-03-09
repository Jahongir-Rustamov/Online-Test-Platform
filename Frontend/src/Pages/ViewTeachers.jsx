import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  DocumentDuplicateIcon,
  CheckIcon,
  PencilSquareIcon,
  TrashIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useTestsStore } from "../stores/useTestsStore";
import { PropagateLoader } from "react-spinners";

const ViewTeachers = () => {
  const [copiedItems, setCopiedItems] = useState({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const {
    TeachersAdmins,
    getAllTeacherAndAdmin,
    loading,
    deleteSubjectAndTeacher,
    updateInfosOfTeachers,
  } = useTestsStore();

  const [updateForm, setUpdateForm] = useState({
    name: "",
    email: "",
    newPassword: "",
    subject: "",
  });

  useEffect(() => {
    getAllTeacherAndAdmin();
  }, [getAllTeacherAndAdmin]);
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

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedItems({ ...copiedItems, [field]: true });
    setTimeout(() => {
      setCopiedItems({ ...copiedItems, [field]: false });
    }, 2000);
  };

  const handleDeleteClick = (teacher) => {
    setSelectedTeacher(teacher);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    // TODO: Implement delete logic
    deleteSubjectAndTeacher(selectedTeacher?._id);
    console.log("Delete teacher:", selectedTeacher?._id);
    setDeleteModalOpen(false);
    setSelectedTeacher(null);
  };

  const handleUpdateClick = (teacher) => {
    setSelectedTeacher(teacher);
    setUpdateForm({
      name: teacher.teacherName || teacher.name,
      email: teacher.teacherEmail || teacher.email,
      newPassword: "",
      subject: teacher.subjects?.[0]?.subjectName,
    });
    setUpdateModalOpen(true);
  };

  const handleUpdateConfirm = () => {
    console.log("O'qituvchi yangilandi:", {
      id: selectedTeacher?._id,
      ...updateForm,
    });
    updateInfosOfTeachers({
      id: selectedTeacher?._id,
      ...updateForm,
    });

    setUpdateModalOpen(false);
    setSelectedTeacher(null);
  };

  const handleUpdateFormChange = (field, value) => {
    setUpdateForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  if (!TeachersAdmins || TeachersAdmins.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[40vh] flex-col gap-4 bg-[#1e293b]/40 backdrop-blur-xl border border-white/5 rounded-3xl mt-6 p-8 shadow-xl">
        <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center border border-white/10 mb-2">
          <UserGroupIcon className="w-8 h-8 text-slate-500" />
        </div>
        <p className="text-xl font-bold text-white font-outfit">
          Hozircha o'qituvchilar yo'q
        </p>
        <p className="text-slate-400 text-sm max-w-sm text-center">
          Yangi o'qituvchilar qo'shilganda ularning ro'yxati shu yerda paydo bo'ladi.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 animate-in fade-in zoom-in-95 duration-500 relative z-10">
      {/* Desktop version */}
      <div className="hidden md:block bg-[#1e293b]/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <TableContainer
          sx={{
            maxHeight: "calc(100vh - 280px)",
            backgroundColor: "transparent",
            "& .MuiTable-root": { backgroundColor: "transparent" },
            "&::-webkit-scrollbar": { width: "6px", height: "6px" },
            "&::-webkit-scrollbar-track": { background: "rgba(15, 23, 42, 0.4)" },
            "&::-webkit-scrollbar-thumb": { background: "rgba(148, 163, 184, 0.2)", borderRadius: "10px" },
            "&::-webkit-scrollbar-thumb:hover": { background: "rgba(16, 185, 129, 0.5)" },
          }}
          className="custom-scrollbar"
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: "rgba(30, 41, 59, 0.95)", color: "#94a3b8", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>№</TableCell>
                <TableCell sx={{ backgroundColor: "rgba(30, 41, 59, 0.95)", color: "#94a3b8", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Ism</TableCell>
                <TableCell sx={{ backgroundColor: "rgba(30, 41, 59, 0.95)", color: "#94a3b8", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Email</TableCell>
                <TableCell sx={{ backgroundColor: "rgba(30, 41, 59, 0.95)", color: "#94a3b8", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Lavozim</TableCell>
                <TableCell sx={{ backgroundColor: "rgba(30, 41, 59, 0.95)", color: "#94a3b8", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Fan nomi</TableCell>
                <TableCell sx={{ backgroundColor: "rgba(30, 41, 59, 0.95)", color: "#94a3b8", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>Testlar soni</TableCell>
                <TableCell sx={{ backgroundColor: "rgba(30, 41, 59, 0.95)", color: "#94a3b8", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>O'chirish</TableCell>
                <TableCell sx={{ backgroundColor: "rgba(30, 41, 59, 0.95)", color: "#94a3b8", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>Tahrirlash</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {TeachersAdmins.map((teacher, index) => (
                <TableRow
                  key={teacher._id}
                  hover
                  sx={{
                    transition: "all 0.2s ease-in-out",
                    backgroundColor: teacher.role === "admin" ? "rgba(234, 179, 8, 0.05)" : "transparent",
                    "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.03) !important" },
                  }}
                >
                  <TableCell sx={{ color: "#cbd5e1", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{index + 1}</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 500, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div className="flex items-center gap-2">
                      {teacher.teacherName || teacher.name}
                      <Tooltip title={copiedItems[`name-${teacher._id}`] ? "Nusxalandi!" : "Nusxalash"} arrow>
                        <button
                          onClick={() => handleCopy(teacher.teacherName || teacher.name, `name-${teacher._id}`)}
                          className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-slate-400 hover:text-white"
                        >
                          {copiedItems[`name-${teacher._id}`] ? <CheckIcon className="w-4 h-4 text-primary-400" /> : <DocumentDuplicateIcon className="w-4 h-4" />}
                        </button>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell sx={{ color: "#cbd5e1", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div className="flex items-center gap-2">
                      {teacher.teacherEmail || teacher.email}
                      <Tooltip title={copiedItems[`email-${teacher._id}`] ? "Nusxalandi!" : "Nusxalash"} arrow>
                        <button
                          onClick={() => handleCopy(teacher.teacherEmail || teacher.email, `email-${teacher._id}`)}
                          className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-slate-400 hover:text-white"
                        >
                          {copiedItems[`email-${teacher._id}`] ? <CheckIcon className="w-4 h-4 text-primary-400" /> : <DocumentDuplicateIcon className="w-4 h-4" />}
                        </button>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell sx={{ color: "#cbd5e1", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide uppercase ${teacher.role === 'admin'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                      }`}>
                      {teacher.teacherRole || teacher.role}
                    </span>
                  </TableCell>
                  <TableCell sx={{ color: "#cbd5e1", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    {teacher.role === "admin" ? "-" : (teacher.subjects?.[0]?.subjectName || <span className="text-slate-500 italic">Biriktirilmagan</span>)}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
                    {teacher.role === "admin" ? "-" : (
                      <span className="bg-primary-500/10 text-primary-400 border border-primary-500/20 px-3 py-1 rounded-full text-sm font-medium">
                        {teacher.subjects?.[0]?.subjectCount || 0} ta
                      </span>
                    )}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
                    <Tooltip title={teacher.role === "admin" ? "Adminni o'chirib bo'lmaydi" : "O'chirish"} arrow>
                      <span>
                        <button
                          onClick={() => handleDeleteClick(teacher)}
                          className="p-1.5 hover:bg-red-500/20 rounded-md transition-colors group"
                          disabled={teacher.role === "admin"}
                        >
                          <TrashIcon className={`w-5 h-5 ${teacher.role === "admin" ? "text-slate-600" : "text-red-400 group-hover:text-red-300"}`} />
                        </button>
                      </span>
                    </Tooltip>
                  </TableCell>
                  <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
                    <Tooltip title={teacher.role === "admin" ? "Adminni tahrirlab bo'lmaydi" : "O'zgartirish"} arrow>
                      <span>
                        <button
                          onClick={() => handleUpdateClick(teacher)}
                          className="p-1.5 hover:bg-blue-500/20 rounded-md transition-colors group"
                          disabled={teacher.role === "admin"}
                        >
                          <PencilSquareIcon className={`w-5 h-5 ${teacher.role === "admin" ? "text-slate-600" : "text-blue-400 group-hover:text-blue-300"}`} />
                        </button>
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Mobile version */}
      <div className="md:hidden">
        <div className="mb-6 px-2">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-2xl">
            <UserGroupIcon className="w-5 h-5 text-primary-400" />
            <h3 className="text-lg font-bold text-white font-outfit uppercase tracking-wider">
              O'qituvchilar
            </h3>
          </div>
          <p className="text-slate-400 text-xs mt-2 ml-1">
            Jami {TeachersAdmins.length} ta xodim topildi
          </p>
        </div>

        <div
          className="space-y-4 pb-24 px-2 custom-scrollbar"
          style={{
            maxHeight: "calc(100vh - 380px)",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch"
          }}
        >
          {TeachersAdmins.map((teacher) => (
            <div
              key={teacher._id}
              className={`backdrop-blur-xl border rounded-[2rem] p-5 shadow-2xl relative overflow-hidden group active:scale-[0.98] transition-all duration-300 ${teacher.role === "admin"
                ? "bg-amber-500/10 border-amber-500/30 shadow-amber-500/5"
                : "bg-[#1e293b]/60 border-white/10 shadow-black/20"
                }`}
            >
              {/* Decorative accent gradient */}
              <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none transition-colors duration-500 ${teacher.role === "admin" ? "bg-amber-500/10 group-hover:bg-amber-500/20" : "bg-primary-500/5 group-hover:bg-primary-500/10"
                }`} />

              <div className="flex justify-between items-start relative z-10 mb-5">
                <div className="flex flex-col gap-1.5 flex-1 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-white tracking-tight font-outfit truncate max-w-[160px]">
                      {teacher.teacherName || teacher.name}
                    </span>
                    <button
                      onClick={() => handleCopy(teacher.teacherName || teacher.name, `name-${teacher._id}`)}
                      className="p-1.5 bg-white/5 rounded-lg text-slate-400 active:bg-white/10 active:text-white transition-all"
                    >
                      {copiedItems[`name-${teacher._id}`] ? <CheckIcon className="w-4 h-4 text-primary-400" /> : <DocumentDuplicateIcon className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400 font-light break-all opacity-80">
                    <span className="truncate">{teacher.teacherEmail || teacher.email}</span>
                    <button
                      onClick={() => handleCopy(teacher.teacherEmail || teacher.email, `email-${teacher._id}`)}
                      className="p-1.5 bg-white/5 rounded-lg text-slate-400 active:bg-white/10 active:text-white transition-all shrink-0"
                    >
                      {copiedItems[`email-${teacher._id}`] ? <CheckIcon className="w-4 h-4 text-primary-400" /> : <DocumentDuplicateIcon className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 relative z-10">
                  <button
                    onClick={() => handleUpdateClick(teacher)}
                    className={`p-2.5 rounded-xl border transition-all shadow-lg active:scale-95 ${teacher.role === "admin"
                      ? "bg-amber-500/10 text-amber-500 border-amber-500/20 opacity-40 grayscale"
                      : "bg-blue-500/10 text-blue-400 border-blue-500/20 active:bg-blue-500 active:text-white"
                      }`}
                    disabled={teacher.role === "admin"}
                  >
                    <PencilSquareIcon className="w-5.5 h-5.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(teacher)}
                    className={`p-2.5 rounded-xl border transition-all shadow-lg active:scale-95 ${teacher.role === "admin"
                      ? "bg-amber-500/10 text-amber-500 border-amber-500/20 opacity-40 grayscale"
                      : "bg-red-500/10 text-red-400 border-red-500/20 active:bg-red-500 active:text-white"
                      }`}
                    disabled={teacher.role === "admin"}
                  >
                    <TrashIcon className="w-5.5 h-5.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-auto pt-4 border-t border-white/5 relative z-10">
                <div className="bg-slate-900/40 p-3 rounded-2xl border border-white/5 transition-all group-hover:bg-slate-900/60">
                  <span className="block text-[10px] text-slate-500 uppercase font-black mb-1.5 tracking-widest">Lavozim</span>
                  <span className={`inline-flex px-2 py-0.5 rounded-lg text-[11px] font-bold border uppercase tracking-tight ${teacher.role === 'admin'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]'
                    : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.1)]'
                    }`}>
                    {teacher.role}
                  </span>
                </div>
                <div className="bg-slate-900/40 p-3 rounded-2xl border border-white/5 transition-all group-hover:bg-slate-900/60">
                  <span className="block text-[10px] text-slate-500 uppercase font-black mb-1.5 tracking-widest">Yo'nalish</span>
                  <span className="text-xs text-white font-bold truncate block tracking-wide">
                    {teacher.role === "admin" ? "Tizim Boshqaruvi" : (teacher.subjects?.[0]?.subjectName || "Biriktirilmagan")}
                  </span>
                </div>
                <div className="col-span-2 bg-slate-900/40 p-3 rounded-2xl border border-white/5 transition-all group-hover:bg-slate-900/60 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Testlar statistikasi</span>
                  {teacher.role === "admin" ? <span className="text-slate-700 font-bold">---</span> : (
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-12 bg-slate-800 rounded-full overflow-hidden shrink-0 border border-white/5">
                        <div className="h-full bg-primary-500 rounded-full" style={{ width: `${Math.min((teacher.subjects?.length || 0) * 10, 100)}%` }} />
                      </div>
                      <span className="text-[11px] font-black text-primary-400 uppercase">
                        {teacher.subjects?.length || 0} ta tuzilgan
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: "rgba(30, 41, 59, 0.95)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "white",
            borderRadius: "24px"
          }
        }}
      >
        <DialogTitle className="text-red-400 font-bold font-outfit text-xl border-b border-white/5 pb-4">
          O'qituvchini o'chirish
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <div className="py-2 space-y-4">
            <p className="text-slate-300">
              <span className="font-semibold text-white">
                {selectedTeacher?.teacherName || selectedTeacher?.name}
              </span>{" "}
              ismli o'qituvchini o'chirmoqchimisiz?
            </p>
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <p className="text-red-400 font-semibold mb-2">
                Diqqat! Agar siz bu o'qituvchini o'chirsangiz:
              </p>
              <ul className="list-disc ml-6 mt-2 text-red-300 space-y-1">
                <li>Uning yaratgan barcha testlari o'chib ketadi</li>
                <li>Biriktirilgan fanlar ham o'chib ketadi</li>
              </ul>
              <p className="mt-4 text-emerald-400 font-medium text-sm">
                Maslahat: Agar o'qituvchini faqat o'zini adminlikdan olmoqchi bo'lsangiz
                shunchaki uning lavozimini o'zgartirib qo'ying.
              </p>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="p-6 pt-2 border-t border-white/5">
          <Button
            onClick={() => setDeleteModalOpen(false)}
            sx={{ color: "#94a3b8", textTransform: "none", fontWeight: 600, "&:hover": { backgroundColor: "rgba(255,255,255,0.05)" } }}
          >
            Bekor qilish
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            sx={{ backgroundColor: "#ef4444", color: "white", textTransform: "none", fontWeight: 600, borderRadius: "8px", "&:hover": { backgroundColor: "#dc2626" } }}
          >
            O'chirish
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Modal */}
      <Dialog
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: "rgba(30, 41, 59, 0.95)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "white",
            borderRadius: "24px"
          }
        }}
      >
        <div className="p-8">
          <p className="text-primary-400 font-bold text-2xl font-outfit border-b border-white/10 pb-4 mb-6">
            O'qituvchi ma'lumotlarini yangilash
          </p>
          <div className="space-y-5">
            <TextField
              label="F.I.Sh"
              fullWidth
              value={updateForm.name}
              onChange={(e) => handleUpdateFormChange("name", e.target.value)}
              variant="outlined"
              size="medium"
              placeholder="O'qituvchining to'liq ismini kiriting"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  borderRadius: "12px",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                  "&:hover fieldset": { borderColor: "rgba(16, 185, 129, 0.5)" },
                  "&.Mui-focused fieldset": { borderColor: "#10b981", borderWidth: "2px" },
                },
                "& .MuiInputLabel-root": { color: "#94a3b8" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#10b981" },
              }}
            />
            <TextField
              label="Email"
              fullWidth
              value={updateForm.email}
              onChange={(e) => handleUpdateFormChange("email", e.target.value)}
              variant="outlined"
              size="medium"
              type="email"
              placeholder="Email manzilini kiriting"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  borderRadius: "12px",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                  "&:hover fieldset": { borderColor: "rgba(16, 185, 129, 0.5)" },
                  "&.Mui-focused fieldset": { borderColor: "#10b981", borderWidth: "2px" },
                },
                "& .MuiInputLabel-root": { color: "#94a3b8" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#10b981" },
              }}
            />
            <TextField
              label="Fan nomi"
              fullWidth
              value={updateForm.subject}
              variant="outlined"
              size="medium"
              InputProps={{ readOnly: true }}
              disabled
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#94a3b8",
                  backgroundColor: "rgba(255,255,255,0.01)",
                  borderRadius: "12px",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.05)" },
                  "&.Mui-disabled fieldset": { borderColor: "rgba(255,255,255,0.05)" },
                  "&.Mui-disabled": { color: "#94a3b8" },
                  "&.Mui-disabled .MuiOutlinedInput-input": { WebkitTextFillColor: "#64748b" }
                },
                "& .MuiInputLabel-root": { color: "#64748b" },
              }}
            />
            <TextField
              label="Yangi parol"
              fullWidth
              value={updateForm.newPassword}
              onChange={(e) => handleUpdateFormChange("newPassword", e.target.value)}
              variant="outlined"
              size="medium"
              type="password"
              placeholder="Yangi parolni kiriting"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  borderRadius: "12px",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                  "&:hover fieldset": { borderColor: "rgba(16, 185, 129, 0.5)" },
                  "&.Mui-focused fieldset": { borderColor: "#10b981", borderWidth: "2px" },
                },
                "& .MuiInputLabel-root": { color: "#94a3b8" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#10b981" },
              }}
            />
            <div className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-5">
              <p className="text-primary-400 font-semibold text-sm mb-3">
                Eslatmalar:
              </p>
              <ul className="text-primary-200 text-sm list-disc pl-5 space-y-1.5 opacity-90">
                <li>Agar yangi parol kiritilmasa, joriy parol o'zgarmaydi</li>
                <li>Email manzil noyob bo&apos;lishi kerak</li>
                <li>Barcha maydonlarni to&apos;ldirish majburiy</li>
              </ul>
            </div>
          </div>
        </div>
        <DialogActions className="p-6 pt-2 border-t border-white/5">
          <Button
            onClick={() => setUpdateModalOpen(false)}
            sx={{ color: "#94a3b8", textTransform: "none", fontWeight: 600, "&:hover": { backgroundColor: "rgba(255,255,255,0.05)" } }}
          >
            Bekor qilish
          </Button>
          <Button
            onClick={handleUpdateConfirm}
            sx={{ backgroundColor: "#10b981", color: "white", textTransform: "none", fontWeight: 600, borderRadius: "8px", "&:hover": { backgroundColor: "#059669" } }}
          >
            Saqlash
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewTeachers;
