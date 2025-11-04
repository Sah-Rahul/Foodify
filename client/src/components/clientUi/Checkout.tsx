import { useState, type Dispatch, type SetStateAction } from "react";
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
import { useUserStore } from "@/zustand/useUserStore";

const Checkout = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {

  const { user } = useUserStore();
  const [input, setInput] = useState({
    name: user?.fullname || "",
    email: user?.email || " ",
    contact: user?.contact || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
  });

  const handlerEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form values:", input);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg w-full p-6 sm:p-8">
        <DialogTitle className="font-semibold text-lg sm:text-xl mb-2">
          Review Your Order
        </DialogTitle>
        <DialogDescription className="text-sm sm:text-base mb-6 text-gray-600 dark:text-gray-400">
          Double-check your delivery details and ensure everything is in order.
          When you are ready, hit confirm button to finalize your order.
        </DialogDescription>

        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          noValidate
          onSubmit={handleSubmit}
        >
          <div>
            <Label className="mb-2" htmlFor="name">
              Fullname
            </Label>
            <Input
              id="name"
              type="text"
              name="name"
              value={input.name}
              onChange={handlerEvent}
              placeholder="Enter full name"
            />
          </div>

          <div>
            <Label className="mb-2" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              disabled
              value={input.email}
              className="cursor-not-allowed bg-gray-100"
              aria-readonly="true"
              onChange={handlerEvent}
            />
          </div>

          <div>
            <Label className="mb-2" htmlFor="contact">
              Contact
            </Label>
            <Input
              id="contact"
              type="number"
              name="contact"
              value={input.contact}
              onChange={handlerEvent}
              placeholder="Phone number"
            />
          </div>

          <div>
            <Label className="mb-2" htmlFor="address">
              Address
            </Label>
            <Input
              id="address"
              type="text"
              name="address"
              value={input.address}
              onChange={handlerEvent}
              placeholder="Delivery address"
            />
          </div>

          <div>
            <Label className="mb-2" htmlFor="city">
              City
            </Label>
            <Input
              id="city"
              type="text"
              name="city"
              value={input.city}
              onChange={handlerEvent}
              placeholder="City"
            />
          </div>

          <div>
            <Label className="mb-2" htmlFor="country">
              Country
            </Label>
            <Input
              id="country"
              type="text"
              name="country"
              value={input.country}
              onChange={handlerEvent}
              placeholder="Country"
            />
          </div>

          <DialogFooter className="col-span-1 sm:col-span-2 pt-6 flex justify-end">
            <Button
              type="submit"
              className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md"
            >
              Continue To Payment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Checkout;
