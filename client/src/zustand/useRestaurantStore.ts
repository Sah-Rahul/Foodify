import { Orders } from "@/types/orderType";
import { MenuItem, RestaurantState } from "@/types/restaurantType";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_END_POINT = "http://localhost:3000/api/v1/restaurant";

axios.defaults.withCredentials = true;

export const useRestaurantStore = create<RestaurantState>()(
  persist(
    (set, get) => ({
      loading: false,
      restaurant: null,
      searchedRestaurant: null,
      appliedFilter: [],
      singleRestaurant: null,
      restaurantOrder: [],

      // Create restaurant
      createRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          if (response.data.success) {
            toast.success(response.data.message);
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
          set({ loading: false });
        }
      },

      // Get all restaurants
      getRestaurant: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_END_POINT}/`);
          if (response.data.success) {
            set({ restaurant: response.data.restaurant });
          }
        } catch (error: any) {
          if (error?.response?.status === 404) set({ restaurant: null });
        } finally {
          set({ loading: false });
        }
      },

      // Update restaurant
      updateRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.put(`${API_END_POINT}/`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          if (response.data.success) {
            toast.success(response.data.message);
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
          set({ loading: false });
        }
      },

      // Search restaurants
      searchRestaurant: async (
        searchText: string,
        searchQuery: string,
        selectedCuisines: string[]
      ) => {
        try {
          set({ loading: true });
          const params = new URLSearchParams();
          params.set("searchQuery", searchQuery);
          params.set("selectedCuisines", selectedCuisines.join(","));

          const response = await axios.get(
            `${API_END_POINT}/search/${searchText}?${params.toString()}`
          );
          if (response.data.success) {
            set({ searchedRestaurant: response.data });
          }
        } catch (error) {
          console.log(error);
        } finally {
          set({ loading: false });
        }
      },

      // Add menu
      addMenuToRestaurant: (menu: MenuItem) => {
        set((state) => ({
          restaurant: state.restaurant
            ? { ...state.restaurant, menus: [...state.restaurant.menus, menu] }
            : null,
        }));
      },

      // Update menu
      updateMenuToRestaurant: (updatedMenu: MenuItem) => {
        set((state) => {
          if (!state.restaurant) return state;

          const updatedMenus = state.restaurant.menus.map((menu) =>
            menu._id === updatedMenu._id ? updatedMenu : menu
          );
          return {
            restaurant: { ...state.restaurant, menus: updatedMenus },
          };
        });
      },

      // Filters
      setAppliedFilter: (value: string) => {
        set((state) => {
          const isApplied = state.appliedFilter.includes(value);
          return {
            appliedFilter: isApplied
              ? state.appliedFilter.filter((f) => f !== value)
              : [...state.appliedFilter, value],
          };
        });
      },

      resetAppliedFilter: () => set({ appliedFilter: [] }),

      // Single restaurant
      getSingleRestaurant: async (restaurantId: string) => {
        try {
          const response = await axios.get(`${API_END_POINT}/${restaurantId}`);
          if (response.data.success) {
            set({ singleRestaurant: response.data.restaurant });
          }
        } catch (error) {
          console.log(error);
        }
      },

      // Restaurant orders
      getRestaurantOrders: async () => {
        try {
          const response = await axios.get(`${API_END_POINT}/order`);
          if (response.data.success) {
            set({ restaurantOrder: response.data.orders });
          }
        } catch (error) {
          console.log(error);
        }
      },

      updateRestaurantOrder: async (orderId: string, status: string) => {
        try {
          const response = await axios.put(
            `${API_END_POINT}/order/${orderId}/status`,
            { status },
            { headers: { "Content-Type": "application/json" } }
          );
          if (response.data.success) {
            const updatedOrders = get().restaurantOrder.map((order) =>
              order._id === orderId
                ? { ...order, status: response.data.status }
                : order
            );
            set({ restaurantOrder: updatedOrders });
            toast.success(response.data.message);
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Something went wrong");
        }
      },
    }),
    {
      name: "restaurant-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
