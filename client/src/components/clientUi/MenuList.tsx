import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

interface MenuListProps {
  menus: MenuItem[];
}

const MenuList = ({ menus }: MenuListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {menus.map((menu) => (
        <Card
          key={menu.id}
          className="shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-xl overflow-hidden"
        >
          <CardHeader className="p-0">
            <img
              src={menu.imageUrl}
              alt={menu.name}
              className="w-full h-48 object-cover"
            />
          </CardHeader>

          <CardContent className="flex flex-col gap-2">
            <h3 className="font-semibold text-lg">{menu.name}</h3>
            <p className="text-gray-500 text-sm">
              Delicious and freshly prepared.
            </p>
          </CardContent>

          <CardFooter className="flex justify-between items-center py-4 px-5 bg-gray-50 dark:bg-gray-800">
            <span className="font-bold text-orange-600 text-lg">${menu.price}</span>
            <button className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Add to Cart
            </button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default MenuList;
