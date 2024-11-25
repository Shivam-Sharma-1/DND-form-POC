import { Input } from "@/components/UI/shadcn/input";
import { Label } from "@/components/UI/shadcn/label";
import { Dispatch, SetStateAction } from "react";

interface TextInputsProps {
  minLength: number | undefined;
  setMinLength: Dispatch<SetStateAction<number | undefined>>;
  maxLength: number | undefined;
  setMaxLength: Dispatch<SetStateAction<number | undefined>>;
}

const TextInputs = ({
  minLength,
  setMinLength,
  maxLength,
  setMaxLength,
}: TextInputsProps) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex flex-col justify-center gap-2 w-full flex-1">
        <Label htmlFor={`minlength`} className="font-medium">
          Min Length
        </Label>
        <Input
          id={`minlength`}
          type="number"
          placeholder="Enter the Minimum length of the answer"
          value={minLength}
          onChange={(e) => setMinLength(Number(e.target.value))}
        />
      </div>
      <div className="flex flex-col justify-center gap-2 w-full flex-1">
        <Label htmlFor={`maxlength`} className="font-medium">
          Max Length
        </Label>
        <Input
          id={`maxlength`}
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
