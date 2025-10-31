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
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Profile = () => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Profile updated successfully ✅");
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-7xl mx-auto px-6 md:px-14 py-10"
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="flex items-center gap-4">
          <Avatar className="relative w-24 h-24 md:w-28 md:h-28">
            <AvatarImage src={selectedImage} />
            <AvatarFallback>U</AvatarFallback>

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

          <Input
            type="text"
            placeholder="Your Full Name"
            className="text-2xl font-semibold border-none outline-none focus-visible:ring-0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        <div className="flex items-center gap-3 rounded-md p-3 bg-gray-100 dark:bg-gray-800">
          <Mail className="text-gray-500" />
          <div className="w-full">
            <Label>Email</Label>
            <input
              type="email"
              placeholder="you@example.com"
              disabled
              className="w-full bg-transparent text-gray-600 dark:text-gray-300 outline-none border-none focus:ring-0"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-md p-3 bg-gray-100 dark:bg-gray-800">
          <LocateIcon className="text-gray-500" />
          <div className="w-full">
            <Label>Address</Label>
            <input
              type="text"
              placeholder="123 Main Street"
              className="w-full bg-transparent text-gray-600 dark:text-gray-300 outline-none border-none focus:ring-0"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-md p-3 bg-gray-100 dark:bg-gray-800">
          <MapPin className="text-gray-500" />
          <div className="w-full">
            <Label>City</Label>
            <input
              type="text"
              placeholder="Birgunj"
              className="w-full bg-transparent text-gray-600 dark:text-gray-300 outline-none border-none focus:ring-0"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-md p-3 bg-gray-100 dark:bg-gray-800">
          <MapPinnedIcon className="text-gray-500" />
          <div className="w-full">
            <Label>Country</Label>
            <input
              type="text"
              placeholder="Nepal"
              className="w-full bg-transparent text-gray-600 dark:text-gray-300 outline-none border-none focus:ring-0"
            />
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2"
        >
          {isLoading ? (
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
