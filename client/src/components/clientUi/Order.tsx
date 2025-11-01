import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const Order = () => {
  const orderStatus = "Confirmed";
  const orderItems = [
    {
      id: 1,
      name: "Cheese Burst Pizza",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80",
      price: 499,
    },
    {
      id: 2,
      name: "Veggie Burger",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80",
      price: 249,
    },
    {
      id: 3,
      name: "Cold Coffee",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80",
      price: 149,
    },
  ];

  const totalAmount = orderItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 max-w-lg w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
            Order Status:{" "}
            <span className="text-[#FF5A5A]">{orderStatus.toUpperCase()}</span>
          </h1>
        </div>

        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Order Summary
          </h2>

          {orderItems.map((item) => (
            <div key={item.id} className="mb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="flex items-center w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <h3 className="ml-4 text-gray-800 dark:text-gray-200 font-medium text-base sm:text-lg">
                    {item.name}
                  </h3>
                </div>

                <div className="mt-3 sm:mt-0 text-right w-full sm:w-auto">
                  <div className="text-gray-800 dark:text-gray-200 flex items-center justify-end">
                    <span className="text-lg font-semibold ml-1">
                      Rs {item.price}
                    </span>
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
            </div>
          ))}

          <div className="flex justify-between items-center text-gray-800 dark:text-gray-100 font-semibold text-lg mt-6">
            <span>Total:</span>
            <div className="flex items-center">
              <span className="ml-1">Rs{totalAmount}</span>
            </div>
          </div>
        </div>

        <Link to="/cart">
          <Button className="bg-orange hover:bg-hoverOrange w-full py-3 rounded-md shadow-lg text-white text-base font-medium transition-all">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Order;
