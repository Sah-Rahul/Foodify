import {
  Mail,
  LocateIcon,
  MapPin,
  MapPinnedIcon,
  Plus,
  Loader2,
} from "lucide-react";
import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUserStore } from "@/zustand/useUserStore";

const Profile = () => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const { user, updateProfile, loading } = useUserStore();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
    email: user?.email || "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        console.log("Image selected, base64 length:", result.length);
        setSelectedImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updateData: any = {
        fullname: input.fullname,
        email: input.email,
        address: input.address,
        city: input.city,
        country: input.country,
      };

      if (selectedImage) {
        updateData.profilePicture = selectedImage;
        console.log("Sending profile picture update");
      }

      console.log("Submitting update:", {
        ...updateData,
        profilePicture: updateData.profilePicture ? "BASE64_STRING" : "none",
      });

      await updateProfile(updateData);

      setSelectedImage("");
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-7xl mx-auto px-6 md:px-14 py-10"
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="relative w-24 h-24 md:w-28 md:h-28">
            <AvatarImage
              src={selectedImage || user?.profilePicture || ""}
              alt={user?.fullname || "User"}
            />
            <AvatarFallback className="text-2xl font-bold bg-orange-500 text-white">
              {user?.fullname?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>

            <input
              ref={imageRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <div
              onClick={() => imageRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/50 rounded-full cursor-pointer transition"
            >
              <Plus className="text-white w-6 h-6" />
            </div>
          </Avatar>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {user?.fullname || "User Name"}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user?.email}
            </p>
            {selectedImage && (
              <p className="text-xs text-green-600 mt-1">
                ✓ New image selected
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="flex items-center gap-3 rounded-md p-3 bg-gray-100 dark:bg-gray-800">
          <Mail className="text-gray-500" />
          <div className="w-full">
            <Label className="text-sm text-gray-600 dark:text-gray-400">
              Full Name
            </Label>
            <input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full bg-transparent text-gray-900 dark:text-gray-100 outline-none border-none focus:ring-0 mt-1"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-md p-3 bg-gray-100 dark:bg-gray-800">
          <Mail className="text-gray-500" />
          <div className="w-full">
            <Label className="text-sm text-gray-600 dark:text-gray-400">
              Email
            </Label>
            <input
              type="email"
              name="email"
              value={input.email}
              disabled
              placeholder="you@example.com"
              className="w-full bg-transparent text-gray-600 dark:text-gray-400 outline-none border-none focus:ring-0 mt-1 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-md p-3 bg-gray-100 dark:bg-gray-800">
          <LocateIcon className="text-gray-500" />
          <div className="w-full">
            <Label className="text-sm text-gray-600 dark:text-gray-400">
              Address
            </Label>
            <input
              type="text"
              name="address"
              value={input.address}
              onChange={handleInputChange}
              placeholder="123 Main Street"
              className="w-full bg-transparent text-gray-900 dark:text-gray-100 outline-none border-none focus:ring-0 mt-1"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-md p-3 bg-gray-100 dark:bg-gray-800">
          <MapPin className="text-gray-500" />
          <div className="w-full">
            <Label className="text-sm text-gray-600 dark:text-gray-400">
              City
            </Label>
            <input
              type="text"
              name="city"
              value={input.city}
              onChange={handleInputChange}
              placeholder="Birgunj"
              className="w-full bg-transparent text-gray-900 dark:text-gray-100 outline-none border-none focus:ring-0 mt-1"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-md p-3 bg-gray-100 dark:bg-gray-800 sm:col-span-2">
          <MapPinnedIcon className="text-gray-500" />
          <div className="w-full">
            <Label className="text-sm text-gray-600 dark:text-gray-400">
              Country
            </Label>
            <input
              type="text"
              name="country"
              value={input.country}
              onChange={handleInputChange}
              placeholder="Nepal"
              className="w-full bg-transparent text-gray-900 dark:text-gray-100 outline-none border-none focus:ring-0 mt-1"
            />
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <Button
          type="submit"
          disabled={loading}
          className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white px-8 py-3 rounded-lg flex items-center justify-center gap-2 mx-auto"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Profile"
          )}
        </Button>
      </div>
    </form>
  );
};

export default Profile;
