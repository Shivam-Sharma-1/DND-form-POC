"use client";

import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import MainCard from "./MainCard";
import { Dispatch, SetStateAction } from "react";
import { TemplateProps } from "@/types";

export default function Main({
  inputsList,
  setInputsList,
}: {
  inputsList: TemplateProps[];
  setInputsList: Dispatch<SetStateAction<TemplateProps[]>>;
}) {
  const { isOver, setNodeRef } = useDroppable({ id: "droppable" });

  const reorderGamesList = (e: DragEndEvent) => {
    if (!e.over) return;

    setInputsList((prevGamesList) => {
      const oldIndex = prevGamesList.findIndex(
        (game) => game.id === e.active.id
      );
      const newIndex = prevGamesList.findIndex(
        (game) => game.id === e.over!.id
      );
      return arrayMove(prevGamesList, oldIndex, newIndex);
    });
  };

  return (
    <div
      className="w-full h-full flex flex-col gap-4 py-4 px-20"
      ref={setNodeRef}
      style={{ color: isOver ? "" : "" }}
    >
      <DndContext onDragEnd={reorderGamesList}>
        <SortableContext items={inputsList.map((input) => input.id)}>
          {inputsList.map((input) => (
            <MainCard
              key={input.id}
              inputData={input}
              setInputsList={setInputsList}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
