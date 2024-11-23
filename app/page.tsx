"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import LeftBar from "@/components/LeftBar";
import Main from "@/components/Main";
import { InputType, TemplateProps } from "@/types";

export default function Home() {
  const [inputsList, setInputsList] = useState<TemplateProps[]>([
    {
      id: uuidv4(),
      type: InputType.TEXT,
      name: "Full Name",
      question: "What is your full name?",
      minLength: 3,
      maxLength: 30,
    },
    {
      id: uuidv4(),
      type: InputType.MCQ,
      name: "Gender",
      question: "What is your Gender?",
      options: ["Male", "Female", "Other"],
    },
  ]);

  const insertInput = (e: DragEndEvent) => {
    if (!e.over) return;

    const newInput = e.active.data.current;
    if (e.over?.id !== "droppable" || !newInput) {
      return;
    }

    if (newInput && newInput.type && newInput.name && newInput.question) {
      setInputsList((prevList) => [
        ...prevList,
        {
          id: uuidv4(),
          type: newInput.type,
          name: newInput.name,
          question: newInput.question,
          ...(newInput.type === InputType.TEXT
            ? { minLength: newInput.minLength, maxLength: newInput.maxLength }
            : { minLength: undefined, maxLength: undefined }),
          ...(newInput.type === InputType.MCQ
            ? { options: newInput.options }
            : { options: undefined }),
        },
      ]);
    } else {
      console.error("newInput is missing required properties", newInput);
    }
  };

  return (
    <DndContext onDragEnd={insertInput}>
      <main className="flex w-full min-h-screen">
        <LeftBar />
        <div className="flex-1 bg-slate-200">
          <Main inputsList={inputsList} setInputsList={setInputsList} />
        </div>
      </main>
    </DndContext>
  );
}
