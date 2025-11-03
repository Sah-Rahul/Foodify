import { useState, useEffect, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import type { addMenuInterface } from "@/types/auth";
import { addMenuSchema } from "@/zodSchema/resturentSchema";
import { useMenuStore } from "@/zustand/useMenuStore";

interface MenuItem extends addMenuInterface {
  _id: string;
}

const EditMenu = ({
  selectedMenu,
  editOpen,
  setEditOpen,
}: {
  selectedMenu: MenuItem | null;
  editOpen: boolean;
  setEditOpen: (open: boolean) => void;
}) => {
  const [input, setInput] = useState<addMenuInterface>({
    name: "",
    description: "",
    price: 0,
    imageFile: undefined,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof addMenuInterface, string>>
  >({});

  const { editMenu, loading } = useMenuStore();
  useEffect(() => {
    if (selectedMenu) {
      setInput({
        name: selectedMenu?.name || "",
        description: selectedMenu?.description || "",
        price: selectedMenu?.price,
        imageFile: undefined,
      });
      setErrors({});
    }
  }, [selectedMenu]);

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
      if (!selectedMenu?._id) return;

      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price.toString());
      if (input.imageFile) formData.append("imageFile", input.imageFile);

      await editMenu(selectedMenu._id, formData);

      setEditOpen(false);
      setInput({ name: "", description: "", price: 0, imageFile: undefined });
    } catch (error) {
      console.error(error);
    }
  };

  if (!selectedMenu) return null;

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Menu</DialogTitle>
          <DialogDescription>
            Update your menu to keep your offerings fresh!
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Name</Label>
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
            <Label>Description</Label>
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
            <Label>Price</Label>
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
            <Label>Upload Menu Image</Label>
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

          <DialogFooter className="mt-5">
            {loading ? (
              <Button disabled className="bg-orange-500 hover:bg-hoverOrange">
                <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please wait
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
  );
};
export default EditMenu;
