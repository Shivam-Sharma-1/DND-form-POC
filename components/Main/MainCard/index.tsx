"use client";

import { InputType, TemplateProps } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Ellipsis, Trash2 } from "lucide-react";
import { cn } from "@/utils/helpers/styles";
import TextInputs from "./TextInputs";
import { Label } from "@/components/UI/shadcn/label";
import { Input } from "@/components/UI/shadcn/input";
import { Button } from "@/components/UI/shadcn/button";
import MCQInputs from "./MCQInputs";

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
  const [minLength, setMinLength] = useState<number>(
    inputData.type === InputType.TEXT ? inputData.minLength : 0
  );
  const [maxLength, setMaxLength] = useState<number>(
    inputData.type === InputType.TEXT ? inputData.maxLength : 0
  );
  const [options, setOptions] = useState(
    inputData.type === InputType.MCQ ? inputData.options : []
  );
  const dragOverlayRef = useRef<HTMLDivElement>(null);

  const handleDelete = () => {
    setInputsList((prevList) =>
      prevList.filter((input) => input.id !== inputData.id)
    );
  };

  const inputCard =
    inputData.type === InputType.TEXT ? (
      <TextInputs
        minLength={minLength}
        setMinLength={setMinLength}
        inputData={inputData}
        maxLength={maxLength}
        setMaxLength={setMaxLength}
      />
    ) : inputData.type === InputType.MCQ ? (
      <MCQInputs
        inputData={inputData}
        options={options}
        setOptions={setOptions}
      />
    ) : null;

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
      }}
      className={cn(
        `flex items-center bg-white border border-border rounded-md py-6 px-6 gap-16 shadow-md group relative z-0 max-w-[800px] w-[800px]`,
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
