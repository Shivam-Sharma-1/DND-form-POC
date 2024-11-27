"use client";

import { Button } from "@/components/UI/shadcn/button";
import { Input } from "@/components/UI/shadcn/input";
import { Label } from "@/components/UI/shadcn/label";
import { InputType, TemplateProps } from "@/types";
import { Icon } from "@iconify/react";
import { Dispatch, SetStateAction, useState } from "react";

interface MCQInputsProps {
  inputData: TemplateProps;
  options: string[];
  setOptions: Dispatch<SetStateAction<string[]>>;
  setInputsList: Dispatch<SetStateAction<TemplateProps[]>>;
}

const MCQInputs = ({
  inputData,
  options,
  setOptions,
  setInputsList,
}: MCQInputsProps) => {
  const [optionCount, setOptionCount] = useState(
    inputData.type === InputType.MCQ ? inputData.options.length : 0
  );

  const handleOptionChange = (index: number, value: string) => {
    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      if (index >= newOptions.length) {
        newOptions.push(value);
      } else {
        newOptions[index] = value;
      }
      return newOptions;
    });

    setInputsList((prevList) => {
      return prevList.map((input) => {
        if (input.id === inputData.id) {
          const updatedOptions = [...options];
          if (index >= updatedOptions.length) {
            updatedOptions.push(value);
          } else {
            updatedOptions[index] = value;
          }
          return {
            ...input,
            options: updatedOptions,
          };
        }
        return input;
      });
    });
  };

  return (
    <div className="flex flex-col justify-center gap-2 w-full">
      <div className="flex flex-col justify-center gap-2 w-full">
        {Array.from({ length: optionCount }).map((_, index) => (
          <div key={index} className="flex items-center gap-4 w-full">
            <Label
              htmlFor={`option-${index}-${inputData.id}`}
              className="font-medium shrink-0 min-w-16"
            >
              Option {index + 1}
            </Label>
            <Input
              id={`option-${index}-${inputData.id}`}
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
