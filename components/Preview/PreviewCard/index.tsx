import { Input } from "@/components/UI/shadcn/input";
import { Label } from "@/components/UI/shadcn/label";
import { TemplateProps } from "@/types";
import React from "react";

const PreviewCard = ({ inputData }: { inputData: TemplateProps }) => {
  return (
    <div className="flex flex-col justify-center items-start">
      <div className="flex flex-col justify-center gap-3 w-full">
        <Label
          htmlFor={`question-${inputData.id}`}
          className="font-medium text-md"
        >
          {inputData.question}
        </Label>
        {inputData.type === "text" ? (
          <>
            <Input
              id={`question-${inputData.id}`}
              type="text"
              placeholder="Type your answer here"
              className="w-full"
              maxLength={inputData.maxLength}
            />
            <p className="text-xs">
              Min chars {inputData.minLength} and Max chars{" "}
              {inputData.maxLength}
            </p>
          </>
        ) : (
          <div className="flex flex-col justify-center gap-2 w-full">
            {inputData.options.map((option) => (
              <div key={option} className="flex items-center gap-2">
                <Input
                  type="radio"
                  id={option}
                  name={`question-${inputData}`}
                  className="w-4 h-4"
                />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewCard;
