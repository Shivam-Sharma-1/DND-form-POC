"use client";

import LeftBar from "@/components/LeftBar";
import Main from "@/components/Main";
import { Data, useDragAndDrop } from "@/hooks/useDragDrop";

const cards: Data[] = [{ title: "Dummy", id: "wefwe" }];

export default function Home() {
  const { listItems, handleUpdateList, handleDragging } = useDragAndDrop(cards);

  return (
    <main className="flex w-full min-h-screen">
      <LeftBar handleDragging={handleDragging} />
      <div className="flex-1 bg-slate-600">
        <Main
          listItems={listItems}
          handleUpdateList={handleUpdateList}
          handleDragging={handleDragging}
        />
      </div>
    </main>
  );
}
