import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "../library/axios";

export const useTestsStore = create((set) => ({
  subject: [],
  loading: false,
  mytests: [],
  Questions: [],
  statistics: null,
  CheckingProccess: [],
  WorkedOn: null,
  TeachersAdmins: [],
  ChangeTeachers: [],
  setProducts: (subject) => set({ subject }),
  setMytests: (Mytests) => set({ Mytests }),

  getSubjects: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/get_tests/tests");

      if (res?.data?.subjects) {
        set({ subject: res.data.subjects, loading: false });
      } else {
        set({ loading: false });
      }
    } catch (error) {
      set({ loading: false });
      console.error("Error fetching subjects:", error);
    }
  },

  getMytests: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/get_tests/getMytest/${id}`);

      if (res?.data?.Mytests) {
        set({ mytests: res.data.Mytests, loading: false });
      } else {
        set({ loading: false });
        toast.error("Testlar topilmadi ⚠️");
      }
    } catch (error) {
      set({ loading: false });
      const errorMessage =
        error.response?.data?.message || "Xatolik yuz berdi ⚠️";
      toast.error(errorMessage);
    }
  },

  deleteTest: async (id) => {
    console.log("O'chirilayotgan Test ID:", id);
    set({ loading: true });
    try {
      const res = await axios.delete(`/teacher/delete_test/${id}`);

      set((PrevState) => ({
        mytests: PrevState.mytests.filter((test) => test._id !== id),
        loading: false,
      }));
      toast.success(res?.data?.message);
    } catch (error) {
      set({ loading: false });
      console.log(error.message);
      const errorMessage =
        error.response?.data?.message || "Xatolik yuz berdi ⚠️";
      toast.error(errorMessage);
    }
  },

  getTestQuestions: async (id) => {
    set({ loading: true });
    try {
      const questions = await axios.get(`/student/get/questions/${id}`);
      if (questions?.data) {
        set({ Questions: questions?.data, loading: false });
      } else {
        set({ loading: false });
        toast.error("Test savollari topilmadi ⚠️");
      }
    } catch (error) {
      set({ loading: false });
      console.log(error.message);
      const errorMessage =
        error.response?.data?.message || "Xatolik yuz berdi ⚠️";
      toast.error(errorMessage);
    }
  },

  getStatistics: async () => {
    set({ loading: false });
    try {
      const statistics = await axios.get("/get/Statistics");
      set({ statistics: statistics?.data, loading: false });
    } catch (error) {
      set({ loading: false });
      console.log(error);
    }
  },

  checkAnswers: async (student_questionsMassive, TestID) => {
    set({ loading: true });
    try {
      const response = await axios.post(`/student/checkAnswers/${TestID}`, {
        student_questionsMassive,
      });
      console.log("Response:", response.data);
      if (response?.data) {
        set({ CheckingProccess: response.data, loading: false });
      } else {
        set({ loading: false });
        toast.error("Javoblarni tekshirishda xatolik yuz berdi ");
      }
    } catch (error) {
      set({ loading: false });
      const errorMessage =
        error.response?.data?.message || "Xatolik yuz berdi ⚠️";
      toast.error(errorMessage);
    }
  },

  createTest: async (testData) => {
    set({ loading: true });
    console.log("Infff:", testData);
    try {
      const res = await axios.post("/teacher/create_test", { testData });
      set((PrevState) => ({
        mytests: [...PrevState.mytests, res.data.data],
        loading: false,
      }));
      toast.success("Test muaffaqiyatli yaratildi 🎉");
    } catch (error) {
      set({ loading: false });
      const errorMessage =
        error.response?.data?.message || "Xatolik yuz berdi ⚠️";
      toast.error(errorMessage);
    }
  },

  MyTestsWorkedOn: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/profile/get_infos_of_profile");
      if (res?.data) {
        set({ WorkedOn: res.data, loading: false });
      } else {
        set({ loading: false });
        toast.error("Ma'lumotlar topilmadi ⚠️");
      }
    } catch (error) {
      set({ loading: false });
      const errorMessage =
        error.response?.data?.message || "Xatolik yuz berdi ⚠️";
      toast.error(errorMessage, { id: "profile" });
    }
  },

  // Only Admin can do it
  createRole: async ({ email, name, role }) => {
    set({ loading: true });
    try {
      await axios.put("/admin/create_role", {
        t_email: email,
        t_name: name,
        role,
      });
      set({ loading: false });
      toast.success("Role muaffaqiyatli o'zgartirildi");
    } catch (error) {
      set({ loading: false });
      const errorMessage =
        error.response?.data?.message || "Xatolik yuz berdi ⚠️";
      toast.error(errorMessage, { id: "role" });
    }
  },

  createSubjects: async ({ teacherName, teacherEmail, subjectName }) => {
    try {
      await axios.post("/admin/create_subject", {
        t_name: teacherName,
        t_email: teacherEmail,
        subject_name: subjectName,
      });

      toast.success("Fan muaffaqiyatli biriktirildi 🎉");
    } catch (error) {
      set({ loading: false });
      const errorMessage =
        error.response?.data?.message || "Xatolik yuz berdi ⚠️";
      toast.error(errorMessage, { id: "subject_create" });
    }
  },

  getAllTeacherAndAdmin: async () => {
    set({ loading: false });
    try {
      const response = await axios.get(`/admin/getAllTeachers`);
      set({ TeachersAdmins: response?.data, loading: false });
    } catch (error) {
      set({ loading: false });
      const errorMessage =
        error.response?.data?.message || "Xatolik yuz berdi ⚠️";
      toast.error(errorMessage, { id: "getAllteacher" });
    }
  },

  deleteSubjectAndTeacher: async (id) => {
    set({ loading: false });
    try {
      await axios.delete(`/admin/delete_teacher/${id}`);
      set((Prev) => ({
        TeachersAdmins: Prev.TeachersAdmins.filter((each) => each._id !== id),

        loading: false,
      }));
      toast.success("O'qituvchi muaffaqiyatli o'chirildi 🎉");
    } catch (error) {
      set({ loading: false });
      const errorMessage =
        error.response?.data?.message || "Xatolik yuz berdi ⚠️";
      toast.error(errorMessage, { id: "deleteteacher" });
    }
  },

  deleteSubjectAndTeacher2: async (id) => {
    set({ loading: false });
    try {
      await axios.delete(`/admin/delete_teacher/${id}`);
      set((Prev) => ({
        ChangeTeachers: Prev.ChangeTeachers.filter(
          (each) => each.teacher._id !== id
        ),

        loading: false,
      }));
      toast.success("O'qituvchi muaffaqiyatli o'chirildi 🎉");
    } catch (error) {
      set({ loading: false });
      const errorMessage =
        error.response?.data?.message || "Xatolik yuz berdi ⚠️";
      toast.error(errorMessage, { id: "deleteteacher" });
    }
  },

  updateInfosOfTeachers: async ({ id, name, email, newPassword }) => {
    set({ loading: false });
    try {
      if (newPassword.length > 0 && newPassword.length < 6)
        return toast.error(
          "Parol uzunligi kamida 6 ta belgidan iborat bo‘ishi kerak!"
        );
      await axios.put(`/admin/change_info/${id}`, {
        name,
        email,
        password: newPassword,
      });
      set({ loading: false });
      toast.success("Ma'lumotlar yangilandi.Iltimos sahifani yangilang ‼️");
    } catch (error) {
      set({ loading: false });
      const errorMessage =
        error.response?.data?.message || "Xatolik yuz berdi ⚠️";
      toast.error(errorMessage, { id: "Updateteacher" });
    }
  },

  getChangeRoleInofos: async () => {
    set({ loading: false });
    try {
      const response = await axios.get(`/admin/changed_with_role_teachers`);

      set({ ChangeTeachers: response?.data, loading: false });
    } catch (error) {
      set({ loading: false });
      const errorMessage =
        error.response?.data?.message || "Xatolik yuz berdi ⚠️";
      toast.error(errorMessage, { id: "getAllteacher" });
    }
  },
}));
