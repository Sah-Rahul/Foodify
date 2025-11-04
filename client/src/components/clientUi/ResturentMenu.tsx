import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Timer } from "lucide-react";
import MenuList from "./MenuList";
import { useRestaurantStore } from "@/zustand/useRestaurantStore";
import { useParams } from "react-router-dom";
 
const RestaurantMenu = () => {
  const params = useParams();
  const { singleRestaurant, getSingleRestaurant } = useRestaurantStore();

  useEffect(() => {
    getSingleRestaurant(params.id!);
    console.log(singleRestaurant);
  }, [params.id]);

useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <div className="relative w-full h-32 md:h-64 lg:h-72">
        <img
          src={singleRestaurant?.imageUrl}
          alt="restaurant_image"
          className="object-cover w-full h-full rounded-lg shadow-lg"
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between my-5">
        <div>
          <h1 className="font-medium text-xl md:text-2xl lg:text-3xl">
            {singleRestaurant?.restaurantName}
          </h1>
          <div className="flex gap-2 my-2 flex-wrap">
            {singleRestaurant?.cuisines.map((cuisine, idx) => (
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
              {singleRestaurant?.deliveryTime} mins
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Available Menus
        </h2>
        <MenuList menus={singleRestaurant?.menus || []} />
      </div>
    </div>
  );
};

export default RestaurantMenu;
