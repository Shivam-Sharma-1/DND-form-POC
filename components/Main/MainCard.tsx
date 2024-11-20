"use client";

import { InputType, TemplateProps } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Label } from "../UI/shadcn/label";
import { Input } from "../UI/shadcn/input";
import { useState } from "react";

const MainCard = ({ inputData }: { inputData: TemplateProps }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: inputData.id });
  const [question, setQuestion] = useState(inputData.question);
  const [minLength, setMinLength] = useState(
    inputData.type === "text" ? inputData.minLength : "0"
  );
  const [maxLength, setMaxLength] = useState(
    inputData.type === "text" ? inputData.maxLength : "0"
  );

  const inputCard =
    inputData.type === InputType.TEXT ? (
      <div className="flex items-center gap-2 w-full">
        <div className="flex flex-col justify-center gap-2 w-full flex-1">
          <Label htmlFor="minlength" className="font-medium">
            Min Length
          </Label>
          <Input
            id="minlength"
            type="number"
            placeholder="Enter the Minimum length of the answer"
            value={minLength}
            onChange={(e) => setMinLength(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-center gap-2 w-full flex-1">
          <Label htmlFor="maxlength" className="font-medium">
            Max Length
          </Label>
          <Input
            id="maxlength"
            type="number"
            placeholder="Enter the Maximum length of the answer"
            value={maxLength}
            onChange={(e) => setMaxLength(e.target.value)}
          />
        </div>
      </div>
    ) : (
      ""
    );

  return (
    <div
      id={inputData.id}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
      className="flex items-center bg-white border border-border rounded-md py-4 px-6 gap-16 shadow-md"
    >
      <div className="flex flex-col justify-center items-start gap-4 w-full">
        <div className="flex flex-col justify-center gap-2 w-full">
          <Label htmlFor="question" className="font-medium">
            Question
          </Label>
          <Input
            id="question"
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
