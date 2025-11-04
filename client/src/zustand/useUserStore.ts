import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import type { LoginInterface, SignupInterface } from "@/types/auth";
import { toast } from "sonner";

const API_END_POINT = "http://localhost:3000/api/v1/user";
axios.defaults.withCredentials = true;

type User = {
  fullname: string;
  email: string;
  contact: number;
  address: string;
  city: string;
  country: string;
  profilePicture: string;
  admin: boolean;
  isVerified: boolean;
};

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  signup: (input: SignupInterface) => Promise<void>;
  login: (input: LoginInterface) => Promise<void>;
  verifyEmail: (verificationCode: string) => Promise<void>;
  checkAuthentication: () => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (input: any) => Promise<void>;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,

      signup: async (signupData) => {
        try {
          set({ loading: true });
          const { data } = await axios.post(
            `${API_END_POINT}/signup`,
            signupData,
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          if (data.success) {
            toast.success(data.message);
            set({
              loading: false,
              user: data.user,
              isAuthenticated: true,
            });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Signup failed");
          set({ loading: false });
        }
      },

      login: async (input) => {
        try {
          set({ loading: true });
          const { data } = await axios.post(`${API_END_POINT}/login`, input, {
            headers: { "Content-Type": "application/json" },
          });

          if (data.success) {
            toast.success(data.message);
            set({
              loading: false,
              user: data.user,
              isAuthenticated: true,
            });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Login failed");
          set({ loading: false });
        }
      },

      verifyEmail: async (verificationCode) => {
        try {
          set({ loading: true });
          const { data } = await axios.post(
            `${API_END_POINT}/verify-email`,
            { verificationCode },
            { headers: { "Content-Type": "application/json" } }
          );

          if (data.success) {
            toast.success(data.message);
            set({
              loading: false,
              user: data.user,
              isAuthenticated: true,
            });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Verification failed");
          set({ loading: false });
        }
      },

      checkAuthentication: async () => {
        try {
          set({ isCheckingAuth: true });
          const { data } = await axios.get(`${API_END_POINT}/check-auth`);

          if (data.success) {
            set({
              user: data.user,
              isAuthenticated: true,
              isCheckingAuth: false,
            });
          } else {
            set({ isAuthenticated: false, isCheckingAuth: false });
          }
        } catch {
          set({ isAuthenticated: false, isCheckingAuth: false });
        }
      },

      logout: async () => {
        try {
          set({ loading: true });
          const { data } = await axios.post(`${API_END_POINT}/logout`);

          if (data.success) {
            toast.success(data.message);
            set({
              loading: false,
              user: null,
              isAuthenticated: false,
            });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Logout failed");
          set({ loading: false });
        }
      },

      forgotPassword: async (email) => {
        try {
          set({ loading: true });
          const { data } = await axios.post(
            `${API_END_POINT}/forgot-password`,
            { email }
          );

          if (data.success) {
            toast.success(data.message);
          }
        } catch (error: any) {
          toast.error(
            error.response?.data?.message || "Failed to send reset link"
          );
        } finally {
          set({ loading: false });
        }
      },

      resetPassword: async (token, newPassword) => {
        try {
          set({ loading: true });
          const { data } = await axios.post(
            `${API_END_POINT}/reset-password/${token}`,
            { newPassword }
          );

          if (data.success) {
            toast.success(data.message);
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Password reset failed");
        } finally {
          set({ loading: false });
        }
      },

      updateProfile: async (input: any) => {
        try {
          set({ loading: true });

          // ✅ Log to debug
          console.log("Updating profile with:", input);

          const { data } = await axios.put(
            `${API_END_POINT}/update-profile`,
            input,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (data.success) {
            toast.success(data.message);
            set({ user: data.user, isAuthenticated: true });
          }
        } catch (error: any) {
          console.error("Update error:", error);
          toast.error(error.response?.data?.message || "Profile update failed");
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
