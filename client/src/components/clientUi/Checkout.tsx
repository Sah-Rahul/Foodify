import { useState } from "react";
import type { FormEvent, Dispatch, SetStateAction } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

import { useUserStore } from "@/zustand/useUserStore";
import { useCartStore } from "@/zustand/useCartStore";
import { useRestaurantStore } from "@/zustand/useRestaurantStore";
import { useOrderStore } from "@/zustand/useOrderStore";
import type { CheckoutSessionRequest } from "@/types/orderType";

const Checkout = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useUserStore();
  const { cart } = useCartStore();
  const { restaurant } = useRestaurantStore();
  const { createCheckoutSession, loading } = useOrderStore();

  const [input, setInput] = useState({
    name: user?.fullname || "",
    email: user?.email || "",
    contact: user?.contact?.toString() || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const checkoutData: CheckoutSessionRequest = {
        cartItems: cart.map((item) => ({
          menuId: item._id,
          name: item.name,
          image: item.image,
          price: item.price.toString(),
          quantity: item.quantity.toString(),
        })),
        deliveryDetails: input,
        restaurantId: restaurant?._id as string,
      };

      await createCheckoutSession(checkoutData);
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg w-full p-6 sm:p-8">
        <DialogTitle className="font-semibold text-lg sm:text-xl mb-2">
          Review Your Order
        </DialogTitle>
        <DialogDescription className="text-sm sm:text-base mb-6 text-gray-600 dark:text-gray-400">
          Double-check your delivery details and ensure everything is correct.
          When ready, hit confirm to proceed to payment.
        </DialogDescription>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          noValidate
        >
          <div>
            <Label htmlFor="name">Fullname</Label>
            <Input
              id="name"
              type="text"
              name="name"
              value={input.name}
              onChange={handleChange}
              placeholder="Enter full name"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={input.email}
              disabled
              className="cursor-not-allowed bg-gray-100"
            />
          </div>

          <div>
            <Label htmlFor="contact">Contact</Label>
            <Input
              id="contact"
              type="text"
              name="contact"
              value={input.contact}
              onChange={handleChange}
              placeholder="Phone number"
            />
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              type="text"
              name="address"
              value={input.address}
              onChange={handleChange}
              placeholder="Delivery address"
            />
          </div>

          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              type="text"
              name="city"
              value={input.city}
              onChange={handleChange}
              placeholder="City"
            />
          </div>

          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              type="text"
              name="country"
              value={input.country}
              onChange={handleChange}
              placeholder="Country"
            />
          </div>

          <DialogFooter className="col-span-1 sm:col-span-2 pt-6 flex justify-end">
            {loading ? (
              <Button disabled className="bg-orange-500 hover:bg-orange-600">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md"
              >
                Continue To Payment
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Checkout;
