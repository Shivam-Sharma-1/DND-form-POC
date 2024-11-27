import { Button } from "@/components/UI/shadcn/button";
import { Input } from "@/components/UI/shadcn/input";
import { Label } from "@/components/UI/shadcn/label";
import { Icon } from "@iconify/react";
import { Dispatch, SetStateAction } from "react";

interface MCQInputsProps {
  options: string[];
  setOptions: Dispatch<SetStateAction<string[]>>;
  optionCount: number;
  setOptionCount: Dispatch<SetStateAction<number>>;
}

const MCQInputs = ({
  optionCount,
  setOptionCount,
  options,
  setOptions,
}: MCQInputsProps) => {
  const handleOptionChange = (index: number, value: string) => {
    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = value;
      return newOptions;
    });
  };

  return (
    <div className="flex flex-col justify-center gap-2 w-full">
      <div className="flex flex-col justify-center gap-2 w-full">
        {Array.from({ length: optionCount }).map((_, index) => (
          <div key={index} className="flex items-center gap-4 w-full">
            <Label
              htmlFor={`option-${index}`}
              className="font-medium shrink-0 min-w-16"
            >
              Option {index + 1}
            </Label>
            <Input
              id={`option-${index}`}
              type="text"
              placeholder="Enter the option"
              value={options[index] || ""}
              className="flex-1"
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <Button
        variant="ghost"
        onClick={() => setOptionCount((prev) => prev + 1)}
        className="w-fit flex justify-center items-center gap-2 hover:bg-transparent h-fit p-0 mt-1"
      >
        <Icon icon="ph:plus" width={16} />
        Add Option
      </Button>
    </div>
  );
};

export default MCQInputs;
