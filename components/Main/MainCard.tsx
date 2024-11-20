"use client";

import { InputType, TemplateProps } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Label } from "../UI/shadcn/label";
import { Input } from "../UI/shadcn/input";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../UI/shadcn/button";
import { Trash2 } from "lucide-react";

const MainCard = ({
  inputData,
  setInputsList,
}: {
  inputData: TemplateProps;
  setInputsList: Dispatch<SetStateAction<TemplateProps[]>>;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: inputData.id, disabled: isDragging });
  const [question, setQuestion] = useState(inputData.question);
  const [minLength, setMinLength] = useState(
    inputData.type === "text" ? inputData.minLength : "0"
  );
  const [maxLength, setMaxLength] = useState(
    inputData.type === "text" ? inputData.maxLength : "0"
  );

  const handleDelete = () => {
    console.log("deleted");
    setInputsList((prevList) =>
      prevList.filter((input) => input.id !== inputData.id)
    );
  };

  const handleFocus = () => setIsDragging(true);
  const handleBlur = () => setIsDragging(false);

  const inputCard = inputData.type === InputType.TEXT && (
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
          onFocus={handleFocus}
          onBlur={handleBlur}
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
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={`flex items-center bg-white border border-border rounded-md py-4 px-6 gap-16 shadow-md group cursor-move`}
    >
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
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              <Trash2 size={18} />
            </Button>
          </div>
          <Input
            id={`question-${inputData.id}`}
            type="text"
            placeholder="Enter the question"
            className="rounded-md border p-2"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        {inputCard}
      </div>
    </div>
  );
};

export default MainCard;
