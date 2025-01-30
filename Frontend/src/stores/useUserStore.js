import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "../library/axios";

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }, navigate) => {
    set({ loading: true });

    if (password.length < 6) {
      set({ loading: false });
      return toast.error("Parol uzunligi kamida 6 bo'lsin");
    }
    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Parol mos emas ");
    }

    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      set({ user: res.data, loading: false });
      toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz 🎉");
      navigate("/"); // Navigate to homepage
    } catch (error) {
      set({ loading: false });
      const errorMessage =
        error.response?.data?.message || "Xatolik yuz berdi ⚠️";
      toast.error(errorMessage);
    }
  },

  login: async ({ email, password }, navigate) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data, loading: false });
      toast.success("Muvaffaqiyatli tizimga kirdingiz 🎉");
      navigate("/"); // Navigate to homepage
    } catch (error) {
      set({ loading: false });
      const errorMessage =
        error.response?.data?.message || "Xatolik yuz berdi ⚠️";
      toast.error(errorMessage);
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axios.delete("/auth/logout");
      set({ user: null, loading: false });
      toast.success("Muvaffaqiyatli tizimdan chiqdingiz 🎉");
    } catch (error) {
      set({ loading: false });
      const errorMessage =
        error.response?.data?.message || "Xatolik yuz berdi ⚠️";
      toast.error(errorMessage);
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get("/auth/checkauth");
      set({ user: res.data, checkingAuth: false });
    } catch (error) {
      set({ checkingAuth: false });
      const errorMessage =
        error.response?.data?.message || "Xatolik yuz berdi ⚠️";
      toast.error(errorMessage, { id: "auth-error" });
    }
  },
}));
