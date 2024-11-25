"use client";

import { InputType, TemplateProps } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Label } from "../UI/shadcn/label";
import { Input } from "../UI/shadcn/input";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Button } from "../UI/shadcn/button";
import { Ellipsis, PlusIcon, Trash2 } from "lucide-react";
import { cn } from "@/utils/helpers/styles";

const MainCard = ({
  inputData,
  setInputsList,
}: {
  inputData: TemplateProps;
  setInputsList: Dispatch<SetStateAction<TemplateProps[]>>;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: inputData.id });
  const [question, setQuestion] = useState(inputData.question);
  const [minLength, setMinLength] = useState(
    inputData.type === InputType.TEXT ? inputData.minLength : "0"
  );
  const [maxLength, setMaxLength] = useState(
    inputData.type === InputType.TEXT ? inputData.maxLength : "0"
  );
  const [options, setOptions] = useState(
    inputData.type === InputType.MCQ ? inputData.options : []
  );
  const [optionCount, setOptionCount] = useState(
    inputData.type === InputType.MCQ ? inputData.options.length : 0
  );
  const dragOverlayRef = useRef<HTMLDivElement>(null);

  const handleDelete = () => {
    setInputsList((prevList) =>
      prevList.filter((input) => input.id !== inputData.id)
    );
  };

  const TextInputs = () => {
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
            onChange={(e) => setMinLength(e.target.value)}
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
            onChange={(e) => setMaxLength(e.target.value)}
          />
        </div>
      </div>
    );
  };

  const MCQInputs = () => {
    return (
      <div className="flex flex-col justify-center gap-2 w-full">
        <div className="flex flex-col justify-center gap-2 w-full">
          {options.map((option, index) => (
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
                value={option}
                className="flex-1"
                onChange={(e) =>
                  setOptions((prevOptions) =>
                    prevOptions.map((opt, i) =>
                      i === index ? e.target.value : opt
                    )
                  )
                }
              />
            </div>
          ))}
          {options.length < optionCount &&
            Array.from({ length: optionCount - options.length }).map(
              (_, index) => (
                <div key={index} className="flex items-center gap-4 w-full">
                  <Label
                    htmlFor={`option-${options.length + index}-${inputData.id}`}
                    className="font-medium shrink-0 min-w-16"
                  >
                    Option {options.length + index + 1}
                  </Label>
                  <Input
                    id={`option-${options.length + index}-${inputData.id}`}
                    type="text"
                    placeholder="Enter the option"
                    className="flex-1"
                    onChange={(e) =>
                      setOptions((prevOptions) => [
                        ...prevOptions,
                        e.target.value,
                      ])
                    }
                  />
                </div>
              )
            )}
        </div>
        <Button
          variant="ghost"
          onClick={() => setOptionCount(optionCount + 1)}
          className="w-fit flex justify-center items-center gap-2 hover:bg-transparent h-fit p-0 mt-1"
        >
          <PlusIcon size={16} />
          Add Option
        </Button>
      </div>
    );
  };

  const inputCard =
    inputData.type === InputType.TEXT ? (
      <TextInputs />
    ) : inputData.type === InputType.MCQ ? (
      <MCQInputs />
    ) : null;

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={cn(
        `flex items-center bg-white border border-border rounded-md py-6 px-6 gap-16 shadow-md group relative z-0`,
        isDragging && "z-20"
      )}
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute inset-0 cursor-move top-0 left-0 w-full h-6 flex justify-center items-center"
        ref={dragOverlayRef}
      >
        <Ellipsis
          size={22}
          className="text-slate-400 hidden group-hover:block"
        />
      </div>
      <div className="flex flex-col justify-center items-start gap-4 w-full relative z-20">
        <div className="flex flex-col justify-center gap-2 w-full">
          <div className="flex justify-between items-start w-full">
            <Label htmlFor={`question-${inputData.id}`} className="font-medium">
              Question
            </Label>
            <Button
              variant="ghost"
              className="p-0 h-fit text-destructive bg-transparent shadow-none hidden group-hover:block hover:bg-red-200 hover:text-destructive"
              onClick={handleDelete}
            >
              <Trash2 size={14} />
            </Button>
          </div>
          <Input
            id={`question-${inputData.id}`}
            type="text"
            placeholder="Enter the question"
            className="rounded-md border p-2"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        {inputCard}
      </div>
    </div>
  );
};

export default MainCard;
