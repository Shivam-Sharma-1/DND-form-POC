import { Input } from "@/components/UI/shadcn/input";
import { Label } from "@/components/UI/shadcn/label";
import { Dispatch, SetStateAction } from "react";

interface TextInputsProps {
  minLength: number;
  setMinLength: Dispatch<SetStateAction<number>>;
  inputData: { id: string };
  maxLength: number;
  setMaxLength: Dispatch<SetStateAction<number>>;
}

const TextInputs = ({
  minLength,
  setMinLength,
  inputData,
  maxLength,
  setMaxLength,
}: TextInputsProps) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex flex-col justify-center gap-2 w-full flex-1">
        <Label htmlFor={`minlength-${inputData.id}`} className="font-medium">
          Min Length
        </Label>
        <Input
          id={`minlength-${inputData.id}`}
          type="number"
          placeholder="Enter the Minimum length of the answer"
          value={minLength}
          onChange={(e) => setMinLength(Number(e.target.value))}
        />
      </div>
      <div className="flex flex-col justify-center gap-2 w-full flex-1">
        <Label htmlFor={`maxlength-${inputData.id}`} className="font-medium">
          Max Length
        </Label>
        <Input
          id={`maxlength-${inputData.id}`}
          type="number"
          placeholder="Enter the Maximum length of the answer"
          value={maxLength}
          onChange={(e) => setMaxLength(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default TextInputs;
