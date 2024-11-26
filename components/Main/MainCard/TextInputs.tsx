import { Input } from "@/components/UI/shadcn/input";
import { Label } from "@/components/UI/shadcn/label";
import { TemplateProps, TextTemplateProps } from "@/types";
import { Dispatch, SetStateAction } from "react";

interface TextInputsProps {
  inputData: TextTemplateProps;
  setInputsList: Dispatch<SetStateAction<TemplateProps[]>>;
}

const TextInputs = ({ inputData, setInputsList }: TextInputsProps) => {
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
          value={inputData.minLength}
          onChange={(e) =>
            setInputsList((prevList) => {
              const updatedList = prevList.map((input) => {
                if (input.id === inputData.id) {
                  return {
                    ...input,
                    minLength: Number(e.target.value),
                  };
                }
                return input;
              });
              return updatedList;
            })
          }
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
          value={inputData.maxLength}
          onChange={(e) =>
            setInputsList((prevList) => {
              const updatedList = prevList.map((input) => {
                if (input.id === inputData.id) {
                  return {
                    ...input,
                    maxLength: Number(e.target.value),
                  };
                }
                return input;
              });
              return updatedList;
            })
          }
        />
      </div>
    </div>
  );
};

export default TextInputs;
