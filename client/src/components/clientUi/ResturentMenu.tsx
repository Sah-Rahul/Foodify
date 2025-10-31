import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Timer } from "lucide-react";
import MenuList  from "./MenuList";

const RestaurantMenu = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const restaurant = {
    restaurantName: "Pizza Paradise",
    imageUrl:
      "https://images.unsplash.com/photo-1678110707289-ab14382a1625?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=500",
    cuisines: ["Italian", "Pizza", "Fast Food", "Continental"],
    deliveryTime: 30,
    menus: [
      {
        id: "1",
        name: "Margherita Pizza",
        price: 12,
        imageUrl: "https://imgs.search.brave.com/gL9hxxuMkp7WN_xeI7p0HaFtS9kXcLK5xJYvhPWPEYA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/Y3JlYXRlLnZpc3Rh/LmNvbS9hcGkvbWVk/aWEvc21hbGwvNjg1/ODM4Nzg4L3N0b2Nr/LXBob3RvLW1hcmdo/ZXJpdGEtcGl6emEt/YmFzaWwtYmxhY2st/c3RvbmU",
      },
      {
        id: "2",
        name: "Pepperoni Pizza",
        price: 15,
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=699",
      },
      {
        id: "3",
        name: "Veggie Delight",
        price: 13,
        imageUrl: "https://plus.unsplash.com/premium_photo-1673769108488-ac5d1a7aad38?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bW9tb3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
      },
      {
        id: "4",
        name: "Garlic Bread",
        price: 5,
        imageUrl: "https://images.unsplash.com/photo-1652111866933-bfe06583bf89?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNoaWtlbiUyMGZyeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <div className="relative w-full h-32 md:h-64 lg:h-72">
        <img
          src={restaurant.imageUrl}
          alt="restaurant_image"
          className="object-cover w-full h-full rounded-lg shadow-lg"
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between my-5">
        <div>
          <h1 className="font-medium text-xl md:text-2xl lg:text-3xl">
            {restaurant.restaurantName}
          </h1>
          <div className="flex gap-2 my-2 flex-wrap">
            {restaurant.cuisines.map((cuisine, idx) => (
              <Badge
                key={idx}
                className="bg-orange-100 text-orange-600 hover:bg-orange-200"
              >
                {cuisine}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-2 my-5 text-sm md:text-base">
            <Timer className="w-5 h-5 text-orange-500" />
            Delivery Time:{" "}
            <span className="text-orange-600 font-semibold">
              {restaurant.deliveryTime} mins
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Available Menus
        </h2>
        <MenuList menus={restaurant.menus} />
      </div>
    </div>
  );
};

export default RestaurantMenu;
