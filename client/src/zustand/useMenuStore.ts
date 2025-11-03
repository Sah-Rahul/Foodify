import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useRestaurantStore } from "./useRestaurantStore";

const API_END_POINT = "http://localhost:3000/api/v1/menu";
axios.defaults.withCredentials = true;

type Menu = {
  _id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
};

type MenuState = {
  loading: boolean;
  menu: Menu | null;
  createMenu: (formData: FormData) => Promise<void>;
  editMenu: (menuId: string, formData: FormData) => Promise<void>;
};

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      loading: false,
      menu: null,

      createMenu: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, menu: response.data.menu });

            useRestaurantStore
              .getState()
              .addMenuToRestaurant(response.data.menu);
          } else {
            toast.error("Failed to create menu");
            set({ loading: false });
          }
        } catch (error: any) {
          console.error("Create menu error:", error);
          toast.error(error?.response?.data?.message || "Something went wrong");
          set({ loading: false });
        }
      },

      editMenu: async (menuId: string, formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.put(
            `${API_END_POINT}/${menuId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, menu: response.data.menu });

            useRestaurantStore
              .getState()
              .updateMenuToRestaurant(response.data.menu);
          } else {
            toast.error("Failed to update menu");
            set({ loading: false });
          }
        } catch (error: any) {
          console.error("Edit menu error:", error);
          toast.error(error?.response?.data?.message || "Something went wrong");
          set({ loading: false });
        }
      },
    }),
    {
      name: "menu-storage",  
      storage: createJSONStorage(() => localStorage),
    }
  )
);
