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
} from "@heroicons/react/24/outline";
import { useTestsStore } from "../stores/useTestsStore";
import { PropagateLoader } from "react-spinners";

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
      <div className="flex justify-center items-center h-screen">
        <PropagateLoader color="#0e0da2" size={15} />
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
    deleteSubjectAndTeacher2(selectedTeacher?._id);
    setDeleteModalOpen(false);
    setSelectedTeacher(null);
  };
  console.log("ChangeTeachers:", ChangeTeachers);
  if (!ChangeTeachers || ChangeTeachers.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] flex-col gap-4">
        <p className="text-xl text-gray-600">
          Hozircha bloklangan o&apos;qituvchilar yo&apos;q
        </p>
        <p className="text-gray-500">
          O&apos;qituvchilar bloklanganda bu yerda ko&apos;rsatiladi
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop version */}
      <div className="hidden md:block">
        <TableContainer
          component={Paper}
          className="mt-4"
          sx={{
            maxHeight: "calc(100vh - 200px)",
            "& .MuiTableContainer-root": {
              overflow: "auto",
            },
            "&::-webkit-scrollbar": {
              width: "8px",
              height: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className="font-bold bg-gray-100">№</TableCell>
                <TableCell className="font-bold bg-gray-100">Ism</TableCell>
                <TableCell className="font-bold bg-gray-100">Email</TableCell>
                <TableCell className="font-bold bg-gray-100">Lavozim</TableCell>
                <TableCell className="font-bold bg-gray-100">
                  Fan nomi
                </TableCell>
                <TableCell className="font-bold bg-gray-100">
                  O'chirish
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ChangeTeachers.map((item, index) => (
                <TableRow key={item.teacher._id} className="hover:bg-gray-50">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    {item.teacher.name}
                    <Tooltip
                      title={
                        copiedItems[`name-${item.teacher._id}`]
                          ? "Nusxalandi!"
                          : "Ismni nusxalash"
                      }
                      arrow
                    >
                      <button
                        onClick={() =>
                          handleCopy(
                            item.teacher.name,
                            `name-${item.teacher._id}`
                          )
                        }
                        className="p-1 hover:bg-gray-100 rounded-full"
                      >
                        {copiedItems[`name-${item.teacher._id}`] ? (
                          <div className="relative w-4 h-4">
                            <CheckIcon className="absolute top-0 left-0 w-4 h-4 text-green-500" />
                            <CheckIcon className="absolute top-0.5 left-0.5 w-4 h-4 text-green-500" />
                          </div>
                        ) : (
                          <DocumentDuplicateIcon className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    {item.teacher.email}
                    <Tooltip
                      title={
                        copiedItems[`email-${item.teacher._id}`]
                          ? "Nusxalandi!"
                          : "Emailni nusxalash"
                      }
                      arrow
                    >
                      <button
                        onClick={() =>
                          handleCopy(
                            item.teacher.email,
                            `email-${item.teacher._id}`
                          )
                        }
                        className="p-1 hover:bg-gray-100 rounded-full"
                      >
                        {copiedItems[`email-${item.teacher._id}`] ? (
                          <div className="relative w-4 h-4">
                            <CheckIcon className="absolute top-0 left-0 w-4 h-4 text-green-500" />
                            <CheckIcon className="absolute top-0.5 left-0.5 w-4 h-4 text-green-500" />
                          </div>
                        ) : (
                          <DocumentDuplicateIcon className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{item.teacher.role}</TableCell>
                  <TableCell>{item.subjectName || "-"}</TableCell>
                  <TableCell>
                    <Tooltip title="O'chirish" arrow>
                      <button
                        onClick={() => handleDeleteClick(item.teacher)}
                        className="p-1 hover:bg-gray-100 rounded-full"
                      >
                        <TrashIcon className="w-5 h-5 text-red-500" />
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
        <div className="sticky top-0 bg-white z-10 p-4 shadow-sm">
          <div className="font-bold text-gray-800">
            Bloklangan o'qituvchilar ro'yxati
          </div>
        </div>
        <div
          className="space-y-4 p-4"
          style={{
            maxHeight: "calc(100vh - 100px)",
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#888 #f1f1f1",
          }}
        >
          {ChangeTeachers.map((item, index) => (
            <div
              key={item.teacher._id}
              className="bg-white rounded-lg shadow-sm p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{item.teacher.name}</span>
                    <Tooltip
                      title={
                        copiedItems[`name-${item.teacher._id}`]
                          ? "Nusxalandi!"
                          : "Ismni nusxalash"
                      }
                      arrow
                    >
                      <button
                        onClick={() =>
                          handleCopy(
                            item.teacher.name,
                            `name-${item.teacher._id}`
                          )
                        }
                        className="p-1 hover:bg-gray-100 rounded-full"
                      >
                        {copiedItems[`name-${item.teacher._id}`] ? (
                          <CheckIcon className="w-4 h-4 text-green-500" />
                        ) : (
                          <DocumentDuplicateIcon className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                    </Tooltip>
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    {item.teacher.email}
                    <Tooltip
                      title={
                        copiedItems[`email-${item.teacher._id}`]
                          ? "Nusxalandi!"
                          : "Emailni nusxalash"
                      }
                      arrow
                    >
                      <button
                        onClick={() =>
                          handleCopy(
                            item.teacher.email,
                            `email-${item.teacher._id}`
                          )
                        }
                        className="p-1 hover:bg-gray-100 rounded-full"
                      >
                        {copiedItems[`email-${item.teacher._id}`] ? (
                          <CheckIcon className="w-4 h-4 text-green-500" />
                        ) : (
                          <DocumentDuplicateIcon className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                    </Tooltip>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      Lavozim: {item.teacher.role}
                    </div>
                    <div className="text-sm text-gray-600">
                      Fan: {item.subjectName || "-"}
                    </div>
                  </div>
                </div>
                <div>
                  <Tooltip title="O'chirish" arrow>
                    <button
                      onClick={() => handleDeleteClick(item.teacher)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <TrashIcon className="w-5 h-5 text-red-500" />
                    </button>
                  </Tooltip>
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
      >
        <DialogTitle className="text-red-600 font-bold">
          O'qituvchini o'chirish
        </DialogTitle>
        <DialogContent>
          <div className="py-4 space-y-4">
            <p className="text-gray-800">
              <span className="font-semibold">{selectedTeacher?.name}</span>{" "}
              ismli o'qituvchini o'chirmoqchimisiz?
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800">
                Diqqat! Agar siz bu o'qituvchini o'chirsangiz:
              </p>
              <ul className="list-disc ml-6 mt-2 text-yellow-800">
                <li>Uning yaratgan barcha testlari o'chib ketadi</li>
                <li>Biriktirilgan fanlar ham o'chib ketadi</li>
              </ul>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="p-4 pt-0">
          <Button
            onClick={() => setDeleteModalOpen(false)}
            variant="outlined"
            color="inherit"
          >
            Bekor qilish
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
          >
            O'chirish
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BlockedTeachers;
