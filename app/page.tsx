"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import LeftBar from "@/components/LeftBar";
import Main from "@/components/Main";
import { InputType, TemplateProps } from "@/types";
import { arrayMove } from "@dnd-kit/sortable";
import { Button } from "@/components/UI/shadcn/button";
import Preview from "@/components/Preview";

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
  const [isPreview, setIsPreview] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState<TemplateProps | null>(
    null
  );
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

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const draggedTemplate = templates.find((t) => t.id === active.id);
    if (draggedTemplate) {
      setActiveTemplate(draggedTemplate);
    }
  };

  const handleDragEnd = (e: DragEndEvent) => {
    setActiveTemplate(null);

    const { over, active } = e;
    if (!over) return;

    if (over.id === "droppable") {
      console.log("droppable", e);
      const newInput = active.data.current;
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
    } else if (!active.data.current?.sortable && over.data.current?.sortable) {
      console.log("insert", e);
      const newInput = active.data.current;
      if (newInput && newInput.type && newInput.name && newInput.question) {
        setInputsList((prevInputsList) => {
          const overIndex = prevInputsList.findIndex(
            (item) => item.id === over.id
          );

          if (overIndex === -1) {
            console.error("Target drop location not found");
            return prevInputsList;
          }

          const newInputItem: TemplateProps = {
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
          };

          const newList = [
            ...prevInputsList.slice(0, overIndex),
            newInputItem,
            ...prevInputsList.slice(overIndex),
          ];

          return newList;
        });
      } else {
        console.error("newInput is missing required properties", newInput);
      }
    } else {
      console.log("reorder", e);
      setInputsList((prevInputsList) => {
        const oldIndex = prevInputsList.findIndex(
          (input) => input.id === active.id
        );
        const newIndex = prevInputsList.findIndex(
          (input) => input.id === over!.id
        );
        return arrayMove(prevInputsList, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <main className="flex w-full min-h-screen">
        {!isPreview && (
          <LeftBar
            activeTemplate={activeTemplate}
            templates={templates}
            setTemplates={setTemplates}
          />
        )}
        <div className="flex-1 bg-slate-200 relative">
          {isPreview ? (
            <Preview inputsList={inputsList} />
          ) : (
            <Main inputsList={inputsList} setInputsList={setInputsList} />
          )}

          <div className="fixed bottom-4 right-4 flex flex-col justify-center gap-4">
            {!isPreview && (
              <Button
                className="font-medium text-md py-6 mx-4"
                onClick={() => console.log(inputsList)}
              >
                Create Form
              </Button>
            )}
            <Button
              className="font-medium text-md py-6 mx-4"
              onClick={() => setIsPreview((prev) => !prev)}
            >
              Toggle Preview
            </Button>
          </div>
        </div>
      </main>
    </DndContext>
  );
}
