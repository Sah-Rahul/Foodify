import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { resturentInterface } from "@/types/auth";
import { restaurantSchema } from "@/zodSchema/resturentSchema";
import { useRestaurantStore } from "@/zustand/useRestaurantStore";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const Restaurant = () => {
  const {
    restaurant,
    createRestaurant,
    updateRestaurant,
    getRestaurant,
    loading,
  } = useRestaurantStore();

  const [formData, setFormData] = useState<resturentInterface>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof resturentInterface, string>>
  >({});

  useEffect(() => {
    const fetchRestaurant = async () => {
      const res = await getRestaurant();
      if (res) {
        setFormData({
          restaurantName: res.restaurantName || "",
          city: res.city || "",
          country: res.country || "",
          deliveryTime: res.deliveryTime || 0,
          cuisines: res.cuisines || [],
          imageFile: undefined,
        });
      }
    };
    fetchRestaurant();
  }, [getRestaurant]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const validation = restaurantSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof resturentInterface, string>> = {};
      validation.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof resturentInterface;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const submissionData = new FormData();
    submissionData.append("restaurantName", formData.restaurantName);
    submissionData.append("city", formData.city);
    if (formData.country) {
      submissionData.append("country", formData.country);
    }
    submissionData.append("deliveryTime", String(formData.deliveryTime));
    if (formData.cuisines && formData.cuisines.length > 0) {
      submissionData.append("cuisines", formData.cuisines.join(","));
    }
    if (formData.imageFile) {
      submissionData.append("imageFile", formData.imageFile);
    }

    try {
      if (restaurant) {
        await updateRestaurant(submissionData);
      } else {
        await createRestaurant(submissionData);
      }
    } catch (error) {
      console.error("❌ Restaurant error:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10">
      <h1 className="font-extrabold text-2xl mb-5">
        {restaurant ? "Update Restaurant" : "Add Restaurant"}
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
          <div>
            <Label>Restaurant Name</Label>
            <Input
              name="restaurantName"
              placeholder="Enter restaurant name"
              value={formData.restaurantName}
              onChange={handleChange}
            />
            {errors.restaurantName && (
              <p className="text-red-500 text-sm">{errors.restaurantName}</p>
            )}
          </div>

          <div>
            <Label>City</Label>
            <Input
              name="city"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleChange}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>

          <div>
            <Label>Country</Label>
            <Input
              name="country"
              placeholder="Enter country"
              value={formData.country}
              onChange={handleChange}
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country}</p>
            )}
          </div>

          <div>
            <Label>Delivery Time</Label>
            <Input
              name="deliveryTime"
              type="number"
              placeholder="Enter delivery time (min)"
              value={formData.deliveryTime}
              onChange={handleChange}
            />
            {errors.deliveryTime && (
              <p className="text-red-500 text-sm">{errors.deliveryTime}</p>
            )}
          </div>

          <div>
            <Label>Cuisines</Label>
            <Input
              name="cuisines"
              type="text"
              placeholder="e.g. Momos, Biryani"
              value={formData.cuisines}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cuisines: e.target.value.split(","),
                })
              }
            />
            {errors.cuisines && (
              <p className="text-red-500 text-sm">{errors.cuisines}</p>
            )}
          </div>

          <div>
            <Label>Upload Banner</Label>
            <Input
              type="file"
              accept="image/*"
              name="imageFile"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  imageFile: e.target.files?.[0],
                })
              }
            />
            {errors.imageFile && (
              <p className="text-red-500 text-sm">{errors.imageFile}</p>
            )}
          </div>
        </div>

        <div className="my-5">
          {loading ? (
            <Button
              disabled
              className="bg-orange-500 text-white flex items-center"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-orange-500 cursor-pointer text-white hover:bg-orange-600"
            >
              {restaurant ? "Update Restaurant" : "Add Restaurant"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Restaurant;
