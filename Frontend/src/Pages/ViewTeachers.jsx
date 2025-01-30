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
      <div className="flex justify-center items-center min-h-[60vh] flex-col gap-4">
        <p className="text-xl text-gray-600">
          Hozircha O&lsquo;qituvchilar yo&apos;q
        </p>
        <p className="text-gray-500">
          Yangi o&apos;qituvchilar qo'shilganda bu yerda ko'rsatiladi
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
                  Testlar soni
                </TableCell>
                <TableCell className="font-bold bg-gray-100">
                  O&apos;chirish
                </TableCell>
                <TableCell className="font-bold bg-gray-100">
                  O&apos;zgartirish
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {TeachersAdmins.map((teacher, index) => (
                <TableRow
                  key={teacher._id}
                  className={`hover:bg-gray-50 ${
                    teacher.role === "admin" ? "bg-yellow-50" : ""
                  }`}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    {teacher.teacherName || teacher.name}
                    <Tooltip
                      title={
                        copiedItems[`name-${teacher._id}`]
                          ? "Nusxalandi!"
                          : "Ismni nusxalash"
                      }
                      arrow
                    >
                      <button
                        onClick={() =>
                          handleCopy(
                            teacher.teacherName || teacher.name,
                            `name-${teacher._id}`
                          )
                        }
                        className="p-1 hover:bg-gray-100 rounded-full"
                      >
                        {copiedItems[`name-${teacher._id}`] ? (
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
                    {teacher.teacherEmail || teacher.email}
                    <Tooltip
                      title={
                        copiedItems[`email-${teacher._id}`]
                          ? "Nusxalandi!"
                          : "Emailni nusxalash"
                      }
                      arrow
                    >
                      <button
                        onClick={() =>
                          handleCopy(
                            teacher.teacherEmail || teacher.email,
                            `email-${teacher._id}`
                          )
                        }
                        className="p-1 hover:bg-gray-100 rounded-full"
                      >
                        {copiedItems[`email-${teacher._id}`] ? (
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
                  <TableCell>{teacher.teacherRole || teacher.role}</TableCell>
                  <TableCell>
                    {teacher.role === "admin"
                      ? "-"
                      : teacher.subjects?.[0]?.subjectName}
                  </TableCell>
                  <TableCell>
                    <div className="w-[70px]">
                      <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full text-sm inline-block w-full text-center">
                        {teacher.role === "admin"
                          ? "-"
                          : `${teacher.subjects?.[0]?.subjectCount || 0} ta`}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Tooltip
                      title={
                        teacher.role === "admin"
                          ? "Adminni o'chirib bo'lmaydi"
                          : "O'chirish"
                      }
                      arrow
                    >
                      <span>
                        <button
                          onClick={() => handleDeleteClick(teacher)}
                          className="p-1 hover:bg-gray-100 rounded-full"
                          disabled={teacher.role === "admin"}
                        >
                          <TrashIcon
                            className={`w-5 h-5 ${
                              teacher.role === "admin"
                                ? "text-gray-300"
                                : "text-red-500"
                            }`}
                          />
                        </button>
                      </span>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip
                      title={
                        teacher.role === "admin"
                          ? "Adminni tahrirlab bo'lmaydi"
                          : "O'zgartirish"
                      }
                      arrow
                    >
                      <span>
                        <button
                          onClick={() => handleUpdateClick(teacher)}
                          className="p-1 hover:bg-gray-100 rounded-full"
                          disabled={teacher.role === "admin"}
                        >
                          <PencilSquareIcon
                            className={`w-5 h-5 ${
                              teacher.role === "admin"
                                ? "text-gray-300"
                                : "text-blue-500"
                            }`}
                          />
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
        <div className="sticky top-0 bg-white z-10 p-4 shadow-sm">
          <div className="font-bold text-gray-800">O'qituvchilar ro'yxati</div>
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
          {TeachersAdmins.map((teacher, index) => (
            <div
              key={teacher._id}
              className={`bg-white rounded-lg shadow-sm p-4 ${
                teacher.role === "admin" ? "bg-yellow-50" : ""
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">
                      {teacher.teacherName || teacher.name}
                    </span>
                    <Tooltip
                      title={
                        copiedItems[`name-${teacher._id}`]
                          ? "Nusxalandi!"
                          : "Ismni nusxalash"
                      }
                      arrow
                    >
                      <button
                        onClick={() =>
                          handleCopy(
                            teacher.teacherName || teacher.name,
                            `name-${teacher._id}`
                          )
                        }
                        className="p-1 hover:bg-gray-100 rounded-full"
                      >
                        {copiedItems[`name-${teacher._id}`] ? (
                          <CheckIcon className="w-4 h-4 text-green-500" />
                        ) : (
                          <DocumentDuplicateIcon className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                    </Tooltip>
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    {teacher.teacherEmail || teacher.email}
                    <Tooltip
                      title={
                        copiedItems[`email-${teacher._id}`]
                          ? "Nusxalandi!"
                          : "Emailni nusxalash"
                      }
                      arrow
                    >
                      <button
                        onClick={() =>
                          handleCopy(
                            teacher.teacherEmail || teacher.email,
                            `email-${teacher._id}`
                          )
                        }
                        className="p-1 hover:bg-gray-100 rounded-full"
                      >
                        {copiedItems[`email-${teacher._id}`] ? (
                          <CheckIcon className="w-4 h-4 text-green-500" />
                        ) : (
                          <DocumentDuplicateIcon className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                    </Tooltip>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      Lavozim: {teacher.role}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-gray-600">
                        Fan:{" "}
                        {teacher.role === "admin"
                          ? "-"
                          : teacher.subjects?.[0]?.subjectName}
                      </div>
                      <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full text-sm">
                        {teacher.role === "admin"
                          ? "-"
                          : `${teacher.subjects?.length || 0} ta test`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Tooltip
                    title={
                      teacher.role === "admin"
                        ? "Adminni tahrirlab bo'lmaydi"
                        : "O'zgartirish"
                    }
                    arrow
                  >
                    <span>
                      <button
                        onClick={() => handleUpdateClick(teacher)}
                        className="p-1 hover:bg-gray-100 rounded-full"
                        disabled={teacher.role === "admin"}
                      >
                        <PencilSquareIcon
                          className={`w-5 h-5 ${
                            teacher.role === "admin"
                              ? "text-gray-300"
                              : "text-blue-500"
                          }`}
                        />
                      </button>
                    </span>
                  </Tooltip>
                  <Tooltip
                    title={
                      teacher.role === "admin"
                        ? "Adminni o'chirib bo'lmaydi"
                        : "O'chirish"
                    }
                    arrow
                  >
                    <span>
                      <button
                        onClick={() => handleDeleteClick(teacher)}
                        className="p-1 hover:bg-gray-100 rounded-full"
                        disabled={teacher.role === "admin"}
                      >
                        <TrashIcon
                          className={`w-5 h-5 ${
                            teacher.role === "admin"
                              ? "text-gray-300"
                              : "text-red-500"
                          }`}
                        />
                      </button>
                    </span>
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
              <span className="font-semibold">
                {selectedTeacher?.teacherName || selectedTeacher?.name}
              </span>{" "}
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
              <p className="mt-3 text-yellow-800 font-medium">
                Maslahat: Agar o'qituvchini faqat o'zini o'chirmoqchi bo'lsangiz
                shunchaki uning lavozimini o'zgartirib qo'ying.
              </p>
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

      {/* Update Modal */}
      <Dialog
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <div className="p-6">
          <p className="text-blue-600 font-bold text-xl border-b pb-3 mb-4">
            O'qituvchi ma'lumotlarini yangilash
          </p>
          <div className="space-y-4">
            <TextField
              label="F.I.Sh"
              fullWidth
              value={updateForm.name}
              onChange={(e) => handleUpdateFormChange("name", e.target.value)}
              variant="outlined"
              size="small"
              placeholder="O'qituvchining to'liq ismini kiriting"
            />
            <TextField
              label="Email"
              fullWidth
              value={updateForm.email}
              onChange={(e) => handleUpdateFormChange("email", e.target.value)}
              variant="outlined"
              size="small"
              type="email"
              placeholder="Email manzilini kiriting"
            />
            <TextField
              label="Fan nomi"
              fullWidth
              value={updateForm.subject}
              variant="outlined"
              size="small"
              InputProps={{
                readOnly: true,
              }}
              disabled
            />
            <TextField
              label="Yangi parol"
              fullWidth
              value={updateForm.newPassword}
              onChange={(e) =>
                handleUpdateFormChange("newPassword", e.target.value)
              }
              variant="outlined"
              size="small"
              type="password"
              placeholder="Yangi parolni kiriting"
            />
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm font-medium mb-2">
                Eslatmalar:
              </p>
              <ul className="text-blue-800 text-sm list-disc pl-4 space-y-1">
                <li>Agar yangi parol kiritilmasa, joriy parol o'zgarmaydi</li>
                <li>Email manzil noyob bo&apos;lishi kerak</li>
                <li>Barcha maydonlarni to&apos;ldirish majburiy</li>
              </ul>
            </div>
          </div>
        </div>
        <DialogActions className="p-4 pt-0">
          <Button
            onClick={() => setUpdateModalOpen(false)}
            variant="outlined"
            color="inherit"
          >
            Bekor qilish
          </Button>
          <Button
            onClick={handleUpdateConfirm}
            variant="contained"
            color="primary"
          >
            Saqlash
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ViewTeachers;
