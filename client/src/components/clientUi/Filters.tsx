import { useRestaurantStore } from "@/zustand/useRestaurantStore";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export type filterOptionsState = {
  id: string;
  label: string;
};

const filterOptions: filterOptionsState[] = [
  { id: "burger", label: "Burger" },
  { id: "thali", label: "Thali" },
  { id: "biryani", label: "Biryani" },
  { id: "momos", label: "Momos" },
];

const Filters = () => {
  const { setAppliedFilter, appliedFilter } = useRestaurantStore();

  const appliedFilterHandler = (value: string) => {
    setAppliedFilter(value);
  };

  return (
    <div className="md:w-72">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-medium text-lg">Filter by cuisines</h1>
      </div>
      <div className="space-y-4">
        {filterOptions.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <Checkbox
              id={option.id}
              checked={appliedFilter.includes(option.label)}
              onCheckedChange={() => appliedFilterHandler(option.label)}
              className="cursor-pointer"
            />
            <Label
              htmlFor={option.id}
              className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
