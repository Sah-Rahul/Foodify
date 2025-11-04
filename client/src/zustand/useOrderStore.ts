import type { CheckoutSessionRequest, OrderState } from "@/types/orderType";
import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const API_END_POINT = "https://food-app-yt.onrender.com/api/v1/order";

axios.defaults.withCredentials = true;

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      loading: false,
      orders: [],

      createCheckoutSession: async (
        checkoutSession: CheckoutSessionRequest
      ) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/checkout/create-checkout-session`,
            checkoutSession,
            {
              headers: {
                "Content-Type": "application/json",
              },
                withCredentials: true,
            }
          );
          console.log("📡 API endpoint:", `${API_END_POINT}/checkout/create-checkout-session`);


          //   if (response?.data?.session?.url) {
          //     window.location.href = response.data.session.url;
          //   }

          if (response?.data?.sessionUrl) {
            window.location.href = response.data.sessionUrl;
          }

          set({ loading: false });
        } catch (error) {
          console.error("Error creating checkout session:", error);
          set({ loading: false });
        }
      },

      getOrderDetails: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_END_POINT}/`);
          set({
            loading: false,
            orders: response.data?.orders || [],
          });
        } catch (error) {
          console.error("Error fetching order details:", error);
          set({ loading: false });
        }
      },
    }),
    
    {
      name: "order-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
