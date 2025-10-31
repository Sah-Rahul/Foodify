import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";
import Checkout from "./Checkout";

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);

  const cart = [
    {
      _id: "1",
      name: "Margherita Pizza",
      price: 12,
      quantity: 2,
      image: "https://source.unsplash.com/100x100/?pizza",
    },
    {
      _id: "2",
      name: "Garlic Bread",
      price: 5,
      quantity: 1,
      image: "https://source.unsplash.com/100x100/?bread",
    },
  ];

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-end mb-4">
        <Button variant="link" className="text-orange-600 hover:text-orange-800">
          Clear All
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Items</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Remove</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {cart.map((item) => (
              <TableRow
                key={item._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <TableCell>
                  <Avatar>
                    <AvatarImage src={item.image} alt={item.name} />
                    <AvatarFallback>{getInitials(item.name)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="whitespace-nowrap">{item.name}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>
                  <div className="flex items-center border rounded-full shadow-md overflow-hidden max-w-[140px]">
                    <Button size="icon" variant="outline" className="bg-gray-200 rounded-none px-2">
                      <Minus />
                    </Button>
                    <div className="px-4 font-bold text-center flex-1">{item.quantity}</div>
                    <Button
                      size="icon"
                      variant="outline"
                      className="bg-orange-500 cursor-pointer hover:bg-orange-600 rounded-none px-2 text-white"
                    >
                      <Plus />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>${item.price * item.quantity}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white"
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow className="text-2xl font-bold">
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell className="text-right">${totalAmount}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <div className="flex justify-end my-5">
        <Button
          onClick={() => setOpen(true)}
          className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white px-6 py-3 rounded-md"
        >
          Proceed To Checkout
        </Button>
      </div>

      <Checkout open={open} setOpen={setOpen} />
    </div>
  );
};

export default Cart;
