import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { resturentInterface } from "@/types/auth";
import { restaurantSchema } from "@/zodSchema/resturentSchema";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const Restaurant = () => {
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<
    Partial<Record<keyof resturentInterface, string>>
  >({});

  const [formData, setFormData] = useState<resturentInterface>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const validation = restaurantSchema.safeParse(formData);

    if (!validation.success) {
      setLoading(false);

      const fieldErrors: Partial<Record<keyof resturentInterface, string>> = {};
      validation.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof resturentInterface;
        fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    console.log("✅ Valid Form Data:", validation.data);
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto my-10">
      <h1 className="font-extrabold text-2xl mb-5">Add Restaurants</h1>

      <form onSubmit={handleSubmit}>
        <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
          <div>
            <Label className="mb-2">Restaurant Name</Label>
            <Input
              name="restaurantName"
              type="text"
              placeholder="Enter your restaurant name"
              value={formData.restaurantName}
              onChange={handleChange}
            />
            {errors.restaurantName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.restaurantName}
              </p>
            )}
          </div>

          <div>
            <Label className="mb-2">City</Label>
            <Input
              name="city"
              type="text"
              placeholder="Enter your city name"
              value={formData.city}
              onChange={handleChange}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          <div>
            <Label className="mb-2">Country</Label>
            <Input
              name="country"
              type="text"
              placeholder="Enter your country name"
              value={formData.country}
              onChange={handleChange}
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>

          <div>
            <Label className="mb-2">Delivery Time</Label>
            <Input
              name="deliveryTime"
              type="number"
              placeholder="Enter your delivery time"
              value={formData.deliveryTime}
              onChange={handleChange}
            />
            {errors.deliveryTime && (
              <p className="text-red-500 text-sm mt-1">{errors.deliveryTime}</p>
            )}
          </div>
          <div>
            <Label className="mb-2">Cuisines</Label>
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
              <p className="text-red-500 text-sm mt-1">{errors.cuisines}</p>
            )}
          </div>
          <div>
            <Label className="mb-2">Upload Restaurant Banner</Label>
            <Input
              type="file"
              accept="image/*"
              name="imageFile"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  imageFile: e.target.files ? e.target.files[0] : undefined,
                })
              }
            />
            {errors.imageFile && (
              <p className="text-red-500 text-sm mt-1">{errors.imageFile}</p>
            )}
          </div>
        </div>

        <div className="my-5">
          {loading ? (
            <Button
              disabled
              className="bg-orange-500 text-white px-6 py-3 rounded-md flex items-center"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-orange-500 cursor-pointer text-white px-6 py-3 rounded-md hover:bg-orange-600"
            >
              Add Your Restaurant
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Restaurant;
