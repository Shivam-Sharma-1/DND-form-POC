"use client";

import { useState } from "react";
import LeftBarCard from "./LeftBarCard";
import CreateTempDialog from "./CreateTempDialog";
import { InputType, TemplateProps } from "@/types";
import { Active, DragOverlay } from "@dnd-kit/core";

export default function LeftBar({
  activeElement,
}: {
  activeElement: Active | null;
}) {
  const [templates, setTemplates] = useState<TemplateProps[]>([
    {
      id: "1",
      name: "Text",
      type: InputType.TEXT,
      question: "Enter your email",
      minLength: 5,
      maxLength: 10,
    },
    {
      id: "2",
      name: "MCQ",
      type: InputType.MCQ,
      question: "Select your favourite color",
      options: ["Red", "Green", "Blue"],
    },
  ]);
  console.log("Leftbar", activeElement);

  return (
    <div className="max-w-[20%] bg-slate-600 w-full flex flex-col justify-between py-4 sticky top-0 left-0 h-screen max-h-screen">
      <div className="flex flex-col justify-center gap-4">
        <h1 className="text-2xl font-semibold text-left text-white mx-4">
          Your Templates
        </h1>
        <div className="flex flex-col items-center">
          {templates.map((template, index) => (
            <LeftBarCard key={template.id} template={template} index={index} />
          ))}
        </div>
      </div>
      <CreateTempDialog setTemplates={setTemplates} />
      <DragOverlay>
        {activeElement ? (
          <LeftBarCard
            key={activeElement.id}
            template={activeElement.data.current as TemplateProps}
            index={1}
          />
        ) : null}
      </DragOverlay>
    </div>
  );
}
