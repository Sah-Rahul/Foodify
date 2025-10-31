import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Globe, MapPin, X } from "lucide-react";
import Filters from "./Filters";
import { Link } from "react-router-dom";

const SearchFood = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [loading, setLoading] = useState(false);

  const pizzaRestaurants = [
    {
      _id: "1",
      restaurantName: "Pizza Paradise",
      city: "Mumbai",
      country: "India",
      imageUrl:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
      cuisines: ["Italian", "Pizza", "Fast Food"],
    },
    {
      _id: "2",
      restaurantName: "Margherita Magic",
      city: "Delhi",
      country: "India",
      imageUrl:
        "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&q=80",
      cuisines: ["Italian", "Pizza", "Continental"],
    },
    {
      _id: "3",
      restaurantName: "Cheese Heaven",
      city: "Bangalore",
      country: "India",
      imageUrl:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
      cuisines: ["Pizza", "Italian", "Mexican"],
    },
  ];

  const appliedFilters = ["Pizza", "Italian"];
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div className="w-full md:w-64 ">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="font-semibold text-lg mb-4">Filters</h2>
            <Filters />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-6">
            <Input
              type="text"
              value={searchQuery}
              placeholder="Search by restaurant & cuisines"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Search
            </Button>
          </div>

          <div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
              <h1 className="font-medium text-lg">
                ({pizzaRestaurants.length}) Search result found
              </h1>
              <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                {appliedFilters.map((selectedFilter, idx) => (
                  <div
                    key={idx}
                    className="relative inline-flex items-center max-w-full"
                  >
                    <Badge
                      className="text-orange-600 rounded-md hover:cursor-pointer pr-6 whitespace-nowrap"
                      variant="outline"
                    >
                      {selectedFilter}
                    </Badge>
                    <X
                      size={16}
                      className="absolute text-orange-600 right-1 hover:cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pizzaRestaurants.map((restaurant) => (
                <Card
                  key={restaurant._id}
                  className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="relative">
                    <AspectRatio ratio={16 / 6}>
                      <img
                        src={restaurant.imageUrl}
                        alt={restaurant.restaurantName}
                        className="w-full h-46 object-cover"
                      />
                    </AspectRatio>
                    <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg px-3 py-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Featured
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {restaurant.restaurantName}
                    </h1>
                    <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin size={16} />
                      <p className="text-sm">
                        City:{" "}
                        <span className="font-medium">{restaurant.city}</span>
                      </p>
                    </div>
                    <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                      <Globe size={16} />
                      <p className="text-sm">
                        Country:{" "}
                        <span className="font-medium">
                          {restaurant.country}
                        </span>
                      </p>
                    </div>
                    <div className="flex gap-2 mt-4 flex-wrap">
                      {restaurant.cuisines.map((cuisine, idx) => (
                        <Badge
                          key={idx}
                          className="font-medium px-2 py-1 rounded-full shadow-sm"
                        >
                          {cuisine}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
                    <Link to={`/resturent/${123}`}>
                      <Button className="bg-orange-500 hover:bg-orange-600 font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">
                        View Menus
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFood;
