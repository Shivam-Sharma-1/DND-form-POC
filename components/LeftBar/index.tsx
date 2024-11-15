"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { SortableContext } from "@dnd-kit/sortable";
import LeftBarCard from "./LeftBarCard";

const cardTitles = ["CARD 1", "CARD 2", "CARD 3", "CARD 4", "CARD 5"];

export default function LeftBar() {
  const [cards, setCards] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    setCards(cardTitles.map((title) => ({ id: uuidv4(), title })));
  }, []);

  return (
    <div className="max-w-[20%] bg-slate-400 w-full flex flex-col gap-1 py-4 px-2">
      <SortableContext items={cards.map((card) => card.id)}>
        {cards.map((card) => (
          <LeftBarCard key={card.id} id={card.id} title={card.title} />
        ))}
      </SortableContext>
    </div>
  );
}
