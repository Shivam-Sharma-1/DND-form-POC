"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import LeftBar from "@/components/LeftBar";
import Main from "@/components/Main";

interface Game {
  id: string;
  title: string;
}

export default function Home() {
  const [gamesList, setGamesList] = useState<Game[]>([]);

  useEffect(() => {
    const initialGames = [
      "Dota 2",
      "League of Legends",
      "CS:GO",
      "World of Warcraft",
      "The Witcher 3",
    ];
    setGamesList(initialGames.map((title) => ({ id: uuidv4(), title })));
  }, []);

  const insertGamesList = (e: DragEndEvent) => {
    if (!e.over) return;
    console.log("insertGamesList", e.over);

    const newItem = e.active.data.current?.title;
    if (e.over?.id !== "droppable" || !newItem) return;

    setGamesList((prevList) => [...prevList, { id: uuidv4(), title: newItem }]);
  };

  return (
    <DndContext onDragEnd={insertGamesList}>
      <main className="flex w-full min-h-screen">
        <LeftBar />
        <div className="flex-1 bg-slate-600">
          <Main gamesList={gamesList} setGamesList={setGamesList} />
        </div>
      </main>
    </DndContext>
  );
}
