import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  DocumentDuplicateIcon,
  CheckIcon,
  TrashIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import { useTestsStore } from "../stores/useTestsStore";

const BlockedTeachers = () => {
  const [copiedItems, setCopiedItems] = useState({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const {
    ChangeTeachers,
    getChangeRoleInofos,
    loading,
    deleteSubjectAndTeacher2,
  } = useTestsStore();

  useEffect(() => {
    getChangeRoleInofos();
  }, [getChangeRoleInofos]);

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
      setCopiedItems((prev) => ({ ...prev, [field]: false }));
    }, 2000);
  };

  const handleDeleteClick = (teacher) => {
    setSelectedTeacher(teacher);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteSubjectAndTeacher2(selectedTeacher?._id);
    setDeleteModalOpen(false);
    setSelectedTeacher(null);
  };

  if (!ChangeTeachers || ChangeTeachers.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[40vh] flex-col gap-4 bg-[#1e293b]/40 backdrop-blur-xl border border-white/5 rounded-3xl mt-6 p-8 shadow-xl">
        <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center border border-white/10 mb-2">
          <NoSymbolIcon className="w-8 h-8 text-slate-500" />
        </div>
        <p className="text-xl font-bold text-white font-outfit">
          Hozircha bloklangan o'qituvchilar yo'q
        </p>
        <p className="text-slate-400 text-sm max-w-sm text-center">
          O'qituvchilar bloklanganda bu yerda ko'rsatiladi.
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
                <TableCell sx={{ backgroundColor: "rgba(30, 41, 59, 0.95)", color: "#94a3b8", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>Amal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ChangeTeachers.map((item, index) => (
                <TableRow
                  key={item.teacher._id}
                  hover
                  sx={{
                    transition: "all 0.2s ease-in-out",
                    "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.03) !important" },
                  }}
                >
                  <TableCell sx={{ color: "#cbd5e1", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{index + 1}</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: 500, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div className="flex items-center gap-2">
                      {item.teacher.name}
                      <Tooltip title={copiedItems[`name-${item.teacher._id}`] ? "Nusxalandi!" : "Nusxalash"} arrow>
                        <button
                          onClick={() => handleCopy(item.teacher.name, `name-${item.teacher._id}`)}
                          className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-slate-400 hover:text-white"
                        >
                          {copiedItems[`name-${item.teacher._id}`] ? <CheckIcon className="w-4 h-4 text-primary-400" /> : <DocumentDuplicateIcon className="w-4 h-4" />}
                        </button>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell sx={{ color: "#cbd5e1", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div className="flex items-center gap-2">
                      {item.teacher.email}
                      <Tooltip title={copiedItems[`email-${item.teacher._id}`] ? "Nusxalandi!" : "Nusxalash"} arrow>
                        <button
                          onClick={() => handleCopy(item.teacher.email, `email-${item.teacher._id}`)}
                          className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-slate-400 hover:text-white"
                        >
                          {copiedItems[`email-${item.teacher._id}`] ? <CheckIcon className="w-4 h-4 text-primary-400" /> : <DocumentDuplicateIcon className="w-4 h-4" />}
                        </button>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell sx={{ color: "#cbd5e1", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <span className="px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide uppercase bg-slate-500/20 text-slate-300 border border-slate-500/30">
                      {item.teacher.role}
                    </span>
                  </TableCell>
                  <TableCell sx={{ color: "#cbd5e1", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    {item.subjectName || <span className="text-slate-500 italic">-</span>}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
                    <Tooltip title="O'chirish" arrow>
                      <button
                        onClick={() => handleDeleteClick(item.teacher)}
                        className="p-1.5 hover:bg-red-500/20 rounded-md transition-colors group"
                      >
                        <TrashIcon className="w-5 h-5 text-red-400 group-hover:text-red-300" />
                      </button>
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
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-2xl">
            <NoSymbolIcon className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-bold text-white font-outfit">
              Bloklanganlar
            </h3>
          </div>
          <p className="text-slate-400 text-xs mt-2 ml-1">
            Jami {ChangeTeachers.length} ta o'qituvchi bloklangan
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
          {ChangeTeachers.map((item) => (
            <div
              key={item.teacher._id}
              className="backdrop-blur-xl bg-[#1e293b]/60 border border-white/10 rounded-3xl p-5 shadow-xl relative overflow-hidden group active:scale-[0.98] transition-all duration-200"
            >
              {/* Subtle accent gradient */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 blur-2xl rounded-full -mr-10 -mt-10 group-hover:bg-red-500/10 transition-colors" />

              <div className="flex justify-between items-start relative z-10 mb-5">
                <div className="flex flex-col gap-1.5 flex-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-white tracking-tight font-outfit">
                      {item.teacher.name}
                    </span>
                    <button
                      onClick={() => handleCopy(item.teacher.name, `name-${item.teacher._id}`)}
                      className="p-1.5 bg-white/5 rounded-lg text-slate-400 active:bg-white/10 active:text-white transition-all"
                    >
                      {copiedItems[`name-${item.teacher._id}`] ? <CheckIcon className="w-4 h-4 text-primary-400" /> : <DocumentDuplicateIcon className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400 font-light break-all">
                    {item.teacher.email}
                    <button
                      onClick={() => handleCopy(item.teacher.email, `email-${item.teacher._id}`)}
                      className="p-1.5 bg-white/5 rounded-lg text-slate-400 active:bg-white/10 active:text-white transition-all"
                    >
                      {copiedItems[`email-${item.teacher._id}`] ? <CheckIcon className="w-4 h-4 text-primary-400" /> : <DocumentDuplicateIcon className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteClick(item.teacher)}
                  className="p-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-2xl active:bg-red-500 active:text-white transition-all shadow-lg"
                >
                  <TrashIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-auto pt-4 border-t border-white/5 relative z-10">
                <div className="bg-slate-900/40 p-3 rounded-2xl border border-white/5">
                  <span className="block text-[10px] text-slate-500 uppercase font-bold mb-1 tracking-wider">Lavozim</span>
                  <span className="inline-flex px-2 py-0.5 rounded-lg text-[11px] font-bold bg-slate-500/20 text-slate-300 border border-slate-500/20 uppercase tracking-tight">
                    {item.teacher.role}
                  </span>
                </div>
                <div className="bg-slate-900/40 p-3 rounded-2xl border border-white/5">
                  <span className="block text-[10px] text-slate-500 uppercase font-bold mb-1 tracking-wider">Fan</span>
                  <span className="text-xs text-white font-medium truncate block">
                    {item.subjectName || "Biriktirilmagan"}
                  </span>
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
              <span className="font-semibold text-white">{selectedTeacher?.name}</span>{" "}
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
    </div>
  );
};

export default BlockedTeachers;
