"use client";

import React from "react";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import MainCard from "./MainCard";

interface Game {
  id: string;
  title: string;
}

export default function Main({
  gamesList,
  setGamesList,
}: {
  gamesList: Game[];
  setGamesList: React.Dispatch<React.SetStateAction<Game[]>>;
}) {
  const { isOver, setNodeRef } = useDroppable({ id: "droppable" });

  const reorderGamesList = (e: DragEndEvent) => {
    if (!e.over) return;

    setGamesList((prevGamesList) => {
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
      style={{ color: isOver ? "green" : undefined }}
    >
      <DndContext onDragEnd={reorderGamesList}>
        <SortableContext items={gamesList.map((game) => game.id)}>
          {gamesList.map((game) => (
            <MainCard key={game.id} id={game.id} title={game.title} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
