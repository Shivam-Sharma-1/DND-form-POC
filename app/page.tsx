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
      type: InputType.TEXT,
      name: "Email",
      question: "What is your email?",
      minLength: 5,
      maxLength: 50,
    },
  ]);

  const insertInput = (e: DragEndEvent) => {
    if (!e.over) return;
    console.log("insertInput", e.over);

    const newInput = e.active.data.current;
    console.log("new inout", newInput);
    if (e.over?.id !== "droppable" || !newInput) {
      console.log("No new input");
      return;
    }

    if (newInput && newInput.type && newInput.name && newInput.question) {
      console.log("inside if");
      setInputsList((prevList) => [
        ...prevList,
        {
          id: uuidv4(),
          type: newInput.type,
          name: newInput.name,
          question: newInput.question,
          minLength: newInput.minLength,
          maxLength: newInput.maxLength,
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
        <div className="flex-1 bg-slate-600">
          <Main inputsList={inputsList} setInputsList={setInputsList} />
        </div>
      </main>
    </DndContext>
  );
}
