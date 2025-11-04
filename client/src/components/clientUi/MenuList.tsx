import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useCartStore } from "@/zustand/useCartStore";

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
};

interface MenuListProps {
  menus: MenuItem[];
}

const MenuList = ({ menus }: MenuListProps) => {
  if (!menus || menus.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 dark:text-gray-400">
          No menus available at this restaurant.
        </p>
      </div>
    );
  }
  const { addToCart } = useCartStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {menus.map((menu: MenuItem) => (
        <Card
          key={menu._id}
          className="shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-xl overflow-hidden"
        >
          <CardHeader className="p-0">
            <img
              src={menu.image}
              alt={menu.name}
              className="w-full h-48 object-cover"
              onError={(e: any) => {
                e.target.src = "/placeholder-food.jpg";
              }}
            />
          </CardHeader>

          <CardContent className="flex flex-col gap-2 p-4">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              {menu.name}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
              {menu.description || "Delicious and freshly prepared."}
            </p>
          </CardContent>

          <CardFooter className="flex justify-between items-center py-4 px-5 bg-gray-50 dark:bg-gray-800">
            <span className="font-bold text-orange-600 text-lg">
              Rs{menu.price}
            </span>
            <button
              onClick={() => addToCart(menu)}
              className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Add to Cart
            </button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default MenuList;
