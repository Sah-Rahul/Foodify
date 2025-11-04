import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Globe, MapPin, X, Loader2 } from "lucide-react";
import Filters from "./Filters";
import { Link, useParams } from "react-router-dom";
import { useRestaurantStore } from "@/zustand/useRestaurantStore";

const SearchFood = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const {
    loading,
    searchedRestaurant,
    searchRestaurant,
    appliedFilter,
    setAppliedFilter,
    resetAppliedFilter,
  } = useRestaurantStore();

  const restaurants = searchedRestaurant?.data || [];

   
  useEffect(() => {
    if (params.searchText) {
      searchRestaurant(params.searchText, searchQuery, appliedFilter);
    }
  }, [appliedFilter, params.searchText]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

 
  const handleRemoveFilter = (filter: string) => {
    setAppliedFilter(filter);
  };

   
  const handleSearchClick = () => {
    if (params.searchText) {
      searchRestaurant(params.searchText, searchQuery, appliedFilter);
    }
  };

 
  const handleResetFilters = () => {
    resetAppliedFilter();
    if (params.searchText) {
      searchRestaurant(params.searchText, searchQuery, []);
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <div className="flex flex-col md:flex-row justify-between gap-10">
       
        <div className="w-full md:w-64">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md sticky top-20">
            <h2 className="font-semibold text-lg mb-4">Filters</h2>
            <Filters />
            {appliedFilter.length > 0 && (
              <Button
                variant="outline"
                className="mt-4 w-full text-orange-600 border-orange-600 hover:bg-orange-50"
                onClick={handleResetFilters}
              >
                Reset All Filters
              </Button>
            )}
          </div>
        </div>

        
        <div className="flex-1">
          
          <div className="flex items-center gap-2 mb-6">
            <Input
              type="text"
              value={searchQuery}
              placeholder="Search by restaurant & cuisines"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearchClick();
              }}
              className="flex-1"
            />
            <Button
              onClick={handleSearchClick}
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                "Search"
              )}
            </Button>
          </div>

           
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
            <h1 className="font-medium text-lg text-gray-700 dark:text-gray-200">
              ({restaurants.length}) Search result{restaurants.length !== 1 ? "s" : ""} found
            </h1>
            
            {appliedFilter.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {appliedFilter.map((filter, idx) => (
                  <div key={idx} className="relative inline-flex items-center">
                    <Badge
                      className="text-orange-600 rounded-md hover:cursor-pointer pr-6 whitespace-nowrap border-orange-600"
                      variant="outline"
                    >
                      {filter}
                    </Badge>
                    <X
                      onClick={() => handleRemoveFilter(filter)}
                      size={16}
                      className="absolute text-orange-600 right-1 hover:cursor-pointer hover:bg-orange-100 rounded-full"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
            </div>
          ) : restaurants.length === 0 ? (
           
            <NoResultFound
              searchText={params.searchText || ""}
              hasFilters={appliedFilter.length > 0}
              onResetFilters={handleResetFilters}
            />
          ) : (
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {restaurants.map((restaurant: any) => (
                <Card
                  key={restaurant._id}
                  className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  
                  <div className="relative">
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={restaurant.imageUrl || "/placeholder-restaurant.jpg"}
                        alt={restaurant.restaurantName}
                        className="w-full h-full object-cover"
                        onError={(e: any) => {
                          e.target.src = "/placeholder-restaurant.jpg";
                        }}
                      />
                    </AspectRatio>
                    <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-90 rounded-lg px-3 py-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Featured
                      </span>
                    </div>
                  </div>

                  
                  <CardContent className="p-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 line-clamp-1">
                      {restaurant.restaurantName}
                    </h1>
                    <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin size={16} />
                      <p className="text-sm">
                        City: <span className="font-medium">{restaurant.city}</span>
                      </p>
                    </div>
                    <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                      <Globe size={16} />
                      <p className="text-sm">
                        Country: <span className="font-medium">{restaurant.country}</span>
                      </p>
                    </div>
                    <div className="flex gap-2 mt-4 flex-wrap">
                      {restaurant.cuisines.map((cuisine: string, idx: number) => (
                        <Badge
                          key={idx}
                          className="font-medium px-2 py-1 rounded-full shadow-sm bg-orange-100 text-orange-700 hover:bg-orange-200"
                        >
                          {cuisine}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                 
                  <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 flex justify-end">
                    <Link to={`/resturent/${restaurant._id}`}>
                      <Button className="bg-orange-500 hover:bg-orange-600 font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">
                        View Menus
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFood;

const NoResultFound = ({ 
  searchText, 
  hasFilters, 
  onResetFilters 
}: { 
  searchText: string; 
  hasFilters: boolean;
  onResetFilters: () => void;
}) => {
  return (
    <div className="text-center py-20">
      <div className="mb-4">
        <svg
          className="mx-auto h-24 w-24 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
        No restaurants found
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400 mb-6">
        {hasFilters ? (
          <>
            No restaurants match your search and filters for "{searchText}".
            <br />
            Try removing some filters or search with a different term.
          </>
        ) : (
          <>
            We couldn't find any restaurants for "{searchText}".
            <br />
            Try searching with a different term.
          </>
        )}
      </p>
      <div className="flex gap-3 justify-center">
        {hasFilters && (
          <Button
            onClick={onResetFilters}
            variant="outline"
            className="text-orange-600 border-orange-600 hover:bg-orange-50"
          >
            Reset Filters
          </Button>
        )}
        <Link to="/">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Go Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};