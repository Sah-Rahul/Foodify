import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { addMenuInterface } from "@/types/auth";
import { addMenuSchema } from "@/zodSchema/resturentSchema";
import { Loader2, Plus } from "lucide-react";
import { useState, type FormEvent } from "react";
import EditMenu from "./EditMenu";
import { useMenuStore } from "@/zustand/useMenuStore";
import { useRestaurantStore } from "@/zustand/useRestaurantStore";

type MenuItem = addMenuInterface & {
  _id: string;
};

const AddMenu = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const { createMenu, loading } = useMenuStore();
  const { restaurant } = useRestaurantStore();
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);

  const [input, setInput] = useState<addMenuInterface>({
    name: "",
    description: "",
    price: 0,
    imageFile: undefined,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof addMenuInterface, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({
      ...input,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = addMenuSchema.safeParse(input);

    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof addMenuInterface, string>> = {};
      validation.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof addMenuInterface;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price.toString());
      if (input.imageFile) formData.append("imageFile", input.imageFile);

      await createMenu(formData);
      setEditOpen(false);
      setSelectedMenu(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (menu: MenuItem) => {
    setSelectedMenu(menu);
    setInput({
      name: menu.name,
      description: menu.description,
      price: menu.price,
      imageFile: undefined,
    });
    setEditOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Available Menus</h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 cursor-pointer hover:bg-hoverOrange flex items-center">
              <Plus className="mr-2" /> Add Menus
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add A New Menu</DialogTitle>
              <DialogDescription>
                Create a menu that will make your restaurant stand out.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="mb-2">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={handleChange}
                  placeholder="Enter menu name"
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <Label className="mb-2">Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={handleChange}
                  placeholder="Enter menu description"
                />
                {errors.description && (
                  <p className="text-xs text-red-500">{errors.description}</p>
                )}
              </div>

              <div>
                <Label className="mb-2">Price</Label>
                <Input
                  type="number"
                  name="price"
                  value={input.price}
                  onChange={handleChange}
                  placeholder="Enter menu price"
                />
                {errors.price && (
                  <p className="text-xs text-red-500">{errors.price}</p>
                )}
              </div>

              <div>
                <Label className="mb-2">Upload Menu Image</Label>
                <Input
                  type="file"
                  name="imageFile"
                  onChange={(e) =>
                    setInput({
                      ...input,
                      imageFile: e.target.files?.[0] || undefined,
                    })
                  }
                />
                {errors.imageFile && (
                  <p className="text-xs text-red-500">{errors.imageFile}</p>
                )}
              </div>

              <DialogFooter>
                {loading ? (
                  <Button
                    disabled
                    className="bg-orange-500 hover:bg-hoverOrange"
                  >
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please
                    wait
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-orange-500 cursor-pointer hover:bg-hoverOrange"
                  >
                    Submit
                  </Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6 space-y-4">
        {restaurant?.menus.map((menu: any) => (
          <div
            key={menu._id}
            className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border"
          >
            <img
              src={menu.image}
              alt={menu.name}
              className="md:h-24 md:w-24 h-16 w-full object-cover rounded-lg"
            />

            <div className="flex-1 mt-2 md:mt-0">
              <h1 className="text-lg font-semibold text-gray-800">
                {menu.name}
              </h1>
              <p className="text-sm text-gray-600 mt-1">{menu.description}</p>
              <h2 className="text-md font-semibold mt-2">
                Price: <span className="text-[#D19254]">₹{menu.price}</span>
              </h2>
            </div>

            <Button
              size="sm"
              className="bg-orange-500 cursor-pointer hover:bg-hoverOrange mt-2 md:mt-0"
              onClick={() => handleEditClick(menu)}
            >
              Edit
            </Button>
          </div>
        ))}
      </div>

      <EditMenu
        selectedMenu={selectedMenu}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      />
    </div>
  );
};

export default AddMenu;
