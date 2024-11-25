"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import LeftBar from "@/components/LeftBar";
import Main from "@/components/Main";
import { InputType, TemplateProps } from "@/types";
import { arrayMove } from "@dnd-kit/sortable";

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

  // const insertInput = (e: DragEndEvent) => {
  //   if (!e.over) return;
  //   console.log("event insert", e);

  //   const newInput = e.active.data.current;
  //   if (e.over?.id !== "droppable" || !newInput) {
  //     return;
  //   }

  //   if (newInput && newInput.type && newInput.name && newInput.question) {
  //     setInputsList((prevList) => [
  //       ...prevList,
  //       {
  //         id: uuidv4(),
  //         type: newInput.type,
  //         name: newInput.name,
  //         question: newInput.question,
  //         ...(newInput.type === InputType.TEXT
  //           ? { minLength: newInput.minLength, maxLength: newInput.maxLength }
  //           : { minLength: undefined, maxLength: undefined }),
  //         ...(newInput.type === InputType.MCQ
  //           ? { options: newInput.options }
  //           : { options: undefined }),
  //       },
  //     ]);
  //   } else {
  //     console.error("newInput is missing required properties", newInput);
  //   }
  // };

  const handleDragEnd = (e: DragEndEvent) => {
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
    <DndContext
      onDragEnd={handleDragEnd}
      // onDragOver={(e) => console.log("dragover", e)}
    >
      <main className="flex w-full min-h-screen">
        <LeftBar />
        <div className="flex-1 bg-slate-200">
          <Main inputsList={inputsList} setInputsList={setInputsList} />
        </div>
      </main>
    </DndContext>
  );
}
